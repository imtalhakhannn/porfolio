// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== Typing Effect =====
const roles = [
    'Full Stack Development',
    'React.js & Python',
    'Payment Integrations',
    'Webflow Sites',
    'Mobile Applications',
    'Network Automation',
    'AI-Powered Apps'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
        roleText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 400);
            return;
        }
        setTimeout(typeRole, 30);
    } else {
        roleText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeRole, 2000);
            return;
        }
        setTimeout(typeRole, 60);
    }
}
setTimeout(typeRole, 1200);

// ===== Particles =====
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    const isPurple = Math.random() > 0.5;
    particle.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${x}%;
        background: ${isPurple ? 'rgba(124, 58, 237, 0.6)' : 'rgba(6, 182, 212, 0.5)'};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 3}px ${isPurple ? 'rgba(124, 58, 237, 0.3)' : 'rgba(6, 182, 212, 0.3)'};
    `;
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), (duration + delay) * 1000);
}
setInterval(createParticle, 400);
for (let i = 0; i < 15; i++) setTimeout(createParticle, i * 200);

// ===== Navbar =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number[data-count]');
let counterStarted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== Scroll Reveal =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.closest('.hero-stats') && !counterStarted) {
                counterStarted = true;
                animateCounters();
            }
        }
    });
}, observerOptions);

// Standard reveals
document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Project showcases - alternate left/right
document.querySelectorAll('.project-showcase').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    observer.observe(el);
});

// Skill cards - stagger
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skillsGrid.classList.add('stagger-children');
    skillsGrid.querySelectorAll('.skill-card').forEach(el => el.classList.add('reveal-child'));
    observer.observe(skillsGrid);
}

// About cards - stagger
const aboutCards = document.querySelector('.about-cards');
if (aboutCards) {
    aboutCards.classList.add('stagger-children');
    aboutCards.querySelectorAll('.about-card').forEach(el => el.classList.add('reveal-child'));
    observer.observe(aboutCards);
}

// Projects overview - stagger
const projectsOverview = document.querySelector('.projects-overview');
if (projectsOverview) {
    projectsOverview.classList.add('stagger-children');
    projectsOverview.querySelectorAll('.project-overview-card').forEach(el => el.classList.add('reveal-child'));
    observer.observe(projectsOverview);
}

// About text
document.querySelectorAll('.about-text').forEach(el => {
    el.classList.add('reveal-left');
    observer.observe(el);
});

// Contact cards - stagger
const contactCards = document.querySelector('.contact-cards');
if (contactCards) {
    contactCards.classList.add('stagger-children');
    contactCards.querySelectorAll('.contact-card').forEach(el => el.classList.add('reveal-child'));
    observer.observe(contactCards);
}

// Contact form
document.querySelectorAll('.contact-form').forEach(el => {
    el.classList.add('reveal-right');
    observer.observe(el);
});

// Testimonial card
document.querySelectorAll('.testimonial-card').forEach(el => {
    el.classList.add('reveal-scale');
    observer.observe(el);
});

// Hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);

// Gallery items - scale reveal
document.querySelectorAll('.project-gallery').forEach(gallery => {
    gallery.classList.add('stagger-children');
    gallery.querySelectorAll('.gallery-item').forEach(el => el.classList.add('reveal-child'));
    observer.observe(gallery);
});

// Mobile frames
document.querySelectorAll('.mobile-gallery').forEach(gallery => {
    gallery.classList.add('stagger-children');
    gallery.querySelectorAll('.mobile-frame').forEach(el => el.classList.add('reveal-child'));
    observer.observe(gallery);
});

// ===== Lightbox =====
let lightboxImages = [];
let currentLightboxIndex = 0;

function collectImages() {
    lightboxImages = Array.from(document.querySelectorAll('.gallery-item img, .mobile-frame img'));
}
collectImages();

function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay span');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    currentLightboxIndex = lightboxImages.indexOf(img);
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    event.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
    const img = lightboxImages[currentLightboxIndex];
    const parent = img.closest('.gallery-item') || img.closest('.mobile-frame');
    const caption = parent ? parent.querySelector('.gallery-overlay span') : null;

    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightboxImg').alt = img.alt;
    document.getElementById('lightboxCaption').textContent = caption ? caption.textContent : '';
}

// Close on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ===== Testimonials Slider =====
let currentTestimonial = 0;
const track = document.getElementById('testimonialsTrack');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const dotsContainer = document.getElementById('testimonialDots');

// Create dots
if (dotsContainer && cards.length) {
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonial-dot') : [];
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function slideTestimonial(dir) {
    let next = currentTestimonial + dir;
    if (next < 0) next = cards.length - 1;
    if (next >= cards.length) next = 0;
    goToTestimonial(next);
}

// Auto-slide every 6 seconds
if (cards.length > 1) {
    setInterval(() => slideTestimonial(1), 6000);
}

// ===== Contact Form - submit button animation =====
document.getElementById('contactForm').addEventListener('submit', () => {
    const btn = document.querySelector('#contactForm button[type="submit"]');
    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
});

// ===== Smooth Tilt Effect on About Cards =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Parallax on scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroGrid = document.querySelector('.hero-grid-bg');
    if (heroGrid) heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// ===== Magnetic effect on buttons =====
document.querySelectorAll('.btn-primary, .btn-glass').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});
