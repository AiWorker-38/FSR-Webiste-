// Burger menu toggle
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// Anmeldung form submission (Web3Forms)
const anmeldungForm = document.getElementById('anmeldung-form');
const formStatus = document.getElementById('form-status');

if (anmeldungForm && formStatus) {
  anmeldungForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = anmeldungForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = 'Wird gesendet …';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(anmeldungForm),
      });
      const result = await response.json();

      if (result.success) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Vielen Dank! Deine Anmeldung ist eingegangen – wir melden uns schnellstmöglich.';
        anmeldungForm.reset();
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }
    } catch (err) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder ruf uns direkt an: 0170-4707757.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
