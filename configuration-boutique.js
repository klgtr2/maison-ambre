/* =========================================================
   CONFIGURATION DE LA BOUTIQUE — c'est ici que vous personnalisez
   - Tout ce qui est marqué [À COMPLÉTER] ou [À CONFIRMER] attend vos informations.
   - Le nom ci-dessous s'affiche dans l'en-tête, le menu et le pied de page.
     Les titres des pages (onglet du navigateur, Google) l'écrivent aussi en dur.
   ========================================================= */
var CONFIG_BOUTIQUE = {
  nom: 'Maison Ambre',
  slogan: "Encens, bougies et parfums d'ambiance pour une maison cosy",

  // Coordonnées affichées sur le site (laisser vide tant que ce n'est pas prêt)
  email: '',        // [À COMPLÉTER] exemple : contact@votre-boutique.fr
  telephone: '',    // [À COMPLÉTER] facultatif, exemple : 06 00 00 00 00

  // Réseaux sociaux : mettez l'adresse complète (https://...) pour afficher l'icône
  reseaux: {
    tiktok: '',     // [À COMPLÉTER]
    instagram: '',  // [À COMPLÉTER]
    pinterest: ''   // [À COMPLÉTER]
  },

  livraison: {
    seuilOffert: 3900,   // livraison offerte dès 39 € (en centimes) [À CONFIRMER]
    delaiMinJours: 3,    // délai de livraison estimé, en jours ouvrés [À CONFIRMER avec vos fournisseurs]
    delaiMaxJours: 7,
    zone: 'France métropolitaine'
  },

  retourJours: 14,       // délai pour changer d'avis (14 jours = minimum légal)
  paiementActif: false   // passera à true quand le paiement sera branché (Shopify)
};
