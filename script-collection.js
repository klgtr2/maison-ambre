/* =========================================================
   PAGE COLLECTION — page-collection.html?collection=...&categorie=...
   Affiche les produits de la collection avec des filtres
   (catégorie, prix) et un tri. L'adresse garde les filtres choisis,
   pour pouvoir partager un lien (par exemple dans une vidéo TikTok).
   ========================================================= */
(function () {
  var CATALOGUE = window.CATALOGUE;
  var CONFIG = window.CONFIG_BOUTIQUE;
  var B = window.BOUTIQUE;
  if (!CATALOGUE || !B) return;

  var parametres = new URLSearchParams(location.search);
  var idCollection = parametres.get('collection') || 'tous';
  var collection = CATALOGUE.collection(idCollection);
  if (!collection) idCollection = 'tous';
  // Recherche depuis la loupe : page-collection.html?collection=tous&recherche=lavande
  var texteRecherche = (parametres.get('recherche') || '').trim();
  var resultatsRecherche = texteRecherche ? CATALOGUE.rechercher(texteRecherche).filter(function (r) {
    return idCollection === 'tous' || CATALOGUE.produits[r.id].collection === idCollection;
  }) : null;
  if (resultatsRecherche) collection = null; // pas de grande photo de collection pour une recherche

  /* ---------- En-tête de la collection ---------- */
  var nom = resultatsRecherche ? 'Résultats pour « ' + texteRecherche + ' »' : collection ? collection.nom : 'Tous les produits';
  var accroche = resultatsRecherche
    ? (resultatsRecherche.length ? resultatsRecherche.length + ' produit' + (resultatsRecherche.length > 1 ? 's correspondent' : ' correspond') + ' à votre recherche.' : 'Aucun produit ne correspond à votre recherche. Essayez un autre mot, ou parcourez nos collections.')
    : collection ? collection.accroche : 'Encens, bougies, lumières, déco et coffrets : toute notre sélection.';
  if (resultatsRecherche) document.querySelector('[data-bandeau-collection] .surtitre').textContent = 'Recherche';
  document.title = nom + ' — ' + CONFIG.nom;
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', nom + ' : ' + accroche);
  document.querySelector('[data-titre-collection]').textContent = nom;
  document.querySelector('[data-accroche-collection]').textContent = accroche;
  document.querySelector('[data-fil-collection]').textContent = nom;
  if (collection && collection.image) {
    var bandeau = document.querySelector('[data-bandeau-collection]');
    bandeau.classList.remove('bandeau-collection--simple');
    bandeau.insertAdjacentHTML('afterbegin', '<img src="' + B.echapper(collection.image) + '" alt="' + B.echapper(collection.alt) + '" width="1920" height="900" fetchpriority="high">');
  }

  /* ---------- Filtres ---------- */
  var idsCollection = resultatsRecherche
    ? resultatsRecherche.map(function (r) { return r.id; }) // ordre : les plus pertinents d'abord
    : CATALOGUE.produitsDeCollection(idCollection);
  var categories = [];
  idsCollection.forEach(function (id) {
    var c = CATALOGUE.produits[id].categorie;
    if (categories.indexOf(c) < 0) categories.push(c);
  });
  var tranches = [
    { id: 'tous', texte: 'Tous les prix', test: function () { return true; } },
    { id: 'moins-15', texte: 'Moins de 15 €', test: function (p) { return p < 1500; } },
    { id: '15-25', texte: '15 à 25 €', test: function (p) { return p >= 1500 && p <= 2500; } },
    { id: 'plus-25', texte: 'Plus de 25 €', test: function (p) { return p > 2500; } }
  ];
  var etat = {
    categorie: categories.indexOf(parametres.get('categorie')) >= 0 ? parametres.get('categorie') : 'toutes',
    prix: tranches.some(function (t) { return t.id === parametres.get('prix'); }) ? parametres.get('prix') : 'tous',
    tri: 'selection'
  };

  var zoneCategories = document.querySelector('[data-filtres-categories]');
  var zonePrix = document.querySelector('[data-filtres-prix]');
  var puce = function (type, valeur, texte) {
    return '<button class="puce" type="button" data-type="' + type + '" data-valeur="' + valeur + '" aria-pressed="false">' + B.echapper(texte) + '</button>';
  };
  zoneCategories.innerHTML = '<span class="groupe-filtres__titre">Catégorie</span>' + puce('categorie', 'toutes', 'Tout') +
    categories.map(function (c) { return puce('categorie', c, CATALOGUE.categories[c]); }).join('');
  zonePrix.innerHTML = '<span class="groupe-filtres__titre">Prix</span>' +
    tranches.map(function (t) { return puce('prix', t.id, t.texte); }).join('');
  if (categories.length < 2) zoneCategories.hidden = true;
  if (resultatsRecherche && !resultatsRecherche.length) document.querySelector('.barre-filtres').hidden = true;

  /* ---------- Affichage de la grille ---------- */
  var grille = document.querySelector('[data-grille]');
  var vide = document.querySelector('[data-vide]');
  var compte = document.querySelector('[data-compte]');
  var tri = document.querySelector('[data-tri]');

  var rendre = function () {
    var tranche = tranches.filter(function (t) { return t.id === etat.prix; })[0];
    var ids = idsCollection.filter(function (id) {
      var p = CATALOGUE.produits[id];
      return (etat.categorie === 'toutes' || p.categorie === etat.categorie) && tranche.test(p.prix);
    });
    if (etat.tri === 'prix-croissant') ids.sort(function (a, b) { return CATALOGUE.produits[a].prix - CATALOGUE.produits[b].prix; });
    if (etat.tri === 'prix-decroissant') ids.sort(function (a, b) { return CATALOGUE.produits[b].prix - CATALOGUE.produits[a].prix; });
    if (etat.tri === 'nom') ids.sort(function (a, b) { return CATALOGUE.produits[a].nom.localeCompare(CATALOGUE.produits[b].nom, 'fr'); });

    grille.innerHTML = ids.map(function (id, i) { return B.carteProduit(id, i); }).join('');
    // Recherche d'un parfum ou d'une couleur : la carte mène au produit avec cette variante déjà choisie
    if (resultatsRecherche) resultatsRecherche.forEach(function (r) {
      if (!r.variante) return;
      grille.querySelectorAll('a[href="' + CATALOGUE.lienProduit(r.id) + '"]').forEach(function (a) { a.href = CATALOGUE.lienProduitVariante(r.id, r.variante); });
    });
    B.observerApparitions(grille); // les nouvelles cartes apparaissent au scroll
    vide.hidden = ids.length > 0;
    compte.textContent = ids.length + ' produit' + (ids.length > 1 ? 's' : '');
    document.querySelectorAll('.puce').forEach(function (b) {
      b.setAttribute('aria-pressed', String(etat[b.dataset.type] === b.dataset.valeur));
    });

    // L'adresse garde les filtres (lien partageable)
    var adresse = new URLSearchParams({ collection: idCollection });
    if (texteRecherche) adresse.set('recherche', texteRecherche);
    if (etat.categorie !== 'toutes') adresse.set('categorie', etat.categorie);
    if (etat.prix !== 'tous') adresse.set('prix', etat.prix);
    history.replaceState(null, '', '?' + adresse.toString());
  };

  document.querySelector('.barre-filtres').addEventListener('click', function (e) {
    var bouton = e.target.closest('.puce');
    if (!bouton) return;
    etat[bouton.dataset.type] = bouton.dataset.valeur;
    rendre();
  });
  tri.addEventListener('change', function () { etat.tri = tri.value; rendre(); });
  document.querySelector('[data-reinitialiser]').addEventListener('click', function () {
    if (resultatsRecherche && !resultatsRecherche.length) { location.href = CATALOGUE.lienCollection('tous'); return; }
    etat.categorie = 'toutes'; etat.prix = 'tous'; rendre();
  });

  rendre();
})();
