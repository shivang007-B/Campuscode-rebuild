// CampusCode Hero Interactive Engine (Mouse Parallax, Spotlight, Magnetic Button, Custom Cursor)

class HeroInteractiveEngine {
  constructor() {
    this.initHeroSpotlight();
    this.initPlanetParallax();
    this.initMagneticButton();
    this.initCustomCursor();
    this.initBubblePopParticles();
  }

  // 1. Dynamic Cursor Spotlight across Hero Section
  initHeroSpotlight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      hero.style.setProperty('--hero-mouse-x', `${x}px`);
      hero.style.setProperty('--hero-mouse-y', `${y}px`);
    });
  }

  // 2. Physics Mouse Parallax on Floating Planets
  initPlanetParallax() {
    const hero = document.querySelector('.hero');
    const planetOne = document.querySelector('.planet-one');
    const planetTwo = document.querySelector('.planet-two');

    if (!hero || !planetOne) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function loop() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Planet One (drifts opposite, slightly higher factor)
      const p1X = currentX * -28;
      const p1Y = currentY * -24;
      planetOne.style.transform = `translate(${p1X.toFixed(2)}px, ${p1Y.toFixed(2)}px)`;

      // Planet Two (if present)
      if (planetTwo) {
        const p2X = currentX * 36;
        const p2Y = currentY * 30;
        planetTwo.style.transform = `translate(${p2X.toFixed(2)}px, ${p2Y.toFixed(2)}px)`;
      }

      requestAnimationFrame(loop);
    }

    loop();
  }

  // 3. Magnetic Attraction on "EXPLORE HACKATHONS" Button
  initMagneticButton() {
    const btn = document.querySelector('.hero-actions .pill');
    if (!btn) return;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease-out';
    });
  }

  // 4. Smooth Non-Intrusive Custom Cursor Dot & Trailing Aura
  initCustomCursor() {
    // Only enable on desktop with mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'arena-cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'arena-cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover scale effects on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .bubble, .planet, .project, .how-card, .hero-line');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        cursorRing.classList.add('expand');
      });
      target.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('expand');
      });
    });
  }

  // 5. Pop Bubbles Micro Particle Spark Burst
  initBubblePopParticles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble) => {
      bubble.addEventListener('click', (e) => {
        const rect = bubble.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        const colors = ['#7665ff', '#a8e62e', '#111111'];
        for (let i = 0; i < 8; i++) {
          const spark = document.createElement('div');
          spark.className = 'bubble-spark';
          const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.2;
          const distance = 35 + Math.random() * 30;
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;

          spark.style.setProperty('--dx', `${dx}px`);
          spark.style.setProperty('--dy', `${dy}px`);
          spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          spark.style.left = `${originX}px`;
          spark.style.top = `${originY}px`;

          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 600);
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroInteractiveEngine();
});

