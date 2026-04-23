/* ========================================
   ANIMATIONS - Scroll Effects & Counters
   ======================================== */

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Animate elements when they enter viewport
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stat numbers
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    // easeOutQuart easing function
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        
        let easeProgress = easeOutQuart(progress);
        let current = easeProgress * target;
        
        if (progress < 1) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Initialize scroll animations
function initScrollAnimations() {
    // Collect all elements that need reveal animation
    const elementsToReveal = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.experience-item'),
        ...document.querySelectorAll('.education-card'),
        ...document.querySelectorAll('.certification-card')
    ];
    
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');
        
        // Add staggered delay for item groups
        if (el.classList.contains('project-card') || 
            el.classList.contains('skill-category') || 
            el.classList.contains('education-card') ||
            el.classList.contains('certification-card')) {
            const groupIndex = Array.from(el.parentElement.children).indexOf(el);
            el.style.transitionDelay = `${groupIndex * 0.1}s`;
        }
        
        animateOnScroll.observe(el);
    });
    
    // Add classes and observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('reveal');
        animateOnScroll.observe(section);
    });
    
    // Animate stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        animateOnScroll.observe(item);
    });
}

// Parallax effect for hero section (optional)
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Typing animation for hero subtitle (optional)
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    // Typing effect can be added here if needed
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    initTypingAnimation();
});

// Re-initialize animations after dynamic content loads
function refreshAnimations() {
    // Re-observe newly added elements
    document.querySelectorAll('.project-card:not(.reveal)').forEach((card) => {
        const groupIndex = Array.from(card.parentElement.children).indexOf(card);
        card.style.transitionDelay = `${groupIndex * 0.1}s`;
        card.classList.add('reveal');
        animateOnScroll.observe(card);
    });
}

// Export for use in main.js
window.refreshAnimations = refreshAnimations;
