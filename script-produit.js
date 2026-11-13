/* =========================================================
   PAGE PRODUIT — page-produit.html?produit=identifiant
   Galerie, prix, livraison estimée, achat (+ barre collante sur mobile),
   « À associer avec », conseils, sécurité, FAQ, produits similaires,
   données structurées pour Google.
   ========================================================= */
(function () {
  var CATALOGUE = window.CATALOGUE;
  var CONFIG = window.CONFIG_BOUTIQUE;
  var B = window.BOUTIQUE;
  if (!CATALOGUE || !B) return;

  var ids = Object.keys(CATALOGUE.produits);
  var id = new URLSearchParams(location.search).get('produit');
  var p = Object.prototype.hasOwnProperty.call(CATALOGUE.produits, id) ? CATALOGUE.produits[id] : null;

  var remplirSimilaires = function (liste) {
    document.querySelector('[data-similaires]').innerHTML = liste.map(function (x, i) { return B.carteProduit(x, i); }).join('');
  };

  /* ---------- Lien erroné ---------- */
  if (!p) {
    document.title = 'Produit introuvable — ' + CONFIG.nom;
    document.querySelector('.fiche').innerHTML =
      '<div class="collection-vide" style="grid-column: 1 / -1;"><h1 class="titre-2">Produit introuvable</h1>' +
      "<p>Ce produit n'existe pas ou n'est plus disponible.</p>" +
      '<a class="bouton bouton--plein" href="' + CATALOGUE.lienCollection('tous') + '" style="margin-top: 16px;">Voir tous les produits</a></div>';
    remplirSimilaires(ids.slice(0, 4));
    return;
  }

  var collection = CATALOGUE.collection(p.collection);
  var categorie = CATALOGUE.categories[p.categorie];
  var nom = B.echapper(p.nom);
  var options = (p.options || []).filter(function (o) { return o.valeurs.length; });
  var choix = CATALOGUE.choixParDefaut(p); // variante choisie par le client (parfum, couleur…)
  var prixActuel = function () { return CATALOGUE.prixVariante(p, choix); };
  var prixTexte = B.euros(prixActuel()) + (p.abonnement ? ' <small>/ mois</small>' : '');
  var remplacer = function (texte) {
    return texte.replace('{min}', CONFIG.livraison.delaiMinJours).replace('{max}', CONFIG.livraison.delaiMaxJours)
      .replace('{zone}', CONFIG.livraison.zone).replace('{retour}', CONFIG.retourJours);
  };

  /* ---------- Titre, description pour Google, fil d'Ariane ---------- */
  document.title = p.nom + ' — ' + CONFIG.nom;
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', (p.accroche + ' ' + p.description).slice(0, 155));
  document.querySelector('[data-fil]').innerHTML =
    '<a href="index.html">Accueil</a><span aria-hidden="true">/</span>' +
    (collection ? '<a href="' + CATALOGUE.lienCollection(collection.id) + '">' + B.echapper(collection.nom) + '</a><span aria-hidden="true">/</span>' : '') +
    '<span>' + nom + '</span>';

  /* ---------- 1. Galerie : diaporama automatique ----------
     Les photos défilent seules toutes les DUREE_PHOTO millisecondes, en fondu.
     Le défilement se met en pause quand le client survole la photo, la touche,
     choisit une vignette ou quand la galerie n'est plus visible à l'écran.
     Désactivé si l'appareil demande de réduire les animations. */
  var DUREE_PHOTO = 5000;
  var galerie = document.querySelector('[data-galerie]');
  var nbPhotos = p.photos.length;
  // Une seule photo : pas de vignettes. Aucune photo : 4 emplacements « Photo à venir ».
  var nbVignettes = nbPhotos === 1 ? 0 : (nbPhotos || 4);
  var vignettes = '';
  for (var i = 0; i < nbVignettes; i++) {
    vignettes += '<button class="galerie__vignette" type="button" data-photo="' + i + '" aria-label="Voir la photo ' + (i + 1) + '"' +
      (i === 0 ? ' aria-current="true"' : '') + '>' + B.visuelProduit(p, i) + '<span class="galerie__minuteur" aria-hidden="true"></span></button>';
  }
  var calques = '';
  for (var j = 0; j < Math.max(1, nbPhotos); j++) {
    calques += '<div class="galerie__calque' + (j === 0 ? ' est-active' : '') + '">' + B.visuelProduit(p, j) + '</div>';
  }
  var fleches = nbPhotos > 1
    ? '<button class="galerie__fleche galerie__fleche--prec" type="button" data-sens="-1" aria-label="Photo précédente">' + B.icone('fleche') + '</button>' +
      '<button class="galerie__fleche" type="button" data-sens="1" aria-label="Photo suivante">' + B.icone('fleche') + '</button>'
    : '';
  // Calque supplémentaire : la photo de la variante choisie (couleur, modèle…)
  var calqueVariante = options.some(function (o) { return o.valeurs.some(function (v) { return v.photo; }); })
    ? '<div class="galerie__variante"><img src="" alt="" width="800" height="800"></div>' : '';
  galerie.innerHTML = '<div class="galerie__principale">' + calques + calqueVariante + fleches + '</div>' +
    (nbVignettes ? '<div class="galerie__vignettes">' + vignettes + '</div>' : '');

  var variante = galerie.querySelector('.galerie__variante');
  var cacherVariante = function () { if (variante) variante.classList.remove('est-active'); };
  var galerieControle = { pause: function () {} };
  var montrerVariante = function (src) {
    if (!variante || !src) return;
    var img = variante.querySelector('img');
    img.src = src;
    img.alt = p.nom + ' : ' + CATALOGUE.libelleChoix(p, choix);
    variante.classList.add('est-active');
    galerieControle.pause(true);
  };

  if (nbPhotos > 1) {
    var principale = galerie.querySelector('.galerie__principale');
    var actuelle = 0;
    var minuteur = null;
    var enPause = false;
    var visible = true;
    var auto = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var afficher = function (n) {
      cacherVariante();
      actuelle = (n + nbPhotos) % nbPhotos;
      galerie.querySelectorAll('.galerie__calque').forEach(function (c, k) { c.classList.toggle('est-active', k === actuelle); });
      galerie.querySelectorAll('[data-photo]').forEach(function (v, k) { v.setAttribute('aria-current', String(k === actuelle)); });
      relancer();
    };
    var relancer = function () {
      clearTimeout(minuteur);
      galerie.classList.remove('est-en-lecture');
      if (!auto || enPause || !visible || document.hidden) return;
      if (variante && variante.classList.contains('est-active')) return; // photo de variante affichée
      void galerie.offsetWidth; // redémarre la petite barre de temps sous la vignette
      galerie.classList.add('est-en-lecture');
      galerie.style.setProperty('--duree-photo', DUREE_PHOTO + 'ms');
      minuteur = setTimeout(function () { afficher(actuelle + 1); }, DUREE_PHOTO);
    };
    var pause = function (oui) { enPause = oui; relancer(); };
    // Une photo de variante est affichée : le diaporama attend que le client reprenne la main
    galerieControle.pause = function () { relancer(); };

    galerie.addEventListener('click', function (e) {
      var vignette = e.target.closest('[data-photo]');
      var fleche = e.target.closest('[data-sens]');
      if (vignette) afficher(Number(vignette.dataset.photo));
      if (fleche) afficher(actuelle + Number(fleche.dataset.sens));
    });
    // Le client regarde la photo : on attend qu'il ait fini
    principale.addEventListener('mouseenter', function () { pause(true); });
    principale.addEventListener('mouseleave', function () { pause(false); });
    // Glisser du doigt sur mobile
    var departX = null;
    principale.addEventListener('touchstart', function (e) { departX = e.touches[0].clientX; pause(true); }, { passive: true });
    principale.addEventListener('touchend', function (e) {
      var ecart = departX === null ? 0 : e.changedTouches[0].clientX - departX;
      departX = null;
      enPause = false;
      if (Math.abs(ecart) > 40) afficher(actuelle + (ecart < 0 ? 1 : -1)); else relancer();
    });
    document.addEventListener('visibilitychange', relancer);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entrees) { visible = entrees[0].isIntersecting; relancer(); }, { threshold: 0.4 }).observe(principale);
    }
    relancer();
  }

  /* ---------- 2. Livraison estimée (jours ouvrés, réglés dans configuration-boutique.js) ---------- */
  var ajouterJoursOuvres = function (n) {
    var date = new Date();
    while (n > 0) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) n -= 1;
    }
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };
  var livraison = 'Livraison estimée entre le <strong>' + ajouterJoursOuvres(CONFIG.livraison.delaiMinJours) +
    '</strong> et le <strong>' + ajouterJoursOuvres(CONFIG.livraison.delaiMaxJours) + '</strong>';

  /* ---------- 3. Informations, achat, accordéons ---------- */
  var accordeon = function (titre, contenu, ouvert) {
    return '<details class="accordeon"' + (ouvert ? ' open' : '') + '><summary>' + titre + '<span class="accordeon__signe" aria-hidden="true"></span></summary>' +
      '<div class="accordeon__contenu"><div>' + contenu + '</div></div></details>';
  };
  var securite = p.securite ? accordeon('Informations de sécurité',
    '<p><mark class="a-completer">[À COMPLÉTER : pictogrammes de danger, mentions d\'avertissement et de prudence, nom et adresse du fournisseur, d\'après l\'étiquette CLP et la fiche de données de sécurité fournies par votre fournisseur]</mark></p>' +
    '<p>Tenir hors de portée des enfants et des animaux. Ne jamais laisser une flamme ou un appareil chauffant sans surveillance.</p>') : '';
  var faq = CATALOGUE.faqCommune.map(function (item) { return accordeon(B.echapper(item.q), '<p>' + B.echapper(remplacer(item.r)) + '</p>'); }).join('');

  /* Choix des variantes : une rangée de pastilles par option (parfum, couleur, taille…) */
  var blocOptions = options.length ? '<div class="options-produit">' + options.map(function (o, io) {
    return '<fieldset class="option-produit"><legend>' + B.echapper(o.nom) + ' : <strong data-option-choisie="' + io + '">' + B.echapper(choix[o.nom]) + '</strong></legend>' +
      '<div class="option-produit__valeurs">' + o.valeurs.map(function (v, iv) {
        return '<button class="puce' + (v.photo ? ' puce--photo' : '') + '" type="button" data-option="' + io + '" data-valeur="' + iv + '" aria-pressed="' + (v.nom === choix[o.nom]) + '">' +
          (v.photo ? '<img src="' + B.echapper(v.photo) + '" alt="" loading="lazy" width="68" height="68">' : '') + B.echapper(v.nom) + '</button>';
      }).join('') + '</div></fieldset>';
  }).join('') + '</div>' : '';
  var choixJson = function () { return B.echapper(JSON.stringify(choix)); };

  var achat = p.abonnement
    ? '<div class="emplacement-abonnement"><strong>Emplacement de l\'application d\'abonnement</strong><br>' +
      'Sur Shopify, une application d\'abonnement affichera ici le choix de la formule (encens ou bougies) et la fréquence de livraison.</div>' +
      '<button class="bouton bouton--plein bouton--bloc" type="button" disabled data-bouton-principal>Bientôt disponible</button>'
    : '<div class="achat">' +
        '<div class="quantite"><button type="button" data-quantite-moins aria-label="Retirer un">−</button><output data-quantite-valeur>1</output><button type="button" data-quantite-plus aria-label="Ajouter un">+</button></div>' +
        '<button class="bouton bouton--plein" type="button" data-ajouter="' + id + '" data-choix="' + choixJson() + '" data-quantite="1" data-bouton-principal>Ajouter au panier</button>' +
      '</div>';

  document.querySelector('[data-infos]').innerHTML =
    '<p class="surtitre">' + B.echapper(categorie) + '</p>' +
    '<h1 class="fiche__nom">' + nom + '</h1>' +
    '<p class="fiche__prix" data-prix-fiche>' + prixTexte + '</p>' +
    '<p class="fiche__accroche">' + B.echapper(p.accroche) + '</p>' +
    '<ul class="points-forts">' + p.pointsForts.map(function (point) { return '<li>' + B.icone('coche') + '<span>' + B.echapper(point) + '</span></li>'; }).join('') + '</ul>' +
    blocOptions +
    (p.abonnement ? '' : '<div class="livraison-estimee">' + B.icone('camion') + '<span>' + livraison + '</span></div>') +
    achat +
    '<ul class="reassurance-mini">' +
      '<li>' + B.icone('cadenas') + 'Paiement sécurisé</li>' +
      '<li>' + B.icone('retour') + CONFIG.retourJours + " jours pour changer d'avis</li>" +
      '<li>' + B.icone('colis') + 'Livraison suivie</li>' +
    '</ul>' +
    '<div class="fiche__description"><h2 class="titre-3" style="margin-bottom: 8px;">Description</h2><p>' + B.echapper(p.description) + '</p></div>' +
    '<div>' + accordeon("Conseils d'utilisation", '<p>' + B.echapper(p.conseil) + '</p>') + securite + faq + '</div>';

  /* Choix de la quantité */
  var boutonPrincipal = document.querySelector('[data-bouton-principal]');
  var valeur = document.querySelector('[data-quantite-valeur]');
  var quantite = 1;
  var majQuantite = function (ecart) {
    quantite = Math.min(Math.max(quantite + ecart, 1), 10);
    valeur.textContent = quantite;
    boutonPrincipal.dataset.quantite = quantite;
    var boutonBarre = document.querySelector('.barre-achat [data-ajouter]');
    if (boutonBarre) boutonBarre.dataset.quantite = quantite;
  };
  if (valeur) {
    document.querySelector('[data-quantite-moins]').addEventListener('click', function () { majQuantite(-1); });
    document.querySelector('[data-quantite-plus]').addEventListener('click', function () { majQuantite(1); });
  }

  /* ---------- 4. Barre d'achat collante (mobile) : visible tant que le bouton principal est hors de l'écran ---------- */
  var barre = document.querySelector('[data-barre-achat]');
  barre.innerHTML = '<div class="barre-achat__infos"><p class="barre-achat__nom">' + nom + '</p><p class="barre-achat__prix" data-prix-barre>' + prixTexte + '</p></div>' +
    (p.abonnement
      ? '<button class="bouton bouton--plein" type="button" disabled>Bientôt disponible</button>'
      : '<button class="bouton bouton--plein" type="button" data-ajouter="' + id + '" data-choix="' + choixJson() + '" data-quantite="1">Ajouter au panier</button>');

  /* Le client choisit une variante : prix, libellé, photo et boutons d'achat suivent */
  document.querySelector('[data-infos]').addEventListener('click', function (e) {
    var bouton = e.target.closest('[data-option]');
    if (!bouton) return;
    var o = options[Number(bouton.dataset.option)];
    var v = o.valeurs[Number(bouton.dataset.valeur)];
    choix[o.nom] = v.nom;
    bouton.parentNode.querySelectorAll('.puce').forEach(function (b) { b.setAttribute('aria-pressed', String(b === bouton)); });
    document.querySelector('[data-option-choisie="' + bouton.dataset.option + '"]').textContent = v.nom;
    var texte = B.euros(prixActuel());
    document.querySelector('[data-prix-fiche]').innerHTML = texte;
    document.querySelector('[data-prix-barre]').innerHTML = texte;
    document.querySelectorAll('[data-ajouter="' + id + '"]').forEach(function (b) { b.dataset.choix = JSON.stringify(choix); });
    if (v.photo) montrerVariante(v.photo);
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entrees) {
      var visible = !entrees[0].isIntersecting;
      barre.classList.toggle('est-visible', visible);
      barre.setAttribute('aria-hidden', String(!visible));
    }).observe(boutonPrincipal);
  }

  /* ---------- 5. « À associer avec » ---------- */
  var associe = CATALOGUE.produits[p.associe];
  if (associe && !p.abonnement && !associe.abonnement) {
    var vignetteDuo = function (x, avecLien) {
      var produit = CATALOGUE.produits[x];
      var contenu = '<span class="duo__visuel">' + B.visuelProduit(produit) + '</span>' + B.echapper(produit.nom) + '<small>' + B.euros(produit.prix) + '</small>';
      return avecLien ? '<a class="duo__produit" href="' + CATALOGUE.lienProduit(x) + '">' + contenu + '</a>' : '<div class="duo__produit">' + contenu + '</div>';
    };
    var duo = document.querySelector('[data-duo]');
    duo.hidden = false;
    duo.innerHTML = '<div class="duo" data-apparition>' +
      '<div><p class="surtitre">À associer avec</p><h2 class="titre-3">Le duo parfait</h2></div>' +
      '<div class="duo__produits">' + vignetteDuo(id, false) + '<span class="duo__plus" aria-hidden="true">+</span>' + vignetteDuo(p.associe, true) + '</div>' +
      '<div class="duo__total"><p>Les deux : <strong data-prix-duo>' + B.euros(prixActuel() + associe.prix) + '</strong></p>' +
        '<button class="bouton bouton--plein" type="button" data-ajouter-duo>Ajouter les deux au panier</button></div>' +
    '</div>';
    // Le produit de la page avec la variante choisie + le produit associé dans sa première variante
    duo.querySelector('[data-ajouter-duo]').addEventListener('click', function () {
      if (!window.PANIER) return;
      window.PANIER.ajouter(id, 1, choix);
      window.PANIER.ajouter(p.associe, 1, CATALOGUE.choixParDefaut(associe));
      window.PANIER.ouvrir();
    });
    document.querySelector('[data-infos]').addEventListener('click', function (e) {
      if (e.target.closest('[data-option]')) duo.querySelector('[data-prix-duo]').textContent = B.euros(prixActuel() + associe.prix);
    });
  }

  /* ---------- 6. Produits similaires : même catégorie, puis même collection, puis le reste ---------- */
  var autres = ids.filter(function (x) { return x !== id && x !== p.associe; });
  var memeCategorie = autres.filter(function (x) { return CATALOGUE.produits[x].categorie === p.categorie; });
  var memeCollection = autres.filter(function (x) { return memeCategorie.indexOf(x) < 0 && CATALOGUE.produits[x].collection === p.collection; });
  var reste = autres.filter(function (x) { return memeCategorie.indexOf(x) < 0 && memeCollection.indexOf(x) < 0; });
  remplirSimilaires(memeCategorie.concat(memeCollection, reste).slice(0, 4));

  /* ---------- 7. Données structurées (aident Google à afficher le produit) ---------- */
  var donnees = {
    '@context': 'https://schema.org/', '@type': 'Product',
    name: p.nom, description: p.description, category: categorie,
    brand: { '@type': 'Brand', name: CONFIG.nom },
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: (p.prix / 100).toFixed(2), url: location.href }
  };
  if (CATALOGUE.prixVariables(p)) {
    var tousLesPrix = [];
    options.forEach(function (o) { o.valeurs.forEach(function (v) { if (typeof v.prix === 'number') tousLesPrix.push(v.prix); }); });
    donnees.offers = { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: (Math.min.apply(null, tousLesPrix) / 100).toFixed(2), highPrice: (Math.max.apply(null, tousLesPrix) / 100).toFixed(2), url: location.href };
  }
  if (p.photos.length) donnees.image = p.photos.map(function (src) { return new URL(src, location.href).href; });
  if (CONFIG.paiementActif) donnees.offers.availability = 'https://schema.org/InStock';
  var fil = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: new URL('index.html', location.href).href }]
      .concat(collection ? [{ '@type': 'ListItem', position: 2, name: collection.nom, item: new URL(CATALOGUE.lienCollection(collection.id), location.href).href }] : [])
      .concat([{ '@type': 'ListItem', position: collection ? 3 : 2, name: p.nom }])
  };
  [donnees, fil].forEach(function (objet) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(objet);
    document.head.appendChild(script);
  });
})();
