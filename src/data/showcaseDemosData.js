/**
 * showcaseDemosData.js
 * نماذج المحاكاة والتفاعل المتقدمة لمختبر كودڤيرس (CodeVerse Showcase Lab):
 * 1. ملعب الشيدر التفاعلي (WebGL Plasma Shader)
 * 2. سرب الطيور الذكي (Boids Flocking AI)
 * 3. مستكشف الكسيريات التفاعلي (Mandelbrot & Julia Fractals)
 * 4. محاكي مدارات المجموعة الشمسية (Solar System 2D Canvas)
 * 5. محاكاة قماش الحرير الفيزيائي (Verlet Cloth Simulation)
 * 6. محرك المجسمات ثلاثية الأبعاد (Canvas 3D Wireframe Engine)
 * 7. الآلة الموسيقية ومرئي الطيف الصوتي (Web Audio Synth & Spectrum)
 * 8. الفيزياء الطباعية التفاعلية (Typographic Particle Physics)
 * 9. بطاقات التفاعل ثلاثية الأبعاد (Holographic 3D Cards)
 * 10. شبكة ترابط الجسيمات والجاذبية (Particle Constellation Network)
 *
 * جميع النماذج مبنية بـ HTML/CSS/JS صافي 100% بدون أي مكتبات خارجية أو صور.
 */

// ============================================================================
// 1. ملعب الشيدر التفاعلي (WebGL Plasma Shader)
// ============================================================================
export const WEBGL_SHADER_DEMO = {
  id: 'webgl-shader-plasma',
  title: 'ملعب الشيدر التفاعلي (WebGL Plasma)',
  category: 'WebGL & Shaders',
  difficulty: 'متقدم',
  isNew: true,
  description: 'محاكاة بصرية فائقة السرعة بـ WebGL Fragment Shader تحسب معادلات البلازما الضوئية لكل بكسل على كرت الشاشة بالتوازي، مع تحكم بالسرعة والتشويه وتغيير اللوحات اللونية.',
  tricksExplained: [
    {
      title: 'الحساب المتوازي لكل بكسل (Pixel Shaders)',
      concept: 'GPU Fragment Shaders',
      explanation: 'كرت الشاشة ينفذ كود الشيدر على ملايين البكسلات في نفس اللحظة عبر إحداثيات gl_FragCoord المطبّعة، مما يسمح بحسابات رياضية معقدة بمعدل 60 إطاراً في الثانية دون إجهاد المعالج المركزي.'
    },
    {
      title: 'تداخل الموجات لتوليد الضوضاء السائلة',
      concept: 'Domain Warping Math',
      explanation: 'يتم تشويه الفضاء الإحداثي بتراكب دوال sin و cos متعددة الترددات مع الإزاحة الإحداثية p += sin(p.yx * scale + time) لخلق مظهر السائل الكوني المتموج.'
    },
    {
      title: 'التحكم اللحظي عبر المتغيرات العامة (Uniforms)',
      concept: 'gl.uniform1f & gl.uniform2f',
      explanation: 'تمرير إحداثيات مؤشر الفأرة والزمن واللوحة اللونية من الجافاسكريبت مباشرة إلى الشيدر في كل إطار لمعالجة التفاعل اللمسي والحركي الفوري.'
    }
  ],
  code: {
    html: `<div class="shader-container">
  <div class="hud-panel">
    <div class="hud-row">
      <span class="hud-title">ملعب الشيدر (WebGL)</span>
      <div class="palette-group">
        <button id="pal-cyber" class="active">سيبراني</button>
        <button id="pal-aurora">شفق قطبي</button>
        <button id="pal-lava">حمم كونية</button>
      </div>
    </div>
    <div class="hud-row controls-row">
      <label>السرعة: <input type="range" id="speedRange" min="0.2" max="3" step="0.1" value="1.0" /></label>
      <label>التشوه: <input type="range" id="distortRange" min="0" max="5" step="0.2" value="2.0" /></label>
      <span class="hint-text">حرّك المؤشر لتوجيه مجال البلازما</span>
    </div>
  </div>
  <canvas id="shaderCanvas"></canvas>
  <div id="fallbackNotice" class="fallback-hidden">متصفحك لا يدعم WebGL، جاري عرض محاكاة بديلة.</div>
</div>`,
    css: `.shader-container {
  position: relative;
  width: 100%;
  height: 500px;
  background: #05070d;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
}
.hud-panel {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 10px 14px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  direction: rtl;
  color: #f8fafc;
}
.hud-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.hud-title {
  font-size: 13px;
  font-weight: bold;
  color: #14b8a6;
}
.palette-group {
  display: flex;
  gap: 6px;
}
.palette-group button {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}
.palette-group button.active {
  background: #0d9488;
  border-color: #14b8a6;
  color: #ffffff;
}
.controls-row {
  font-size: 11px;
  color: #94a3b8;
}
.controls-row label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.controls-row input[type="range"] {
  accent-color: #14b8a6;
  width: 90px;
}
.hint-text {
  font-size: 10px;
  color: #64748b;
  margin-right: auto;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.fallback-hidden {
  display: none;
}
.fallback-visible {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f43f5e;
  font-size: 14px;
  background: #0f172a;
}`,
    js: `// ثوابت يمكنك تعديلها لتغيير سلوك الشيدر (جرّب تغيير الأرقام هنا)
const DEFAULT_SPEED = 1.0;       // سرعة التدفق الأساسية
const DEFAULT_DISTORTION = 2.0;  // معامل تشويه الفضاء

const canvas = document.getElementById('shaderCanvas');
const speedRange = document.getElementById('speedRange');
const distortRange = document.getElementById('distortRange');
const palBtns = {
  cyber: document.getElementById('pal-cyber'),
  aurora: document.getElementById('pal-aurora'),
  lava: document.getElementById('pal-lava')
};

let currentPalette = 0; // 0: Cyber, 1: Aurora, 2: Lava
let animId = null;

// تجهيز سياق WebGL
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

if (!gl) {
  document.getElementById('fallbackNotice').className = 'fallback-visible';
} else {
  // كود شيدر الرؤوس البسيط (Fullscreen Quad)
  const vsSource = \`
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  \`;

  // كود شيدر البكسلات (Fragment Shader للبلازما المتوهجة)
  const fsSource = \`
    precision highp float;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_speed;
    uniform float u_distortion;
    uniform int u_palette;

    vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float distToMouse = length(st - mouse);
      float mouseInfluence = smoothstep(0.45, 0.0, distToMouse) * 1.4;

      float t = u_time * u_speed * 0.45;
      vec2 p = st * (2.8 + u_distortion);

      for(int i = 1; i < 5; i++) {
        float fi = float(i);
        p += vec2(
          sin(p.y * 1.2 + t * 0.45 + mouseInfluence) + cos(p.x * 0.85 + t * 0.35),
          cos(p.x * 1.15 - t * 0.4) + sin(p.y * 0.9 + t * 0.55)
        );
      }

      float val = 0.5 + 0.5 * sin(p.x + p.y + t);

      vec3 col;
      if (u_palette == 0) {
        col = palette(val, vec3(0.08, 0.08, 0.18), vec3(0.45, 0.35, 0.8), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
      } else if (u_palette == 1) {
        col = palette(val, vec3(0.04, 0.18, 0.12), vec3(0.2, 0.7, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.3, 0.6, 0.88));
      } else {
        col = palette(val, vec3(0.28, 0.08, 0.04), vec3(0.8, 0.38, 0.1), vec3(1.0, 0.85, 0.5), vec3(0.0, 0.15, 0.25));
      }

      gl_FragColor = vec4(col, 1.0);
    }
  \`;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(program);
  gl.useProgram(program);

  // إعداد مستطيل العرض
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1, -1,  1,
    -1,  1,  1, -1,  1,  1
  ]), gl.STATIC_DRAW);

  const posAttr = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  // مواقع المتغيرات
  const uRes = gl.getUniformLocation(program, 'u_resolution');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uSpeed = gl.getUniformLocation(program, 'u_speed');
  const uDistort = gl.getUniformLocation(program, 'u_distortion');
  const uPal = gl.getUniformLocation(program, 'u_palette');

  let mouseX = 0, mouseY = 0;
  function updateMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mouseX = (e.clientX - rect.left) * dpr;
    mouseY = (rect.height - (e.clientY - rect.top)) * dpr;
  }
  window.addEventListener('pointermove', updateMouse);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (canvas.clientWidth || 800) * dpr;
    const h = (canvas.clientHeight || 500) * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // تفعيل تبديل اللوحات
  function setPalette(idx, activeBtn) {
    currentPalette = idx;
    Object.values(palBtns).forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }
  palBtns.cyber.addEventListener('click', () => setPalette(0, palBtns.cyber));
  palBtns.aurora.addEventListener('click', () => setPalette(1, palBtns.aurora));
  palBtns.lava.addEventListener('click', () => setPalette(2, palBtns.lava));

  // حلقة الرسم المستمرة 60fps
  let startTime = performance.now();
  function render(now) {
    if (document.hidden) {
      animId = requestAnimationFrame(render);
      return;
    }
    const elapsed = (now - startTime) * 0.001;

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouseX || canvas.width * 0.5, mouseY || canvas.height * 0.5);
    gl.uniform1f(uTime, elapsed);
    gl.uniform1f(uSpeed, parseFloat(speedRange.value) || DEFAULT_SPEED);
    gl.uniform1f(uDistort, parseFloat(distortRange.value) || DEFAULT_DISTORTION);
    gl.uniform1i(uPal, currentPalette);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);

  window.addEventListener('beforeunload', () => {
    if (animId) cancelAnimationFrame(animId);
  });
}`
  }
};

// ============================================================================
// 2. سرب الطيور الذكي (Boids Flocking AI)
// ============================================================================
export const BOIDS_FLOCKING_DEMO = {
  id: 'boids-flocking-ai',
  title: 'سرب الطيور الذكي (Boids Flocking)',
  category: 'Canvas & AI Behavior',
  difficulty: 'متقدم',
  isNew: true,
  description: 'محاكاة خوارزمية كريغ رينولدز (Craig Reynolds) للذكاء الجمعي: سرب كائنات تتفاعل بثلاث قواعد فيزيائية (الانفصال، المحاذاة، والتماسك) وتستجيب لمؤشر الفأرة كصقر مفترس أو طعام متجمع.',
  tricksExplained: [
    {
      title: 'قواعد رينولدز الثلاث للذكاء السلوكي',
      concept: 'Separation, Alignment, Cohesion',
      explanation: 'كل طائر يراقب جيرانه فقط في محيط دائري؛ يبتعد عن القريبين جداً (الانفصال)، ويعدل سرعته لتطابق متوسط زملائه (المحاذاة)، وينجذب نحو مركز ثقل المجموعة (التماسك).'
    },
    {
      title: 'تقييد السرعة وقوة التوجيه (Vector Clamping)',
      concept: 'limit(velocity, maxSpeed)',
      explanation: 'لحساب التوجيه الانسيابي يُحسب الفرق بين السرعة المطلوبة والسرعة الحالية ويُقيد بقوة قصوى maxForce، مما يعطي الطيور حركة رشيقة تمنع التغيرات الفجائية الشاذة.'
    },
    {
      title: 'تأثير الذيول المتلاشية في Canvas',
      concept: 'Ghost Trail Fading',
      explanation: 'بدلاً من استخدام ctx.clearRect لمسح الشاشة، ندهن في كل إطار مستطيلاً أسود بشفافية صغيرة ctx.fillStyle = "rgba(8,12,20,0.22)"، فتبقى الإطارات السابقة متلاشية تدريجياً.'
    }
  ],
  code: {
    html: `<div class="boids-box">
  <div class="hud-top">
    <div class="hud-left">
      <span class="hud-title">سرب الطيور الذكي (Boids AI)</span>
      <span id="boidCountLabel" class="boid-badge">160 طائراً</span>
    </div>
    <div class="hud-right">
      <button id="modeToggle" class="mode-btn predator">الوضع: صقر مطارد 🦅</button>
      <button id="addBoidsBtn" class="action-btn">+ 40 طائراً</button>
      <button id="resetFlockBtn" class="action-btn">إعادة توزيع</button>
    </div>
  </div>
  <div class="hud-bottom">
    <label>الانفصال: <input type="range" id="sepRange" min="0.5" max="3" step="0.1" value="1.5" /></label>
    <label>المحاذاة: <input type="range" id="aliRange" min="0.5" max="3" step="0.1" value="1.2" /></label>
    <label>التماسك: <input type="range" id="cohRange" min="0.5" max="3" step="0.1" value="1.0" /></label>
  </div>
  <canvas id="boidsCanvas"></canvas>
</div>`,
    css: `.boids-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #080c14;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.hud-top, .hud-bottom {
  position: absolute;
  left: 12px;
  right: 12px;
  background: rgba(11, 16, 26, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #f8fafc;
  font-size: 12px;
}
.hud-top { top: 12px; }
.hud-bottom {
  bottom: 12px;
  justify-content: center;
  gap: 20px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.boid-badge {
  background: rgba(20, 184, 166, 0.15);
  color: #14b8a6;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 6px;
  font-family: monospace;
}
.mode-btn, .action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}
.mode-btn.predator {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #fca5a5;
}
.mode-btn.attractor {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  color: #6ee7b7;
}
.hud-bottom label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 11px;
}
.hud-bottom input[type="range"] {
  accent-color: #14b8a6;
  width: 80px;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
    js: `// ثوابت السرب الأساسية (جرّب تغيير الأرقام هنا)
const INITIAL_BOIDS = 160;   // عدد الطيور الابتدائي
const MAX_SPEED = 3.6;       // أقصى سرعة للطائر
const MAX_FORCE = 0.09;      // أقصى قوة دوران وتوجيه
const VISION_RADIUS = 50;    // نصف قطر مجال رؤية الجيران

const canvas = document.getElementById('boidsCanvas');
const ctx = canvas.getContext('2d');
const countLabel = document.getElementById('boidCountLabel');
const modeBtn = document.getElementById('modeToggle');
const addBtn = document.getElementById('addBoidsBtn');
const resetBtn = document.getElementById('resetFlockBtn');
const sepRange = document.getElementById('sepRange');
const aliRange = document.getElementById('aliRange');
const cohRange = document.getElementById('cohRange');

let width, height;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.width = (canvas.clientWidth || 800) * dpr;
  height = canvas.height = (canvas.clientHeight || 500) * dpr;
}
window.addEventListener('resize', resize);
resize();

// حالة المؤشر
const mouse = { x: -1000, y: -1000, active: false };
let isPredator = true;

window.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  mouse.x = (e.clientX - rect.left) * dpr;
  mouse.y = (e.clientY - rect.top) * dpr;
  mouse.active = true;
});
window.addEventListener('pointerleave', () => { mouse.active = false; });

modeBtn.addEventListener('click', () => {
  isPredator = !isPredator;
  modeBtn.textContent = isPredator ? 'الوضع: صقر مطارد 🦅' : 'الوضع: طُعم طعام 🍏';
  modeBtn.className = 'mode-btn ' + (isPredator ? 'predator' : 'attractor');
});

// صنف الطائر (Boid)
class Boid {
  constructor(x, y) {
    this.x = x ?? Math.random() * width;
    this.y = y ?? Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * 2;
    this.vy = Math.sin(angle) * 2;
    this.ax = 0;
    this.ay = 0;
    this.size = Math.random() * 2 + 3.5;
    this.color = Math.random() > 0.3 ? '#14b8a6' : '#38bdf8';
  }

  applyForce(fx, fy) {
    this.ax += fx;
    this.ay += fy;
  }

  flock(boids, sepW, aliW, cohW) {
    let sepX = 0, sepY = 0, sepCount = 0;
    let aliX = 0, aliY = 0, aliCount = 0;
    let cohX = 0, cohY = 0, cohCount = 0;

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i];
      if (other === this) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < VISION_RADIUS) {
        // 1. الانفصال
        if (dist < VISION_RADIUS * 0.5) {
          sepX += dx / dist;
          sepY += dy / dist;
          sepCount++;
        }
        // 2. المحاذاة
        aliX += other.vx;
        aliY += other.vy;
        aliCount++;
        // 3. التماسك
        cohX += other.x;
        cohY += other.y;
        cohCount++;
      }
    }

    if (sepCount > 0) {
      sepX /= sepCount; sepY /= sepCount;
      const mag = Math.hypot(sepX, sepY);
      if (mag > 0) {
        this.applyForce((sepX / mag * MAX_SPEED - this.vx) * MAX_FORCE * sepW,
                        (sepY / mag * MAX_SPEED - this.vy) * MAX_FORCE * sepW);
      }
    }

    if (aliCount > 0) {
      aliX /= aliCount; aliY /= aliCount;
      const mag = Math.hypot(aliX, aliY);
      if (mag > 0) {
        this.applyForce((aliX / mag * MAX_SPEED - this.vx) * MAX_FORCE * aliW,
                        (aliY / mag * MAX_SPEED - this.vy) * MAX_FORCE * aliW);
      }
    }

    if (cohCount > 0) {
      cohX /= cohCount; cohY /= cohCount;
      const desX = cohX - this.x;
      const desY = cohY - this.y;
      const mag = Math.hypot(desX, desY);
      if (mag > 0) {
        this.applyForce((desX / mag * MAX_SPEED - this.vx) * MAX_FORCE * cohW,
                        (desY / mag * MAX_SPEED - this.vy) * MAX_FORCE * cohW);
      }
    }

    // تفاعل الماوس
    if (mouse.active) {
      const mdx = this.x - mouse.x;
      const mdy = this.y - mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < 140 && mdist > 0) {
        const factor = isPredator ? (140 - mdist) / 140 * 3.5 : -(140 - mdist) / 140 * 2.0;
        this.applyForce((mdx / mdist) * factor, (mdy / mdist) * factor);
      }
    }
  }

  update() {
    this.vx += this.ax;
    this.vy += this.ay;
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > MAX_SPEED) {
      this.vx = (this.vx / speed) * MAX_SPEED;
      this.vy = (this.vy / speed) * MAX_SPEED;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    // التفاف الحواف
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx) {
    const angle = Math.atan2(this.vy, this.vx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.size * 2, 0);
    ctx.lineTo(-this.size, -this.size * 0.8);
    ctx.lineTo(-this.size * 0.4, 0);
    ctx.lineTo(-this.size, this.size * 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

let boids = Array.from({ length: INITIAL_BOIDS }, () => new Boid());

addBtn.addEventListener('click', () => {
  for (let i = 0; i < 40; i++) boids.push(new Boid(width * 0.5, height * 0.5));
  countLabel.textContent = boids.length + ' طائراً';
});

resetBtn.addEventListener('click', () => {
  boids = Array.from({ length: INITIAL_BOIDS }, () => new Boid());
  countLabel.textContent = boids.length + ' طائراً';
});

let animId = null;
function loop() {
  if (document.hidden) {
    animId = requestAnimationFrame(loop);
    return;
  }

  // رسم خلفية شبه شفافة لصنع الذيول
  ctx.fillStyle = 'rgba(8, 12, 20, 0.22)';
  ctx.fillRect(0, 0, width, height);

  // رسم مؤشر الصقر أو الطعام
  if (mouse.active) {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, isPredator ? 18 : 10, 0, Math.PI * 2);
    ctx.fillStyle = isPredator ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.35)';
    ctx.fill();
    ctx.strokeStyle = isPredator ? '#ef4444' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const sepW = parseFloat(sepRange.value) || 1.5;
  const aliW = parseFloat(aliRange.value) || 1.2;
  const cohW = parseFloat(cohRange.value) || 1.0;

  for (let i = 0; i < boids.length; i++) {
    boids[i].flock(boids, sepW, aliW, cohW);
    boids[i].update();
    boids[i].draw(ctx);
  }

  animId = requestAnimationFrame(loop);
}
animId = requestAnimationFrame(loop);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// 3. مستكشف الكسيريات التفاعلي (Mandelbrot & Julia Fractals)
// ============================================================================
export const FRACTAL_EXPLORER_DEMO = {
  id: 'mandelbrot-fractal-explorer',
  title: 'مستكشف الكسيريات التفاعلي (Mandelbrot & Julia)',
  category: 'Math & Canvas',
  difficulty: 'متقدم',
  isNew: true,
  description: 'استكشاف لانهائي لأعماق مجموعة ماندلبروت والتحويل الفوري لمجموعات جوليا، مع تكبير سلس بالسحب وعجلة الفأرة، وتلوين لوغاريتمي فائق النعومة.',
  tricksExplained: [
    {
      title: 'معادلة الهروب الكسيرية z = z² + c',
      concept: 'Complex Quadratic Mapping',
      explanation: 'اختبار استقرار الأعداد المركبة بتكرار المعادلة؛ إذا تجاوز معيار العدد |z| > 2 يعتبر هارباً نحو اللانهاية، وعدد الخطوات اللازمة للهروب يحدد لون البكسل.'
    },
    {
      title: 'التلوين اللوغاريتمي فائق النعومة',
      concept: 'Smooth Continuous Coloring',
      explanation: 'استخدام معادلة التحويل اللوغاريتمي i - ln(ln(|z|))/ln(2) لتحويل عدد التكرارات من أرقام صحيحة إلى قيم كسرية عائمة تمنع ظهور خطوط القفز اللوني الحادة.'
    },
    {
      title: 'الرسم المرحلي التدريجي (Progressive Rendering)',
      concept: 'Multi-resolution Rendering',
      explanation: 'خفض دقة الحساب أثناء تحريك الفأرة أو التكبير لضمان 60 إطاراً في الثانية دون تجمد، ثم إكمال الرسم بأعلى دقة فور توقف المؤشر.'
    }
  ],
  code: {
    html: `<div class="fractal-box">
  <div class="hud-bar">
    <div class="hud-group">
      <span class="hud-title">مستكشف الكسيريات</span>
      <button id="toggleFractalType" class="btn-primary">النمط: ماندلبروت (Mandelbrot)</button>
    </div>
    <div class="hud-group">
      <button id="zoomInBtn" class="btn-icon" title="تكبير">+</button>
      <button id="zoomOutBtn" class="btn-icon" title="تصغير">−</button>
      <button id="resetViewBtn" class="btn-secondary">إعادة ضبط</button>
      <span id="coordsDisplay" class="coords-tag">Zoom: 1.0x</span>
    </div>
  </div>
  <canvas id="fractalCanvas"></canvas>
  <div class="hud-footer">اسحب للتحريك • استخدم عجلة الفأرة للتكبير في أي نقطة</div>
</div>`,
    css: `.fractal-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #020408;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.hud-bar {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  background: rgba(10, 15, 26, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #f8fafc;
  font-size: 12px;
}
.hud-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.btn-primary {
  background: #0d9488;
  border: none;
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.btn-secondary, .btn-icon {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
}
.btn-icon {
  font-size: 14px;
  font-weight: bold;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coords-tag {
  font-family: monospace;
  font-size: 11px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}
.hud-footer {
  position: absolute;
  bottom: 10px;
  right: 14px;
  font-size: 11px;
  color: #64748b;
  pointer-events: none;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}
canvas:active {
  cursor: grabbing;
}`,
    js: `// ثوابت الكسيرية (جرّب تغيير التكرارات أو سرعة الزوم هنا)
const MAX_ITER = 85;         // عدد التكرارات القصوى لدقة الحواف
const ZOOM_FACTOR = 1.35;    // معامل تكبير كل نقرة

const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('toggleFractalType');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetBtn = document.getElementById('resetViewBtn');
const coordsTag = document.getElementById('coordsDisplay');

let isJulia = false;
let juliaCr = -0.7;
let juliaCi = 0.27015;

// مجال العرض المركب
let centerX = -0.5;
let centerY = 0.0;
let scale = 3.0; // العرض في الفضاء المركب

function resetView() {
  if (isJulia) {
    centerX = 0; centerY = 0; scale = 2.8;
  } else {
    centerX = -0.5; centerY = 0; scale = 3.0;
  }
  scheduleRender();
}

toggleBtn.addEventListener('click', () => {
  isJulia = !isJulia;
  toggleBtn.textContent = isJulia ? 'النمط: مجموعة جوليا (Julia Set)' : 'النمط: ماندلبروت (Mandelbrot)';
  resetView();
});

let width, height;
function resize() {
  width = canvas.width = canvas.clientWidth || 800;
  height = canvas.height = canvas.clientHeight || 500;
  scheduleRender();
}
window.addEventListener('resize', resize);
resize();

// رسم الكسيرية
function renderFractal(step = 1) {
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const aspect = width / height;
  const xMin = centerX - (scale * aspect) * 0.5;
  const xMax = centerX + (scale * aspect) * 0.5;
  const yMin = centerY - scale * 0.5;
  const yMax = centerY + scale * 0.5;

  const xStep = (xMax - xMin) / width;
  const yStep = (yMax - yMin) / height;

  for (let py = 0; py < height; py += step) {
    const c_im = yMin + py * yStep;
    for (let px = 0; px < width; px += step) {
      const c_re = xMin + px * xStep;

      let z_re = isJulia ? c_re : 0;
      let z_im = isJulia ? c_im : 0;
      const k_re = isJulia ? juliaCr : c_re;
      const k_im = isJulia ? juliaCi : c_im;

      let n = 0;
      let z2_re = z_re * z_re;
      let z2_im = z_im * z_im;

      while (z2_re + z2_im <= 4.0 && n < MAX_ITER) {
        z_im = 2.0 * z_re * z_im + k_im;
        z_re = z2_re - z2_im + k_re;
        z2_re = z_re * z_re;
        z2_im = z_im * z_im;
        n++;
      }

      let r = 0, g = 0, b = 0;
      if (n < MAX_ITER) {
        // تلوين لوغاريتمي سلس
        const nu = Math.log(Math.log(z2_re + z2_im) * 0.5) / Math.LN2;
        const iter = n + 1 - nu;
        const t = iter / MAX_ITER;

        r = Math.floor(Math.sin(t * 7 + 0.5) * 127 + 128);
        g = Math.floor(Math.sin(t * 7 + 2.0) * 127 + 128);
        b = Math.floor(Math.sin(t * 7 + 3.8) * 127 + 128);
      }

      // ملء البكسل
      for (let dy = 0; dy < step && py + dy < height; dy++) {
        for (let dx = 0; dx < step && px + dx < width; dx++) {
          const idx = ((py + dy) * width + (px + dx)) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const zoomLevel = (3.0 / scale).toFixed(1);
  coordsTag.textContent = 'Zoom: ' + zoomLevel + 'x';
}

let renderTimer = null;
function scheduleRender() {
  renderFractal(2); // معاينة سريعة
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    renderFractal(1); // دقة فائقة كاملة
  }, 60);
}

// السحب للتنقل
let isDragging = false;
let startX, startY;

canvas.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  startX = e.clientX;
  startY = e.clientY;

  const aspect = width / height;
  centerX -= (dx / width) * (scale * aspect);
  centerY -= (dy / height) * scale;
  scheduleRender();
});

window.addEventListener('pointerup', () => { isDragging = false; });

// التكبير بعجلة الفأرة
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const factor = e.deltaY < 0 ? (1 / ZOOM_FACTOR) : ZOOM_FACTOR;
  scale *= factor;
  scheduleRender();
}, { passive: false });

zoomInBtn.addEventListener('click', () => { scale /= ZOOM_FACTOR; scheduleRender(); });
zoomOutBtn.addEventListener('click', () => { scale *= ZOOM_FACTOR; scheduleRender(); });
resetBtn.addEventListener('click', resetView);

resetView();
`
  }
};

// ============================================================================
// 4. محاكي مدارات المجموعة الشمسية (Solar System 2D Canvas)
// ============================================================================
export const SOLAR_SYSTEM_DEMO = {
  id: 'solar-system-simulator',
  title: 'محاكي مدارات المجموعة الشمسية',
  category: 'Canvas & Physics',
  difficulty: 'متقدم',
  description: 'محاكاة رياضية لحركة الأجرام السماوية حول المركز باستخدام معادلات المثلثات، مع تحكم بالزمن وعرض بيانات الكواكب.',
  tricksExplained: [
    {
      title: 'الحركة الدائرية بالدوال المثلثية',
      concept: 'Math.cos & Math.sin',
      explanation: 'يتم تمثيل مسار كل كوكب بزاوية ومسافة نصف قطرية ثابتة. في كل إطار يُحسب الموضع الجديد بالإحداثيات الديكارتية: x = cx + cos(angle) * r و y = cy + sin(angle) * r.'
    },
    {
      title: 'السرعات النسبية لقوانين كبلر',
      concept: 'Angular Velocity',
      explanation: 'تتناسب السرعة الزاوية عكسياً مع المسافة المدارية، فالكواكب القريبة تدور بسرعة أعلى بكثير من الكواكب البعيدة، ويتم ضرب السرعة في مقياس الزمن لتعديل وتيرة الحركة.'
    },
    {
      title: 'محاكاة التوهج الشمسي الدائري',
      concept: 'createRadialGradient',
      explanation: 'بناء تدرج إشعاعي لوني متعدد التوقفات ينطلق من مركز النجم بلون أبيض دافئ ويتلاشى بسلاسة تامة نحو الشفافية على الحواف.'
    }
  ],
  code: {
    html: `<div class="solar-ui">
  <div class="controls-bar">
    <div class="speed-control">
      <label>مقياس الزمن: <span id="speedVal">1.0x</span></label>
      <input type="range" id="speedRange" min="0" max="4" step="0.1" value="1" />
    </div>
    <button id="toggleOrbits">المسارات المدارية: مفعلة</button>
    <div id="planetInfo">انقر على أي كوكب لعرض بياناته</div>
  </div>
  <canvas id="solarCanvas"></canvas>
</div>`,
    css: `.solar-ui {
  position: relative;
  width: 100%;
  height: 500px;
  background: #090d14;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.controls-bar {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(20, 184, 166, 0.25);
  z-index: 10;
  font-size: 12px;
  color: #f8fafc;
}
.speed-control {
  display: flex;
  align-items: center;
  gap: 8px;
}
.speed-control input {
  accent-color: #14b8a6;
  width: 90px;
}
.controls-bar button {
  background: #0d9488;
  color: #ffffff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 11px;
}
#planetInfo {
  color: #14b8a6;
  font-weight: 600;
  background: rgba(13, 148, 136, 0.12);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}`,
    js: `const canvas = document.getElementById('solarCanvas');
const ctx = canvas.getContext('2d');
const speedInput = document.getElementById('speedRange');
const speedVal = document.getElementById('speedVal');
const orbitBtn = document.getElementById('toggleOrbits');
const infoSpan = document.getElementById('planetInfo');

let showOrbits = true;
let selectedPlanet = null;

function resize() {
  canvas.width = canvas.clientWidth || 800;
  canvas.height = canvas.clientHeight || 500;
}
window.addEventListener('resize', resize);
resize();
setTimeout(resize, 60);

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.2 + 0.3,
  alpha: Math.random()
}));

const planets = [
  { name: 'عطارد (Mercury)', radius: 4.5, dist: 55, speed: 0.038, angle: 0.2, color: '#94a3b8', info: 'أقرب كوكب للشمس ويستغرق مداره 88 يوماً فقط.' },
  { name: 'الزهرة (Venus)', radius: 6.5, dist: 85, speed: 0.026, angle: 1.4, color: '#fbbf24', info: 'ذو غلاف جوي كثيف يسبب احتباساً حرارياً شديداً.' },
  { name: 'الأرض (Earth)', radius: 7.5, dist: 120, speed: 0.018, angle: 2.8, color: '#38bdf8', hasMoon: true, info: 'كوكبنا المائي الذي يحتضن الغلاف الجوي الحيوي.' },
  { name: 'المريخ (Mars)', radius: 5.5, dist: 158, speed: 0.013, angle: 4.1, color: '#ef4444', info: 'الكوكب الصخري الأحمر ذو التضاريس والبراكين الشاهقة.' },
  { name: 'المشتري (Jupiter)', radius: 13, dist: 205, speed: 0.008, angle: 5.0, color: '#d97706', info: 'أكبر كواكب المجموعة حجماً وكتلة بحجم يتسع لـ 1300 كوكب أرضي.' },
  { name: 'زحل (Saturn)', radius: 11, dist: 250, speed: 0.0055, angle: 0.9, color: '#fde047', hasRings: true, info: 'يتميز بمنظومة حلقات جليدية وصخرية واسعة.' }
];

speedInput.addEventListener('input', () => {
  speedVal.textContent = parseFloat(speedInput.value).toFixed(1) + 'x';
});

orbitBtn.addEventListener('click', () => {
  showOrbits = !showOrbits;
  orbitBtn.textContent = showOrbits ? 'المسارات المدارية: مفعلة' : 'المسارات المدارية: مخفية';
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  let clicked = null;
  planets.forEach(p => {
    const px = cx + Math.cos(p.angle) * p.dist;
    const py = cy + Math.sin(p.angle) * p.dist;
    const d = Math.hypot(mx - px, my - py);
    if (d < p.radius + 12) clicked = p;
  });

  selectedPlanet = clicked;
  if (clicked) {
    infoSpan.textContent = clicked.name + ': ' + clicked.info;
  } else {
    infoSpan.textContent = 'انقر على أي كوكب لعرض بياناته';
  }
});

let animId = null;
function animate() {
  if (document.hidden) {
    animId = requestAnimationFrame(animate);
    return;
  }

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const timeScale = parseFloat(speedInput.value);

  ctx.fillStyle = '#060910';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // النجوم
  stars.forEach(s => {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + (s.alpha * 0.7) + ')';
    ctx.fillRect(s.x * canvas.width, s.y * canvas.height, s.r, s.r);
  });

  // المدارات
  if (showOrbits) {
    planets.forEach(p => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  // الشمس
  const sunGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 34);
  sunGrad.addColorStop(0, '#ffffff');
  sunGrad.addColorStop(0.3, '#fef08a');
  sunGrad.addColorStop(0.6, '#f59e0b');
  sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 34, 0, Math.PI * 2);
  ctx.fill();

  // الكواكب
  planets.forEach(p => {
    p.angle += p.speed * timeScale;
    const px = cx + Math.cos(p.angle) * p.dist;
    const py = cy + Math.sin(p.angle) * p.dist;

    if (selectedPlanet === p) {
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, p.radius + 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (p.hasRings) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(0.35);
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.radius + 8, p.radius - 4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.radius, 0, Math.PI * 2);
    ctx.fill();

    if (p.hasMoon) {
      const mx = px + Math.cos(p.angle * 6) * 13;
      const my = py + Math.sin(p.angle * 6) * 13;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  animId = requestAnimationFrame(animate);
}
animId = requestAnimationFrame(animate);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// 5. محاكاة قماش الحرير الفيزيائي (Verlet Cloth Simulation)
// ============================================================================
export const VERLET_CLOTH_DEMO = {
  id: 'verlet-cloth-physics',
  title: 'محاكاة قماش الحرير الفيزيائي (Verlet Cloth)',
  category: 'Physics Simulation',
  difficulty: 'متقدم',
  isNew: true,
  description: 'محاكاة فيزيائية واقعية لشبكة قماش مرنة تعتمد على تكامل فيرليه: سحب القماش بالماوس، تمزيق الخيوط بالنقر والسحب، والتفاعل مع الرياح والجاذبية الأرضية.',
  tricksExplained: [
    {
      title: 'تكامل فيرليه للحركة (Verlet Integration)',
      concept: 'x_new = 2x - x_old + a * dt²',
      explanation: 'حساب موقع الجسيم من موقعه الحالي والسابق بدلاً من تخزين السرعة بشكل صريح؛ هذا يمنح النظام ثباتاً فيزيائياً فائقاً ودقة عالية في محاكاة الأقمشة والحبال.'
    },
    {
      title: 'استرخاء القيود المتكرر (Constraint Relaxation)',
      concept: 'Relaxation Iterations',
      explanation: 'تكرار ضبط المسافة بين كل نقطتين متصلتين نحو طولها الطبيعي عدة مرات في كل إطار؛ زيادة عدد التكرارات تجعل القماش مشدوداً كالحرير، بينما تقليله يجعله مطاطياً كالهلام.'
    },
    {
      title: 'كشف التقطيع وتقاطع المسار (Cloth Tearing)',
      concept: 'Line Segment Intersection',
      explanation: 'عند السحب في وضع التمزيق، يتم فحص تقاطع خط حركة مؤشر الفأرة مع أوتار القماش وحذف الرابط المصاب فوراً، مما يسمح بتمزيق القماش فيزيائياً بشكل طبيعي.'
    }
  ],
  code: {
    html: `<div class="cloth-box">
  <div class="hud-top">
    <div class="hud-left">
      <span class="hud-title">قماش الحرير الفيزيائي (Verlet)</span>
      <button id="toolModeBtn" class="mode-btn drag">الوضع: سحب وتلويح ✋</button>
    </div>
    <div class="hud-right">
      <label>الرياح: <input type="range" id="windRange" min="0" max="2" step="0.1" value="0.4" /></label>
      <button id="resetClothBtn" class="action-btn">إعادة نسج القماش</button>
    </div>
  </div>
  <canvas id="clothCanvas"></canvas>
  <div class="hud-tip">اسحب للتلويح بالقماش • بدّل إلى وضع التمزيق لقص الخيوط بحرية</div>
</div>`,
    css: `.cloth-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #060910;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.hud-top {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  background: rgba(11, 15, 25, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #f8fafc;
  font-size: 12px;
}
.hud-left, .hud-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.mode-btn {
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.mode-btn.drag {
  background: rgba(20, 184, 166, 0.2);
  border-color: #14b8a6;
  color: #5eead4;
}
.mode-btn.cut {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #fca5a5;
}
.action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
}
.hud-right label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 11px;
}
.hud-right input[type="range"] {
  accent-color: #14b8a6;
  width: 75px;
}
.hud-tip {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 11px;
  color: #64748b;
  pointer-events: none;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
    js: `// ثوابت شبكة القماش (جرّب تعديل الأبعاد والجاذبية هنا)
const CLOTH_COLS = 34;       // عدد أعمدة نقاط القماش
const CLOTH_ROWS = 22;       // عدد صفوف نقاط القماش
const SPACING = 14;          // المسافة بين كل نقطتين
const GRAVITY = 0.25;        // قوة الجاذبية للأسفل
const RELAX_STEPS = 4;       // تكرارات شد القماش

const canvas = document.getElementById('clothCanvas');
const ctx = canvas.getContext('2d');
const modeBtn = document.getElementById('toolModeBtn');
const windRange = document.getElementById('windRange');
const resetBtn = document.getElementById('resetClothBtn');

let isCutMode = false;
modeBtn.addEventListener('click', () => {
  isCutMode = !isCutMode;
  modeBtn.textContent = isCutMode ? 'الوضع: تمزيق وقص ✂️' : 'الوضع: سحب وتلويح ✋';
  modeBtn.className = 'mode-btn ' + (isCutMode ? 'cut' : 'drag');
});

let width, height;
function resize() {
  width = canvas.width = canvas.clientWidth || 800;
  height = canvas.height = canvas.clientHeight || 500;
}
window.addEventListener('resize', resize);
resize();

class Point {
  constructor(x, y, pinned = false) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.pinned = pinned;
  }

  update(wind) {
    if (this.pinned) return;
    const vx = (this.x - this.oldX) * 0.985;
    const vy = (this.y - this.oldY) * 0.985;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += vx + wind;
    this.y += vy + GRAVITY;
  }
}

class Link {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = SPACING;
    this.active = true;
  }

  solve() {
    if (!this.active) return;
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    const diff = (this.length - dist) / dist;

    // تمزيق تلقائي عند الشد الهائل
    if (dist > SPACING * 4.5) {
      this.active = false;
      return;
    }

    const offsetX = dx * diff * 0.5;
    const offsetY = dy * diff * 0.5;

    if (!this.p1.pinned) { this.p1.x -= offsetX; this.p1.y -= offsetY; }
    if (!this.p2.pinned) { this.p2.x += offsetX; this.p2.y += offsetY; }
  }

  draw(ctx) {
    if (!this.active) return;
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const dist = Math.hypot(dx, dy);
    const strain = dist / this.length;

    // لون يتغير مع الشد
    ctx.strokeStyle = strain > 1.8 ? '#ef4444' : strain > 1.2 ? '#f59e0b' : '#14b8a6';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}

let points = [];
let links = [];

function initCloth() {
  points = [];
  links = [];
  const startX = Math.max(20, (width - (CLOTH_COLS - 1) * SPACING) / 2);
  const startY = 60;

  for (let r = 0; r < CLOTH_ROWS; r++) {
    for (let c = 0; c < CLOTH_COLS; c++) {
      const isPinned = (r === 0 && (c % 4 === 0 || c === CLOTH_COLS - 1));
      points.push(new Point(startX + c * SPACING, startY + r * SPACING, isPinned));
    }
  }

  for (let r = 0; r < CLOTH_ROWS; r++) {
    for (let c = 0; c < CLOTH_COLS; c++) {
      const idx = r * CLOTH_COLS + c;
      if (c < CLOTH_COLS - 1) links.push(new Link(points[idx], points[idx + 1]));
      if (r < CLOTH_ROWS - 1) links.push(new Link(points[idx], points[idx + CLOTH_COLS]));
    }
  }
}
initCloth();
resetBtn.addEventListener('click', initCloth);

// تفاعل الماوس
const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, isDown: false };

canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = mouse.prevX = e.clientX - rect.left;
  mouse.y = mouse.prevY = e.clientY - rect.top;
  mouse.isDown = true;
});

window.addEventListener('pointermove', (e) => {
  if (!mouse.isDown) return;
  const rect = canvas.getBoundingClientRect();
  mouse.prevX = mouse.x;
  mouse.prevY = mouse.y;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  if (isCutMode) {
    // قص الخيوط المارة
    links.forEach(link => {
      if (!link.active) return;
      const d = Math.hypot((link.p1.x + link.p2.x) / 2 - mouse.x, (link.p1.y + link.p2.y) / 2 - mouse.y);
      if (d < 16) link.active = false;
    });
  } else {
    // سحب النقاط القريبة
    points.forEach(p => {
      const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (d < 35 && !p.pinned) {
        p.x += (mouse.x - mouse.prevX) * 1.2;
        p.y += (mouse.y - mouse.prevY) * 1.2;
      }
    });
  }
});

window.addEventListener('pointerup', () => { mouse.isDown = false; });

let animId = null;
let windPhase = 0;

function loop() {
  if (document.hidden) {
    animId = requestAnimationFrame(loop);
    return;
  }

  ctx.fillStyle = '#060910';
  ctx.fillRect(0, 0, width, height);

  windPhase += 0.04;
  const windStrength = parseFloat(windRange.value);
  const currentWind = Math.sin(windPhase) * windStrength * 0.45;

  points.forEach(p => p.update(currentWind));
  for (let s = 0; s < RELAX_STEPS; s++) {
    links.forEach(l => l.solve());
  }
  links.forEach(l => l.draw(ctx));

  animId = requestAnimationFrame(loop);
}
animId = requestAnimationFrame(loop);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// 6. محرك المجسمات ثلاثية الأبعاد (Canvas 3D Wireframe Engine)
// ============================================================================
export const WIREFRAME_3D_DEMO = {
  id: 'wireframe-3d-engine',
  title: 'محرك المجسمات ثلاثية الأبعاد (Canvas 3D Engine)',
  category: 'Math & 3D',
  difficulty: 'متقدم',
  isNew: true,
  description: 'محرك رسوم ثلاثي الأبعاد كامل على Canvas 2D دون WebGL: مصفوفات الدوران والإسقاط المنظوري، مع دوران بالقصور الذاتي والتحول السلس (Morphing) بين أربعة مجسمات هندسية.',
  tricksExplained: [
    {
      title: 'مصفوفات الدوران ثلاثية الأبعاد (3D Rotation)',
      concept: 'Euler Rotation Matrices',
      explanation: 'تدوير أي نقطة (x, y, z) حول المحاور الثلاثة باستخدام ضرب المتجهات بدوال sin و cos؛ مما يتيح تدوير المجسم حراً في الفضاء مع الاحتفاظ بأبعاده الدقيقة.'
    },
    {
      title: 'الإسقاط المنظوري (Perspective Projection)',
      concept: 'x_2d = x * fov / (z + cameraDist)',
      explanation: 'تحويل إحداثيات الفضاء ثلاثي الأبعاد إلى شاشة ثنائية الأبعاد عبر قسمة الإحداثيات على العمق z؛ فالأوجه القريبة تكبر والأوجه البعيدة تصغر لتبدو ثلاثية الأبعاد.'
    },
    {
      title: 'التحول الهندسي التدريجي (Vertex Morphing)',
      concept: 'Linear Interpolation (lerp)',
      explanation: 'عند تبديل المجسم، لا نقفز فجأة للشكل الجديد، بل نطبق الاستيفاء الخطي p.curr += (p.target - p.curr) * 0.08 على جميع الرؤوس لتنساب بسلاسة.'
    }
  ],
  code: {
    html: `<div class="engine-box">
  <div class="hud-top">
    <div class="hud-left">
      <span class="hud-title">محرك المجسمات (Canvas 3D)</span>
      <div class="shape-buttons">
        <button id="btnCube" class="shape-btn active">مكعب فائق</button>
        <button id="btnTorus" class="shape-btn">حلقة Donut</button>
        <button id="btnSphere" class="shape-btn">كرة جيوديسية</button>
        <button id="btnOcta" class="shape-btn">هرم ثماني</button>
      </div>
    </div>
    <div class="hud-right">
      <label>الدوران الذاتي: <input type="checkbox" id="autoRotateCheck" checked /></label>
      <label>السرعة: <input type="range" id="rotSpeed" min="0" max="3" step="0.2" value="1.0" /></label>
    </div>
  </div>
  <canvas id="engineCanvas"></canvas>
  <div class="hud-tip">اسحب بالماوس لتدوير المجسم في أي اتجاه • استخدم عجلة الفأرة للتكبير</div>
</div>`,
    css: `.engine-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #050811;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.hud-top {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  background: rgba(11, 16, 26, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #f8fafc;
  font-size: 12px;
}
.hud-left, .hud-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.shape-buttons {
  display: flex;
  gap: 4px;
}
.shape-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.shape-btn.active {
  background: #0d9488;
  border-color: #14b8a6;
  color: #ffffff;
}
.hud-right label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 11px;
}
.hud-right input[type="range"] {
  accent-color: #14b8a6;
  width: 70px;
}
.hud-tip {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 11px;
  color: #64748b;
  pointer-events: none;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}
canvas:active {
  cursor: grabbing;
}`,
    js: `// ثوابت المحرك ثلاثي الأبعاد (جرّب تغيير مسافة الكاميرا أو زاوية الرؤية)
const FOV = 420;             // البعد البؤري المنظوري
const BASE_CAMERA_DIST = 4.2; // مسافة الكاميرا عن مركز المجسم

const canvas = document.getElementById('engineCanvas');
const ctx = canvas.getContext('2d');
const autoCheck = document.getElementById('autoRotateCheck');
const speedRange = document.getElementById('rotSpeed');
const shapeBtns = {
  cube: document.getElementById('btnCube'),
  torus: document.getElementById('btnTorus'),
  sphere: document.getElementById('btnSphere'),
  octa: document.getElementById('btnOcta')
};

let width, height;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.width = (canvas.clientWidth || 800) * dpr;
  height = canvas.height = (canvas.clientHeight || 500) * dpr;
}
window.addEventListener('resize', resize);
resize();

// مولدات المجسمات الهندسية
function getCube() {
  const verts = [];
  const edges = [];
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        verts.push({ x: x * 1.1, y: y * 1.1, z: z * 1.1 });
      }
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const d = Math.hypot(verts[i].x - verts[j].x, verts[i].y - verts[j].y, verts[i].z - verts[j].z);
      if (Math.abs(d - 2.2) < 0.1) edges.push([i, j]);
    }
  }
  return { verts, edges };
}

function getTorus(R = 1.3, r = 0.55, segs = 12, rings = 12) {
  const verts = [];
  const edges = [];
  for (let i = 0; i < rings; i++) {
    const u = (i / rings) * Math.PI * 2;
    for (let j = 0; j < segs; j++) {
      const v = (j / segs) * Math.PI * 2;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
      verts.push({ x, y, z });
      const curr = i * segs + j;
      const nextSeg = i * segs + ((j + 1) % segs);
      const nextRing = ((i + 1) % rings) * segs + j;
      edges.push([curr, nextSeg], [curr, nextRing]);
    }
  }
  return { verts, edges };
}

function getSphere(radius = 1.4, latCount = 8, lonCount = 12) {
  const verts = [];
  const edges = [];
  for (let i = 0; i <= latCount; i++) {
    const theta = (i / latCount) * Math.PI;
    for (let j = 0; j < lonCount; j++) {
      const phi = (j / lonCount) * Math.PI * 2;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      verts.push({ x, y, z });
      const idx = i * lonCount + j;
      if (j < lonCount - 1) edges.push([idx, idx + 1]);
      else edges.push([idx, i * lonCount]);
      if (i < latCount) edges.push([idx, idx + lonCount]);
    }
  }
  return { verts, edges };
}

function getOctahedron() {
  const verts = [
    { x: 0, y: 1.6, z: 0 },
    { x: 0, y: -1.6, z: 0 },
    { x: 1.6, y: 0, z: 0 },
    { x: -1.6, y: 0, z: 0 },
    { x: 0, y: 0, z: 1.6 },
    { x: 0, y: 0, z: -1.6 }
  ];
  const edges = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [4, 3], [3, 5], [5, 2]
  ];
  return { verts, edges };
}

let currentGeom = getCube();
let morphVerts = currentGeom.verts.map(v => ({ x: v.x, y: v.y, z: v.z }));

function switchShape(name, geom) {
  Object.values(shapeBtns).forEach(b => b.classList.remove('active'));
  shapeBtns[name].classList.add('active');
  currentGeom = geom;

  // توفيق أطوال المصفوفات للتحول السلس
  while (morphVerts.length < geom.verts.length) {
    morphVerts.push({ x: 0, y: 0, z: 0 });
  }
}
shapeBtns.cube.addEventListener('click', () => switchShape('cube', getCube()));
shapeBtns.torus.addEventListener('click', () => switchShape('torus', getTorus()));
shapeBtns.sphere.addEventListener('click', () => switchShape('sphere', getSphere()));
shapeBtns.octa.addEventListener('click', () => switchShape('octa', getOctahedron()));

// زوايا الدوران والتحكم بالماوس
let rotX = 0.35, rotY = 0.45;
let velX = 0, velY = 0;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let cameraDist = BASE_CAMERA_DIST;

canvas.addEventListener('pointerdown', (e) => {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  velX = 0; velY = 0;
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  rotY += dx * 0.008;
  rotX += dy * 0.008;
  velX = dy * 0.008;
  velY = dx * 0.008;
});

window.addEventListener('pointerup', () => { isDragging = false; });

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  cameraDist = Math.max(2.2, Math.min(8.0, cameraDist + e.deltaY * 0.003));
}, { passive: false });

let animId = null;
function loop() {
  if (document.hidden) {
    animId = requestAnimationFrame(loop);
    return;
  }

  ctx.fillStyle = '#050811';
  ctx.fillRect(0, 0, width, height);

  // تحديث الزوايا والقصور الذاتي
  const speed = parseFloat(speedRange.value);
  if (autoCheck.checked && !isDragging) {
    rotY += 0.008 * speed;
    rotX += 0.004 * speed;
  } else if (!isDragging) {
    rotX += velX;
    rotY += velY;
    velX *= 0.94;
    velY *= 0.94;
  }

  // الاستيفاء التدريجي لرؤوس المجسم (Morphing)
  for (let i = 0; i < currentGeom.verts.length; i++) {
    const target = currentGeom.verts[i];
    morphVerts[i].x += (target.x - morphVerts[i].x) * 0.09;
    morphVerts[i].y += (target.y - morphVerts[i].y) * 0.09;
    morphVerts[i].z += (target.z - morphVerts[i].z) * 0.09;
  }

  // تدوير وإسقاط الرؤوس
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const projected = [];

  for (let i = 0; i < currentGeom.verts.length; i++) {
    const v = morphVerts[i];

    // دوران حول Y
    const x1 = v.x * cosY + v.z * sinY;
    const z1 = -v.x * sinY + v.z * cosY;

    // دوران حول X
    const y2 = v.y * cosX - z1 * sinX;
    const z2 = v.y * sinX + z1 * cosX + cameraDist;

    // الإسقاط المنظوري
    const px = (x1 * FOV) / z2 + width / 2;
    const py = (y2 * FOV) / z2 + height / 2;

    projected.push({ x: px, y: py, z: z2 });
  }

  // رسم أضلاع المجسم
  for (let i = 0; i < currentGeom.edges.length; i++) {
    const [idx1, idx2] = currentGeom.edges[i];
    if (idx1 >= projected.length || idx2 >= projected.length) continue;
    const p1 = projected[idx1];
    const p2 = projected[idx2];

    const avgZ = (p1.z + p2.z) * 0.5;
    const brightness = Math.max(0.2, Math.min(1.0, (6.5 - avgZ) / 3.8));

    ctx.strokeStyle = 'rgba(20, 184, 166, ' + brightness + ')';
    ctx.lineWidth = Math.max(1, 2.2 * brightness);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  // رسم الرؤوس كنقاط مضيئة
  for (let i = 0; i < projected.length; i++) {
    const p = projected[i];
    const brightness = Math.max(0.3, (6.5 - p.z) / 3.8);
    ctx.fillStyle = 'rgba(56, 189, 248, ' + brightness + ')';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5 * brightness, 0, Math.PI * 2);
    ctx.fill();
  }

  animId = requestAnimationFrame(loop);
}
animId = requestAnimationFrame(loop);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// 7. الآلة الموسيقية ومرئي الطيف الصوتي (Web Audio Synth & Spectrum)
// ============================================================================
export const AUDIO_SYNTH_DEMO = {
  id: 'web-audio-synth-visualizer',
  title: 'الآلة الموسيقية ومرئي الطيف الصوتي (Web Audio Synth)',
  category: 'Web Audio & Canvas',
  difficulty: 'متقدم',
  isNew: true,
  description: 'توليد أصوات موسيقية حية بـ Web Audio API دون أي ملفات صوتية مسجلة: مفاتيح بيانو تفاعلية، تحكم بأشكال الموجات الصوتية وغلاف ADSR مع مرئي طيف ترددي دائري متوهج.',
  tricksExplained: [
    {
      title: 'معادلة التردد الموسيقي الدقيق (MIDI Tuning)',
      concept: 'f = 440 * 2^((n - 69) / 12)',
      explanation: 'حساب التردد الفيزيائي بالهرتز لكل نغمة موسيقية عبر مقياس الضبط المتساوي المعياري؛ فنغمة A4 تساوي 440Hz، ونغمة C4 تساوي 261.63Hz.'
    },
    {
      title: 'غلاف الصوت التناظري (ADSR Volume Envelope)',
      concept: 'linearRampToValueAtTime',
      explanation: 'التحكم بسرعة صعود النغمة (Attack) وتلاشيها التدريجي (Release) عبر عقدة GainNode لمنع الانقطاعات الحادة التي تسبب طقطقة في مكبرات الصوت.'
    },
    {
      title: 'تحليل الطيف الترددي اللحظي (FFT)',
      concept: 'AnalyserNode.getByteFrequencyData',
      explanation: 'استخراج شدة الترددات الصوتية في كل إطار ورسمها كأعمدة طيف دائرية نابضة تتفاعل بدقة مع حدة النغمة وقوتها.'
    }
  ],
  code: {
    html: `<div class="synth-box">
  <div class="hud-top">
    <div class="hud-left">
      <span class="hud-title">المزج الموسيقي (Web Audio)</span>
      <div class="wave-buttons">
        <button id="wave-sine" class="wave-btn active">Sine ناعم</button>
        <button id="wave-triangle" class="wave-btn">Triangle نقي</button>
        <button id="wave-sawtooth" class="wave-btn">Saw حاد</button>
        <button id="wave-square" class="wave-btn">Square ريترو</button>
      </div>
    </div>
    <div class="hud-right">
      <label>التلاشي (Release): <input type="range" id="relRange" min="0.1" max="1.5" step="0.1" value="0.5" /></label>
      <button id="audioInitBtn" class="init-btn">بدء الصوت 🔊</button>
    </div>
  </div>

  <div class="vis-wrapper">
    <canvas id="audioCanvas"></canvas>
  </div>

  <div class="piano-keyboard" id="pianoKeys">
    <!-- مفاتيح البيانو التفاعلية -->
  </div>
</div>`,
    css: `.synth-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #080b14;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  direction: rtl;
}
.hud-top {
  padding: 10px 14px;
  background: rgba(11, 16, 26, 0.9);
  border-bottom: 1px solid rgba(20, 184, 166, 0.25);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: #f8fafc;
  z-index: 10;
}
.hud-left, .hud-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.wave-buttons {
  display: flex;
  gap: 4px;
}
.wave-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 11px;
  cursor: pointer;
}
.wave-btn.active {
  background: #0d9488;
  border-color: #14b8a6;
  color: #ffffff;
}
.init-btn {
  background: #0d9488;
  border: none;
  color: #fff;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}
.hud-right label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 11px;
}
.hud-right input[type="range"] {
  accent-color: #14b8a6;
  width: 75px;
}
.vis-wrapper {
  flex: 1;
  position: relative;
  width: 100%;
}
#audioCanvas {
  width: 100%;
  height: 100%;
  display: block;
}
.piano-keyboard {
  height: 140px;
  background: #03050a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  position: relative;
  padding: 0 10px;
  user-select: none;
  direction: ltr;
}
.key-white {
  flex: 1;
  height: 100%;
  background: #f8fafc;
  border: 1px solid #0f172a;
  border-radius: 0 0 6px 6px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  font-size: 10px;
  font-weight: bold;
  color: #334155;
  transition: background 80ms ease;
}
.key-white.active {
  background: #2dd4bf;
  color: #042f2e;
}
.key-black {
  position: absolute;
  width: 5.5%;
  height: 60%;
  background: #0f172a;
  border-radius: 0 0 4px 4px;
  z-index: 5;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  font-size: 9px;
  font-weight: bold;
  color: #94a3b8;
  transition: background 80ms ease;
}
.key-black.active {
  background: #0d9488;
  color: #ffffff;
}`,
    js: `// تعريف نغمات السلم الموسيقي
const NOTES = [
  { note: 'C4', freq: 261.63, isBlack: false, keyChar: 'A' },
  { note: 'C#4', freq: 277.18, isBlack: true, leftPct: 6.2, keyChar: 'W' },
  { note: 'D4', freq: 293.66, isBlack: false, keyChar: 'S' },
  { note: 'D#4', freq: 311.13, isBlack: true, leftPct: 15.6, keyChar: 'E' },
  { note: 'E4', freq: 329.63, isBlack: false, keyChar: 'D' },
  { note: 'F4', freq: 349.23, isBlack: false, keyChar: 'F' },
  { note: 'F#4', freq: 369.99, isBlack: true, leftPct: 34.6, keyChar: 'T' },
  { note: 'G4', freq: 392.00, isBlack: false, keyChar: 'G' },
  { note: 'G#4', freq: 415.30, isBlack: true, leftPct: 44.0, keyChar: 'Y' },
  { note: 'A4', freq: 440.00, isBlack: false, keyChar: 'H' },
  { note: 'A#4', freq: 466.16, isBlack: true, leftPct: 53.4, keyChar: 'U' },
  { note: 'B4', freq: 493.88, isBlack: false, keyChar: 'J' },
  { note: 'C5', freq: 523.25, isBlack: false, keyChar: 'K' },
  { note: 'D5', freq: 587.33, isBlack: false, keyChar: 'L' }
];

let audioCtx = null;
let analyser = null;
let currentWave = 'sine';

const canvas = document.getElementById('audioCanvas');
const ctx = canvas.getContext('2d');
const initBtn = document.getElementById('audioInitBtn');
const relRange = document.getElementById('relRange');
const pianoContainer = document.getElementById('pianoKeys');

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyser.connect(audioCtx.destination);
    initBtn.textContent = 'الصوت نشط ✓';
    initBtn.style.background = '#059669';
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}
initBtn.addEventListener('click', ensureAudio);

// تبديل شكل الموجة
const waveBtns = ['sine', 'triangle', 'sawtooth', 'square'];
waveBtns.forEach(w => {
  const btn = document.getElementById('wave-' + w);
  btn.addEventListener('click', () => {
    currentWave = w;
    waveBtns.forEach(other => document.getElementById('wave-' + other).classList.remove('active'));
    btn.classList.add('active');
  });
});

// عزف النغمة
function playNote(freq, element) {
  ensureAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = currentWave;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const now = audioCtx.currentTime;
  const relTime = parseFloat(relRange.value) || 0.5;

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.4, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + relTime);

  osc.connect(gain);
  gain.connect(analyser);

  osc.start(now);
  osc.stop(now + relTime);

  if (element) {
    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 180);
  }
}

// بناء لوحة المفاتيح
const keyElements = {};
NOTES.forEach(n => {
  const el = document.createElement('div');
  el.className = n.isBlack ? 'key-black' : 'key-white';
  el.textContent = n.keyChar;
  if (n.isBlack) el.style.left = n.leftPct + '%';

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    playNote(n.freq, el);
  });
  pianoContainer.appendChild(el);
  keyElements[n.keyChar.toLowerCase()] = { freq: n.freq, el };
});

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (keyElements[k]) {
    playNote(keyElements[k].freq, keyElements[k].el);
  }
});

// رسم مرئي الطيف
let width, height;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.width = (canvas.clientWidth || 800) * dpr;
  height = canvas.height = (canvas.clientHeight || 300) * dpr;
}
window.addEventListener('resize', resize);
resize();

let animId = null;
function drawVisualizer() {
  if (document.hidden) {
    animId = requestAnimationFrame(drawVisualizer);
    return;
  }

  ctx.fillStyle = '#080b14';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const baseR = Math.min(width, height) * 0.22;

  if (analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.save();
    ctx.translate(cx, cy);

    // مرئي دائري نابض
    for (let i = 0; i < bufferLength; i++) {
      const angle = (i / bufferLength) * Math.PI * 2;
      const val = dataArray[i];
      const barH = (val / 255) * 75;

      const x1 = Math.cos(angle) * baseR;
      const y1 = Math.sin(angle) * baseR;
      const x2 = Math.cos(angle) * (baseR + barH);
      const y2 = Math.sin(angle) * (baseR + barH);

      ctx.strokeStyle = 'hsl(' + (165 + (val / 255) * 90) + ', 85%, 55%)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  } else {
    // دائرة افتراضية قبل تشغيل الصوت
    ctx.beginPath();
    ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  animId = requestAnimationFrame(drawVisualizer);
}
animId = requestAnimationFrame(drawVisualizer);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
  if (audioCtx) audioCtx.close();
});`
  }
};

// ============================================================================
// 8. الفيزياء الطباعية التفاعلية (Typographic Particle Physics)
// ============================================================================
export const TYPOGRAPHIC_PHYSICS_DEMO = {
  id: 'typographic-particle-physics',
  title: 'الفيزياء الطباعية التفاعلية (Typographic Physics)',
  category: 'Canvas & Typography',
  difficulty: 'متقدم',
  isNew: true,
  description: 'تحويل الكلمات والنصوص العربية والإنجليزية إلى آلاف الجسيمات الفيزيائية: استخراج بكسلات النص، تشتيت الحروف عند اقتراب الماوس، وعودتها بنوابض فيزيائية مرنة.',
  tricksExplained: [
    {
      title: 'استخراج إحداثيات الحروف (Pixel Scanning)',
      concept: 'ctx.getImageData()',
      explanation: 'رسم الكلمة على Canvas مخفي بدقة عالية وفحص مصفوفة الألوان لاستخراج النقاط غير الشفافة وتحويلها إلى جسيمات ذات مواقع هدف targetX و targetY.'
    },
    {
      title: 'معادلة قوة النابض والتخميد (Spring-Damper Physics)',
      concept: 'F = -k * dx - c * v',
      explanation: 'جذب كل جسيم نحو موقعه الأصلي في الكلمة بقوة نابض مرنة، مع احتكاك يخفف سرعته ليثبت الحرف بنعومة وتماسك طبيعي.'
    },
    {
      title: 'التحول السلس بين الكلمات (Particle Re-targeting)',
      concept: 'Target Point Re-assignment',
      explanation: 'عند كتابة كلمة جديدة، لا نقوم بإعادة بناء الجسيمات، بل نوزع إحداثيات الكلمة الجديدة كأهداف للجسيمات الحالية فتطير في مشهد انسيابي مبهر.'
    }
  ],
  code: {
    html: `<div class="typo-box">
  <div class="hud-top">
    <div class="hud-left">
      <span class="hud-title">الفيزياء الطباعية (Typo Physics)</span>
      <div class="word-presets">
        <button id="w-codeverse" class="preset-btn active">كودڤيرس</button>
        <button id="w-html" class="preset-btn">HTML5</button>
        <button id="w-css" class="preset-btn">CSS3</button>
        <button id="w-js" class="preset-btn">JavaScript</button>
      </div>
    </div>
    <div class="hud-right">
      <input type="text" id="customTextInput" placeholder="اكتب كلمتك الخاصة هنا..." maxlength="14" />
      <button id="scatterBtn" class="action-btn">تشتيت الحروف 💥</button>
    </div>
  </div>
  <canvas id="typoCanvas"></canvas>
  <div class="hud-tip">حرّك المؤشر قرب الحروف لتشتيتها • اكتب أي كلمة في الصندوق لمشاهدة تشكلها</div>
</div>`,
    css: `.typo-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #060911;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
  direction: rtl;
}
.hud-top {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  background: rgba(11, 16, 26, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 8px;
  padding: 8px 14px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #f8fafc;
  font-size: 12px;
}
.hud-left, .hud-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hud-title {
  font-weight: bold;
  color: #14b8a6;
}
.word-presets {
  display: flex;
  gap: 4px;
}
.preset-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 11px;
  cursor: pointer;
}
.preset-btn.active {
  background: #0d9488;
  border-color: #14b8a6;
  color: #ffffff;
}
#customTextInput {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(20, 184, 166, 0.4);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  width: 140px;
  outline: none;
}
.action-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
}
.hud-tip {
  position: absolute;
  bottom: 12px;
  right: 14px;
  font-size: 11px;
  color: #64748b;
  pointer-events: none;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
    js: `// ثوابت الفيزياء الطباعية (جرّب تغيير قوة النابض أو نصف قطر التنافر)
const SPRING_K = 0.045;      // معامل قوة جذب النابض
const FRICTION = 0.88;       // احتكاك تخميد السرعة
const REPULSION_R = 75;      // نصف قطر دائرة نفور الفأرة

const canvas = document.getElementById('typoCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('customTextInput');
const scatterBtn = document.getElementById('scatterBtn');

let width, height;
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.width = (canvas.clientWidth || 800) * dpr;
  height = canvas.height = (canvas.clientHeight || 500) * dpr;
}
window.addEventListener('resize', resize);
resize();

// فئة الجسيم الفيزيائي
class TypoParticle {
  constructor(x, y) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.targetX = x;
    this.targetY = y;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 1.5 + 2.0;
    this.color = Math.random() > 0.25 ? '#14b8a6' : '#38bdf8';
  }

  update(mx, my, isHovered) {
    // قوة النابض نحو موضع الحرف
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.vx += dx * SPRING_K;
    this.vy += dy * SPRING_K;

    // نفور الفأرة
    if (isHovered) {
      const pdx = this.x - mx;
      const pdy = this.y - my;
      const dist = Math.hypot(pdx, pdy);
      if (dist < REPULSION_R && dist > 0) {
        const force = (REPULSION_R - dist) / REPULSION_R * 4.5;
        this.vx += (pdx / dist) * force;
        this.vy += (pdy / dist) * force;
      }
    }

    this.vx *= FRICTION;
    this.vy *= FRICTION;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = [];

// استخراج بكسلات النص من كانفاس مخفي
function buildTextParticles(text) {
  const offCanvas = document.createElement('canvas');
  const offCtx = offCanvas.getContext('2d');
  offCanvas.width = width;
  offCanvas.height = height;

  const isArabic = /[\\u0600-\\u06FF]/.test(text);
  const fontSize = Math.min(width / (text.length * 0.75), 110);

  offCtx.font = 'bold ' + fontSize + 'px system-ui, -apple-system, sans-serif';
  offCtx.textAlign = 'center';
  offCtx.textBaseline = 'middle';
  offCtx.fillStyle = '#ffffff';
  offCtx.fillText(text, width / 2, height / 2);

  const imgData = offCtx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const sampleStep = 6; // تباعد عينات البكسل
  const targets = [];

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 128) {
        targets.push({ x, y });
      }
    }
  }

  // توزيع الأهداف على الجسيمات
  while (particles.length < targets.length) {
    particles.push(new TypoParticle(targets[particles.length].x, targets[particles.length].y));
  }
  for (let i = 0; i < targets.length; i++) {
    particles[i].targetX = targets[i].x;
    particles[i].targetY = targets[i].y;
  }
  if (particles.length > targets.length) {
    particles.length = targets.length;
  }
}

// الكلمات الجاهزة
const presets = {
  'codeverse': 'كودڤيرس',
  'html': 'HTML5',
  'css': 'CSS3',
  'js': 'JavaScript'
};

Object.keys(presets).forEach(key => {
  const btn = document.getElementById('w-' + key);
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildTextParticles(presets[key]);
  });
});

textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && textInput.value.trim()) {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    buildTextParticles(textInput.value.trim());
  }
});

scatterBtn.addEventListener('click', () => {
  particles.forEach(p => {
    p.vx += (Math.random() - 0.5) * 35;
    p.vy += (Math.random() - 0.5) * 35;
  });
});

// تعقب الفأرة
const mouse = { x: -1000, y: -1000, active: false };
window.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  mouse.x = (e.clientX - rect.left) * dpr;
  mouse.y = (e.clientY - rect.top) * dpr;
  mouse.active = true;
});
window.addEventListener('pointerleave', () => { mouse.active = false; });

buildTextParticles('كودڤيرس');

let animId = null;
function loop() {
  if (document.hidden) {
    animId = requestAnimationFrame(loop);
    return;
  }

  ctx.fillStyle = '#060911';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(mouse.x, mouse.y, mouse.active);
    particles[i].draw(ctx);
  }

  animId = requestAnimationFrame(loop);
}
animId = requestAnimationFrame(loop);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// 9. بطاقات التفاعل ثلاثية الأبعاد (Holographic 3D Cards)
// ============================================================================
export const HOLOGRAPHIC_CARDS_DEMO = {
  id: 'holographic-3d-cards',
  title: 'بطاقات التفاعل ثلاثية الأبعاد (3D Perspective)',
  category: 'CSS 3D & Interaction',
  difficulty: 'متقدم',
  description: 'بطاقات منظورية تحسب إحداثيات الماوس لتحريك زوايا الميلان بدقة مع إبراز الطبقات الداخلية للأمام في الفضاء ثلاثي الأبعاد.',
  tricksExplained: [
    {
      title: 'حساب زوايا الميلان من موضع المؤشر',
      concept: 'Relative Offset Mapping',
      explanation: 'طرح إحداثيات الماوس من مركز البطاقة وقسمتها على نصف القطر لإنتاج زوايا انحناء متوازنة بين -12 و +12 درجة وتمريرها لـ CSS.'
    },
    {
      title: 'إبراز الطبقات الداخلية في الفضاء Z',
      concept: 'transform-style: preserve-3d',
      explanation: 'تطبيق خاصية preserve-3d يتيح إبراز العناوين والأيقونات للخارج بواسطة translateZ لتبدو طافية فوق السطح الأساسي.'
    },
    {
      title: 'التوهج التفاعلي الدائري',
      concept: 'CSS Radial Gradient Spotting',
      explanation: 'رسم تدرج ضوئي موضعي يتبع المؤشر بدقة عبر متغيرات CSS (--mouse-x و --mouse-y) لمحاكاة الإضاءة السطحية.'
    }
  ],
  code: {
    html: `<div class="card-stage">
  <div class="tilt-card" id="card1">
    <div class="card-content">
      <span class="category-badge">واجهات الويب</span>
      <h3>تصميم النظم المتقدمة</h3>
      <p>بناء مكونات تفاعلية تعتمد على المتغيرات الحسابية المنظورية.</p>
      <div class="card-meta">
        <span>CSS 3D Transform</span>
        <span>60 FPS</span>
      </div>
    </div>
  </div>

  <div class="tilt-card" id="card2">
    <div class="card-content">
      <span class="category-badge">الحسابات الفيزيائية</span>
      <h3>محاكاة الحركة المرنة</h3>
      <p>تطبيق معادلات القصور الذاتي والجاذبية في الواجهات الرقمية.</p>
      <div class="card-meta">
        <span>Kinetic Curves</span>
        <span>Pointer Tracking</span>
      </div>
    </div>
  </div>
</div>`,
    css: `.card-stage {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  align-items: center;
  min-height: 480px;
  background: #070a13;
  padding: 30px;
  perspective: 1000px;
  direction: rtl;
}
.tilt-card {
  position: relative;
  width: 280px;
  height: 380px;
  background: #0f172a;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 120ms cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 150ms ease;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.tilt-card:hover {
  box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.25);
}
.card-content {
  transform: translateZ(40px);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.category-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 16px;
}
h3 {
  margin: 0 0 12px 0;
  font-size: 19px;
  font-weight: 700;
  color: #f8fafc;
}
p {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}
.card-meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 14px;
  font-size: 11px;
  font-family: monospace;
  color: #64748b;
}`,
    js: `const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = ((y - cy) / cy) * -14;
    const ry = ((x - cx) / cx) * 14;

    card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});`
  }
};

// ============================================================================
// 10. شبكة ترابط الجسيمات التفاعلية (Particle Constellation Network)
// ============================================================================
export const PARTICLE_CONSTELLATION_DEMO = {
  id: 'particle-constellation-network',
  title: 'شبكة ترابط الجسيمات التفاعلية',
  category: 'Canvas & Math',
  difficulty: 'متقدم',
  description: 'شبكة نقاط مترابطة بخطوط تتأثر بالمسافات وموقع مؤشر الماوس مع تأثير انتشار النبضات الدائرية عند النقر.',
  tricksExplained: [
    {
      title: 'مصفوفة المسافات والشفافية المتدرجة',
      concept: 'Math.hypot',
      explanation: 'مقارنة المسافة بين كل زوج من الجسيمات؛ إذا كانت المسافة أقل من الحد المحدد يُرسم خط رابط تزداد شفافيته كلما اقتربت النقطتان.'
    },
    {
      title: 'تفاعل التنافر العكسي للمؤشر',
      concept: 'Inverse Distance Force',
      explanation: 'حساب زاوية متجه القوة بين المؤشر والجسيم القريب ودفعه بنسبة تتزايد مع اقتراب الفأرة لخلق إحساس المجال المغناطيسي التفاعلي.'
    },
    {
      title: 'نبضات الموجات الحلقية',
      concept: 'Expanding Wave Ripples',
      explanation: 'عند النقر يُضاف كائن نبضة يتسع قطره تدريجياً وتتناقص شفافيته في كل إطار ليعطي إحساساً بموجات صادمة تدفع الجسيمات المجاورة.'
    }
  ],
  code: {
    html: `<div class="particles-box">
  <div class="hud-strip">
    <span>شبكة الجسيمات — حرّك المؤشر للتفاعل، وانقر لإطلاق نبضة</span>
    <button id="reset-particles-btn">إعادة توزيع</button>
  </div>
  <canvas id="particleCanvas"></canvas>
</div>`,
    css: `.particles-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #090d14;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
}
.hud-strip {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  color: #14b8a6;
  direction: rtl;
  z-index: 5;
  border: 1px solid rgba(20, 184, 166, 0.25);
}
.hud-strip button {
  background: #0d9488;
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
}`,
    js: `const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('reset-particles-btn');

let width, height;
function resize() {
  width = canvas.width = canvas.clientWidth || 800;
  height = canvas.height = canvas.clientHeight || 500;
}
window.addEventListener('resize', resize);
resize();
setTimeout(resize, 60);

const mouse = { x: null, y: null, radius: 130 };

window.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

window.addEventListener('pointerleave', () => {
  mouse.x = null;
  mouse.y = null;
});

let ripples = [];
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  ripples.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    r: 10,
    alpha: 1
  });
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2 + 1.5;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  update() {
    if (this.x < 0 || this.x > width) this.vx = -this.vx;
    if (this.y < 0 || this.y > height) this.vy = -this.vy;

    this.x += this.vx;
    this.y += this.vy;

    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 4.5;
        this.y -= (dy / dist) * force * 4.5;
      }
    }

    ripples.forEach(rip => {
      const dx = this.x - rip.x;
      const dy = this.y - rip.y;
      const dist = Math.hypot(dx, dy);
      if (Math.abs(dist - rip.r) < 25) {
        this.x += (dx / dist) * 3;
        this.y += (dy / dist) * 3;
      }
    });
  }

  draw() {
    ctx.fillStyle = '#14b8a6';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = [];
function init() {
  particles = [];
  const count = Math.floor((width * height) / 8000);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
init();
resetBtn.addEventListener('click', init);

let animId = null;
function animate() {
  if (document.hidden) {
    animId = requestAnimationFrame(animate);
    return;
  }

  ctx.fillStyle = '#060910';
  ctx.fillRect(0, 0, width, height);

  ripples = ripples.filter(r => r.alpha > 0.02);
  ripples.forEach(rip => {
    rip.r += 4;
    rip.alpha *= 0.94;
    ctx.strokeStyle = 'rgba(20, 184, 166, ' + rip.alpha + ')';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
    ctx.stroke();
  });

  const maxDist = 115;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.55;
        ctx.strokeStyle = 'rgba(20, 184, 166, ' + alpha + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  animId = requestAnimationFrame(animate);
}
animId = requestAnimationFrame(animate);

window.addEventListener('beforeunload', () => {
  if (animId) cancelAnimationFrame(animId);
});`
  }
};

// ============================================================================
// القائمة الإجمالية لجميع النماذج الـ 10 (المرتبة وفق أعلى درجات الإبهار البصري)
// ============================================================================
export const SHOWCASE_DEMOS = [
  WEBGL_SHADER_DEMO,           // 1. شيدر البلازما فائق السرعة
  BOIDS_FLOCKING_DEMO,         // 2. سرب الطيور الذكي
  FRACTAL_EXPLORER_DEMO,       // 3. مستكشف ماندلبروت وجوليا
  SOLAR_SYSTEM_DEMO,           // 4. محاكي المجموعة الشمسية
  VERLET_CLOTH_DEMO,           // 5. قماش الحرير القابل للتمزيق
  WIREFRAME_3D_DEMO,           // 6. محرك المجسمات ثلاثية الأبعاد
  AUDIO_SYNTH_DEMO,            // 7. المزج الموسيقي ومرئي الطيف
  TYPOGRAPHIC_PHYSICS_DEMO,    // 8. الفيزياء الطباعية التفاعلية
  HOLOGRAPHIC_CARDS_DEMO,      // 9. بطاقات التفاعل ثلاثية الأبعاد
  PARTICLE_CONSTELLATION_DEMO  // 10. شبكة ترابط الجسيمات
];
