import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html as langHtml } from '@codemirror/lang-html';
import { css as langCss } from '@codemirror/lang-css';
import { javascript as langJs } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { buildSandboxSrcDoc } from '../utils/sandboxRunner';
import { useProgress } from '../context/useProgress';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Eye, 
  Trash2 
} from 'lucide-react';

// Friendly Arabic translations for common JavaScript runtime errors
function translateError(msg) {
  if (!msg) return '';
  if (msg.includes('is not defined')) {
    return 'المتغير أو العنصر غير معرف في النطاق الحالي.';
  }
  if (msg.includes('Cannot read properties of null') || msg.includes('null is not an object')) {
    return 'محاولة قراءة خاصية من عنصر غير موجود (null). تأكد من وجود الـ id أو الـ selector في الـ HTML.';
  }
  if (msg.includes('is not a function')) {
    return 'محاولة استدعاء قيمة كدالة وهي ليست دالة صالحة.';
  }
  if (msg.includes('Unexpected token')) {
    return 'خطأ في قواعد بناء الجملة (Syntax Error). تحقق من إغلاق الأقواس أو علامات التنصيص.';
  }
  return '';
}

export default function CodePlayground({
  starterCode,
  savedCode,
  onCodeChange,
  onIframeReady,
  onFirstRunTracked
}) {
  const { theme } = useProgress();

  // Current active editor tab: 'html' | 'css' | 'js'
  const [activeCodeTab, setActiveCodeTab] = useState('html');

  // Code state
  const [code, setCode] = useState({
    html: savedCode?.html ?? starterCode.html ?? '',
    css: savedCode?.css ?? starterCode.css ?? '',
    js: savedCode?.js ?? starterCode.js ?? ''
  });

  // Output panel: 'preview' | 'console'
  const [activeOutputTab, setActiveOutputTab] = useState('preview');

  // Console messages
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [unreadConsoleCount, setUnreadConsoleCount] = useState(0);

  // Executed code state (for iframe srcDoc)
  const [executedCode, setExecutedCode] = useState(code);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  // Handle postMessage from iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.source === 'codeverse-sandbox') {
        if (e.data.type === 'loaded') {
          if (iframeRef.current && onIframeReady) {
            try {
              const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
              if (doc) onIframeReady(doc);
            } catch {
              // ignore
            }
          }
          return;
        }

        const rawPayload = e.data.payload || '';
        const arabicHelp = e.data.type === 'error' ? translateError(rawPayload) : '';

        const newLog = {
          id: Date.now() + Math.random(),
          type: e.data.type,
          payload: rawPayload,
          arabicHelp,
          time: new Date().toLocaleTimeString('ar-EG', { hour12: false })
        };

        setConsoleLogs(prev => [...prev.slice(-99), newLog]);
        if (activeOutputTab !== 'console') {
          setUnreadConsoleCount(c => c + 1);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeOutputTab, onIframeReady]);

  // Execute Code into iframe
  const handleRunCode = useCallback(() => {
    setExecutedCode(code);
    if (onFirstRunTracked) onFirstRunTracked();
    if (onCodeChange) onCodeChange(code);

    setTimeout(() => {
      try {
        const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
        if (doc && onIframeReady) {
          onIframeReady(doc);
        }
      } catch {
        // ignore
      }
    }, 150);
  }, [code, onFirstRunTracked, onCodeChange, onIframeReady]);

  // Ctrl + Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين الكود إلى النموذج الأولي لهذا الدرس؟')) {
      const resetCode = {
        html: starterCode.html || '',
        css: starterCode.css || '',
        js: starterCode.js || ''
      };
      setCode(resetCode);
      setExecutedCode(resetCode);
      setConsoleLogs([]);
      setUnreadConsoleCount(0);
      if (onCodeChange) onCodeChange(resetCode);
    }
  };

  const handleCopy = () => {
    const currentCode = code[activeCodeTab];
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateCurrentCode = (val) => {
    const updated = { ...code, [activeCodeTab]: val };
    setCode(updated);
    if (onCodeChange) onCodeChange(updated);
  };

  // Determine active language extension for CodeMirror
  const getLanguageExtension = () => {
    if (activeCodeTab === 'html') return [langHtml()];
    if (activeCodeTab === 'css') return [langCss()];
    return [langJs()];
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border-subtle)] overflow-hidden shadow-sm">
      
      {/* Editor & Output Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[var(--color-border-subtle)] h-full">
        
        {/* =========================================
            LEFT / FIRST HALF: Real CodeMirror Editor
           ========================================= */}
        <div className="flex flex-col h-full bg-[var(--color-bg-surface)]">
          
          {/* Editor Header Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] text-xs">
            {/* Language Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeCodeTab === 'html'
                    ? 'bg-[var(--color-bg-surface)] text-teal-600 dark:text-teal-400 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                }`}
              >
                index.html
              </button>

              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeCodeTab === 'css'
                    ? 'bg-[var(--color-bg-surface)] text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                }`}
              >
                style.css
              </button>

              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeCodeTab === 'js'
                    ? 'bg-[var(--color-bg-surface)] text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                }`}
              >
                script.js
              </button>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-base)] hover:bg-[var(--color-bg-muted)] transition-colors"
                title="نسخ الكود"
                aria-label="نسخ محتوى التبويب"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleReset}
                className="p-1 rounded text-[var(--color-text-muted)] hover:text-rose-500 hover:bg-[var(--color-bg-muted)] transition-colors"
                title="إعادة ضبط الكود"
                aria-label="إعادة ضبط الكود"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real CodeMirror 6 Editor Container */}
          <div className="relative flex-1 min-h-[320px] lg:min-h-[440px] overflow-hidden text-left" dir="ltr">
            <CodeMirror
              value={code[activeCodeTab]}
              height="100%"
              theme={theme === 'dark' ? oneDark : 'light'}
              extensions={getLanguageExtension()}
              onChange={updateCurrentCode}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                tabSize: 2,
                foldGutter: true,
                autocompletion: true
              }}
              className="h-full text-xs sm:text-sm font-mono"
            />
          </div>

          {/* Editor Footer / Run Action */}
          <div className="p-2.5 bg-[var(--color-bg-elevated)] border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Ctrl + Enter للتشغيل
            </span>

            <button
              onClick={handleRunCode}
              className="w-full sm:w-auto px-4 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>شغّل الكود</span>
            </button>
          </div>

        </div>

        {/* =========================================
            RIGHT / SECOND HALF: Dual Output Panel
           ========================================= */}
        <div className="flex flex-col h-full bg-[var(--color-bg-surface)]">
          
          {/* Output Header Tabs */}
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveOutputTab('preview')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeOutputTab === 'preview'
                    ? 'bg-[var(--color-bg-surface)] text-teal-600 dark:text-teal-400 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>المعاينة الحية</span>
              </button>

              <button
                onClick={() => {
                  setActiveOutputTab('console');
                  setUnreadConsoleCount(0);
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 relative ${
                  activeOutputTab === 'console'
                    ? 'bg-[var(--color-bg-surface)] text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>سجل الكونسول</span>
                {unreadConsoleCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {unreadConsoleCount}
                  </span>
                )}
              </button>
            </div>

            {activeOutputTab === 'console' && consoleLogs.length > 0 && (
              <button
                onClick={() => setConsoleLogs([])}
                className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)] hover:text-rose-500 transition-colors"
                title="مسح سجل الكونسول"
              >
                <Trash2 className="w-3 h-3" />
                <span>مسح</span>
              </button>
            )}
          </div>

          {/* Output Content Area */}
          <div className="flex-1 relative min-h-[320px] lg:min-h-[440px] overflow-hidden bg-[var(--color-bg-base)]">
            
            {/* Live Preview Iframe */}
            <div className={`w-full h-full ${activeOutputTab === 'preview' ? 'block' : 'hidden'}`}>
              <iframe
                ref={iframeRef}
                title="المعاينة الحية للكود"
                srcDoc={buildSandboxSrcDoc(executedCode)}
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-full border-none bg-white dark:bg-slate-950"
              />
            </div>

            {/* Console Output Panel with Arabic Help */}
            <div className={`w-full h-full p-3.5 overflow-y-auto text-xs ${activeOutputTab === 'console' ? 'block' : 'hidden'}`}>
              {consoleLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-subtle)] gap-1.5">
                  <Terminal className="w-6 h-6 opacity-40" />
                  <p className="text-xs">سجل الكونسول فارغ. شغّل الكود لمشاهدة المخرجات أو رسائل console.log.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {consoleLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-2.5 rounded-md border text-xs flex flex-col gap-1 font-mono ${
                        log.type === 'error'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                          : log.type === 'warn'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300'
                          : 'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)] text-emerald-600 dark:text-emerald-300'
                      }`}
                      dir="ltr"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 select-none">
                          [{log.time}]
                        </span>
                        <span className="font-bold uppercase text-[10px]">
                          {log.type}:
                        </span>
                        <span className="break-all whitespace-pre-wrap flex-1 text-left">
                          {log.payload}
                        </span>
                      </div>

                      {/* Helpful Arabic explanation of error if present */}
                      {log.arabicHelp && (
                        <div className="text-[11px] font-sans text-rose-500 dark:text-rose-300 pt-1 border-t border-rose-500/20 text-right" dir="rtl">
                          💡 <strong>توضيح:</strong> {log.arabicHelp}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
