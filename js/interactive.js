// CampusCode Interactive Arena Engine (Constellation Network, 3D Tilt, Live Arena Pulse, Security Scanner)

class ArenaInteractiveEngine {
  constructor() {
    this.initNetworkCanvas();
    this.init3DCardParallax();
    this.initSecurityShieldScanner();
  }

  // 1. Interactive Constellation Network Canvas Background
  initNetworkCanvas() {
    let canvas = document.getElementById('arena-network-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'arena-network-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 42;
    const maxDistance = 140;

    let mouse = { x: -1000, y: -1000 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Particle colors matching theme
    const colors = ['#7665ff', '#a8e62e', '#111111', '#9e7bff'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles to mouse
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#111111';
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.1;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect with cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#7665ff';
          ctx.globalAlpha = (1 - mDist / 160) * 0.25;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();
  }

  // 2. 3D Perspective Card Tilt on Mouse Move
  init3DCardParallax() {
    const card = document.querySelector('.auth-card');
    if (!card) return;

    const container = document.querySelector('.auth-container') || document.body;

    container.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const rotateY = deltaX * 5; // max 5 deg tilt
      const rotateX = -deltaY * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    container.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s ease-out';
    });

    container.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  }

  // 3. Interactive Security Shield Verification
  initSecurityShieldScanner() {
    const shieldCard = document.querySelector('.security-status-card');
    if (!shieldCard) return;

    shieldCard.style.cursor = 'pointer';
    shieldCard.title = 'Click to run CampusCode Security Diagnostic';

    shieldCard.addEventListener('click', () => {
      const statusText = shieldCard.querySelector('.security-status-text');
      const badge = shieldCard.querySelector('.security-badge');
      const indicator = shieldCard.querySelector('.security-indicator');

      if (!statusText || !badge) return;

      statusText.textContent = 'SCANNING ARENA PROTOCOLS...';
      badge.innerHTML = `<span class="security-indicator" style="background:#7665ff; animation: pulseGlow 0.5s infinite;"></span> SCANNING`;

      setTimeout(() => {
        statusText.textContent = 'CAMPUSCODE ENCRYPTION SECURE';
        badge.innerHTML = `<span class="security-indicator" style="background:#a8e62e;"></span> 100% READY`;
        badge.style.color = '#4b6e06';
      }, 700);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArenaInteractiveEngine();
});

