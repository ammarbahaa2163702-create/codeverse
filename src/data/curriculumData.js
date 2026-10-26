/**
 * curriculumData.js
 * المنهج الأكاديمي التطبيقي لمنصة كودڤيرس: HTML5 و CSS3 و Modern JavaScript.
 * صياغة مباشرة وواضحة لطلاب الجامعات مع شروحات علمية دقيقة وملاحظات تطبيقية عملية،
 * ومصححات مرنة تقبل الحلول المتكافئة والمسافات المتنوعة.
 */

export const CURRICULUM_DATA = [
  // ==========================================
  // المسار الأول: بنية وخصائص HTML5
  // ==========================================
  {
    trackId: 'html-track',
    trackTitle: 'مسار HTML5 والخصائص المتقدمة',
    trackBadge: 'متخصص خصائص HTML',
    accentColor: '#0d9488',
    description: 'التعرف على السمات الأساسية لعناصر HTML5، استخدام خصائص data-* لتخزين البيانات، وبناء نماذج متوافقة مع معايير التحقق القياسية.',
    lessons: [
      {
        id: 'html-1',
        title: '1. خصائص العناصر في HTML (Attributes)',
        difficulty: 'مبتدئ',
        xpReward: 100,
        summary: 'تُحدد السمات (Attributes) سلوك عناصر HTML ومعلوماتها الإضافية، وتُكتب في وسم البداية على صيغة name="value".',
        explanationBlocks: [
          {
            heading: 'مفهوم السمة (Attribute)',
            body: 'تُضاف السمات إلى وسم البداية لمنح المتصفح تعليمات إضافية عن كيفية عرض العنصر أو معالجته. من أبرز السمات العامة: id للتعريف الفريد، title لعرض تلميح إرشادي عند تمرير المؤشر، و class للتنسيق.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'تسمح سمات data-* بتخزين بيانات إضافية مخصصة خاصة بالتطبيق دون التأثير على عرض المتصفح التلقائي، ويمكن قراءتها لاحقاً عبر JavaScript أو مطابقتها بواسطة محددات CSS.'
          }
        ],
        starterCode: {
          html: `<div class="status-panel">
  <div class="status-indicator">الحالة: انتظار التفعيل</div>
  <h2>وحدة معالجة البيانات</h2>
  <p class="desc">تحتاج الوحدة إلى رفع مستوى الطاقة إلى 100 لتفعيل نظام الحماية.</p>
  
  <!-- المهمة: اضبط خاصية title="النظام جاهز" وخاصية data-power="100" -->
  <button id="activate-btn" title="معطل" data-power="0">
    تفعيل وحدة الطاقة
  </button>
</div>`,
          css: `.status-panel {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.1));
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}
.status-indicator {
  font-size: 12px;
  color: #f59e0b;
  margin-bottom: 12px;
  font-weight: 600;
}
h2 {
  margin: 0 0 8px 0;
  color: var(--color-text-base, #f8fafc);
  font-size: 18px;
}
.desc {
  color: var(--color-text-muted, #94a3b8);
  font-size: 13px;
  margin-bottom: 20px;
}
button {
  background: #0d9488;
  color: #ffffff;
  font-weight: 600;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 150ms ease;
}
button:hover {
  background: #0f766e;
}
button[data-power="100"] {
  background: #059669;
}`,
          js: `const btn = document.getElementById('activate-btn');
if (btn) {
  console.log('مستوى الطاقة المسجل:', btn.getAttribute('data-power'));
  btn.addEventListener('click', () => {
    const power = btn.getAttribute('data-power');
    if (power === '100') {
      alert('تم تفعيل النظام بكامل الطاقة.');
    } else {
      alert('مستوى الطاقة غير كافٍ: ' + power);
    }
  });
}`
        },
        challenge: {
          missionTitle: 'تفعيل وحدة الطاقة',
          instructions: 'عدّل الزر #activate-btn داخل ملف index.html بحيث تصبح قيمة الخاصية data-power مساوية لـ "100"، وخاصية title مساوية لـ "النظام جاهز"، ثم اضغط "شغّل الكود" متبوعاً بـ "تحقق من الحل".',
          hint: 'ابحث عن سطر الزر واكتب: <button id="activate-btn" title="النظام جاهز" data-power="100">',
          validateFnString: `
            const btn = iframeDoc.getElementById('activate-btn');
            if (!btn) return { passed: false, message: 'العنصر #activate-btn غير موجود في الصفحة.' };
            const rawPower = btn.getAttribute('data-power');
            const power = rawPower ? rawPower.trim() : '';
            const rawTitle = btn.getAttribute('title');
            const title = rawTitle ? rawTitle.trim() : '';
            
            if (power !== '100') {
              return { 
                passed: false, 
                message: 'قيمة data-power الحالية هي "' + power + '". المطلوب ضبطها على "100".' 
              };
            }
            if (!title || (title !== 'النظام جاهز' && !title.includes('جاهز'))) {
              return { 
                passed: false, 
                message: 'خاصية title لم تُحدّث بالشكل المطلوب. المطلوب كتابة "النظام جاهز".' 
              };
            }
            return { 
              passed: true, 
              message: 'تم تعيين الخاصيتين بنجاح وتحويل حالة الزر إلى وضع الجاهزية.' 
            };
          `
        },
        visualMission: {
          type: 'rover-shield',
          targetLabel: 'جاهزية وحدة الطاقة',
          checkKey: 'power100'
        }
      },
      {
        id: 'html-2',
        title: '2. البيانات المخصصة في العناصر (data-* Attributes)',
        difficulty: 'متوسط',
        xpReward: 100,
        summary: 'تخزين معايير وأرقام فيزيائية داخل عناصر HTML لقراءتها برمجياً عبر dataset في JavaScript وعرضها بواسطة CSS.',
        explanationBlocks: [
          {
            heading: 'استخدامات data-* في الواجهات الحديثة',
            body: 'تُعد سمات data-* الطريقة القياسية والآمنة لتضمين بيانات إضافية في العناصر دون المساس بالبنية الدلالية لـ HTML. يتيح كائن dataset في JavaScript قراءتها بسلاسة عبر تحويل الأسماء تلقائياً من kebab-case إلى camelCase.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'يمكن لدالة attr() في CSS قراءة قيمة سمة البيانات وعرضها داخل شبه العنصر ::after، مما يتيح تحديث النصوص المرافقة مباشرة دون الحاجة لمعالجة نصية مكررة.'
          }
        ],
        starterCode: {
          html: `<div class="planets-grid">
  <!-- المطلوب: إضافة data-gravity="9.8" لكوكب الأرض -->
  <div class="planet-card earth" data-name="الأرض" data-gravity="">
    <div class="planet-title">كوكب الأرض</div>
    <span class="gravity-badge">الجاذبية: </span>
  </div>

  <!-- المطلوب: إضافة data-gravity="24.8" لكوكب المشتري -->
  <div class="planet-card jupiter" data-name="المشتري" data-gravity="">
    <div class="planet-title">كوكب المشتري</div>
    <span class="gravity-badge">الجاذبية: </span>
  </div>
</div>`,
          css: `.planets-grid {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 10px;
}
.planet-card {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.1));
  border-radius: 10px;
  padding: 18px;
  width: 170px;
  text-align: center;
  transition: border-color 150ms ease;
}
.planet-card:hover {
  border-color: #0d9488;
}
.planet-title {
  color: var(--color-text-base, #f8fafc);
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}
.gravity-badge {
  display: inline-block;
  background: rgba(13, 148, 136, 0.1);
  color: #0d9488;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: monospace;
}
.planet-card[data-gravity]::after {
  content: ' ' attr(data-gravity) ' m/s²';
  font-size: 12px;
  color: #059669;
  font-family: monospace;
}`,
          js: `const cards = document.querySelectorAll('.planet-card');
cards.forEach(card => {
  const g = card.dataset.gravity;
  console.log('بيانات الكوكب:', card.dataset.name, 'الجاذبية:', g);
  const badge = card.querySelector('.gravity-badge');
  if (badge && g) {
    badge.textContent = 'الجاذبية: ' + g + ' m/s²';
  }
});`
        },
        challenge: {
          missionTitle: 'تسجيل معايير الجاذبية',
          instructions: 'أضف قيمة الجاذبية لكوكب الأرض لتصبح data-gravity="9.8"، ولكوكب المشتري لتصبح data-gravity="24.8"، ثم شغّل الكود وافحص الحل.',
          hint: 'عدّل وسم الكارت الأول ليصبح data-gravity="9.8" والكارت الثاني data-gravity="24.8".',
          validateFnString: `
            const earth = iframeDoc.querySelector('.planet-card.earth');
            const jupiter = iframeDoc.querySelector('.planet-card.jupiter');
            if (!earth || !jupiter) return { passed: false, message: 'عناصر كروت الكواكب غير موجودة.' };
            
            const eg = earth.getAttribute('data-gravity')?.trim();
            const jg = jupiter.getAttribute('data-gravity')?.trim();
            
            if (eg !== '9.8') {
              return { passed: false, message: 'قيمة جاذبية كوكب الأرض يجب أن تكون "9.8". القيمة الحالية: "' + eg + '".' };
            }
            if (jg !== '24.8') {
              return { passed: false, message: 'قيمة جاذبية كوكب المشتري يجب أن تكون "24.8". القيمة الحالية: "' + jg + '".' };
            }
            return { passed: true, message: 'تم إدخال قيم الجاذبية بالصيغة الصحيحة واكتمال المعايرة.' };
          `
        },
        visualMission: {
          type: 'planet-gravity',
          targetLabel: 'معايرة مجسات الجاذبية',
          checkKey: 'gravityCalibrated'
        }
      },
      {
        id: 'html-3',
        title: '3. التحقق المباشر في النماذج (Form Validation)',
        difficulty: 'متوسط',
        xpReward: 100,
        summary: 'استخدام معايير HTML5 المدمجة للتحقق من صحة المدخلات دون الاعتماد الكلي على سكربتات خارجية.',
        explanationBlocks: [
          {
            heading: 'التحقق القياسي في المتصفح',
            body: 'توفر HTML5 أدوات مدمجة لفحص صحة مدخلات المستخدم قبل إرسال النموذج: مثل سمة required لإلزامية الإدخال، و pattern لتحديد تعبير نمطي (Regex) يجب أن يطابقه النص.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'تتيح محددات CSS الزائفة :valid و :invalid تنسيق الحقول فورياً بناءً على حالتها، مما يقدم تغذية بصرية راجعة للمستخدم أثناء الكتابة مباشرة.'
          }
        ],
        starterCode: {
          html: `<form id="launch-form" class="control-panel">
  <h3>لوحة ترخيص التشغيل</h3>
  <p class="sub">أدخل رمز الترخيص المعتمد بصيغة: 3 أحرف كبيرة، شرطة، ثم 3 أرقام (مثال: CAP-777)</p>
  
  <div class="field-group">
    <label for="captainCode">رمز الترخيص:</label>
    <!-- المهمة: أضف خاصيتي required و pattern="[A-Z]{3}-[0-9]{3}" -->
    <input 
      type="text" 
      id="captainCode" 
      name="captainCode" 
      placeholder="مثال: CAP-777"
    />
  </div>

  <div class="field-group">
    <label for="thrust">مستوى ضغط النظام (%):</label>
    <input type="range" id="thrust" min="50" max="100" value="85" />
  </div>

  <button type="submit" id="submitLaunch">تأكيد الترخيص</button>
</form>`,
          css: `.control-panel {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.1));
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
}
h3 {
  margin: 0 0 6px 0;
  color: var(--color-text-base, #f8fafc);
  font-size: 16px;
}
.sub {
  font-size: 12px;
  color: var(--color-text-muted, #94a3b8);
  margin-bottom: 20px;
}
.field-group {
  margin-bottom: 16px;
  text-align: right;
}
label {
  display: block;
  font-size: 12px;
  margin-bottom: 6px;
  color: var(--color-text-base, #cbd5e1);
  font-weight: 500;
}
input[type="text"] {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-border-strong, #334155);
  background: var(--color-bg-elevated, #0e131b);
  color: #ffffff;
  font-family: monospace;
  font-size: 14px;
}
input[type="text"]:valid {
  border-color: #059669;
}
input[type="text"]:invalid:focus {
  border-color: #e11d48;
}
button[type="submit"] {
  width: 100%;
  padding: 10px;
  background: #0d9488;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 150ms ease;
}
button[type="submit"]:hover {
  background: #0f766e;
}`,
          js: `const form = document.getElementById('launch-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('captainCode').value;
    console.log('تم إرسال النموذج بالرمز:', code);
    alert('تم التحقق من الرمز بنجاح وتأكيد المعاملة.');
  });
}`
        },
        challenge: {
          missionTitle: 'تأمين حقل رمز الترخيص',
          instructions: 'أضف خاصية required وخاصية التعبير النمطي pattern="[A-Z]{3}-[0-9]{3}" إلى حقل #captainCode، ثم شغّل الكود وافحص الحل.',
          hint: 'أضف required pattern="[A-Z]{3}-[0-9]{3}" داخل عنصر input.',
          validateFnString: `
            const input = iframeDoc.getElementById('captainCode');
            if (!input) return { passed: false, message: 'عنصر الإدخال #captainCode غير موجود.' };
            const req = input.hasAttribute('required');
            const pat = input.getAttribute('pattern')?.trim();
            
            if (!req) {
              return { passed: false, message: 'يجب إضافة خاصية required للحقل لضمان إلزاميته.' };
            }
            if (!pat || (pat !== '[A-Z]{3}-[0-9]{3}' && pat !== '^[A-Z]{3}-[0-9]{3}$')) {
              return { passed: false, message: 'قيمة pattern غير مطابقة للصيغة المطلوبة "[A-Z]{3}-[0-9]{3}".' };
            }
            return { passed: true, message: 'تم تفعيل معايير التحقق القياسية على الحقل بنجاح.' };
          `
        },
        visualMission: {
          type: 'rocket-validation',
          targetLabel: 'التحقق من صحة النموذج',
          checkKey: 'validationReady'
        }
      }
    ]
  },

  // ==========================================
  // المسار الثاني: CSS3 والتصميم الحركي
  // ==========================================
  {
    trackId: 'css-track',
    trackTitle: 'مسار CSS3 والتنسيق المتقدم',
    trackBadge: 'فنان التنسيق والتفاعل',
    accentColor: '#6366f1',
    description: 'إدارة المتغيرات البرمجية، بناء حركات ثلاثية الأبعاد تفاعلية، تنظيم التخطيط بواسطة Flexbox، وإنشاء دورات حركة مستمرة بـ @keyframes.',
    lessons: [
      {
        id: 'css-1',
        title: '1. متغيرات CSS (Custom Properties)',
        difficulty: 'مبتدئ',
        xpReward: 100,
        summary: 'تعريف واستخدام متغيرات CSS المركزية لتحديث الأنماط والألوان في كامل الواجهة من موضع واحد.',
        explanationBlocks: [
          {
            heading: 'آلية عمل متغيرات CSS',
            body: 'تُعرف المتغيرات ببادئة شرطتين (--variable-name) داخل محدد مثل :root لتكون متاحة عمومياً، ويتم استدعاؤها عبر دالة var(). تتيح هذه الطريقة إدارة السمات وتغييرها ديناميكياً.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'يمكن لـ JavaScript تعديل قيمة المتغير عبر document.documentElement.style.setProperty("--name", value) لتحديث سمة الموقع لحظياً دون تعديل القواعد الأصلية.'
          }
        ],
        starterCode: {
          html: `<div class="reactor-hud">
  <div class="hud-header">
    <h2>وحدة التحكم بالمفاعل</h2>
    <span class="mode-badge">الوضع: معتدل</span>
  </div>
  <div class="reactor-core">
    <div class="core-symbol">⚡</div>
  </div>
  <p class="status-text">اضبط المتغير --neon-color ليكون اللون #0d9488 والمتغير --glow-radius بقيمة 20px.</p>
</div>`,
          css: `:root {
  /* المطلوب: تحديث --neon-color إلى #0d9488 و --glow-radius إلى 20px */
  --neon-color: #64748b;
  --glow-radius: 4px;
}

.reactor-hud {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--neon-color);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 0 var(--glow-radius) rgba(13, 148, 136, 0.25);
  transition: all 250ms ease;
}
.hud-header h2 {
  color: var(--neon-color);
  margin: 0;
  font-size: 16px;
}
.mode-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  color: var(--neon-color);
  font-size: 11px;
  font-weight: 600;
}
.reactor-core {
  width: 80px;
  height: 80px;
  margin: 18px auto;
  border-radius: 50%;
  border: 2px dashed var(--neon-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.core-symbol {
  font-size: 24px;
  color: var(--neon-color);
}`,
          js: `console.log('تم تحميل متغيرات CSS بنجاح.');`
        },
        challenge: {
          missionTitle: 'تحديث معايير المفاعل',
          instructions: 'في ملف style.css، اضبط قيمة المتغير --neon-color على #0d9488 وقيمة --glow-radius على 20px، ثم شغّل الكود وافحص النتيجة.',
          hint: 'عدّل السطرين في :root ليكون: --neon-color: #0d9488; --glow-radius: 20px;',
          validateFnString: `
            const hud = iframeDoc.querySelector('.reactor-hud');
            if (!hud) return { passed: false, message: 'العنصر .reactor-hud غير موجود.' };
            const style = iframeDoc.defaultView.getComputedStyle(iframeDoc.documentElement);
            const neon = style.getPropertyValue('--neon-color').trim().toLowerCase();
            const glow = style.getPropertyValue('--glow-radius').trim().toLowerCase();
            
            const validColors = ['#0d9488', 'rgb(13, 148, 136)', '#06b6d4', 'rgb(6, 182, 212)'];
            if (!validColors.includes(neon)) {
              return { passed: false, message: 'قيمة --neon-color الحالية هي "' + neon + '". المطلوب ضبطها على "#0d9488".' };
            }
            if (glow !== '20px' && glow !== '30px') {
              return { passed: false, message: 'قيمة --glow-radius الحالية هي "' + glow + '". المطلوب ضبطها على "20px".' };
            }
            return { passed: true, message: 'تم تحديث المتغيرات المركزية بنجاح وانعكست على تنسيق المكون.' };
          `
        },
        visualMission: {
          type: 'neon-reactor',
          targetLabel: 'قلب المفاعل التفاعلي',
          checkKey: 'neonActivated'
        }
      },
      {
        id: 'css-2',
        title: '2. المنظور والتحويلات ثلاثية الأبعاد (3D Perspective)',
        difficulty: 'متقدم',
        xpReward: 100,
        summary: 'إنشاء بطاقات تفاعلية تميل في الفضاء ثلاثي الأبعاد بالاعتماد على خصائص perspective و rotateY.',
        explanationBlocks: [
          {
            heading: 'إعداد المشهد ثلاثي الأبعاد',
            body: 'تُحدد خاصية perspective في العنصر الأب عمق نقطة الرؤية بالنسبة للمشاهد بالبكسل. عند تطبيق transform: rotateY() على العنصر الفرعي، يدور العنصر حول محوره الرأسي داخل هذا المشهد المنظوري.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'تمنح خاصية transform-style: preserve-3d العناصر الداخلية القدرة على العيش في الفضاء ثلاثي الأبعاد نفسه، مما يسمح بإبراز الأيقونات والنصوص للأمام بواسطة translateZ().'
          }
        ],
        starterCode: {
          html: `<div class="card-scene">
  <div class="interactive-card">
    <div class="tag">فريق الهندسة</div>
    <h3>مستشار الواجهات</h3>
    <p>تصميم وتطوير تجارب الويب التفاعلية ذات الأداء العالي.</p>
    <div class="action-badge">CSS 3D Engine</div>
  </div>
</div>`,
          css: `.card-scene {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  /* المهمة: أضف خاصية المنظور هنا */
  perspective: 1000px;
}
.interactive-card {
  width: 260px;
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-strong, #334155);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: transform 250ms ease, border-color 250ms ease;
  transform-style: preserve-3d;
}
/* المهمة: إمالة الكارت عند مرور المؤشر */
.interactive-card:hover {
  transform: translateY(-8px) rotateY(15deg);
  border-color: #6366f1;
}
h3 {
  margin: 10px 0 6px 0;
  color: var(--color-text-base, #f8fafc);
  font-size: 15px;
}
p {
  color: var(--color-text-muted, #94a3b8);
  font-size: 12px;
  margin-bottom: 16px;
  line-height: 1.5;
}
.tag {
  font-size: 10px;
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;
}
.action-badge {
  background: #6366f1;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}`,
          js: `console.log('المشهد ثلاثي الأبعاد جاهز.');`
        },
        challenge: {
          missionTitle: 'تفعيل المنظور والدوران ثلاثي الأبعاد',
          instructions: 'تأكد من وجود perspective: 1000px في فئة .card-scene و transform: translateY(-8px) rotateY(15deg) في حالة hover، ثم افحص الحل.',
          hint: 'تحقق من كتابة perspective: 1000px في .card-scene وتطبيق الدوران rotateY(15deg) في hover.',
          validateFnString: `
            const container = iframeDoc.querySelector('.card-scene');
            const card = iframeDoc.querySelector('.interactive-card');
            if (!container || !card) return { passed: false, message: 'عناصر المشهد غير موجودة.' };
            
            const comp = iframeDoc.defaultView.getComputedStyle(container);
            if (!comp.perspective || comp.perspective === 'none') {
              return { passed: false, message: 'يجب ضبط خاصية perspective بقيمة 1000px في الحاوية .card-scene.' };
            }
            return { passed: true, message: 'تم إعداد المنظور ثلاثي الأبعاد وتطبيق الدوران بشكل متناسق.' };
          `
        },
        visualMission: {
          type: 'hologram-card',
          targetLabel: 'بطاقة المنظور ثلاثي الأبعاد',
          checkKey: 'card3d'
        }
      },
      {
        id: 'css-3',
        title: '3. التخطيط المرن بواسطة Flexbox',
        difficulty: 'متوسط',
        xpReward: 100,
        summary: 'توزيع وضبط تباعد العناصر الأفقية بانتظام ومرونة باستخدام خصائص Flexbox الأساسية.',
        explanationBlocks: [
          {
            heading: 'محاذاة العناصر في Flexbox',
            body: 'يتحكم نظام Flexbox في اتجاه وتوزيع العناصر على المحور الرئيسي عبر justify-content (مثل space-between و space-around) وعلى المحور العمودي عبر align-items.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'توفر خاصية gap طريقة قياسية لضبط المسافات البينية بين العناصر دون الحاجة لتطبيق هوامش جانبية (margin) معقدة على العناصر الأولى أو الأخيرة.'
          }
        ],
        starterCode: {
          html: `<div class="station-container">
  <div class="station-title">محطة التوزيع المدارية</div>
  <!-- المهمة: ضبط توزيع العناصر الأربعة باستخدام Flexbox -->
  <div class="modules-dock">
    <div class="module">الوحدة الأولى</div>
    <div class="module">الوحدة الثانية</div>
    <div class="module">الوحدة الثالثة</div>
    <div class="module">الوحدة الرابعة</div>
  </div>
</div>`,
          css: `.station-container {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.1));
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}
.station-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-base, #f8fafc);
  margin-bottom: 20px;
}
/* المهمة: إضافة الخصائص هنا */
.modules-dock {
  /* أضف:
     display: flex;
     justify-content: space-around;
     align-items: center;
  */
  background: var(--color-bg-elevated, #0e131b);
  border-radius: 8px;
  padding: 16px;
}
.module {
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid #6366f1;
  color: #c7d2fe;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}`,
          js: `console.log('تم تحميل محطة التوزيع.');`
        },
        challenge: {
          missionTitle: 'موازنة توزيع الوحدات',
          instructions: 'داخل فئة .modules-dock، أضف الخصائص: display: flex و justify-content: space-around و align-items: center، ثم اضغط تحقق من الحل.',
          hint: 'اكتب في كلاس .modules-dock الخصائص الثلاث: display: flex; justify-content: space-around; align-items: center;',
          validateFnString: `
            const dock = iframeDoc.querySelector('.modules-dock');
            if (!dock) return { passed: false, message: 'عنصر .modules-dock غير موجود.' };
            const comp = iframeDoc.defaultView.getComputedStyle(dock);
            
            if (comp.display !== 'flex') {
              return { passed: false, message: 'خاصية display يجب أن تكون flex. القيمة الحالية: ' + comp.display };
            }
            const jc = comp.justifyContent;
            if (jc !== 'space-around' && jc !== 'space-between' && jc !== 'space-evenly') {
              return { passed: false, message: 'خاصية justify-content يجب أن تكون space-around أو space-between. القيمة الحالية: ' + jc };
            }
            return { passed: true, message: 'تم توزيع الوحدات بانتظام ومحاذاتها بنجاح عبر Flexbox.' };
          `
        },
        visualMission: {
          type: 'satellites-orbit',
          targetLabel: 'توازن التوزيع المداري',
          checkKey: 'satellitesBalanced'
        }
      },
      {
        id: 'css-4',
        title: '4. الحركات الدورية عبر @keyframes',
        difficulty: 'متوسط',
        xpReward: 100,
        summary: 'بناء حركة دوران متصلة وناعمة بزاوية 360 درجة دون الحاجة لكتابة كود JavaScript.',
        explanationBlocks: [
          {
            heading: 'قاعدة @keyframes وخاصية animation',
            body: 'تحدد قاعدة @keyframes النقاط الزمنية للحركة (from و to أو بالنسب المئوية). وتتحكم خاصية animation في ربط الحركة وتحديد مدتها ونوع التدرج الزمني وتكرارها المستمر باستخدام infinite.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'تحدد خاصية transform-origin نقطة الارتكاز المركزية للدوران. وتمنح قيمة linear الحركة سرعة زاوية ثابتة بدون تسارع أو تباطؤ، وهي المناسبة لأجهزة الرادار والمسح.'
          }
        ],
        starterCode: {
          html: `<div class="radar-box">
  <div class="radar-circle">
    <div class="radar-grid"></div>
    <div class="radar-sweep"></div>
  </div>
  <div class="radar-text">نظام المسح الدوري النشط</div>
</div>`,
          css: `.radar-box {
  text-align: center;
  padding: 16px;
}
.radar-circle {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: var(--color-bg-elevated, #0e131b);
  border: 1px solid #0d9488;
  overflow: hidden;
}
.radar-grid {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: repeating-radial-gradient(circle, transparent 0, transparent 25px, rgba(13, 148, 136, 0.15) 26px);
}
/* المهمة: بناء وتفعيل حركة radar-spin */
@keyframes radar-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.radar-sweep {
  position: absolute;
  inset: 0;
  background: conic-gradient(from 0deg at 50% 50%, rgba(13, 148, 136, 0.5) 0deg, transparent 60deg);
  transform-origin: center center;
  /* المهمة: تفعيل الحركة هنا */
  animation: radar-spin 3s linear infinite;
}
.radar-text {
  color: var(--color-text-muted, #94a3b8);
  font-size: 12px;
  font-weight: 500;
}`,
          js: `console.log('نظام الرادار جاهز للمسح.');`
        },
        challenge: {
          missionTitle: 'تفعيل دوران ذراع المسح',
          instructions: 'تأكد من وجود قاعدة @keyframes radar-spin بدوران من 0deg إلى 360deg وربطها في .radar-sweep عبر animation: radar-spin 3s linear infinite; ثم تحقق من الحل.',
          hint: 'تأكد من كتابة animation: radar-spin 3s linear infinite; داخل فئة .radar-sweep.',
          validateFnString: `
            const sweep = iframeDoc.querySelector('.radar-sweep');
            if (!sweep) return { passed: false, message: 'عنصر .radar-sweep غير موجود.' };
            const comp = iframeDoc.defaultView.getComputedStyle(sweep);
            
            if (!comp.animationName || comp.animationName === 'none') {
              return { passed: false, message: 'لم يتم ربط خاصية animation بالعنصر.' };
            }
            return { passed: true, message: 'تم تفعيل الحركة الدورية المستمرة بنجاح وبسرعة متسقة.' };
          `
        },
        visualMission: {
          type: 'radar-sweep',
          targetLabel: 'دوران المسح الدوري 360°',
          checkKey: 'radarActive'
        }
      }
    ]
  },

  // ==========================================
  // المسار الثالث: برمجة JavaScript الحية
  // ==========================================
  {
    trackId: 'js-track',
    trackTitle: 'مسار JavaScript والتفاعل الحي',
    trackBadge: 'متحكم الـ DOM والخوارزميات',
    accentColor: '#d97706',
    description: 'السيطرة على عناصر الـ DOM ومعالجة الأحداث، قراءة إحداثيات مؤشر الماوس، وبناء محاكاة فيزيائية نقطية عبر HTML5 Canvas API.',
    lessons: [
      {
        id: 'js-1',
        title: '1. معالجة الأحداث وإدارة حالة الـ DOM',
        difficulty: 'مبتدئ',
        xpReward: 100,
        summary: 'ربط أحداث النقر وتعديل فئات العناصر لتحديث الحالة المرئية والبرمجية للصفحة.',
        explanationBlocks: [
          {
            heading: 'آلية الاستماع للأحداث (addEventListener)',
            body: 'تتيح دالة addEventListener تسجيل استجابة مخصصة لتفاعلات المستخدم كالنقر وإدخال البيانات. وتُعد طريقة classList.toggle الطريقة الأمثل للتبديل بين الحالات النشطة والخاملة للعنصر.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'فصل المنطق البرمجي عن التنسيق: يقوم كود JavaScript بتبديل الفئات فقط (Class Toggle)، بينما تتولى قواعد CSS تحديد المظهر المرئي الناتج عن هذه الفئة.'
          }
        ],
        starterCode: {
          html: `<div class="engine-station">
  <div id="engine" class="engine-block">
    <div class="engine-title">محرك التشغيل الثانوي</div>
    <div class="engine-state">الحالة: متوقف</div>
  </div>
  
  <div class="actions">
    <button id="toggle-engine-btn">تشغيل المحرك</button>
  </div>
</div>`,
          css: `.engine-station {
  text-align: center;
  padding: 20px;
}
.engine-block {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-strong, #334155);
  border-radius: 12px;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto 16px;
  transition: all 200ms ease;
}
.engine-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-base, #f8fafc);
  margin-bottom: 6px;
}
.engine-state {
  font-size: 12px;
  color: var(--color-text-muted, #94a3b8);
}

.engine-block.engine-active {
  border-color: #0d9488;
  background: rgba(13, 148, 136, 0.1);
}
.engine-block.engine-active .engine-state {
  color: #059669;
  font-weight: 600;
}

#toggle-engine-btn {
  background: #0d9488;
  color: #ffffff;
  font-weight: 600;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 150ms ease;
}
#toggle-engine-btn:hover {
  background: #0f766e;
}`,
          js: `const btn = document.getElementById('toggle-engine-btn');
const engine = document.getElementById('engine');

btn.addEventListener('click', () => {
  engine.classList.toggle('engine-active');
  
  const isActive = engine.classList.contains('engine-active');
  const stateText = engine.querySelector('.engine-state');
  if (stateText) {
    stateText.textContent = isActive ? 'الحالة: يعمل بانتظام' : 'الحالة: متوقف';
  }
  console.log('حالة المحرك:', isActive ? 'ACTIVE' : 'OFF');
});`
        },
        challenge: {
          missionTitle: 'تشغيل المحرك عبر النقر',
          instructions: 'شغّل الكود، ثم انقر داخل المعاينة الحية على زر "تشغيل المحرك" لإضافة فئة engine-active، ثم اضغط "تحقق من الحل".',
          hint: 'اضغط على زر التشغيل أولاً، ثم انقر الزر داخل نافذة المعاينة الحية قبل فحص الحل.',
          validateFnString: `
            const engine = iframeDoc.getElementById('engine');
            if (!engine) return { passed: false, message: 'عنصر المحرك #engine غير موجود.' };
            const isActive = engine.classList.contains('engine-active');
            if (!isActive) {
              return { passed: false, message: 'المحرك لا يزال في حالة توقف. اضغط على الزر داخل المعاينة الحية لتفعيله.' };
            }
            return { passed: true, message: 'تم تفعيل حالة المحرك بنجاح وتحديث فئة الـ DOM المطلوبة.' };
          `
        },
        visualMission: {
          type: 'engine-ignition',
          targetLabel: 'محرك التشغيل الثانوي',
          checkKey: 'engineIgnited'
        }
      },
      {
        id: 'js-2',
        title: '2. تتبع إحداثيات مؤشر الماوس (Mouse Tracking)',
        difficulty: 'متوسط',
        xpReward: 100,
        summary: 'قراءة إحداثيات مؤشر الماوس ونقلها كمتغيرات CSS لحظية لتوجيه كشاف الرؤية في الواجهة.',
        explanationBlocks: [
          {
            heading: 'حدث mousemove والإحداثيات النسبية',
            body: 'يوفر كائن الحدث في mousemove إحداثيات المؤشر. للحصول على موضع الماوس النسبي داخل حاوية معينة، نطرح e.clientX و e.clientY من إحداثيات الحاوية المستخرجة عبر getBoundingClientRect().'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'بدلاً من تعديل عناصر DOM فرعية متعددة في كل حركة ماوس، يفضل تمرير الإحداثيات لمتغيرات CSS مثل --x و --y وتفويض المتصفح لتحديث التدرج الضوئي بسلاسة عتادية.'
          }
        ],
        starterCode: {
          html: `<div id="tracking-zone" class="tracking-zone">
  <div class="revealed-content">
    الرمز السري المشفر:
    <strong>ALPHA-CENTAURI-7799</strong>
  </div>
  <div class="mask-layer"></div>
  <div class="instructions">حرّك مؤشر الماوس داخل المربع لتوجيه الكشاف الضوئي</div>
</div>`,
          css: `.tracking-zone {
  position: relative;
  width: 100%;
  height: 220px;
  background: #090d14;
  border-radius: 12px;
  border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.1));
  overflow: hidden;
  cursor: crosshair;
  display: flex;
  align-items: center;
  justify-content: center;
}
.revealed-content {
  font-size: 14px;
  color: var(--color-text-muted, #94a3b8);
  text-align: center;
  z-index: 2;
  font-weight: 500;
}
.revealed-content strong {
  display: block;
  font-size: 16px;
  color: #0d9488;
  margin-top: 6px;
  font-family: monospace;
}
.mask-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle 80px at var(--x, 50%) var(--y, 50%),
    transparent 0%,
    rgba(9, 13, 20, 0.98) 100%
  );
  z-index: 3;
  pointer-events: none;
}
.instructions {
  position: absolute;
  bottom: 8px;
  font-size: 11px;
  color: var(--color-text-subtle, #64748b);
  z-index: 4;
}`,
          js: `const box = document.getElementById('tracking-zone');

box.addEventListener('mousemove', (e) => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  box.style.setProperty('--x', x + 'px');
  box.style.setProperty('--y', y + 'px');
});

console.log('مستشعر تتبع الماوس نشط.');`
        },
        challenge: {
          missionTitle: 'توجيه كشاف الرؤية بالماوس',
          instructions: 'شغّل الكود، ثم حرّك المؤشر داخل المربع في المعاينة الحية لتحديث إحداثيات --x و --y، ثم اضغط "تحقق من الحل".',
          hint: 'تأكد من تحريك الماوس فوق منطقة المعاينة بعد تشغيل الكود ليتم تسجيل الموضع.',
          validateFnString: `
            const box = iframeDoc.getElementById('tracking-zone');
            if (!box) return { passed: false, message: 'عنصر #tracking-zone غير موجود.' };
            return { passed: true, message: 'تم التقاط إحداثيات الماوس وتمريرها للمتغيرات بنجاح.' };
          `
        },
        visualMission: {
          type: 'mouse-spotlight',
          targetLabel: 'توجيه كشاف المؤشر',
          checkKey: 'spotlightMoved'
        }
      },
      {
        id: 'js-3',
        title: '3. المحاكاة والحركة عبر Canvas API',
        difficulty: 'متقدم',
        xpReward: 100,
        summary: 'إدارة حلقة رسم بمعدل 60 إطاراً في الثانية ومعالجة حركة وارتداد الجسيمات داخل الحدود.',
        explanationBlocks: [
          {
            heading: 'حلقة التحريك (Animation Loop)',
            body: 'توفر دالة requestAnimationFrame طريقة مثالية لمزامنة الرسم مع معدل تحديث الشاشة للمتصفح. في كل دورة، نقوم بمسح الإطار السابق، تحديث إحداثيات العناصر بناءً على سرعتها، ثم إعادة رسمها.'
          },
          {
            heading: 'ملاحظة تطبيقية',
            body: 'لمعالجة الارتداد عن حواف العنصر، نقارن الإحداثي بنصف القطر: إذا تجاوز الجسيم الحد الأيمن (x + r > width) أو الحد الأيسر (x - r < 0)، نعكس إشارة السرعة الأفقية (vx = -vx).'
          }
        ],
        starterCode: {
          html: `<div class="canvas-container">
  <div class="canvas-header">
    <span>حجرة المحاكاة النقطية</span>
    <button id="add-particle-btn">+ إضافة جسيم</button>
  </div>
  <canvas id="physics-canvas"></canvas>
</div>`,
          css: `.canvas-container {
  background: var(--color-bg-surface, #151b26);
  border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.1));
  border-radius: 12px;
  overflow: hidden;
  max-width: 440px;
  margin: 0 auto;
}
.canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: var(--color-bg-elevated, #0e131b);
  font-size: 12px;
  color: var(--color-text-base, #f8fafc);
  font-weight: 600;
}
.canvas-header button {
  background: #0d9488;
  color: #ffffff;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
canvas {
  width: 100%;
  height: 220px;
  display: block;
  background: #090d14;
}`,
          js: `const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');
const addBtn = document.getElementById('add-particle-btn');

canvas.width = 440;
canvas.height = 220;

const particles = [
  { x: 100, y: 100, vx: 2.5, vy: 2.0, r: 10, color: '#0d9488' },
  { x: 220, y: 120, vx: -2.0, vy: 2.5, r: 12, color: '#6366f1' },
  { x: 300, y: 70, vx: 3.0, vy: -1.8, r: 8, color: '#f59e0b' }
];

if (addBtn) {
  addBtn.addEventListener('click', () => {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      r: Math.random() * 6 + 6,
      color: ['#0d9488', '#6366f1', '#f59e0b', '#10b981'][Math.floor(Math.random() * 4)]
    });
  });
}

function animate() {
  ctx.fillStyle = 'rgba(9, 13, 20, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x + p.r > canvas.width || p.x - p.r < 0) p.vx = -p.vx;
    if (p.y + p.r > canvas.height || p.y - p.r < 0) p.vy = -p.vy;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();`
        },
        challenge: {
          missionTitle: 'تشغيل حلقة المحاكاة الفيزيائية',
          instructions: 'شغّل الكود وجرب إضافة جسيمات جديدة لملاحظة حلقة التحريك والارتداد المتناسق عن الحواف، ثم تحقق من الحل.',
          hint: 'الكود مجهز ويعمل فور الضغط على زر "شغّل الكود".',
          validateFnString: `
            const canvas = iframeDoc.getElementById('physics-canvas');
            if (!canvas) return { passed: false, message: 'عنصر Canvas غير موجود.' };
            return { passed: true, message: 'حلقة التحريك النقطية تعمل بنجاح بمعدل إطارات سلس.' };
          `
        },
        visualMission: {
          type: 'canvas-plasma',
          targetLabel: 'محاكاة الجسيمات بـ Canvas',
          checkKey: 'plasmaRunning'
        }
      }
    ]
  }
];
