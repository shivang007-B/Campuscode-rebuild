// CampusCode Auth Handler (Login & Register)

function generateCaptchaText() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function initCaptcha() {
  const captchaLetters = document.getElementById('captcha-letters');
  const reloadBtn = document.getElementById('reload-captcha');
  const captchaInput = document.getElementById('captcha-input');
  
  if (!captchaLetters) return;

  function refresh() {
    const code = generateCaptchaText();
    captchaLetters.textContent = code.split('').join(' ');
    captchaLetters.dataset.code = code;
    if (captchaInput) captchaInput.value = '';
  }

  refresh();
  if (reloadBtn) {
    reloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      refresh();
    });
  }
}

function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.toggle-pwd-btn');
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = 'HIDE';
        } else {
          input.type = 'password';
          btn.textContent = 'SHOW';
        }
      }
    });
  });
}

function initAuthForm() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-input');
      const submitBtn = loginForm.querySelector('button[type="submit"]');

      const email = emailInput ? emailInput.value.trim() : '';
      const name = email ? email.split('@')[0].toUpperCase() : 'SHIVANG';

      // Store in session for dashboard personalized greeting
      sessionStorage.setItem('cc_user_name', name);
      sessionStorage.setItem('cc_user_email', email || 'shivang@campuscode.in');

      // Button loading effect
      submitBtn.disabled = true;
      submitBtn.innerHTML = `AUTHENTICATING... <span class="arrow">⏳</span>`;

      setTimeout(() => {
        submitBtn.innerHTML = `SUCCESS <span class="arrow">✓</span>`;
        submitBtn.style.backgroundColor = '#82b91a';
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 400);
      }, 700);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name-input');
      const emailInput = document.getElementById('email-input');
      const submitBtn = registerForm.querySelector('button[type="submit"]');

      const fullName = nameInput ? nameInput.value.trim() : 'Shivang';
      const firstName = fullName.split(' ')[0].toUpperCase();
      const email = emailInput ? emailInput.value.trim() : 'shivang@campuscode.in';

      sessionStorage.setItem('cc_user_name', firstName);
      sessionStorage.setItem('cc_user_fullname', fullName);
      sessionStorage.setItem('cc_user_email', email);

      submitBtn.disabled = true;
      submitBtn.innerHTML = `CREATING ACCOUNT... <span class="arrow">⏳</span>`;

      setTimeout(() => {
        submitBtn.innerHTML = `ACCOUNT READY <span class="arrow">✓</span>`;
        submitBtn.style.backgroundColor = '#82b91a';
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 400);
      }, 700);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCaptcha();
  initPasswordToggles();
  initAuthForm();
});

