/* ==========================================================================
   SCROLL-STORY.JS - GSAP SCROLLTRIGGER CHOREOGRAPHY
   Transforms the entire page into a continuous cinematic narrative arc:
   ATTENTION -> STRATEGY -> CREATIVE -> DISTRIBUTION -> PERFORMANCE -> GROWTH
   ========================================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollStory() {
  // Check if reduced motion is requested
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    return;
  }

  // Common scrub value synchronized with Lenis lerp
  const LIQUID_SCRUB = 0.8;

  // ==========================================================================
  // NAVIGATION & SCROLL TRACKER PROGRESS SYNC
  // ==========================================================================
  const nav = document.querySelector('.site-nav');
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: nav }
  });

  const chapters = [
    { id: '#scene-capture', index: 0 },
    { id: '#scene-strategy', index: 1 },
    { id: '#scene-creative', index: 2 },
    { id: '#scene-distribution', index: 3 },
    { id: '#scene-performance', index: 4 },
    { id: '#scene-results', index: 5 }
  ];

  const trackerItems = document.querySelectorAll('.tracker-item');

  chapters.forEach((chap) => {
    const el = document.querySelector(chap.id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveTracker(chap.index),
      onEnterBack: () => setActiveTracker(chap.index)
    });
  });

  function setActiveTracker(idx) {
    trackerItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Click on tracker items to smoothly jump
  trackerItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, { offset: 0, duration: 1.4 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==========================================================================
  // CHAPTER 01 — CAPTURE
  // "YOU HAVE 3 SECONDS." -> "STOP THE SCROLL." -> Violet Art Reveal -> Value Statement
  // ==========================================================================
  const captureSection = document.querySelector('#scene-capture');
  if (captureSection) {
    const headline = captureSection.querySelector('.capture-headline');
    const assetLayer = captureSection.querySelector('.capture-asset-layer');
    const assetImg = captureSection.querySelector('.capture-asset-img');
    const revealWrap = captureSection.querySelector('.capture-reveal-wrap');
    const timerBadge = captureSection.querySelector('.capture-timer-badge');
    const countdownEl = captureSection.querySelector('.timer-countdown');

    const captureTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-capture',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.capture-pin',
        scrub: LIQUID_SCRUB,
      }
    });

    // Phase 1: Micro countdown ticks, Typography scales smoothly with linear ease
    captureTl
      .to(countdownEl, {
        innerText: '01:00 SEC',
        duration: 0.15,
        snap: { innerText: 1 },
        ease: 'none'
      }, 0)
      .to(headline, {
        scale: 1.35,
        letterSpacing: '0.06em',
        x: -20,
        opacity: 0.9,
        duration: 0.35,
        ease: 'none'
      }, 0)
      .to(timerBadge, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'none'
      }, 0.1)

      // Phase 2: Asset emerges behind typography
      .to(assetLayer, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'none'
      }, 0.2)
      .to(assetImg, {
        scale: 1.06,
        duration: 0.5,
        ease: 'none'
      }, 0.25)

      // Phase 3: Headline splits / moves away, artwork becomes dominant
      .to(headline, {
        scale: 2.0,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.3,
        ease: 'none'
      }, 0.35)

      // Phase 4: Text reveal "GOOD. NOW LOOK. WE TURN ATTENTION INTO REVENUE."
      .to(assetLayer, {
        filter: 'brightness(0.35) contrast(1.1)',
        scale: 0.96,
        duration: 0.3,
        ease: 'none'
      }, 0.6)
      .to(revealWrap, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: 'none'
      }, 0.65);
  }

  // ==========================================================================
  // CHAPTER 02 — THE PROBLEM
  // "EVERY BRAND WANTS ATTENTION." -> "VERY FEW DESERVE IT."
  // Parallax Sneaker Poster Cut -> "IT'S RELEVANCE."
  // ==========================================================================
  const problemSection = document.querySelector('#scene-problem');
  if (problemSection) {
    const line1 = problemSection.querySelector('.line-1');
    const line2 = problemSection.querySelector('.line-2');
    const line3 = problemSection.querySelector('.line-3');
    const line4 = problemSection.querySelector('.line-4');
    const visual = problemSection.querySelector('.problem-visual-interruption');
    const triad = problemSection.querySelector('.problem-triad');

    const problemTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-problem',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.problem-pin',
        scrub: LIQUID_SCRUB
      }
    });

    problemTl
      // Line 1: EVERY BRAND WANTS ATTENTION
      .to(line1, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'none'
      }, 0.05)

      // Line 2: Strike through + VERY FEW DESERVE IT
      .to(line1, {
        opacity: 0.35,
        duration: 0.15,
        ease: 'none'
      }, 0.25)
      .to(line2, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'none'
      }, 0.25)

      // Visual interruption cuts in with 3D perspective rotation
      .to(visual, {
        opacity: 1,
        scale: 1,
        rotate: -2,
        duration: 0.3,
        ease: 'none'
      }, 0.35)

      // Shift focus to "THE PROBLEM ISN'T REACH. IT'S RELEVANCE."
      .to([line1, line2], {
        opacity: 0,
        y: -30,
        duration: 0.2,
        ease: 'none'
      }, 0.55)
      .to(line3, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'none'
      }, 0.6)
      .to(line4, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'none'
      }, 0.7)

      // Reveal Triad
      .to(triad, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'none'
      }, 0.8);
  }

  // ==========================================================================
  // CHAPTER 03 — STRATEGY
  // Chaotic scattered nodes physically pull into an ordered pipeline:
  // AUDIENCE -> MESSAGE -> CREATIVE -> DISTRIBUTION -> CONVERSION
  // ==========================================================================
  const strategySection = document.querySelector('#scene-strategy');
  if (strategySection) {
    const nodes = strategySection.querySelectorAll('.pipeline-node');
    const connector = strategySection.querySelector('.pipeline-connector-line');
    const signalStmt = strategySection.querySelector('.strategy-signal-statement');

    const strategyTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-strategy',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.strategy-pin',
        scrub: LIQUID_SCRUB
      }
    });

    // Desktop ordered positions
    const orderedPositions = [
      { left: '4%', top: '35%', rotate: 0 },
      { left: '23%', top: '35%', rotate: 0 },
      { left: '42%', top: '35%', rotate: 0 },
      { left: '61%', top: '35%', rotate: 0 },
      { left: '80%', top: '35%', rotate: 0 }
    ];

    nodes.forEach((node, idx) => {
      strategyTl.to(node, {
        top: orderedPositions[idx].top,
        left: orderedPositions[idx].left,
        rotate: 0,
        duration: 0.45,
        ease: 'none'
      }, 0.15);
    });

    strategyTl
      // Draw glowing connector line
      .to(connector, {
        scaleX: 1,
        duration: 0.35,
        ease: 'none'
      }, 0.45)

      // Statement: WE FIND THE SIGNAL
      .to(signalStmt, {
        opacity: 1,
        y: -10,
        duration: 0.25,
        ease: 'none'
      }, 0.65);
  }

  // ==========================================================================
  // CHAPTER 04 — CREATIVE
  // Showcase morphing through actual uploaded assets
  // ==========================================================================
  const creativeSection = document.querySelector('#scene-creative');
  if (creativeSection) {
    const slides = creativeSection.querySelectorAll('.creative-slide');
    const tabs = creativeSection.querySelectorAll('.creative-tab-pill');
    const finaleText = creativeSection.querySelector('.creative-finale-text');

    const creativeTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-creative',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.creative-pin',
        scrub: LIQUID_SCRUB
      }
    });

    // Morph Slide 1 (Identity) to Slide 2 (Campaign)
    creativeTl
      .to(slides[0], {
        opacity: 0,
        scale: 0.96,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        duration: 0.25,
        ease: 'none'
      }, 0.15)
      .to(slides[1], {
        opacity: 1,
        scale: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.25,
        ease: 'none'
      }, 0.15)
      .add(() => {
        tabs.forEach((t, i) => t.classList.toggle('active', i === 1));
      }, 0.15)

      // Morph Slide 2 to Slide 3 (Viral Motion Video)
      .to(slides[1], {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: 'none'
      }, 0.42)
      .to(slides[2], {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'none'
      }, 0.42)
      .add(() => {
        tabs.forEach((t, i) => t.classList.toggle('active', i === 2));
      }, 0.42)

      // Morph Slide 3 (Video) to Slide 4 (Culture Meme)
      .to(slides[2], {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: 'none'
      }, 0.68)
      .to(slides[3], {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'none'
      }, 0.68)
      .add(() => {
        tabs.forEach((t, i) => t.classList.toggle('active', i === 3));
      }, 0.68)

      // Transition into "CREATIVE MAKES THEM STOP."
      .to(slides[3], {
        filter: 'brightness(0.35)',
        scale: 0.95,
        duration: 0.2,
        ease: 'none'
      }, 0.88)
      .to(finaleText, {
        opacity: 1,
        y: -15,
        duration: 0.2,
        ease: 'none'
      }, 0.88);
  }

  // ==========================================================================
  // CHAPTER 05 — DISTRIBUTION
  // Central creative multiplying across satellite channel nodes
  // ==========================================================================
  const distSection = document.querySelector('#scene-distribution');
  if (distSection) {
    const originCard = distSection.querySelector('.origin-creative-card');
    const nodes = distSection.querySelectorAll('.network-node-badge');

    const distTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-distribution',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.distribution-pin',
        scrub: LIQUID_SCRUB
      }
    });

    distTl
      .to(originCard, {
        scale: 0.85,
        boxShadow: '0 0 100px rgba(15, 98, 254, 0.8)',
        duration: 0.3,
        ease: 'none'
      }, 0.1)

      // Stagger in satellite channels (Meta, Google, Instagram, etc.)
      .to(nodes, {
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.35,
        ease: 'none'
      }, 0.25);
  }

  // ==========================================================================
  // CHAPTER 06 — PERFORMANCE
  // Scrubbed Telemetry & Interactive SVG Growth Curve + Dynamic Number Counters
  // ==========================================================================
  const perfSection = document.querySelector('#scene-performance');
  if (perfSection) {
    const chartPath = perfSection.querySelector('.chart-path-glow');
    const statCards = perfSection.querySelectorAll('.perf-metric-card');

    const roasEl = perfSection.querySelector('.perf-roas-num');
    const revEl = perfSection.querySelector('.perf-rev-num');
    const leadsEl = perfSection.querySelector('.perf-leads-num');
    const cpaEl = perfSection.querySelector('.perf-cpa-num');

    const perfTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-performance',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.performance-pin',
        scrub: LIQUID_SCRUB
      }
    });

    // Animate SVG path drawing with linear ease
    perfTl
      .to(chartPath, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'none'
      }, 0)

      // Stagger reveal stat cards
      .from(statCards, {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: 'none'
      }, 0.1);

    // Dynamic numeric count interpolation
    const counters = { roas: 2.1, rev: 42, leads: 1200, cpa: 850 };
    
    perfTl.to(counters, {
      roas: 4.7,
      rev: 212,
      leads: 3400,
      cpa: 520,
      duration: 0.7,
      ease: 'none',
      onUpdate: () => {
        if (roasEl) roasEl.textContent = `${counters.roas.toFixed(1)}x`;
        if (revEl) revEl.textContent = `+${Math.round(counters.rev)}%`;
        if (leadsEl) leadsEl.textContent = Math.round(counters.leads).toLocaleString();
        if (cpaEl) cpaEl.textContent = `₹${Math.round(counters.cpa)}`;
      }
    }, 0.15);
  }

  // ==========================================================================
  // CHAPTER 08 — SERVICES
  // Dynamic spotlight focus matrix
  // ==========================================================================
  const servSection = document.querySelector('#scene-services');
  if (servSection) {
    const menuItems = servSection.querySelectorAll('.service-menu-item');
    const title = servSection.querySelector('.service-active-title');
    const desc = servSection.querySelector('.service-active-desc');
    const tag = servSection.querySelector('.service-active-tag');
    const chipsContainer = servSection.querySelector('.service-deliverables-list');

    const servicesData = [
      {
        tag: 'DISCIPLINE 01',
        title: 'PERFORMANCE MARKETING',
        desc: 'High-frequency algorithmic media buying across Meta, Google Search, YouTube, and TikTok. Engineered for compounding ROAS and disciplined customer acquisition cost.',
        chips: ['Full-Funnel Media', 'Algorithmic Bidding', 'CAC Suppression', 'ROAS Optimization']
      },
      {
        tag: 'DISCIPLINE 02',
        title: 'SOCIAL MEDIA ENGINES',
        desc: 'Building cultural relevance through reactive memes, community engagement, and viral native formats that command audience trust before selling.',
        chips: ['Culture-Native Content', 'Meme Sprints', 'Community Flywheels', 'Short-Form Video']
      },
      {
        tag: 'DISCIPLINE 03',
        title: 'SEO & ORGANIC MONOPOLY',
        desc: 'Engineering high-intent search capture to dominate category keywords and establish permanent, compounding organic traffic moats.',
        chips: ['High-Intent Architecture', 'Semantic Search', 'Programmatic SEO', 'Technical Audits']
      },
      {
        tag: 'DISCIPLINE 04',
        title: 'CREATIVE STUDIO & HOOKS',
        desc: 'Thumb-stopping ad creative, 3D product visuals, and rapid variant testing designed to disrupt infinite feeds and trigger direct response.',
        chips: ['Visual Hooks', 'Motion Design', 'High-Velocity Sprints', 'Dynamic Iteration']
      },
      {
        tag: 'DISCIPLINE 05',
        title: 'BRAND IDENTITY & POSITIONING',
        desc: 'Transforming commodities into distinct categories. Sharp visual identity systems, provocative tone of voice, and unmistakable premium aesthetics.',
        chips: ['Category Design', 'Visual Systems', 'Tone of Voice', 'Editorial Standards']
      },
      {
        tag: 'DISCIPLINE 06',
        title: 'CONVERSION OPTIMIZATION',
        desc: 'Eliminating checkout and landing page friction through scientific multivariate testing, speed engineering, and behavioral psychology.',
        chips: ['Frictionless UX', 'A/B Experimentation', 'Checkout Flow', 'Heatmap Diagnostics']
      }
    ];

    function applyService(idx) {
      const s = servicesData[idx];
      if (!s) return;
      menuItems.forEach((m, i) => m.classList.toggle('active', i === idx));
      if (title) title.textContent = s.title;
      if (desc) desc.textContent = s.desc;
      if (tag) tag.textContent = s.tag;
      if (chipsContainer) {
        chipsContainer.innerHTML = s.chips.map(c => `<span class="service-chip">${c}</span>`).join('');
      }
    }

    // Allow clicking on any service item in addition to scroll
    menuItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        applyService(idx);
      });
    });

    const servTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-services',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.services-pin',
        scrub: LIQUID_SCRUB
      }
    });

    servicesData.forEach((_, idx) => {
      servTl.add(() => {
        applyService(idx);
      }, idx * 0.16);
    });
  }

  // ==========================================================================
  // CHAPTER 09 — PROCESS
  // Horizontal Filmstrip Controlled By Vertical Scroll (Desktop)
  // ==========================================================================
  const processSection = document.querySelector('#scene-process');
  if (processSection && window.innerWidth > 900) {
    const track = processSection.querySelector('.process-horizontal-track');

    gsap.to(track, {
      xPercent: -80, // 5 slides -> 4 shifts (4 x 20% = 80%)
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-process',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.process-pin',
        scrub: LIQUID_SCRUB
      }
    });
  }

  // ==========================================================================
  // CHAPTER 10 — RESULTS & CONVERGENCE
  // ATTENTION -> INTEREST -> ACTION -> REVENUE
  // "WE DON'T JUST GENERATE ATTENTION. WE TURN IT INTO GROWTH."
  // ==========================================================================
  const resultsSection = document.querySelector('#scene-results');
  if (resultsSection) {
    const steps = resultsSection.querySelectorAll('.funnel-step');
    const statement = resultsSection.querySelector('.results-climax-statement');

    const resultsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scene-results',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.results-pin',
        scrub: LIQUID_SCRUB
      }
    });

    steps.forEach((step, idx) => {
      resultsTl.to(step, {
        color: '#dfba73',
        scale: 1.12,
        duration: 0.15,
        ease: 'none'
      }, idx * 0.18);
    });

    resultsTl.to(statement, {
      opacity: 1,
      y: -20,
      duration: 0.35,
      ease: 'none'
    }, 0.7);
  }
}
