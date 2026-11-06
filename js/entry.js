// CampusCode Entry Splash Animation Controller

function initEntrySplash() {
  const splash = document.getElementById('entry-splash');
  if (!splash) return;

  // If already loaded in this session, hide immediately
  if (sessionStorage.getItem('cc_splash_shown')) {
    splash.style.display = 'none';
    splash.remove();
    return;
  }

  const bar = document.getElementById('splash-progress-bar');
  const statusEl = document.getElementById('splash-status-text');
  const skipBtn = document.getElementById('splash-skip-btn');

  let isDone = false;

  function finishSplash() {
    if (isDone) return;
    isDone = true;
    sessionStorage.setItem('cc_splash_shown', 'true');
    splash.classList.add('hide');
    setTimeout(() => {
      splash.style.display = 'none';
      if (splash.parentNode) splash.remove();
    }, 450);
  }

  // Snappy 650ms loading progress
  let progress = 0;
  const intervalTime = 16;
  const increment = 100 / (650 / intervalTime);

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      clearInterval(timer);
      if (bar) bar.style.width = '100%';
      if (statusEl) statusEl.textContent = 'SYSTEM READY // ARENA ONLINE';
      setTimeout(finishSplash, 180);
    } else {
      if (bar) bar.style.width = `${progress}%`;
      if (statusEl) statusEl.textContent = `INITIALIZING ARENA... ${Math.floor(progress)}%`;
    }
  }, intervalTime);

  // Click anywhere to immediately dismiss
  splash.addEventListener('click', () => {
    clearInterval(timer);
    finishSplash();
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(timer);
      finishSplash();
    });
  }

  // Any key to dismiss
  document.addEventListener('keydown', () => {
    clearInterval(timer);
    finishSplash();
  }, { once: true });

  // Absolute failsafe timeout (1.1s max)
  setTimeout(() => {
    clearInterval(timer);
    finishSplash();
  }, 1100);
}

// Immediate execution check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEntrySplash);
} else {
  initEntrySplash();
}
