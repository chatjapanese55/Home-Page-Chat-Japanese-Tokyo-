/* =============================================
   ChatJapanese – Interactive JavaScript
   ============================================= */

'use strict';

/* ---- GitHub Pages Path Auto-Correction ---- */
(function () {
  const pathname = window.location.pathname;
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    const parts = pathname.split('/').filter(p => p.length > 0);
    if (parts.length > 1) {
      const repoName = parts[0];
      const basePath = '/' + repoName;
      
      document.querySelectorAll('img[src]').forEach(img => {
        let src = img.getAttribute('src');
        if (src.startsWith('./img/') && !src.startsWith(basePath)) {
          img.setAttribute('src', basePath + src.substring(1));
        }
      });
    }
  }
})();

/* ---- Navbar Scroll Effect ---- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Active Nav Link on Scroll ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ---- Mobile Menu Toggle ---- */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ---- Scroll Animations (IntersectionObserver) ---- */
(function () {
  const elements = document.querySelectorAll(
    '.why-card, .course-card, .step-card, .faq-item, .activity-card, .promo-inner > *, .hero-content, .hero-image-wrap'
  );

  if (!elements.length) return;

  elements.forEach((el, i) => {
    el.setAttribute('data-animate', '');
    // Stagger delay for grid items
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.hasAttribute('data-animate'));
      const idx = siblings.indexOf(el);
      if (idx > 0 && idx <= 3) {
        el.setAttribute('data-animate-delay', String(idx));
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ---- Smooth Scroll for Anchor Links ---- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---- FAQ Accordion (close others on open) ---- */
(function () {
  const details = document.querySelectorAll('.faq-item');
  details.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        details.forEach((other) => {
          if (other !== detail && other.open) other.removeAttribute('open');
        });
      }
    });
  });
})();

/* ---- Lazy-load images with fade-in ---- */
(function () {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
})();
