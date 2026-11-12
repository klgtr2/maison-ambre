/* =========================================================
   MAISON AMBRE — Bouton « Univers » et son menu animé
   Un petit bouton fixé en bas à gauche ouvre un menu qui regroupe
   les produits par univers. Le menu est construit à partir de
   catalogue-produits.js : un nouveau produit y apparaît tout seul.
   ========================================================= */
(() => {
  const CATALOGUE = window.CATALOGUE_MAISON_AMBRE;
  if (!CATALOGUE) return;

  const euros = (centimes) => (centimes / 100).toLocaleString('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: centimes % 100 ? 2 : 0,
  });
  const echapper = (texte) => String(texte).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const produitActuel = new URLSearchParams(window.location.search).get('produit');
  const lienBoutique = document.getElementById('boutique') ? '#boutique' : 'index.html#boutique';

  /* ---------- 1. Construire le contenu du menu : un groupe par univers ---------- */
  const groupes = CATALOGUE.univers.map((univers, i) => {
    const ids = Object.keys(CATALOGUE.produits).filter((id) => CATALOGUE.produits[id].univers === univers.id);
    if (!ids.length) return '';
    const liens = ids.map((id) => {
      const p = CATALOGUE.produits[id];
      const courant = id === produitActuel ? ' aria-current="page"' : '';
      return `
        <a class="menu-univers__produit" href="${CATALOGUE.lienProduit(id)}"${courant}>
          <span class="menu-univers__vignette"><img src="${echapper(p.image)}" alt="" loading="lazy"></span>
          <span class="menu-univers__nom">${echapper(p.nom)}</span>
          <span class="menu-univers__prix">${euros(p.prix)}</span>
        </a>`;
    }).join('');
    return `<li class="menu-univers__groupe" style="--i:${i}"><p class="menu-univers__categorie">${echapper(univers.nom)}</p>${liens}</li>`;
  }).join('');

  const menu = document.createElement('div');
  menu.className = 'menu-univers';
  menu.innerHTML = `
    <div class="menu-univers__panneau" id="menu-univers-panneau" role="region" aria-label="Nos univers">
      <div class="menu-univers__entete">
        <p class="menu-univers__titre">Nos univers</p>
        <a class="menu-univers__tout lien-souligne" href="${lienBoutique}">Toute la boutique</a>
      </div>
      <ul class="menu-univers__liste">${groupes}</ul>
    </div>
    <button class="menu-univers__bouton" type="button" aria-expanded="false" aria-controls="menu-univers-panneau">
      <span class="menu-univers__icone" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="menu-univers__libelle">Univers</span>
    </button>`;
  document.body.append(menu);

  /* ---------- 2. Ouvrir / fermer ---------- */
  const bouton = menu.querySelector('.menu-univers__bouton');
  const panneau = menu.querySelector('.menu-univers__panneau');
  const libelle = menu.querySelector('.menu-univers__libelle');
  panneau.inert = true;

  const basculer = (ouvrir) => {
    const ouvert = typeof ouvrir === 'boolean' ? ouvrir : !menu.classList.contains('est-ouvert');
    if (ouvert === menu.classList.contains('est-ouvert')) return;
    menu.classList.toggle('est-ouvert', ouvert);
    bouton.setAttribute('aria-expanded', String(ouvert));
    libelle.textContent = ouvert ? 'Fermer' : 'Univers';
    panneau.inert = !ouvert;
  };

  bouton.addEventListener('click', () => basculer());
  // Un clic en dehors du menu, la touche Échap ou un lien choisi referment le menu
  document.addEventListener('click', (e) => { if (!menu.contains(e.target)) basculer(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('est-ouvert')) { basculer(false); bouton.focus(); }
  });
  panneau.addEventListener('click', (e) => { if (e.target.closest('a')) basculer(false); });
})();
