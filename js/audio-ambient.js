/* ==========================================================================
   AUDIO-AMBIENT.JS
   Subtle Synthesized Atmospheric Drone via native Web Audio API
   100% Client-side, zero external audio asset dependencies, non-intrusive.
   ========================================================================== */

class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.filter = null;
    this.btn = document.getElementById('audio-toggle');
  }

  init() {
    if (!this.btn) return;
    this.btn.addEventListener('click', () => this.toggle());
  }

  setupAudioContext() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Lowpass Filter (creates that deep cinematic dark room hum)
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Harmonic Frequencies (Subtle C minor / atmospheric ambient chord)
    // 55Hz (A1), 82.4Hz (E2), 110Hz (A2), 164.8Hz (E3)
    const freqs = [55.0, 82.4, 110.0, 164.8];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Micro detune for organic analog chorus feel
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.filter);

      osc.start();
      this.oscillators.push({ osc, oscGain });
    });
  }

  play() {
    this.setupAudioContext();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    // Smooth cinematic fade in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.5);
    
    this.isPlaying = true;
    if (this.btn) {
      this.btn.classList.add('playing');
      const text = this.btn.querySelector('.audio-text');
      if (text) text.textContent = 'SOUND: ON';
    }
  }

  pause() {
    if (!this.ctx) return;
    
    // Smooth fade out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    
    this.isPlaying = false;
    if (this.btn) {
      this.btn.classList.remove('playing');
      const text = this.btn.querySelector('.audio-text');
      if (text) text.textContent = 'SOUND: OFF';
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Soft haptic click sound for magnetic buttons
  playClick() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {
      // AudioContext safe catch
    }
  }

  // Elite harmonic chime for interactive hover states
  playHarmonicChime(freq = 440) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, this.ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch (e) {
      // AudioContext safe catch
    }
  }
}

export const soundscape = new AmbientSoundscape();
