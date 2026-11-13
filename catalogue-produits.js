/* =========================================================
   CATALOGUE — collections et produits de la boutique
   Source unique : il alimente l'accueil, les pages collection,
   les pages produit et le panier.
   - Prix en centimes : 1490 = 14,90 €.
   - photos : laissez [] tant que vous n'avez pas les photos produits ;
     ajoutez ensuite par exemple ['images/produits/fontaine-1.webp'].
   - associe : le produit proposé dans le bloc « À associer avec ».
   - securite : true = afficher le bloc « Informations de sécurité » (étiquetage CLP).
   Les textes de vente complets, prêts pour Shopify, sont dans descriptions-produits.md.
   ========================================================= */
var CATALOGUE = {
  collections: [
    {
      id: 'encens-parfums-ambiance',
      nom: "Encens & parfums d'ambiance",
      accroche: 'Fumées douces, bougies et senteurs pour faire de chaque pièce un cocon.',
      image: 'images/ambiance/collection-encens-parfums.webp',
      alt: "Deux cônes d'encens qui fument sur un fond sombre"
    },
    {
      id: 'coffrets-cadeaux',
      nom: 'Coffrets cadeaux',
      accroche: "Des attentions toutes prêtes, à offrir ou à s'offrir.",
      image: 'images/ambiance/collection-coffrets-cadeaux.webp',
      alt: 'Deux bougies dans des pots en verre ambré'
    }
  ],

  categories: {
    encens: 'Encens',
    bruleurs: 'Brûle-encens & porte-encens',
    bougies: 'Bougies',
    diffuseurs: 'Diffuseurs',
    brumes: 'Brumes & sprays',
    fondants: 'Fondants',
    coffrets: 'Coffrets',
    abonnements: 'Abonnements'
  },

  produits: {
    'cones-encens-reflux-lot-3': {
      nom: "Lot de 3 boîtes de cônes d'encens à reflux", prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: [], associe: 'fontaine-encens-reflux-ceramique',
      accroche: "Faites couler la fumée en cascade, comme une petite source apaisante.",
      description: "Ces cônes à reflux libèrent une fumée qui descend au lieu de monter. Posés sur un brûle-encens à reflux, ils créent une cascade hypnotique qui transforme n'importe quel coin de la maison en espace de calme. Le lot réunit trois boîtes pour varier les plaisirs.",
      pointsForts: ['Effet cascade avec un brûle-encens à reflux', 'Trois boîtes pour varier les ambiances', 'Idéal pour la détente et la méditation'],
      conseil: "Allumez la pointe du cône, laissez la flamme prendre quelques secondes puis soufflez-la. Posez le cône sur un brûle-encens à reflux : la fumée s'écoule vers le bas. Utilisez-le dans une pièce aérée, à l'abri des courants d'air."
    },
    'fontaine-encens-reflux-ceramique': {
      nom: 'Fontaine brûle-encens à reflux en céramique', prix: 2490, vedette: true,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: [], associe: 'cones-encens-reflux-lot-3',
      accroche: 'Une cascade de fumée apaisante, sculptée dans la céramique.',
      description: "Allumez un cône à reflux et posez-le au sommet : la fumée glisse lentement le long de la céramique, comme une source qui s'écoule. Un objet déco apaisant, aussi beau allumé qu'éteint, qui apporte une touche zen à votre salon ou à votre bureau.",
      pointsForts: ['En céramique', 'Effet cascade avec les cônes à reflux', 'Bel objet déco, même éteint'],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) au sommet de la fontaine : la fumée glisse le long de la céramique. Placez-la sur une surface stable, à l'abri des courants d'air, et videz les cendres une fois refroidie."
    },
    'batonnets-encens-lot-3': {
      nom: "Lot de 3 boîtes de bâtonnets d'encens", prix: 1390,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: [], associe: 'porte-encens-ceramique-bois',
      accroche: 'Le rituel classique, en trois boîtes à alterner selon vos envies.',
      description: "Le geste simple qui change l'ambiance d'une pièce : allumer un bâtonnet, souffler la flamme et laisser la fumée parfumer doucement l'air. Trois boîtes pour alterner selon les moments de la journée, de la lecture du matin au calme du soir.",
      pointsForts: ['Trois boîtes de bâtonnets', 'Parfait pour lire, se détendre ou méditer', "S'utilise avec un porte-encens"],
      conseil: "Allumez l'extrémité du bâtonnet, soufflez la flamme dès qu'elle a pris, puis plantez-le dans un porte-encens posé sur une surface résistante à la chaleur. Aérez la pièce après utilisation."
    },
    'porte-encens-ceramique-bois': {
      nom: 'Porte-encens en céramique ou en bois', prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: [], associe: 'batonnets-encens-lot-3',
      accroche: 'Le petit objet qui accueille vos bâtonnets avec élégance.',
      description: "Sobre et pratique, ce porte-encens maintient le bâtonnet et recueille les cendres. En céramique ou en bois selon le modèle, il trouve naturellement sa place sur une étagère, un bureau ou une table de chevet.",
      pointsForts: ['En céramique ou en bois, selon le modèle', 'Recueille les cendres', 'Format compact et discret'],
      conseil: "Plantez le bâtonnet dans l'orifice et inclinez-le au-dessus du support pour que les cendres tombent dessus. Posez-le sur une surface stable, loin de tout objet inflammable."
    },
    'bougie-parfumee-cire-soja': {
      nom: 'Bougie parfumée à la cire de soja', prix: 2190, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: [], associe: 'diffuseur-batonnets-100ml',
      accroche: 'Une flamme douce et un parfum qui réchauffe toute la pièce.',
      description: "Coulée dans une cire de soja, cette bougie diffuse une lumière douce et un parfum enveloppant. La compagne idéale des soirées cocooning, d'un bain chaud ou d'un dîner tranquille.",
      pointsForts: ['Cire de soja', 'Lumière douce et chaleureuse', 'Parfaite pour les soirées cocooning'],
      conseil: "Lors du premier allumage, laissez la cire fondre jusqu'aux bords pour éviter l'effet « tunnel ». Recoupez la mèche avant chaque utilisation et ne laissez jamais une bougie allumée sans surveillance."
    },
    'diffuseur-batonnets-100ml': {
      nom: 'Diffuseur à bâtonnets 100 ml', prix: 2190, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: [], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Un parfum continu, sans flamme, pour une maison qui sent bon.',
      description: "Plongez les bâtonnets dans le flacon de 100 ml : ils diffusent le parfum en continu, sans flamme ni électricité. Il suffit de les retourner de temps en temps pour raviver la senteur, dans l'entrée, le salon ou la salle de bain.",
      pointsForts: ['Flacon de 100 ml', 'Diffusion continue, sans flamme', "Idéal pour l'entrée, le salon ou la salle de bain"],
      conseil: "Plongez les bâtonnets dans le flacon et retournez-les après quelques heures pour lancer la diffusion. Retournez-les ensuite de temps en temps pour raviver le parfum. Gardez le flacon hors de portée des enfants."
    },
    'brume-oreiller-spray-ambiance': {
      nom: "Brume d'oreiller et spray d'ambiance", prix: 1690, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'brumes', photos: [], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Quelques pulvérisations pour un cocon de douceur.',
      description: "Vaporisée sur l'oreiller, les rideaux ou dans l'air, cette brume installe une atmosphère douce en un instant. Un petit rituel avant de dormir, ou pour rafraîchir une pièce en quelques secondes.",
      pointsForts: ["Sur l'oreiller, le linge ou dans l'air", 'Effet immédiat', 'Format pratique à garder près du lit'],
      conseil: "Agitez, puis vaporisez à environ 30 cm de l'oreiller, des rideaux ou dans la pièce. Évitez le contact avec les yeux et testez d'abord sur une petite zone de tissu."
    },
    'fondants-parfumes-brule-parfum': {
      nom: 'Fondants parfumés et brûle-parfum', prix: 2190, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'fondants', photos: [], associe: 'brume-oreiller-spray-ambiance',
      accroche: "Le parfum d'une bougie, avec la douceur des fondants.",
      description: "Faites chauffer un fondant dans le brûle-parfum : la cire fond doucement et libère son parfum dans toute la pièce. L'ensemble réunit le brûle-parfum et les fondants pour commencer tout de suite, et changer de senteur selon vos envies.",
      pointsForts: ['Brûle-parfum et fondants réunis', 'Un parfum qui se diffuse en douceur', 'Facile de changer de senteur'],
      conseil: "Déposez un fondant dans la coupelle du brûle-parfum et faites-le chauffer : la cire fond et libère son parfum. Laissez refroidir avant de changer de fondant et ne laissez jamais le brûle-parfum sans surveillance."
    },
    'diffuseur-ultrasonique-effet-flamme': {
      nom: 'Diffuseur ultrasonique effet flamme', prix: 3490,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: [], associe: 'brume-oreiller-spray-ambiance',
      accroche: "La magie d'une flamme, la douceur d'une brume parfumée.",
      description: "Ce diffuseur ultrasonique crée une fine brume éclairée par un effet flamme hypnotisant. Ajoutez quelques gouttes d'huile parfumée dans l'eau : la pièce se parfume doucement, dans une lumière apaisante.",
      pointsForts: ['Effet flamme lumineux', 'Brume fine et parfumée', 'Ambiance apaisante, idéale le soir'],
      conseil: "Remplissez le réservoir d'eau jusqu'au repère, ajoutez quelques gouttes d'huile parfumée, puis allumez. Videz et séchez le réservoir régulièrement."
    },
    'coffret-encens-pret-a-offrir': {
      nom: 'Coffret encens tout prêt (encens et porte-encens)', prix: 2490, vedette: true,
      collection: 'coffrets-cadeaux', categorie: 'coffrets', photos: [], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Le cadeau zen par excellence, prêt à offrir.',
      description: "Tout ce qu'il faut pour commencer : de l'encens et son porte-encens, réunis dans un coffret prêt à offrir. Une attention douce pour un anniversaire, une crémaillère, ou simplement pour se faire plaisir.",
      pointsForts: ['Encens et porte-encens réunis', 'Prêt à offrir', 'Idéal pour débuter'],
      conseil: "Allumez un bâtonnet d'encens, soufflez la flamme et plantez-le dans le porte-encens fourni. Posez l'ensemble sur une surface stable, dans une pièce aérée."
    },
    'abonnement-mensuel-encens-bougies': {
      nom: 'Abonnement mensuel encens ou bougies', prix: 2490, abonnement: true,
      collection: 'coffrets-cadeaux', categorie: 'abonnements', photos: [], associe: 'coffret-encens-pret-a-offrir',
      accroche: 'Chaque mois, une nouvelle ambiance livrée chez vous.',
      description: "Encens ou bougies : choisissez votre univers et recevez chaque mois une sélection pour faire vivre votre intérieur. Une petite surprise mensuelle, pour vous ou à offrir.",
      pointsForts: ['Encens ou bougies, au choix', 'Une sélection chaque mois', 'À garder pour soi ou à offrir'],
      conseil: "Choisissez votre formule (encens ou bougies) pour recevoir une sélection chaque mois. La durée et les conditions de résiliation seront précisées à l'ouverture des abonnements."
    }
  },

  /* Questions posées sur toutes les fiches produit ({min}, {max}, {zone}, {retour} sont remplacés) */
  faqCommune: [
    { q: 'Quand vais-je recevoir ma commande ?', r: 'La livraison est estimée entre {min} et {max} jours ouvrés après votre commande, en {zone}.' },
    { q: "Puis-je changer d'avis ?", r: 'Oui : vous disposez de {retour} jours après la réception pour nous retourner un article, dans les conditions de notre politique de retour.' }
  ]
};

/* ---------- Petits outils pour les pages ---------- */
CATALOGUE.produitsDeCollection = function (idCollection) {
  return Object.keys(CATALOGUE.produits).filter(function (id) {
    return !idCollection || idCollection === 'tous' || CATALOGUE.produits[id].collection === idCollection;
  });
};
CATALOGUE.collection = function (idCollection) {
  return CATALOGUE.collections.filter(function (c) { return c.id === idCollection; })[0] || null;
};
CATALOGUE.lienProduit = function (id) { return 'page-produit.html?produit=' + encodeURIComponent(id); };
CATALOGUE.lienCollection = function (id) { return 'page-collection.html?collection=' + encodeURIComponent(id); };
