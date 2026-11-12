/* =========================================================
   MAISON AMBRE — Catalogue des produits et règles de livraison
   SOURCE UNIQUE : ce fichier alimente le panier, les pages produits,
   le menu des univers ET le paiement Stripe (netlify/functions/creer-paiement.js).
   - Prix en centimes : 129000 = 1 290,00 €.
   - Le « nom » doit rester identique au texte data-ajout-panier de index.html.
   - type « meuble » ou « senteur » : sert au calcul de la livraison.
   - image : illustration (dessin) ; photo : photo du produit (prioritaire si renseignée).

   PHOTOS PROVISOIRES : photos gratuites Unsplash (licence Unsplash, usage commercial
   autorisé), dans images/photos. Elles montrent des produits proches, pas les vôtres :
   remplacez-les par vos propres photos (même nom de fichier) avant de vendre.
   Sources (https://images.unsplash.com/...) : canapé photo-1638962502979-05d81dcaa096,
   chaise photo-1705320678447-78c5fe2615a7, porte-manteau photo-1766634001794-b3003f486954,
   enfilade photo-1696774278451-c6ee5d685839, table photo-1717416697617-35e85462f812,
   diffuseur photo-1766984702326-1340e8dd38f0, bougie photo-1714228499605-367154d9bdb2,
   encens photo-1627769916425-74c2344a3439.
   ========================================================= */
var CATALOGUE_MAISON_AMBRE = {
  /* Les univers, dans l'ordre du menu */
  univers: [
    { id: 'canapes', nom: 'Canapés' },
    { id: 'chaises', nom: 'Chaises' },
    { id: 'porte-manteaux', nom: 'Porte-manteaux' },
    { id: 'meubles', nom: 'Meubles de maison' },
    { id: 'parfums', nom: "Parfums d'ambiance" },
    { id: 'encens', nom: 'Encens' }
  ],

  produits: {
    'canape-nuage': {
      nom: 'Canapé Nuage', prix: 129000, type: 'meuble', univers: 'canapes',
      image: 'images/illustration-canape.svg', photo: 'images/photos/photo-canape-nuage.jpg',
      accroche: "Un moelleux enveloppant pour s'y lover comme dans un nuage.",
      description: "Trois places généreuses et un velours côtelé doux au toucher : Nuage invite à ralentir. Le canapé idéal pour se retrouver, lire ou recevoir, du café du matin aux longues soirées.",
      details: [['Places', '3'], ['Revêtement', 'Velours côtelé']]
    },
    'chaise-alba': {
      nom: 'Chaise Alba', prix: 18900, type: 'meuble', univers: 'chaises',
      image: 'images/illustration-chaise.svg', photo: 'images/photos/photo-chaise-alba.jpg',
      accroche: "Le chêne et le lin réunis pour des repas qui s'éternisent.",
      description: "Alba associe la robustesse du chêne à la douceur d'un lin couleur sauge. Une chaise pensée pour les repas qui s'éternisent, aussi belle autour de la table que seule dans une entrée.",
      details: [['Matières', 'Chêne et lin'], ['Coloris', 'Sauge']]
    },
    'porte-manteau-sylve': {
      nom: 'Porte-manteau Sylve', prix: 14500, type: 'meuble', univers: 'porte-manteaux',
      image: 'images/illustration-porte-manteau.svg', photo: 'images/photos/photo-porte-manteau-sylve.jpg',
      accroche: "Il habille l'entrée et accueille vos manteaux avec élégance.",
      description: "En frêne massif, Sylve accueille manteaux, sacs et écharpes dès l'entrée. Une pièce sobre et chaleureuse qui donne du caractère à votre intérieur, au premier regard.",
      details: [['Bois', 'Frêne massif']]
    },
    'enfilade-lune': {
      nom: 'Enfilade Lune', prix: 98000, type: 'meuble', univers: 'meubles',
      image: 'images/illustration-enfilade.svg', photo: 'images/photos/photo-enfilade-lune.jpg',
      accroche: 'Noyer et cannage : tout se range, tout reste beau.',
      description: "La chaleur du noyer rencontre la légèreté du cannage. Lune range vaisselle, livres et souvenirs avec élégance, dans le salon comme dans la salle à manger.",
      details: [['Matières', 'Noyer et cannage']]
    },
    'table-appoint-galet': {
      nom: "Table d'appoint Galet", prix: 26000, type: 'meuble', univers: 'meubles',
      image: 'images/illustration-table-appoint.svg', photo: 'images/photos/photo-table-appoint-galet.jpg',
      accroche: 'La touche minérale du travertin, toujours à portée de main.',
      description: "Le travertin, pierre naturelle aux veinures uniques, donne à Galet une présence à la fois minérale et douce. À poser près du canapé ou du lit, pour une tasse, un livre ou une bougie.",
      details: [['Matière', 'Travertin']]
    },
    'diffuseur-figue-cedre': {
      nom: 'Diffuseur Figue & Cèdre', prix: 3900, type: 'senteur', univers: 'parfums',
      image: 'images/illustration-parfum-ambiance.svg', photo: 'images/photos/photo-diffuseur-figue-cedre.jpg',
      accroche: 'La fraîcheur de la figue, la chaleur du cèdre, jour et nuit.',
      description: "La fraîcheur verte de la figue rencontre la chaleur boisée du cèdre. Posé dans l'entrée ou le salon, ce diffuseur parfume votre intérieur en continu, sans flamme.",
      details: [['Contenance', '200 ml'], ['Notes', 'Figue, cèdre']]
    },
    'bougie-ambre-vanille': {
      nom: 'Bougie Ambre & Vanille', prix: 3200, type: 'senteur', univers: 'parfums',
      image: 'images/illustration-bougie-parfumee.svg', photo: 'images/photos/photo-bougie-ambre-vanille.jpg',
      accroche: "Une lumière douce et des notes chaudes d'ambre et de vanille.",
      description: "Coulée dans une cire végétale, cette bougie diffuse des notes chaudes d'ambre et de vanille pendant 50 heures. Une lumière douce pour les soirées d'hiver comme pour les dîners entre amis.",
      details: [['Cire', 'Végétale'], ['Durée de combustion', '50 h'], ['Notes', 'Ambre, vanille']]
    },
    'encens-santal-myrrhe': {
      nom: 'Encens Santal & Myrrhe', prix: 1800, type: 'senteur', univers: 'encens',
      image: 'images/illustration-encens.svg', photo: 'images/photos/photo-encens-santal-myrrhe.jpg',
      accroche: 'Des notes profondes de santal et de myrrhe pour vos moments de calme.',
      description: "Des notes profondes de santal et de myrrhe pour accompagner vos moments de calme : lecture, méditation ou fin de journée. Livré avec 40 bâtonnets et leur support.",
      details: [['Contenu', '40 bâtonnets + support'], ['Notes', 'Santal, myrrhe']]
    }
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

/* Outils partagés par les pages : visuel à afficher, lien de la page produit */
CATALOGUE_MAISON_AMBRE.visuel = function (id) {
  var produit = CATALOGUE_MAISON_AMBRE.produits[id];
  return produit ? (produit.photo || produit.image) : '';
};
CATALOGUE_MAISON_AMBRE.lienProduit = function (id) {
  return 'page-produit.html?produit=' + encodeURIComponent(id);
};

/* Permet au paiement Stripe (côté serveur) de lire ce même fichier */
if (typeof module !== 'undefined' && module.exports) module.exports = CATALOGUE_MAISON_AMBRE;
