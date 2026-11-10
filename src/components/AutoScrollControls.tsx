import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Type,
  Sun,
  Moon,
  Maximize2,
  Music2,
  ChevronDown,
  ChevronUp,
  Expand,
  Minimize,
} from 'lucide-react';
import { ThemeMode } from '../types/song';

interface AutoScrollControlsProps {
  isPlaying: boolean;
  speed: number;
  scrollProgress: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  fontSizeMultiplier: number;
  onFontSizeChange: (multiplier: number) => void;
  transpose: number;
  onTransposeChange: (semitones: number) => void;
  showChords: boolean;
  onToggleChords: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  isWakeLocked: boolean;
  isFittedScreen: boolean;
  onToggleFitScreen: () => void;
}

export const AutoScrollControls: React.FC<AutoScrollControlsProps> = ({
  isPlaying,
  speed,
  scrollProgress,
  onTogglePlay,
  onSpeedChange,
  onReset,
  fontSizeMultiplier,
  onFontSizeChange,
  transpose,
  onTransposeChange,
  showChords,
  onToggleChords,
  theme,
  onThemeChange,
  isWakeLocked,
  isFittedScreen,
  onToggleFitScreen,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const isDark = theme === 'stage';

  // Toggle native browser fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-4 pointer-events-none transition-all">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Progress Bar (Visible even when collapsed) */}
        <div className="w-full bg-black/15 dark:bg-white/10 h-1 rounded-t overflow-hidden">
          <div
            className="bg-amber-600 dark:bg-amber-400 h-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Minimized Pill Mode */}
        {isCollapsed ? (
          <div className="flex items-center justify-between px-3 py-2 bg-gray-900/90 text-white rounded-b-xl shadow-xl backdrop-blur-md border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={onTogglePlay}
                className="p-1.5 rounded-full bg-amber-600 text-white font-bold"
                title="Pausar / Reanudar (Espacio)"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <span className="font-mono text-[11px]">{speed}x</span>
              <span className="text-gray-300">· {scrollProgress}%</span>
            </div>
            <button
              onClick={() => setIsCollapsed(false)}
              className="flex items-center gap-1 text-[11px] text-amber-300 font-medium hover:underline"
            >
              <span>Mostrar controles</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Full Controls Bar */
          <div
            className={`flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 rounded-b-2xl shadow-2xl border backdrop-blur-md transition-colors ${
              isDark
                ? 'bg-gray-900/95 border-gray-700 text-gray-100'
                : theme === 'vintage'
                ? 'bg-[#f7f3e8]/95 border-amber-900/20 text-vintage-ink shadow-book-deep'
                : 'bg-white/95 border-gray-200 text-gray-900 shadow-xl'
            }`}
          >
            {/* Left Group: Play / Pause & Auto-Scroll Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onTogglePlay}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-700 text-white dark:bg-amber-500'
                    : 'bg-vintage-ink text-paper-50 dark:bg-gray-100 dark:text-gray-900 hover:opacity-90'
                }`}
                title="Desplazamiento automático (Espacio)"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span className="hidden xs:inline">
                  {isPlaying ? 'Pausar' : 'Auto-scroll'}
                </span>
              </button>

              {/* Speed Adjuster */}
              <div className="flex items-center rounded-xl border border-black/10 dark:border-white/15 px-1 py-0.5 text-xs">
                <button
                  onClick={() => onSpeedChange(Math.max(1, speed - 1))}
                  disabled={speed <= 1}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                  title="Bajar velocidad"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span
                  className="px-1.5 font-mono font-bold min-w-[2.2rem] text-center"
                  title="Velocidad"
                >
                  {speed}x
                </span>
                <button
                  onClick={() => onSpeedChange(Math.min(10, speed + 1))}
                  disabled={speed >= 10}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30"
                  title="Subir velocidad"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset to top */}
              <button
                onClick={onReset}
                className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Volver al inicio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Wake Lock Status */}
              {isWakeLocked && (
                <span
                  className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                  title="La pantalla permanecerá encendida mientras tocas"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Pantalla activa
                </span>
              )}
            </div>

            {/* Center Group: Transpose & Chords Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Transpose Controls */}
              <div className="flex items-center rounded-xl border border-black/10 dark:border-white/15 px-1 py-0.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-vintage-faded dark:text-gray-400 px-1 hidden sm:inline">
                  Tono:
                </span>
                <button
                  onClick={() => onTransposeChange(transpose - 1)}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  title="Bajar 1 semitono"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onTransposeChange(0)}
                  className={`px-1.5 font-mono font-bold min-w-[2.2rem] text-center hover:underline ${
                    transpose !== 0
                      ? 'text-amber-800 dark:text-amber-400 font-extrabold'
                      : ''
                  }`}
                  title="Clic para reiniciar tono original"
                >
                  {transpose > 0 ? `+${transpose}` : transpose}
                </button>
                <button
                  onClick={() => onTransposeChange(transpose + 1)}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  title="Subir 1 semitono"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggle Chords Visibility */}
              <button
                onClick={onToggleChords}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs ${
                  showChords
                    ? 'border-amber-900/30 bg-amber-500/15 dark:bg-amber-400/20 text-vintage-ink dark:text-gray-100 font-semibold'
                    : 'border-transparent text-vintage-faded dark:text-gray-400 hover:bg-black/10'
                }`}
                title={showChords ? 'Ocultar acordes' : 'Mostrar acordes'}
              >
                <Music2 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {showChords ? 'Acordes ON' : 'Solo letra'}
                </span>
              </button>
            </div>

            {/* Right Group: Fit to Screen, Font, Theme, Fullscreen & Collapse */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Font Size Adjuster */}
              <div className="flex items-center rounded-xl border border-black/10 dark:border-white/15 px-1 py-0.5 text-xs">
                <button
                  onClick={() => onFontSizeChange(Math.max(0.7, fontSizeMultiplier - 0.1))}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  title="Reducir tamaño"
                >
                  <Type className="w-3 h-3" />
                </button>
                <span className="px-1 text-[11px] font-mono min-w-[1.8rem] text-center">
                  {Math.round(fontSizeMultiplier * 100)}%
                </span>
                <button
                  onClick={() => onFontSizeChange(Math.min(1.6, fontSizeMultiplier + 0.1))}
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  title="Aumentar tamaño"
                >
                  <Type className="w-4 h-4 font-bold" />
                </button>
              </div>

              {/* Fit to Screen (Nunca scrollear) */}
              <button
                onClick={onToggleFitScreen}
                className={`p-2 rounded-xl border transition-colors ${
                  isFittedScreen
                    ? 'border-amber-800 bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold'
                    : 'border-transparent hover:bg-black/10 dark:hover:bg-white/10 text-vintage-faded dark:text-gray-300'
                }`}
                title="Ajustar todo a pantalla (Sin scroll)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Native Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl border border-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-vintage-faded dark:text-gray-300 hidden sm:block"
                title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  if (theme === 'vintage') onThemeChange('stage');
                  else if (theme === 'stage') onThemeChange('paper-clean');
                  else onThemeChange('vintage');
                }}
                className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title={`Tema: ${
                  theme === 'vintage'
                    ? 'Papel Cancionero'
                    : theme === 'stage'
                    ? 'Modo Escenario'
                    : 'Limpio'
                }`}
              >
                {theme === 'stage' ? (
                  <Moon className="w-4 h-4 text-amber-300" />
                ) : theme === 'vintage' ? (
                  <span className="w-4 h-4 rounded-full bg-amber-400 border border-amber-900/30 inline-block" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-600" />
                )}
              </button>

              {/* Minimize Bar */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-vintage-faded dark:text-gray-400"
                title="Minimizar barra"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
