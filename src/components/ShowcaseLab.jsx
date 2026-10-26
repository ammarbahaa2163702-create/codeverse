import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html as langHtml } from '@codemirror/lang-html';
import { css as langCss } from '@codemirror/lang-css';
import { javascript as langJs } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useProgress } from '../context/useProgress';
import { buildSandboxSrcDoc } from '../utils/sandboxRunner';
import AddShowcaseModal from './AddShowcaseModal';
import { 
  Play, 
  Maximize2, 
  Minimize2, 
  Code2, 
  Plus, 
  Download, 
  Check, 
  Trash2, 
  BookOpen,
  Compass,
  RotateCcw
} from 'lucide-react';

export default function ShowcaseLab() {
  const { 
    allShowcases, 
    deleteCustomShowcase, 
    addXp, 
    unlockBadge, 
    showToast,
    theme 
  } = useProgress();

  const [selectedDemoId, setSelectedDemoId] = useState(allShowcases[0]?.id || 'solar-system-simulator');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active showcase
  const activeDemo = allShowcases.find(d => d.id === selectedDemoId) || allShowcases[0];

  // Editable code state
  const [editableCode, setEditableCode] = useState(activeDemo?.code || { html: '', css: '', js: '' });
  const [executedCode, setExecutedCode] = useState(activeDemo?.code || { html: '', css: '', js: '' });
  const [activeCodeTab, setActiveCodeTab] = useState('js');
  const [runVersion, setRunVersion] = useState(0);

  const [copiedJSON, setCopiedJSON] = useState(false);
  const stageRef = useRef(null);

  // Handle demo switch
  const handleSelectDemo = (demo) => {
    setSelectedDemoId(demo.id);
    setEditableCode(demo.code);
    setExecutedCode(demo.code);
    setRunVersion(0);
    addXp(30);
    if (demo.id === 'solar-system-simulator') {
      unlockBadge('space-architect');
    }
  };

  const handleRunCode = () => {
    setExecutedCode(editableCode);
    setRunVersion(v => v + 1);
    showToast('تم التحديث', 'تم تشغيل التعديلات داخل نافذة العرض الحية.', 'success');
  };

  const handleResetToOriginal = () => {
    if (window.confirm('هل تريد استعادة الكود الأصلي لهذا النموذج؟')) {
      setEditableCode(activeDemo.code);
      setExecutedCode(activeDemo.code);
      setRunVersion(v => v + 1);
      showToast('استعادة الكود', 'تمت استعادة الكود الجاهز الأصلي للنموذج.', 'info');
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(activeDemo, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
    showToast('تم النسخ', 'تم نسخ كائن الديمو بتنسيق JSON إلى الحافظة.', 'success');
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Filter categories
  const categories = ['ALL', 'WebGL', 'Canvas', 'Physics', 'Math', 'Audio', 'CSS 3D', 'Custom'];
  const filteredDemos = allShowcases.filter(demo => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'Custom') return demo.isCustom;
    if (activeCategory === 'WebGL') return demo.category.includes('WebGL') || demo.category.includes('Shader');
    if (activeCategory === 'Canvas') return demo.category.includes('Canvas');
    if (activeCategory === 'Physics') return demo.category.includes('Physics');
    if (activeCategory === 'Math') return demo.category.includes('Math');
    if (activeCategory === 'Audio') return demo.category.includes('Audio') || demo.category.includes('Synth');
    if (activeCategory === 'CSS 3D') return demo.category.includes('CSS') || demo.category.includes('3D');
    return true;
  });

  const getLanguageExtension = () => {
    if (activeCodeTab === 'html') return [langHtml()];
    if (activeCodeTab === 'css') return [langCss()];
    return [langJs()];
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full overflow-y-auto">
      
      {/* 1. Lab Header */}
      <div className="rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                مختبر المحاكاة والأنماط التفاعلية المتقدمة
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] font-mono">
                {allShowcases.length} نماذج تفاعلية • +30 XP
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-base)]">
              دراسة وتطبيق التقنيات البصرية المتقدمة (Showcase Lab)
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5 max-w-3xl leading-relaxed">
              10 نماذج تطبيقية فائقة الإبهار مبنية بـ HTML/CSS/JS صافي: معالجة الشيدر (WebGL)، محاكاة فيزياء الأقمشة (Verlet Cloth)، أسراب الطيور الذكية (Boids)، كسيريات ماندلبروت، توليد الصوتيات (Web Audio Synth)، ومحركات 3D دون أي مكتبات خارجية.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start sm:self-center px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1.5 text-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة نموذج جديد</span>
          </button>
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--color-border-subtle)]">
          <span className="text-xs text-[var(--color-text-muted)] ml-2">التصنيف:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--color-bg-elevated)] text-teal-600 dark:text-teal-400 font-bold border border-[var(--color-border-strong)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
              }`}
            >
              {cat === 'ALL' ? `الكل (${allShowcases.length})` : 
               cat === 'WebGL' ? 'شيدر WebGL' : 
               cat === 'Canvas' ? 'محاكاة Canvas' : 
               cat === 'Physics' ? 'فيزياء وحركة' : 
               cat === 'Math' ? 'رياضيات وكسيريات' : 
               cat === 'Audio' ? 'صوتيات Web Audio' : 
               cat === 'CSS 3D' ? 'تحويلات 3D' : 'نماذج مخصصة'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Demos Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredDemos.map(demo => {
          const isSelected = demo.id === selectedDemoId;

          return (
            <div
              key={demo.id}
              onClick={() => handleSelectDemo(demo)}
              className={`cursor-pointer p-4 rounded-lg border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[var(--color-bg-surface)] border-teal-500 shadow-sm ring-1 ring-teal-500/30'
                  : 'bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-teal-600 dark:text-teal-400 text-[11px]">
                      {demo.category}
                    </span>
                    {demo.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                        جديد
                      </span>
                    )}
                    {!demo.isCustom && !demo.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-500/20">
                        كود جاهز
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-subtle)]">
                    {demo.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-[var(--color-text-base)] mb-1">
                  {demo.title}
                </h3>

                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                  {demo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--color-border-subtle)] text-[11px]">
                <span className="text-[var(--color-text-subtle)] font-mono text-[10px]">
                  {demo.tricksExplained?.length || 0} شروحات تقنية
                </span>

                <div className="flex items-center gap-2">
                  {demo.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('هل تريد حذف هذا النموذج المخصص؟')) {
                          deleteCustomShowcase(demo.id);
                        }
                      }}
                      className="text-rose-500 hover:text-rose-400 p-0.5"
                      title="حذف النموذج"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <span className={`text-xs font-semibold flex items-center gap-1 ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-[var(--color-text-muted)]'}`}>
                    <span>{isSelected ? 'قيد المعاينة الآن' : 'عرض وتشغيل'}</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Stage */}
      <div 
        ref={stageRef}
        className={`rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] overflow-hidden shadow-sm flex flex-col ${
          isFullscreen ? 'p-0 bg-black w-screen h-screen' : ''
        }`}
      >
        <div className="flex items-center justify-between p-3 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 className="font-bold text-[var(--color-text-base)]">
              {activeDemo.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1 rounded bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-xs font-semibold flex items-center gap-1 border border-[var(--color-border-subtle)] transition-colors"
              title="نسخ كائن JSON"
            >
              {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
              <span>تصدير JSON</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 rounded bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] border border-[var(--color-border-subtle)] transition-colors"
              title={isFullscreen ? 'إنهاء ملء الشاشة' : 'تكبير الشاشة'}
              aria-label="تكبير الشاشة"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className={`relative w-full bg-slate-950 ${isFullscreen ? 'flex-1 h-full min-h-0' : 'h-[500px] sm:h-[540px]'}`}>
          <iframe
            key={`${activeDemo.id}-${runVersion}`}
            title={activeDemo.title}
            srcDoc={buildSandboxSrcDoc(executedCode)}
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-none"
          />
        </div>
      </div>

      {/* 4. Split: Code Editor & Tricks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Real CodeMirror Editor (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="p-3.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex flex-col h-full">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border-subtle)] text-xs">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-[var(--color-text-base)]">الكود القابل للتعديل المباشر</h3>
              </div>

              <div className="flex items-center gap-1">
                {['html', 'css', 'js'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-2.5 py-1 rounded font-mono font-medium text-xs uppercase transition-colors ${
                      activeCodeTab === tab
                        ? 'bg-[var(--color-bg-elevated)] text-teal-600 dark:text-teal-400 font-bold border border-[var(--color-border-strong)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* CodeMirror 6 Editor */}
            <div className="flex-1 min-h-[300px] overflow-hidden rounded border border-[var(--color-border-subtle)] text-left" dir="ltr">
              <CodeMirror
                value={editableCode[activeCodeTab]}
                height="300px"
                theme={theme === 'dark' ? oneDark : 'light'}
                extensions={getLanguageExtension()}
                onChange={(val) => setEditableCode(prev => ({ ...prev, [activeCodeTab]: val }))}
                basicSetup={{
                  lineNumbers: true,
                  tabSize: 2,
                  highlightActiveLine: true,
                  autocompletion: true
                }}
                className="text-xs font-mono"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-[var(--color-text-muted)]">
                عدّل أي معامل رقمي أو لوني واضغط على تشغيل لمعاينة التأثير فوراً.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToOriginal}
                  className="px-3 py-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] border border-[var(--color-border-subtle)] font-medium flex items-center gap-1.5 transition-colors text-xs"
                  title="استعادة الكود الجاهز الأصلي"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>استعادة الكود الأصلي</span>
                </button>

                <button
                  onClick={handleRunCode}
                  className="px-4 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1.5 transition-colors text-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>تشغيل التعديلات</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Explanations (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-1.5 mb-3 pb-2.5 border-b border-[var(--color-border-subtle)]">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <h3 className="font-bold text-[var(--color-text-base)] text-sm">
                التحليل الهندسي والشروحات التقنية
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {activeDemo.tricksExplained?.map((trick, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-xs text-[var(--color-text-base)]">
                      {trick.title}
                    </h4>
                    {trick.concept && (
                      <span className="text-[10px] font-mono font-medium text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                        {trick.concept}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {trick.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add Modal */}
      <AddShowcaseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
