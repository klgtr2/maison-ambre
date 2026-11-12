/* =========================================================
   MAISON AMBRE — Vrai panier + paiement Stripe
   - garde le panier dans le navigateur (il survit à un rechargement) ;
   - affiche le tiroir du panier (quantités, livraison, total) ;
   - envoie le panier à la fonction Netlify « creer-paiement »,
     qui ouvre la page de paiement sécurisée de Stripe.
   Les prix et la livraison viennent de catalogue-produits.js.
   ========================================================= */
(() => {
  const MA = window.MaisonAmbre;
  const CATALOGUE = window.CATALOGUE_MAISON_AMBRE;
  if (!MA || !CATALOGUE) return;

  const html = document.documentElement;
  const CLE_STOCKAGE = 'maison-ambre-panier';
  const ADRESSE_PAIEMENT = '/.netlify/functions/creer-paiement';

  /* Centimes → euros : 129000 → « 1 290 € », 490 → « 4,90 € » */
  const euros = (centimes) => (centimes / 100).toLocaleString('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: centimes % 100 ? 2 : 0,
  });
  const trouverParNom = (nom) => Object.keys(CATALOGUE.produits).find((id) => CATALOGUE.produits[id].nom === nom);

  /* ---------- 1. Contenu du panier, gardé dans le navigateur ---------- */
  const lireStockage = (texte) => {
    let liste;
    try { liste = JSON.parse(texte); } catch (e) { liste = []; }
    if (!Array.isArray(liste)) return [];
    return liste
      .filter((a) => a && CATALOGUE.produits[a.id] && Number.isInteger(a.quantite) && a.quantite > 0)
      .map((a) => ({ id: a.id, quantite: Math.min(a.quantite, CATALOGUE.quantiteMax) }));
  };
  let articles = [];
  try { articles = lireStockage(localStorage.getItem(CLE_STOCKAGE)); } catch (e) { articles = []; }
  const sauver = () => {
    try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(articles)); } catch (e) { /* stockage indisponible */ }
  };
  const nombreArticles = () => articles.reduce((total, a) => total + a.quantite, 0);

  /* ---------- Éléments de la page ---------- */
  const tiroir = document.querySelector('.tiroir-panier');
  const boutonPanier = document.querySelector('.panier');
  if (!tiroir || !boutonPanier) return;
  const compteur = boutonPanier.querySelector('.panier__compteur');
  const liste = tiroir.querySelector('.tiroir-panier__liste');
  const nombreTitre = tiroir.querySelector('.tiroir-panier__nombre');
  const astuce = tiroir.querySelector('.tiroir-panier__astuce');
  const jauge = tiroir.querySelector('.tiroir-panier__jauge span');
  const boutonPayer = tiroir.querySelector('[data-payer]');
  const message = tiroir.querySelector('.tiroir-panier__message');
  const boutonFermer = tiroir.querySelector('.tiroir-panier__fermer');
  const champ = (nom) => tiroir.querySelector(`[data-montant="${nom}"]`);

  /* ---------- 2. Affichage du tiroir ---------- */
  const creerBouton = (classe, action, texte, etiquette) => {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = classe;
    bouton.dataset.action = action;
    bouton.textContent = texte;
    bouton.setAttribute('aria-label', etiquette);
    return bouton;
  };

  const creerLigne = (article, index, animer) => {
    const produit = CATALOGUE.produits[article.id];
    const ligne = document.createElement('li');
    ligne.className = animer ? 'ligne-panier ligne-panier--anime' : 'ligne-panier';
    ligne.dataset.id = article.id;
    ligne.style.setProperty('--i', index);

    const visuel = document.createElement('span');
    visuel.className = 'ligne-panier__visuel';
    const image = document.createElement('img');
    image.src = produit.image;
    image.alt = '';
    visuel.append(image);

    const infos = document.createElement('div');
    infos.className = 'ligne-panier__infos';
    const nom = document.createElement('p');
    nom.className = 'ligne-panier__nom';
    nom.textContent = produit.nom;
    const prix = document.createElement('p');
    prix.className = 'ligne-panier__prix';
    prix.textContent = euros(produit.prix * article.quantite);
    const quantite = document.createElement('div');
    quantite.className = 'quantite';
    const valeur = document.createElement('span');
    valeur.className = 'quantite__valeur';
    valeur.textContent = article.quantite;
    quantite.append(
      creerBouton('quantite__bouton', 'moins', '−', `Retirer un exemplaire de ${produit.nom}`),
      valeur,
      creerBouton('quantite__bouton', 'plus', '+', `Ajouter un exemplaire de ${produit.nom}`),
    );
    infos.append(nom, prix, quantite);

    ligne.append(visuel, infos, creerBouton('ligne-panier__retirer', 'retirer', 'Retirer', `Retirer ${produit.nom} du panier`));
    return ligne;
  };

  // animer : 'tout' (ouverture du tiroir), l'id d'un produit qui vient d'arriver, ou rien
  const rendre = (animer = null) => {
    liste.textContent = '';
    articles.forEach((article, i) => liste.append(creerLigne(article, i, animer === 'tout' || animer === article.id)));
    tiroir.classList.toggle('est-vide', articles.length === 0);

    const montants = CATALOGUE.calculer(articles);
    champ('sousTotal').textContent = euros(montants.sousTotal);
    champ('livraison').textContent = montants.livraison ? euros(montants.livraison) : 'Offerte';
    champ('total').textContent = euros(montants.total);
    const reste = CATALOGUE.livraison.seuilOffert - montants.sousTotal;
    astuce.textContent = reste > 0
      ? `Plus que ${euros(reste)} pour profiter de la livraison offerte`
      : 'Bonne nouvelle : la livraison vous est offerte';
    jauge.style.transform = `scaleX(${Math.min(montants.sousTotal / CATALOGUE.livraison.seuilOffert, 1)})`;

    const n = nombreArticles();
    compteur.textContent = n;
    compteur.classList.toggle('est-rempli', n > 0);
    nombreTitre.textContent = n;
    boutonPanier.setAttribute('aria-label', `Panier, ${n} article${n > 1 ? 's' : ''}`);
    message.textContent = '';
  };

  const faireRebondir = () => {
    compteur.classList.remove('rebond');
    void compteur.offsetWidth; // relance l'animation
    compteur.classList.add('rebond');
  };

  /* ---------- 3. Modifier les quantités ---------- */
  const changerQuantite = (id, ecart, action) => {
    const article = articles.find((a) => a.id === id);
    if (!article) return;
    article.quantite = Math.min(article.quantite + ecart, CATALOGUE.quantiteMax);
    if (article.quantite <= 0) articles = articles.filter((a) => a.id !== id);
    sauver();
    rendre();
    faireRebondir();
    // Garde le focus sur le même bouton pour la navigation au clavier
    const memeBouton = liste.querySelector(`[data-id="${id}"] [data-action="${action}"]`);
    if (memeBouton) memeBouton.focus();
  };

  const retirer = (id) => {
    const ligne = liste.querySelector(`[data-id="${id}"]`);
    const finir = () => {
      articles = articles.filter((a) => a.id !== id);
      sauver();
      rendre();
      boutonFermer.focus();
    };
    if (ligne && !MA.reduit) {
      ligne.classList.add('est-retiree');
      setTimeout(finir, 350);
    } else {
      finir();
    }
  };

  liste.addEventListener('click', (e) => {
    const bouton = e.target.closest('[data-action]');
    if (!bouton) return;
    const id = bouton.closest('.ligne-panier').dataset.id;
    if (bouton.dataset.action === 'plus') changerQuantite(id, 1, 'plus');
    else if (bouton.dataset.action === 'moins') changerQuantite(id, -1, 'moins');
    else retirer(id);
  });

  /* ---------- 4. Ouvrir / fermer le tiroir ---------- */
  let focusAvant = null;
  const ouvrir = () => {
    if (html.classList.contains('panier-ouvert')) return;
    focusAvant = document.activeElement;
    rendre('tout');
    tiroir.inert = false;
    tiroir.setAttribute('aria-hidden', 'false');
    html.classList.add('panier-ouvert');
    setTimeout(() => boutonFermer.focus({ preventScroll: true }), 80);
  };
  const fermer = () => {
    if (!html.classList.contains('panier-ouvert')) return;
    html.classList.remove('panier-ouvert');
    tiroir.setAttribute('aria-hidden', 'true');
    tiroir.inert = true;
    if (focusAvant && focusAvant.focus) focusAvant.focus({ preventScroll: true });
  };
  tiroir.inert = true;
  boutonPanier.addEventListener('click', ouvrir);
  document.querySelectorAll('[data-fermer-panier]').forEach((el) => el.addEventListener('click', fermer));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermer(); });

  /* ---------- 5. Paiement sécurisé Stripe ---------- */
  const coordonnees = () => {
    const courriel = document.querySelector('#contact a[href^="mailto:"]');
    const telephone = document.querySelector('#contact a[href^="tel:"]');
    return [courriel && courriel.textContent, telephone && telephone.textContent].filter(Boolean).join(' ou ');
  };
  const finirAttente = () => {
    tiroir.classList.remove('est-en-cours');
    boutonPayer.disabled = false;
  };

  boutonPayer.addEventListener('click', async () => {
    if (!articles.length || tiroir.classList.contains('est-en-cours')) return;
    tiroir.classList.add('est-en-cours');
    boutonPayer.disabled = true;
    message.textContent = 'Ouverture du paiement sécurisé…';
    try {
      const reponse = await fetch(ADRESSE_PAIEMENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles }),
      });
      const donnees = await reponse.json().catch(() => ({}));
      if (reponse.ok && donnees.url) {
        window.location.href = donnees.url; // direction la page de paiement Stripe
        return;
      }
      throw Object.assign(new Error(donnees.erreur || ''), { duServeur: true });
    } catch (erreur) {
      const raison = erreur.duServeur && erreur.message
        ? erreur.message
        : "Le paiement en ligne n'est pas encore disponible.";
      const contact = coordonnees();
      message.textContent = contact ? `${raison} Pour commander dès maintenant : ${contact}.` : raison;
      finirAttente();
    }
  });

  // Retour depuis la page Stripe avec le bouton « précédent » du navigateur
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { finirAttente(); message.textContent = ''; }
  });

  // Panier ouvert dans plusieurs onglets : on garde tout synchronisé
  window.addEventListener('storage', (e) => {
    if (e.key !== CLE_STOCKAGE) return;
    articles = lireStockage(e.newValue);
    rendre();
  });

  /* ---------- 6. Les prix affichés sur la page sont ceux du catalogue ---------- */
  document.querySelectorAll('[data-ajout-panier]').forEach((bouton) => {
    const id = trouverParNom(bouton.dataset.ajoutPanier);
    if (!id) { console.warn('Produit absent de catalogue-produits.js :', bouton.dataset.ajoutPanier); return; }
    const bloc = bouton.closest('.carte-produit, .panneau');
    const prix = bloc && bloc.querySelector('.carte-produit__prix, .panneau__prix');
    if (prix) prix.textContent = euros(CATALOGUE.produits[id].prix);
  });

  /* ---------- Accès pour les autres scripts ---------- */
  MA.panier = {
    ajouter(nom) {
      const id = trouverParNom(nom);
      if (!id) { console.warn('Produit absent de catalogue-produits.js :', nom); return false; }
      const article = articles.find((a) => a.id === id);
      if (article) article.quantite = Math.min(article.quantite + 1, CATALOGUE.quantiteMax);
      else articles.push({ id, quantite: 1 });
      sauver();
      rendre(id);
      faireRebondir();
      return true;
    },
    ouvrir,
    fermer,
    nombre: nombreArticles,
  };

  rendre();
})();
