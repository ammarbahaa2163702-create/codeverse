/**
 * progressConstants.js
 * Centralized configuration for CodeVerse gamification, levels, badges, and storage schema.
 */

export const SCHEMA_VERSION = 2;
export const STORAGE_KEY = 'codeverse_user_progress_v2';
export const DRAFTS_KEY = 'codeverse_code_drafts_v2';
export const CUSTOM_SHOWCASES_KEY = 'codeverse_custom_showcases_v2';
export const THEME_KEY = 'codeverse_theme_preference';

export const BADGES_LIST = [
  {
    id: 'first-run',
    title: 'أول تشغيل برمجي',
    description: 'تشغيل أول كود داخل بيئة التجربة التفاعلية.',
    iconName: 'Compass',
    category: 'الأساسيات'
  },
  {
    id: 'html-master',
    title: 'متخصص خصائص HTML',
    description: 'إكمال جميع تحديات مسار بنية وخصائص HTML5 بنجاح.',
    iconName: 'FileCode',
    category: 'HTML5'
  },
  {
    id: 'css-wizard',
    title: 'فنان التنسيق والتفاعل',
    description: 'إتقان حركات CSS وبطاقات التفاعل ثلاثية الأبعاد والتخطيط المداري.',
    iconName: 'Palette',
    category: 'CSS3'
  },
  {
    id: 'js-commander',
    title: 'متحكم الـ DOM والخوارزميات',
    description: 'السيطرة على أحداث الـ DOM والتحريك الفيزيائي عبر Canvas API.',
    iconName: 'Terminal',
    category: 'JavaScript'
  },
  {
    id: 'space-architect',
    title: 'مستكشف المحاكاة الفيزيائية',
    description: 'فحص وتعديل متغيرات المحاكاة في ديمو المجموعة الشمسية.',
    iconName: 'Orbit',
    category: 'المختبر'
  },
  {
    id: 'streak-flame',
    title: 'الاستمرارية والالتزام',
    description: 'التعلم والتفاعل في المنصة لـ 3 أيام متتالية أو أكثر.',
    iconName: 'Flame',
    category: 'المواظبة'
  }
];

export const LEVEL_TITLES = [
  { level: 1, title: 'مستكشف الويب', minXp: 0, maxXp: 249 },
  { level: 2, title: 'مهندس العناصر', minXp: 250, maxXp: 499 },
  { level: 3, title: 'فنان التصميم الحركي', minXp: 500, maxXp: 749 },
  { level: 4, title: 'قائد الخوارزميات', minXp: 750, maxXp: 999 },
  { level: 5, title: 'مطور الواجهات المتكامل', minXp: 1000, maxXp: Infinity },
];

export const LEVEL_STEP_XP = 250;
