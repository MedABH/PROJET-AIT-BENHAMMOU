document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("imgSliderCon");
    const slides = slider.children;
    const sliderDots = document.querySelectorAll(".sliderPosition");
    let currentIndex = 0;
    const slideInterval = 5000; // Durée de chaque slide en millisecondes
    const transitionDuration = 900; // Durée de la transition en millisecondes

    function changeSlide(nextIndex) {
        // Mise à jour de l'index actuel
        const totalSlides = slides.length;
        currentIndex = (nextIndex + totalSlides) % totalSlides;

        // Déplacement du slider
        slider.style.transition = `${transitionDuration}ms ease-out`;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Mise à jour des couleurs des points
        sliderDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.style.backgroundColor = "#4f6fce"; // Bleu pour le point actif
            } else {
                dot.style.backgroundColor = "#ffffff"; // Blanc pour les autres points
            }
        });
    }
    // Ajouter les événements de clic sur les points
    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => changeSlide(index));
    });
    // Configurer le changement automatique de slide
    setInterval(() => {
        changeSlide(currentIndex + 1);
    }, slideInterval);
});
