import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SHOWCASE_DEMOS } from '../data/showcaseDemosData';
import { 
  SCHEMA_VERSION, 
  STORAGE_KEY, 
  DRAFTS_KEY, 
  CUSTOM_SHOWCASES_KEY, 
  THEME_KEY,
  BADGES_LIST, 
  LEVEL_TITLES, 
  LEVEL_STEP_XP 
} from '../data/progressConstants';
import { ProgressContext } from './progressContextDefinition';

export function ProgressProvider({ children }) {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    } catch {
      // fallback
    }
    return 'dark';
  });

  // Sync theme class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Base progress state with migration support
  const [userState, setUserState] = useState(() => {
    const defaultState = {
      schemaVersion: SCHEMA_VERSION,
      xp: 0,
      completedLessons: [],
      unlockedBadges: [],
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10)
    };

    try {
      // Check v2 first
      let raw = localStorage.getItem(STORAGE_KEY);
      // Migration from v1 if v2 is empty
      if (!raw) {
        const v1Raw = localStorage.getItem('codeverse_user_progress_v1');
        if (v1Raw) {
          raw = v1Raw;
        }
      }

      if (raw) {
        const parsed = JSON.parse(raw);
        const today = new Date().toISOString().slice(0, 10);
        let currentStreak = parsed.streak || 1;
        const lastDate = parsed.lastActiveDate;

        if (lastDate && lastDate !== today) {
          const diffDays = Math.round((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak += 1;
          } else if (diffDays > 1) {
            currentStreak = 1;
          }
        }

        return {
          schemaVersion: SCHEMA_VERSION,
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
          streak: currentStreak,
          lastActiveDate: today
        };
      }
    } catch {
      // fallback to default
    }

    return defaultState;
  });

  // Code drafts per lesson: { [lessonId]: { html, css, js } }
  const [codeDrafts, setCodeDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFTS_KEY) || localStorage.getItem('codeverse_code_drafts_v1');
      if (saved) return JSON.parse(saved) || {};
    } catch {
      // ignore
    }
    return {};
  });

  // Custom user-added showcases
  const [customShowcases, setCustomShowcases] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_SHOWCASES_KEY) || localStorage.getItem('codeverse_custom_showcases_v1');
      if (saved) return JSON.parse(saved) || [];
    } catch {
      // ignore
    }
    return [];
  });

  // Alert/Notification Toast state
  const [activeToast, setActiveToast] = useState(null);

  const showToast = useCallback((title, message, type = 'success') => {
    const id = Date.now();
    setActiveToast({ title, message, type, id });
    setTimeout(() => {
      setActiveToast(prev => (prev?.id === id ? null : prev));
    }, 4000);
  }, []);

  // Major achievement celebrations only (Milestones and Level ups)
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#0d9488', '#6366f1', '#10b981', '#ffffff']
      });
    } catch {
      // ignore
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch {
      // ignore storage error
    }
  }, [userState]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(codeDrafts));
    } catch {
      // ignore
    }
  }, [codeDrafts]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_SHOWCASES_KEY, JSON.stringify(customShowcases));
    } catch {
      // ignore
    }
  }, [customShowcases]);

  // Compute current Level info
  const currentLevelInfo = (() => {
    const calculatedLevel = Math.floor(userState.xp / LEVEL_STEP_XP) + 1;
    const boundedLevel = Math.min(Math.max(calculatedLevel, 1), 5);
    const info = LEVEL_TITLES.find(l => l.level === boundedLevel) || LEVEL_TITLES[LEVEL_TITLES.length - 1];
    const currentLevelBaseXp = (boundedLevel - 1) * LEVEL_STEP_XP;
    const nextLevelTargetXp = boundedLevel * LEVEL_STEP_XP;
    const progressInCurrentLevel = boundedLevel === 5 ? LEVEL_STEP_XP : Math.max(0, userState.xp - currentLevelBaseXp);
    const progressPercent = boundedLevel === 5 ? 100 : Math.min(100, Math.round((progressInCurrentLevel / LEVEL_STEP_XP) * 100));

    return {
      level: boundedLevel,
      title: info.title,
      xp: userState.xp,
      currentLevelBaseXp,
      nextLevelTargetXp,
      progressInCurrentLevel,
      progressPercent
    };
  })();

  const addXp = useCallback((amount) => {
    setUserState(prev => {
      const nextXp = prev.xp + amount;
      const prevLevel = Math.floor(prev.xp / LEVEL_STEP_XP) + 1;
      const newLevel = Math.floor(nextXp / LEVEL_STEP_XP) + 1;

      if (newLevel > prevLevel) {
        triggerConfetti();
        const levelData = LEVEL_TITLES.find(l => l.level === Math.min(newLevel, 5));
        showToast(
          `المستوى ${newLevel}`,
          `لقب جديد: ${levelData ? levelData.title : 'مطور محترف'}`,
          'success'
        );
      }
      return { ...prev, xp: nextXp };
    });
  }, [triggerConfetti, showToast]);

  const unlockBadge = useCallback((badgeId) => {
    setUserState(prev => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const badge = BADGES_LIST.find(b => b.id === badgeId);
      if (badge) {
        triggerConfetti();
        showToast(
          `شارة جديدة: ${badge.title}`,
          badge.description,
          'success'
        );
      }
      return { ...prev, unlockedBadges: [...prev.unlockedBadges, badgeId] };
    });
  }, [triggerConfetti, showToast]);

  const markLessonCompleted = useCallback((lessonId, xpReward = 100) => {
    setUserState(prev => {
      const isFirstTime = !prev.completedLessons.includes(lessonId);
      if (isFirstTime) {
        const nextList = [...prev.completedLessons, lessonId];
        const nextXp = prev.xp + xpReward;

        // Check if full track was completed -> major celebration!
        let newBadges = [...prev.unlockedBadges];
        let trackCompleted = false;

        if (nextList.includes('html-1') && nextList.includes('html-2') && nextList.includes('html-3') && !newBadges.includes('html-master')) {
          newBadges.push('html-master');
          trackCompleted = true;
        }
        if (nextList.includes('css-1') && nextList.includes('css-2') && nextList.includes('css-3') && nextList.includes('css-4') && !newBadges.includes('css-wizard')) {
          newBadges.push('css-wizard');
          trackCompleted = true;
        }
        if (nextList.includes('js-1') && nextList.includes('js-2') && nextList.includes('js-3') && !newBadges.includes('js-commander')) {
          newBadges.push('js-commander');
          trackCompleted = true;
        }

        if (trackCompleted) {
          triggerConfetti();
        }

        return {
          ...prev,
          xp: nextXp,
          completedLessons: nextList,
          unlockedBadges: newBadges
        };
      }
      return prev;
    });
  }, [triggerConfetti]);

  const saveLessonDraft = useCallback((lessonId, code) => {
    setCodeDrafts(prev => ({
      ...prev,
      [lessonId]: code
    }));
  }, []);

  const addCustomShowcase = useCallback((showcaseObj) => {
    setCustomShowcases(prev => [showcaseObj, ...prev]);
    addXp(40);
    showToast('تمت الإضافة', `أُضيف "${showcaseObj.title}" إلى مختبر المحاكاة.`, 'success');
  }, [addXp, showToast]);

  const deleteCustomShowcase = useCallback((id) => {
    setCustomShowcases(prev => prev.filter(item => item.id !== id));
    showToast('تم الحذف', 'تمت إزالة النموذج المخصص.', 'info');
  }, [showToast]);

  // Combined Showcases
  const allShowcases = [...customShowcases, ...SHOWCASE_DEMOS];

  // Export progress as JSON file
  const exportProgressJSON = useCallback(() => {
    const backup = {
      schemaVersion: SCHEMA_VERSION,
      exportDate: new Date().toISOString(),
      platform: 'CodeVerse',
      ...userState,
      codeDrafts,
      customShowcases
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codeverse-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('نسخة احتياطية', 'تم تنزيل ملف التقدم بنجاح.', 'success');
  }, [userState, codeDrafts, customShowcases, showToast]);

  // Import progress from JSON
  const importProgressJSON = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (typeof data.xp === 'number') {
        setUserState(prev => ({
          ...prev,
          xp: data.xp,
          completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : prev.completedLessons,
          unlockedBadges: Array.isArray(data.unlockedBadges) ? data.unlockedBadges : prev.unlockedBadges,
          streak: typeof data.streak === 'number' ? data.streak : prev.streak
        }));
      }
      if (data.codeDrafts) setCodeDrafts(data.codeDrafts);
      if (Array.isArray(data.customShowcases)) setCustomShowcases(data.customShowcases);
      showToast('استيراد ناجح', 'تم استرجاع بياناتك بنجاح.', 'success');
      return true;
    } catch {
      showToast('خطأ في الاستيراد', 'الملف المحدد غير صالح أو تالف.', 'error');
      return false;
    }
  }, [showToast]);

  const resetAllProgress = useCallback(() => {
    setUserState({
      schemaVersion: SCHEMA_VERSION,
      xp: 0,
      completedLessons: [],
      unlockedBadges: [],
      streak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10)
    });
    setCodeDrafts({});
    setCustomShowcases([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DRAFTS_KEY);
      localStorage.removeItem(CUSTOM_SHOWCASES_KEY);
      localStorage.removeItem('codeverse_user_progress_v1');
      localStorage.removeItem('codeverse_code_drafts_v1');
      localStorage.removeItem('codeverse_custom_showcases_v1');
    } catch {
      // ignore
    }
    showToast('إعادة تعيين', 'تمت إعادة ضبط التقدم إلى نقطة البداية.', 'info');
  }, [showToast]);

  return (
    <ProgressContext.Provider
      value={{
        theme,
        toggleTheme,
        xp: userState.xp,
        addXp,
        completedLessons: userState.completedLessons,
        markLessonCompleted,
        unlockedBadges: userState.unlockedBadges,
        unlockBadge,
        badgesList: BADGES_LIST,
        streak: userState.streak,
        currentLevelInfo,
        codeDrafts,
        saveLessonDraft,
        customShowcases,
        allShowcases,
        addCustomShowcase,
        deleteCustomShowcase,
        triggerConfetti,
        showToast,
        activeToast,
        exportProgressJSON,
        importProgressJSON,
        resetAllProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

