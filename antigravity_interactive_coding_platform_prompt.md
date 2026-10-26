# وثيقة بناء منصة «كودڤيرس (CodeVerse)» لتعليم تطوير الويب التفاعلي — موجهة لـ Antigravity

> **تعليمات مباشرة لـ Antigravity (System Prompt for Builder Agent):**
> أنت مكلف ببناء تطبيق ويب تعليمي تفاعلي متكامل (100% Frontend) لتعليم تطوير الويب (**HTML, CSS, JavaScript**) موجه لطلاب الجامعات باللغتين العربية والإنجليزية. يجب تنفيذ المشروع بالكامل دون أي اختصارات أو تعليقات مثل `// TODO` أو بيانات وهمية ناقصة. التزم بجميع المتطلبات المعمارية، التصميمية، الدروس التفاعلية، نظام الألعاب (Gamification)، ومختبر الأكواد المبهرة (بما في ذلك محاكي المجموعة الشمسية التفاعلي الكامل) الموضحة في هذه الوثيقة.

## 1. الرؤية العامة للمشروع والجمهور المستهدف

منصة **CodeVerse (كودڤيرس)** تجمع بين الهيكل التعليمي المنظم والمباشر لموقع **W3Schools** وبين الإبهار البصري والتفاعلي لعروض **CodePen** الاحترافية (بأسلوب `cbolson` في الكروت التفاعلية والـ Micro-interactions).

| المحور | المواصفات المعتمدة |
| :--- | :--- |
| **الجمهور المستهدف** | طلاب الجامعات (حاسبات ومعلومات، هندسة، ومتعلمو البرمجة ذاتياً) — تصميم عصري واحترافي بروح ممتعة بعيداً عن الطابع الطفولي |
| **اللغة واتجاه الواجهة** | واجهة وشروحات باللغة العربية السلسة (`dir="rtl"`) مع الحفاظ على المصطلحات التقنية والأكواد باللغة الإنجليزية (`dir="ltr"`) |
| **المجال التعليمي** | تطوير الويب الشامل: **HTML5**، **CSS3 & Animations**، **Modern JavaScript & DOM/Canvas** |
| **آلية تشغيل الكود** | زر **«تشغيل الكود (Run Code)»** (`Ctrl + Enter`) مع معاينة حية داخل `iframe` معزول + زر **«تحقق من الحل (Check Challenge)»** |
| **نظام المتعة والتفاعل** | مزدوج: (1) نقاط `XP` ومستويات وشارات وعداد أيام متتالية `Streak` مع احتفالات `Confetti` + (2) تحديات بصرية تفاعلية (تحريك مركبة فضائية وبناء عناصر حية بالكود) |
| **مختبر الإبهار (Wow Lab)** | قسم مخصص للأكواد البصرية القوية (مثل ديمو تفاعلي لحركة المجموعة الشمسية) مع شرح «التريكات البرمجية» خطوة بخطوة وقابلية إضافة أكواد جديدة مستقبلاً |
| **حفظ البيانات (Persistence)** | 100% Frontend يعتمد على `localStorage` لحفظ التقدم، الـ XP، الشارات، تعديلات الكود، والأكواد المبهرة المضافة، مع ميزة تصدير واستيراد ملف التقدم (`JSON`) |

## 2. التقنيات المستخدمة والهيكل المعماري للملفات (Tech Stack & Architecture)

يبنى المشروع باستخدام **React (Vite) + Tailwind CSS + Lucide Icons + Canvas-Confetti** (أو Vanilla ES6 Modules منظمة في حال العمل بدون حزم)، مع الالتزام بهيكل الملفات التالي لضمان سهولة التوسع مستقبلاً:

```text
codeverse-platform/
├── index.html
├── package.json
├── tailwind.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── globals.css               # خطوط Cairo و JetBrains Mono وتأثيرات Glassmorphism
    ├── context/
    │   └── ProgressContext.jsx       # إدارة XP, Levels, Badges, Streak, Custom Demos في localStorage
    ├── data/
    │   ├── curriculumData.js         # الهيكل العام للمسارات والدروس التفاعلية والتحديات
    │   └── showcaseDemosData.js      # الأكواد المبهرة الجاهزة (المجموعة الشمسية، الجزيئات، الكروت ثلاثية الأبعاد)
    ├── utils/
    │   ├── sandboxRunner.js          # دمج HTML/CSS/JS وبناء وثيقة الـ iframe الآمنة
    │   └── challengeValidator.js     # محرك فحص حلول الطلاب وإرجاع رسائل التغذية الراجعة
    └── components/
        ├── Navbar.jsx                # شريط علوي يعرض المستوى، شريط XP، الـ Streak، والتنقل
        ├── SidebarCurriculum.jsx     # قائمة المسارات والدروس مع علامات الإنجاز
        ├── LessonWorkspace.jsx       # تقسيم الشاشة (شرح + تريكات + لعبة بصرية + محرر أكواد)
        ├── CodePlayground.jsx        # محرر متعدد التبويبات (HTML/CSS/JS) مع زر التشغيل والـ Console
        ├── VisualMiniGame.jsx        # لوحة التفاعل البصري التي تتأثر مباشرة بكود الطالب
        ├── ShowcaseLab.jsx           # معرض الأكواد المبهرة (بطاقات تفاعلية + عارض الكود + شرح التريكات)
        └── AddShowcaseModal.jsx      # نافذة إضافة كود مبهر جديد وحفظه مباشرة في المنصة
```

## 3. نظام التصميم والهوية البصرية (UI/UX & cbolson CodePen Aesthetics)

* **لوحة الألوان (Cyber-Space Dark Theme):**
  * الخلفية الأساسية: `#0B0F19` (كحلي فضائي عميق) والأسطح الثانوية `#111827` مع حدود شفافة `rgba(255, 255, 255, 0.08)`.
  * ألوان التمييز: سماوي متوهج `#06B6D4` لمسار HTML، بنفسجي نيون `#8B5CF6` لمسار CSS، أصفر كهرماني `#F59E0B` لمسار JavaScript، وأخضر زمردي `#10B981` لنجاح التحديات.
* **الخطوط (Typography):**
  * النصوص العربية والعناوين: خط `Cairo` أو `IBM Plex Sans Arabic`.
  * محرر الأكواد والمصطلحات البرمجية: خط `JetBrains Mono` أو `Fira Code` باتجاه `ltr` دائماً.
* **اللمسات التفاعلية المستوحاة من عروض `cbolson` على CodePen:**
  * بطاقات ذات إضاءة تتبع حركة الماوس (`Spotlight Hover Effect` عبر متغيرات CSS `--mouse-x` و `--mouse-y`).
  * انتقالات ناعمة للتبويبات (`Morphing Tabs`) وحركات فيزيائية مرنة (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
  * أزرار تشغيل الكود بتوهج تفاعلي وعند النجاح تنطلق قصاصات احتفالية (`Confetti`) مع صوت/نبضة بصرية لمكافأة الطالب.

## 4. محرك تشغيل الأكواد والمصحح التلقائي (Interactive Playground & Auto-Grader)

### 4.1. مكون `CodePlayground` (بأسلوب W3Schools المطوّر)
1. **تبويبات الكود:** 3 تبويبات واضحة (`index.html`, `style.css`, `script.js`) مع ترقيم الأسطر، تلوين الكود (Syntax Highlighting)، وزر **«إعادة ضبط الكود (Reset)»** وزر **«نسخ الكود (Copy)»**.
2. **زر التشغيل اليدوي:** الكود لا يُنفذ عشوائياً أثناء الكتابة حتى لا يربك المتعلم، بل يعمل عند الضغط على زر **«▶ تشغيل الكود (Run)»** أو اختصار `Ctrl + Enter`.
3. **لوحة النتيجة المزدوجة:**
   * **تبويب المعاينة الحية (Live Preview):** يعرض النتيجة داخل `iframe` معزول (`sandbox="allow-scripts allow-same-origin"`).
   * **تبويب مخرجات الكونسول (Console Output):** يلتقط أي `console.log` أو خطأ برمجي (`window.onerror`) داخل الـ `iframe` ويعرضه للطالب بشكل واضح باللونين الأخضر أو الأحمر.

### 4.2. الكود المرجعي لمحرك الدمج والفحص (`src/utils/sandboxRunner.js`)

```javascript
export function buildSandboxSrcDoc({ html = '', css = '', js = '' }) {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 16px;
            font-family: system-ui, -apple-system, sans-serif;
            background: #0f172a;
            color: #f8fafc;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          (function() {
            const sendLog = (type, args) => {
              window.parent.postMessage({
                source: 'codeverse-sandbox',
                type,
                payload: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
              }, '*');
            };
            const origLog = console.log;
            const origError = console.error;
            console.log = (...args) => { origLog(...args); sendLog('log', args); };
            console.error = (...args) => { origError(...args); sendLog('error', args); };
            window.onerror = (msg, url, line) => {
              sendLog('error', [msg + ' (Line ' + line + ')']);
            };
          })();
          try {
            ${js}
          } catch (err) {
            console.error(err.message);
          }
        </script>
      </body>
    </html>
  `;
}
```

## 5. نظام التلعيب المزدوج (Dual Gamification System)

### 5.1. نظام النقاط والمستويات والشارات (`ProgressContext.jsx`)
* **النقاط (`XP`):**
  * تشغيل وتجربة أي درس لأول مرة: `+25 XP`.
  * اجتياز تحدي الدرس بنجاح من أول محاولة: `+100 XP` (أو `+75 XP` عند استخدام تلميح).
  * استكشاف وتجربة كود من «مختبر الإبهار»: `+30 XP`.
* **المستويات (Levels):**
  * معادلة المستوى: كل `250 XP` ترفع الطالب لمستوى جديد مع لقب جامعي/تقني ممتع:
    * المستوى 1: `مستكشف الويب (Web Explorer)`
    * المستوى 2: `مهندس العناصر (DOM Architect)`
    * المستوى 3: `فنان التصميم الحركي (CSS Alchemist)`
    * المستوى 4: `قائد الخوارزميات (JS Commander)`
    * المستوى 5+: `أسطورة الواجهات التفاعلية (Full-Frontend Wizard)`
* **الشارات (Unlockable Badges):**
  * `🚀 أول إقلاع`: تشغيل أول كود في المنصة.
  * `🎯 قناص الـ Attributes`: إنهاء مسار أساسيات وخصائص HTML.
  * `🎨 ساحر الـ Hover`: إتقان تحديات الحركات وبطاقات CSS التفاعلية.
  * `🪐 مهندس الفضاء`: تعديل سرعة الكواكب في ديمو المجموعة الشمسية.
  * `🔥 شعلة النشاط`: فتح المنصة والتعلم لـ 3 أيام متتالية.

### 5.2. اللعبة البصرية التفاعلية داخل الدروس (`VisualMiniGame.jsx`)
إلى جانب معاينة الكود التقليدية، يحتوي كل تحدٍّ على **شاشة مهمة بصرية (Mission HUD)** تتفاعل مع كود الطالب:
* في دروس **HTML Attributes**: يظهر روبوت/مركبة فضائية تحتاج إلى تفعيل درع الطاقة عن طريق ضبط خصائص العنصر (`id="rover-shield"`, `data-power="100"`, `disabled` removal، أو `src` لصورة البطارية).
* في دروس **CSS Flexbox & Grid**: تظهر جسور ومنصات طائرة في الفضاء تتحرك فعلياً في الشاشة فور كتابة الطالب لـ `justify-content: space-between` أو `transform: rotate(...)` وتوصيل المركبة للهدف.
* في دروس **JavaScript**: يتحكم الطالب في رادار أو مدفع ليزر يصوب نحو الكويكبات عبر كتابة دالة `calculateAngle()` أو ربط حدث `addEventListener('click', fireLaser)`.

## 6. الهيكل العام للدروس التفاعلية الجاهزة (`src/data/curriculumData.js`)

يجب تضمين المسارات الثلاثة التالية بكامل دروسها وتحدياتها وشرح التريكات الخاصة بها، مع تصميم الواجهة بحيث تقرأ أي درس جديد يُضاف إلى هذه المصفوفة تلقائياً:

| المسار | رقم واسم الدرس | المفهوم الأساسي (عربي/إنجليزي) | التحدي التفاعلي واللعبة البصرية |
| :--- | :--- | :--- | :--- |
| **1. مسار HTML5 الذكي** | `html-1`: أسرار الـ Attributes | فهم الخصائص (`href`, `src`, `alt`, `title`, `target`) كما في W3Schools | شحن بطارية المركبة عبر إصلاح رابط الصورة `src` وإضافة `data-energy="100"` |
| **1. مسار HTML5 الذكي** | `html-2`: خصائص `data-*` المخصصة | تخزين بيانات ديناميكية داخل عناصر HTML لقراءتها بالـ JS والـ CSS | برمجة 3 كروت كواكب تحمل `data-gravity` وعرض قيمتها تلقائياً بالـ CSS `attr()` |
| **1. مسار HTML5 الذكي** | `html-3`: النماذج التفاعلية والـ Validation | خصائص `required`, `pattern`, `type="range"`, `placeholder` | بناء لوحة تحكم إطلاق الصاروخ ومنع الإقلاع بدون إدخال كود الكابتن الصحيح |
| **2. مسار CSS3 والإبهار** | `css-1`: متغيرات CSS (`Custom Properties`) | استخدام `--main-color` وتحديث الثيم لحظياً | تحويل لوحة القيادة من الوضع العادي إلى وضع الطاقة القصوى (`Neon Mode`) |
| **2. مسار CSS3 والإبهار** | `css-2`: كروت التوهج وحركات `Hover` (`cbolson` Style) | `transform`, `perspective`, `backdrop-filter`, والتدرجات اللونية | تصميم بطاقة عضو فريق هندسي ترتفع وتتوهج ثلاثية الأبعاد عند مرور الماوس |
| **2. مسار CSS3 والإبهار** | `css-3`: تخطيط `Flexbox` و `Grid` العملي | توزيع العناصر في الفضاء بمرونة تامة | رصّ 4 أقمار صناعية في مدار متوازن باستخدام `justify-content: space-around` و `align-items: center` |
| **2. مسار CSS3 والإبهار** | `css-4`: الحركات المستمرة `@keyframes` | صناعة نبضات وإشعاعات وتدوير العناصر بدون JS | تحريك رادار كشف الكويكبات بدوران 360 درجة مستمر وناعم |
| **3. مسار JavaScript الحي** | `js-1`: السيطرة على الـ DOM والأحداث | `querySelector`, `classList.toggle`, `addEventListener` | برمجة زر تشغيل محرك الدفع النفاث وتغيير حالة المحرك بصرياً |
| **3. مسار JavaScript الحي** | `js-2`: التفاعل مع حركة الماوس (`Mouse Tracking`) | قراءة `clientX` و `clientY` لتحديث متغيرات CSS | صناعة كشاف ضوئي يتبع مؤشر الماوس للكشف عن الرسالة السرية في الظلام |
| **3. مسار JavaScript الحي** | `js-3`: الرسم والتحريك عبر `Canvas API` | حلقة التحريك `requestAnimationFrame` ورسم الأشكال المتحركة | إطلاق كرات طاقة متحركة ترتد من حواف الشاشة وتغير لونها عند الاصطدام |

### نموذج كود فعلي لدرس تفاعلي داخل `curriculumData.js` (يجب تضمين بقية الدروس بنفس البنية الكاملة)

```javascript
export const CURRICULUM_DATA = [
  {
    trackId: 'html-track',
    trackTitle: 'مسار HTML5 والخصائص الذكية (HTML Attributes & Structure)',
    trackBadge: '🎯 قناص الـ Attributes',
    accentColor: '#06B6D4',
    lessons: [
      {
        id: 'html-1',
        title: '1. أسرار الـ HTML Attributes (خصائص العناصر)',
        difficulty: 'مبتدئ',
        xpReward: 100,
        summary: 'الـ Attributes هي القوة الخفية التي تمنح عناصر HTML خصائص إضافية مثل الروابط، الصور، التلميحات، والبيانات المخصصة.',
        explanationBlocks: [
          {
            heading: 'يعني إيه Attribute في HTML؟',
            body: 'كل عنصر HTML ممكن ياخد خصائص إضافية (Attributes) بتتكتب دايماً جوه وسم البداية (Start Tag) على شكل زوج: name="value". زي مثلاً خاصية href في الروابط و src في الصور.'
          },
          {
            heading: 'تريكة المحترفين (The Secret Trick) ✨',
            body: 'تقدر تستخدم خاصية title على أي عنصر عشان يظهر Tooltip تلقائي لما المستخدم يقف بالماوس عليه، وتقدر تستخدم data-* عشان تخزن أي معلومة تقراها بالـ CSS أو الـ JS!'
          }
        ],
        starterCode: {
          html: `<div class="rover-card">\n  <h2>🤖 مركبة استكشاف المريخ</h2>\n  <!-- المهمة: أصلح خاصية title وأضف data-power="100" للزر بالأسفل -->\n  <button id="activate-btn" title="غير مفعل" data-power="0">\n    تشغيل درع الطاقة ⚡\n  </button>\n</div>`,
          css: `.rover-card {\n  background: rgba(15, 23, 42, 0.9);\n  border: 1px solid rgba(6, 182, 212, 0.4);\n  border-radius: 16px;\n  padding: 24px;\n  text-align: center;\n}\nbutton {\n  background: #06b6d4;\n  color: #0b0f19;\n  font-weight: bold;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\nbutton[data-power="100"] {\n  background: #10b981;\n  box-shadow: 0 0 25px rgba(16, 185, 129, 0.7);\n  transform: scale(1.05);\n}`,
          js: `const btn = document.getElementById('activate-btn');\nif (btn) {\n  console.log('Current Rover Power:', btn.getAttribute('data-power'));\n}`
        },
        challenge: {
          missionTitle: 'مهمة شحن درع المركبة الفضائية 🛡️',
          instructions: 'غيّر قيمة الخاصية `data-power` في زر `#activate-btn` لتصبح `"100"`، واجعل خاصية `title` تساوي `"الدرع جاهز"` ثم اضغط «تشغيل الكود» متبوعاً بـ «تحقق من الحل».',
          hint: 'ابحث عن السطر `<button id="activate-btn" ...>` وعدّل القيم بين علامات التنصيص لتكون `title="الدرع جاهز" data-power="100"`.',
          validateFnString: `
            const btn = iframeDoc.getElementById('activate-btn');
            if (!btn) return { passed: false, message: 'الزر #activate-btn غير موجود في الصفحة!' };
            const power = btn.getAttribute('data-power');
            const title = btn.getAttribute('title');
            if (power !== '100') return { passed: false, message: 'قيمة data-power ما زالت ' + power + ' — اجعلها "100" لشحن الدرع!' };
            if (!title || title === 'غير مفعل') return { passed: false, message: 'لا تنسَ تحديث خاصية title لتصبح "الدرع جاهز"!' };
            return { passed: true, message: 'عمل رائع يا بشمهندس! تم شحن درع المركبة بنسبة 100% وتوهج باللون الأخضر!' };
          `
        }
      }
    ]
  }
];
```

## 7. مختبر الأكواد المبهرة (Wow & Tricks Showcase Lab) + القابلية للتوسع

يُخصص قسم رئيسي في الموقع باسم **«✨ مختبر الإبهار والتريكات (Wow Showcase Lab)»**. يعرض هذا القسم أكواداً بصرية قوية جداً وجاهزة للتشغيل والتعديل الفوري، وينقسم كل مثال فيه إلى:
1. **المعاينة التفاعلية الحية (Interactive Demo Stage):** مع إمكانية تكبيرها لملء الشاشة (`Fullscreen Mode`).
2. **الكود الكامل القابل للتعديل (Live Editable Code):** يمكن للطالب تعديل أي رقم أو لون والضغط على **«تشغيل الكود»** ليرى التأثير فوراً.
3. **بطاقات «إزاي اتعملت؟ (شرح التريكات البرمجية)»:** تشرح باللغة العربية البسيطة الخدع الرياضية والبرمجية وراء هذا الكود المبهر.

### 7.1. الأمثلة الثلاثة المبهرة الجاهزة (Built-in Heavyweight Showcases)

يجب وضع هذه الأمثلة الثلاثة كاملة بالكود الفعلي داخل `src/data/showcaseDemosData.js`:

#### المثال الأول: محاكي المجموعة الشمسية التفاعلي (Interactive Solar System Orbit Simulator) 🪐
* **فكرة الإبهار:** محاكاة حية ودقيقة لحركة الكواكب حول الشمس باستخدام `HTML5 Canvas` وحساب المدارات المثلثية (`Math.cos` و `Math.sin`)، مع خلفية نجوم متلألئة، مسارات مدارية، إمكانية التحكم في سرعة الزمن (`Time Warp Slider`)، تكبير/تصغير المدار (`Zoom`)، وإمكانية الضغط على أي كوكب لعرض بطاقة معلومات فيزيائية عنه!
* **الكود الكامل الجاهز للتضمين في `showcaseDemosData.js`:**

```javascript
export const SOLAR_SYSTEM_DEMO = {
  id: 'solar-system-simulator',
  title: 'محاكي المجموعة الشمسية التفاعلي (Interactive Solar System)',
  category: 'Canvas & Physics Simulation',
  difficulty: 'متقدم ومبهر 🔥',
  description: 'محاكاة فيزيائية بصرية لحركة الكواكب حول الشمس مع تحكم كامل في سرعة الزمن، إظهار المسارات، واختيار الكواكب لعرض بياناتها.',
  tricksExplained: [
    {
      title: '1. الخدعة الرياضية لحركة الكواكب في مدار دائري (Trigonometry Orbit)',
      concept: 'Math.cos(angle) & Math.sin(angle)',
      explanation: 'بدل تحريك الكوكب بخطوط مستقيمة، بنحفظ لكل كوكب نصف قطر مداره (distance) وزاويته الحالية (angle). في كل فريم بنحدث الإحداثيات بالمعادلة: x = centerX + Math.cos(angle) * distance و y = centerY + Math.sin(angle) * distance.'
    },
    {
      title: '2. السرعة النسبية حسب قانون كبلر المبسط',
      concept: 'Angular Velocity (angularSpeed)',
      explanation: 'الكواكب القريبة من الشمس (مثل عطارد) لها سرعة زاوية أكبر بكثير من الكواكب البعيدة (مثل نبتون)، ومع ضرب السرعة في قيمة شريط Time Scale نقدر نسرّع أو نبطئ الزمن لحظياً.'
    },
    {
      title: '3. التوهج الشمسي والمجال الضوئي',
      concept: 'ctx.createRadialGradient()',
      explanation: 'لإعطاء الشمس مظهراً حقيقياً متوهجاً بدون صور خارجية، نستخدم تدرجاً دائرياً متعدد الطبقات يبدأ من الأبيض المصفر في المركز وينتهي بشفافية تامة على الأطراف.'
    }
  ],
  code: {
    html: `<div class="solar-ui">
  <div class="controls-bar">
    <label>⚡ سرعة الزمن: <input type="range" id="speedRange" min="0" max="5" step="0.1" value="1" /></label>
    <button id="toggleOrbits">مسارات الكواكب: مفعلة</button>
    <span id="planetInfo">اضغط على أي كوكب لعرض معلوماته 🪐</span>
  </div>
  <canvas id="solarCanvas"></canvas>
</div>`,
    css: `.solar-ui {
  position: relative;
  width: 100%;
  height: 460px;
  background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
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
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid rgba(6, 182, 212, 0.3);
  z-index: 10;
  direction: rtl;
  font-size: 13px;
}
.controls-bar button {
  background: #06b6d4;
  color: #030712;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
#planetInfo {
  color: #38bdf8;
  font-weight: 600;
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
const orbitBtn = document.getElementById('toggleOrbits');
const infoSpan = document.getElementById('planetInfo');

let showOrbits = true;
let selectedPlanet = null;

function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resize);
resize();

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.5 + 0.3,
  alpha: Math.random()
}));

const planets = [
  { name: 'عطارد (Mercury)', radius: 4, dist: 45, speed: 0.04, angle: 0.2, color: '#94a3b8', info: 'أقرب كوكب للشمس — سنته 88 يوماً فقط!' },
  { name: 'الزهرة (Venus)', radius: 6, dist: 70, speed: 0.028, angle: 1.4, color: '#fbbf24', info: 'أسخن كوكب في المجموعة الشمسية بسبب الاحتباس الحراري.' },
  { name: 'الأرض (Earth)', radius: 7, dist: 100, speed: 0.02, angle: 2.8, color: '#38bdf8', hasMoon: true, info: 'كوكبنا الأزرق الوحيد الذي يحتضن الحياة والمياه السائلة.' },
  { name: 'المريخ (Mars)', radius: 5.5, dist: 130, speed: 0.015, angle: 4.1, color: '#ef4444', info: 'الكوكب الأحمر ويضم أكبر بركان في المجموعة الشمسية (أوليمبوس).' },
  { name: 'المشتري (Jupiter)', radius: 13, dist: 172, speed: 0.009, angle: 5.0, color: '#d97706', info: 'عملاق غازي ضخم يتسع لأكثر من 1300 كوكب بحجم الأرض!' },
  { name: 'زحل (Saturn)', radius: 11, dist: 215, speed: 0.006, angle: 0.9, color: '#fde047', hasRings: true, info: 'يتميز بحلقاته الجليدية والصخرية المذهلة.' }
];

orbitBtn.addEventListener('click', () => {
  showOrbits = !showOrbits;
  orbitBtn.textContent = showOrbits ? 'مسارات الكواكب: مفعلة' : 'مسارات الكواكب: مخفية';
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 15;

  for (const p of planets) {
    const px = cx + Math.cos(p.angle) * p.dist;
    const py = cy + Math.sin(p.angle) * p.dist;
    if (Math.hypot(mx - px, my - py) <= p.radius + 8) {
      selectedPlanet = p;
      infoSpan.textContent = p.name + ': ' + p.info;
      return;
    }
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 15;
  const timeScale = parseFloat(speedInput.value);

  // رسم النجوم الخلفية
  stars.forEach(s => {
    ctx.fillStyle = \`rgba(255, 255, 255, \${0.3 + Math.abs(Math.sin(Date.now() * 0.001 + s.x * 10)) * 0.7})\`;
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // رسم الشمس المتوهجة
  const sunGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 38);
  sunGrad.addColorStop(0, '#fffbeb');
  sunGrad.addColorStop(0.4, '#f59e0b');
  sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fill();

  planets.forEach(p => {
    p.angle += p.speed * timeScale;
    const px = cx + Math.cos(p.angle) * p.dist;
    const py = cy + Math.sin(p.angle) * p.dist;

    if (showOrbits) {
      ctx.strokeStyle = selectedPlanet === p ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = selectedPlanet === p ? 1.5 : 1;
      ctx.beginPath();
      ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
      ctx.stroke();
    }

    // حلقات زحل
    if (p.hasRings) {
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(px, py, p.radius + 8, p.radius - 5, 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // الكوكب
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.radius, 0, Math.PI * 2);
    ctx.fill();

    // قمر الأرض
    if (p.hasMoon) {
      const mx = px + Math.cos(p.angle * 6) * 14;
      const my = py + Math.sin(p.angle * 6) * 14;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(mx, my, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  requestAnimationFrame(animate);
}
animate();`
  }
};
```

#### المثال الثاني: بطاقات الهولوجرام التفاعلية ثلاثية الأبعاد (3D Holographic Spotlight Cards — `cbolson` Style) ✨
* **فكرة الإبهار:** مجموعة بطاقات تفاعلية تميل في الفضاء ثلاثي الأبعاد (`rotateX` و `rotateY`) حسب موقع الماوس بدقة مع انعكاس ضوئي هولوجرامي (`conic-gradient` + `mix-blend-mode: color-dodge`) وتوسيع سلس للمحتوى عند الضغط.
* **التريكات المشروحة فيه:**
  1. تحويل إحداثيات الماوس داخل البطاقة إلى زوايا دوران بين `-15deg` و `+15deg` وتمريرها لـ CSS عبر `style.setProperty('--rx', ...)`.
  2. استخدام `perspective: 1000px` و `transform-style: preserve-3d` لبروز الأيقونات والعناوين في طبقة أعلى (`translateZ(40px)`).
  3. صناعة حافة متوهجة متحركة باستخدام `::before` مع `mask-composite: exclude`.

#### المثال الثالث: شبكة الجزيئات والجاذبية التفاعلية (Interactive Particle Constellation & Mouse Gravity) 🌌
* **فكرة الإبهار:** شبكة من النقاط المضيئة المتصلة بخطوط ديناميكية تتجاذب أو تتنافر مع مؤشر الماوس، وعند الضغط بالماوس تتولد موجة صدمة (`Shockwave`) تدفع الجزيئات بألوان نيون متغيرة.
* **التريكات المشروحة فيه:**
  1. حساب المسافة الإقليدية `Math.hypot(dx, dy)` بين كل جزيئين ورسم خط بشفافية تتناسب عكسياً مع المسافة (`1 - dist / maxDist`).
  2. تطبيق متجهات السرعة والتسارع (`vx`, `vy`) والاحتكاك الفيزيائي (`friction = 0.98`) لعودة الجزيئات لسرعتها الطبيعية بسلاسة.

### 7.2. نظام إضافة أكواد مبهرة جديدة في المستقبل (Extensibility Architecture)

لضمان قدرة صاحب الموقع على إضافة عدد لا نهائي من الأكواد المبهرة مستقبلاً بطريقتين سهلتين:

1. **من خلال واجهة الموقع مباشرة (UI Modal — بدون لمس الكود المصدري):**
   * زر بارز في «مختبر الإبهار» بعنوان **«+ أضف كوداً مبهراً جديداً (Add New Showcase)»**.
   * يفتح نافذة (`AddShowcaseModal.jsx`) تتيح إدخال:
     * عنوان الديمو، التصنيف، ومستوى الصعوبة.
     * أكواد `HTML` و `CSS` و `JS` مع معاينة فورية.
     * قائمة «التريكات المشروحة» (إمكانية إضافة أكثر من تريكة: عنوان التريكة + المفهوم التقني + الشرح بالعربي).
   * عند الحفظ، يُدمج الديمو الجديد فوراً في المعرض ويُحفظ في `localStorage` تحت المفتاح `codeverse_custom_showcases`، مع زر **«تصدير كود JSON (Export Showcase Object)»** لنسخه ولصقه مباشرة في ملف `showcaseDemosData.js` إذا أراد تثبيته في الكود المصدري.

2. **من خلال الكود المصدري (`src/data/showcaseDemosData.js`):**
   * يلتزم الملف بعقد بيانات موحد (`Schema`) بحيث يكفي إضافة كائن جديد داخل المصفوفة `SHOWCASE_DEMOS` ليظهر تلقائياً بجميع مميزاته (البطاقة، المحرر، زر ملء الشاشة، وشرح التريكات).

```javascript
// Schema موحد لإضافة أي كود مبهر مستقبلاً في src/data/showcaseDemosData.js
export const SHOWCASE_SCHEMA_TEMPLATE = {
  id: 'unique-demo-slug',
  title: 'اسم الديمو بالعربي والإنجليزي',
  category: 'CSS Art / Canvas / WebGL / UI Micro-interaction',
  difficulty: 'متوسط | متقدم ومبهر 🔥',
  description: 'وصف مختصر لما يقدمه هذا الكود المبهر.',
  tricksExplained: [
    {
      title: 'عنوان التريكة الأولى',
      concept: 'CSS Property or JS API',
      explanation: 'شرح مبسط وممتع لطلاب الجامعة عن كيفية عمل هذه الخدعة البرمجية.'
    }
  ],
  code: {
    html: '<!-- HTML Code -->',
    css: '/* CSS Code */',
    js: '// JavaScript Code'
  }
};
```

## 8. خطوات التنفيذ ومعايير القبول لـ Antigravity (Execution Checklist)

عند بناء المشروع، التزم بالترتيب التالي وتأكد من تحقق جميع النقاط قبل إنهاء المهمة:

1. **تهيئة المشروع والتصميم الأساسي:**
   * إعداد React + Tailwind CSS مع دعم كامل لاتجاه `RTL` للنصوص العربية و `LTR` لمحرر الأكواد.
   * تصميم شريط التنقل العلوي (`Navbar`) الذي يعرض: شعار **CodeVerse**، التبديل بين **«المسارات التعليمية (Learn & Play)»** و **«مختبر الإبهار (Wow Showcase Lab)»**، عداد النقاط `XP`، شريط التقدم للمستوى التالي، وزر عرض الشارات المكتسبة.
2. **بناء بيئة التعلم التفاعلية (`LessonWorkspace` + `CodePlayground`):**
   * عرض الشرح النظري المبسط و«تريكة المحترفين» بجانب شاشة المهمة البصرية (`VisualMiniGame`).
   * تفعيل زر **«تشغيل الكود (Run)»** لتحديث الـ `iframe` والتقاط رسائل `console.log` والأخطاء.
   * تفعيل زر **«تحقق من الحل (Check Answer)»** الذي يشغل دالة الفحص الخاصة بالدرس، يمنح نقاط الـ `XP`، يطلق احتفالات `Confetti`، ويفتح الدرس التالي.
3. **بناء مختبر الإبهار (`ShowcaseLab` + `AddShowcaseModal`):**
   * تضمين الأمثلة الثلاثة الكبرى كاملة (محاكي المجموعة الشمسية التفاعلي، بطاقات الهولوجرام ثلاثية الأبعاد بأسلوب `cbolson`، وشبكة الجزيئات والجاذبية).
   * عرض تبويب **«إزاي اتعملت؟ (شرح التريكات)»** بجانب الكود الحي لكل ديمو.
   * بناء نافذة **«+ إضافة كود مبهر جديد»** مع ميزة الحفظ المحلي وتصدير الكائن كـ `JSON`.
4. **حفظ التقدم والبيانات (`localStorage`):**
   * حفظ جميع الدروس المكتملة، الـ `XP`، الشارات، آخر كود كتبه الطالب في كل درس، والأكواد المبهرة المضافة، مع توفير زر في الإعدادات لتصدير أو استيراد ملف التقدم.
