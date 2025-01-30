/* ---- Image bannner stop mouse hover ---- */
document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.querySelector('#carousel-inner');
  
    // Ensure the carousel exists in the DOM
    if (carouselInner) {
      // Pause the animation when the user hovers over the carousel
      carouselInner.addEventListener('mouseenter', () => {
        carouselInner.style.animationPlayState = 'paused'; // Pause animation
      });
  
      // Resume the animation when the mouse leaves the carousel
      carouselInner.addEventListener('mouseleave', () => {
        carouselInner.style.animationPlayState = 'running'; // Resume animation
      });
    } else {
      console.error("Carousel inner container not found. Check your HTML structure.");
    }
  });

