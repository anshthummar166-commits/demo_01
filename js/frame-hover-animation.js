/* ==========================================================================
   FRAME-HOVER-ANIMATION.JS
   Interactive stop-motion hover animation & cursor scrub engine.
   Preloads image frame sequences and renders high-performance sequence playback
   on canvas during mouse hover, cursor scrub, or touch swipe.
   ========================================================================== */

export class FrameHoverAnimation {
  constructor(containerElement, options = {}) {
    this.container = typeof containerElement === 'string' 
      ? document.querySelector(containerElement) 
      : containerElement;

    if (!this.container) return;

    // Read attributes or fallback to options
    this.folder = this.container.dataset.frameFolder || options.folder || './assets/images/From_Klickpin_com-_Try_Aesthetic_meal_prep_recipes_that_help_you_create_a_beautiful_result_without_overspending_for_a_polished_look_people_will_no_frames';
    this.prefix = this.container.dataset.framePrefix || options.prefix || 'frame_';
    this.ext = this.container.dataset.frameExt || options.ext || 'jpg';
    this.frameCount = parseInt(this.container.dataset.frameCount || options.frameCount || 95, 10);
    this.digits = parseInt(this.container.dataset.frameDigits || options.digits || 3, 10);
    this.fps = parseInt(this.container.dataset.fps || options.fps || 24, 10);

    this.images = [];
    this.loadedCount = 0;
    this.currentIndex = 0;
    this.targetIndex = 0;
    this.isPlaying = false;
    this.isHovered = false;
    this.animFrameId = null;
    this.lastFrameTime = 0;

    this.init();
  }

  // Format frame number with padding: 1 -> "001", 42 -> "042"
  getFramePath(index) {
    const frameNum = (index + 1).toString().padStart(this.digits, '0');
    return `${this.folder}/${this.prefix}${frameNum}.${this.ext}`;
  }

  init() {
    // Find or create canvas
    this.canvas = this.container.querySelector('canvas.frame-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'frame-canvas';
      this.container.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d', { alpha: false });

    // UI Feedback elements
    this.counterEl = this.container.querySelector('[data-frame-counter]');
    this.progressBarEl = this.container.querySelector('[data-frame-progress]');
    this.statusEl = this.container.querySelector('[data-frame-status]');

    // Preload images
    this.preloadFrames();

    // Bind event listeners
    this.bindEvents();

    // Handle Window Resize
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  preloadFrames() {
    this.images = new Array(this.frameCount);
    this.loadedCount = 0;

    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.src = this.getFramePath(i);
      
      img.onload = () => {
        this.loadedCount++;
        this.images[i] = img;

        // Render first frame as soon as loaded
        if (i === 0) {
          this.resizeCanvas();
          this.renderFrame(0);
        }

        // Update progress status if loading bar exists
        if (this.statusEl && this.loadedCount < this.frameCount) {
          const percent = Math.floor((this.loadedCount / this.frameCount) * 100);
          this.statusEl.textContent = `LOADING FRAMES ${percent}%`;
        } else if (this.statusEl && this.loadedCount === this.frameCount) {
          this.statusEl.textContent = `READY // HOVER TO SCRUB`;
        }
      };

      img.onerror = () => {
        // Fallback for missing frames
        this.loadedCount++;
      };
    }
  }

  resizeCanvas() {
    if (!this.canvas || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.scale(dpr, dpr);
    this.renderFrame(this.currentIndex);
  }

  renderFrame(index) {
    const img = this.images[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const rect = this.container.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;

    // Object-fit: cover calculation inside canvas
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    }

    this.ctx.fillStyle = '#0a0a0f';
    this.ctx.fillRect(0, 0, cw, ch);
    this.ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Update UI elements
    if (this.counterEl) {
      const formattedCurr = (index + 1).toString().padStart(3, '0');
      const formattedTotal = this.frameCount.toString().padStart(3, '0');
      this.counterEl.textContent = `FRAME ${formattedCurr} / ${formattedTotal}`;
    }

    if (this.progressBarEl) {
      const progressPercent = ((index + 1) / this.frameCount) * 100;
      this.progressBarEl.style.width = `${progressPercent}%`;
    }
  }

  bindEvents() {
    // Mouse hover & cursor scrub
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.container.classList.add('is-hovered');
      if (this.statusEl) this.statusEl.textContent = `SCRUBBING ACTIVE`;
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.container.classList.remove('is-hovered');
      if (this.statusEl) this.statusEl.textContent = `HOVER TO SCRUB`;
      // Smoothly ease back or pause
    });

    this.container.addEventListener('mousemove', (e) => {
      if (!this.isHovered) return;
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, x / rect.width));
      
      this.targetIndex = Math.floor(ratio * (this.frameCount - 1));
      this.requestSmoothRender();
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let initialFrame = 0;

    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        initialFrame = this.currentIndex;
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.container.getBoundingClientRect();
        const deltaX = e.touches[0].clientX - touchStartX;
        const frameDelta = Math.round((deltaX / rect.width) * this.frameCount);
        
        let newIdx = initialFrame + frameDelta;
        newIdx = Math.max(0, Math.min(this.frameCount - 1, newIdx));
        
        this.targetIndex = newIdx;
        this.requestSmoothRender();
      }
    }, { passive: true });
  }

  requestSmoothRender() {
    if (this.animFrameId) return;

    const smoothStep = () => {
      // Smooth lerp towards target index
      const diff = this.targetIndex - this.currentIndex;
      
      if (Math.abs(diff) < 0.5) {
        this.currentIndex = this.targetIndex;
        this.renderFrame(this.currentIndex);
        this.animFrameId = null;
      } else {
        this.currentIndex += diff * 0.35; // lerp speed
        const roundedIdx = Math.round(this.currentIndex);
        this.renderFrame(roundedIdx);
        this.animFrameId = requestAnimationFrame(smoothStep);
      }
    };

    this.animFrameId = requestAnimationFrame(smoothStep);
  }
}

// Auto-initialize elements with [data-frame-hover] attribute
export function initFrameHoverAnimations() {
  const elements = document.querySelectorAll('[data-frame-hover]');
  const instances = [];

  elements.forEach((el) => {
    const anim = new FrameHoverAnimation(el);
    instances.push(anim);
  });

  return instances;
}
