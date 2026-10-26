import React, { useState } from 'react';
import { useProgress } from '../context/useProgress';
import { buildSandboxSrcDoc } from '../utils/sandboxRunner';
import { 
  X, 
  Plus, 
  Trash2, 
  Eye, 
  Download, 
  Save,
  Check,
  Compass
} from 'lucide-react';

export default function AddShowcaseModal({ isOpen, onClose }) {
  const { addCustomShowcase, showToast } = useProgress();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Canvas & Physics');
  const [difficulty, setDifficulty] = useState('متقدم');
  const [description, setDescription] = useState('');

  const [activeTab, setActiveTab] = useState('html');
  const [code, setCode] = useState({
    html: `<div class="custom-card">\n  <h2>نموذج تفاعلي مخصص</h2>\n  <p>أدخل الكود لمشاهدة المعاينة المباشرة.</p>\n</div>`,
    css: `.custom-card {\n  text-align: center;\n  padding: 30px;\n  background: #151b26;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f8fafc;\n}`,
    js: `console.log('تم تشغيل النموذج المخصص.');`
  });

  const [tricks, setTricks] = useState([
    {
      title: 'المنطق البرمجي الأساسي',
      concept: 'CSS Animation / Canvas 2D',
      explanation: 'شرح موجز لكيفية معالجة هذا التأثير.'
    }
  ]);

  const [showLivePreview, setShowLivePreview] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  const handleAddTrick = () => {
    setTricks(prev => [
      ...prev,
      { title: '', concept: '', explanation: '' }
    ]);
  };

  const handleRemoveTrick = (idx) => {
    setTricks(prev => prev.filter((_, i) => i !== idx));
  };

  const handleTrickChange = (idx, field, value) => {
    setTricks(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const generateShowcaseObject = () => {
    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'custom-demo-' + Date.now();
    return {
      id: slug,
      title: title || 'نموذج محاكاة مخصص',
      category,
      difficulty,
      description: description || 'نموذج مخصص مضاف للمختبر.',
      isCustom: true,
      tricksExplained: tricks.filter(t => t.title.trim()),
      code
    };
  };

  const handleSaveToPlatform = () => {
    if (!title.trim()) {
      showToast('تنبيه', 'يرجى كتابة عنوان النموذج أولاً.', 'warn');
      return;
    }
    const showcaseObj = generateShowcaseObject();
    addCustomShowcase(showcaseObj);
    onClose();
  };

  const handleExportJSON = () => {
    const showcaseObj = generateShowcaseObject();
    const jsonStr = JSON.stringify(showcaseObj, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
    showToast('تم النسخ', 'تم نسخ كائن JSON للحافظة.', 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-3xl bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] rounded-xl p-5 sm:p-6 shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--color-text-base)]">إضافة نموذج محاكاة جديد</h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                إدخال كود النموذج وشروحاته التقنية لحفظه وتصديره
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 py-3 flex flex-col gap-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-base)] mb-1">عنوان النموذج:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: شبكة النقاط المترابطة"
                className="w-full px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-base)] text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-base)] mb-1">التصنيف:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-base)] text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="Canvas & Physics">Canvas & Physics</option>
                <option value="CSS 3D">CSS 3D</option>
                <option value="Interaction Math">Interaction Math</option>
                <option value="Custom">مخصص</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-base)] mb-1">مستوى الصعوبة:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-base)] text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="مبتدئ">مبتدئ</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم">متقدم</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-base)] mb-1">الوصف المختصر:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف موجز لما يقوم به هذا النموذج..."
              className="w-full px-2.5 py-1.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-base)] text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Code input */}
          <div className="border border-[var(--color-border-subtle)] rounded-lg overflow-hidden bg-[var(--color-bg-base)]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-1">
                {['html', 'css', 'js'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold ${
                      activeTab === tab
                        ? 'bg-[var(--color-bg-surface)] text-teal-600 dark:text-teal-400 border border-[var(--color-border-strong)]'
                        : 'text-[var(--color-text-muted)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowLivePreview(prev => !prev)}
                className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showLivePreview ? 'العودة للمحرر' : 'معاينة'}</span>
              </button>
            </div>

            <div className="h-44">
              {showLivePreview ? (
                <iframe
                  title="Showcase Live Preview"
                  srcDoc={buildSandboxSrcDoc(code)}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-none bg-slate-900"
                />
              ) : (
                <textarea
                  value={code[activeTab]}
                  onChange={(e) => setCode(prev => ({ ...prev, [activeTab]: e.target.value }))}
                  dir="ltr"
                  className="w-full h-full p-2.5 bg-transparent text-[var(--color-text-base)] font-mono text-xs resize-none focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Tricks input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[var(--color-text-base)]">
                الشروحات والتحليلات التقنية:
              </label>

              <button
                onClick={handleAddTrick}
                className="px-2.5 py-1 rounded bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-teal-600 dark:text-teal-400 text-xs font-medium border border-[var(--color-border-subtle)] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة شرح</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {tricks.map((trick, idx) => (
                <div key={idx} className="p-2.5 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={trick.title}
                      onChange={(e) => handleTrickChange(idx, 'title', e.target.value)}
                      placeholder={`عنوان النقطة ${idx + 1}...`}
                      className="flex-1 px-2 py-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded text-[var(--color-text-base)] text-xs"
                    />

                    <input
                      type="text"
                      value={trick.concept}
                      onChange={(e) => handleTrickChange(idx, 'concept', e.target.value)}
                      placeholder="المفهوم أو الـ API"
                      className="w-36 px-2 py-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded text-teal-600 dark:text-teal-400 text-xs font-mono"
                    />

                    {tricks.length > 1 && (
                      <button
                        onClick={() => handleRemoveTrick(idx)}
                        className="text-[var(--color-text-subtle)] hover:text-rose-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <textarea
                    value={trick.explanation}
                    onChange={(e) => handleTrickChange(idx, 'explanation', e.target.value)}
                    placeholder="شرح موجز لكيفية عمل المنطق..."
                    rows={2}
                    className="w-full px-2 py-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] rounded text-[var(--color-text-muted)] text-xs resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between shrink-0">
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-md bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text-base)] text-xs font-semibold flex items-center gap-1.5 border border-[var(--color-border-subtle)] transition-colors"
          >
            {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
            <span>نسخ JSON</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] text-xs"
            >
              إلغاء
            </button>

            <button
              onClick={handleSaveToPlatform}
              className="px-4 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ في المنصة</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
