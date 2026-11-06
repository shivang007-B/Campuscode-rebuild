document.querySelectorAll('.bubble').forEach((bubble) => {
  const letter = bubble.textContent.trim();
  bubble.addEventListener('click', () => {
    const popped = bubble.classList.toggle('popped');
    bubble.textContent = popped ? '✦' : letter;
  });
});

// Video Controller: Autoplay Muted + Hover to Unmute / Click to Toggle
const video = document.getElementById('campuscode-video');
const videoFrame = document.getElementById('video-frame-container') || document.querySelector('.video-frame');
const hoverStatus = document.getElementById('video-hover-status');

if (video) {
  video.muted = true;
  video.volume = 1.0;

  // Autoplay initially in muted mode (browser standard)
  const startPlayback = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback on first gesture
        const onFirstInteract = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', onFirstInteract);
          window.removeEventListener('scroll', onFirstInteract);
          window.removeEventListener('touchstart', onFirstInteract);
        };
        window.addEventListener('click', onFirstInteract, { once: true });
        window.addEventListener('scroll', onFirstInteract, { once: true });
        window.addEventListener('touchstart', onFirstInteract, { once: true });
      });
    }
  };

  startPlayback();

  // Keep playing whenever in view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && video.paused) {
          video.play().catch(() => {});
        }
      });
    }, { threshold: 0.15 });
    observer.observe(video);
  }

  const setAudioActive = (active) => {
    if (!hoverStatus) return;
    const label = document.getElementById('audio-status-label');
    const icon = hoverStatus.querySelector('.audio-status-icon');
    if (active) {
      hoverStatus.classList.add('active');
      if (label) label.textContent = 'AUDIO PLAYING';
      if (icon) {
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      }
    } else {
      hoverStatus.classList.remove('active');
      if (label) label.textContent = 'HOVER FOR SOUND';
      if (icon) {
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      }
    }
  };

  // Hover to Unmute: Voice ON when cursor enters, muted when cursor leaves
  if (videoFrame) {
    videoFrame.addEventListener('mouseenter', () => {
      video.muted = false;
      if (video.paused) {
        video.play().catch(() => {});
      }
      setAudioActive(true);
    });

    videoFrame.addEventListener('mouseleave', () => {
      video.muted = true;
      setAudioActive(false);
    });

    // Tap/Click to toggle sound (for touch devices & click interaction)
    videoFrame.addEventListener('click', () => {
      video.muted = !video.muted;
      if (!video.muted) {
        if (video.paused) video.play().catch(() => {});
        setAudioActive(true);
      } else {
        setAudioActive(false);
      }
    });
  }
}
