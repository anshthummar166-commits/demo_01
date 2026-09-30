/* ==========================================================================
   SMOOTH-SCROLL.JS - LENIS ULTRA-FLUID SMOOTH SCROLL
   Calibrated 60/120fps physics-based momentum scrolling synced with GSAP
   ========================================================================== */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ensure window globals for compatibility
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

export let lenis = null;

export function initSmoothScroll() {
  // If reduced motion is requested by user, bypass smooth scroll
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // Initialize Lenis with liquid inertia interpolation
  lenis = new Lenis({
    lerp: 0.075,            // Silky liquid inertia (0.07-0.08 is the Awwwards sweet spot)
    wheelMultiplier: 0.85,  // Prevents abrupt jarring jumps on aggressive mousewheels
    touchMultiplier: 1.2,   // Responsive touch navigation
    smoothWheel: true,      // Smooth mousewheel
    smoothTouch: false,     // Native momentum on mobile touchscreens for natural feel
    infinite: false,
    autoResize: true,
  });

  window.lenis = lenis;

  // Synchronize Lenis scroll events with GSAP ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Connect Lenis animation frame directly to GSAP's high-precision ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Turn off GSAP lagSmoothing so animations don't hitch during rapid scrolls
  gsap.ticker.lagSmoothing(0);

  // Refresh ScrollTrigger when Lenis finishes computing dimensions
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  // Smooth anchor scrolling handler
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  return lenis;
}
