/* ==========================================================================
   DISTRIBUTION-CANVAS.JS
   Interactive Particle Network for Chapter 05: One Creative -> Many Touchpoints
   ========================================================================== */

export class DistributionNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.pulses = [];
    this.animationFrameId = null;
    this.active = false;

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    if (!this.canvas) return;
    this.resize();
    window.addEventListener('resize', this.resize);
    this.createNodes();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width;
    this.height = this.canvas.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.createNodes();
  }

  createNodes() {
    // 7 Satellite Network Targets around center
    const targets = [
      { name: 'META', angle: -0.6 * Math.PI, dist: 0.38 },
      { name: 'GOOGLE', angle: -0.2 * Math.PI, dist: 0.36 },
      { name: 'INSTAGRAM', angle: 0.1 * Math.PI, dist: 0.42 },
      { name: 'YOUTUBE', angle: 0.35 * Math.PI, dist: 0.37 },
      { name: 'SEARCH', angle: 0.75 * Math.PI, dist: 0.35 },
      { name: 'SOCIAL', angle: 0.95 * Math.PI, dist: 0.43 },
      { name: 'WEB', angle: -0.85 * Math.PI, dist: 0.28 }
    ];

    const minDim = Math.min(this.width, this.height);

    this.nodes = targets.map((t) => {
      const radius = minDim * t.dist;
      return {
        name: t.name,
        x: this.centerX + Math.cos(t.angle) * radius,
        y: this.centerY + Math.sin(t.angle) * radius,
        baseX: this.centerX + Math.cos(t.angle) * radius,
        baseY: this.centerY + Math.sin(t.angle) * radius,
        progress: 0,
        pulseOffset: Math.random() * Math.PI * 2
      };
    });
  }

  spawnPulse() {
    if (this.nodes.length === 0) return;
    const targetIdx = Math.floor(Math.random() * this.nodes.length);
    const target = this.nodes[targetIdx];
    this.pulses.push({
      startX: this.centerX,
      startY: this.centerY,
      endX: target.x,
      endY: target.y,
      progress: 0,
      speed: 0.015 + Math.random() * 0.015,
      size: 2.5 + Math.random() * 2
    });
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.render();
  }

  stop() {
    this.active = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  render() {
    if (!this.active || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Periodically spawn pulse packets
    if (Math.random() < 0.08 && this.pulses.length < 18) {
      this.spawnPulse();
    }

    const time = Date.now() * 0.002;

    // Draw connecting beams from center to nodes
    this.nodes.forEach((node) => {
      // Gentle floating oscillation
      node.x = node.baseX + Math.sin(time + node.pulseOffset) * 6;
      node.y = node.baseY + Math.cos(time + node.pulseOffset) * 6;

      const grad = this.ctx.createLinearGradient(this.centerX, this.centerY, node.x, node.y);
      grad.addColorStop(0, 'rgba(15, 98, 254, 0.4)');
      grad.addColorStop(0.7, 'rgba(138, 63, 252, 0.25)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.centerY);
      this.ctx.lineTo(node.x, node.y);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Node ring
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#0f62fe';
      this.ctx.fill();
    });

    // Update & draw pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.pulses.splice(i, 1);
        continue;
      }

      const curX = p.startX + (p.endX - p.startX) * p.progress;
      const curY = p.startY + (p.endY - p.startY) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#0f62fe';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    this.animationFrameId = requestAnimationFrame(this.render);
  }
}
