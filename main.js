/* ─── THEME TOGGLE ──────────────────────────────────── */

const THEME_KEY = 'portfolio-theme';
const root      = document.documentElement;
const themeBtn  = document.getElementById('theme-toggle');

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  themeBtn.innerHTML = theme === 'dark' ? iconMoon() : iconSun();
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function iconSun() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2"  x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2"  y1="12" x2="4"  y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;
}

function iconMoon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;
}

// Inicializar tema al cargar
const savedTheme = localStorage.getItem(THEME_KEY) || getSystemTheme();
applyTheme(savedTheme);

themeBtn.addEventListener('click', toggleTheme);

// Sincronizar si el sistema cambia de tema
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});


/* ─── MENÚ HAMBURGER (MÓVIL) ────────────────────────── */

const hamburgerBtn = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileLinks  = mobileMenu.querySelectorAll('a');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburgerBtn.classList.add('active');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  hamburgerBtn.setAttribute('aria-label', 'Cerrar menú');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.contains('active') ? closeMenu() : openMenu();
});

// Cerrar al hacer clic en un enlace
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Cerrar al hacer clic fuera del drawer
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
