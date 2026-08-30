/**
 * WebDev-L2-TributePage — Animation Engine
 */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration, 10) || 2200;
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initReveal() {
    if (reduced) {
      document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay, 10) || 0;
        setTimeout(() => {
          el.classList.add('is-visible');
          if (el.dataset.count !== undefined) animateCounter(el);
        }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
  }

  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      group.querySelectorAll('[data-stagger-item]').forEach((child, i) => {
        child.dataset.delay = String(i * (parseInt(group.dataset.stagger, 10) || 100));
        child.setAttribute('data-animate', group.dataset.animateType || 'fade-up');
      });
    });
  }

  function initParallax() {
    if (reduced || window.innerWidth < 768) return;
    const layers = document.querySelectorAll('[data-parallax]');
    let raf = null;
    let mx = 0, my = 0;

    document.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          layers.forEach((l) => {
            const d = parseFloat(l.dataset.parallax) || 10;
            l.style.transform = `translate(${mx * d}px, ${my * d}px)`;
          });
          raf = null;
        });
      }
    });
  }

  function initLoader() {
    const loader = document.getElementById('page-loader');
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader?.classList.add('is-hidden');
        document.body.classList.add('is-loaded');
      }, 500);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      btn?.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initCardGlow() {
    document.querySelectorAll('.premium-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  function initTimeline() {
    document.querySelectorAll('.timeline-item').forEach((item) => {
      item.addEventListener('mouseenter', () => item.classList.add('is-hovered'));
      item.addEventListener('mouseleave', () => item.classList.remove('is-hovered'));
    });
  }

  function init() {
    initStagger();
    initReveal();
    initParallax();
    initLoader();
    initSmoothScroll();
    initBackToTop();
    initCardGlow();
    initTimeline();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
