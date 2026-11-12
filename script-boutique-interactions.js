/* =========================================================
   MAISON AMBRE — Interactions de la boutique
   Cartes inclinables, notification, panier, favoris,
   filtres, sélecteur de senteurs, newsletter.
   ========================================================= */
(() => {
  const MA = window.MaisonAmbre;
  if (!MA) return;

  /* ---------- 1. Cartes qui s'inclinent en 3D sous la souris ---------- */
  if (MA.pointeurFin && !MA.reduit) {
    document.querySelectorAll('[data-inclinaison]').forEach((carte) => {
      const max = parseFloat(carte.dataset.inclinaison) || 6;
      carte.addEventListener('pointerenter', () => carte.classList.add('est-survolee'));
      carte.addEventListener('pointermove', (e) => {
        const r = carte.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        carte.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
        carte.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
      });
      carte.addEventListener('pointerleave', () => {
        carte.classList.remove('est-survolee');
        carte.style.setProperty('--rx', '0deg');
        carte.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- 2. Notification en bas de l'écran ---------- */
  const notification = document.querySelector('.notification');
  const texteNotification = notification ? notification.querySelector('.notification__texte') : null;
  let minuteurNotification;
  const notifier = (message) => {
    if (!notification) return;
    texteNotification.textContent = message;
    notification.classList.add('est-visible');
    clearTimeout(minuteurNotification);
    minuteurNotification = setTimeout(() => notification.classList.remove('est-visible'), 2600);
  };

  /* ---------- 3. Ajout au panier : une bille s'envole jusqu'à l'icône ----------
     Le contenu du panier, le tiroir et le paiement sont gérés par
     script-panier-paiement.js (objet MaisonAmbre.panier). */
  const entete = document.querySelector('.entete');
  const panier = document.querySelector('.panier');
  const ajouterAuPanier = (nom) => {
    if (MA.panier) MA.panier.ajouter(nom);
  };

  const envolerVersPanier = (depuis, nom) => {
    entete.classList.remove('est-cache');
    if (MA.reduit || !Element.prototype.animate || !panier) { ajouterAuPanier(nom); return; }
    const depart = depuis.getBoundingClientRect();
    const decalageEntete = entete.getBoundingClientRect().top; // négatif si l'en-tête est encore caché
    const arrivee = panier.getBoundingClientRect();
    const bille = document.createElement('span');
    bille.className = 'bille';
    document.body.append(bille);
    const x0 = depart.left + depart.width / 2 - 8;
    const y0 = depart.top + depart.height / 2 - 8;
    const x1 = arrivee.left + arrivee.width / 2 - 8;
    const y1 = arrivee.top - decalageEntete + arrivee.height / 2 - 8;
    const vol = bille.animate([
      { transform: `translate(${x0}px, ${y0}px) scale(1)` },
      { transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - 140}px) scale(1.6)`, offset: 0.45 },
      { transform: `translate(${x1}px, ${y1}px) scale(0.5)` },
    ], { duration: 900, easing: 'cubic-bezier(0.5, 0, 0.3, 1)' });
    vol.onfinish = () => { bille.remove(); ajouterAuPanier(nom); };
  };

  document.querySelectorAll('[data-ajout-panier]').forEach((bouton) => {
    bouton.addEventListener('click', () => {
      envolerVersPanier(bouton, bouton.dataset.ajoutPanier);
      notifier(`« ${bouton.dataset.ajoutPanier} » ajouté au panier`);
      // Le texte du bouton devient « Ajouté ✓ » pendant un court instant
      const libelle = bouton.querySelector('[data-texte]') || bouton.querySelector('span');
      if (!libelle || bouton.dataset.libelleOrigine) return;
      bouton.dataset.libelleOrigine = libelle.textContent;
      libelle.textContent = 'Ajouté ✓';
      if (libelle.dataset.texte) libelle.dataset.texte = 'Ajouté ✓';
      setTimeout(() => {
        libelle.textContent = bouton.dataset.libelleOrigine;
        if (libelle.dataset.texte) libelle.dataset.texte = bouton.dataset.libelleOrigine;
        delete bouton.dataset.libelleOrigine;
      }, 1600);
    });
  });

  /* ---------- 4. Favoris (cœur) ---------- */
  document.querySelectorAll('.bouton-favori').forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const aime = bouton.classList.toggle('est-aime');
      bouton.setAttribute('aria-pressed', String(aime));
      notifier(aime ? 'Ajouté à vos favoris' : 'Retiré de vos favoris');
    });
  });

  /* ---------- 5. Filtres de la boutique (indicateur qui glisse) ---------- */
  const filtres = document.querySelector('.filtres');
  if (filtres) {
    const boutons = [...filtres.querySelectorAll('.filtre')];
    const indicateur = filtres.querySelector('.filtres__indicateur');
    const produits = [...document.querySelectorAll('.produit')];
    const placer = (bouton) => {
      indicateur.style.width = `${bouton.offsetWidth}px`;
      indicateur.style.transform = `translateX(${bouton.offsetLeft}px)`;
    };

    boutons.forEach((bouton) => {
      bouton.addEventListener('click', () => {
        boutons.forEach((b) => {
          b.classList.toggle('est-actif', b === bouton);
          b.setAttribute('aria-pressed', String(b === bouton));
        });
        placer(bouton);
        const choix = bouton.dataset.filtre;
        let rang = 0;
        produits.forEach((produit) => {
          const garder = choix === 'tous' || produit.dataset.categorie === choix;
          clearTimeout(produit.minuteurFiltre);
          if (garder) {
            produit.style.transitionDelay = `${(rang++ * 0.06).toFixed(2)}s`;
            produit.hidden = false;
            produit.classList.add('est-visible');
            requestAnimationFrame(() => requestAnimationFrame(() => produit.classList.remove('est-masque')));
          } else {
            produit.style.transitionDelay = '0s';
            produit.classList.add('est-masque');
            produit.minuteurFiltre = setTimeout(() => { produit.hidden = true; }, 450);
          }
        });
      });
    });

    const placerActif = () => placer(filtres.querySelector('.filtre.est-actif') || boutons[0]);
    placerActif();
    window.addEventListener('resize', placerActif);
    if (document.fonts) document.fonts.ready.then(placerActif);
  }

  /* ---------- 6. Sélecteur de senteurs (défile seul tant qu'on n'y touche pas) ---------- */
  const senteurs = document.querySelector('.senteurs');
  if (senteurs) {
    const choix = [...senteurs.querySelectorAll('.senteur')];
    const visuels = [...senteurs.querySelectorAll('.senteurs__produit')];
    const description = senteurs.querySelector('.senteurs__description');
    let indexActif = 0;
    let minuteurTexte;
    let auto = null;
    let utilisateurAChoisi = false;

    const choisir = (index) => {
      if (index === indexActif) return;
      const precedent = visuels[indexActif];
      const suivant = visuels[index];
      indexActif = index;
      choix.forEach((b, i) => {
        b.classList.toggle('est-actif', i === index);
        b.setAttribute('aria-pressed', String(i === index));
      });
      precedent.classList.remove('est-actif');
      precedent.classList.add('est-sortant');
      setTimeout(() => precedent.classList.remove('est-sortant'), 900);
      suivant.classList.remove('est-sortant');
      suivant.classList.add('est-actif');
      description.classList.add('change');
      clearTimeout(minuteurTexte);
      minuteurTexte = setTimeout(() => {
        description.textContent = choix[index].dataset.description;
        description.classList.remove('change');
      }, 300);
    };

    const arreterAuto = () => { clearInterval(auto); auto = null; };
    const lancerAuto = () => {
      if (auto || MA.reduit) return;
      auto = setInterval(() => choisir((indexActif + 1) % choix.length), 3800);
    };

    choix.forEach((bouton, i) => {
      const activer = () => { utilisateurAChoisi = true; arreterAuto(); choisir(i); };
      bouton.addEventListener('click', activer);
      bouton.addEventListener('pointerenter', activer);
      bouton.addEventListener('focus', activer);
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entree]) => {
        if (entree.isIntersecting && !utilisateurAChoisi) lancerAuto();
        else arreterAuto();
      }, { threshold: 0.35 }).observe(senteurs);
    }
  }

  /* ---------- 7. Newsletter (pas encore reliée à un service d'envoi) ---------- */
  const formulaire = document.querySelector('.formulaire');
  const merci = document.querySelector('.lettre__merci');
  if (formulaire && merci) {
    formulaire.addEventListener('submit', (e) => {
      e.preventDefault();
      merci.textContent = 'Merci ! Vous recevrez bientôt nos nouveautés.';
      merci.classList.add('est-visible');
      formulaire.reset();
      notifier('Inscription enregistrée');
    });
  }
})();
