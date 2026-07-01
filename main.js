const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 400; // Increase for more "atoms"

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        // Create scattered ring coordinates
        const angle = Math.random() * Math.PI * 2;
        const radius = 220 + Math.random() * 100; // The width of the ring
        this.x = canvas.width / 2 + Math.cos(angle) * radius;
        this.y = canvas.height / 2 + Math.sin(angle) * radius;
        this.size = Math.random() * 2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.velocity = Math.random() * 0.2 + 0.05;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 192, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        // Subtle drift movement
        this.y -= this.velocity;
        this.opacity -= 0.002;
        if (this.opacity <= 0) this.reset();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();