import React from 'react';
import { useProgress } from '../context/useProgress';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  X, 
  BarChart2, 
  ArrowLeft, 
  Flame 
} from 'lucide-react';

export default function ProgressSummaryModal({ isOpen, onClose, onSelectLesson }) {
  const { completedLessons, xp, streak } = useProgress();

  if (!isOpen) return null;

  const totalLessons = CURRICULUM_DATA.reduce((acc, t) => acc + t.lessons.length, 0);

  // Find first uncompleted lesson as recommended next step
  let recommendedLesson = null;
  for (const track of CURRICULUM_DATA) {
    for (const lesson of track.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        recommendedLesson = { track, lesson };
        break;
      }
    }
    if (recommendedLesson) break;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] rounded-xl p-5 sm:p-6 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text-base)]">ملخص التقدم ومسار التعلم</h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                نظرة شاملة على إنجازك الأكاديمي والخطوة القادمة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] hover:bg-[var(--color-bg-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
          <div className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
            <span className="text-[11px] text-[var(--color-text-muted)] block">الدروس المنجزة</span>
            <span className="text-base font-bold font-mono text-[var(--color-text-base)]">
              {completedLessons.length} / {totalLessons}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
            <span className="text-[11px] text-[var(--color-text-muted)] block">المواظبة</span>
            <span className="text-base font-bold font-mono text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              {streak} أيام
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
            <span className="text-[11px] text-[var(--color-text-muted)] block">مجموع النقاط</span>
            <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
              {xp} XP
            </span>
          </div>
        </div>

        {/* Recommended Next Lesson Card */}
        {recommendedLesson && (
          <div className="p-3.5 rounded-lg bg-[var(--color-bg-elevated)] border border-teal-500/30 mb-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 block mb-0.5">
                الخطوة المقترحة التالية
              </span>
              <h4 className="text-xs font-bold text-[var(--color-text-base)]">
                {recommendedLesson.lesson.title}
              </h4>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                {recommendedLesson.track.trackTitle.split('(')[0].trim()}
              </span>
            </div>

            <button
              onClick={() => {
                onSelectLesson(recommendedLesson.lesson.id);
                onClose();
              }}
              className="px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>متابعة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Track Progress Breakdown */}
        <div className="flex flex-col gap-2.5 max-h-[35vh] overflow-y-auto pr-1">
          {CURRICULUM_DATA.map(track => {
            const trackCompleted = track.lessons.filter(l => completedLessons.includes(l.id)).length;
            const pct = Math.round((trackCompleted / track.lessons.length) * 100);

            return (
              <div key={track.trackId} className="p-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-[var(--color-text-base)]">
                    {track.trackTitle.split('(')[0].trim()}
                  </span>
                  <span className="font-mono text-[var(--color-text-muted)] text-[11px]">
                    {trackCompleted}/{track.lessons.length} ({pct}%)
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 transition-all duration-300" 
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] font-semibold text-xs border border-[var(--color-border-subtle)] transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
