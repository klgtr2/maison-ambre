/* =========================================================
   MAISON AMBRE — Chargement, curseur, en-tête et outils communs
   Ce fichier est chargé en premier : il crée l'objet « MaisonAmbre »
   utilisé par les deux autres scripts.
   ========================================================= */
(() => {
  const html = document.documentElement;

  /* ---------- Outils partagés ---------- */
  const MA = (window.MaisonAmbre = {
    reduit: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    pointeurFin: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    scroll: { y: window.scrollY, velocite: 0, aBouge: true },
    souris: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    redessiner: true,
    taches: [],
    ajouterTache(fn) { this.taches.push(fn); },
    lerp: (a, b, t) => a + (b - a) * t,
    borner: (v, min, max) => Math.min(Math.max(v, min), max),
  });

  /* Découpe un texte en mots (avec ou sans masque) en gardant les balises internes */
  MA.decouperEnMots = (el, masque = false) => {
    let index = 0;
    const traiter = (noeud) => {
      [...noeud.childNodes].forEach((enfant) => {
        if (enfant.nodeType === Node.TEXT_NODE) {
          const fragment = document.createDocumentFragment();
          enfant.textContent.split(/(\s+)/).forEach((morceau) => {
            if (!morceau) return;
            if (/^\s+$/.test(morceau)) { fragment.append(' '); return; }
            const mot = document.createElement('span');
            mot.className = masque ? 'mot-interieur' : 'mot';
            mot.style.setProperty('--i', index++);
            mot.textContent = morceau;
            if (masque) {
              const enveloppe = document.createElement('span');
              enveloppe.className = 'mot-masque';
              enveloppe.append(mot);
              fragment.append(enveloppe);
            } else {
              fragment.append(mot);
            }
          });
          enfant.replaceWith(fragment);
        } else if (enfant.nodeType === Node.ELEMENT_NODE && !enfant.matches('br, img, .pastille-texte')) {
          traiter(enfant);
        }
      });
    };
    traiter(el);
    return [...el.querySelectorAll(masque ? '.mot-interieur' : '.mot')];
  };

  /* Découpe un texte en lettres (chaque lettre reçoit son numéro --i) */
  MA.decouperEnLettres = (el) => {
    const texte = el.textContent.trim();
    el.textContent = '';
    [...texte].forEach((lettre, i) => {
      const span = document.createElement('span');
      span.textContent = lettre === ' ' ? ' ' : lettre;
      span.style.setProperty('--i', i);
      el.append(span);
    });
  };

  /* ---------- 1. Écran de chargement ---------- */
  const chargement = document.querySelector('.chargement');
  let pageLancee = false;
  const lancerPage = () => {
    if (pageLancee) return;
    pageLancee = true;
    html.classList.add('est-charge');
    setTimeout(() => html.classList.add('est-pret'), MA.reduit ? 0 : 350);
    setTimeout(() => { if (chargement) chargement.style.display = 'none'; }, 1300);
  };

  if (chargement && !MA.reduit) {
    MA.decouperEnLettres(chargement.querySelector('.chargement__logo'));
    const compteur = chargement.querySelector('.chargement__compteur');
    const barre = chargement.querySelector('.chargement__barre');
    const duree = 1500;
    const debut = performance.now();
    const animer = (maintenant) => {
      const p = Math.min((maintenant - debut) / duree, 1);
      const adouci = 1 - Math.pow(1 - p, 3);
      compteur.textContent = `${Math.round(adouci * 100)} %`;
      barre.style.setProperty('--progression', adouci);
      if (p < 1) requestAnimationFrame(animer);
      else setTimeout(lancerPage, 150);
    };
    requestAnimationFrame(animer);
    setTimeout(lancerPage, 4000); // sécurité si l'onglet est en arrière-plan
  } else {
    lancerPage();
  }

  /* ---------- 2. Curseur personnalisé (souris uniquement) ---------- */
  const curseur = document.querySelector('.curseur');
  if (curseur && MA.pointeurFin && !MA.reduit) {
    html.classList.add('curseur-perso');
    curseur.classList.add('curseur--cache');
    const point = curseur.querySelector('.curseur__point');
    const anneau = curseur.querySelector('.curseur__anneau');
    const texte = curseur.querySelector('.curseur__texte');
    const position = { x: MA.souris.x, y: MA.souris.y };

    window.addEventListener('pointermove', (e) => {
      MA.souris.x = e.clientX;
      MA.souris.y = e.clientY;
      point.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      curseur.classList.remove('curseur--cache');
    }, { passive: true });

    // L'anneau suit la souris avec un léger retard (effet élastique)
    MA.ajouterTache(() => {
      position.x = MA.lerp(position.x, MA.souris.x, 0.2);
      position.y = MA.lerp(position.y, MA.souris.y, 0.2);
      anneau.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    });

    // L'anneau grossit sur les éléments cliquables, ou affiche un mot (data-curseur="Voir")
    document.addEventListener('pointerover', (e) => {
      const cible = e.target.closest('a, button, input, [data-curseur], .objet');
      const avecTexte = !!cible && cible.hasAttribute('data-curseur');
      curseur.classList.toggle('curseur--texte', avecTexte);
      curseur.classList.toggle('curseur--survol', !!cible && !avecTexte);
      if (avecTexte) texte.textContent = cible.dataset.curseur;
    });
    html.addEventListener('mouseleave', () => curseur.classList.add('curseur--cache'));
  }

  /* ---------- 3. Boutons magnétiques (attirés par la souris) ---------- */
  if (MA.pointeurFin && !MA.reduit) {
    document.querySelectorAll('[data-magnetique]').forEach((el) => {
      const force = parseFloat(el.dataset.magnetique) || 0.3;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * force;
        const y = (e.clientY - (r.top + r.height / 2)) * force;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 4. En-tête, barre de progression, vitesse du scroll ---------- */
  const entete = document.querySelector('.entete');
  const barre = document.querySelector('.barre-progression');
  MA.ajouterTache(() => {
    const y = window.scrollY;
    const delta = y - MA.scroll.y;
    MA.scroll.y = y;
    MA.scroll.velocite = MA.lerp(MA.scroll.velocite, delta, 0.12);
    MA.scroll.aBouge = delta !== 0 || MA.redessiner;
    MA.redessiner = false;
    if (!MA.scroll.aBouge) return;

    entete.classList.toggle('est-defile', y > 30);
    // L'en-tête se cache quand on descend et revient dès qu'on remonte
    if (!html.classList.contains('menu-ouvert')) {
      if (delta > 0 && y > 500) entete.classList.add('est-cache');
      else if (delta < -3) entete.classList.remove('est-cache');
    }
    const max = document.documentElement.scrollHeight - window.innerHeight;
    barre.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  });
  window.addEventListener('resize', () => { MA.redessiner = true; });

  /* ---------- 5. Menu mobile ---------- */
  const burger = document.querySelector('.burger');
  const fermerMenu = () => {
    html.classList.remove('menu-ouvert');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  };
  burger?.addEventListener('click', () => {
    const ouvert = html.classList.toggle('menu-ouvert');
    burger.setAttribute('aria-expanded', String(ouvert));
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    entete.classList.remove('est-cache');
  });
  document.querySelectorAll('.menu-mobile a').forEach((lien) => lien.addEventListener('click', fermerMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && html.classList.contains('menu-ouvert')) fermerMenu();
  });

  /* ---------- Boucle d'animation unique (environ 60 images par seconde) ---------- */
  const boucle = () => {
    requestAnimationFrame(boucle);
    for (const tache of MA.taches) tache();
  };
  requestAnimationFrame(boucle);
})();
