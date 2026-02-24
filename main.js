const typingSpeed = 100; 
const typingElement = document.getElementById("typing-effect");

function typeWriter(text, element, speed) {
    let i = 0;
    element.textContent = ""; 
    element.style.whiteSpace = "pre-line";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Particle System
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 70; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

window.addEventListener("DOMContentLoaded", () => {
    initParticles();
    animateParticles();
    
    // Safety check for zoom container if not in HTML
    if(!document.querySelector('.bg-zoom-container')){
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-zoom-container';
        document.body.prepend(bgContainer);
    }

    // ADDED: entry animation trigger for the title + quote
    const hero = document.querySelector('.hero-container');
    if (hero) {
        // small delay so CSS animations always trigger smoothly
        setTimeout(() => hero.classList.add('enter'), 120);
    }

    /* ✅ ADDED: typing effect call (so the typing actually runs) */
    if (typingElement) {
        setTimeout(() => {
            typeWriter("LIMCOMA MULTI-PURPOSE COOPERATIVE", typingElement, typingSpeed);
        }, 550);
    }

    /* ✅ ADDED: reveal-on-scroll for second section */
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealItems.forEach(el => io.observe(el));
    } else {
        // fallback: just show
        revealItems.forEach(el => el.classList.add('in-view'));
    }
});