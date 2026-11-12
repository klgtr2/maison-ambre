/* =========================================================
   MAISON AMBRE — Création du paiement Stripe (fonction Netlify)
   Reçoit le contenu du panier, recalcule les prix et la livraison à partir
   de catalogue-produits.js (le client ne peut donc pas modifier un prix),
   puis ouvre une page de paiement sécurisée Stripe Checkout.

   Réglage obligatoire dans Netlify :
   Configuration du site > Variables d'environnement > STRIPE_SECRET_KEY
   - sk_test_...  pour les essais (paiements fictifs) ;
   - sk_live_...  une fois le compte Stripe activé (SIRET).
   Cette clé secrète ne doit jamais être écrite dans les fichiers du site.
   ========================================================= */
const catalogue = require('../../catalogue-produits.js');

const repondre = (statut, donnees) => ({
  statusCode: statut,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(donnees),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return repondre(405, { erreur: 'Méthode non autorisée.' });

  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return repondre(503, { erreur: "Le paiement en ligne n'est pas encore configuré." });

  // 1. Lire et vérifier le panier envoyé par le site
  let articles = null;
  try { articles = JSON.parse(event.body || '{}').articles; } catch (e) { articles = null; }
  if (!Array.isArray(articles) || articles.length === 0 || articles.length > 30) {
    return repondre(400, { erreur: 'Votre panier est vide ou invalide.' });
  }
  const lignes = [];
  for (const article of articles) {
    const id = article && article.id;
    const produit = Object.prototype.hasOwnProperty.call(catalogue.produits, id) ? catalogue.produits[id] : null;
    const quantite = Number(article && article.quantite);
    if (!produit || !Number.isInteger(quantite) || quantite < 1 || quantite > catalogue.quantiteMax) {
      return repondre(400, { erreur: 'Un article du panier est invalide. Rechargez la page et réessayez.' });
    }
    lignes.push({ id, produit, quantite });
  }
  const montants = catalogue.calculer(lignes);

  // 2. Préparer la session de paiement Stripe Checkout
  const site = process.env.URL || `https://${event.headers.host}`;
  const p = new URLSearchParams();
  p.append('mode', 'payment');
  p.append('locale', 'fr');
  p.append('success_url', `${site}/page-commande-confirmee.html?commande={CHECKOUT_SESSION_ID}`);
  p.append('cancel_url', `${site}/#boutique`);
  p.append('billing_address_collection', 'auto');
  p.append('phone_number_collection[enabled]', 'true');
  p.append('allow_promotion_codes', 'true'); // pour le code -10 % de la newsletter (à créer dans Stripe)
  catalogue.livraison.pays.forEach((pays, i) => {
    p.append(`shipping_address_collection[allowed_countries][${i}]`, pays);
  });
  lignes.forEach((ligne, i) => {
    p.append(`line_items[${i}][quantity]`, String(ligne.quantite));
    p.append(`line_items[${i}][price_data][currency]`, 'eur');
    p.append(`line_items[${i}][price_data][unit_amount]`, String(ligne.produit.prix));
    p.append(`line_items[${i}][price_data][product_data][name]`, ligne.produit.nom);
    p.append(`line_items[${i}][price_data][product_data][metadata][reference]`, ligne.id);
  });
  p.append('shipping_options[0][shipping_rate_data][type]', 'fixed_amount');
  p.append('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(montants.livraison));
  p.append('shipping_options[0][shipping_rate_data][fixed_amount][currency]', 'eur');
  p.append('shipping_options[0][shipping_rate_data][display_name]',
    montants.livraison === 0 ? 'Livraison offerte' : 'Livraison à domicile');
  p.append('metadata[source]', 'site-maison-ambre');

  // 3. Demander à Stripe l'adresse de la page de paiement
  try {
    const reponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cle}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: p.toString(),
    });
    const session = await reponse.json();
    if (!reponse.ok) {
      console.error('Erreur Stripe :', session && session.error && session.error.message);
      return repondre(502, { erreur: 'Le paiement est momentanément indisponible.' });
    }
    return repondre(200, { url: session.url });
  } catch (erreur) {
    console.error('Stripe injoignable :', erreur);
    return repondre(502, { erreur: 'Le paiement est momentanément indisponible.' });
  }
};
