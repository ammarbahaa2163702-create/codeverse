import React, { useState } from 'react';
import { useProgress } from '../context/useProgress';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  ChevronLeft, 
  BookOpen,
  Compass,
  ArrowLeft
} from 'lucide-react';

export default function SidebarCurriculum({
  curriculumData,
  selectedLessonId,
  onSelectLesson,
  onNavigateToShowcase
}) {
  const { completedLessons } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lessons
  const filteredCurriculum = curriculumData.map(track => {
    const matchingLessons = track.lessons.filter(lesson => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.summary.toLowerCase().includes(q) ||
        lesson.difficulty.toLowerCase().includes(q)
      );
    });
    return { ...track, lessons: matchingLessons };
  }).filter(track => track.lessons.length > 0);

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-[var(--color-bg-surface)] lg:border-l border-[var(--color-border-subtle)] p-4 flex flex-col gap-4 h-auto lg:h-[calc(100vh-3.75rem)] lg:overflow-y-auto">
      
      {/* Header & Quick Search */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h2 className="font-bold text-[var(--color-text-base)] text-sm">المسارات والتحديات</h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] font-medium border border-[var(--color-border-subtle)]">
            {completedLessons.length} مكتمل
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن درس أو خاصية..."
            aria-label="البحث عن درس"
            className="w-full pl-2.5 pr-8 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-md text-xs text-[var(--color-text-base)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-teal-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="مسح البحث"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tracks & Lessons List */}
      <div className="flex flex-col gap-5">
        {filteredCurriculum.map(track => {
          const trackCompletedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
          const trackProgress = Math.round((trackCompletedCount / track.lessons.length) * 100);

          return (
            <div key={track.trackId} className="flex flex-col gap-2">
              
              {/* Track Title */}
              <div className="px-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[var(--color-text-base)] flex items-center gap-1.5 text-xs">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: track.accentColor }} 
                    />
                    {track.trackTitle.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    {trackCompletedCount}/{track.lessons.length}
                  </span>
                </div>

                <div className="w-full h-1 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${trackProgress}%`,
                      backgroundColor: track.accentColor
                    }}
                  />
                </div>
              </div>

              {/* Lessons within this Track */}
              <div className="flex flex-col gap-1">
                {track.lessons.map(lesson => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isSelected = selectedLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-full text-right p-2.5 rounded-md border transition-colors flex items-center justify-between gap-2.5 group ${
                        isSelected
                          ? 'bg-[var(--color-bg-elevated)] border-[var(--color-border-strong)]'
                          : 'bg-transparent hover:bg-[var(--color-bg-elevated)] border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[var(--color-text-subtle)] shrink-0" />
                        )}

                        <div className="truncate">
                          <p className={`text-xs truncate ${isSelected ? 'font-bold text-[var(--color-text-base)]' : 'font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text-base)]'}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-[var(--color-text-subtle)]">
                              {lesson.difficulty}
                            </span>
                            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                              +{lesson.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronLeft className={`w-3.5 h-3.5 text-[var(--color-text-subtle)] shrink-0 transition-transform ${isSelected ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''}`} />
                    </button>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Quick Access to Showcase Lab */}
      {onNavigateToShowcase && (
        <div className="mt-auto pt-3 border-t border-[var(--color-border-subtle)] shrink-0">
          <div className="p-3 rounded-lg bg-[var(--color-bg-elevated)] border border-indigo-500/20 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-[var(--color-text-base)] block truncate">
                  مختبر المحاكاة (Showcase)
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] block truncate">
                  3 نماذج قوية جاهزة (المجموعة الشمسية...)
                </span>
              </div>
            </div>
            <button
              onClick={onNavigateToShowcase}
              className="w-full py-1.5 px-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>فتح مختبر الأكواد الجاهزة</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

    </aside>
  );
}
