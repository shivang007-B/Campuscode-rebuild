// Entry Splash Animation Controller

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('entry-splash');
  if (!splash) return;

  const bar = document.getElementById('splash-progress-bar');
  const statusEl = document.getElementById('splash-status-text');
  const skipBtn = document.getElementById('splash-skip-btn');

  let progress = 0;
  const duration = 1200; // 1.2 seconds total
  const intervalTime = 20;
  const increment = 100 / (duration / intervalTime);

  function finishSplash() {
    if (splash.classList.contains('hide')) return;
    splash.classList.add('hide');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 600);
  }

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      if (bar) bar.style.width = '100%';
      if (statusEl) statusEl.textContent = 'SYSTEM READY // ARENA ONLINE';
      setTimeout(finishSplash, 300);
    } else {
      if (bar) bar.style.width = `${progress}%`;
      if (statusEl) statusEl.textContent = `INITIALIZING ARENA... ${Math.floor(progress)}%`;
    }
  }, intervalTime);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearInterval(timer);
      finishSplash();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearInterval(timer);
      finishSplash();
    }
  });
});

