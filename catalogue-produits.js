/* =========================================================
   CATALOGUE — collections et produits de la boutique
   Source unique : il alimente l'accueil, les pages collection,
   les pages produit et le panier.
   - Prix en centimes : 1490 = 14,90 €.
   - photos : photos d'illustration Unsplash (voir credits-photos.md) en attendant
     les photos des fournisseurs ; remplacez-les par exemple par ['images/produits/fontaine-1.webp'].
     Mettez [] pour revenir à l'emplacement « Photo à venir ».
   - associe : le produit proposé dans le bloc « À associer avec ».
   - securite : true = afficher le bloc « Informations de sécurité » (étiquetage CLP).
   Les textes de vente complets, prêts pour Shopify, sont dans descriptions-produits.md.
   ========================================================= */
var CATALOGUE = {
  collections: [
    {
      id: 'encens-parfums-ambiance',
      nom: "Encens & parfums d'ambiance", court: 'Encens & parfums',
      accroche: 'Fumées douces, bougies et senteurs pour faire de chaque pièce un cocon.',
      image: 'images/ambiance/collection-encens-parfums.webp',
      alt: "Deux cônes d'encens qui fument sur un fond sombre"
    },
    {
      id: 'lumieres',
      nom: 'Lumières douces', court: 'Lumières',
      accroche: 'Lampes et guirlandes pour une lumière chaude, du coucher au réveil.',
      image: 'images/ambiance/collection-lumieres.webp',
      alt: 'Lampe champignon blanche allumée sur une table en bois'
    },
    {
      id: 'deco-rangement',
      nom: 'Déco & rangement', court: 'Déco & rangement',
      accroche: 'Plaids, céramiques et rangements en bois pour un intérieur doux et ordonné.',
      image: 'images/ambiance/collection-deco-rangement.webp',
      alt: 'Vase de fleurs de pampa dans un salon lumineux'
    },
    {
      id: 'coffrets-cadeaux',
      nom: 'Coffrets cadeaux', court: 'Coffrets cadeaux',
      accroche: "Des attentions toutes prêtes, à offrir ou à s'offrir.",
      image: 'images/ambiance/collection-coffrets-cadeaux.webp',
      alt: 'Deux bougies dans des pots en verre ambré'
    }
  ],

  /* L'ordre ici est celui des filtres et des accès rapides de l'accueil */
  categories: {
    encens: 'Encens',
    bruleurs: 'Brûle-encens & porte-encens',
    bougies: 'Bougies',
    diffuseurs: 'Diffuseurs',
    brumes: 'Brumes & sprays',
    fondants: 'Fondants',
    lampes: 'Lampes',
    guirlandes: 'Guirlandes',
    textile: 'Plaids & coussins',
    deco: 'Objets déco',
    rangement: 'Rangement',
    coffrets: 'Coffrets',
    abonnements: 'Abonnements'
  },

  produits: {
    'cones-encens-reflux-lot-3': {
      nom: "Lot de 3 boîtes de cônes d'encens à reflux", prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/cones-encens-reflux-lot-3.webp'], associe: 'fontaine-encens-reflux-ceramique',
      accroche: "Faites couler la fumée en cascade, comme une petite source apaisante.",
      description: "Ces cônes à reflux libèrent une fumée qui descend au lieu de monter. Posés sur un brûle-encens à reflux, ils créent une cascade hypnotique qui transforme n'importe quel coin de la maison en espace de calme. Le lot réunit trois boîtes pour varier les plaisirs.",
      pointsForts: ['Effet cascade avec un brûle-encens à reflux', 'Trois boîtes pour varier les ambiances', 'Idéal pour la détente et la méditation'],
      conseil: "Allumez la pointe du cône, laissez la flamme prendre quelques secondes puis soufflez-la. Posez le cône sur un brûle-encens à reflux : la fumée s'écoule vers le bas. Utilisez-le dans une pièce aérée, à l'abri des courants d'air."
    },
    'fontaine-encens-reflux-ceramique': {
      nom: 'Fontaine brûle-encens à reflux en céramique', prix: 2490, vedette: true,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/fontaine-encens-reflux-ceramique.webp'], associe: 'cones-encens-reflux-lot-3',
      accroche: 'Une cascade de fumée apaisante, sculptée dans la céramique.',
      description: "Allumez un cône à reflux et posez-le au sommet : la fumée glisse lentement le long de la céramique, comme une source qui s'écoule. Un objet déco apaisant, aussi beau allumé qu'éteint, qui apporte une touche zen à votre salon ou à votre bureau.",
      pointsForts: ['En céramique', 'Effet cascade avec les cônes à reflux', 'Bel objet déco, même éteint'],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) au sommet de la fontaine : la fumée glisse le long de la céramique. Placez-la sur une surface stable, à l'abri des courants d'air, et videz les cendres une fois refroidie."
    },
    'batonnets-encens-lot-3': {
      nom: "Lot de 3 boîtes de bâtonnets d'encens", prix: 1390,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/batonnets-encens-lot-3.webp'], associe: 'porte-encens-ceramique-bois',
      accroche: 'Le rituel classique, en trois boîtes à alterner selon vos envies.',
      description: "Le geste simple qui change l'ambiance d'une pièce : allumer un bâtonnet, souffler la flamme et laisser la fumée parfumer doucement l'air. Trois boîtes pour alterner selon les moments de la journée, de la lecture du matin au calme du soir.",
      pointsForts: ['Trois boîtes de bâtonnets', 'Parfait pour lire, se détendre ou méditer', "S'utilise avec un porte-encens"],
      conseil: "Allumez l'extrémité du bâtonnet, soufflez la flamme dès qu'elle a pris, puis plantez-le dans un porte-encens posé sur une surface résistante à la chaleur. Aérez la pièce après utilisation."
    },
    'porte-encens-ceramique-bois': {
      nom: 'Porte-encens en céramique ou en bois', prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/porte-encens-ceramique-bois.webp'], associe: 'batonnets-encens-lot-3',
      accroche: 'Le petit objet qui accueille vos bâtonnets avec élégance.',
      description: "Sobre et pratique, ce porte-encens maintient le bâtonnet et recueille les cendres. En céramique ou en bois selon le modèle, il trouve naturellement sa place sur une étagère, un bureau ou une table de chevet.",
      pointsForts: ['En céramique ou en bois, selon le modèle', 'Recueille les cendres', 'Format compact et discret'],
      conseil: "Plantez le bâtonnet dans l'orifice et inclinez-le au-dessus du support pour que les cendres tombent dessus. Posez-le sur une surface stable, loin de tout objet inflammable."
    },
    'bougie-parfumee-cire-soja': {
      nom: 'Bougie parfumée à la cire de soja', prix: 2190, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: ['images/produits/bougie-parfumee-cire-soja.webp'], associe: 'diffuseur-batonnets-100ml',
      accroche: 'Une flamme douce et un parfum qui réchauffe toute la pièce.',
      description: "Coulée dans une cire de soja, cette bougie diffuse une lumière douce et un parfum enveloppant. La compagne idéale des soirées cocooning, d'un bain chaud ou d'un dîner tranquille.",
      pointsForts: ['Cire de soja', 'Lumière douce et chaleureuse', 'Parfaite pour les soirées cocooning'],
      conseil: "Lors du premier allumage, laissez la cire fondre jusqu'aux bords pour éviter l'effet « tunnel ». Recoupez la mèche avant chaque utilisation et ne laissez jamais une bougie allumée sans surveillance."
    },
    'diffuseur-batonnets-100ml': {
      nom: 'Diffuseur à bâtonnets 100 ml', prix: 2190, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-batonnets-100ml.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Un parfum continu, sans flamme, pour une maison qui sent bon.',
      description: "Plongez les bâtonnets dans le flacon de 100 ml : ils diffusent le parfum en continu, sans flamme ni électricité. Il suffit de les retourner de temps en temps pour raviver la senteur, dans l'entrée, le salon ou la salle de bain.",
      pointsForts: ['Flacon de 100 ml', 'Diffusion continue, sans flamme', "Idéal pour l'entrée, le salon ou la salle de bain"],
      conseil: "Plongez les bâtonnets dans le flacon et retournez-les après quelques heures pour lancer la diffusion. Retournez-les ensuite de temps en temps pour raviver le parfum. Gardez le flacon hors de portée des enfants."
    },
    'brume-oreiller-spray-ambiance': {
      nom: "Brume d'oreiller et spray d'ambiance", prix: 1690, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'brumes', photos: ['images/produits/brume-oreiller-spray-ambiance.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Quelques pulvérisations pour un cocon de douceur.',
      description: "Vaporisée sur l'oreiller, les rideaux ou dans l'air, cette brume installe une atmosphère douce en un instant. Un petit rituel avant de dormir, ou pour rafraîchir une pièce en quelques secondes.",
      pointsForts: ["Sur l'oreiller, le linge ou dans l'air", 'Effet immédiat', 'Format pratique à garder près du lit'],
      conseil: "Agitez, puis vaporisez à environ 30 cm de l'oreiller, des rideaux ou dans la pièce. Évitez le contact avec les yeux et testez d'abord sur une petite zone de tissu."
    },
    'fondants-parfumes-brule-parfum': {
      nom: 'Fondants parfumés et brûle-parfum', prix: 2190, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'fondants', photos: ['images/produits/fondants-parfumes-brule-parfum.webp'], associe: 'brume-oreiller-spray-ambiance',
      accroche: "Le parfum d'une bougie, avec la douceur des fondants.",
      description: "Faites chauffer un fondant dans le brûle-parfum : la cire fond doucement et libère son parfum dans toute la pièce. L'ensemble réunit le brûle-parfum et les fondants pour commencer tout de suite, et changer de senteur selon vos envies.",
      pointsForts: ['Brûle-parfum et fondants réunis', 'Un parfum qui se diffuse en douceur', 'Facile de changer de senteur'],
      conseil: "Déposez un fondant dans la coupelle du brûle-parfum et faites-le chauffer : la cire fond et libère son parfum. Laissez refroidir avant de changer de fondant et ne laissez jamais le brûle-parfum sans surveillance."
    },
    'diffuseur-ultrasonique-effet-flamme': {
      nom: 'Diffuseur ultrasonique effet flamme', prix: 3490,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-ultrasonique-effet-flamme.webp'], associe: 'brume-oreiller-spray-ambiance',
      accroche: "La magie d'une flamme, la douceur d'une brume parfumée.",
      description: "Ce diffuseur ultrasonique crée une fine brume éclairée par un effet flamme hypnotisant. Ajoutez quelques gouttes d'huile parfumée dans l'eau : la pièce se parfume doucement, dans une lumière apaisante.",
      pointsForts: ['Effet flamme lumineux', 'Brume fine et parfumée', 'Ambiance apaisante, idéale le soir'],
      conseil: "Remplissez le réservoir d'eau jusqu'au repère, ajoutez quelques gouttes d'huile parfumée, puis allumez. Videz et séchez le réservoir régulièrement."
    },
    /* ----- Lumières douces ----- */
    'lampe-champignon-sans-fil': {
      nom: 'Lampe champignon sans fil', prix: 2990, vedette: true,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-champignon-sans-fil.webp'], associe: 'guirlande-lumineuse-led',
      accroche: 'Une lumière ronde et douce, à poser partout, sans fil.',
      description: "Sa forme arrondie et sa lumière chaude en font la lampe cosy par excellence. Rechargeable et sans fil, elle se pose sur une table de chevet, une étagère ou une table de salon, là où vous avez besoin d'un halo apaisant.",
      pointsForts: ['Sans fil et rechargeable', 'Lumière chaude et tamisée', 'Se déplace facilement de pièce en pièce'],
      conseil: "Rechargez complètement la lampe avant la première utilisation. Gardez-la à l'abri de l'humidité et débranchez le câble une fois la charge terminée."
    },
    'guirlande-lumineuse-led': {
      nom: 'Guirlande lumineuse LED', prix: 1690,
      collection: 'lumieres', categorie: 'guirlandes', photos: ['images/produits/guirlande-lumineuse-led.webp'], associe: 'lampe-champignon-sans-fil',
      accroche: 'Des dizaines de petites lueurs pour réchauffer une pièce.',
      description: "Accrochée au-dessus d'un lit, autour d'un miroir ou dans un bocal, cette guirlande LED dessine une constellation de points lumineux chaleureux. Une touche de magie facile à installer, en toute saison.",
      pointsForts: ['LED basse consommation', 'Lumière blanc chaud', 'Facile à installer partout'],
      conseil: "Déroulez entièrement la guirlande avant de l'allumer. Fixez-la avec des crochets adhésifs et éteignez-la en quittant la maison."
    },
    'lampe-coucher-de-soleil': {
      nom: 'Lampe coucher de soleil', prix: 2490,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-coucher-de-soleil.webp'], associe: 'guirlande-lumineuse-led',
      accroche: "La lumière dorée d'une fin de journée, à tout moment.",
      description: "Orientez-la vers un mur : elle projette un grand halo orangé qui rappelle un coucher de soleil. Parfaite pour une ambiance détente le soir, ou pour de jolies photos et vidéos.",
      pointsForts: ['Halo coloré projeté sur le mur', 'Tête orientable', 'Idéale pour les photos et vidéos'],
      conseil: "Placez la lampe à environ un mètre d'un mur clair et orientez la tête pour régler la taille du halo. Ne regardez pas directement la source lumineuse."
    },

    /* ----- Déco & rangement ----- */
    'plaid-maille': {
      nom: 'Plaid en maille', prix: 3990, vedette: true,
      collection: 'deco-rangement', categorie: 'textile', photos: ['images/produits/plaid-maille.webp'], associe: 'housses-coussin-texturees-lot-2',
      accroche: 'La grosse maille douce qui invite à rester au chaud.',
      description: "Jeté sur un canapé ou au pied du lit, ce plaid en maille apporte instantanément de la chaleur et du relief. On s'y enroule pour lire, regarder un film ou profiter d'un dimanche tranquille.",
      pointsForts: ['Maille épaisse et douce', 'Habille un canapé ou un lit', 'Parfait pour les soirées cocooning'],
      conseil: "Lavez-le à froid, en cycle délicat, puis faites-le sécher à plat pour qu'il garde sa forme."
    },
    'housses-coussin-texturees-lot-2': {
      nom: 'Lot de 2 housses de coussin texturées', prix: 1990,
      collection: 'deco-rangement', categorie: 'textile', photos: ['images/produits/housses-coussin-texturees-lot-2.webp'], associe: 'plaid-maille',
      accroche: 'Du relief et de la douceur pour votre canapé.',
      description: "Deux housses au tissage texturé pour donner du caractère à votre canapé ou à votre lit. Leurs tons naturels s'accordent facilement avec un intérieur japandi, bohème ou scandinave.",
      pointsForts: ['Lot de deux housses', 'Tissage texturé', 'Tons naturels faciles à associer'],
      conseil: "Retirez le coussin intérieur avant de laver la housse à froid, à l'envers. Repassez à basse température si besoin."
    },
    'vase-ceramique-pampa': {
      nom: 'Vase en céramique et fleurs séchées de pampa', prix: 3290,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/vase-ceramique-pampa.webp'], associe: 'vide-poche-ceramique',
      accroche: 'Un bouquet qui ne fane jamais, dans un vase tout en douceur.',
      description: "Les plumeaux de pampa apportent du volume et de la légèreté, le vase en céramique leur donne un écrin sobre. Un duo qui réchauffe une console, une table basse ou un coin de chambre, sans entretien.",
      pointsForts: ['Vase en céramique', 'Fleurs séchées sans entretien', 'Apporte du volume et de la douceur'],
      conseil: "Placez le bouquet à l'abri du soleil direct et de l'humidité. Secouez-le légèrement de temps en temps pour enlever la poussière."
    },
    'vide-poche-ceramique': {
      nom: 'Vide-poche et plateau en céramique', prix: 1690,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/vide-poche-ceramique.webp'], associe: 'vase-ceramique-pampa',
      accroche: 'Le petit plateau qui range clés et bijoux avec style.',
      description: "Dans l'entrée pour les clés, sur la table de chevet pour les bagues ou dans la salle de bain : ce plateau en céramique garde l'essentiel à portée de main. Une jolie idée cadeau, aussi.",
      pointsForts: ['En céramique', "Pour l'entrée, la chambre ou la salle de bain", 'Bonne idée cadeau'],
      conseil: "Nettoyez-le avec un chiffon humide. Évitez les chocs : la céramique peut s'ébrécher."
    },
    'miroir-forme-organique': {
      nom: 'Miroir de forme organique', prix: 5490,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/miroir-forme-organique.webp'], associe: 'etagere-murale-flottante',
      accroche: 'Des courbes douces qui agrandissent et éclairent la pièce.',
      description: "Sa silhouette irrégulière casse les lignes droites et apporte une touche artistique à un mur. Il reflète la lumière et donne de la profondeur à une entrée, un salon ou une chambre.",
      pointsForts: ['Forme organique originale', 'Agrandit visuellement la pièce', "Pour l'entrée, le salon ou la chambre"],
      conseil: "Fixez-le sur un mur plein avec des vis et chevilles adaptées à son poids. Nettoyez-le avec un chiffon doux et un produit pour vitres."
    },
    'portemanteau-mural-bois': {
      nom: 'Portemanteau mural en bois', prix: 3490,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/portemanteau-mural-bois.webp'], associe: 'panier-tresse',
      accroche: "Une entrée rangée et chaleureuse, grâce au bois clair.",
      description: "Manteaux, sacs, chapeaux : ce portemanteau mural en bois libère l'entrée tout en la décorant. Ses lignes simples s'accordent avec un intérieur japandi ou scandinave.",
      pointsForts: ['En bois', 'Léger et facile à fixer', 'Range manteaux, sacs et chapeaux'],
      conseil: "Fixez-le avec des vis et chevilles adaptées à votre mur. Répartissez les charges sur les patères et évitez de les surcharger."
    },
    'etagere-murale-flottante': {
      nom: 'Étagère murale flottante', prix: 3490,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/etagere-murale-flottante.webp'], associe: 'vase-ceramique-pampa',
      accroche: 'Une étagère sans support visible, pour mettre en valeur vos objets.',
      description: "Ses fixations invisibles donnent l'impression qu'elle flotte sur le mur. Plantes, bougies, livres ou céramiques : elle crée un petit coin déco tout en gagnant de la place.",
      pointsForts: ['Fixations invisibles', 'Gain de place', 'Met en valeur plantes et objets'],
      conseil: "Vérifiez la nature de votre mur et utilisez des chevilles adaptées. Respectez la charge maximale indiquée par le fabricant."
    },
    'panier-tresse': {
      nom: 'Panier tressé', prix: 2990,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/panier-tresse.webp'], associe: 'plaid-maille',
      accroche: 'Un rangement naturel pour les plaids, les jouets ou les magazines.',
      description: "Tressé à la main dans des fibres naturelles, ce panier cache le petit désordre du quotidien avec charme. Au pied du canapé avec un plaid, dans la salle de bain avec des serviettes ou dans une chambre d'enfant.",
      pointsForts: ['Fibres naturelles tressées', 'Grande contenance', 'Pratique dans toutes les pièces'],
      conseil: "Dépoussiérez-le avec une brosse douce. Gardez-le à l'abri de l'humidité pour préserver les fibres."
    },

    /* ----- Coffrets cadeaux ----- */
    'coffret-encens-pret-a-offrir': {
      nom: 'Coffret encens tout prêt (encens et porte-encens)', prix: 2490, vedette: true,
      collection: 'coffrets-cadeaux', categorie: 'coffrets', photos: ['images/produits/coffret-encens-pret-a-offrir.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Le cadeau zen par excellence, prêt à offrir.',
      description: "Tout ce qu'il faut pour commencer : de l'encens et son porte-encens, réunis dans un coffret prêt à offrir. Une attention douce pour un anniversaire, une crémaillère, ou simplement pour se faire plaisir.",
      pointsForts: ['Encens et porte-encens réunis', 'Prêt à offrir', 'Idéal pour débuter'],
      conseil: "Allumez un bâtonnet d'encens, soufflez la flamme et plantez-le dans le porte-encens fourni. Posez l'ensemble sur une surface stable, dans une pièce aérée."
    },
    'abonnement-mensuel-encens-bougies': {
      nom: 'Abonnement mensuel encens ou bougies', prix: 2490, abonnement: true,
      collection: 'coffrets-cadeaux', categorie: 'abonnements', photos: ['images/produits/abonnement-mensuel-encens-bougies.webp'], associe: 'coffret-encens-pret-a-offrir',
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
