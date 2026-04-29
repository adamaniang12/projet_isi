window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled'); // Ajoute une classe CSS avec un fond coloré
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});


// 1. Sélectionner tous les éléments qui ont la classe "counter"
const counters = document.querySelectorAll('.counter');

// 2. Configuration de l'Observer
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target'); // La valeur finale (ex: 500)
            const duration = 2000; // Animation sur 2 secondes
            const step = target / (duration / 10); // Valeur ajoutée toutes les 10ms

            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + step);
                    setTimeout(updateCount, 10); // Relance la fonction toutes les 10ms
                } else {
                    counter.innerText = target; // S'assure de finir sur le chiffre exact
                }
            };

            updateCount();
            // 3. Une fois l'animation lancée, on arrête d'observer cet élément
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// 4. Lancer l'observation pour chaque compteur
counters.forEach(counter => {
    counterObserver.observe(counter);
});



// Sélection du formulaire
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page 

    // 1. Récupération des valeurs des champs [cite: 80, 201]
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();

    // Variable pour suivre la validité globale
    let isValid = true;

    // 2. Expression Régulière (Regex) pour l'email [cite: 81, 203]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Fonction utilitaire pour afficher les erreurs [cite: 81, 205]
    const showError = (id, condition, errorMsg) => {
        const input = document.getElementById(id);
        const errorDisplay = document.getElementById(`${id}-error`);
        
        if (condition) {
            input.classList.add('is-invalid'); // Style Bootstrap [cite: 93]
            input.classList.remove('is-valid');
            errorDisplay.textContent = errorMsg;
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorDisplay.textContent = "";
        }
    };

    // Exécution des vérifications [cite: 202, 204]
    showError('nom', nom === "", "Le nom est obligatoire.");
    showError('prenom', prenom === "", "Le prénom est obligatoire.");
    showError('email', !emailRegex.test(email), "Veuillez entrer un email valide.");
    showError('sujet', sujet === "", "Veuillez sélectionner un sujet.");
    showError('message', message.length < 20, "Le message doit faire au moins 20 caractères.");

    // 4. Si tout est valide : Affichage du succès [cite: 81, 206]
    if (isValid) {
        const successMsg = document.getElementById('form-success');
        successMsg.style.display = 'block';
        successMsg.textContent = "Merci " + prenom + " ! Votre message a été envoyé avec succès.";
        
        // Optionnel : Réinitialiser le formulaire
        contactForm.reset();
        document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }
});