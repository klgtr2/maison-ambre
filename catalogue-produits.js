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
   - options : variantes au choix du client (parfum, couleur, taille…), voir en bas du fichier.
     Le « prix » du produit est alors le prix le plus bas (affiché « dès … » sur les cartes).
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
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/cones-encens-reflux-lot-3.webp', 'images/produits/cones-encens-reflux-lot-3-2.webp', 'images/produits/cones-encens-reflux-lot-3-3.webp'], associe: 'fontaine-encens-reflux-ceramique',
      accroche: "Faites couler la fumée en cascade, comme une petite source apaisante.",
      description: "Ces cônes à reflux libèrent une fumée qui descend au lieu de monter. Posés sur un brûle-encens à reflux, ils créent une cascade hypnotique qui transforme n'importe quel coin de la maison en espace de calme. Le lot réunit trois boîtes pour varier les plaisirs.",
      pointsForts: ['Effet cascade avec un brûle-encens à reflux', 'Trois boîtes pour varier les ambiances', 'Idéal pour la détente et la méditation'],
      conseil: "Allumez la pointe du cône, laissez la flamme prendre quelques secondes puis soufflez-la. Posez le cône sur un brûle-encens à reflux : la fumée s'écoule vers le bas. Utilisez-le dans une pièce aérée, à l'abri des courants d'air."
    },
    'fontaine-encens-reflux-ceramique': {
      nom: 'Fontaine brûle-encens à reflux en céramique', prix: 2490, vedette: true,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/fontaine-encens-reflux-ceramique.webp', 'images/produits/fontaine-encens-reflux-ceramique-2.webp', 'images/produits/fontaine-encens-reflux-ceramique-3.webp'], associe: 'cones-encens-reflux-lot-3',
      accroche: 'Une cascade de fumée apaisante, sculptée dans la céramique.',
      description: "Allumez un cône à reflux et posez-le au sommet : la fumée glisse lentement le long de la céramique, comme une source qui s'écoule. Un objet déco apaisant, aussi beau allumé qu'éteint, qui apporte une touche zen à votre salon ou à votre bureau.",
      pointsForts: ['En céramique', 'Effet cascade avec les cônes à reflux', 'Bel objet déco, même éteint'],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) au sommet de la fontaine : la fumée glisse le long de la céramique. Placez-la sur une surface stable, à l'abri des courants d'air, et videz les cendres une fois refroidie."
    },
    'batonnets-encens-lot-3': {
      nom: "Lot de 3 boîtes de bâtonnets d'encens", prix: 1390,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/batonnets-encens-lot-3.webp', 'images/produits/batonnets-encens-lot-3-2.webp', 'images/produits/batonnets-encens-lot-3-3.webp'], associe: 'porte-encens-ceramique-bois',
      accroche: 'Le rituel classique, en trois boîtes à alterner selon vos envies.',
      description: "Le geste simple qui change l'ambiance d'une pièce : allumer un bâtonnet, souffler la flamme et laisser la fumée parfumer doucement l'air. Trois boîtes pour alterner selon les moments de la journée, de la lecture du matin au calme du soir.",
      pointsForts: ['Trois boîtes de bâtonnets', 'Parfait pour lire, se détendre ou méditer', "S'utilise avec un porte-encens"],
      conseil: "Allumez l'extrémité du bâtonnet, soufflez la flamme dès qu'elle a pris, puis plantez-le dans un porte-encens posé sur une surface résistante à la chaleur. Aérez la pièce après utilisation."
    },
    'porte-encens-ceramique-bois': {
      nom: 'Porte-encens en céramique ou en bois', prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/porte-encens-ceramique-bois.webp', 'images/produits/porte-encens-ceramique-bois-2.webp', 'images/produits/porte-encens-ceramique-bois-3.webp'], associe: 'batonnets-encens-lot-3',
      accroche: 'Le petit objet qui accueille vos bâtonnets avec élégance.',
      description: "Sobre et pratique, ce porte-encens maintient le bâtonnet et recueille les cendres. En céramique ou en bois selon le modèle, il trouve naturellement sa place sur une étagère, un bureau ou une table de chevet.",
      pointsForts: ['En céramique ou en bois, selon le modèle', 'Recueille les cendres', 'Format compact et discret'],
      conseil: "Plantez le bâtonnet dans l'orifice et inclinez-le au-dessus du support pour que les cendres tombent dessus. Posez-le sur une surface stable, loin de tout objet inflammable."
    },
    'bougie-parfumee-cire-soja': {
      nom: 'Bougie parfumée à la cire de soja', prix: 1490, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: ['images/produits/bougie-parfumee-cire-soja.webp', 'images/produits/bougie-parfumee-cire-soja-2.webp', 'images/produits/bougie-parfumee-cire-soja-3.webp'], associe: 'diffuseur-batonnets-100ml',
      accroche: 'Une flamme douce et un parfum qui réchauffe toute la pièce.',
      description: "Coulée dans une cire de soja, cette bougie diffuse une lumière douce et un parfum enveloppant. La compagne idéale des soirées cocooning, d'un bain chaud ou d'un dîner tranquille.",
      pointsForts: ['Cire de soja', 'Lumière douce et chaleureuse', 'Parfaite pour les soirées cocooning'],
      conseil: "Lors du premier allumage, laissez la cire fondre jusqu'aux bords pour éviter l'effet « tunnel ». Recoupez la mèche avant chaque utilisation et ne laissez jamais une bougie allumée sans surveillance.",
      options: [
        { nom: "Taille", valeurs: [
          { nom: "Petite, 6 × 5 cm (env. 12 h)", detail: "Environ 12 heures de combustion, parfaite pour découvrir un parfum.", prix: 1490 },
          { nom: "Grande, 8 × 7 cm (env. 45 h)", detail: "Environ 45 heures de combustion, pour de nombreuses soirées.", prix: 2190 }
        ] },
        { nom: "Parfum", valeurs: [
          { nom: "Kaki du Japon, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--1.webp' },
          { nom: "Étoile de mer, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--2.webp' },
          { nom: "Jasmin, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--3.webp' },
          { nom: "Forêt noire, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--4.webp' },
          { nom: "Poire & freesia, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--5.webp' },
          { nom: "Rose, pot noir", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--6.webp' },
          { nom: "Lavande, pot noir", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--7.webp' },
          { nom: "Carillon bleu, pot noir", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--8.webp' },
          { nom: "Crème vanille, pot noir", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--9.webp' },
          { nom: "Osmanthe, pot noir", photo: 'images/produits/variantes/bougie-parfumee-cire-soja--10.webp' }
        ] }
      ]
    },
    'diffuseur-batonnets-100ml': {
      nom: 'Diffuseur à bâtonnets 100 ml', prix: 2190, vedette: true, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-batonnets-100ml.webp', 'images/produits/diffuseur-batonnets-100ml-2.webp', 'images/produits/diffuseur-batonnets-100ml-3.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Un parfum continu, sans flamme, pour une maison qui sent bon.',
      description: "Plongez les bâtonnets dans le flacon de 100 ml : ils diffusent le parfum en continu, sans flamme ni électricité. Il suffit de les retourner de temps en temps pour raviver la senteur, dans l'entrée, le salon ou la salle de bain.",
      pointsForts: ['Flacon de 100 ml', 'Diffusion continue, sans flamme', "Idéal pour l'entrée, le salon ou la salle de bain"],
      conseil: "Plongez les bâtonnets dans le flacon et retournez-les après quelques heures pour lancer la diffusion. Retournez-les ensuite de temps en temps pour raviver le parfum. Gardez le flacon hors de portée des enfants."
    },
    'brume-oreiller-spray-ambiance': {
      nom: "Brume d'oreiller et spray d'ambiance", prix: 1690, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'brumes', photos: ['images/produits/brume-oreiller-spray-ambiance.webp', 'images/produits/brume-oreiller-spray-ambiance-2.webp', 'images/produits/brume-oreiller-spray-ambiance-3.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Quelques pulvérisations pour un cocon de douceur.',
      description: "Vaporisée sur l'oreiller, les rideaux ou dans l'air, cette brume installe une atmosphère douce en un instant. Un petit rituel avant de dormir, ou pour rafraîchir une pièce en quelques secondes.",
      pointsForts: ["Sur l'oreiller, le linge ou dans l'air", 'Effet immédiat', 'Format pratique à garder près du lit'],
      conseil: "Agitez, puis vaporisez à environ 30 cm de l'oreiller, des rideaux ou dans la pièce. Évitez le contact avec les yeux et testez d'abord sur une petite zone de tissu."
    },
    'fondants-parfumes-brule-parfum': {
      // Article Eprolo : lampe chauffe-bougie (réf. 28584765)
      nom: 'Lampe chauffe-bougie et brûle-parfum', prix: 2190, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'fondants', photos: ['images/produits/fondants-parfumes-brule-parfum.webp', 'images/produits/fondants-parfumes-brule-parfum-2.webp', 'images/produits/fondants-parfumes-brule-parfum-3.webp'], associe: 'brume-oreiller-spray-ambiance',
      accroche: 'Le parfum de votre bougie, sans flamme, grâce à la chaleur de la lampe.',
      description: "Posez votre bougie parfumée sous la lampe : la chaleur de l'ampoule fait fondre la cire par le dessus et diffuse son parfum dans toute la pièce, sans flamme ni fumée. Elle fonctionne aussi avec des fondants posés dans un petit pot, et sa lumière douce fait d'elle une jolie lampe d'appoint.",
      pointsForts: ['Sans flamme ni fumée', 'Pour bougies en pot et fondants', "Fait aussi office de lampe d'ambiance"],
      conseil: "Placez la bougie en pot sous l'ampoule et allumez la lampe : la cire fond en quelques minutes. Éteignez-la en quittant la pièce et laissez refroidir avant de déplacer la bougie.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/fondants-parfumes-brule-parfum--1.webp' },
          { nom: "Noir", photo: 'images/produits/variantes/fondants-parfumes-brule-parfum--2.webp' }
        ] },
        { nom: "Version", valeurs: [
          { nom: "Avec variateur", detail: "Lumière et chaleur réglables.", prix: 2190 },
          { nom: "Variateur et minuterie", detail: "Lumière réglable et arrêt automatique grâce à la minuterie.", prix: 2490 }
        ] }
      ]
    },
    'diffuseur-ultrasonique-effet-flamme': {
      nom: 'Diffuseur ultrasonique effet flamme', prix: 3490,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-ultrasonique-effet-flamme.webp', 'images/produits/diffuseur-ultrasonique-effet-flamme-2.webp', 'images/produits/diffuseur-ultrasonique-effet-flamme-3.webp'], associe: 'brume-oreiller-spray-ambiance',
      accroche: "La magie d'une flamme, la douceur d'une brume parfumée.",
      description: "Ce diffuseur ultrasonique crée une fine brume éclairée par un effet flamme hypnotisant. Ajoutez quelques gouttes d'huile parfumée dans l'eau : la pièce se parfume doucement, dans une lumière apaisante.",
      pointsForts: ['Effet flamme lumineux', 'Brume fine et parfumée', 'Ambiance apaisante, idéale le soir'],
      conseil: "Remplissez le réservoir d'eau jusqu'au repère, ajoutez quelques gouttes d'huile parfumée, puis allumez. Videz et séchez le réservoir régulièrement.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Noir", photo: 'images/produits/variantes/diffuseur-ultrasonique-effet-flamme--1.webp' },
          { nom: "Blanc", photo: 'images/produits/variantes/diffuseur-ultrasonique-effet-flamme--2.webp' }
        ] }
      ]
    },
    /* Ajouts de novembre 2026 (Eprolo) */
    'cones-encens-reflux-parfums': {
      // Article Eprolo réf. 1023691
      nom: "Cônes d'encens à reflux parfumés", prix: 990, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/cones-encens-reflux-parfums.webp', 'images/produits/cones-encens-reflux-parfums-2.webp', 'images/produits/cones-encens-reflux-parfums-3.webp'], associe: 'brule-encens-cascade-montagne',
      accroche: "Dix-sept senteurs pour faire couler la fumée en cascade.",
      description: "Ces cônes à reflux sont percés en dessous : posés sur un brûle-encens à reflux, ils laissent couler leur fumée vers le bas comme une petite cascade. Choisissez votre senteur, du santal boisé à la fraîcheur du thé vert, en passant par la rose ou la lavande.",
      pointsForts: ["17 senteurs au choix", "Effet cascade avec un brûle-encens à reflux", "Parfait pour la détente et la méditation"],
      conseil: "Allumez la pointe du cône, laissez la flamme prendre quelques secondes puis soufflez-la. Posez-le sur un brûle-encens à reflux, à l'abri des courants d'air, dans une pièce aérée.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Santal" },
          { nom: "Rose" },
          { nom: "Lavande" },
          { nom: "Jasmin" },
          { nom: "Thé vert" },
          { nom: "Océan" },
          { nom: "Lotus" },
          { nom: "Osmanthe" },
          { nom: "Pivoine" },
          { nom: "Magnolia" },
          { nom: "Lys" },
          { nom: "Tubéreuse" },
          { nom: "Tulipe" },
          { nom: "Cerise" },
          { nom: "Myrtille" },
          { nom: "Ambre gris" },
          { nom: "Épices indiennes" }
        ] }
      ]
    },
    'cones-encens-reflux-pot': {
      // Article Eprolo réf. 20216510
      nom: "Pot de cônes d'encens à reflux (env. 60)", prix: 1390, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'encens', photos: ['images/produits/cones-encens-reflux-pot.webp', 'images/produits/cones-encens-reflux-pot-2.webp', 'images/produits/cones-encens-reflux-pot-3.webp'], associe: 'brule-encens-reflux-emaille',
      accroche: "Une réserve d'environ 60 cônes, dans la senteur de votre choix.",
      description: "Un pot d'environ 60 cônes à reflux, de quoi profiter longtemps de votre senteur préférée. Sur un brûle-encens à reflux, la fumée glisse lentement vers le bas et parfume doucement la pièce.",
      pointsForts: ["Environ 60 cônes par pot", "7 senteurs au choix, dont un mélange", "Pot pratique à ranger"],
      conseil: "Allumez la pointe du cône, soufflez la flamme puis posez-le sur un brûle-encens à reflux. Utilisez-le dans une pièce aérée, loin des courants d'air et de tout objet inflammable.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Mélange de senteurs" },
          { nom: "Rose" },
          { nom: "Lavande" },
          { nom: "Jasmin" },
          { nom: "Osmanthe" },
          { nom: "Lys" },
          { nom: "Citron" }
        ] }
      ]
    },
    'coupelle-palo-santo-sauge': {
      // Article Eprolo réf. 29318240
      nom: "Coupelle en céramique avec palo santo et sauge", prix: 1690, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/coupelle-palo-santo-sauge.webp', 'images/produits/coupelle-palo-santo-sauge-2.webp', 'images/produits/coupelle-palo-santo-sauge-3.webp'], associe: 'cones-encens-reflux-pot',
      accroche: "Le petit rituel pour purifier l'air et apaiser l'esprit.",
      description: "Une coupelle en céramique accompagnée de bois de palo santo et de sauge. Faites brûler un bâton quelques secondes, soufflez la flamme et laissez la fumée boisée envelopper la pièce. Un joli objet à laisser sur une étagère, même entre deux rituels.",
      pointsForts: ["Coupelle en céramique", "Palo santo et sauge inclus", "Deux coloris au choix"],
      conseil: "Allumez l'extrémité du bâton, laissez brûler quelques secondes puis soufflez la flamme. Posez-le dans la coupelle, sur une surface stable, et ne le laissez jamais sans surveillance.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Gris", photo: 'images/produits/variantes/coupelle-palo-santo-sauge--1.webp' },
          { nom: "Marron", photo: 'images/produits/variantes/coupelle-palo-santo-sauge--2.webp' }
        ] }
      ]
    },
    'porte-encens-mini-animaux': {
      // Article Eprolo réf. 19003934
      nom: "Mini porte-encens animaux", prix: 990,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/porte-encens-mini-animaux.webp', 'images/produits/porte-encens-mini-animaux-2.webp', 'images/produits/porte-encens-mini-animaux-3.webp'], associe: 'cones-encens-reflux-pot',
      accroche: "Un escargot, une tortue ou une fourmi pour veiller sur votre bâtonnet.",
      description: "Ces petits porte-encens en métal patiné maintiennent le bâtonnet bien droit. Escargot, tortue, fourmi ou lions jumeaux : choisissez l'animal et la patine qui vous plaisent, pour une touche de poésie sur un bureau ou une table de chevet.",
      pointsForts: ["9 modèles au choix", "Format mini et discret", "Pour bâtonnets d'encens"],
      conseil: "Plantez le bâtonnet dans l'orifice et placez le porte-encens sur une soucoupe ou une surface résistante à la chaleur pour recueillir les cendres.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Escargot doré", photo: 'images/produits/variantes/porte-encens-mini-animaux--1.webp' },
          { nom: "Escargot vert-de-gris", photo: 'images/produits/variantes/porte-encens-mini-animaux--2.webp' },
          { nom: "Escargot rouge", photo: 'images/produits/variantes/porte-encens-mini-animaux--3.webp' },
          { nom: "Tortue dorée", photo: 'images/produits/variantes/porte-encens-mini-animaux--4.webp' },
          { nom: "Tortue rouge antique", photo: 'images/produits/variantes/porte-encens-mini-animaux--5.webp' },
          { nom: "Fourmi rouge antique", photo: 'images/produits/variantes/porte-encens-mini-animaux--6.webp' },
          { nom: "Fourmi vert-de-gris", photo: 'images/produits/variantes/porte-encens-mini-animaux--7.webp' },
          { nom: "Lions jumeaux rouges", photo: 'images/produits/variantes/porte-encens-mini-animaux--8.webp' },
          { nom: "Lions jumeaux vert-de-gris", photo: 'images/produits/variantes/porte-encens-mini-animaux--9.webp' }
        ] }
      ]
    },
    'porte-encens-grenouille-ceramique': {
      // Article Eprolo réf. 19003906
      nom: "Porte-encens grenouille en céramique craquelée", prix: 1490,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/porte-encens-grenouille-ceramique.webp', 'images/produits/porte-encens-grenouille-ceramique-2.webp', 'images/produits/porte-encens-grenouille-ceramique-3.webp'], associe: 'cones-encens-reflux-pot',
      accroche: "Une petite grenouille zen qui tient votre bâtonnet d'encens.",
      description: "En céramique à l'émail craquelé façon céladon, cette petite grenouille sert de support à bâtonnet. Trois attitudes au choix, pensive, assise ou allongée, pour un objet plein de douceur sur une étagère ou un plateau à thé.",
      pointsForts: ["Céramique émaillée craquelée", "3 attitudes au choix", "Pour bâtonnets d'encens"],
      conseil: "Plantez le bâtonnet dans l'orifice prévu et posez la grenouille sur une coupelle pour recueillir les cendres. Nettoyez-la avec un chiffon doux.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Grenouille pensive", photo: 'images/produits/variantes/porte-encens-grenouille-ceramique--1.webp' },
          { nom: "Grenouille assise", photo: 'images/produits/variantes/porte-encens-grenouille-ceramique--2.webp' },
          { nom: "Grenouille allongée", photo: 'images/produits/variantes/porte-encens-grenouille-ceramique--3.webp' }
        ] }
      ]
    },
    'boite-encens-bois-ajouree': {
      // Article Eprolo réf. 21336360
      nom: "Boîte à encens en bois ajouré", prix: 1990,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/boite-encens-bois-ajouree.webp', 'images/produits/boite-encens-bois-ajouree-2.webp', 'images/produits/boite-encens-bois-ajouree-3.webp'], associe: 'cones-encens-reflux-pot',
      accroche: "Le bâtonnet se consume à l'abri, la fumée s'échappe par les motifs.",
      description: "Cette boîte en bois massif accueille un bâtonnet couché : les cendres restent à l'intérieur et la fumée s'échappe en volutes à travers les motifs ajourés. Pratique, propre et très joli posé sur une console.",
      pointsForts: ["Bois massif ajouré", "Recueille toutes les cendres", "3 motifs au choix"],
      conseil: "Placez un bâtonnet allumé (flamme soufflée) à l'intérieur, sur le support prévu, et refermez le couvercle. Videz les cendres une fois la boîte refroidie.",
      options: [
        { nom: "Motif", valeurs: [
          { nom: "Motif A", photo: 'images/produits/variantes/boite-encens-bois-ajouree--1.webp' },
          { nom: "Motif B", photo: 'images/produits/variantes/boite-encens-bois-ajouree--2.webp' },
          { nom: "Motif C", photo: 'images/produits/variantes/boite-encens-bois-ajouree--3.webp' }
        ] }
      ]
    },
    'brule-encens-cascade-montagne': {
      // Article Eprolo réf. 13735385
      nom: "Brûle-encens cascade « montagne »", prix: 1690,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/brule-encens-cascade-montagne.webp', 'images/produits/brule-encens-cascade-montagne-2.webp', 'images/produits/brule-encens-cascade-montagne-3.webp'], associe: 'cones-encens-reflux-parfums',
      accroche: "Une montagne de céramique où la fumée coule comme une rivière.",
      description: "Posez un cône à reflux au sommet : la fumée dévale les reliefs de la montagne et s'étale en brume à ses pieds. Une petite scène apaisante, quatre modèles au choix, pour un coin lecture ou un bureau.",
      pointsForts: ["En céramique", "Effet cascade avec les cônes à reflux", "4 modèles au choix"],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) dans le creux prévu au sommet. Placez le brûle-encens à l'abri des courants d'air et videz les cendres une fois refroidi.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Modèle A", photo: 'images/produits/variantes/brule-encens-cascade-montagne--1.webp' },
          { nom: "Modèle B", photo: 'images/produits/variantes/brule-encens-cascade-montagne--2.webp' },
          { nom: "Modèle C", photo: 'images/produits/variantes/brule-encens-cascade-montagne--3.webp' },
          { nom: "Modèle D", photo: 'images/produits/variantes/brule-encens-cascade-montagne--4.webp' }
        ] }
      ]
    },
    'brule-encens-reflux-emaille': {
      // Article Eprolo réf. 1045800
      nom: "Brûle-encens à reflux émaillé", prix: 1690,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/brule-encens-reflux-emaille.webp', 'images/produits/brule-encens-reflux-emaille-2.webp', 'images/produits/brule-encens-reflux-emaille-3.webp'], associe: 'cones-encens-reflux-pot',
      accroche: "Un émail profond et une fumée qui descend en douceur.",
      description: "Ce brûle-encens en céramique émaillée guide la fumée des cônes à reflux le long de ses courbes. Trois modèles aux émaux différents, pour un objet déco qui apaise l'œil autant que l'esprit.",
      pointsForts: ["Céramique émaillée", "Pour cônes à reflux", "3 modèles au choix"],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) sur l'orifice du sommet. Utilisez-le sur une surface stable, à l'abri des courants d'air.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Modèle A", photo: 'images/produits/variantes/brule-encens-reflux-emaille--1.webp' },
          { nom: "Modèle B", photo: 'images/produits/variantes/brule-encens-reflux-emaille--2.webp' },
          { nom: "Modèle C", photo: 'images/produits/variantes/brule-encens-reflux-emaille--3.webp' }
        ] }
      ]
    },
    'bougie-parfumee-pot-elegant': {
      // Article Eprolo réf. 30169700
      nom: "Bougie parfumée en pot élégant", prix: 2490, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: ['images/produits/bougie-parfumee-pot-elegant.webp', 'images/produits/bougie-parfumee-pot-elegant-2.webp', 'images/produits/bougie-parfumee-pot-elegant-3.webp'], associe: 'lampe-chauffe-bougie-retro',
      accroche: "Douze parfums, deux pots, un même moment de douceur.",
      description: "Une bougie parfumée coulée dans un pot élégant, blanc ou noir, qui reste joli une fois la bougie terminée. Fleurie, fraîche ou boisée : choisissez la senteur qui vous ressemble, à allumer ou à offrir.",
      pointsForts: ["12 parfums au choix", "Pot blanc ou noir réutilisable", "Belle idée cadeau"],
      conseil: "Lors du premier allumage, laissez fondre la cire jusqu'aux bords. Recoupez la mèche à 5 mm avant chaque utilisation et ne laissez jamais une bougie allumée sans surveillance.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Poire & freesia, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--1.webp' },
          { nom: "Carillon bleu, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--2.webp' },
          { nom: "Gardénia, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--3.webp' },
          { nom: "Source de montagne, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--4.webp' },
          { nom: "Thé Darjeeling, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--5.webp' },
          { nom: "Rose sauvage, pot blanc", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--6.webp' },
          { nom: "Poire & freesia, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--7.webp' },
          { nom: "Fleur poudrée, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--8.webp' },
          { nom: "Côte d'Azur, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--9.webp' },
          { nom: "Sauge & sel marin, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--10.webp' },
          { nom: "Carillon bleu, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--11.webp' },
          { nom: "Lavande & romarin, pot noir", photo: 'images/produits/variantes/bougie-parfumee-pot-elegant--12.webp' }
        ] }
      ]
    },
    'bougie-fleur-pivoine': {
      // Article Eprolo réf. 24142234
      nom: "Bougie fleur de pivoine", prix: 990, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: ['images/produits/bougie-fleur-pivoine.webp', 'images/produits/bougie-fleur-pivoine-2.webp', 'images/produits/bougie-fleur-pivoine-3.webp'], associe: 'bougeoir-ceramique',
      accroche: "Une pivoine en cire, presque trop jolie pour être allumée.",
      description: "Moulée à la main en forme de pivoine épanouie, cette petite bougie parfumée décore une table, un plateau ou une salle de bain. Huit couleurs au choix, à assortir à votre intérieur ou à glisser dans un cadeau.",
      pointsForts: ["Forme de pivoine moulée à la main", "8 couleurs au choix", "Petit cadeau tout trouvé"],
      conseil: "Posez-la sur une soucoupe ou un bougeoir avant de l'allumer. Ne la laissez jamais sans surveillance, loin de tout objet inflammable.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/bougie-fleur-pivoine--1.webp' },
          { nom: "Champagne", photo: 'images/produits/variantes/bougie-fleur-pivoine--2.webp' },
          { nom: "Rose poudré", photo: 'images/produits/variantes/bougie-fleur-pivoine--3.webp' },
          { nom: "Rose vif", photo: 'images/produits/variantes/bougie-fleur-pivoine--4.webp' },
          { nom: "Rouge", photo: 'images/produits/variantes/bougie-fleur-pivoine--5.webp' },
          { nom: "Jaune", photo: 'images/produits/variantes/bougie-fleur-pivoine--6.webp' },
          { nom: "Vert", photo: 'images/produits/variantes/bougie-fleur-pivoine--7.webp' },
          { nom: "Violet", photo: 'images/produits/variantes/bougie-fleur-pivoine--8.webp' }
        ] }
      ]
    },
    'bougie-geometrique-cire-soja': {
      // Article Eprolo réf. 31441998
      nom: "Bougie géométrique en cire de soja", prix: 1590, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'bougies', photos: ['images/produits/bougie-geometrique-cire-soja.webp', 'images/produits/bougie-geometrique-cire-soja-2.webp', 'images/produits/bougie-geometrique-cire-soja-3.webp'], associe: 'bougeoir-metal-ajoure',
      accroche: "Des formes graphiques en cire blanche, pour une déco minimaliste.",
      description: "Ces bougies en cire de soja blanche jouent avec les volumes : cubes, facettes et sphère à étages. Allumées ou non, elles apportent une touche graphique et lumineuse à une étagère ou une table basse.",
      pointsForts: ["Cire de soja", "6 formes au choix", "Style minimaliste"],
      conseil: "Posez la bougie sur une soucoupe résistante à la chaleur. Recoupez la mèche avant chaque utilisation et ne la laissez jamais sans surveillance.",
      options: [
        { nom: "Forme", valeurs: [
          { nom: "Grand cube", prix: 1590, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--1.webp' },
          { nom: "Cube diamant", prix: 1790, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--2.webp' },
          { nom: "Petits cubes cœur", prix: 1790, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--3.webp' },
          { nom: "Cube rayé", prix: 1790, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--4.webp' },
          { nom: "Diamant à étages", prix: 1790, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--5.webp' },
          { nom: "Sphère à étages", prix: 1790, photo: 'images/produits/variantes/bougie-geometrique-cire-soja--6.webp' }
        ] }
      ]
    },
    'diffuseur-pierre-parfumee': {
      // Article Eprolo réf. 27218595
      nom: "Diffuseur pierre parfumée sans flamme", prix: 2490, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-pierre-parfumee.webp', 'images/produits/diffuseur-pierre-parfumee-2.webp', 'images/produits/diffuseur-pierre-parfumee-3.webp'], associe: 'huile-parfumee-10ml',
      accroche: "Quelques gouttes sur la pierre, et la pièce embaume doucement.",
      description: "Une pierre minérale qui absorbe le parfum et le diffuse lentement, sans flamme ni électricité. Livrée avec son huile parfumée, elle se pose dans une chambre, une entrée ou une salle de bain et se recharge en quelques gouttes.",
      pointsForts: ["Sans flamme ni électricité", "Huile parfumée incluse", "8 senteurs au choix"],
      conseil: "Versez quelques gouttes d'huile sur la pierre et renouvelez dès que le parfum faiblit. Gardez le flacon hors de portée des enfants et évitez le contact de l'huile avec les meubles vernis.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Mousse de rosée", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--1.webp' },
          { nom: "Citron vert, basilic & mandarine", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--2.webp' },
          { nom: "Pêche blanche & thé oolong", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--3.webp' },
          { nom: "Oasis", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--4.webp' },
          { nom: "Cerisier de Yoshino", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--5.webp' },
          { nom: "Montagnes & eau claire", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--6.webp' },
          { nom: "Émeraude", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--7.webp' },
          { nom: "Osmanthe doré", photo: 'images/produits/variantes/diffuseur-pierre-parfumee--8.webp' }
        ] }
      ]
    },
    'diffuseur-bois-pierre-10ml': {
      // Article Eprolo réf. 26704205
      nom: "Diffuseur sans flamme bois et pierre 10 ml", prix: 1290, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-bois-pierre-10ml.webp', 'images/produits/diffuseur-bois-pierre-10ml-2.webp', 'images/produits/diffuseur-bois-pierre-10ml-3.webp'], associe: 'diffuseur-pierre-parfumee',
      accroche: "Un petit flacon, un parfum qui dure, aucune flamme.",
      description: "Ce petit diffuseur associe un flacon d'huile parfumée de 10 ml à un support en bois et pierre qui diffuse le parfum en continu. Parfait pour un bureau, une salle de bain ou une table de chevet.",
      pointsForts: ["Flacon de 10 ml", "Sans flamme ni électricité", "8 senteurs au choix"],
      conseil: "Versez quelques gouttes d'huile sur le bois ou la pierre et renouvelez au besoin. Gardez le flacon fermé et hors de portée des enfants.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Pêche blanche & thé oolong", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--1.webp' },
          { nom: "Thé Darjeeling", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--2.webp' },
          { nom: "Poire & freesia", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--3.webp' },
          { nom: "Carillon bleu", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--4.webp' },
          { nom: "Figue verte & cèdre", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--5.webp' },
          { nom: "Iris & mousse de chêne", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--6.webp' },
          { nom: "Jasmin de printemps", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--7.webp' },
          { nom: "Mojito", photo: 'images/produits/variantes/diffuseur-bois-pierre-10ml--8.webp' }
        ] }
      ]
    },
    'huile-parfumee-10ml': {
      // Article Eprolo réf. 33134614
      nom: "Huile essentielle pour diffuseur 10 ml", prix: 990, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/huile-parfumee-10ml.webp', 'images/produits/huile-parfumee-10ml-2.webp', 'images/produits/huile-parfumee-10ml-3.webp'], associe: 'diffuseur-lune-ceramique',
      accroche: "Le parfum de votre diffuseur, dans la senteur de votre choix.",
      description: "Un flacon de 10 ml à verser quelques gouttes à la fois dans un diffuseur ultrasonique ou sur une pierre parfumée. Agrumes, fleurs, bois ou épices : composez l'ambiance de chaque pièce selon vos envies.",
      pointsForts: ["Flacon de 10 ml", "Plus de 30 senteurs", "Pour diffuseurs et pierres parfumées"],
      conseil: "Ajoutez 3 à 5 gouttes dans l'eau du diffuseur. Ne pas avaler, ne pas appliquer pur sur la peau, tenir hors de portée des enfants. Déconseillé aux femmes enceintes et en présence d'animaux sensibles.",
      options: [
        { nom: "Parfum", valeurs: [
          { nom: "Lavande", photo: 'images/produits/variantes/huile-parfumee-10ml--1.webp' },
          { nom: "Eucalyptus", photo: 'images/produits/variantes/huile-parfumee-10ml--2.webp' },
          { nom: "Menthe poivrée", photo: 'images/produits/variantes/huile-parfumee-10ml--3.webp' },
          { nom: "Arbre à thé", photo: 'images/produits/variantes/huile-parfumee-10ml--4.webp' },
          { nom: "Citron", photo: 'images/produits/variantes/huile-parfumee-10ml--5.webp' },
          { nom: "Orange douce", photo: 'images/produits/variantes/huile-parfumee-10ml--6.webp' },
          { nom: "Bergamote", photo: 'images/produits/variantes/huile-parfumee-10ml--7.webp' },
          { nom: "Pamplemousse", photo: 'images/produits/variantes/huile-parfumee-10ml--8.webp' },
          { nom: "Citronnelle", photo: 'images/produits/variantes/huile-parfumee-10ml--9.webp' },
          { nom: "Romarin", photo: 'images/produits/variantes/huile-parfumee-10ml--10.webp' },
          { nom: "Rose", photo: 'images/produits/variantes/huile-parfumee-10ml--11.webp' },
          { nom: "Jasmin", photo: 'images/produits/variantes/huile-parfumee-10ml--12.webp' },
          { nom: "Ylang-ylang", photo: 'images/produits/variantes/huile-parfumee-10ml--13.webp' },
          { nom: "Géranium", photo: 'images/produits/variantes/huile-parfumee-10ml--14.webp' },
          { nom: "Camomille", photo: 'images/produits/variantes/huile-parfumee-10ml--15.webp' },
          { nom: "Magnolia", photo: 'images/produits/variantes/huile-parfumee-10ml--16.webp' },
          { nom: "Fleur d'oranger", photo: 'images/produits/variantes/huile-parfumee-10ml--17.webp' },
          { nom: "Santal", photo: 'images/produits/variantes/huile-parfumee-10ml--18.webp' },
          { nom: "Bois de cèdre", photo: 'images/produits/variantes/huile-parfumee-10ml--19.webp' },
          { nom: "Encens (oliban)", photo: 'images/produits/variantes/huile-parfumee-10ml--20.webp' },
          { nom: "Cannelle", photo: 'images/produits/variantes/huile-parfumee-10ml--21.webp' },
          { nom: "Clou de girofle", photo: 'images/produits/variantes/huile-parfumee-10ml--22.webp' },
          { nom: "Gingembre", photo: 'images/produits/variantes/huile-parfumee-10ml--23.webp' },
          { nom: "Vanille", photo: 'images/produits/variantes/huile-parfumee-10ml--24.webp' },
          { nom: "Caramel", photo: 'images/produits/variantes/huile-parfumee-10ml--25.webp' },
          { nom: "Café", photo: 'images/produits/variantes/huile-parfumee-10ml--26.webp' },
          { nom: "Noix de coco", photo: 'images/produits/variantes/huile-parfumee-10ml--27.webp' },
          { nom: "Pêche", photo: 'images/produits/variantes/huile-parfumee-10ml--28.webp' },
          { nom: "Fraise", photo: 'images/produits/variantes/huile-parfumee-10ml--29.webp' },
          { nom: "Pomme", photo: 'images/produits/variantes/huile-parfumee-10ml--30.webp' },
          { nom: "Poire", photo: 'images/produits/variantes/huile-parfumee-10ml--31.webp' }
        ] }
      ]
    },
    'diffuseur-lune-ceramique': {
      // Article Eprolo réf. 19154539
      nom: "Diffuseur ultrasonique lune en céramique", prix: 4490,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-lune-ceramique.webp', 'images/produits/diffuseur-lune-ceramique-2.webp', 'images/produits/diffuseur-lune-ceramique-3.webp'], associe: 'huile-parfumee-10ml',
      accroche: "Une pleine lune de céramique qui souffle une brume parfumée.",
      description: "Ce diffuseur en céramique en forme de lune diffuse une brume fine et silencieuse, parfumée de quelques gouttes d'huile. Son socle en bois ou laqué en fait un véritable objet déco pour le salon ou la chambre.",
      pointsForts: ["Céramique et socle au choix", "Brume fine et silencieuse", "Prise européenne"],
      conseil: "Remplissez d'eau jusqu'au repère, ajoutez 3 à 5 gouttes d'huile parfumée puis allumez. Videz et séchez le réservoir après usage et débranchez-le avant de le nettoyer.",
      options: [
        { nom: "Socle", valeurs: [
          { nom: "Bois clair", detail: "Socle en bois clair, esprit scandinave.", prix: 4490, photo: 'images/produits/variantes/diffuseur-lune-ceramique--1.webp' },
          { nom: "Bois foncé", detail: "Socle en bois foncé, chaleureux.", prix: 4490, photo: 'images/produits/variantes/diffuseur-lune-ceramique--2.webp' },
          { nom: "Blanc", detail: "Socle blanc, tout en douceur.", prix: 4490, photo: 'images/produits/variantes/diffuseur-lune-ceramique--3.webp' },
          { nom: "Noir", detail: "Socle noir, plus graphique.", prix: 4490, photo: 'images/produits/variantes/diffuseur-lune-ceramique--4.webp' },
          { nom: "Avec télécommande", detail: "Lumière et brume pilotées à distance.", prix: 4790, photo: 'images/produits/variantes/diffuseur-lune-ceramique--5.webp' }
        ] }
      ]
    },
    'diffuseur-effet-bougie': {
      // Article Eprolo réf. 26138859
      nom: "Diffuseur effet bougie", prix: 2990,
      collection: 'encens-parfums-ambiance', categorie: 'diffuseurs', photos: ['images/produits/diffuseur-effet-bougie.webp', 'images/produits/diffuseur-effet-bougie-2.webp', 'images/produits/diffuseur-effet-bougie-3.webp'], associe: 'huile-parfumee-10ml',
      accroche: "La lueur d'une bougie, la brume d'un diffuseur, sans flamme.",
      description: "Ce diffuseur reproduit la silhouette et la lueur d'une bougie tout en diffusant une brume parfumée. Une ambiance chaleureuse et sûre, idéale dans une chambre d'enfant, un bureau ou une salle de bain.",
      pointsForts: ["Lueur de bougie sans flamme", "Silencieux", "Blanc cassé ou noir"],
      conseil: "Remplissez d'eau jusqu'au repère, ajoutez quelques gouttes d'huile parfumée et allumez. Videz et séchez le réservoir régulièrement.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc cassé", photo: 'images/produits/variantes/diffuseur-effet-bougie--1.webp' },
          { nom: "Noir", photo: 'images/produits/variantes/diffuseur-effet-bougie--2.webp' }
        ] }
      ]
    },
    'brule-encens-reflux-lotus': {
      // Article Eprolo réf. 19030270
      nom: "Brûle-encens à reflux lotus", prix: 2490,
      collection: 'encens-parfums-ambiance', categorie: 'bruleurs', photos: ['images/produits/brule-encens-reflux-lotus.webp', 'images/produits/brule-encens-reflux-lotus-2.webp', 'images/produits/brule-encens-reflux-lotus-3.webp'], associe: 'cones-encens-reflux-parfums',
      accroche: "Une fleur de lotus d'où la fumée s'écoule en douceur.",
      description: "Ce brûle-encens en céramique figure une fleur de lotus posée sur l'eau. Avec un cône à reflux, la fumée coule le long des pétales et forme une petite mare de brume. Un symbole de sérénité pour un coin zen.",
      pointsForts: ["En céramique", "Motif lotus", "Effet cascade avec les cônes à reflux"],
      conseil: "Posez un cône à reflux allumé (flamme soufflée) sur l'orifice prévu. Placez le brûle-encens à l'abri des courants d'air et videz les cendres une fois refroidi."
    },
    'lampe-chauffe-bougie-retro': {
      // Article Eprolo réf. 28584449
      nom: "Lampe chauffe-bougie rétro", prix: 4490, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'fondants', photos: ['images/produits/lampe-chauffe-bougie-retro.webp', 'images/produits/lampe-chauffe-bougie-retro-2.webp', 'images/produits/lampe-chauffe-bougie-retro-3.webp'], associe: 'bougie-parfumee-pot-elegant',
      accroche: "Le parfum de vos bougies, sans flamme, sous une lampe au charme rétro.",
      description: "Posez votre bougie en pot sous l'abat-jour : la chaleur de l'ampoule fait fondre la cire et libère son parfum, sans flamme ni suie. Avec son variateur de lumière, elle fait aussi une jolie lampe d'appoint.",
      pointsForts: ["Sans flamme ni suie", "Variateur de lumière", "Prise européenne"],
      conseil: "Placez une bougie en pot sous l'ampoule et allumez : la cire fond en quelques minutes. Éteignez la lampe en quittant la pièce et laissez refroidir avant de déplacer la bougie.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/lampe-chauffe-bougie-retro--1.webp' },
          { nom: "Noir", photo: 'images/produits/variantes/lampe-chauffe-bougie-retro--2.webp' },
          { nom: "Bronze", photo: 'images/produits/variantes/lampe-chauffe-bougie-retro--3.webp' }
        ] }
      ]
    },
    'lampe-chauffe-bougie-minuterie': {
      // Article Eprolo réf. 24939595
      nom: "Lampe chauffe-bougie à minuterie", prix: 3990, securite: true,
      collection: 'encens-parfums-ambiance', categorie: 'fondants', photos: ['images/produits/lampe-chauffe-bougie-minuterie.webp', 'images/produits/lampe-chauffe-bougie-minuterie-2.webp', 'images/produits/lampe-chauffe-bougie-minuterie-3.webp'], associe: 'bougie-parfumee-pot-elegant',
      accroche: "Elle parfume, puis s'éteint toute seule.",
      description: "Cette lampe chauffe-bougie fait fondre la cire par le dessus pour diffuser le parfum sans flamme. Sa minuterie l'éteint automatiquement, et la version réglable s'adapte à la hauteur de votre bougie.",
      pointsForts: ["Minuterie intégrée", "Sans flamme ni fumée", "Prise européenne"],
      conseil: "Placez la bougie en pot sous l'ampoule, réglez la minuterie et allumez. Laissez refroidir avant de toucher la bougie.",
      options: [
        { nom: "Version", valeurs: [
          { nom: "Hauteur fixe", detail: "Pour les bougies en pot de taille standard.", prix: 3990, photo: 'images/produits/variantes/lampe-chauffe-bougie-minuterie--1.webp' },
          { nom: "Hauteur réglable", detail: "Tête réglable en hauteur, pour toutes les tailles de bougies.", prix: 4490, photo: 'images/produits/variantes/lampe-chauffe-bougie-minuterie--2.webp' }
        ] }
      ]
    },
    /* ----- Lumières douces ----- */
    'lampe-champignon-sans-fil': {
      nom: 'Lampe champignon sans fil', prix: 2990, vedette: true,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-champignon-sans-fil.webp', 'images/produits/lampe-champignon-sans-fil-2.webp', 'images/produits/lampe-champignon-sans-fil-3.webp'], associe: 'guirlande-lumineuse-led',
      accroche: 'Une lumière ronde et douce, à poser partout, sans fil.',
      description: "Sa forme arrondie et sa lumière chaude en font la lampe cosy par excellence. Rechargeable et sans fil, elle se pose sur une table de chevet, une étagère ou une table de salon, là où vous avez besoin d'un halo apaisant.",
      pointsForts: ['Sans fil et rechargeable', 'Lumière chaude et tamisée', 'Se déplace facilement de pièce en pièce'],
      conseil: "Rechargez complètement la lampe avant la première utilisation. Gardez-la à l'abri de l'humidité et débranchez le câble une fois la charge terminée.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/lampe-champignon-sans-fil--1.webp' },
          { nom: "Gris", photo: 'images/produits/variantes/lampe-champignon-sans-fil--2.webp' },
          { nom: "Noir", photo: 'images/produits/variantes/lampe-champignon-sans-fil--3.webp' },
          { nom: "Jaune", photo: 'images/produits/variantes/lampe-champignon-sans-fil--4.webp' },
          { nom: "Bleu", photo: 'images/produits/variantes/lampe-champignon-sans-fil--5.webp' },
          { nom: "Rouge", photo: 'images/produits/variantes/lampe-champignon-sans-fil--6.webp' }
        ] }
      ]
    },
    'guirlande-lumineuse-led': {
      nom: 'Guirlande lumineuse LED', prix: 1290,
      collection: 'lumieres', categorie: 'guirlandes', photos: ['images/produits/guirlande-lumineuse-led.webp', 'images/produits/guirlande-lumineuse-led-2.webp', 'images/produits/guirlande-lumineuse-led-3.webp'], associe: 'lampe-champignon-sans-fil',
      accroche: 'Des dizaines de petites lueurs pour réchauffer une pièce.',
      description: "Accrochée au-dessus d'un lit, autour d'un miroir ou dans un bocal, cette guirlande LED dessine une constellation de points lumineux chaleureux. Une touche de magie facile à installer, en toute saison.",
      pointsForts: ['LED basse consommation', 'Blanc chaud ou multicolore', 'Facile à installer partout'],
      conseil: "Déroulez entièrement la guirlande avant de l'allumer. Fixez-la avec des crochets adhésifs et éteignez-la en quittant la maison.",
      options: [
        { nom: "Lumière", valeurs: [
          { nom: "Blanc chaud", detail: "Lumière dorée et cosy.", photo: 'images/produits/variantes/guirlande-lumineuse-led--1.webp' },
          { nom: "Multicolore", detail: "Boules de couleurs, ambiance festive.", photo: 'images/produits/variantes/guirlande-lumineuse-led--2.webp' }
        ] },
        { nom: "Longueur", valeurs: [
          { nom: "1,5 m (10 LED)", detail: "Pour un bocal, un miroir ou une petite étagère.", prix: 1290 },
          { nom: "3 m (20 LED)", detail: "Pour une tête de lit ou une fenêtre.", prix: 1690 },
          { nom: "6 m (40 LED)", detail: "Pour habiller un mur ou un grand meuble.", prix: 2190 }
        ] }
      ]
    },
    'lampe-coucher-de-soleil': {
      nom: 'Lampe coucher de soleil', prix: 2490,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-coucher-de-soleil.webp', 'images/produits/lampe-coucher-de-soleil-2.webp', 'images/produits/lampe-coucher-de-soleil-3.webp'], associe: 'guirlande-lumineuse-led',
      accroche: "La lumière dorée d'une fin de journée, à tout moment.",
      description: "Orientez-la vers un mur : elle projette un grand halo de lumière : coucher de soleil, aube, arc-en-ciel ou 16 couleurs selon l'effet choisi. Parfaite pour une ambiance détente le soir, ou pour de jolies photos et vidéos.",
      pointsForts: ['Halo coloré projeté sur le mur', 'Tête orientable', 'Idéale pour les photos et vidéos'],
      conseil: "Placez la lampe à environ un mètre d'un mur clair et orientez la tête pour régler la taille du halo. Ne regardez pas directement la source lumineuse.",
      options: [
        { nom: "Effet", valeurs: [
          { nom: "Coucher de soleil", detail: "Halo orangé doré, comme une fin de journée.", prix: 2490, photo: 'images/produits/variantes/lampe-coucher-de-soleil--1.webp' },
          { nom: "Coucher de soleil rouge", detail: "Halo rouge orangé, plus intense.", prix: 2490, photo: 'images/produits/variantes/lampe-coucher-de-soleil--2.webp' },
          { nom: "Arc-en-ciel", detail: "Halo aux couleurs de l'arc-en-ciel.", prix: 2490, photo: 'images/produits/variantes/lampe-coucher-de-soleil--3.webp' },
          { nom: "Lumière de l'aube", detail: "Halo doux et pâle, comme au lever du jour.", prix: 2690, photo: 'images/produits/variantes/lampe-coucher-de-soleil--4.webp' },
          { nom: "16 couleurs, télécommande", detail: "16 couleurs au choix, télécommande incluse.", prix: 2990, photo: 'images/produits/variantes/lampe-coucher-de-soleil--5.webp' },
          { nom: "16 couleurs, appli Bluetooth", detail: "16 couleurs et effets, pilotables depuis votre téléphone.", prix: 3290, photo: 'images/produits/variantes/lampe-coucher-de-soleil--6.webp' }
        ] }
      ]
    },
    /* Ajouts de novembre 2026 (Eprolo) */
    'rideau-lumineux-led': {
      // Article Eprolo réf. 9507275
      nom: "Rideau lumineux LED à télécommande", prix: 1990,
      collection: 'lumieres', categorie: 'guirlandes', photos: ['images/produits/variantes/rideau-lumineux-led--1.webp', 'images/produits/variantes/rideau-lumineux-led--2.webp', 'images/produits/variantes/rideau-lumineux-led--3.webp'], associe: 'rideau-lumineux-lune-etoiles',
      accroche: "Une cascade de petites lumières pour une fenêtre ou une tête de lit.",
      description: "Ce rideau de guirlandes LED habille une fenêtre, un mur ou une tête de lit d'une pluie de lumière. Branché en USB, il se pilote à la télécommande : huit effets, variateur et minuterie.",
      pointsForts: ["Télécommande : 8 effets et minuterie", "Alimentation USB", "3 tailles au choix"],
      conseil: "Fixez le rideau avec les crochets fournis ou des crochets adhésifs. Branchez-le sur un port USB ou un adaptateur secteur USB et éteignez-le en quittant la maison.",
      options: [
        { nom: "Lumière", valeurs: [
          { nom: "Blanc chaud", detail: "Lumière dorée et cosy.", photo: 'images/produits/variantes/rideau-lumineux-led--1.webp' },
          { nom: "Blanc froid", detail: "Lumière claire et scintillante.", photo: 'images/produits/variantes/rideau-lumineux-led--2.webp' },
          { nom: "Multicolore", detail: "Lumières de couleurs, ambiance festive.", photo: 'images/produits/variantes/rideau-lumineux-led--3.webp' }
        ] },
        { nom: "Taille", valeurs: [
          { nom: "3 × 1 m", detail: "3 m de large sur 1 m de haut, idéal au-dessus d'une tête de lit.", prix: 1990 },
          { nom: "3 × 2 m", detail: "3 m de large sur 2 m de haut, pour une fenêtre.", prix: 2290 },
          { nom: "3 × 3 m", detail: "3 m de large sur 3 m de haut, pour une grande baie ou un mur entier.", prix: 2490 }
        ] }
      ]
    },
    'guirlande-etoiles-cuivre': {
      // Article Eprolo réf. 5229244
      nom: "Guirlande étoiles en fil de cuivre", prix: 1990,
      collection: 'lumieres', categorie: 'guirlandes', photos: ['images/produits/guirlande-etoiles-cuivre.webp', 'images/produits/guirlande-etoiles-cuivre-2.webp', 'images/produits/guirlande-etoiles-cuivre-3.webp'], associe: 'lampe-lune-3d',
      accroche: "Un bouquet d'étoiles lumineuses à suspendre au plafond.",
      description: "Des dizaines de micro-LED montées sur des fils de cuivre qui rayonnent comme une étoile filante. Suspendue au plafond, dans un coin ou au-dessus d'une table, elle crée une ambiance féerique.",
      pointsForts: ["Fils de cuivre souples et orientables", "Blanc chaud ou multicolore", "3 tailles au choix"],
      conseil: "Suspendez la guirlande à un crochet et déployez délicatement les fils de cuivre. Éteignez-la en quittant la pièce.",
      options: [
        { nom: "Lumière", valeurs: [
          { nom: "Blanc chaud", detail: "Lumière dorée et cosy.", photo: 'images/produits/variantes/guirlande-etoiles-cuivre--1.webp' },
          { nom: "Multicolore", detail: "Lumières de couleurs, ambiance festive.", photo: 'images/produits/variantes/guirlande-etoiles-cuivre--2.webp' }
        ] },
        { nom: "Taille", valeurs: [
          { nom: "100 LED", detail: "Un bouquet léger, pour un coin de pièce.", prix: 1990 },
          { nom: "150 LED", detail: "Un bouquet plus fourni, bel effet au plafond.", prix: 2490 },
          { nom: "180 LED", detail: "Le plus lumineux, pour un vrai effet étoile filante.", prix: 2790 }
        ] }
      ]
    },
    'rideau-lumineux-lune-etoiles': {
      // Article Eprolo réf. 9758841
      nom: "Rideau lumineux lune et étoiles", prix: 2490,
      collection: 'lumieres', categorie: 'guirlandes', photos: ['images/produits/variantes/rideau-lumineux-lune-etoiles--1.webp', 'images/produits/variantes/rideau-lumineux-lune-etoiles--2.webp'], associe: 'rideau-lumineux-led',
      accroche: "Des lunes et des étoiles qui scintillent à votre fenêtre.",
      description: "Un rideau de lumières où alternent petites lunes et étoiles, pour une chambre, un salon ou une fenêtre. Prise européenne et plusieurs modes d'éclairage, du scintillement doux à la lumière fixe.",
      pointsForts: ["Motifs lunes et étoiles", "Prise européenne", "Plusieurs modes d'éclairage"],
      conseil: "Accrochez le rideau à une tringle ou avec des crochets adhésifs. Ne l'utilisez qu'à l'intérieur et débranchez-le en quittant la maison.",
      options: [
        { nom: "Lumière", valeurs: [
          { nom: "Blanc chaud", detail: "Lumière dorée et cosy.", photo: 'images/produits/variantes/rideau-lumineux-lune-etoiles--1.webp' },
          { nom: "Multicolore", detail: "Lumières de couleurs, ambiance festive.", photo: 'images/produits/variantes/rideau-lumineux-lune-etoiles--2.webp' }
        ] }
      ]
    },
    'lampe-lune-3d': {
      // Article Eprolo réf. 6938283
      nom: "Lampe lune 3D rechargeable", prix: 1990,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-lune-3d.webp', 'images/produits/lampe-lune-3d-2.webp', 'images/produits/lampe-lune-3d-3.webp'], associe: 'guirlande-etoiles-cuivre',
      accroche: "Une pleine lune à poser sur la table de chevet.",
      description: "Imprimée en 3D d'après les reliefs de la vraie lune, cette lampe diffuse une lumière douce et réglable. Rechargeable en USB, elle se pose sur son socle en bois, dans une chambre d'enfant comme dans un salon.",
      pointsForts: ["Reliefs lunaires imprimés en 3D", "Rechargeable en USB", "Socle en bois inclus"],
      conseil: "Rechargez complètement la lampe avant la première utilisation. Gardez-la à l'abri de l'humidité.",
      options: [
        { nom: "Éclairage", valeurs: [
          { nom: "2 teintes, tactile", detail: "Blanc chaud ou blanc froid, on change en touchant la lampe." },
          { nom: "3 teintes, tactile", detail: "Blanc chaud, neutre ou froid, on change en touchant la lampe." },
          { nom: "16 couleurs, télécommande", detail: "16 couleurs et effets lumineux, télécommande incluse." }
        ] },
        { nom: "Diamètre", valeurs: [
          { nom: "10 cm", detail: "Petite veilleuse, idéale sur une table de chevet.", prix: 1990 },
          { nom: "15 cm", detail: "Taille moyenne, pour un bureau ou une étagère.", prix: 2990 },
          { nom: "18 cm", detail: "Grand modèle, un vrai objet déco pour le salon.", prix: 3490 }
        ] }
      ]
    },
    'lampe-fleur-rose': {
      // Article Eprolo réf. 31995920
      nom: "Lampe fleur de rose", prix: 3990,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-fleur-rose.webp', 'images/produits/lampe-fleur-rose-2.webp', 'images/produits/lampe-fleur-rose-3.webp'], associe: 'lampe-champignon-sans-fil',
      accroche: "Une grande rose aux pétales délicats qui s'illumine doucement.",
      description: "Ses pétales superposés diffusent une lumière tamisée et romantique. Posée sur une commode ou une table de chevet, cette lampe fleur apporte une touche poétique à une chambre ou un salon.",
      pointsForts: ["Pétales superposés", "Lumière douce et tamisée", "Prise européenne"],
      conseil: "Branchez la lampe et allumez-la avec l'interrupteur. Dépoussiérez les pétales avec un pinceau doux ou un sèche-cheveux à air froid.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/lampe-fleur-rose--1.webp' },
          { nom: "Rose", photo: 'images/produits/variantes/lampe-fleur-rose--2.webp' },
          { nom: "Rose et blanc", photo: 'images/produits/variantes/lampe-fleur-rose--3.webp' },
          { nom: "Champagne", photo: 'images/produits/variantes/lampe-fleur-rose--4.webp' },
          { nom: "Rouge", photo: 'images/produits/variantes/lampe-fleur-rose--5.webp' }
        ] }
      ]
    },
    'lampe-bambou-tressee': {
      // Article Eprolo réf. 28145602
      nom: "Lampe en bambou tressé", prix: 3490,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/lampe-bambou-tressee.webp', 'images/produits/lampe-bambou-tressee-2.webp', 'images/produits/lampe-bambou-tressee-3.webp'], associe: 'lampe-fleur-rose',
      accroche: "Le savoir-faire du tressage japonais pour une lumière tamisée.",
      description: "Tressée à la main en bambou, cette petite lampe laisse filtrer une lumière chaude à travers ses fibres naturelles. Un esprit japandi parfait pour une table de chevet, un bureau ou une étagère.",
      pointsForts: ["Bambou tressé à la main", "Lumière chaude tamisée", "Prise européenne ou USB"],
      conseil: "Utilisez-la à l'intérieur, à l'abri de l'humidité. Dépoussiérez le tressage avec un pinceau doux.",
      options: [
        { nom: "Alimentation", valeurs: [
          { nom: "Prise européenne", detail: "Se branche sur une prise murale.", prix: 3490 },
          { nom: "USB", detail: "Se branche sur un port ou un chargeur USB.", prix: 3690 }
        ] }
      ]
    },
    'bougies-led-longues-lot-12': {
      // Article Eprolo réf. 20044008
      nom: "Lot de 12 bougies LED longues", prix: 2490,
      collection: 'lumieres', categorie: 'lampes', photos: ['images/produits/bougies-led-longues-lot-12.webp', 'images/produits/bougies-led-longues-lot-12-2.webp', 'images/produits/bougies-led-longues-lot-12-3.webp'], associe: 'bougeoir-metal-ajoure',
      accroche: "L'élégance des bougies longues, sans flamme ni cire qui coule.",
      description: "Douze bougies LED longues à la lueur blanc chaud, pour garnir chandeliers et bougeoirs en toute sécurité. Idéales pour une table de fête, une cheminée ou un rebord de fenêtre.",
      pointsForts: ["Lot de 12", "Lueur blanc chaud", "Sans flamme : sûres partout"],
      conseil: "Retirez la languette de protection de la pile avant la première utilisation et éteignez les bougies après usage pour préserver les piles."
    },

    /* ----- Déco & rangement ----- */
    'plaid-maille': {
      nom: 'Plaid en maille', prix: 3990, vedette: true,
      collection: 'deco-rangement', categorie: 'textile', photos: ['images/produits/plaid-maille.webp', 'images/produits/plaid-maille-2.webp', 'images/produits/plaid-maille-3.webp'], associe: 'housses-coussin-texturees-lot-2',
      accroche: 'La grosse maille douce qui invite à rester au chaud.',
      description: "Jeté sur un canapé ou au pied du lit, ce plaid en maille apporte instantanément de la chaleur et du relief. On s'y enroule pour lire, regarder un film ou profiter d'un dimanche tranquille.",
      pointsForts: ['Maille épaisse et douce', 'Habille un canapé ou un lit', 'Parfait pour les soirées cocooning'],
      conseil: "Lavez-le à froid, en cycle délicat, puis faites-le sécher à plat pour qu'il garde sa forme."
    },
    'housses-coussin-texturees-lot-2': {
      nom: 'Lot de 2 housses de coussin texturées', prix: 1990,
      collection: 'deco-rangement', categorie: 'textile', photos: ['images/produits/housses-coussin-texturees-lot-2.webp', 'images/produits/housses-coussin-texturees-lot-2-2.webp', 'images/produits/housses-coussin-texturees-lot-2-3.webp'], associe: 'plaid-maille',
      accroche: 'Du relief et de la douceur pour votre canapé.',
      description: "Deux housses au tissage texturé pour donner du caractère à votre canapé ou à votre lit. Leurs tons naturels s'accordent facilement avec un intérieur japandi, bohème ou scandinave.",
      pointsForts: ['Lot de deux housses', 'Tissage texturé', 'Tons naturels faciles à associer'],
      conseil: "Retirez le coussin intérieur avant de laver la housse à froid, à l'envers. Repassez à basse température si besoin."
    },
    'vase-ceramique-pampa': {
      // Article Eprolo : vase seul, sans fleurs (réf. 30241391) — prix à revoir sans le bouquet de pampa
      nom: 'Vase en céramique design', prix: 3290,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/vase-ceramique-pampa.webp', 'images/produits/vase-ceramique-pampa-2.webp', 'images/produits/vase-ceramique-pampa-3.webp'], associe: 'vide-poche-ceramique',
      accroche: 'Une silhouette arrondie et colorée, belle même sans fleurs.',
      description: "Sa forme originale et ses couleurs en font un objet déco à part entière : deux modèles, en blanc, jaune pâle, orange ou orange et rose. Glissez-y une tige de fleur séchée ou une branche, ou laissez-le seul sur une étagère, une console ou une table de chevet.",
      pointsForts: ['En céramique', '2 modèles et 5 coloris', 'Joli seul ou avec une fleur séchée'],
      conseil: "Pour des fleurs fraîches, changez l'eau régulièrement. Nettoyez le vase avec un chiffon doux et évitez les chocs : la céramique peut s'ébrécher.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Modèle A, jaune pâle", prix: 3290, photo: 'images/produits/variantes/vase-ceramique-pampa--1.webp' },
          { nom: "Modèle A, orange", prix: 3990, photo: 'images/produits/variantes/vase-ceramique-pampa--2.webp' },
          { nom: "Modèle B, blanc", prix: 3990, photo: 'images/produits/variantes/vase-ceramique-pampa--3.webp' },
          { nom: "Modèle B, orange", prix: 3990, photo: 'images/produits/variantes/vase-ceramique-pampa--4.webp' },
          { nom: "Modèle B, orange et rose", prix: 4290, photo: 'images/produits/variantes/vase-ceramique-pampa--5.webp' }
        ] }
      ]
    },
    'vide-poche-ceramique': {
      nom: 'Vide-poche et plateau en céramique', prix: 1690,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/vide-poche-ceramique.webp', 'images/produits/vide-poche-ceramique-2.webp', 'images/produits/vide-poche-ceramique-3.webp'], associe: 'vase-ceramique-pampa',
      accroche: 'Le petit plateau qui range clés et bijoux avec style.',
      description: "Dans l'entrée pour les clés, sur la table de chevet pour les bagues ou dans la salle de bain : ce plateau en céramique garde l'essentiel à portée de main. Une jolie idée cadeau, aussi.",
      pointsForts: ['En céramique', "Pour l'entrée, la chambre ou la salle de bain", 'Bonne idée cadeau'],
      conseil: "Nettoyez-le avec un chiffon humide. Évitez les chocs : la céramique peut s'ébrécher.",
      options: [
        { nom: "Taille", valeurs: [
          { nom: "10 × 10 cm", detail: "Format compact pour bagues et boucles d'oreilles.", photo: 'images/produits/variantes/vide-poche-ceramique--1.webp' },
          { nom: "10,5 × 10 cm, bord haut", detail: "Bord plus haut, pour garder clés et bijoux en place.", photo: 'images/produits/variantes/vide-poche-ceramique--2.webp' },
          { nom: "11,5 × 11,5 cm", detail: "Format carré un peu plus grand.", photo: 'images/produits/variantes/vide-poche-ceramique--3.webp' },
          { nom: "12 × 10,5 cm", detail: "Le plus grand, pour les clés et la montre.", photo: 'images/produits/variantes/vide-poche-ceramique--4.webp' }
        ] }
      ]
    },
    'miroir-forme-organique': {
      nom: 'Miroir de forme organique', prix: 5490,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/miroir-forme-organique.webp', 'images/produits/miroir-forme-organique-2.webp', 'images/produits/miroir-forme-organique-3.webp'], associe: 'etagere-murale-flottante',
      accroche: 'Des courbes douces qui agrandissent et éclairent la pièce.',
      description: "Sa silhouette irrégulière casse les lignes droites et apporte une touche artistique à un mur. Il reflète la lumière et donne de la profondeur à une entrée, un salon ou une chambre.",
      pointsForts: ['Forme organique originale', 'Agrandit visuellement la pièce', "Pour l'entrée, le salon ou la chambre"],
      conseil: "Fixez-le sur un mur plein avec des vis et chevilles adaptées à son poids. Nettoyez-le avec un chiffon doux et un produit pour vitres."
    },
    'portemanteau-mural-bois': {
      nom: 'Portemanteau mural en bois', prix: 3490,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/portemanteau-mural-bois.webp', 'images/produits/portemanteau-mural-bois-2.webp', 'images/produits/portemanteau-mural-bois-3.webp'], associe: 'panier-tresse',
      accroche: "Une entrée rangée et chaleureuse, grâce au bois naturel.",
      description: "Manteaux, sacs, chapeaux : ce portemanteau mural en bois libère l'entrée tout en la décorant. Ses lignes simples s'accordent avec un intérieur japandi ou scandinave.",
      pointsForts: ['En bois', 'Léger et facile à fixer', 'Range manteaux, sacs et chapeaux'],
      conseil: "Fixez-le avec des vis et chevilles adaptées à votre mur. Répartissez les charges sur les patères et évitez de les surcharger.",
      options: [
        { nom: "Bois", valeurs: [
          { nom: "Hêtre clair", detail: "Bois clair, esprit scandinave.", photo: 'images/produits/variantes/portemanteau-mural-bois--1.webp' },
          { nom: "Noyer foncé", detail: "Bois foncé, chaleureux.", photo: 'images/produits/variantes/portemanteau-mural-bois--2.webp' }
        ] },
        { nom: "Patères", valeurs: [
          { nom: "3 patères", detail: "Compact, pour une petite entrée.", prix: 3490 },
          { nom: "4 patères", detail: "Pour les manteaux de toute la famille.", prix: 3990 },
          { nom: "6 patères", detail: "Grand modèle, pour une entrée très fréquentée.", prix: 4490 }
        ] }
      ]
    },
    'etagere-murale-flottante': {
      nom: 'Étagère murale flottante', prix: 3490,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/etagere-murale-flottante.webp', 'images/produits/etagere-murale-flottante-2.webp', 'images/produits/etagere-murale-flottante-3.webp'], associe: 'vase-ceramique-pampa',
      accroche: 'Une étagère sans support visible, pour mettre en valeur vos objets.',
      description: "Ses fixations invisibles donnent l'impression qu'elle flotte sur le mur. Plantes, bougies, livres ou céramiques : elle crée un petit coin déco tout en gagnant de la place.",
      pointsForts: ['Fixations invisibles', 'Gain de place', 'Met en valeur plantes et objets'],
      conseil: "Vérifiez la nature de votre mur et utilisez des chevilles adaptées. Respectez la charge maximale indiquée par le fabricant.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Modèle A", photo: 'images/produits/variantes/etagere-murale-flottante--1.webp' },
          { nom: "Modèle B", photo: 'images/produits/variantes/etagere-murale-flottante--2.webp' }
        ] },
        { nom: "Longueur", valeurs: [
          { nom: "27 cm", detail: "Pour une plante ou quelques petits objets.", prix: 3490 },
          { nom: "40 cm", detail: "Pour des livres, des bougies et plusieurs objets.", prix: 5490 }
        ] }
      ]
    },
    'panier-tresse': {
      nom: 'Panier tressé', prix: 2990,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/panier-tresse.webp', 'images/produits/panier-tresse-2.webp', 'images/produits/panier-tresse-3.webp'], associe: 'plaid-maille',
      accroche: 'Un rangement naturel pour les plaids, les jouets ou les magazines.',
      description: "Tressé à la main dans des fibres naturelles, ce panier cache le petit désordre du quotidien avec charme. Au pied du canapé avec un plaid, dans la salle de bain avec des serviettes ou dans une chambre d'enfant.",
      pointsForts: ['Fibres naturelles tressées', 'Grande contenance', 'Pratique dans toutes les pièces'],
      conseil: "Dépoussiérez-le avec une brosse douce. Gardez-le à l'abri de l'humidité pour préserver les fibres."
    },
    /* Ajouts de novembre 2026 (Eprolo) */
    'trio-vases-donut': {
      // Article Eprolo réf. 32844810
      nom: "Trio de vases donut en céramique", prix: 2990,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/trio-vases-donut.webp', 'images/produits/trio-vases-donut-2.webp', 'images/produits/trio-vases-donut-3.webp'], associe: 'vases-relief-ceramique',
      accroche: "Trois petits vases ronds aux formes douces et irrégulières.",
      description: "Un trio de vases en céramique blanche en forme de donut, aux contours volontairement irréguliers. Avec une tige séchée ou laissés seuls, ils composent une jolie scène sur une étagère ou une table.",
      pointsForts: ["Lot de 3 vases", "Céramique blanche mate", "Formes irrégulières faites pour être assemblées"],
      conseil: "Pour des fleurs fraîches, changez l'eau régulièrement. Nettoyez-les avec un chiffon doux."
    },
    'vases-relief-ceramique': {
      // Article Eprolo réf. 32844811
      nom: "Soliflores en céramique en relief", prix: 3490,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/vases-relief-ceramique.webp', 'images/produits/vases-relief-ceramique-2.webp', 'images/produits/vases-relief-ceramique-3.webp'], associe: 'trio-vases-donut',
      accroche: "Des reliefs sculptés pour une seule tige, en noir ou en blanc.",
      description: "Un ensemble de soliflores en céramique aux reliefs sculptés, pensés pour accueillir une seule tige. En blanc ou en noir, ils apportent une touche artistique à une console, un rebord de fenêtre ou une table de chevet.",
      pointsForts: ["Céramique aux reliefs sculptés", "Ensemble de soliflores", "Blanc ou noir"],
      conseil: "Changez l'eau régulièrement pour des fleurs fraîches. Évitez les chocs : la céramique peut s'ébrécher.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/vases-relief-ceramique--1.webp' },
          { nom: "Noir", photo: 'images/produits/variantes/vases-relief-ceramique--2.webp' }
        ] }
      ]
    },
    'bougeoir-metal-ajoure': {
      // Article Eprolo réf. 33159000
      nom: "Bougeoir en métal ajouré", prix: 1690,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/bougeoir-metal-ajoure.webp', 'images/produits/bougeoir-metal-ajoure-2.webp', 'images/produits/bougeoir-metal-ajoure-3.webp'], associe: 'bougie-geometrique-cire-soja',
      accroche: "La lueur d'une bougie filtrée par la dentelle de métal.",
      description: "Ce bougeoir en métal ajouré projette des motifs de lumière tout autour de lui. Posez-y une bougie chauffe-plat ou une bougie LED pour une ambiance chaleureuse sur une table ou une étagère.",
      pointsForts: ["Métal ajouré au style rétro", "Projette des motifs de lumière", "3 modèles au choix"],
      conseil: "Utilisez une bougie chauffe-plat ou une bougie LED. Le métal chauffe : manipulez-le une fois refroidi.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Modèle 1", photo: 'images/produits/variantes/bougeoir-metal-ajoure--1.webp' },
          { nom: "Modèle 2", photo: 'images/produits/variantes/bougeoir-metal-ajoure--2.webp' },
          { nom: "Modèle 3", photo: 'images/produits/variantes/bougeoir-metal-ajoure--3.webp' }
        ] }
      ]
    },
    'bougeoir-ceramique': {
      // Article Eprolo réf. 22902101
      nom: "Bougeoir en céramique", prix: 1690,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/bougeoir-ceramique.webp', 'images/produits/bougeoir-ceramique-2.webp', 'images/produits/bougeoir-ceramique-3.webp'], associe: 'bougie-fleur-pivoine',
      accroche: "Un bougeoir sculptural, aussi beau sans bougie.",
      description: "En céramique mate, ce bougeoir sculptural accueille une bougie chauffe-plat ou une petite bougie parfumée. Rhinocéros ou motif corde, il ajoute une note originale et douce à votre décoration.",
      pointsForts: ["Céramique mate", "Pour bougies chauffe-plat", "3 modèles au choix"],
      conseil: "Posez-le sur une surface stable et ne laissez jamais une bougie allumée sans surveillance.",
      options: [
        { nom: "Modèle", valeurs: [
          { nom: "Rhinocéros blanc", photo: 'images/produits/variantes/bougeoir-ceramique--1.webp' },
          { nom: "Corde, grand modèle", photo: 'images/produits/variantes/bougeoir-ceramique--2.webp' },
          { nom: "Corde, petit modèle", photo: 'images/produits/variantes/bougeoir-ceramique--3.webp' }
        ] }
      ]
    },
    'coupelle-bijoux-ceramique': {
      // Article Eprolo réf. 31246662
      nom: "Coupelle à bijoux en céramique", prix: 1290,
      collection: 'deco-rangement', categorie: 'deco', photos: ['images/produits/coupelle-bijoux-ceramique.webp', 'images/produits/coupelle-bijoux-ceramique-2.webp', 'images/produits/coupelle-bijoux-ceramique-3.webp'], associe: 'vide-poche-ceramique',
      accroche: "Un petit écrin pour bagues et colliers, à poser près du lavabo.",
      description: "Cette coupelle en céramique au bord ondulé accueille bagues, boucles d'oreilles et colliers. Six finitions, du blanc nacré à l'or rose, pour une coiffeuse, une salle de bain ou une table de chevet.",
      pointsForts: ["Céramique au bord ondulé", "6 finitions au choix", "Jolie idée cadeau"],
      conseil: "Nettoyez-la avec un chiffon humide. Évitez les chocs : la céramique peut s'ébrécher.",
      options: [
        { nom: "Couleur", valeurs: [
          { nom: "Blanc", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--1.webp' },
          { nom: "Rose", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--2.webp' },
          { nom: "Bleu", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--3.webp' },
          { nom: "Doré", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--4.webp' },
          { nom: "Or rose", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--5.webp' },
          { nom: "Argenté", photo: 'images/produits/variantes/coupelle-bijoux-ceramique--6.webp' }
        ] }
      ]
    },
    'housse-coussin-boheme': {
      // Article Eprolo réf. 8159091
      nom: "Housse de coussin bohème", prix: 1990,
      collection: 'deco-rangement', categorie: 'textile', photos: ['images/produits/housse-coussin-boheme.webp', 'images/produits/housse-coussin-boheme-2.webp', 'images/produits/housse-coussin-boheme-3.webp'], associe: 'plaid-maille',
      accroche: "Des motifs bohèmes minimalistes pour réveiller un canapé.",
      description: "Une housse aux motifs bohèmes épurés, dans des tons naturels faciles à associer. Carrée ou rectangulaire, elle apporte du caractère à un canapé, un fauteuil ou un lit.",
      pointsForts: ["Motifs bohèmes minimalistes", "Fermeture invisible", "2 formats au choix"],
      conseil: "Lavez la housse à l'envers, à froid, sans le coussin intérieur (non fourni).",
      options: [
        { nom: "Format", valeurs: [
          { nom: "45 × 45 cm", detail: "Pour un coussin carré de 45 cm (non fourni).", photo: 'images/produits/variantes/housse-coussin-boheme--1.webp' },
          { nom: "30 × 50 cm", detail: "Pour un coussin rectangulaire de 30 × 50 cm (non fourni).", photo: 'images/produits/variantes/housse-coussin-boheme--2.webp' }
        ] }
      ]
    },
    'serre-livres-bois': {
      // Article Eprolo réf. 1322981
      nom: "Serre-livres en bois massif", prix: 1490,
      collection: 'deco-rangement', categorie: 'rangement', photos: ['images/produits/serre-livres-bois.webp', 'images/produits/serre-livres-bois-2.webp', 'images/produits/serre-livres-bois-3.webp'], associe: 'etagere-murale-flottante',
      accroche: "Des livres bien rangés, maintenus par du bois naturel.",
      description: "En bois massif aux veinures naturelles, ces serre-livres tiennent vos livres droits sur une étagère ou un bureau. Quatre formes au choix, arrondies ou carrées, pour un rangement chaleureux.",
      pointsForts: ["Bois massif", "4 formes au choix", "Pour étagère ou bureau"],
      conseil: "Dépoussiérez-les avec un chiffon sec. Évitez l'humidité pour préserver le bois.",
      options: [
        { nom: "Forme", valeurs: [
          { nom: "Arrondie A", photo: 'images/produits/variantes/serre-livres-bois--1.webp' },
          { nom: "Carrée B", photo: 'images/produits/variantes/serre-livres-bois--2.webp' },
          { nom: "Carrée C", photo: 'images/produits/variantes/serre-livres-bois--3.webp' },
          { nom: "Arrondie D", photo: 'images/produits/variantes/serre-livres-bois--4.webp' }
        ] }
      ]
    },

    /* ----- Coffrets cadeaux ----- */
    'coffret-encens-pret-a-offrir': {
      nom: 'Coffret encens tout prêt (encens et porte-encens)', prix: 2490, vedette: true,
      collection: 'coffrets-cadeaux', categorie: 'coffrets', photos: ['images/produits/coffret-encens-pret-a-offrir.webp', 'images/produits/coffret-encens-pret-a-offrir-2.webp', 'images/produits/coffret-encens-pret-a-offrir-3.webp'], associe: 'bougie-parfumee-cire-soja',
      accroche: 'Le cadeau zen par excellence, prêt à offrir.',
      description: "Tout ce qu'il faut pour commencer : de l'encens et son porte-encens, réunis dans un coffret prêt à offrir. Une attention douce pour un anniversaire, une crémaillère, ou simplement pour se faire plaisir.",
      pointsForts: ['Encens et porte-encens réunis', 'Prêt à offrir', 'Idéal pour débuter'],
      conseil: "Allumez un bâtonnet d'encens, soufflez la flamme et plantez-le dans le porte-encens fourni. Posez l'ensemble sur une surface stable, dans une pièce aérée."
    },
    'abonnement-mensuel-encens-bougies': {
      nom: 'Abonnement mensuel encens ou bougies', prix: 2490, abonnement: true,
      collection: 'coffrets-cadeaux', categorie: 'abonnements', photos: ['images/produits/abonnement-mensuel-encens-bougies.webp', 'images/produits/abonnement-mensuel-encens-bougies-2.webp', 'images/produits/abonnement-mensuel-encens-bougies-3.webp'], associe: 'coffret-encens-pret-a-offrir',
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

/* ---------- Variantes (parfum, couleur, taille…) ----------
   options: [{ nom: 'Parfum', valeurs: [{ nom: 'Rose', photo: '…', prix: 1490 }] }]
   - prix (facultatif) : prix de la variante en centimes ; sinon le prix du produit.
   - photo (facultatif) : photo affichée quand le client choisit cette valeur.
   Un « choix » est un objet { 'Parfum': 'Rose', 'Taille': 'Grande' }. */
CATALOGUE.choixParDefaut = function (p) {
  var choix = {};
  (p.options || []).forEach(function (o) { if (o.valeurs.length) choix[o.nom] = o.valeurs[0].nom; });
  return choix;
};
CATALOGUE.choixValide = function (p, choix) {
  var options = p.options || [];
  if (!choix) return !options.length;
  return options.every(function (o) {
    return o.valeurs.some(function (v) { return v.nom === choix[o.nom]; });
  });
};
CATALOGUE.valeursChoisies = function (p, choix) {
  return (p.options || []).map(function (o) {
    return o.valeurs.filter(function (v) { return choix && v.nom === choix[o.nom]; })[0];
  }).filter(Boolean);
};
CATALOGUE.prixVariante = function (p, choix) {
  var prix = p.prix;
  CATALOGUE.valeursChoisies(p, choix).forEach(function (v) { if (typeof v.prix === 'number') prix = v.prix; });
  return prix;
};
CATALOGUE.photoVariante = function (p, choix) {
  var photos = CATALOGUE.valeursChoisies(p, choix).filter(function (v) { return v.photo; });
  return photos.length ? photos[photos.length - 1].photo : null;
};
CATALOGUE.prixVariables = function (p) {
  return (p.options || []).some(function (o) {
    return o.valeurs.some(function (v) { return typeof v.prix === 'number' && v.prix !== p.prix; });
  });
};
CATALOGUE.libelleChoix = function (p, choix) {
  return (p.options || []).filter(function (o) { return o.valeurs.length > 1 && choix && choix[o.nom]; })
    .map(function (o) { return o.nom + ' : ' + choix[o.nom]; }).join(' · ');
};
/* Notes olfactives, affichées quand le client choisit un parfum (option « Parfum »).
   La clé est le nom du parfum, sans ce qui suit la virgule (« Rose, pot noir » → « Rose »). */
CATALOGUE.notesParfums = {
  'Santal': 'boisé, chaud et crémeux', 'Rose': 'florale, douce et romantique', 'Rose sauvage': 'rose fraîche aux accents verts',
  'Lavande': 'florale et apaisante, idéale le soir', 'Lavande & romarin': 'aromatique et apaisante', 'Jasmin': 'florale, lumineuse et enveloppante',
  'Jasmin de printemps': 'florale, fraîche et lumineuse', 'Thé vert': 'frais, léger et vivifiant', 'Thé Darjeeling': 'thé noir délicat, légèrement fruité',
  'Océan': 'fraîche et marine, comme une brise', 'Lotus': 'florale, aquatique et délicate', 'Osmanthe': "fleurie et fruitée, aux notes d'abricot",
  'Osmanthe doré': "fleurie et fruitée, aux notes d'abricot", 'Pivoine': 'florale, fraîche et poudrée', 'Magnolia': 'florale, crémeuse et lumineuse',
  'Lys': 'florale, intense et élégante', 'Tubéreuse': 'florale, riche et sensuelle', 'Tulipe': 'florale, verte et légère',
  'Cerise': 'fruitée, gourmande et acidulée', 'Myrtille': 'fruitée et légèrement sucrée', 'Ambre gris': 'chaude, ambrée et enveloppante',
  'Épices indiennes': 'épicée et boisée, esprit temple', 'Mélange de senteurs': 'un assortiment de plusieurs parfums pour varier les ambiances',
  'Citron': 'hespéridée, fraîche et pétillante', 'Gardénia': 'florale, blanche et veloutée', 'Pomme': 'fruitée, croquante et fraîche',
  'Poire & freesia': 'fruitée et florale, fraîche et lumineuse', 'Carillon bleu': 'fraîche et aérienne, aux notes marines',
  'Source de montagne': "fraîche et minérale, comme l'air des sommets", 'Fleur poudrée': 'florale et poudrée, élégante',
  "Côte d'Azur": 'fraîche, solaire et marine', 'Sauge & sel marin': 'herbacée et minérale, esprit bord de mer',
  'Kaki du Japon': 'fruitée, douce et gourmande', 'Étoile de mer': 'fraîche et marine', 'Forêt noire': 'gourmande, cerise et chocolat',
  'Crème vanille': 'gourmande, douce et réconfortante', 'Mousse de rosée': 'verte, fraîche et boisée',
  'Citron vert, basilic & mandarine': 'hespéridée et aromatique, pétillante', 'Pêche blanche & thé oolong': 'fruitée et thé, douce et lumineuse',
  'Oasis': 'fraîche et verte', 'Cerisier de Yoshino': 'florale et délicate, fleur de cerisier', 'Montagnes & eau claire': 'fraîche, verte et aquatique',
  'Émeraude': 'verte et boisée', 'Figue verte & cèdre': 'verte, fruitée et boisée', 'Iris & mousse de chêne': 'poudrée et boisée',
  'Mojito': 'fraîche, menthe et citron vert', 'Eucalyptus': "fraîche et mentholée, elle dégage l'atmosphère", 'Menthe poivrée': 'fraîche, vive et tonique',
  'Arbre à thé': 'fraîche, herbacée et purifiante', 'Orange douce': 'hespéridée, douce et joyeuse', 'Bergamote': 'hespéridée, fraîche et élégante',
  'Pamplemousse': 'hespéridée, acidulée et tonique', 'Citronnelle': 'fraîche, citronnée et herbacée', 'Romarin': 'aromatique et herbacée',
  'Ylang-ylang': 'florale, exotique et sensuelle', 'Géranium': 'florale, verte et rosée', 'Camomille': 'douce, herbacée et apaisante',
  "Fleur d'oranger": 'florale, blanche et lumineuse', 'Bois de cèdre': 'boisée, sèche et réconfortante', 'Encens (oliban)': 'résineuse, chaude et méditative',
  'Cannelle': 'épicée, chaude et gourmande', 'Clou de girofle': 'épicée et chaude', 'Gingembre': 'épicée, fraîche et tonique',
  'Vanille': 'gourmande, douce et réconfortante', 'Caramel': 'gourmande et sucrée', 'Café': 'gourmande et torréfiée',
  'Noix de coco': 'gourmande et solaire', 'Pêche': 'fruitée, douce et juteuse', 'Fraise': 'fruitée et gourmande', 'Poire': 'fruitée, fraîche et juteuse'
};
/* Lignes « Votre choix » : la caractéristique de chaque valeur choisie (detail, ou note du parfum) */
CATALOGUE.detailsChoix = function (p, choix) {
  return (p.options || []).map(function (o) {
    var v = o.valeurs.filter(function (x) { return choix && x.nom === choix[o.nom]; })[0];
    if (!v) return null;
    var detail = v.detail;
    if (!detail && o.nom === 'Parfum') {
      var note = CATALOGUE.notesParfums[v.nom] || CATALOGUE.notesParfums[v.nom.split(', ')[0]];
      if (note) detail = note.charAt(0).toUpperCase() + note.slice(1) + '.';
    }
    return detail ? { option: o.nom, valeur: v.nom, detail: detail } : null;
  }).filter(Boolean);
};

/* ---------- Recherche (loupe de l'en-tête et page collection ?recherche=…) ----------
   Cherche dans le nom, la catégorie, la collection, les variantes (parfum, couleur…)
   et les textes. Tous les mots tapés doivent être trouvés. Sans accents ni majuscules. */
CATALOGUE.normaliser = function (texte) {
  return String(texte || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/[^a-z0-9]+/g, ' ').trim();
};
CATALOGUE.rechercher = function (texte) {
  var N = CATALOGUE.normaliser;
  var mots = N(texte).split(' ').filter(function (m) { return m.length > 1; })
    .map(function (m) { return m.length > 3 ? m.replace(/[sx]$/, '') : m; }); // bougies → bougie
  if (!mots.length) return [];
  var resultats = [];
  Object.keys(CATALOGUE.produits).forEach(function (id, rang) {
    var p = CATALOGUE.produits[id];
    var collection = CATALOGUE.collection(p.collection);
    var valeurs = [];
    (p.options || []).forEach(function (o) { o.valeurs.forEach(function (v) { valeurs.push({ option: o.nom, valeur: v.nom, texte: N(v.nom) }); }); });
    var champs = [
      { poids: 6, texte: N(p.nom) },
      { poids: 3, texte: N(CATALOGUE.categories[p.categorie] + ' ' + (collection ? collection.nom : '')) },
      { poids: 4, texte: valeurs.map(function (v) { return v.texte; }).join(' ') },
      { poids: 1, texte: N(p.accroche + ' ' + p.description + ' ' + p.pointsForts.join(' ')) }
    ];
    var score = 0;
    var tousTrouves = mots.every(function (m) {
      var meilleur = 0;
      champs.forEach(function (c) { if (c.poids > meilleur && c.texte.indexOf(m) >= 0) meilleur = c.poids; });
      score += meilleur;
      return meilleur > 0;
    });
    if (!tousTrouves) return;
    // Un mot correspond à une variante (« lavande », « rose », « 40 cm ») : on la propose directement
    var variante = valeurs.filter(function (v) {
      return mots.some(function (m) { return v.texte.indexOf(m) >= 0 && champs[0].texte.indexOf(m) < 0; });
    })[0] || null;
    resultats.push({ id: id, score: score, rang: rang, variante: variante ? { option: variante.option, valeur: variante.valeur } : null });
  });
  return resultats.sort(function (a, b) { return b.score - a.score || a.rang - b.rang; });
};
/* Lien vers un produit, avec une variante déjà choisie (ex. ?produit=…&Parfum=Lavande) */
CATALOGUE.lienProduitVariante = function (id, variante) {
  return CATALOGUE.lienProduit(id) + (variante ? '&' + encodeURIComponent(variante.option) + '=' + encodeURIComponent(variante.valeur) : '');
};

/* « 17 parfums », « 6 couleurs » : affiché sur les cartes produit */
CATALOGUE.resumeOptions = function (p) {
  // l'option qui offre le plus de choix (ex. 10 parfums plutôt que 2 tailles)
  var o = (p.options || []).filter(function (x) { return x.valeurs.length > 1; })
    .sort(function (a, b) { return b.valeurs.length - a.valeurs.length; })[0];
  if (!o) return '';
  var mot = o.nom.toLowerCase();
  return o.valeurs.length + ' ' + (/[sx]$/.test(mot) ? mot : mot + 's');
};
