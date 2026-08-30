/**
 * WebDev-L2-TributePage — Main Application
 * FAQ accordion, testimonials slider, ripple, active nav, newsletter
 */

(function () {
  'use strict';

  /* ===================== FAQ ACCORDION ===================== */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    const panel = item.querySelector('.faq-item__panel');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach((open) => {
        if (open !== item) {
          open.classList.remove('is-open');
          open.querySelector('.faq-item__trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));

      if (!isOpen && panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else if (panel) {
        panel.style.maxHeight = '0';
      }
    });
  });

  /* ===================== TESTIMONIALS SLIDER ===================== */
  const track = document.getElementById('testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoplayId = null;

  function goToSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== currentSlide ? 'true' : 'false'));
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); }));

  track?.addEventListener('mouseenter', stopAutoplay);
  track?.addEventListener('mouseleave', startAutoplay);

  if (slides.length) {
    goToSlide(0);
    startAutoplay();
  }

  /* ===================== BUTTON RIPPLE ===================== */
  document.querySelectorAll('[data-ripple]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ===================== VIDEO MODAL ===================== */
  const videoBtn = document.getElementById('watch-video');
  const videoModal = document.getElementById('video-modal');
  const videoClose = document.getElementById('video-close');
  const videoFrame = document.getElementById('video-frame');

  videoBtn?.addEventListener('click', () => {
    videoModal?.classList.add('is-open');
    videoModal?.setAttribute('aria-hidden', 'false');
    if (videoFrame) videoFrame.src = 'https://www.youtube.com/embed/2MKO3Tq1OsQ?autoplay=1';
    document.body.classList.add('modal-open');
  });

  function closeVideoModal() {
    videoModal?.classList.remove('is-open');
    videoModal?.setAttribute('aria-hidden', 'true');
    if (videoFrame) videoFrame.src = '';
    document.body.classList.remove('modal-open');
  }

  videoClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('is-open')) closeVideoModal();
  });

  /* ===================== ACTIVE NAV ===================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });

  /* ===================== NEWSLETTER ===================== */
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const input = e.target.querySelector('input');
    btn.textContent = 'Subscribed!';
    btn.disabled = true;
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; }, 3000);
  });

  /* ===================== LAZY LOADING FALLBACK ===================== */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          lazyObs.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach((img) => lazyObs.observe(img));
  }

  /* ===================== CURRENT YEAR ===================== */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
