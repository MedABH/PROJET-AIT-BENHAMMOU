document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("imgSliderCon");
    const slides = slider.children;
    const sliderDots = document.querySelectorAll(".sliderPosition");
    let currentIndex = 0;
    const slideInterval = 5000; 
    const transitionDuration = 900; 

    function changeSlide(nextIndex) {
        
        const totalSlides = slides.length;
        currentIndex = (nextIndex + totalSlides) % totalSlides;

        
        slider.style.transition = `${transitionDuration}ms ease-out`;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        
        sliderDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.style.backgroundColor = "#4f6fce"; 
            } else {
                dot.style.backgroundColor = "#ffffff"; 
            }
        });
    }
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => changeSlide(index));
    });
    
    setInterval(() => {
        changeSlide(currentIndex + 1);
    }, slideInterval);
});


document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.querySelector('#carousel-inner-blog');
  
    
    if (carouselInner) {
      
      carouselInner.addEventListener('mouseenter', () => {
        carouselInner.style.animationPlayState = 'paused'; 
      });
  
      
      carouselInner.addEventListener('mouseleave', () => {
        carouselInner.style.animationPlayState = 'running'; 
      });
    } else {
      console.error("Carousel inner container not found. Check your HTML structure.");
    }
  });
