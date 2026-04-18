// ============================================================
// BLACK FORGE SYSTEMS — shared nav/scroll behavior
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('nav') || document.querySelector('.nav');

  // scrolled nav shadow
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // smooth anchor scroll with nav+strip offset
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 112;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // contact form demo submit
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"], .btn');
      if (!btn) return;
      const label = btn.querySelector('.label') || btn;
      const original = label.textContent;
      label.textContent = 'Message Sent';
      btn.style.background = 'var(--status-live)';
      setTimeout(() => {
        label.textContent = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
});
