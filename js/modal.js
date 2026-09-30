/* ==========================================================================
   MODAL.JS - STRATEGY BOOKING DRAWER & IMAGE LIGHTBOX
   Interactive Strategy Consultation Drawer & Campaign Asset Inspector
   ========================================================================== */

import { soundscape } from './audio-ambient.js';

export function initModals() {
  const backdrop = document.getElementById('strategy-modal');
  const drawer = document.getElementById('drawer-panel');
  const closeBtn = document.getElementById('drawer-close');
  const triggerBtns = document.querySelectorAll('[data-open-strategy]');
  const form = document.getElementById('strategy-form');
  const successAlert = document.getElementById('form-success');
  const budgetPills = document.querySelectorAll('.budget-pill');
  const budgetInput = document.getElementById('selected-budget');

  // Open Drawer
  const openDrawer = (e) => {
    if (e) e.preventDefault();
    soundscape.playClick();
    if (backdrop) {
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close Drawer
  const closeDrawer = () => {
    soundscape.playClick();
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', openDrawer);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Close on background click
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeDrawer();
      }
    });
  }

  // Budget pill selection
  budgetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      soundscape.playClick();
      budgetPills.forEach((p) => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (budgetInput) {
        budgetInput.value = pill.dataset.budget || pill.textContent;
      }
    });
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundscape.playClick();
      
      const submitBtn = form.querySelector('.form-submit-btn');
      if (submitBtn) {
        submitBtn.innerHTML = `<span>SECURING BRIEF...</span>`;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (successAlert) {
          successAlert.classList.add('show');
          form.style.display = 'none';
        }
      }, 900);
    });
  }

  // Lightbox for campaign assets
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('[data-zoomable]');

  zoomableImages.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      soundscape.playClick();
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.getAttribute('src');
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      soundscape.playClick();
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ESC key listener to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (backdrop && backdrop.classList.contains('open')) closeDrawer();
      if (lightbox && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}
