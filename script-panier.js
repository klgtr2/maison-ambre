/* =========================================================
   PANIER COULISSANT
   - garde le panier dans le navigateur (il survit à un rechargement) ;
   - barre « Plus que X € pour la livraison offerte » ;
   - tout bouton avec data-ajouter="identifiant-produit" ajoute au panier
     (data-quantite="2" pour en ajouter plusieurs).
   Le paiement sera branché plus tard (Shopify) : CONFIG_BOUTIQUE.paiementActif.
   ========================================================= */
(function () {
  var CONFIG = window.CONFIG_BOUTIQUE;
  var CATALOGUE = window.CATALOGUE;
  var B = window.BOUTIQUE;
  if (!CONFIG || !CATALOGUE || !B) return;

  var html = document.documentElement;
  var CLE = 'panier-boutique';
  var MAX = 10;
  var tiroir = document.querySelector('.tiroir-panier');
  var liste = tiroir.querySelector('.tiroir-panier__liste');
  var bouton = document.querySelector('.bouton-panier');
  var compteur = bouton.querySelector('.panier__compteur');
  var texteLivraison = tiroir.querySelector('.livraison-offerte__texte');
  var jauge = tiroir.querySelector('.livraison-offerte__jauge span');
  var sousTotal = tiroir.querySelector('[data-sous-total]');
  var commander = tiroir.querySelector('[data-commander]');
  var message = tiroir.querySelector('.tiroir-panier__message');

  /* ---------- Contenu du panier ---------- */
  var lire = function () {
    try {
      var donnees = JSON.parse(localStorage.getItem(CLE)) || [];
      return donnees.filter(function (a) { return CATALOGUE.produits[a.id] && a.quantite > 0; });
    } catch (e) { return []; }
  };
  var articles = lire();
  var sauver = function () { try { localStorage.setItem(CLE, JSON.stringify(articles)); } catch (e) { /* rien */ } };
  var total = function () {
    return articles.reduce(function (somme, a) { return somme + CATALOGUE.produits[a.id].prix * a.quantite; }, 0);
  };
  var nombre = function () { return articles.reduce(function (somme, a) { return somme + a.quantite; }, 0); };

  /* ---------- Affichage ---------- */
  var ligne = function (article, nouvelle) {
    var p = CATALOGUE.produits[article.id];
    return '<li class="ligne-panier' + (nouvelle ? ' ligne-panier--nouvelle' : '') + '" data-id="' + article.id + '">' +
      '<div class="ligne-panier__visuel">' + B.visuelProduit(p) + '</div>' +
      '<div class="ligne-panier__infos">' +
        '<a class="ligne-panier__nom" href="' + CATALOGUE.lienProduit(article.id) + '">' + B.echapper(p.nom) + '</a>' +
        '<span class="ligne-panier__prix">' + B.euros(p.prix * article.quantite) + '</span>' +
        '<div class="quantite">' +
          '<button type="button" data-action="moins" aria-label="Retirer un exemplaire">−</button>' +
          '<output>' + article.quantite + '</output>' +
          '<button type="button" data-action="plus" aria-label="Ajouter un exemplaire">+</button>' +
        '</div>' +
      '</div>' +
      '<button class="ligne-panier__retirer" type="button" data-action="retirer">Retirer</button>' +
    '</li>';
  };

  var rendre = function (idNouveau) {
    liste.innerHTML = articles.map(function (a) { return ligne(a, a.id === idNouveau); }).join('');
    tiroir.classList.toggle('est-vide', articles.length === 0);

    var montant = total();
    var reste = CONFIG.livraison.seuilOffert - montant;
    texteLivraison.innerHTML = reste > 0
      ? 'Plus que <strong>' + B.euros(reste) + '</strong> pour la livraison offerte'
      : '<strong>Bonne nouvelle :</strong> la livraison vous est offerte !';
    jauge.style.transform = 'scaleX(' + Math.min(montant / CONFIG.livraison.seuilOffert, 1) + ')';
    sousTotal.textContent = B.euros(montant);

    var n = nombre();
    compteur.textContent = n;
    compteur.classList.toggle('est-rempli', n > 0);
    bouton.setAttribute('aria-label', 'Panier, ' + n + ' article' + (n > 1 ? 's' : ''));

    commander.disabled = !CONFIG.paiementActif;
    message.textContent = CONFIG.paiementActif ? '' : "Le paiement en ligne sera disponible à l'ouverture de la boutique.";
  };

  var rebondir = function () {
    compteur.classList.remove('rebond');
    void compteur.offsetWidth;
    compteur.classList.add('rebond');
  };

  /* ---------- Ouvrir / fermer ---------- */
  var ouvrir = function () {
    html.classList.add('panier-ouvert');
    B.voile.classList.add('est-visible');
    tiroir.setAttribute('aria-hidden', 'false');
    var fermer = tiroir.querySelector('[data-fermer-panier]');
    setTimeout(function () { fermer.focus({ preventScroll: true }); }, 80);
  };
  var fermer = function () {
    if (!html.classList.contains('panier-ouvert')) return;
    html.classList.remove('panier-ouvert');
    if (!html.classList.contains('menu-ouvert')) B.voile.classList.remove('est-visible');
    tiroir.setAttribute('aria-hidden', 'true');
  };
  bouton.addEventListener('click', ouvrir);
  tiroir.querySelectorAll('[data-fermer-panier]').forEach(function (b) { b.addEventListener('click', fermer); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });

  /* ---------- Ajouter, modifier, retirer ---------- */
  var ajouter = function (id, quantite) {
    var produit = CATALOGUE.produits[id];
    if (!produit || produit.abonnement) return;
    var article = articles.filter(function (a) { return a.id === id; })[0];
    if (article) article.quantite = Math.min(article.quantite + quantite, MAX);
    else articles.push({ id: id, quantite: Math.min(quantite, MAX) });
    sauver();
    rendre(id);
    rebondir();
  };

  document.addEventListener('click', function (e) {
    var declencheur = e.target.closest('[data-ajouter]');
    if (!declencheur) return;
    var ids = declencheur.dataset.ajouter.split(',');
    var quantite = parseInt(declencheur.dataset.quantite || '1', 10) || 1;
    ids.forEach(function (id) { ajouter(id.trim(), quantite); });
    ouvrir();
  });

  liste.addEventListener('click', function (e) {
    var action = e.target.closest('[data-action]');
    if (!action) return;
    var id = action.closest('.ligne-panier').dataset.id;
    var article = articles.filter(function (a) { return a.id === id; })[0];
    if (!article) return;
    if (action.dataset.action === 'plus') article.quantite = Math.min(article.quantite + 1, MAX);
    if (action.dataset.action === 'moins') article.quantite -= 1;
    if (action.dataset.action === 'retirer') article.quantite = 0;
    articles = articles.filter(function (a) { return a.quantite > 0; });
    sauver();
    rendre();
  });

  commander.addEventListener('click', function () {
    // À l'ouverture de la boutique, ce bouton mènera au paiement Shopify.
  });

  window.addEventListener('storage', function (e) { if (e.key === CLE) { articles = lire(); rendre(); } });

  window.PANIER = { ajouter: ajouter, ouvrir: ouvrir, fermer: fermer };
  rendre();
})();
