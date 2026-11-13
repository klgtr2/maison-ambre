/* =========================================================
   SCRIPT COMMUN À TOUTES LES PAGES
   1. Icônes  2. En-tête + menu mobile  3. Pied de page
   4. Panier (structure)  5. Bandeau cookies (RGPD)  6. Notification
   7. Apparitions au scroll  8. Accordéons  9. Formulaires
   Modifier un lien du menu ou du pied de page ici le change sur tout le site.
   ========================================================= */
(function () {
  var CONFIG = window.CONFIG_BOUTIQUE;
  var CATALOGUE = window.CATALOGUE;
  var html = document.documentElement;
  html.classList.add('avec-js');
  // Icône d'onglet du navigateur
  if (!document.querySelector('link[rel="icon"]')) {
    document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="favicon.svg" type="image/svg+xml">');
  }

  /* ---------- Outils ---------- */
  var euros = function (centimes) {
    return (centimes / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };
  var echapper = function (texte) {
    return String(texte).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icone = function (nom, classe) {
    return '<svg class="icone ' + (classe || '') + '" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><use href="#i-' + nom + '"/></svg>';
  };

  /* ---------- 1. Icônes (une seule fois par page) ---------- */
  var symboles = {
    panier: '<path d="M5.5 7.5h13l-1 12.5h-11z"/><path d="M9 7.5a3 3 0 0 1 6 0"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    fermer: '<path d="M6 6l12 12M18 6L6 18"/>',
    fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    camion: '<path d="M3 6.5h11v9H3zM14 9.5h3.5l3 3v3H14"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    cadenas: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    retour: '<path d="M9 14l-4-4 4-4"/><path d="M5 10h9a5 5 0 0 1 0 10h-3"/>',
    europe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.5 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.5-3.6-8.5s1.1-5.9 3.6-8.5z"/>',
    coche: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    etoile: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    email: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4.5 7l7.5 6 7.5-6"/>',
    telephone: '<path d="M7.2 3.8l2.3 3.6-1.6 1.7a12 12 0 0 0 7 7l1.7-1.6 3.6 2.3-1 2.6c-.3.7-1 1.1-1.8 1A16 16 0 0 1 3.6 7.2c-.1-.8.3-1.5 1-1.8z"/>',
    colis: '<path d="M12 3.5l8 4v9l-8 4-8-4v-9z"/><path d="M4 7.5l8 4 8-4M12 11.5v9"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4c.5 2.5 2.3 4 5 4"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/>',
    pinterest: '<circle cx="12" cy="12" r="8.5"/><path d="M11 9.5c-1 4-1.8 7.5-2.5 10M11.5 13.5c3 1 5.5-1 5.5-3.8 0-2.5-2-4.2-5-4.2-3.2 0-5 2.2-5 4.4 0 1.1.4 2 1.2 2.4"/>',
    /* Icônes des types de produits (emplacements photo, accès rapides) */
    encens: '<path d="M8 20l8-10"/><path d="M16.5 9.2c-1.2-1.4.4-2.6-.6-4.2M18.5 8c-.8-1 .3-1.9-.4-3"/><path d="M5 20h10"/>',
    bruleurs: '<path d="M4 18h16"/><path d="M6 18c0-3 2.5-5 6-5s6 2 6 5"/><path d="M12 13V9"/><path d="M12 7c-1-1.2.4-2.2-.4-3.5"/>',
    bougies: '<rect x="7" y="9" width="10" height="11" rx="2"/><path d="M12 9V7"/><path d="M12 5.5c-.9-.8-.9-1.8 0-2.7.9.9.9 1.9 0 2.7z"/>',
    diffuseurs: '<path d="M8 13h8l1 7H7z"/><path d="M10 13v-2h4v2"/><path d="M11 11L8 3M12 11V2.5M13 11l3-8"/>',
    brumes: '<path d="M8 10h7v10H8z"/><path d="M9.5 10V7h4v3"/><path d="M13.5 7.5H16M18 6l1.5-1M18 8.5h2M18 11l1.5 1"/>',
    fondants: '<path d="M6 10h12"/><path d="M7 10c0 3 2 4.5 5 4.5s5-1.5 5-4.5"/><path d="M8 14.5L7 20h10l-1-5.5"/><path d="M12 18v-1.5"/>',
    coffrets: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 12.5h16M12 9v11"/><path d="M12 9c-2.5 0-4-1.2-4-2.6S9.5 4.3 12 9zM12 9c2.5 0 4-1.2 4-2.6S14.5 4.3 12 9z"/>',
    lampes: '<path d="M5 11a7 7 0 0 1 14 0z"/><path d="M12 11v8M8.5 20h7"/>',
    guirlandes: '<path d="M3 6c3 4 6 5.5 9 5.5S18 10 21 6"/><circle cx="7" cy="12" r="1.6"/><circle cx="12" cy="14.5" r="1.6"/><circle cx="17" cy="12" r="1.6"/>',
    textile: '<path d="M4 7h16v10H4z"/><path d="M4 11h16M4 14h16M8 7v10M12 7v10M16 7v10"/>',
    deco: '<path d="M9 9.5h6c0 2 2 3.5 2 6.5a5 5 0 0 1-10 0c0-3 2-4.5 2-6.5z"/><path d="M10 9.5V7h4v2.5"/><path d="M12 7c0-2 1-3.5 3-4.5"/>',
    rangement: '<path d="M4 9h16l-1.5 11h-13z"/><path d="M8 9a4 4 0 0 1 8 0"/><path d="M5 13h14M5.5 16.5h13"/>',
    abonnements: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/><path d="M9 14.5l2 2 4-4"/>'
  };
  var sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    Object.keys(symboles).map(function (nom) { return '<symbol id="i-' + nom + '" viewBox="0 0 24 24">' + symboles[nom] + '</symbol>'; }).join('') +
    '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  /* ---------- Cartes produit et emplacements photo (utilisés par toutes les pages) ---------- */
  var emplacementPhoto = function (produit) {
    return '<div class="emplacement-photo" role="img" aria-label="Photo à venir : ' + echapper(produit.nom) + '">' +
      icone(produit.categorie) + '<span>Photo à venir</span></div>';
  };
  var visuelProduit = function (produit, indexPhoto) {
    var photo = produit.photos && produit.photos[indexPhoto || 0];
    return photo
      ? '<img src="' + echapper(photo) + '" alt="' + echapper(produit.nom) + '" loading="lazy" width="800" height="800">'
      : emplacementPhoto(produit);
  };
  var carteProduit = function (id, index) {
    var p = CATALOGUE.produits[id];
    var lien = CATALOGUE.lienProduit(id);
    var prix = euros(p.prix) + (p.abonnement ? ' <small>/ mois</small>' : '');
    var action = p.abonnement
      ? '<a class="bouton bouton--contour carte-produit__ajouter" href="' + lien + '">Découvrir</a>'
      : '<button class="bouton bouton--contour carte-produit__ajouter" type="button" data-ajouter="' + id + '">Ajouter au panier</button>';
    return '<article class="carte-produit" style="--i:' + (index || 0) + '" data-apparition>' +
      '<div class="carte-produit__visuel">' + visuelProduit(p) +
        // 2e photo affichée au survol de la carte (ordinateur)
        (p.photos && p.photos[1] ? '<img class="carte-produit__survol" src="' + echapper(p.photos[1]) + '" alt="" loading="lazy" width="800" height="800">' : '') +
      '</div>' +
      '<p class="carte-produit__categorie">' + echapper(CATALOGUE.categories[p.categorie]) + '</p>' +
      '<h3 class="carte-produit__nom"><a href="' + lien + '">' + echapper(p.nom) + '</a></h3>' +
      '<p class="carte-produit__prix">' + prix + '</p>' + action +
      '</article>';
  };

  /* ---------- 2. En-tête + menu mobile ---------- */
  var liensCollections = CATALOGUE.collections.map(function (c) {
    return { href: CATALOGUE.lienCollection(c.id), texte: c.nom, court: c.court }; // court : nom affiché dans le menu du haut
  }).concat([{ href: CATALOGUE.lienCollection('tous'), texte: 'Tous les produits' }]);
  var nom = echapper(CONFIG.nom);
  var seuil = euros(CONFIG.livraison.seuilOffert).replace(',00', '');

  var entete =
    '<a class="lien-evitement" href="#contenu">Aller au contenu</a>' +
    '<div class="bandeau-annonce">Livraison offerte dès ' + seuil + ' · Paiement sécurisé · ' + CONFIG.retourJours + " jours pour changer d'avis</div>" +
    '<header class="entete"><div class="conteneur entete__interieur">' +
      '<button class="bouton-icone bouton-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu-mobile">' + icone('menu') + '</button>' +
      '<a class="logo" href="index.html">' + nom + '</a>' +
      '<nav class="navigation" aria-label="Navigation principale">' +
        liensCollections.map(function (l) { return '<a href="' + l.href + '">' + echapper(l.court || l.texte) + '</a>'; }).join('') +
        '<a class="navigation__secondaire" href="page-a-propos.html">À propos</a><a class="navigation__secondaire" href="page-contact.html">Contact</a>' +
      '</nav>' +
      '<button class="bouton-icone bouton-panier" type="button" aria-label="Panier, 0 article">' + icone('panier') + '<span class="panier__compteur">0</span></button>' +
    '</div></header>' +
    '<div class="voile" data-voile></div>' +
    '<nav class="menu-mobile" id="menu-mobile" aria-label="Menu mobile">' +
      '<div class="menu-mobile__haut"><span class="logo">' + nom + '</span>' +
        '<button class="bouton-icone" type="button" data-fermer-menu aria-label="Fermer le menu">' + icone('fermer') + '</button></div>' +
      '<div class="menu-mobile__liens">' +
        liensCollections.concat([{ href: 'page-a-propos.html', texte: 'À propos' }]).map(function (l) {
          return '<a href="' + l.href + '">' + echapper(l.texte) + icone('fleche') + '</a>';
        }).join('') +
      '</div>' +
      '<div class="menu-mobile__secondaires"><a href="page-faq.html">Questions fréquentes</a><a href="page-suivi-commande.html">Suivi de commande</a><a href="page-contact.html">Contact</a></div>' +
    '</nav>';

  var zoneEntete = document.querySelector('[data-entete]');
  if (zoneEntete) zoneEntete.outerHTML = entete; else document.body.insertAdjacentHTML('afterbegin', entete);

  // Lien de la page en cours mis en évidence
  var adresseActuelle = location.pathname.split('/').pop() + location.search;
  document.querySelectorAll('.navigation a').forEach(function (a) {
    if (a.getAttribute('href') === adresseActuelle) a.setAttribute('aria-current', 'page');
  });

  var enteteEl = document.querySelector('.entete');
  var majEntete = function () { enteteEl.classList.toggle('est-defile', window.scrollY > 10); };
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  /* Voile partagé par le menu mobile et le panier */
  var voile = document.querySelector('[data-voile]');
  var burger = document.querySelector('.bouton-burger');
  var ouvrirMenu = function () {
    html.classList.add('menu-ouvert'); voile.classList.add('est-visible');
    burger.setAttribute('aria-expanded', 'true');
  };
  var fermerMenu = function () {
    html.classList.remove('menu-ouvert');
    if (!html.classList.contains('panier-ouvert')) voile.classList.remove('est-visible');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', ouvrirMenu);
  document.querySelector('[data-fermer-menu]').addEventListener('click', fermerMenu);
  voile.addEventListener('click', function () {
    fermerMenu();
    if (window.PANIER) window.PANIER.fermer();
  });
  document.querySelectorAll('.menu-mobile a').forEach(function (a) { a.addEventListener('click', fermerMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermerMenu(); });

  /* ---------- 3. Pied de page ---------- */
  var reseaux = Object.keys(CONFIG.reseaux).filter(function (r) { return CONFIG.reseaux[r]; }).map(function (r) {
    return '<a class="bouton-icone" href="' + echapper(CONFIG.reseaux[r]) + '" target="_blank" rel="noopener" aria-label="' + r + '">' + icone(r) + '</a>';
  }).join('');
  var pied =
    '<footer class="pied"><div class="conteneur">' +
      '<div class="pied__grille">' +
        '<div><p class="pied__marque">' + nom + '</p><p class="pied__slogan">' + echapper(CONFIG.slogan) + '</p>' +
          (reseaux ? '<div class="pied__reseaux">' + reseaux + '</div>' : '') + '</div>' +
        '<div><p class="pied__titre">Boutique</p><ul class="pied__liens">' +
          liensCollections.map(function (l) { return '<li><a href="' + l.href + '">' + echapper(l.texte) + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><p class="pied__titre">Aide</p><ul class="pied__liens">' +
          '<li><a href="page-faq.html">Questions fréquentes</a></li><li><a href="page-suivi-commande.html">Suivi de commande</a></li>' +
          '<li><a href="page-politique-retour.html">Retours et remboursements</a></li><li><a href="page-contact.html">Contact</a></li></ul></div>' +
        '<div><p class="pied__titre">Informations</p><ul class="pied__liens">' +
          '<li><a href="page-a-propos.html">À propos</a></li><li><a href="page-mentions-legales.html">Mentions légales</a></li>' +
          '<li><a href="page-cgv.html">Conditions générales de vente</a></li><li><a href="page-confidentialite.html">Confidentialité</a></li>' +
          '<li><button type="button" data-ouvrir-cookies>Gérer les cookies</button></li></ul></div>' +
      '</div>' +
      '<div class="pied__bas"><p>© ' + new Date().getFullYear() + ' ' + nom + ' — Tous droits réservés</p><p>Livraison en ' + echapper(CONFIG.livraison.zone) + '</p></div>' +
    '</div></footer>';
  var zonePied = document.querySelector('[data-pied]');
  if (zonePied) zonePied.outerHTML = pied; else document.body.insertAdjacentHTML('beforeend', pied);

  /* ---------- 4. Panier coulissant (structure ; le fonctionnement est dans script-panier.js) ---------- */
  document.body.insertAdjacentHTML('beforeend',
    '<aside class="tiroir-panier" aria-label="Votre panier" aria-hidden="true">' +
      '<div class="tiroir-panier__entete"><p class="tiroir-panier__titre">Votre panier</p>' +
        '<button class="bouton-icone" type="button" data-fermer-panier aria-label="Fermer le panier">' + icone('fermer') + '</button></div>' +
      '<div class="livraison-offerte"><p class="livraison-offerte__texte"></p><div class="livraison-offerte__jauge" aria-hidden="true"><span></span></div></div>' +
      '<ul class="tiroir-panier__liste" aria-live="polite"></ul>' +
      '<div class="tiroir-panier__vide"><p>Votre panier est vide pour le moment.</p>' +
        '<a class="bouton bouton--plein" href="' + CATALOGUE.lienCollection('tous') + '">Découvrir la boutique</a></div>' +
      '<div class="tiroir-panier__pied">' +
        '<div class="tiroir-panier__total"><span>Sous-total</span><span data-sous-total>0,00 €</span></div>' +
        '<p class="tiroir-panier__note">Taxes incluses. Frais de livraison calculés à la validation de la commande.</p>' +
        '<button class="bouton bouton--plein bouton--bloc" type="button" data-commander>Passer commande</button>' +
        '<p class="tiroir-panier__message" role="status"></p>' +
        '<button class="lien-fleche" type="button" data-fermer-panier>Continuer mes achats ' + icone('fleche') + '</button>' +
      '</div>' +
    '</aside>');

  /* ---------- 5. Bandeau cookies (RGPD) ----------
     Aucun cookie facultatif n'est déposé sans votre accord. Le choix est gardé 6 mois.
     Pour ajouter plus tard un outil (TikTok Pixel, statistiques…), chargez-le seulement si :
       window.CONSENTEMENT.obtenir().marketing === true   (ou .mesure pour les statistiques) */
  var CLE_COOKIES = 'consentement-cookies';
  var SIX_MOIS = 182 * 24 * 60 * 60 * 1000;
  var lireConsentement = function () {
    try {
      var choix = JSON.parse(localStorage.getItem(CLE_COOKIES));
      if (choix && Date.now() - choix.date < SIX_MOIS) return choix;
    } catch (e) { /* rien */ }
    return null;
  };
  var abonnesConsentement = [];
  window.CONSENTEMENT = {
    obtenir: function () { return lireConsentement() || { mesure: false, marketing: false }; },
    surChangement: function (fonction) { abonnesConsentement.push(fonction); }
  };

  document.body.insertAdjacentHTML('beforeend',
    '<section class="bandeau-cookies" aria-label="Cookies" aria-hidden="true">' +
      '<p class="bandeau-cookies__titre">Un petit mot sur les cookies</p>' +
      '<p>Nous utilisons des cookies nécessaires au fonctionnement du site (panier). Avec votre accord, nous pourrons aussi mesurer la fréquentation et personnaliser nos publicités. Vous pouvez changer d\'avis à tout moment. <a href="page-confidentialite.html#cookies">En savoir plus</a></p>' +
      '<div class="bandeau-cookies__actions">' +
        '<button class="bouton bouton--contour" type="button" data-cookies="refuser">Tout refuser</button>' +
        '<button class="bouton bouton--contour" type="button" data-cookies="accepter">Tout accepter</button>' +
        '<button class="bandeau-cookies__personnaliser" type="button" data-ouvrir-cookies>Personnaliser mes choix</button>' +
      '</div>' +
    '</section>' +
    '<div class="fenetre-cookies" role="dialog" aria-modal="true" aria-labelledby="titre-cookies" aria-hidden="true">' +
      '<div class="fenetre-cookies__boite">' +
        '<p class="titre-3" id="titre-cookies">Vos choix de cookies</p>' +
        '<div class="choix-cookie"><div><strong>Nécessaires</strong><p>Panier, sécurité et mémorisation de vos choix. Toujours actifs.</p></div><input class="interrupteur" type="checkbox" checked disabled aria-label="Cookies nécessaires, toujours actifs"></div>' +
        '<div class="choix-cookie"><div><strong>Mesure d\'audience</strong><p>Statistiques de visite pour améliorer le site.</p></div><input class="interrupteur" type="checkbox" data-choix="mesure" aria-label="Mesure d\'audience"></div>' +
        '<div class="choix-cookie"><div><strong>Publicité et réseaux sociaux</strong><p>Mesure de nos publicités (par exemple sur TikTok) et offres adaptées.</p></div><input class="interrupteur" type="checkbox" data-choix="marketing" aria-label="Publicité et réseaux sociaux"></div>' +
        '<div class="bandeau-cookies__actions">' +
          '<button class="bouton bouton--contour" type="button" data-cookies="refuser">Tout refuser</button>' +
          '<button class="bouton bouton--plein" type="button" data-cookies="enregistrer">Enregistrer</button>' +
        '</div>' +
      '</div>' +
    '</div>');

  var bandeauCookies = document.querySelector('.bandeau-cookies');
  var fenetreCookies = document.querySelector('.fenetre-cookies');
  var afficher = function (el, visible) { el.classList.toggle('est-visible', visible); el.setAttribute('aria-hidden', String(!visible)); };
  var enregistrerConsentement = function (mesure, marketing) {
    var choix = { date: Date.now(), mesure: mesure, marketing: marketing };
    try { localStorage.setItem(CLE_COOKIES, JSON.stringify(choix)); } catch (e) { /* rien */ }
    afficher(bandeauCookies, false); afficher(fenetreCookies, false);
    abonnesConsentement.forEach(function (f) { f(choix); });
  };
  document.querySelectorAll('[data-cookies]').forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      var action = bouton.dataset.cookies;
      if (action === 'accepter') enregistrerConsentement(true, true);
      else if (action === 'refuser') enregistrerConsentement(false, false);
      else enregistrerConsentement(
        fenetreCookies.querySelector('[data-choix="mesure"]').checked,
        fenetreCookies.querySelector('[data-choix="marketing"]').checked
      );
    });
  });
  document.querySelectorAll('[data-ouvrir-cookies]').forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      var actuel = window.CONSENTEMENT.obtenir();
      fenetreCookies.querySelector('[data-choix="mesure"]').checked = actuel.mesure;
      fenetreCookies.querySelector('[data-choix="marketing"]').checked = actuel.marketing;
      afficher(fenetreCookies, true);
    });
  });
  fenetreCookies.addEventListener('click', function (e) { if (e.target === fenetreCookies) afficher(fenetreCookies, false); });
  if (!lireConsentement()) setTimeout(function () { afficher(bandeauCookies, true); }, 700);

  /* ---------- 6. Notification ---------- */
  document.body.insertAdjacentHTML('beforeend', '<div class="notification" role="status" aria-live="polite"></div>');
  var notification = document.querySelector('.notification');
  var minuteurNotification;
  var notifier = function (message) {
    notification.textContent = message;
    notification.classList.add('est-visible');
    clearTimeout(minuteurNotification);
    minuteurNotification = setTimeout(function () { notification.classList.remove('est-visible'); }, 2600);
  };

  /* Outils partagés avec les autres scripts */
  window.BOUTIQUE = {
    euros: euros, echapper: echapper, icone: icone, notifier: notifier,
    carteProduit: carteProduit, visuelProduit: visuelProduit, emplacementPhoto: emplacementPhoto,
    voile: voile
  };

  /* ---------- 7. Apparitions au scroll (relançable après un affichage dynamique) ---------- */
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observateur = ('IntersectionObserver' in window && !reduit)
    ? new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (!entree.isIntersecting) return;
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    : null;
  window.BOUTIQUE.observerApparitions = function (racine) {
    (racine || document).querySelectorAll('[data-apparition]:not(.est-visible)').forEach(function (el, i) {
      if (!el.style.getPropertyValue('--delai')) el.style.setProperty('--delai', ((i % 4) * 0.08) + 's');
      if (observateur) observateur.observe(el); else el.classList.add('est-visible');
    });
  };

  /* Parallaxe des grandes photos + barre de progression de lecture */
  var lancerEffetsScroll = function () {
    if (reduit) return;
    document.body.insertAdjacentHTML('beforeend', '<div class="progression-scroll" aria-hidden="true"></div>');
    var barre = document.querySelector('.progression-scroll');
    var photos = Array.prototype.slice.call(document.querySelectorAll(
      '.banniere__image, .bandeau-collection img, .philosophie__image img, .photo-page img'));
    photos.forEach(function (img) { img.setAttribute('data-parallaxe', ''); });
    var enAttente = false;
    var maj = function () {
      enAttente = false;
      var hauteurVue = window.innerHeight;
      var max = document.documentElement.scrollHeight - hauteurVue;
      barre.style.setProperty('--progression', max > 0 ? Math.min(1, window.scrollY / max) : 0);
      photos.forEach(function (img) {
        var cadre = img.parentElement.getBoundingClientRect();
        if (cadre.bottom < 0 || cadre.top > hauteurVue) return;
        // -1 quand le cadre arrive en bas de l'écran, +1 quand il sort en haut
        var avancee = (hauteurVue - cadre.top) / (hauteurVue + cadre.height) * 2 - 1;
        img.style.setProperty('--parallaxe', (avancee * cadre.height * 0.08).toFixed(1) + 'px');
      });
    };
    var demander = function () { if (!enAttente) { enAttente = true; requestAnimationFrame(maj); } };
    window.addEventListener('scroll', demander, { passive: true });
    window.addEventListener('resize', demander);
    maj();
  };

  /* ---------- 8. Accordéons animés (FAQ, fiches produit) ---------- */
  window.BOUTIQUE.activerAccordeons = function (racine) {
    (racine || document).querySelectorAll('details.accordeon:not([data-pret])').forEach(function (details) {
      details.dataset.pret = 'oui';
      var titre = details.querySelector('summary');
      var contenu = details.querySelector('.accordeon__contenu');
      details.classList.toggle('est-ouvert', details.open);
      titre.addEventListener('click', function (e) {
        if (reduit || !contenu.animate) { setTimeout(function () { details.classList.toggle('est-ouvert', details.open); }); return; }
        e.preventDefault();
        if (details.dataset.enMouvement) return;
        var ouvrir = !details.open;
        details.dataset.enMouvement = 'oui';
        details.classList.toggle('est-ouvert', ouvrir);
        if (ouvrir) details.open = true;
        var hauteur = contenu.scrollHeight + 'px';
        var animation = contenu.animate(
          ouvrir ? [{ height: '0px', opacity: 0 }, { height: hauteur, opacity: 1 }] : [{ height: hauteur, opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
        var fini = false;
        var terminer = function () {
          if (fini) return;
          fini = true; animation.cancel();
          if (!ouvrir) details.open = false;
          delete details.dataset.enMouvement;
        };
        animation.onfinish = terminer;
        setTimeout(terminer, 600); // sécurité si le navigateur ralentit l'animation
      });
    });
  };

  /* ---------- 9. Formulaires (newsletter, contact, suivi) ----------
     Ils ne sont pas encore reliés à un service : ils le seront avec Shopify. */
  var brancherFormulaire = function (selecteur, traiter) {
    document.querySelectorAll(selecteur).forEach(function (formulaire) {
      formulaire.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!formulaire.checkValidity()) { formulaire.reportValidity(); return; }
        var message = formulaire.querySelector('.message-formulaire');
        message.textContent = traiter(new FormData(formulaire), formulaire);
      });
    });
  };
  brancherFormulaire('.formulaire-newsletter', function (donnees, formulaire) {
    formulaire.reset();
    return "Merci ! Les inscriptions ouvriront au lancement de la boutique : votre adresse n'a pas encore été enregistrée.";
  });
  brancherFormulaire('.formulaire-suivi', function () {
    return 'Le suivi de commande sera disponible au lancement de la boutique : vous pourrez alors suivre votre colis avec votre numéro de commande et votre e-mail.';
  });
  brancherFormulaire('.formulaire-contact', function (donnees) {
    if (!CONFIG.email) return "Le formulaire sera relié à la boutique au lancement. En attendant, l'adresse e-mail de contact reste à renseigner.";
    var sujet = 'Contact : ' + (donnees.get('sujet') || CONFIG.nom);
    var corps = 'Nom : ' + donnees.get('nom') + '\nE-mail : ' + donnees.get('email') + '\n\n' + donnees.get('message');
    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);
    return 'Votre messagerie va s\'ouvrir avec votre message prêt à être envoyé.';
  });

  /* Coordonnées renseignées dans la configuration */
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var valeur = CONFIG[el.dataset.config];
    if (!valeur) return;
    el.textContent = valeur;
    var lien = el.closest('a');
    if (lien) lien.href = (el.dataset.config === 'email' ? 'mailto:' : 'tel:') + valeur.replace(/\s/g, '');
  });
  document.querySelectorAll('[data-nom-boutique]').forEach(function (el) { el.textContent = CONFIG.nom; });
  // Montants et délais repris de la configuration (FAQ, pages légales…)
  document.querySelectorAll('[data-seuil-livraison]').forEach(function (el) { el.textContent = seuil; });
  document.querySelectorAll('[data-delai-livraison]').forEach(function (el) {
    el.textContent = CONFIG.livraison.delaiMinJours + ' et ' + CONFIG.livraison.delaiMaxJours;
  });

  // Lancement : apparitions et accordéons déjà présents dans la page
  document.addEventListener('DOMContentLoaded', function () {
    window.BOUTIQUE.observerApparitions();
    window.BOUTIQUE.activerAccordeons();
    lancerEffetsScroll();
  });
})();
