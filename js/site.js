(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealItems = document.querySelectorAll('section, .project-card, .research-card, .cv-section');
  if ('IntersectionObserver' in window) {
    revealItems.forEach((item) => item.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  if (reduceMotion) return;

  const canvas = document.getElementById('cosmosCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let stars = [];
  let dust = [];
  let raf = 0;

  function seeded(i, salt) {
    const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const starCount = Math.min(180, Math.floor((width * height) / 9000));
    stars = Array.from({ length: starCount }, (_, i) => ({
      x: seeded(i, 1) * width,
      y: seeded(i, 2) * height,
      r: 0.45 + seeded(i, 3) * 1.3,
      pulse: seeded(i, 4) * Math.PI * 2,
      hue: seeded(i, 5) > 0.72 ? '110, 231, 240' : '238, 244, 242'
    }));

    dust = Array.from({ length: 28 }, (_, i) => ({
      x: seeded(i, 6) * width,
      y: seeded(i, 7) * height,
      vx: -0.08 - seeded(i, 8) * 0.08,
      vy: 0.02 + seeded(i, 9) * 0.04,
      r: 1.2 + seeded(i, 10) * 2.8,
      a: 0.05 + seeded(i, 11) * 0.08
    }));
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    stars.forEach((star) => {
      const alpha = 0.18 + Math.sin(time * 0.0012 + star.pulse) * 0.08;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.hue}, ${alpha})`;
      ctx.fill();
    });

    dust.forEach((grain) => {
      grain.x += grain.vx;
      grain.y += grain.vy;
      if (grain.x < -10) grain.x = width + 10;
      if (grain.y > height + 10) grain.y = -10;
      ctx.beginPath();
      ctx.arc(grain.x, grain.y, grain.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 189, 100, ${grain.a})`;
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  raf = requestAnimationFrame(draw);

  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
})();
