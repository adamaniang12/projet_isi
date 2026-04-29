window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled'); // Ajoute une classe CSS avec un fond coloré
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Logique pour incrémenter le nombre de 0 à X
            // pendant environ 2 secondes
        }
    });
}, { threshold: 0.5 }); // Déclenche quand 50% de l'élément est visible