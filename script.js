// ════════════════════════════════════════ //
// CUSTOM CURSOR
// ════════════════════════════════════════ //

const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    cursor.style.left = cursorX - 4 + 'px';
    cursor.style.top = cursorY - 4 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// ════════════════════════════════════════ //
// PARTICLE CANVAS
// ════════════════════════════════════════ //

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const maxDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        this.color = ['rgba(0, 245, 255, 0.5)', 'rgba(155, 89, 255, 0.5)', 'rgba(245, 200, 66, 0.3)'][Math.floor(Math.random() * 3)];
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.3;
                ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    drawConnections();
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ════════════════════════════════════════ //
// TYPING EFFECT
// ════════════════════════════════════════ //

const typingTexts = [
    'Building AI Solutions',
    'Crafting Web Experiences',
    'Analyzing Data',
    'Automating the Future',
    'Innovating Tomorrow',
    'Solving Complex Problems'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 80);
}

typeEffect();

// ════════════════════════════════════════ //
// STICKY NAVIGATION
// ════════════════════════════════════════ //

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ════════════════════════════════════════ //
// TEAM CARD EXPANSION
// ════════════════════════════════════════ //

const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    const skillsCount = parseInt(card.getAttribute('data-skills'));
    if (skillsCount > 4) {
        card.classList.add('with-many-skills');
    }
    
    const expandBtn = card.querySelector('.expand-btn');
    if (expandBtn) {
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('expanded');
            expandBtn.textContent = card.classList.contains('expanded') ? 'Show Less' : 'View More Skills';
        });
    }
});

// ════════════════════════════════════════ //
// SCROLL ANIMATIONS
// ════════════════════════════════════════ //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation;
        }
    });
}, observerOptions);

document.querySelectorAll('section > *').forEach(el => {
    observer.observe(el);
});

// ════════════════════════════════════════ //
// CERTIFICATIONS TICKER SCROLL
// ════════════════════════════════════════ //

const ticker = document.getElementById('ticker');
const tickerWrapper = document.querySelector('.ticker-wrapper');

if (ticker && tickerWrapper) {
    const tickerWidth = ticker.offsetWidth;
    const wrapperWidth = tickerWrapper.offsetWidth;
    
    // Clone items for seamless loop
    const items = ticker.querySelectorAll('.cert-item');
    items.forEach(item => {
        ticker.appendChild(item.cloneNode(true));
    });
}

// ════════════════════════════════════════ //
// PROJECT CARD TILT EFFECT
// ════════════════════════════════════════ //

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ════════════════════════════════════════ //
// SMOOTH SCROLL LINKS
// ════════════════════════════════════════ //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ════════════════════════════════════════ //
// TECH STACK RADAR INTERACTIVITY
// ════════════════════════════════════════ //

const radarCategories = document.querySelectorAll('.radar-category');
const projectCardsList = document.querySelectorAll('.project-card');

const categoryDomainMap = {
    0: ['Languages'],
    1: ['Frameworks'],
    2: ['Databases'],
    3: ['Domains']
};

radarCategories.forEach((category, index) => {
    category.addEventListener('mouseenter', () => {
        category.style.opacity = '1';
        projectCardsList.forEach(card => {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
        });
    });
    
    category.addEventListener('mouseleave', () => {
        projectCardsList.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
    });
});

// ════════════════════════════════════════ //
// PERFORMANCE OPTIMIZATIONS
// ════════════════════════════════════════ //

// Lazy load animations on intersection
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});