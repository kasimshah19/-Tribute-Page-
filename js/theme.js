/**
 * WebDev-L2-TributePage — Theme System
 * Dark/light mode with localStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kalam-theme';
  const root = document.documentElement;
  const toggles = document.querySelectorAll('[data-theme-toggle]');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    document.body.classList.toggle('light-mode', !isDark);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll('[data-theme-icon]').forEach((el) => {
      el.textContent = isDark ? '☀️' : '🌙';
    });
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  toggles.forEach((btn) => btn.addEventListener('click', toggleTheme));

  applyTheme(localStorage.getItem(STORAGE_KEY) || 'dark');
})();
