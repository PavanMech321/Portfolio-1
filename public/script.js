/* ============================================
   INTERACTIVE 3D ANIMATIONS & EFFECTS
   ============================================ */

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for element animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards and skill cards
document.querySelectorAll('.glass-card, .skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', function(e) {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        card.style.transform = `translateZ(0) rotateX(${y}deg) rotateY(${x}deg)`;
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #06b6d4 !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        border-radius: 1px;
    }
`;
document.head.appendChild(style);

// Glow effect on buttons
document.querySelectorAll('.btn-hover-glow').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

const cursorGlowStyle = document.createElement('style');
cursorGlowStyle.textContent = `
    .cursor-glow {
        position: fixed;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        filter: blur(40px);
        display: none;
    }
    
    @media (hover: hover) {
        .cursor-glow {
            display: block;
        }
    }
`;
document.head.appendChild(cursorGlowStyle);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 100) + 'px';
    cursorGlow.style.top = (e.clientY - 100) + 'px';
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Stagger animation for card elements
function staggerElements(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'none';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Apply stagger animation to skills
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards.length > 0) {
    staggerElements(skillCards, 150);
}

// Apply stagger animation to projects
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    staggerElements(projectCards, 200);
}

// 3D card tilt effect on hover
function add3DTilt() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

add3DTilt();

// Form submission with animation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add success animation
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// Scroll reveal animation
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('[data-reveal]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Dynamic theme based on time of day
function setThemeByTime() {
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    if (hour >= 6 && hour < 12) {
        // Morning - brighter
        root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.15)');
    } else if (hour >= 12 && hour < 18) {
        // Afternoon - balanced
        root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
    } else {
        // Evening/Night - deeper
        root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.08)');
    }
}

setThemeByTime();

// Performance optimization - lazy load animations
const animationConfig = {
    threshold: [0, 0.5, 1],
    rootMargin: '0px 0px -50px 0px'
};

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, animationConfig);

document.querySelectorAll('.glass-card, .skill-card').forEach(el => {
    lazyObserver.observe(el);
});

console.log('✨ Portfolio animations loaded successfully!');
