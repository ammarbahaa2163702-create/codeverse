import React, { useState, useRef } from 'react';
import { useProgress } from '../context/useProgress';
import { 
  Flame, 
  Award, 
  Download, 
  Upload, 
  RotateCcw, 
  ChevronDown,
  Layers,
  Compass,
  Sun,
  Moon,
  BarChart2
} from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenBadgesModal, onOpenSummaryModal }) {
  const { 
    xp, 
    streak, 
    currentLevelInfo, 
    unlockedBadges, 
    badgesList, 
    theme, 
    toggleTheme,
    exportProgressJSON, 
    importProgressJSON, 
    resetAllProgress 
  } = useProgress();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          importProgressJSON(text);
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveView('curriculum')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Clean SVG Vector Icon */}
            <div className="w-8 h-8 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:border-teal-500 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-[var(--color-text-base)]">
                  كودڤيرس
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  CodeVerse
                </span>
              </div>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <nav className="hidden md:flex items-center gap-1 p-0.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
            <button
              onClick={() => setActiveView('curriculum')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeView === 'curriculum'
                  ? 'bg-[var(--color-bg-surface)] text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>المسارات والتحديات</span>
            </button>

            <button
              onClick={() => setActiveView('showcase')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeView === 'showcase'
                  ? 'bg-[var(--color-bg-surface)] text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>مختبر المحاكاة والأكواد الجاهزة</span>
            </button>
          </nav>
        </div>

        {/* User Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Streak Counter */}
          <div 
            title={`مواظبة: ${streak} أيام متتالية`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs font-semibold text-[var(--color-text-base)]"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{streak}</span>
            <span className="hidden sm:inline text-[11px] text-[var(--color-text-muted)]">يوم</span>
          </div>

          {/* XP Badge */}
          <div 
            title="مجموع نقاط الخبرة"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs font-bold text-teal-600 dark:text-teal-400 font-mono"
          >
            <span>{xp}</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">XP</span>
          </div>

          {/* Level Progress */}
          <div className="hidden lg:flex items-center gap-2.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
            <span className="text-xs font-semibold text-[var(--color-text-base)]">
              {currentLevelInfo.title}
            </span>
            <div className="w-16 h-1 bg-[var(--color-border-strong)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${currentLevelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Badges Modal Trigger */}
          <button
            onClick={onOpenBadgesModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border-subtle)] text-xs font-semibold text-[var(--color-text-base)] transition-colors"
            title="عرض الشارات"
            aria-label="عرض الشارات والإنجازات"
          >
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-mono">{unlockedBadges.length}/{badgesList.length}</span>
          </button>

          {/* Summary Modal Trigger */}
          {onOpenSummaryModal && (
            <button
              onClick={onOpenSummaryModal}
              className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors"
              title="ملخص التقدم ومسار التعلم"
              aria-label="ملخص التقدم"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors"
            title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            aria-label="تبديل الثيم"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Settings & Persistence Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="p-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] transition-colors"
              title="النسخ الاحتياطي والخيارات"
              aria-label="خيارات الحساب والنسخ الاحتياطي"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] shadow-lg p-1.5 z-50 text-xs">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)]">
                  البيانات والنسخ الاحتياطي
                </div>
                
                <button
                  onClick={() => {
                    exportProgressJSON();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)] text-right transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-teal-500" />
                  <span>تصدير البيانات (JSON)</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)] text-right transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-500" />
                  <span>استيراد بيانات سابقة</span>
                </button>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".json" 
                  className="hidden" 
                />

                <div className="my-1 border-t border-[var(--color-border-subtle)]"></div>

                <button
                  onClick={() => {
                    if (window.confirm('هل تريد إعادة تعيين التقدم والبدء من جديد؟')) {
                      resetAllProgress();
                    }
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-rose-500 hover:bg-rose-500/10 text-right transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة تعيين التقدم</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Subnav for View Switcher */}
      <div className="md:hidden flex items-center justify-around border-t border-[var(--color-border-subtle)] py-1.5 px-3 bg-[var(--color-bg-surface)]">
        <button
          onClick={() => setActiveView('curriculum')}
          className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
            activeView === 'curriculum'
              ? 'bg-[var(--color-bg-elevated)] text-teal-600 dark:text-teal-400'
              : 'text-[var(--color-text-muted)]'
          }`}
        >
          المسارات والتحديات
        </button>
        <button
          onClick={() => setActiveView('showcase')}
          className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
            activeView === 'showcase'
              ? 'bg-[var(--color-bg-elevated)] text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-[var(--color-text-muted)]'
          }`}
        >
          مختبر المحاكاة (الأكواد الجاهزة)
        </button>
      </div>
    </header>
  );
}
