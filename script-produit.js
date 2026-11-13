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
  var prixTexte = B.euros(p.prix) + (p.abonnement ? ' <small>/ mois</small>' : '');
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

  /* ---------- 1. Galerie : 4 emplacements carrés (photos des fournisseurs à venir) ---------- */
  var galerie = document.querySelector('[data-galerie]');
  // Une seule photo : pas de vignettes. Aucune photo : 4 emplacements « Photo à venir ».
  var nbVignettes = p.photos.length === 1 ? 0 : (p.photos.length || 4);
  var vignettes = '';
  for (var i = 0; i < nbVignettes; i++) {
    vignettes += '<button class="galerie__vignette" type="button" data-photo="' + i + '" aria-label="Voir la photo ' + (i + 1) + '"' +
      (i === 0 ? ' aria-current="true"' : '') + '>' + B.visuelProduit(p, i) + '</button>';
  }
  galerie.innerHTML = '<div class="galerie__principale">' + B.visuelProduit(p, 0) + '</div>' +
    (nbVignettes ? '<div class="galerie__vignettes">' + vignettes + '</div>' : '');
  galerie.addEventListener('click', function (e) {
    var vignette = e.target.closest('[data-photo]');
    if (!vignette || !p.photos[vignette.dataset.photo]) return;
    galerie.querySelector('.galerie__principale').innerHTML = B.visuelProduit(p, Number(vignette.dataset.photo));
    galerie.querySelectorAll('[data-photo]').forEach(function (v) { v.setAttribute('aria-current', String(v === vignette)); });
  });

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

  var achat = p.abonnement
    ? '<div class="emplacement-abonnement"><strong>Emplacement de l\'application d\'abonnement</strong><br>' +
      'Sur Shopify, une application d\'abonnement affichera ici le choix de la formule (encens ou bougies) et la fréquence de livraison.</div>' +
      '<button class="bouton bouton--plein bouton--bloc" type="button" disabled data-bouton-principal>Bientôt disponible</button>'
    : '<div class="achat">' +
        '<div class="quantite"><button type="button" data-quantite-moins aria-label="Retirer un">−</button><output data-quantite-valeur>1</output><button type="button" data-quantite-plus aria-label="Ajouter un">+</button></div>' +
        '<button class="bouton bouton--plein" type="button" data-ajouter="' + id + '" data-quantite="1" data-bouton-principal>Ajouter au panier</button>' +
      '</div>';

  document.querySelector('[data-infos]').innerHTML =
    '<p class="surtitre">' + B.echapper(categorie) + '</p>' +
    '<h1 class="fiche__nom">' + nom + '</h1>' +
    '<p class="fiche__prix">' + prixTexte + '</p>' +
    '<p class="fiche__accroche">' + B.echapper(p.accroche) + '</p>' +
    '<ul class="points-forts">' + p.pointsForts.map(function (point) { return '<li>' + B.icone('coche') + '<span>' + B.echapper(point) + '</span></li>'; }).join('') + '</ul>' +
    (p.abonnement ? '' : '<div class="livraison-estimee">' + B.icone('camion') + '<span>' + livraison + '</span></div>') +
    achat +
    '<ul class="reassurance-mini">' +
      '<li>' + B.icone('cadenas') + 'Paiement sécurisé</li>' +
      '<li>' + B.icone('retour') + CONFIG.retourJours + " jours pour changer d'avis</li>" +
      '<li>' + B.icone('europe') + "Expédié depuis l'Europe</li>" +
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
  barre.innerHTML = '<div class="barre-achat__infos"><p class="barre-achat__nom">' + nom + '</p><p class="barre-achat__prix">' + prixTexte + '</p></div>' +
    (p.abonnement
      ? '<button class="bouton bouton--plein" type="button" disabled>Bientôt disponible</button>'
      : '<button class="bouton bouton--plein" type="button" data-ajouter="' + id + '" data-quantite="1">Ajouter au panier</button>');
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
      '<div class="duo__total"><p>Les deux : <strong>' + B.euros(p.prix + associe.prix) + '</strong></p>' +
        '<button class="bouton bouton--plein" type="button" data-ajouter="' + id + ',' + p.associe + '">Ajouter les deux au panier</button></div>' +
    '</div>';
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
