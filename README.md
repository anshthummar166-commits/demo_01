# KINETIC ATELIER // Premium Cinematic Scroll-Driven Agency Landing Page

A continuous, scroll-driven interactive campaign film website built for a top-tier creative & performance marketing agency.

---

## Core Creative Narrative Arc

The entire experience tells **ONE continuous story** across 10 transformational chapters:

$$\text{ATTENTION} \longrightarrow \text{STRATEGY} \longrightarrow \text{CREATIVE} \longrightarrow \text{DISTRIBUTION} \longrightarrow \text{PERFORMANCE} \longrightarrow \text{GROWTH}$$

### Chapters Overview:

1. **Chapter 01 — CAPTURE**:
   - Opens in a dark void: `"YOU HAVE 3 SECONDS."` with a live micro-timer.
   - Colossal kinetic typography scales into view: **"STOP THE SCROLL."**
   - Unmasks the abstract violet brand visual identity in the background.
   - Headline departs as visual takes dominance: `"GOOD. NOW LOOK."` → `"WE TURN ATTENTION INTO REVENUE."`
   - CTAs: `BOOK A STRATEGY CALL →` and `VIEW OUR WORK →`.

2. **Chapter 02 — THE PROBLEM**:
   - Pinned sequence: `"EVERY BRAND WANTS ATTENTION."` → `"VERY FEW DESERVE IT."`
   - Visual interruption: High-contrast Deebug "Big Steps" disruptive footwear poster breaks into the viewport with 3D perspective rotation.
   - Core premise: `"THE PROBLEM ISN'T REACH. IT'S RELEVANCE."`
   - Triad: *01 Right Message • 02 Right Person • 03 Right Moment*.

3. **Chapter 03 — STRATEGY (Chaos into Order)**:
   - Scattered nodes initially float across the screen in 2D space.
   - On scroll, they pull together and lock into a unified strategic pipeline:
     `AUDIENCE` ↓ `MESSAGE` ↓ `CREATIVE` ↓ `DISTRIBUTION` ↓ `CONVERSION`.
   - Concludes: `"WE FIND THE SIGNAL."`

4. **Chapter 04 — CREATIVE (The Showcase)**:
   - Pinned visual showcase morphing between the uploaded client assets:
     - `01 / CREATIVE`: Kinetic Syntax Atelier (Violet generative identity)
     - `02 / CAMPAIGN`: Deebug Institute (High-contrast "Big Steps" disruptive ad)
     - `03 / SOCIAL`: Afterthought Creative (Culture & meme-driven engagement)
   - Dynamic tabs and culmination: `"CREATIVE MAKES THEM STOP."`

5. **Chapter 05 — DISTRIBUTION (One into Many)**:
   - Origin creative multiplies across an interactive canvas network.
   - Satellite channel nodes illuminate:
     `META` • `GOOGLE SEARCH` • `REELS & STORIES` • `YOUTUBE SHORTS` • `HIGH-INTENT SEO` • `COMMUNITY FLYWHEELS` • `DIRECT WEB & CRM`.
   - Axiom: `"ONE CREATIVE becomes MANY TOUCHPOINTS"` → `"RIGHT MESSAGE. RIGHT PERSON. RIGHT TIME."`

6. **Chapter 06 — PERFORMANCE (Data in Motion)**:
   - Scrubbed telemetry and interactive SVG growth curve drawing in real-time:
     - **ROAS**: `2.1x → 4.7x` (+123% efficiency)
     - **REVENUE**: `+42% → +212%` (5.0x compound)
     - **LEADS**: `1,200 → 3,400` (+183% volume)
     - **CPA**: `₹850 → ₹520` (-39% CAC)

7. **Chapter 07 — CASE STUDIES (Evidence)**:
   - Editorial deep dives featuring the exact uploaded assets with full aspect ratio preservation:
     - **Deebug Institute**: Perspective-bending typography hook commanding thumb-stopping action.
     - **Afterthought**: Self-aware pop-culture subversion yielding 1.8M organic impressions.
     - **Vortex Brand Atelier**: Luxury category positioning commanding 3.8x deal sizes.

8. **Chapter 08 — SERVICES (Dynamic Spotlight Matrix)**:
   - Dynamic spotlight matrix (not 6 static cards) covering:
     1. Performance Marketing
     2. Social Media Engines
     3. SEO & Organic Monopoly
     4. Creative Studio & Hooks
     5. Brand Identity & Positioning
     6. Conversion Optimization

9. **Chapter 09 — PROCESS (Horizontal Filmstrip)**:
   - Vertical scrolling drives silky horizontal slide movement on desktop (with clean vertical flow on mobile):
     `01 DISCOVER` → `02 STRATEGIZE` → `03 CREATE` → `04 LAUNCH` → `05 OPTIMIZE`.

10. **Chapter 10 — RESULTS & FINAL CLIMAX**:
    - Convergence: `ATTENTION ↓ INTEREST ↓ ACTION ↓ REVENUE`
    - Statements: `"WE DON'T JUST GENERATE ATTENTION."` → `"WE TURN IT INTO GROWTH."`
    - Climax screen:
      - `"READY?"`
      - `"LET'S BUILD SOMETHING IMPOSSIBLE TO IGNORE."`
      - Primary CTA: `BOOK A STRATEGY CALL →` (triggers interactive booking drawer).
      - Secondary CTA: `VIEW OUR WORK →`.

---

## Asset Directory Layout

All assets are organized cleanly:

```
/assets/
  ├── images/
  │   └── abstract-violet.jpg       # Uploaded: media_1790665893726.jpg
  ├── campaigns/
  │   ├── deebug-big-steps.jpg      # Uploaded: media_1790665901944.jpg
  │   └── afterthought.jpg          # Uploaded: media_1790665901975.jpg
  ├── case-studies/
  │   ├── case-deebug.jpg
  │   ├── case-afterthought.jpg
  │   └── identity-violet.jpg
  └── videos/                       # Place optional hero/campaign mp4/webm videos here
```

> **Adding Videos or New Images**:
> Drop any new video file (e.g. `hero.mp4`) into `assets/videos/`. The code supports automatic autoplay, muted loop, and intersection-observer viewport throttling.

---

## Interactive Features

- **Lenis Smooth Scroll**: Silky momentum scrolling synced with GSAP's ticker at 60/120fps.
- **Custom Magnetic Cursor**: Desktop inertial dot & circle cursor with active scaling and image zoom detection.
- **Atmospheric Soundscape**: Subtle Web Audio API ambient synthesizer with mute toggle in the bottom left.
- **Interactive Strategy Drawer**: Comprehensive booking intake with monthly ad budget selectors and growth objective dropdowns.
- **Asset Inspector Lightbox**: Click any campaign asset to inspect in full-resolution modal.
- **Accessibility**: Full `prefers-reduced-motion` compliance.

---

## Running the Project

### Development Server:
```bash
npm run dev
# Running on http://localhost:5173/
```

### Production Build:
```bash
npm run build
# Outputs optimized static files to /dist/
```
