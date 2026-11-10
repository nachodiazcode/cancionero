import React from 'react';
import { getChordDiagram } from '../data/chordDatabase';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { X, Volume2, Info } from 'lucide-react';

interface ChordModalProps {
  chordName: string | null;
  onClose: () => void;
  theme: 'vintage' | 'stage' | 'paper-clean';
}

export const ChordModal: React.FC<ChordModalProps> = ({
  chordName,
  onClose,
  theme,
}) => {
  if (!chordName) return null;

  const diagram = getChordDiagram(chordName);
  const isDark = theme === 'stage';

  // String names from 6th (low E) to 1st (high E)
  const stringNames = ['6ª (Mi / E)', '5ª (La / A)', '4ª (Re / D)', '3ª (Sol / G)', '2ª (Si / B)', '1ª (Mi / e)'];

  // Simple Web Audio API guitar strum synthesis for previewing the chord!
  const playChordSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Standard guitar open string frequencies (Hz)
      const openFrequencies = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

      if (!diagram) return;

      diagram.frets.forEach((fret, stringIdx) => {
        if (fret === -1) return; // Muted

        const freq = openFrequencies[stringIdx] * Math.pow(2, fret / 12);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Strum delay: ~25ms between strings
        const delay = stringIdx * 0.025;
        const startTime = ctx.currentTime + delay;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm rounded-xl p-6 shadow-2xl transition-all border ${
          isDark
            ? 'bg-gray-900 border-gray-700 text-gray-100'
            : theme === 'vintage'
            ? 'bg-[#f7f2e7] border-vintage-faded/30 text-vintage-ink shadow-book-deep'
            : 'bg-white border-gray-200 text-gray-900 shadow-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b pb-3 mb-4 border-amber-900/10 dark:border-gray-800">
          <div>
            <h3 className="font-serif font-bold text-2xl tracking-wide">
              {chordName}
            </h3>
            <p className="text-xs text-vintage-faded dark:text-gray-400">
              Posición y digitación en guitarra
            </p>
          </div>
          <button
            onClick={playChordSound}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-800 text-white dark:bg-amber-600 hover:opacity-90 active:scale-95 transition-all shadow-sm"
            title="Escuchar rasgueo"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Escuchar</span>
          </button>
        </div>

        {/* Diagram Display */}
        {diagram ? (
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-lg bg-amber-500/5 dark:bg-white/5 my-2">
              <GuitarChordDiagram chord={diagram} size="lg" theme={theme} showTitle={false} />
            </div>

            {/* String by String Breakdown */}
            <div className="w-full mt-4 text-xs space-y-1">
              <div className="font-semibold text-vintage-faded dark:text-gray-300 mb-2 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Cuerdas y trastes:</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {diagram.frets.map((fret, i) => (
                  <div
                    key={`string-info-${i}`}
                    className="flex justify-between px-2 py-1 rounded bg-black/5 dark:bg-white/5"
                  >
                    <span className="text-vintage-faded dark:text-gray-400">{stringNames[i]}:</span>
                    <span className="font-mono font-bold">
                      {fret === -1 ? 'X (Muda)' : fret === 0 ? '0 (Al aire)' : `Traste ${fret}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-vintage-faded dark:text-gray-400">
            <p>Diagrama no encontrado para «{chordName}».</p>
            <p className="mt-2 text-xs">Puedes tocarlo en su posición natural de acorde.</p>
          </div>
        )}
      </div>
    </div>
  );
};
