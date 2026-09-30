/* ==========================================================================
   MAIN.JS - APPLICATION ORCHESTRATOR
   Coordinates smooth scroll, GSAP storytelling, custom cursor, modals & audio
   ========================================================================== */

import { initSmoothScroll } from './smooth-scroll.js';
import { initScrollStory } from './scroll-story.js';
import { DistributionNetwork } from './distribution-canvas.js';
import { soundscape } from './audio-ambient.js';
import { initModals } from './modal.js';
import { initFrameHoverAnimations } from './frame-hover-animation.js';
import { initHeroHover } from './hero-hover.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 2. Initialize Soundscape & Audio Toggle
  soundscape.init();

  // 3. Initialize Modals & Strategy Drawer
  initModals();

  // 4. Initialize Distribution Particle Canvas
  const distCanvas = new DistributionNetwork('dist-canvas');
  distCanvas.init();

  // 5. Initialize Frame Hover Animation Engine (Aesthetic Meal Prep 95-Frame Sequence)
  initFrameHoverAnimations();

  // 6. Initialize Hero Kinetic Word-Hover Interactive Preview
  initHeroHover();

  // 7. Initialize GSAP Scroll Storytelling Timelines
  initScrollStory();

  // 6. Custom Inertial Magnetic Cursor (Desktop)
  initCustomCursor();

  // 7. Mobile Navigation Toggle
  initMobileNav();

  // 8. Smart Video Viewport Observer (pause when offscreen to preserve 60/120fps)
  initVideoControllers();
});

// Smart Video Viewport Controller
function initVideoControllers() {
  const videos = document.querySelectorAll('video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const vid = entry.target;
      if (entry.isIntersecting) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, { threshold: 0.15 });

  videos.forEach((vid) => {
    observer.observe(vid);
    vid.style.cursor = 'pointer';
    vid.title = 'Click to toggle sound';
    vid.addEventListener('click', () => {
      vid.muted = !vid.muted;
    });
  });
}

// Custom Cursor Implementation
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.cursor-dot');
  if (!cursor || !dot) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Inertial smooth interpolation loop
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .budget-pill, .service-menu-item, .tracker-item, .hover-word');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });

  // View image cursor mode
  const zoomTargets = document.querySelectorAll('[data-zoomable]');
  zoomTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('view-cursor');
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('view-cursor');
    });
  });
}

// Mobile Menu Handler
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const links = document.querySelectorAll('.mobile-link, .mobile-talk-btn');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
