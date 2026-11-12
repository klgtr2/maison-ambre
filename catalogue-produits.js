/* =========================================================
   MAISON AMBRE — Catalogue des produits et règles de livraison
   SOURCE UNIQUE DES PRIX : ce fichier est lu par le panier du site
   ET par le paiement Stripe (netlify/functions/creer-paiement.js).
   - Prix en centimes : 129000 = 1 290,00 €.
   - Le « nom » doit rester identique au texte data-ajout-panier de index.html.
   - type « meuble » ou « senteur » : sert au calcul de la livraison.
   ========================================================= */
var CATALOGUE_MAISON_AMBRE = {
  produits: {
    'canape-nuage':          { nom: 'Canapé Nuage',            prix: 129000, type: 'meuble',  image: 'images/illustration-canape.svg' },
    'chaise-alba':           { nom: 'Chaise Alba',             prix: 18900,  type: 'meuble',  image: 'images/illustration-chaise.svg' },
    'porte-manteau-sylve':   { nom: 'Porte-manteau Sylve',     prix: 14500,  type: 'meuble',  image: 'images/illustration-porte-manteau.svg' },
    'enfilade-lune':         { nom: 'Enfilade Lune',           prix: 98000,  type: 'meuble',  image: 'images/illustration-enfilade.svg' },
    'table-appoint-galet':   { nom: "Table d'appoint Galet",   prix: 26000,  type: 'meuble',  image: 'images/illustration-table-appoint.svg' },
    'diffuseur-figue-cedre': { nom: 'Diffuseur Figue & Cèdre', prix: 3900,   type: 'senteur', image: 'images/illustration-parfum-ambiance.svg' },
    'bougie-ambre-vanille':  { nom: 'Bougie Ambre & Vanille',  prix: 3200,   type: 'senteur', image: 'images/illustration-bougie-parfumee.svg' },
    'encens-santal-myrrhe':  { nom: 'Encens Santal & Myrrhe',  prix: 1800,   type: 'senteur', image: 'images/illustration-encens.svg' }
  },

  livraison: {
    seuilOffert: 30000,   // livraison offerte à partir de 300 € d'achat
    tarifSenteurs: 490,   // commande avec uniquement parfums, bougies ou encens : 4,90 €
    tarifMeubles: 3900,   // commande qui contient au moins un meuble : 39 €
    pays: ['FR', 'BE']    // pays de livraison acceptés (France, Belgique)
  },

  quantiteMax: 10         // quantité maximale par produit dans le panier
};

/* Calcule sous-total, livraison et total (en centimes) d'une liste [{ id, quantite }] */
CATALOGUE_MAISON_AMBRE.calculer = function (articles) {
  var produits = CATALOGUE_MAISON_AMBRE.produits;
  var regles = CATALOGUE_MAISON_AMBRE.livraison;
  var sousTotal = 0;
  var avecMeuble = false;
  articles.forEach(function (article) {
    var produit = produits[article.id];
    if (!produit) return;
    sousTotal += produit.prix * article.quantite;
    if (produit.type === 'meuble') avecMeuble = true;
  });
  var livraison = 0;
  if (sousTotal > 0 && sousTotal < regles.seuilOffert) {
    livraison = avecMeuble ? regles.tarifMeubles : regles.tarifSenteurs;
  }
  return { sousTotal: sousTotal, livraison: livraison, total: sousTotal + livraison, avecMeuble: avecMeuble };
};

/* Permet au paiement Stripe (côté serveur) de lire ce même fichier */
if (typeof module !== 'undefined' && module.exports) module.exports = CATALOGUE_MAISON_AMBRE;
