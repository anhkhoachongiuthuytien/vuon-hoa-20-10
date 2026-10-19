/* ==========================================================
   CẢ MỘT VƯỜN THƯƠNG... | CHÚC MỪNG 20/10
   Dynamic Garden Generation, Swaying Physics, Canvas Falling Leaves,
   Greeting Card Modal, Interactive Petal Bursts & Romantic Piano Synth
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const canvas = document.getElementById('falling-leaves-canvas');
  const gardenContainer = document.getElementById('gardenContainer');
  const heroFlower = document.getElementById('heroFlower');
  const bottomMessage = document.getElementById('bottomMessage');
  const wakeGardenBtn = document.getElementById('wakeGardenBtn');
  const cardOverlay = document.getElementById('cardOverlay');
  const admireGardenBtn = document.getElementById('admireGardenBtn');
  const cardReopenBtn = document.getElementById('cardReopenBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const clickEffects = document.getElementById('clickEffects');

  // Check URL query parameters for custom recipient name
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('to') || urlParams.get('name');
  if (recipientName) {
    const subtitle = document.querySelector('.card-subtitle');
    if (subtitle) {
      subtitle.textContent = `Gửi ${recipientName} thương mến,`;
    }
    const topTitle = document.getElementById('topTitle');
    if (topTitle) {
      topTitle.textContent = `Dành tặng ${recipientName}, cả một vườn thương.`;
    }
  }

  let gardenBloomed = false;

  // ==========================================================
  // 1. FALLING LEAVES & PETALS CANVAS ANIMATION
  // ==========================================================
  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Color palettes for falling leaves and soft petals
  const leafColors = [
    '#4a8d54', '#3d7846', '#5c9e67', '#6cb077', '#34663b',
    '#f9a8bc', '#fbcfe8', '#fed7aa', '#bbf7d0', '#bae6fd'
  ];

  class Particle {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.x = Math.random() * width;
      this.y = isInitial ? Math.random() * height : -20 - Math.random() * 50;
      this.size = 7 + Math.random() * 11;
      this.speedY = 0.7 + Math.random() * 1.3;
      this.speedX = -0.5 + Math.random() * 1.0;
      this.amplitude = 15 + Math.random() * 25;
      this.frequency = 0.01 + Math.random() * 0.02;
      this.phase = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = -0.02 + Math.random() * 0.04;
      this.tumble = Math.random() * Math.PI * 2;
      this.tumbleSpeed = 0.02 + Math.random() * 0.03;
      this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
      this.isLeaf = Math.random() > 0.35; // 65% leaf, 35% petal
      this.opacity = 0.45 + Math.random() * 0.45;
    }

    update(time) {
      this.y += this.speedY;
      this.x += Math.sin(time * this.frequency + this.phase) * 0.8 + this.speedX;
      this.rotation += this.rotSpeed;
      this.tumble += this.tumbleSpeed;

      if (this.y > height + 30 || this.x < -40 || this.x > width + 40) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(1, Math.cos(this.tumble));
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      ctx.beginPath();
      if (this.isLeaf) {
        // Pointed oval leaf shape with center vein
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size * 0.55, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size * 0.55, 0, 0, -this.size);
        ctx.fill();

        // Subtle center crease
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.8);
        ctx.lineTo(0, this.size * 0.8);
        ctx.stroke();
      } else {
        // Rounder curved petal
        ctx.moveTo(0, -this.size * 0.8);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size * 0.8);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particles = Array.from({ length: 32 }, () => new Particle(true));

  let animTime = 0;
  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    animTime++;
    particles.forEach(p => {
      p.update(animTime);
      p.draw(ctx);
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();

  // ==========================================================
  // 2. DYNAMIC GARDEN FLOWER GENERATION
  // ==========================================================
  const flowerTypes = [
    { type: 'rose', file: 'assets/rose_pink.png', name: 'pink' },
    { type: 'rose', file: 'assets/rose_peach.png', name: 'peach' },
    { type: 'rose', file: 'assets/rose_yellow.png', name: 'yellow' },
    { type: 'rose', file: 'assets/rose_green.png', name: 'green' },
    { type: 'rose', file: 'assets/rose_blue.png', name: 'blue' },
    { type: 'rose', file: 'assets/rose_purple.png', name: 'purple' },
    { type: 'rose', file: 'assets/rose_coral.png', name: 'coral' },
    { type: 'bud', file: 'assets/rosebud_pink.png', name: 'bud-pink' },
    { type: 'bud', file: 'assets/rosebud_peach.png', name: 'bud-peach' },
    { type: 'bud', file: 'assets/rosebud_blue.png', name: 'bud-blue' },
    { type: 'bud', file: 'assets/rosebud_yellow.png', name: 'bud-yellow' }
  ];

  function createFlowerPlant(config) {
    const plant = document.createElement('div');
    plant.className = 'flower-plant garden-flower-sprouting';

    const stemHeight = config.height;
    const leftPos = config.left;
    const zIndex = config.zIndex;
    const scale = config.scale;
    const isBud = config.type === 'bud';
    const headSize = isBud ? Math.round(75 * scale) : Math.round(115 * scale);

    plant.style.left = `${leftPos}%`;
    plant.style.zIndex = zIndex;
    plant.style.setProperty('--stem-height', `${stemHeight}px`);
    plant.style.setProperty('--head-size', `${headSize}px`);
    plant.style.setProperty('--grow-dur', `${config.growDur}s`);
    plant.style.setProperty('--grow-delay', `${config.growDelay}s`);
    plant.style.setProperty('--bloom-dur', `${config.bloomDur}s`);

    // Wind sway config
    plant.style.setProperty('--sway-duration', `${config.swayDur}s`);
    plant.style.setProperty('--sway-min', `${config.swayMin}deg`);
    plant.style.setProperty('--sway-max', `${config.swayMax}deg`);
    plant.style.animation = `garden-sway ${config.swayDur}s ease-in-out infinite alternate ${config.swayDelay}s`;

    // Inner stem wrap
    const stemWrap = document.createElement('div');
    stemWrap.className = 'flower-stem-wrap';

    const stem = document.createElement('div');
    stem.className = 'flower-stem';
    stemWrap.appendChild(stem);

    // Leaves
    if (config.hasLeftLeaf) {
      const leafL = document.createElement('div');
      leafL.className = 'flower-leaf leaf-left';
      leafL.style.setProperty('--leaf-w', `${Math.round(34 * scale)}px`);
      leafL.style.setProperty('--leaf-h', `${Math.round(52 * scale)}px`);
      leafL.style.setProperty('--leaf-pos', `${config.leafPosL}%`);
      leafL.style.setProperty('--leaf-rot', `${config.leafRotL}deg`);
      stemWrap.appendChild(leafL);
    }

    if (config.hasRightLeaf) {
      const leafR = document.createElement('div');
      leafR.className = 'flower-leaf leaf-right';
      leafR.style.setProperty('--leaf-w', `${Math.round(34 * scale)}px`);
      leafR.style.setProperty('--leaf-h', `${Math.round(52 * scale)}px`);
      leafR.style.setProperty('--leaf-pos-r', `${config.leafPosR}%`);
      leafR.style.setProperty('--leaf-rot-r', `${config.leafRotR}deg`);
      stemWrap.appendChild(leafR);
    }

    // Flower Head
    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';

    const headImg = document.createElement('img');
    headImg.src = config.imgSrc;
    headImg.alt = 'Hoa';
    headImg.className = 'flower-head-img';
    headWrap.appendChild(headImg);

    stemWrap.appendChild(headWrap);
    plant.appendChild(stemWrap);

    // Interactivity: clicking a flower makes it give off heart sparkles
    plant.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = headWrap.getBoundingClientRect();
      createHeartSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    return plant;
  }

  function bloomGarden() {
    if (gardenBloomed) return;
    gardenBloomed = true;

    // Fade bottom message
    bottomMessage.classList.add('fade-out');

    // Create 42 flowers spanning the screen
    const windowH = window.innerHeight;
    const windowW = window.innerWidth;
    const flowerCount = windowW < 600 ? 28 : 44;

    // We generate 3 layers: back, mid, front
    const flowersData = [];

    for (let i = 0; i < flowerCount; i++) {
      // Spread positions across screen with pleasant jitter
      const left = ((i + 0.5) / flowerCount) * 104 - 2 + (Math.random() * 4 - 2);

      // Choose layer
      const layerRand = Math.random();
      let layer = 'mid';
      let zIndex = 11;
      let heightPercent = 0.5;
      let scale = 0.85;

      if (layerRand < 0.35) {
        // Back layer: taller stems, smaller scale
        layer = 'back';
        zIndex = 8;
        heightPercent = 0.55 + Math.random() * 0.22;
        scale = 0.62 + Math.random() * 0.15;
      } else if (layerRand < 0.75) {
        // Mid layer
        layer = 'mid';
        zIndex = 11;
        heightPercent = 0.42 + Math.random() * 0.2;
        scale = 0.82 + Math.random() * 0.18;
      } else {
        // Front layer: shorter stems, larger scale
        layer = 'front';
        zIndex = 14;
        heightPercent = 0.28 + Math.random() * 0.18;
        scale = 1.05 + Math.random() * 0.2;
      }

      // Avoid blocking the exact center hero rose position too heavily
      if (Math.abs(left - 50) < 6 && layer === 'front') {
        heightPercent *= 0.8;
      }

      const stemHeightPx = Math.round(windowH * heightPercent);

      // Select flower asset: 75% full rose, 25% bud
      const isBud = Math.random() < 0.26;
      let selectedFlower;
      if (isBud) {
        const buds = flowerTypes.filter(f => f.type === 'bud');
        selectedFlower = buds[Math.floor(Math.random() * buds.length)];
      } else {
        const roses = flowerTypes.filter(f => f.type === 'rose');
        selectedFlower = roses[Math.floor(Math.random() * roses.length)];
      }

      flowersData.push({
        left: left,
        height: stemHeightPx,
        scale: scale,
        zIndex: zIndex,
        imgSrc: selectedFlower.file,
        type: selectedFlower.type,
        growDur: 1.6 + Math.random() * 0.8,
        growDelay: Math.random() * 1.8,
        bloomDur: 1.2 + Math.random() * 0.6,
        swayDur: 3.5 + Math.random() * 2.2,
        swayDelay: -(Math.random() * 4),
        swayMin: -(2.5 + Math.random() * 2),
        swayMax: +(2.5 + Math.random() * 2),
        hasLeftLeaf: Math.random() > 0.2,
        hasRightLeaf: Math.random() > 0.2,
        leafPosL: 35 + Math.random() * 25,
        leafPosR: 20 + Math.random() * 25,
        leafRotL: Math.random() * 15 - 7,
        leafRotR: Math.random() * 15 - 7
      });
    }

    // Sort by zIndex so DOM order is neat
    flowersData.sort((a, b) => a.zIndex - b.zIndex);

    flowersData.forEach(cfg => {
      const plantEl = createFlowerPlant(cfg);
      gardenContainer.appendChild(plantEl);
    });

    // Bring hero flower to life with fresh burst
    createHeartSparkles(windowW / 2, windowH * 0.48);

    // After 3.5s of blooming, show the Greeting Card modal!
    setTimeout(() => {
      showGreetingCard();
    }, 3200);
  }

  // Automatic bloom trigger after 2.8s
  const autoBloomTimer = setTimeout(() => {
    bloomGarden();
  }, 2800);

  // Manual triggers
  wakeGardenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearTimeout(autoBloomTimer);
    bloomGarden();
  });

  heroFlower.addEventListener('click', (e) => {
    e.stopPropagation();
    clearTimeout(autoBloomTimer);
    bloomGarden();
  });

  document.body.addEventListener('click', (e) => {
    // If not clicked on buttons or card
    if (!gardenBloomed) {
      clearTimeout(autoBloomTimer);
      bloomGarden();
    } else {
      createHeartSparkles(e.clientX, e.clientY);
    }
  });

  // ==========================================================
  // 3. GREETING CARD MODAL LOGIC
  // ==========================================================
  function showGreetingCard() {
    cardOverlay.classList.remove('hidden');
    cardReopenBtn.classList.add('hidden');
    if (bottomMessage) bottomMessage.style.display = 'none';
  }

  function hideGreetingCard() {
    cardOverlay.classList.add('hidden');
    cardReopenBtn.classList.remove('hidden');
    if (bottomMessage) bottomMessage.style.display = 'none';
  }

  admireGardenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideGreetingCard();
    // Burst particles around button
    createHeartSparkles(window.innerWidth / 2, window.innerHeight / 2);
  });

  cardReopenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showGreetingCard();
  });

  // ==========================================================
  // 4. CLICK SPARKLES & HEART PARTICLES
  // ==========================================================
  const burstIcons = ['🌸', '✨', '💖', '🌷', '💕', '🌿', '⭐'];

  function createHeartSparkles(x, y) {
    const count = 8;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'burst-particle';
      p.textContent = burstIcons[Math.floor(Math.random() * burstIcons.length)];

      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const distance = 40 + Math.random() * 60;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 20;

      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.setProperty('--rot', `${Math.random() * 180 - 90}deg`);
      p.style.fontSize = `${16 + Math.random() * 12}px`;

      clickEffects.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // ==========================================================
  // 5. ROMANTIC PIANO SYNTHESIZER (WEB AUDIO API)
  // Plays a lush, romantic, peaceful acoustic piano melody
  // Zero external assets required, 100% offline & instantaneous!
  // ==========================================================
  let audioCtx = null;
  let isPlayingMusic = false;
  let melodyTimeout = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Piano Note Synthesizer with realistic acoustic harmonics & envelope
  function playPianoNote(freq, duration = 2.0, timeOffset = 0, gainLevel = 0.2) {
    if (!audioCtx || !isPlayingMusic) return;

    const now = audioCtx.currentTime + timeOffset;

    // Master note gain
    const noteGain = audioCtx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(gainLevel, now + 0.015); // Fast piano attack
    noteGain.gain.exponentialRampToValueAtTime(gainLevel * 0.65, now + 0.15); // Decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Long gentle release

    // Harmonics for rich piano tone
    const harmonics = [
      { mult: 1, gain: 1.0 },
      { mult: 2, gain: 0.5 },
      { mult: 3, gain: 0.25 },
      { mult: 4, gain: 0.1 },
      { mult: 5, gain: 0.04 }
    ];

    harmonics.forEach(h => {
      const osc = audioCtx.createOscillator();
      const hGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * h.mult, now);

      hGain.gain.setValueAtTime(h.gain, now);

      osc.connect(hGain);
      hGain.connect(noteGain);

      osc.start(now);
      osc.stop(now + duration);
    });

    // Warm Low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    noteGain.connect(filter);
    filter.connect(audioCtx.destination);
  }

  // Romantic chord progression & lyrical melody
  // Chords: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4/G7
  const notes = {
    C3: 130.81, G3: 196.00, B3: 246.94,
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00
  };

  const melodyScore = [
    // Bar 1: Cmaj7
    { notes: [notes.C3, notes.G3, notes.E4], time: 0, dur: 3.5, vol: 0.22 },
    { notes: [notes.B4], time: 0.2, dur: 1.8, vol: 0.25 },
    { notes: [notes.C5], time: 0.8, dur: 1.6, vol: 0.28 },
    { notes: [notes.G4], time: 1.4, dur: 1.8, vol: 0.22 },
    { notes: [notes.E4], time: 2.0, dur: 1.5, vol: 0.18 },

    // Bar 2: Am9
    { notes: [notes.C3, notes.A4], time: 2.8, dur: 3.5, vol: 0.22 },
    { notes: [notes.B4], time: 3.2, dur: 1.6, vol: 0.25 },
    { notes: [notes.C5], time: 3.8, dur: 1.8, vol: 0.28 },
    { notes: [notes.E5], time: 4.4, dur: 2.2, vol: 0.26 },
    { notes: [notes.D5], time: 5.2, dur: 1.5, vol: 0.20 },

    // Bar 3: Fmaj7
    { notes: [notes.C3, notes.F4, notes.A4], time: 6.0, dur: 3.5, vol: 0.22 },
    { notes: [notes.C5], time: 6.4, dur: 1.8, vol: 0.28 },
    { notes: [notes.A4], time: 7.0, dur: 1.6, vol: 0.22 },
    { notes: [notes.G4], time: 7.6, dur: 1.8, vol: 0.24 },
    { notes: [notes.A4], time: 8.2, dur: 1.5, vol: 0.20 },

    // Bar 4: G7sus4 -> G
    { notes: [notes.G3, notes.D4, notes.G4], time: 9.0, dur: 3.5, vol: 0.22 },
    { notes: [notes.B4], time: 9.4, dur: 1.6, vol: 0.26 },
    { notes: [notes.D5], time: 10.0, dur: 1.8, vol: 0.28 },
    { notes: [notes.C5], time: 10.8, dur: 2.5, vol: 0.30 }
  ];

  const loopLengthMs = 12000;

  function playMelodyLoop() {
    if (!isPlayingMusic) return;

    melodyScore.forEach(item => {
      item.notes.forEach(noteFreq => {
        playPianoNote(noteFreq, item.dur, item.time, item.vol);
      });
    });

    melodyTimeout = setTimeout(() => {
      if (isPlayingMusic) {
        playMelodyLoop();
      }
    }, loopLengthMs);
  }

  function toggleMusic() {
    initAudio();
    isPlayingMusic = !isPlayingMusic;

    if (isPlayingMusic) {
      musicToggleBtn.classList.add('playing');
      musicIcon.textContent = '🎶';
      musicLabel.textContent = 'Tắt nhạc';
      playMelodyLoop();
    } else {
      musicToggleBtn.classList.remove('playing');
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Bật nhạc';
      clearTimeout(melodyTimeout);
    }
  }

  musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });
});
