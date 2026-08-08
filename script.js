// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

let lastScroll = 0;
let ticking = false;

function onScroll() {
    const currentScroll = window.pageYOffset;

    // Navbar background
    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link highlighting
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (currentScroll > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Particles Animation =====
const particlesContainer = document.getElementById('particles');
const isMobile = window.innerWidth < 768;
const maxParticles = isMobile ? 12 : 25;
let activeParticles = 0;

function createParticle() {
    if (activeParticles >= maxParticles) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';

    const size = Math.random() * 3 + 1.5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    particlesContainer.appendChild(particle);
    activeParticles++;

    setTimeout(() => {
        particle.remove();
        activeParticles--;
    }, 10000);
}

// Create initial particles with stagger
for (let i = 0; i < (isMobile ? 8 : 18); i++) {
    setTimeout(createParticle, i * 300);
}

// Continuously create new particles at a reduced rate
setInterval(createParticle, isMobile ? 1200 : 700);

// ===== Counter Animation =====
const counters = document.querySelectorAll('[data-target]');
const speed = 200;

const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const increment = target / speed;
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (target % 1 === 0) {
                counter.innerText = Math.ceil(current).toLocaleString();
            } else {
                counter.innerText = current.toFixed(1);
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target % 1 === 0) {
                counter.innerText = target.toLocaleString();
            } else {
                counter.innerText = target.toFixed(1);
            }
        }
    };

    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.3 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== Staggered Fade In Animation on Scroll =====
const fadeElements = document.querySelectorAll(
    '.about-card, .service-card, .op-stat, .stat-card, .contact-item, .section-header'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use data-delay attribute for stagger, or calculate from index
            const delay = entry.target.getAttribute('data-delay');
            const delayMs = delay ? parseInt(delay) * 120 : 0;

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delayMs);

            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    button.disabled = true;
    button.style.opacity = '0.7';

    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        button.style.opacity = '1';
        button.style.background = 'linear-gradient(135deg, #0EA5A0, #33D4CF)';

        // Reset form
        contactForm.reset();

        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    }, 1500);
});

// ===== Dynamic Year in Footer =====
const footerCopyright = document.getElementById('footerCopyright');
if (footerCopyright) {
    const year = new Date().getFullYear();
    footerCopyright.innerHTML = `&copy; ${year} Nexus Petroleum Corporation. All rights reserved.`;
}

// ===== Optimized Parallax Effect on Hero =====
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const particles = document.querySelector('.hero-particles');
    const viewportHeight = window.innerHeight;

    if (scrolled < viewportHeight) {
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.25}px)`;
            hero.style.opacity = 1 - (scrolled / viewportHeight) * 0.8;
        }
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    }

    parallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

// ===== Service Cards Tilt Effect =====
const serviceCards = document.querySelectorAll('.service-card');

if (!isMobile) {
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Console Welcome Message =====
console.log(
    '%c⚡ NEXUS PETROLEUM ⚡',
    'color: #F0A500; font-size: 24px; font-weight: bold; font-family: Inter, sans-serif;'
);
console.log(
    '%cPowering Tomorrow\'s Energy',
    'color: #9A97A8; font-size: 14px; font-style: italic;'
);
console.log(
    '%cInterested in joining our team? Visit our careers page!',
    'color: #0EA5A0; font-size: 12px;'
);