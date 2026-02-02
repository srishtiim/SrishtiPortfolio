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
    const step = (target / duration) * 16;
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add fade-in class to sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        animateOnScroll.observe(section);
    });
    
    // Animate stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        animateOnScroll.observe(item);
    });
    
    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        animateOnScroll.observe(item);
    });
    
    // Animate project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        animateOnScroll.observe(card);
    });
    
    // Animate skill categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.15}s`;
        category.classList.add('fade-in');
        animateOnScroll.observe(category);
    });
    
    // Animate education cards
    document.querySelectorAll('.education-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        card.classList.add('fade-in');
        animateOnScroll.observe(card);
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
    document.querySelectorAll('.project-card:not(.fade-in)').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        animateOnScroll.observe(card);
    });
}

// Export for use in main.js
window.refreshAnimations = refreshAnimations;
