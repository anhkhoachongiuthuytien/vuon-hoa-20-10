/* ==========================================================
   CẢ MỘT VƯỜN THƯƠNG... | CHÚC MỪNG 20/10
   Designed to 100% replicate the viral TikTok aesthetic by Trịnh Hảo IT
   - Authentic acoustic guitar BGM (assets/music.mp3)
   - 45+ lush paper quilled roses and buds in pastel palette
   - Dynamic curved stems fanning outward with realistic leaves
   - Canvas drifting clouds, falling petals & fluttering leaves
   - Elegant vintage greeting card with smooth slide dismissal
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const canvas = document.getElementById('falling-leaves-canvas');
  const gardenContainer = document.getElementById('gardenContainer');
  const heroFlower = document.getElementById('heroFlower');
  const topTitle = document.getElementById('topTitle');
  const bottomMessage = document.getElementById('bottomMessage');
  const wakeGardenBtn = document.getElementById('wakeGardenBtn');
  const cardOverlay = document.getElementById('cardOverlay');
  const admireGardenBtn = document.getElementById('admireGardenBtn');
  const cardReopenBtn = document.getElementById('cardReopenBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const clickEffects = document.getElementById('clickEffects');

  // Check URL query parameters for custom recipient name (e.g. ?to=Thúy+Tiên or ?name=Em)
  const urlParams = new URLSearchParams(window.location.search);
  const recipientName = urlParams.get('to') || urlParams.get('name');
  if (recipientName) {
    const subtitle = document.querySelector('.card-subtitle');
    if (subtitle) {
      subtitle.textContent = `Gửi ${recipientName} thương mến,`;
    }
    if (topTitle) {
      topTitle.textContent = `Dành tặng ${recipientName}, cả một vườn thương.`;
    }
  }

  let gardenBloomed = false;

  // ==========================================================
  // 1. BACKGROUND MUSIC (ORIGINAL TIKTOK AUDIO)
  // ==========================================================
  let bgMusic = null;
  let isPlayingMusic = false;

  function initMusic() {
    if (!bgMusic) {
      bgMusic = new Audio('assets/music.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.75;

      bgMusic.addEventListener('play', () => {
        isPlayingMusic = true;
        musicToggleBtn.classList.add('playing');
        musicIcon.textContent = '🎶';
        musicLabel.textContent = 'Tắt nhạc';
      });

      bgMusic.addEventListener('pause', () => {
        isPlayingMusic = false;
        musicToggleBtn.classList.remove('playing');
        musicIcon.textContent = '🎵';
        musicLabel.textContent = 'Nhạc';
      });
    }

    bgMusic.play().catch(err => {
      console.log('Autoplay waiting for user gesture:', err);
    });
  }

  musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!bgMusic) {
      initMusic();
      return;
    }
    if (isPlayingMusic) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(e => console.log(e));
    }
  });

  // ==========================================================
  // 2. FALLING LEAVES & PETALS CANVAS
  // ==========================================================
  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Natural palette for falling leaves & rose petals
  const particleColors = [
    '#3e7e45', '#4f9457', '#5ca865', '#2f6935', // green leaves
    '#f7a6b8', '#fbcfe8', '#fed7aa', '#fde047', // petals: pink, blush, peach, yellow
    '#bae6fd', '#ddd6fe', '#ffffff'              // sky blue, lavender, white
  ];

  class FallingParticle {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.x = Math.random() * width;
      this.y = isInitial ? Math.random() * height : -20 - Math.random() * 40;
      this.size = 6 + Math.random() * 10;
      this.speedY = 0.65 + Math.random() * 1.25;
      this.speedX = -0.4 + Math.random() * 0.8;
      this.amplitude = 18 + Math.random() * 26;
      this.frequency = 0.012 + Math.random() * 0.018;
      this.phase = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = -0.02 + Math.random() * 0.04;
      this.tumble = Math.random() * Math.PI * 2;
      this.tumbleSpeed = 0.02 + Math.random() * 0.035;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.isLeaf = Math.random() > 0.4; // 60% leaves, 40% petals
      this.opacity = 0.5 + Math.random() * 0.45;
    }

    update(time) {
      this.y += this.speedY;
      this.x += Math.sin(time * this.frequency + this.phase) * 0.85 + this.speedX;
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
        // Pointed oval green leaf with central vein
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(this.size * 0.55, 0, 0, this.size);
        ctx.quadraticCurveTo(-this.size * 0.55, 0, 0, -this.size);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.8);
        ctx.lineTo(0, this.size * 0.8);
        ctx.stroke();
      } else {
        // Soft rounded rose petal
        ctx.moveTo(0, -this.size * 0.85);
        ctx.bezierCurveTo(this.size * 0.85, -this.size * 0.45, this.size * 0.85, this.size * 0.45, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.85, this.size * 0.45, -this.size * 0.85, -this.size * 0.45, 0, -this.size * 0.85);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particles = Array.from({ length: 34 }, () => new FallingParticle(true));

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
  // 3. FLOWER GARDEN GENERATION
  // ==========================================================
  const flowerCatalog = [
    { type: 'rose', file: 'assets/rose_pink.png', name: 'pink' },
    { type: 'rose', file: 'assets/rose_peach.png', name: 'peach' },
    { type: 'rose', file: 'assets/rose_coral.png', name: 'coral' },
    { type: 'rose', file: 'assets/rose_yellow.png', name: 'yellow' },
    { type: 'rose', file: 'assets/rose_green.png', name: 'green' },
    { type: 'rose', file: 'assets/rose_blue.png', name: 'blue' },
    { type: 'rose', file: 'assets/rose_purple.png', name: 'purple' },
    { type: 'bud', file: 'assets/rosebud_pink.png', name: 'bud-pink' },
    { type: 'bud', file: 'assets/rosebud_peach.png', name: 'bud-peach' },
    { type: 'bud', file: 'assets/rosebud_yellow.png', name: 'bud-yellow' },
    { type: 'bud', file: 'assets/rosebud_blue.png', name: 'bud-blue' }
  ];

  function createFlowerPlant(config) {
    const plant = document.createElement('div');
    plant.className = 'flower-plant garden-flower-sprouting';

    const stemHeight = config.height;
    const leftPos = config.left;
    const zIndex = config.zIndex;
    const scale = config.scale;
    const isBud = config.type === 'bud';
    const headSize = isBud ? Math.round(75 * scale) : Math.round(112 * scale);

    plant.style.left = `${leftPos}%`;
    plant.style.zIndex = zIndex;
    plant.style.setProperty('--grow-dur', `${config.growDur}s`);
    plant.style.setProperty('--grow-delay', `${config.growDelay}s`);

    // Inner stem wrap - handles outward lean and wind breeze sway
    const stemWrap = document.createElement('div');
    stemWrap.className = 'flower-stem-wrap stem-swaying';
    stemWrap.style.setProperty('--stem-height', `${stemHeight}px`);
    stemWrap.style.setProperty('--lean-angle', `${config.leanAngle}deg`);
    stemWrap.style.setProperty('--sway-min', `${config.swayMin}deg`);
    stemWrap.style.setProperty('--sway-max', `${config.swayMax}deg`);
    stemWrap.style.setProperty('--sway-dur', `${config.swayDur}s`);
    stemWrap.style.setProperty('--sway-delay', `${config.swayDelay}s`);

    const stem = document.createElement('div');
    stem.className = 'flower-stem';
    stem.style.setProperty('--stem-curve', `${config.stemCurve}deg`);
    stemWrap.appendChild(stem);

    // Leaves attached along stem
    if (config.hasLeftLeaf) {
      const leafL = document.createElement('div');
      leafL.className = 'flower-leaf leaf-left';
      leafL.style.setProperty('--leaf-w', `${Math.round(40 * scale)}px`);
      leafL.style.setProperty('--leaf-h', `${Math.round(36 * scale)}px`);
      leafL.style.setProperty('--leaf-pos', `${config.leafPosL}%`);
      leafL.style.setProperty('--leaf-rot', `${config.leafRotL}deg`);
      stemWrap.appendChild(leafL);
    }

    if (config.hasRightLeaf) {
      const leafR = document.createElement('div');
      leafR.className = 'flower-leaf leaf-right';
      leafR.style.setProperty('--leaf-w', `${Math.round(40 * scale)}px`);
      leafR.style.setProperty('--leaf-h', `${Math.round(36 * scale)}px`);
      leafR.style.setProperty('--leaf-pos-r', `${config.leafPosR}%`);
      leafR.style.setProperty('--leaf-rot-r', `${config.leafRotR}deg`);
      stemWrap.appendChild(leafR);
    }

    // Flower Head
    const headWrap = document.createElement('div');
    headWrap.className = 'flower-head-wrap';
    headWrap.style.setProperty('--head-size', `${headSize}px`);

    const headImg = document.createElement('img');
    headImg.src = config.imgSrc;
    headImg.alt = 'Hoa hồng';
    headImg.className = 'flower-head-img';
    headWrap.appendChild(headImg);

    stemWrap.appendChild(headWrap);
    plant.appendChild(stemWrap);

    // Click interactive effect
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

    // Start background music
    initMusic();

    // Fade bottom hint and message
    bottomMessage.classList.add('fade-out');
    topTitle.classList.add('fade-out');

    const windowH = window.innerHeight;
    const windowW = window.innerWidth;
    // Mobile: 42 flowers; Desktop: 60 flowers for thick, overflowing meadow
    const flowerCount = windowW < 600 ? 42 : 60;
    const flowersData = [];

    for (let i = 0; i < flowerCount; i++) {
      // Evenly distribute positions from left -4% to 104% with random jitter
      const left = ((i + 0.5) / flowerCount) * 108 - 4 + (Math.random() * 3 - 1.5);

      // Layer selection
      const layerRand = Math.random();
      let layer = 'mid';
      let zIndex = 11;
      let heightPercent = 0.5;
      let scale = 0.85;

      if (layerRand < 0.28) {
        // Back layer: taller stems, slightly smaller scale
        layer = 'back';
        zIndex = 8;
        heightPercent = 0.58 + Math.random() * 0.2;
        scale = 0.65 + Math.random() * 0.15;
      } else if (layerRand < 0.68) {
        // Mid layer
        layer = 'mid';
        zIndex = 11;
        heightPercent = 0.44 + Math.random() * 0.18;
        scale = 0.85 + Math.random() * 0.18;
      } else {
        // Front layer: shorter stems, lush large heads
        layer = 'front';
        zIndex = 16;
        heightPercent = 0.26 + Math.random() * 0.18;
        scale = 1.08 + Math.random() * 0.22;
      }

      // Fan out angle: stems on the left tilt left, stems on right tilt right
      const centerDist = left - 50; // -50 to +50
      const leanAngle = (centerDist * 0.38) + (Math.random() * 4 - 2);
      const stemCurve = (centerDist * 0.12) + (Math.random() * 3 - 1.5);

      const stemHeightPx = Math.round(windowH * heightPercent);

      // 75% full rose, 25% bud
      const isBud = Math.random() < 0.25;
      let selectedFlower;
      if (isBud) {
        const buds = flowerCatalog.filter(f => f.type === 'bud');
        selectedFlower = buds[Math.floor(Math.random() * buds.length)];
      } else {
        const roses = flowerCatalog.filter(f => f.type === 'rose');
        selectedFlower = roses[Math.floor(Math.random() * roses.length)];
      }

      flowersData.push({
        left: left,
        height: stemHeightPx,
        scale: scale,
        zIndex: zIndex,
        imgSrc: selectedFlower.file,
        type: selectedFlower.type,
        leanAngle: leanAngle,
        stemCurve: stemCurve,
        growDur: 1.4 + Math.random() * 0.8,
        growDelay: Math.random() * 1.5,
        swayDur: 3.6 + Math.random() * 2.2,
        swayDelay: -(Math.random() * 4),
        swayMin: -(2.5 + Math.random() * 1.8),
        swayMax: +(2.5 + Math.random() * 1.8),
        hasLeftLeaf: Math.random() > 0.2,
        hasRightLeaf: Math.random() > 0.2,
        leafPosL: 35 + Math.random() * 25,
        leafPosR: 20 + Math.random() * 25,
        leafRotL: Math.random() * 15 - 7,
        leafRotR: Math.random() * 15 - 7
      });
    }

    // Sort by zIndex so DOM rendering order is correct
    flowersData.sort((a, b) => a.zIndex - b.zIndex);

    flowersData.forEach(cfg => {
      const plantEl = createFlowerPlant(cfg);
      gardenContainer.appendChild(plantEl);
    });

    // Sparkle burst around the center
    createHeartSparkles(windowW / 2, windowH * 0.48);

    // After 2.8s of blooming, display the greeting card modal
    setTimeout(() => {
      showGreetingCard();
    }, 2800);
  }

  // Automatic bloom after 3.2s if user hasn't touched yet
  const autoBloomTimer = setTimeout(() => {
    bloomGarden();
  }, 3200);

  // User interactions to bloom
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
    if (!gardenBloomed) {
      clearTimeout(autoBloomTimer);
      bloomGarden();
    } else {
      createHeartSparkles(e.clientX, e.clientY);
    }
  });

  // ==========================================================
  // 4. GREETING CARD MODAL LOGIC
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
    createHeartSparkles(window.innerWidth / 2, window.innerHeight / 2);
  });

  cardReopenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showGreetingCard();
  });

  // ==========================================================
  // 5. INTERACTIVE PARTICLES & SPARKLES
  // ==========================================================
  const burstIcons = ['🌸', '✨', '💖', '🌷', '💕', '🌿', '⭐', '🌹'];

  function createHeartSparkles(x, y) {
    const count = 9;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'burst-particle';
      p.textContent = burstIcons[Math.floor(Math.random() * burstIcons.length)];

      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const distance = 45 + Math.random() * 65;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 25;

      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.setProperty('--rot', `${Math.random() * 180 - 90}deg`);
      p.style.fontSize = `${16 + Math.random() * 14}px`;

      clickEffects.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }
});
