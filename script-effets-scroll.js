/* =========================================================
   MAISON AMBRE — Effets liés au scroll
   Apparitions, titres en mots, scène du hero, bandeau,
   manifeste, collection horizontale, compteurs.
   ========================================================= */
(() => {
  const MA = window.MaisonAmbre;
  if (!MA) return;

  /* ---------- 0. Duplication des contenus qui tournent en boucle ---------- */
  document.querySelectorAll('[data-dupliquer]').forEach((groupe) => {
    const copie = groupe.cloneNode(true);
    copie.removeAttribute('data-dupliquer');
    copie.setAttribute('aria-hidden', 'true');
    groupe.after(copie);
  });

  /* ---------- 1. Titres découpés en mots, nom géant découpé en lettres ---------- */
  document.querySelectorAll('[data-decoupe]').forEach((titre) => MA.decouperEnMots(titre, true));
  const marqueGeante = document.querySelector('.pied__marque');
  if (marqueGeante) MA.decouperEnLettres(marqueGeante);

  /* ---------- 2. Apparitions au scroll ---------- */
  document.querySelectorAll('[data-apparition-groupe]').forEach((groupe) => {
    const pas = parseFloat(groupe.dataset.apparitionGroupe) || 0.1;
    groupe.querySelectorAll('[data-apparition]').forEach((enfant, i) => {
      enfant.style.setProperty('--delai', `${((i % 4) * pas).toFixed(2)}s`);
    });
  });

  const aObserver = [...document.querySelectorAll('[data-apparition], [data-decoupe], .pied__marque')]
    .filter((el) => !el.closest('.hero')); // le hero démarre après l'écran de chargement

  if (MA.reduit || !('IntersectionObserver' in window)) {
    aObserver.forEach((el) => el.classList.add('est-visible'));
  } else {
    const observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    aObserver.forEach((el) => observateur.observe(el));
  }

  /* ---------- 3. Scène du hero : profondeur à la souris + dispersion au scroll ---------- */
  const scene = document.querySelector('[data-scene]');
  if (scene && !MA.reduit) {
    const hero = scene.closest('.hero');
    let hauteurHero = hero.offsetHeight;
    const objets = [...scene.querySelectorAll('.objet')].map((el) => ({
      el,
      centre: el.classList.contains('objet--centre'),
      profondeur: parseFloat(el.dataset.profondeur) || 0.5,
      x: 0, y: 0, dirX: 0, dirY: 0,
    }));

    // Direction de chaque objet par rapport au centre de la scène (pour s'éloigner au scroll)
    const mesurerScene = () => {
      hauteurHero = hero.offsetHeight;
      objets.forEach((o) => {
        const cx = o.el.offsetLeft - scene.offsetWidth / 2;
        const cy = o.el.offsetTop - scene.offsetHeight / 2;
        const longueur = Math.hypot(cx, cy) || 1;
        o.dirX = cx / longueur;
        o.dirY = cy / longueur;
      });
    };
    mesurerScene();
    window.addEventListener('resize', mesurerScene);

    MA.ajouterTache(() => {
      if (MA.scroll.y > hauteurHero) return; // hero hors de l'écran : rien à calculer
      const p = MA.borner(MA.scroll.y / hauteurHero, 0, 1);
      const mx = MA.souris.x / window.innerWidth - 0.5;
      const my = MA.souris.y / window.innerHeight - 0.5;
      objets.forEach((o) => {
        const cibleX = -mx * 60 * o.profondeur + o.dirX * p * 320 * o.profondeur;
        const cibleY = -my * 40 * o.profondeur + o.dirY * p * 320 * o.profondeur - p * 120 * o.profondeur;
        o.x = MA.lerp(o.x, cibleX, 0.08);
        o.y = MA.lerp(o.y, cibleY, 0.08);
        const tour = o.dirX * p * 30 * o.profondeur;
        const echelle = o.centre ? 1 + p * 0.12 : 1;
        o.el.style.transform =
          `translate3d(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px, 0) rotate(${tour.toFixed(2)}deg) scale(${echelle.toFixed(3)})`;
      });
    });
  }

  /* ---------- 4. Bandeau défilant : accélère et change de sens avec le scroll ---------- */
  document.querySelectorAll('[data-bandeau]').forEach((bandeau) => {
    const piste = bandeau.querySelector('.bandeau__piste');
    const vitesse = parseFloat(bandeau.dataset.bandeau) || 1;
    let x = 0;
    let sens = -1;
    let moitie = piste.scrollWidth / 2;
    const mesurer = () => { moitie = piste.scrollWidth / 2; };
    window.addEventListener('resize', mesurer);
    window.addEventListener('load', mesurer);
    if (document.fonts) document.fonts.ready.then(mesurer);
    if (MA.reduit) return;

    MA.ajouterTache(() => {
      const v = MA.scroll.velocite;
      if (Math.abs(v) > 0.6) sens = v > 0 ? -1 : 1;
      x += sens * (vitesse + Math.min(Math.abs(v) * 0.3, 14));
      if (x <= -moitie) x += moitie;
      if (x > 0) x -= moitie;
      const inclinaison = MA.borner(-v * 0.3, -12, 12);
      piste.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${inclinaison.toFixed(2)}deg)`;
    });
  });

  /* ---------- 5. Manifeste : les mots s'allument au fil de la lecture ---------- */
  const manifeste = document.querySelector('[data-mots-scroll]');
  if (manifeste) {
    const mots = MA.decouperEnMots(manifeste);
    if (MA.reduit) {
      mots.forEach((mot) => mot.classList.add('allume'));
    } else {
      let dernier = -1;
      MA.ajouterTache(() => {
        if (!MA.scroll.aBouge) return;
        const r = manifeste.getBoundingClientRect();
        const debut = window.innerHeight * 0.85; // le texte commence à s'allumer ici…
        const fin = window.innerHeight * 0.4;    // …et il est entièrement allumé ici
        const p = MA.borner((debut - r.top) / (debut - fin + r.height), 0, 1);
        const nb = Math.round(p * mots.length);
        if (nb === dernier) return;
        dernier = nb;
        mots.forEach((mot, i) => mot.classList.toggle('allume', i < nb));
      });
    }
  }

  /* ---------- 6. Collection : la piste glisse à l'horizontale pendant le scroll ---------- */
  const collection = document.querySelector('.collection');
  if (collection) {
    const piste = collection.querySelector('.collection__piste');
    const panneaux = [...piste.querySelectorAll('.panneau')];
    const images = panneaux.map((panneau) => panneau.querySelector('img'));
    const progression = collection.querySelector('.collection__progression');
    const actuel = collection.querySelector('.collection__actuel');
    const grandEcran = window.matchMedia('(min-width: 901px)');
    let distance = 0;

    const majSuivi = (p) => {
      progression.style.setProperty('--p', p.toFixed(4));
      actuel.textContent = String(Math.round(p * (panneaux.length - 1)) + 1).padStart(2, '0');
    };

    const mesurer = () => {
      const actif = grandEcran.matches && !MA.reduit;
      collection.classList.toggle('est-horizontale', actif);
      if (!actif) {
        distance = 0;
        collection.style.height = '';
        piste.style.transform = '';
        images.forEach((img) => { img.style.removeProperty('--decalage'); img.style.removeProperty('--rotation'); });
        return;
      }
      distance = Math.max(0, piste.scrollWidth - window.innerWidth);
      collection.style.height = `${distance + window.innerHeight}px`;
      MA.redessiner = true;
    };

    MA.ajouterTache(() => {
      if (!distance || !MA.scroll.aBouge) return;
      const p = MA.borner(-collection.getBoundingClientRect().top / distance, 0, 1);
      piste.style.transform = `translate3d(${(-p * distance).toFixed(2)}px, 0, 0)`;
      majSuivi(p);
      // Chaque produit glisse et pivote légèrement selon sa position : effet de profondeur
      const n = panneaux.length - 1;
      images.forEach((img, i) => {
        const relatif = MA.borner(p * n - i, -1.5, 1.5);
        img.style.setProperty('--decalage', `${(relatif * -70).toFixed(1)}px`);
        img.style.setProperty('--rotation', `${(relatif * -8).toFixed(2)}deg`);
      });
    });

    // Sur mobile : le compteur suit le glissement au doigt
    piste.addEventListener('scroll', () => {
      if (distance) return;
      const max = piste.scrollWidth - piste.clientWidth;
      majSuivi(max > 0 ? piste.scrollLeft / max : 0);
    }, { passive: true });

    mesurer();
    window.addEventListener('resize', mesurer);
    window.addEventListener('load', mesurer);
  }

  /* ---------- 7. Compteurs animés (12, 4 800, 100 %, 48 h) ---------- */
  const animerCompteur = (el) => {
    const cible = parseFloat(el.dataset.compteur);
    const suffixe = el.dataset.suffixe || '';
    const ecrire = (valeur) => { el.textContent = Math.round(valeur).toLocaleString('fr-FR') + suffixe; };
    if (MA.reduit) { ecrire(cible); return; }
    const duree = 2200;
    const debut = performance.now();
    const etape = (t) => {
      const p = Math.min((t - debut) / duree, 1);
      ecrire(cible * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)));
      if (p < 1) requestAnimationFrame(etape);
    };
    requestAnimationFrame(etape);
  };
  const compteurs = document.querySelectorAll('[data-compteur]');
  if ('IntersectionObserver' in window) {
    const observateurCompteurs = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        animerCompteur(entree.target);
        observateurCompteurs.unobserve(entree.target);
      });
    }, { threshold: 0.6 });
    compteurs.forEach((compteur) => observateurCompteurs.observe(compteur));
  } else {
    compteurs.forEach(animerCompteur);
  }
})();
