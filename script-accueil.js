/* =========================================================
   ACCUEIL — remplit les accès rapides, les collections et les
   incontournables à partir de catalogue-produits.js
   ========================================================= */
(function () {
  var CATALOGUE = window.CATALOGUE;
  var B = window.BOUTIQUE;
  if (!CATALOGUE || !B) return;

  /* Accès rapides : un bouton par type de produit vendu */
  var envies = document.querySelector('[data-envies]');
  if (envies) {
    var categories = [];
    Object.keys(CATALOGUE.produits).forEach(function (id) {
      var c = CATALOGUE.produits[id].categorie;
      if (categories.indexOf(c) < 0) categories.push(c);
    });
    envies.innerHTML = categories.map(function (c) {
      return '<a class="envie" href="page-collection.html?collection=tous&amp;categorie=' + c + '">' +
        '<span class="envie__icone">' + B.icone(c) + '</span>' + B.echapper(CATALOGUE.categories[c]) + '</a>';
    }).join('');
  }

  /* Collections mises en avant */
  var collections = document.querySelector('[data-collections]');
  if (collections) {
    collections.innerHTML = CATALOGUE.collections.map(function (c) {
      var n = CATALOGUE.produitsDeCollection(c.id).length;
      return '<a class="carte-collection" href="' + CATALOGUE.lienCollection(c.id) + '" data-apparition>' +
        '<img src="' + B.echapper(c.image) + '" alt="' + B.echapper(c.alt) + '" loading="lazy" width="1200" height="1300">' +
        '<div class="carte-collection__texte">' +
          '<p class="surtitre">' + n + ' produit' + (n > 1 ? 's' : '') + '</p>' +
          '<h3 class="titre-2">' + B.echapper(c.nom) + '</h3>' +
          '<p>' + B.echapper(c.accroche) + '</p>' +
          '<span class="lien-fleche">Découvrir ' + B.icone('fleche') + '</span>' +
        '</div></a>';
    }).join('');
  }

  /* Incontournables : produits marqués « vedette: true » */
  var grille = document.querySelector('[data-incontournables]');
  if (grille) {
    grille.innerHTML = Object.keys(CATALOGUE.produits)
      .filter(function (id) { return CATALOGUE.produits[id].vedette; })
      .map(function (id, i) { return B.carteProduit(id, i); })
      .join('');
  }
})();
