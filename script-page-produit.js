/* =========================================================
   MAISON AMBRE — Page produit
   Lit le produit demandé dans l'adresse (page-produit.html?produit=canape-nuage),
   remplit la fiche à partir de catalogue-produits.js, ajoute les produits
   similaires, puis anime le visuel (inclinaison 3D qui suit la souris).
   ========================================================= */
(() => {
  const MA = window.MaisonAmbre;
  const CATALOGUE = window.CATALOGUE_MAISON_AMBRE;
  if (!CATALOGUE) return;

  const euros = (centimes) => (centimes / 100).toLocaleString('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: centimes % 100 ? 2 : 0,
  });
  const echapper = (texte) => String(texte).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const nomUnivers = (id) => (CATALOGUE.univers.find((u) => u.id === id) || {}).nom || '';
  const remplir = (champ, texte) => {
    document.querySelectorAll(`[data-champ="${champ}"]`).forEach((el) => { el.textContent = texte; });
  };

  const ids = Object.keys(CATALOGUE.produits);
  const id = new URLSearchParams(window.location.search).get('produit');
  const produit = Object.prototype.hasOwnProperty.call(CATALOGUE.produits, id) ? CATALOGUE.produits[id] : null;

  /* ---------- Carte d'un produit similaire (même modèle que la boutique) ---------- */
  const carte = (idProduit) => {
    const p = CATALOGUE.produits[idProduit];
    const nom = echapper(p.nom);
    return `
      <li class="produit" data-apparition="haut">
        <article class="carte-produit">
          <div class="carte-produit__visuel${p.photo ? ' avec-photo' : ''}">
            <button class="bouton-favori" type="button" aria-label="Ajouter ${nom} aux favoris" aria-pressed="false"><svg class="icone"><use href="#icone-coeur"/></svg></button>
            <img src="${echapper(CATALOGUE.visuel(idProduit))}" alt="${nom}" loading="lazy">
            <button class="bouton-panier" type="button" data-ajout-panier="${nom}"><svg class="icone"><use href="#icone-sac"/></svg><span>Ajouter au panier</span></button>
          </div>
          <div class="carte-produit__infos">
            <div>
              <h3 class="carte-produit__nom"><a class="lien-produit" href="${CATALOGUE.lienProduit(idProduit)}" data-curseur="Voir">${nom}</a></h3>
              <p class="carte-produit__type">${echapper(nomUnivers(p.univers))}</p>
            </div>
            <p class="carte-produit__prix">${euros(p.prix)}</p>
          </div>
          <p class="carte-produit__accroche">${echapper(p.accroche)}</p>
        </article>
      </li>`;
  };
  const remplirSimilaires = (liste) => {
    const grille = document.querySelector('.similaires__grille');
    if (grille) grille.innerHTML = liste.map(carte).join('');
  };

  /* ---------- Lien erroné : message « Produit introuvable » ---------- */
  if (!produit) {
    document.title = 'Produit introuvable — Maison Ambre';
    document.querySelector('[data-fiche]').hidden = true;
    document.querySelector('.fiche__suite').hidden = true;
    document.querySelector('.introuvable').hidden = false;
    remplir('nom', 'Produit introuvable');
    remplirSimilaires(ids.slice(0, 4));
    return;
  }

  /* ---------- 1. Remplir la fiche ---------- */
  document.title = `${produit.nom} — Maison Ambre`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', `${produit.nom} : ${produit.accroche}`);

  remplir('univers', nomUnivers(produit.univers));
  remplir('nom', produit.nom);
  remplir('prix', euros(produit.prix));
  remplir('accroche', produit.accroche);
  remplir('description', produit.description);

  const image = document.querySelector('[data-champ="image"]');
  image.src = CATALOGUE.visuel(id);
  image.alt = produit.nom;
  if (produit.photo) image.closest('.fiche__visuel').classList.add('avec-photo');

  document.querySelector('[data-champ="details"]').innerHTML = produit.details
    .map(([libelle, valeur]) => `<div><dt>${echapper(libelle)}</dt><dd>${echapper(valeur)}</dd></div>`)
    .join('');

  document.querySelector('.fiche__ajout').dataset.ajoutPanier = produit.nom;
  document.querySelector('.fiche__favori').setAttribute('aria-label', `Ajouter ${produit.nom} aux favoris`);

  /* ---------- 2. Produit précédent / suivant ---------- */
  const position = ids.indexOf(id);
  const voisins = {
    precedent: ids[(position - 1 + ids.length) % ids.length],
    suivant: ids[(position + 1) % ids.length],
  };
  document.querySelectorAll('[data-voisin]').forEach((lien) => {
    const autre = voisins[lien.dataset.voisin];
    lien.href = CATALOGUE.lienProduit(autre);
    lien.querySelector('strong').textContent = CATALOGUE.produits[autre].nom;
  });

  /* ---------- 3. Produits similaires : même univers, puis même type, puis le reste ---------- */
  const autres = ids.filter((autre) => autre !== id);
  const memeUnivers = autres.filter((a) => CATALOGUE.produits[a].univers === produit.univers);
  const memeType = autres.filter((a) => !memeUnivers.includes(a) && CATALOGUE.produits[a].type === produit.type);
  const reste = autres.filter((a) => !memeUnivers.includes(a) && !memeType.includes(a));
  remplirSimilaires([...memeUnivers, ...memeType, ...reste].slice(0, 4));

  /* ---------- 4. Le visuel s'incline et suit la souris (effet de profondeur) ---------- */
  const visuel = document.querySelector('.fiche__visuel');
  const scene = document.querySelector('[data-scene-produit]');
  if (MA && visuel && scene && MA.pointeurFin && !MA.reduit) {
    const cible = { rx: 0, ry: 0, dx: 0, dy: 0 };
    const actuel = { rx: 0, ry: 0, dx: 0, dy: 0 };
    visuel.addEventListener('pointermove', (e) => {
      const r = visuel.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cible.ry = px * 14;
      cible.rx = -py * 14;
      cible.dx = px * 24;
      cible.dy = py * 24;
    });
    visuel.addEventListener('pointerleave', () => { cible.rx = 0; cible.ry = 0; cible.dx = 0; cible.dy = 0; });
    MA.ajouterTache(() => {
      let bouge = false;
      Object.keys(cible).forEach((cle) => {
        const valeur = MA.lerp(actuel[cle], cible[cle], 0.08);
        if (Math.abs(valeur - actuel[cle]) > 0.005) bouge = true;
        actuel[cle] = valeur;
      });
      if (!bouge) return;
      scene.style.setProperty('--rx', `${actuel.rx.toFixed(2)}deg`);
      scene.style.setProperty('--ry', `${actuel.ry.toFixed(2)}deg`);
      scene.style.setProperty('--dx', `${actuel.dx.toFixed(1)}px`);
      scene.style.setProperty('--dy', `${actuel.dy.toFixed(1)}px`);
    });
  }
})();
