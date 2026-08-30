/**
 * WebDev-L2-TributePage — Navbar & Mobile Menu
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const mainContent = document.querySelector('main');
  const desktopNav = document.querySelector('.navbar__nav');

  function setMenuA11y(isOpen) {
    mobileMenu?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    mobileOverlay?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      mobileMenu?.removeAttribute('inert');
      mainContent?.setAttribute('inert', '');
      desktopNav?.setAttribute('inert', '');
    } else {
      mobileMenu?.setAttribute('inert', '');
      mainContent?.removeAttribute('inert');
      desktopNav?.removeAttribute('inert');
    }
  }

  function openMenu() {
    mobileMenu?.classList.add('is-open');
    mobileOverlay?.classList.add('is-visible');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
    setMenuA11y(true);
    requestAnimationFrame(() => mobileMenu?.querySelector('.mobile-nav__link')?.focus());
  }

  function closeMenu() {
    menuToggle?.focus();
    mobileMenu?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-visible');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
    setMenuA11y(false);
  }

  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  mobileOverlay?.addEventListener('click', closeMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) closeMenu();
  });

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  setMenuA11y(false);
})();
