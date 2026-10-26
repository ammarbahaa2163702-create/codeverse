import React from 'react';
import { 
  Shield, 
  Activity, 
  Radio, 
  Flame, 
  Crosshair, 
  CheckCircle2, 
  Cpu,
  Zap,
  Globe,
  Layers
} from 'lucide-react';

export default function VisualMiniGame({ 
  lesson, 
  studentCode, 
  isPassed 
}) {
  const mission = lesson?.visualMission || { type: 'generic', targetLabel: 'لوحة المعاينة التفاعلية' };
  
  const html = studentCode?.html || '';
  const css = studentCode?.css || '';
  const js = studentCode?.js || '';

  // Real-time checks
  const isRoverPowered = isPassed || (html.includes('data-power="100"') && html.includes('جاهز'));
  const isGravityCalibrated = isPassed || (html.includes('9.8') && html.includes('24.8'));
  const isValidationReady = isPassed || (html.includes('required') && (html.includes('[A-Z]{3}-[0-9]{3}') || html.includes('pattern')));
  const isNeonActivated = isPassed || (css.includes('#0d9488') || css.includes('#06b6d4'));
  const isCard3d = isPassed || (css.includes('perspective') && css.includes('rotateY'));
  const isSatellitesBalanced = isPassed || (css.includes('space-around') || css.includes('space-between'));
  const isRadarActive = isPassed || (css.includes('radar-spin') || css.includes('radar-sweep'));
  const isEngineIgnited = isPassed || (js.includes('engine-active') || isPassed);

  return (
    <div className="rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] p-4 sm:p-5 shadow-sm">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-[var(--color-border-subtle)] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500" />
          <span className="font-semibold text-[var(--color-text-base)] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            شاشة المحاكاة التفاعلية
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--color-text-muted)]">الحالة:</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
            isPassed 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
          }`}>
            {isPassed ? 'مكتمل' : 'قيد التجربة'}
          </span>
        </div>
      </div>

      {/* Visual Simulation Stage */}
      <div className="min-h-[160px] flex items-center justify-center relative bg-[var(--color-bg-base)] rounded-lg border border-[var(--color-border-subtle)] p-4 overflow-hidden">
        
        {/* 1. Rover Shield Simulation */}
        {mission.type === 'rover-shield' && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative flex items-center justify-center">
              <div 
                className={`w-28 h-28 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isRoverPowered
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]'
                }`}
              >
                <Shield className={`w-10 h-10 transition-colors ${isRoverPowered ? 'text-emerald-500' : 'text-slate-400'}`} />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2.5 text-xs font-medium">
              <span className="text-[var(--color-text-muted)]">مستوى الطاقة:</span>
              <div className="w-28 h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    isRoverPowered ? 'w-full bg-emerald-500' : 'w-[15%] bg-teal-500'
                  }`}
                />
              </div>
              <span className={`font-mono text-xs ${isRoverPowered ? 'text-emerald-500 font-bold' : 'text-[var(--color-text-muted)]'}`}>
                {isRoverPowered ? '100%' : '15%'}
              </span>
            </div>
          </div>
        )}

        {/* 2. Planet Gravity Simulation */}
        {mission.type === 'planet-gravity' && (
          <div className="flex items-center justify-around w-full gap-4">
            <div className="text-center p-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] w-32">
              <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-[var(--color-text-base)]">الأرض</div>
              <div className="text-[11px] font-mono text-[var(--color-text-muted)] mt-1">
                {isGravityCalibrated || html.includes('9.8') ? '9.8 m/s² ✓' : 'غير محدد'}
              </div>
            </div>

            <div className="text-center p-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] w-32">
              <Globe className="w-6 h-6 text-indigo-500 mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-[var(--color-text-base)]">المشتري</div>
              <div className="text-[11px] font-mono text-[var(--color-text-muted)] mt-1">
                {isGravityCalibrated || html.includes('24.8') ? '24.8 m/s² ✓' : 'غير محدد'}
              </div>
            </div>
          </div>
        )}

        {/* 3. Rocket / Form Validation Simulation */}
        {mission.type === 'rocket-validation' && (
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="p-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 ${isValidationReady ? 'text-emerald-500' : 'text-slate-400'}`} />
              <div className="text-right">
                <span className="text-xs font-semibold block text-[var(--color-text-base)]">
                  معيار الترخيص (CAP-XXX)
                </span>
                <span className={`text-[11px] font-mono ${isValidationReady ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {isValidationReady ? 'حقل إلزامي مطابق للصيغة' : 'في انتظار ضبط الحقل'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Neon Reactor Simulation */}
        {mission.type === 'neon-reactor' && (
          <div className="flex flex-col items-center justify-center w-full">
            <div 
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isNeonActivated
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]'
              }`}
            >
              <Zap className={`w-8 h-8 ${isNeonActivated ? 'text-teal-500' : 'text-slate-400'}`} />
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
              المتغير المركزي: {isNeonActivated ? 'نشط (teal)' : 'افتراضي'}
            </p>
          </div>
        )}

        {/* 5. Hologram Card Simulation */}
        {mission.type === 'hologram-card' && (
          <div className="flex items-center justify-center w-full">
            <div className={`p-4 rounded-lg border transition-all text-center w-48 ${
              isCard3d
                ? 'border-indigo-500 bg-indigo-500/10 -rotate-3'
                : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]'
            }`}>
              <Layers className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
              <div className="text-xs font-semibold text-[var(--color-text-base)]">منظور ثلاثي الأبعاد</div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-1 font-mono">
                {isCard3d ? 'perspective: 1000px' : 'بدون منظور'}
              </div>
            </div>
          </div>
        )}

        {/* 6. Satellites Orbit Simulation */}
        {mission.type === 'satellites-orbit' && (
          <div className="w-full flex items-center justify-around px-2">
            <div className={`flex items-center w-full transition-all duration-300 ${
              isSatellitesBalanced ? 'justify-around' : 'justify-start gap-1.5'
            }`}>
              {['الوحدة 1', 'الوحدة 2', 'الوحدة 3', 'الوحدة 4'].map((name, i) => (
                <div key={i} className="p-2 rounded bg-[var(--color-bg-surface)] text-[var(--color-text-base)] border border-[var(--color-border-strong)] text-[11px] font-medium">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Radar Sweep Simulation */}
        {mission.type === 'radar-sweep' && (
          <div className="relative w-24 h-24 rounded-full border border-teal-500 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-teal-500/20 scale-75" />
            <div 
              className={`absolute inset-0 bg-gradient-to-tr from-teal-500/30 to-transparent ${
                isRadarActive ? 'animate-spin origin-center' : ''
              }`}
              style={{ animationDuration: '3s' }}
            />
            <Radio className="w-4 h-4 text-teal-600 dark:text-teal-400 z-10" />
          </div>
        )}

        {/* 8. Engine Ignition Simulation */}
        {mission.type === 'engine-ignition' && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className={`p-3 rounded-full border transition-all ${
              isEngineIgnited ? 'border-teal-500 bg-teal-500/10 text-teal-500' : 'border-[var(--color-border-strong)] text-slate-400'
            }`}>
              <Flame className="w-8 h-8" />
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
              المحرك: {isEngineIgnited ? 'نشط ويعمل' : 'متوقف'}
            </p>
          </div>
        )}

        {/* 9. Mouse Spotlight Simulation */}
        {mission.type === 'mouse-spotlight' && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="p-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-center">
              <Crosshair className="w-5 h-5 text-teal-500 mx-auto mb-1" />
              <span className="text-xs font-mono font-semibold text-[var(--color-text-base)]">
                ALPHA-CENTAURI-7799
              </span>
            </div>
          </div>
        )}

        {/* 10. Canvas Plasma Simulation */}
        {mission.type === 'canvas-plasma' && (
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>المعامل:</span>
          <span className="text-[var(--color-text-base)] font-medium">
            {mission.targetLabel}
          </span>
        </div>
      </div>

    </div>
  );
}
