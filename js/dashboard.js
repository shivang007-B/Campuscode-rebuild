// CampusCode Dashboard Controller

function initUserGreeting() {
  const storedName = sessionStorage.getItem('cc_user_name');
  const greetingEl = document.getElementById('user-greeting-name');
  const topbarUserEl = document.getElementById('topbar-user-name');
  const sidebarUserEl = document.getElementById('sidebar-user-name');

  const name = storedName ? storedName.toUpperCase() : 'SHIVANG';
  const fullName = sessionStorage.getItem('cc_user_fullname') || 'SHIVANG SINGHAL';

  if (greetingEl) greetingEl.textContent = `${name}.`;
  if (topbarUserEl) topbarUserEl.textContent = fullName;
  if (sidebarUserEl) sidebarUserEl.textContent = fullName;
}

function initNavigationTabs() {
  const navLinks = document.querySelectorAll('.sidebar-link[data-tab]');
  const views = document.querySelectorAll('.tab-view');
  const breadcrumbSection = document.getElementById('breadcrumb-current-tab');

  function switchTab(tabId) {
    navLinks.forEach(link => {
      const isTarget = link.dataset.tab === tabId || (tabId === 'eventhub' && link.dataset.tab === 'my-events');
      if (isTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    views.forEach(view => {
      if (view.id === `view-${tabId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    if (breadcrumbSection) {
      if (tabId === 'eventhub') {
        breadcrumbSection.textContent = 'EVENTHUB';
      } else {
        breadcrumbSection.textContent = tabId.replace('-', ' ').toUpperCase();
      }
    }

    // Scroll to top of dashboard content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      window.location.hash = tabId;
      switchTab(tabId);
    });
  });

  // Handle external hash e.g. #my-events or #events or #overview
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(`view-${currentHash}`)) {
    switchTab(currentHash);
  } else {
    // Check query param e.g. ?tab=my-events
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && document.getElementById(`view-${tabParam}`)) {
      switchTab(tabParam);
    }
  }

  // Also bind in-page jump buttons like "VIEW ALL ↗"
  document.querySelectorAll('[data-goto-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.gotoTab;
      window.location.hash = target;
      switchTab(target);
    });
  });
}

function initEventsFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const eventCards = document.querySelectorAll('.portal-event-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      eventCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initCountdownTimer() {
  const timerBadge = document.getElementById('featured-countdown');
  if (!timerBadge) return;

  let totalSeconds = 4 * 3600 + 12 * 60 + 11; // 04:12:11

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      timerBadge.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }, 1000);
}

function initJourneyModal() {
  const modal = document.getElementById('journey-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-event-title');
  const modalRound = document.getElementById('modal-event-round');

  if (!modal) return;

  document.querySelectorAll('.open-journey-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.dataset.eventTitle || "ReBuild '26";
      const round = btn.dataset.eventRound || "ROUND 1: LIVE (CLOSING IN 04:12:11)";

      if (modalTitle) modalTitle.textContent = title;
      if (modalRound) modalRound.textContent = round;

      modal.classList.add('open');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

function initEventHubSubtabs() {
  const tabs = document.querySelectorAll('.eventhub-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

function initDashboard() {
  initUserGreeting();
  initNavigationTabs();
  initEventsFilter();
  initCountdownTimer();
  initJourneyModal();
  initEventHubSubtabs();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

