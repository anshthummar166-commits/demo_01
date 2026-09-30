/* ==========================================================================
   HERO-HOVER.JS - CINEMATIC INTERACTIVE WORD-HOVER CODEX
   - Full-bleed ambient atmosphere transitions
   - 3D Gyro Parallax Viewfinder Art Portal
   - Tuned Web Audio harmonic sine chimes (STOP: G3, THE: C4, SCROLL: G4)
   - Zero-conflict scroll auto-dismiss
   ========================================================================== */

import { soundscape } from './audio-ambient.js';
import stopImg from '../assets/images/hover-stop.jpg';
import theImg from '../assets/images/hover-the.jpg';
import scrollImg from '../assets/images/hover-scroll.jpg';

const wordConfig = {
  stop: {
    freq: 196.00, // G3 warm analog chord
    tag: '01 // TEXTURE SYNTAX',
    title: 'ORGANIC BRAND TEXTURE',
    metric: '99.4% RETENTION'
  },
  the: {
    freq: 261.63, // C4 middle harmonic fifth
    tag: '02 // BRAND SPOTLIGHT',
    title: 'SHINE ON YOUR BRAND',
    metric: '3.8X CTR DISCOVERY'
  },
  scroll: {
    freq: 392.00, // G4 bright octave chime
    tag: '03 // VISUAL DISRUPTION',
    title: 'BREAK THROUGH THE CLUTTER',
    metric: '+420% RECALL VELOCITY'
  }
};

// Pre-cache hover assets into browser memory for instant liquid transitions
if (typeof window !== 'undefined') {
  [stopImg, theImg, scrollImg].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export function initHeroHover() {
  const headline = document.querySelector('.capture-headline');
  const hoverWords = document.querySelectorAll('.hover-word');
  const portal = document.querySelector('.hero-viewfinder-portal');
  const frame = document.querySelector('.viewfinder-frame');
  const backdropSlides = document.querySelectorAll('.backdrop-slide');
  const vfAssets = document.querySelectorAll('.vf-asset');
  const vfTag = document.querySelector('.vf-tag');
  const vfTitle = document.querySelector('.vf-title');
  const vfMetric = document.querySelector('.vf-metric-badge');

  if (!headline || !portal || !hoverWords.length) return;

  // Bind bundled assets directly for seamless production bundling
  const backdropStop = document.querySelector('.backdrop-stop');
  const backdropThe = document.querySelector('.backdrop-the');
  const backdropScroll = document.querySelector('.backdrop-scroll');
  if (backdropStop) backdropStop.style.backgroundImage = `url(${stopImg})`;
  if (backdropThe) backdropThe.style.backgroundImage = `url(${theImg})`;
  if (backdropScroll) backdropScroll.style.backgroundImage = `url(${scrollImg})`;

  const vfAssetStop = document.querySelector('.vf-asset-stop');
  const vfAssetThe = document.querySelector('.vf-asset-the');
  const vfAssetScroll = document.querySelector('.vf-asset-scroll');
  if (vfAssetStop) vfAssetStop.src = stopImg;
  if (vfAssetThe) vfAssetThe.src = theImg;
  if (vfAssetScroll) vfAssetScroll.src = scrollImg;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isHovered = false;
  let currentWord = null;

  // Track cursor position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth liquid 3D spring interpolation loop
  function animateViewfinder() {
    if (isHovered) {
      // Artful spatial offset: floats smoothly beside the focal area without blocking words
      const isRightSide = mouseX > window.innerWidth * 0.52;
      const targetX = isRightSide ? mouseX - 240 : mouseX + 240;
      const targetY = mouseY - 20;

      currentX += (targetX - currentX) * 0.10;
      currentY += (targetY - currentY) * 0.10;

      // Safe viewport boundary clamping
      const portalW = portal.offsetWidth || 340;
      const portalH = portal.offsetHeight || 440;
      const clampedX = Math.max(portalW * 0.55, Math.min(window.innerWidth - portalW * 0.55, currentX));
      const clampedY = Math.max(portalH * 0.55 + 60, Math.min(window.innerHeight - portalH * 0.55, currentY));

      portal.style.left = `${clampedX}px`;
      portal.style.top = `${clampedY}px`;

      // 3D Gyroscopic Parallax Tilt
      if (frame) {
        const normX = (mouseX / window.innerWidth) - 0.5;
        const normY = (mouseY / window.innerHeight) - 0.5;
        const rotateY = normX * 18;
        const rotateX = -normY * 18;
        frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
      }
    }
    requestAnimationFrame(animateViewfinder);
  }
  requestAnimationFrame(animateViewfinder);

  // Activate a word's cinematic state
  function activateWord(wordKey) {
    if (!wordConfig[wordKey]) return;
    const cfg = wordConfig[wordKey];
    currentWord = wordKey;
    isHovered = true;

    // 1. Play Tuned Harmonic Audio Chime
    if (soundscape && typeof soundscape.playHarmonicChime === 'function') {
      soundscape.playHarmonicChime(cfg.freq);
    }

    // 2. Headline visual focus (dim other words, highlight active)
    headline.classList.add('has-hover');
    hoverWords.forEach((w) => {
      if (w.dataset.word === wordKey) {
        w.classList.add('active');
      } else {
        w.classList.remove('active');
      }
    });

    // 3. Full-bleed atmospheric background transition
    backdropSlides.forEach((slide) => {
      if (slide.classList.contains(`backdrop-${wordKey}`)) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // 4. Viewfinder artwork slide transition (instant liquid crossfade)
    vfAssets.forEach((asset) => {
      if (asset.classList.contains(`vf-asset-${wordKey}`)) {
        asset.classList.add('active');
      } else {
        asset.classList.remove('active');
      }
    });

    // 5. Update viewfinder strategy drawer copy
    if (vfTag) vfTag.textContent = cfg.tag;
    if (vfTitle) vfTitle.textContent = cfg.title;
    if (vfMetric) vfMetric.textContent = cfg.metric;

    // 6. Reveal 3D portal
    portal.classList.add('active');
  }

  // Deactivate hover state
  function deactivateHover() {
    isHovered = false;
    currentWord = null;

    headline.classList.remove('has-hover');
    hoverWords.forEach((w) => w.classList.remove('active'));
    backdropSlides.forEach((slide) => slide.classList.remove('active'));
    vfAssets.forEach((asset) => asset.classList.remove('active'));
    portal.classList.remove('active');

    if (frame) {
      frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
  }

  // Bind hover listeners to each word
  hoverWords.forEach((word) => {
    const key = word.dataset.word;

    word.addEventListener('mouseenter', () => {
      activateWord(key);
    });

    // Touch device support (tap to inspect, auto-dismiss after 3s)
    word.addEventListener('click', (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        e.preventDefault();
        activateWord(key);
        setTimeout(deactivateHover, 3200);
      }
    });
  });

  // Mouse leaves headline area
  headline.addEventListener('mouseleave', () => {
    deactivateHover();
  });

  // Auto-dismiss on scroll so it never fights GSAP scroll transitions
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40 && isHovered) {
      deactivateHover();
    }
  }, { passive: true });
}
