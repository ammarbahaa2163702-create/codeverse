import React, { useState, useEffect } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { useProgress } from './context/useProgress';
import { CURRICULUM_DATA } from './data/curriculumData';
import Navbar from './components/Navbar';
import SidebarCurriculum from './components/SidebarCurriculum';
import LessonWorkspace from './components/LessonWorkspace';
import ShowcaseLab from './components/ShowcaseLab';
import BadgesModal from './components/BadgesModal';
import ProgressSummaryModal from './components/ProgressSummaryModal';
import { AlertCircle, Info, Award } from 'lucide-react';

function AppContent() {
  const { activeToast } = useProgress();

  // Parse initial route from window.location.hash
  const parseRoute = () => {
    const hash = window.location.hash || '';
    if (hash.startsWith('#/showcase')) {
      return { view: 'showcase', lessonId: 'html-1' };
    }
    if (hash.startsWith('#/lesson/')) {
      const id = hash.replace('#/lesson/', '').trim();
      return { view: 'curriculum', lessonId: id || 'html-1' };
    }
    return { view: 'curriculum', lessonId: CURRICULUM_DATA[0]?.lessons[0]?.id || 'html-1' };
  };

  const initialRoute = parseRoute();
  const [activeView, setActiveView] = useState(initialRoute.view);
  const [selectedLessonId, setSelectedLessonId] = useState(initialRoute.lessonId);

  // Modals
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // Sync hash on navigation
  const navigateTo = (view, lessonId) => {
    setActiveView(view);
    if (lessonId) {
      setSelectedLessonId(lessonId);
      window.location.hash = `#/lesson/${lessonId}`;
    } else if (view === 'showcase') {
      window.location.hash = '#/showcase';
    } else {
      window.location.hash = `#/lesson/${selectedLessonId}`;
    }
  };

  // Listen to hashchange / browser back & forward
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRoute();
      setActiveView(route.view);
      setSelectedLessonId(route.lessonId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Find active track & lesson
  let activeTrack = null;
  let activeLesson = null;
  const allFlatLessons = [];

  CURRICULUM_DATA.forEach(track => {
    track.lessons.forEach(lesson => {
      allFlatLessons.push({ track, lesson });
      if (lesson.id === selectedLessonId) {
        activeTrack = track;
        activeLesson = lesson;
      }
    });
  });

  if (!activeLesson) {
    activeTrack = CURRICULUM_DATA[0];
    activeLesson = CURRICULUM_DATA[0].lessons[0];
  }

  // Next lesson logic
  const currentIdx = allFlatLessons.findIndex(item => item.lesson.id === activeLesson.id);
  const hasNextLesson = currentIdx < allFlatLessons.length - 1;

  const handleNextLesson = () => {
    if (hasNextLesson) {
      const nextId = allFlatLessons[currentIdx + 1].lesson.id;
      navigateTo('curriculum', nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-base)] flex flex-col font-sans antialiased transition-colors">
      
      {/* Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => navigateTo(v)}
        onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
        onOpenSummaryModal={() => setIsSummaryModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {activeView === 'curriculum' ? (
          <>
            {/* Sidebar with Tracks & Lessons */}
            <SidebarCurriculum
              curriculumData={CURRICULUM_DATA}
              selectedLessonId={selectedLessonId}
              onSelectLesson={(id) => {
                navigateTo('curriculum', id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToShowcase={() => navigateTo('showcase')}
            />

            {/* Lesson Workspace */}
            <LessonWorkspace
              key={activeLesson?.id}
              lesson={activeLesson}
              track={activeTrack}
              onNextLesson={handleNextLesson}
              hasNextLesson={hasNextLesson}
            />
          </>
        ) : (
          /* Showcase Lab */
          <ShowcaseLab />
        )}

      </main>

      {/* Badges Achievement Modal */}
      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
      />

      {/* Progress Summary Modal */}
      <ProgressSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        onSelectLesson={(id) => navigateTo('curriculum', id)}
      />

      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 p-3.5 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] shadow-lg max-w-sm animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center shrink-0">
            {activeToast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            ) : activeToast.type === 'info' ? (
              <Info className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            ) : (
              <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            )}
          </div>
          <div className="text-right">
            <h4 className="font-semibold text-xs text-[var(--color-text-base)]">
              {activeToast.title}
            </h4>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              {activeToast.message}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
