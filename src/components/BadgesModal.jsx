import React from 'react';
import { useProgress } from '../context/useProgress';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Lock, 
  Compass, 
  FileCode, 
  Palette, 
  Terminal, 
  Orbit, 
  Flame 
} from 'lucide-react';

const ICON_MAP = {
  Compass,
  FileCode,
  Palette,
  Terminal,
  Orbit,
  Flame,
  Award
};

export default function BadgesModal({ isOpen, onClose }) {
  const { badgesList, unlockedBadges } = useProgress();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] rounded-xl p-5 sm:p-6 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text-base)]">الشارات والإنجازات</h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                تُمنح عند إتمام المسارات والتعمق في التحديات البرمجية
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

        {/* Stats Summary */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] mb-4 text-xs">
          <span className="text-[var(--color-text-muted)] font-medium">الشارات المكتملة:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--color-text-base)] font-mono">
              {unlockedBadges.length} من {badgesList.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-bold font-mono">
              {Math.round((unlockedBadges.length / badgesList.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
          {badgesList.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const IconComponent = ICON_MAP[badge.iconName] || Award;

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-lg border transition-colors flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-[var(--color-bg-surface)] border-[var(--color-border-strong)]'
                    : 'bg-[var(--color-bg-elevated)]/50 border-[var(--color-border-subtle)] opacity-60'
                }`}
              >
                <div 
                  className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                      : 'bg-[var(--color-bg-muted)] text-[var(--color-text-subtle)]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <h3 className={`font-semibold text-xs truncate ${isUnlocked ? 'text-[var(--color-text-base)]' : 'text-[var(--color-text-muted)]'}`}>
                      {badge.title}
                    </h3>
                    {isUnlocked ? (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        منجز
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[10px] text-[var(--color-text-subtle)] shrink-0">
                        <Lock className="w-3 h-3" />
                        مقفل
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="inline-block mt-1.5 text-[9px] font-mono text-[var(--color-text-subtle)] font-medium">
                    {badge.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-[var(--color-border-subtle)] flex justify-end">
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
