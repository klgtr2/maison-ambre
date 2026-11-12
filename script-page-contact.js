/* =========================================================
   MAISON AMBRE — Page contact
   - Formulaire : envoi par Netlify Forms quand le site est sur Netlify
     (les messages arrivent dans Netlify > Forms) ; sinon, la messagerie
     du visiteur s'ouvre avec le message déjà rédigé pour maisonambre@gmail.com.
   - Questions fréquentes : ouverture et fermeture en douceur.
   ========================================================= */
(() => {
  const MA = window.MaisonAmbre;
  const reduit = MA ? MA.reduit : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ADRESSE = 'maisonambre@gmail.com';

  /* ---------- 1. Formulaire de contact ---------- */
  const formulaire = document.querySelector('.formulaire-contact');
  if (formulaire) {
    const etat = formulaire.querySelector('.formulaire-contact__etat');
    const bouton = formulaire.querySelector('.formulaire-contact__envoyer');

    const ouvrirMessagerie = (donnees) => {
      const sujet = `Demande de contact : ${donnees.get('sujet') || 'Maison Ambre'}`;
      const corps = [
        `Nom : ${donnees.get('nom')}`,
        `E-mail : ${donnees.get('courriel')}`,
        `Sujet : ${donnees.get('sujet')}`,
        '',
        donnees.get('message'),
      ].join('\n');
      window.location.href = `mailto:${ADRESSE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    };

    formulaire.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!formulaire.checkValidity()) { formulaire.reportValidity(); return; }
      const donnees = new FormData(formulaire);
      if (donnees.get('champ-robot')) return; // robot détecté : on ignore

      formulaire.classList.add('est-en-cours');
      bouton.disabled = true;
      etat.textContent = 'Envoi en cours…';

      let envoye = false;
      try {
        const reponse = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(donnees).toString(),
        });
        // Seul Netlify enregistre réellement le message
        const surNetlify = reponse.headers.has('x-nf-request-id')
          || (reponse.headers.get('server') || '').toLowerCase().includes('netlify');
        envoye = reponse.ok && surNetlify;
      } catch (erreur) {
        envoye = false;
      }

      formulaire.classList.remove('est-en-cours');
      bouton.disabled = false;

      if (envoye) {
        etat.textContent = '';
        formulaire.classList.add('est-envoye');
        formulaire.reset();
      } else {
        etat.textContent = 'Votre messagerie s\'ouvre avec votre message prêt à être envoyé.';
        ouvrirMessagerie(donnees);
      }
    });
  }

  /* ---------- 2. Questions fréquentes : accordéon animé ---------- */
  document.querySelectorAll('.faq__question').forEach((question) => {
    const titre = question.querySelector('summary');
    const reponse = question.querySelector('.faq__reponse');
    question.addEventListener('toggle', () => question.classList.toggle('est-ouvert', question.open));

    titre.addEventListener('click', (e) => {
      if (reduit || !reponse.animate) return; // ouverture native, sans animation
      e.preventDefault();
      if (question.dataset.enMouvement) return;
      const ouvrir = !question.open;
      question.dataset.enMouvement = 'oui';
      question.classList.toggle('est-ouvert', ouvrir);
      if (ouvrir) question.open = true;
      const hauteur = reponse.scrollHeight;
      const animation = reponse.animate(
        ouvrir
          ? [{ height: '0px', opacity: 0 }, { height: `${hauteur}px`, opacity: 1 }]
          : [{ height: `${hauteur}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
      // Fin de l'animation (avec une sécurité si le navigateur la ralentit)
      let fini = false;
      const terminer = () => {
        if (fini) return;
        fini = true;
        animation.cancel();
        if (!ouvrir) question.open = false;
        delete question.dataset.enMouvement;
      };
      animation.onfinish = terminer;
      setTimeout(terminer, 600);
    });
  });
})();
