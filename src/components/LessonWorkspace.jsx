import React, { useState, useRef } from 'react';
import { useProgress } from '../context/useProgress';
import { runChallengeValidation } from '../utils/challengeValidator';
import CodePlayground from './CodePlayground';
import VisualMiniGame from './VisualMiniGame';
import { 
  CheckCircle2, 
  Lightbulb, 
  ArrowLeft, 
  AlertCircle, 
  ChevronDown,
  BookOpen,
  Info
} from 'lucide-react';

export default function LessonWorkspace({
  lesson,
  track,
  onNextLesson,
  hasNextLesson
}) {
  const { 
    completedLessons, 
    markLessonCompleted, 
    codeDrafts, 
    saveLessonDraft, 
    unlockBadge 
  } = useProgress();

  const isCompleted = completedLessons.includes(lesson.id);

  // Student code draft
  const savedDraft = codeDrafts[lesson.id] || null;
  const [currentCode, setCurrentCode] = useState(savedDraft || lesson.starterCode);

  const iframeDocRef = useRef(null);

  // Hint toggle
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);

  // Validation Result
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleFirstRunTracked = () => {
    unlockBadge('first-run');
  };

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
    saveLessonDraft(lesson.id, newCode);
  };

  const handleIframeReady = (doc) => {
    iframeDocRef.current = doc;
  };

  const handleCheckChallenge = () => {
    setIsValidating(true);
    setTimeout(() => {
      const doc = iframeDocRef.current;
      const result = runChallengeValidation({
        lesson,
        iframeDoc: doc,
        code: currentCode
      });

      setValidationResult(result);
      setIsValidating(false);

      if (result.passed) {
        const reward = usedHint ? 75 : lesson.xpReward || 100;
        markLessonCompleted(lesson.id, reward);
      }
    }, 180);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full overflow-y-auto">
      
      {/* 1. Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="text-[11px] px-2 py-0.5 rounded font-semibold text-white"
              style={{ backgroundColor: track?.accentColor || '#0d9488' }}
            >
              {track?.trackTitle.split('(')[0].trim()}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] font-medium border border-[var(--color-border-subtle)]">
              {lesson.difficulty}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-semibold">
              +{lesson.xpReward} XP
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-[var(--color-text-base)] flex items-center gap-2">
            {lesson.title}
            {isCompleted && (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            )}
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {lesson.summary}
          </p>
        </div>

        {hasNextLesson && (
          <button
            onClick={onNextLesson}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-xs font-semibold flex items-center gap-1.5 border border-[var(--color-border-subtle)] transition-colors shrink-0"
          >
            <span>الدرس التالي</span>
            <ArrowLeft className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          </button>
        )}
      </div>

      {/* 2. Split: Explanation & Visual HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Theory & Challenge Prompt (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          
          {/* Explanation Blocks */}
          <div className="flex flex-col gap-2.5">
            {lesson.explanationBlocks?.map((block, idx) => {
              const isNote = block.heading.includes('ملاحظة') || block.heading.includes('تطبيقية');

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-colors ${
                    isNote
                      ? 'bg-[var(--color-bg-elevated)] border-teal-500/30'
                      : 'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'
                  }`}
                >
                  <h3 className="text-xs sm:text-sm font-semibold mb-1.5 flex items-center gap-1.5 text-[var(--color-text-base)]">
                    {isNote ? <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> : <BookOpen className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />}
                    <span>{block.heading}</span>
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {block.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Challenge Box */}
          <div className="p-4 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-bold text-[var(--color-text-base)]">
                المطلوب: {lesson.challenge.missionTitle}
              </h3>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold bg-teal-500/10 px-2 py-0.5 rounded">
                تحدي الدرس
              </span>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
              {lesson.challenge.instructions}
            </p>

            {/* Hint Accordion */}
            <div className="border-t border-[var(--color-border-subtle)] pt-2.5">
              <button
                onClick={() => {
                  setShowHint(prev => !prev);
                  if (!usedHint) setUsedHint(true);
                }}
                aria-expanded={showHint}
                className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{showHint ? 'إخفاء التلميح' : 'عرض التلميح الإرشادي (-25 XP)'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showHint ? 'rotate-180' : ''}`} />
              </button>

              {showHint && (
                <div className="mt-2 p-2.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {lesson.challenge.hint}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Visual Mini-Game HUD (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <VisualMiniGame
            lesson={lesson}
            studentCode={currentCode}
            isPassed={isCompleted}
          />
        </div>

      </div>

      {/* 3. Code Playground */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--color-text-base)]">
            محرر الأكواد والمعاينة الحية
          </h2>
          <span className="text-[11px] font-mono text-[var(--color-text-subtle)]">
            يُحفظ تلقائياً في المتصفح
          </span>
        </div>

        <CodePlayground
          key={lesson.id}
          starterCode={lesson.starterCode}
          savedCode={currentCode}
          onCodeChange={handleCodeChange}
          onIframeReady={handleIframeReady}
          onFirstRunTracked={handleFirstRunTracked}
        />
      </div>

      {/* 4. Verification Action & Feedback Strip */}
      <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex flex-col gap-3.5">
        
        {/* Real-time Feedback Banner */}
        {validationResult && (
          <div
            className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs ${
              validationResult.passed
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}
          >
            {validationResult.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 leading-relaxed">
              <span className="font-semibold block mb-0.5">
                {validationResult.passed ? 'النتيجة: حل صحيح ومطابق' : 'النتيجة: يرجى المراجعة والتصحيح'}
              </span>
              <span>{validationResult.message}</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-[var(--color-text-muted)]">
            اضغط أولاً على <strong className="text-[var(--color-text-base)]">«شغّل الكود»</strong> لتحديث صفحة المعاينة، ثم اضغط «تحقق من الحل».
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCheckChallenge}
              disabled={isValidating}
              className={`px-4 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-colors text-xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isValidating ? 'جاري الفحص...' : isCompleted ? 'إعادة فحص الحل ✓' : 'تحقق من الحل'}</span>
            </button>

            {hasNextLesson && (
              <button
                onClick={onNextLesson}
                className="px-3.5 py-2 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] font-semibold flex items-center gap-1.5 border border-[var(--color-border-subtle)] transition-colors text-xs"
              >
                <span>الدرس التالي</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
