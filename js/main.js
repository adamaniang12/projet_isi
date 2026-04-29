window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled'); // Ajoute une classe CSS avec un fond coloré
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});