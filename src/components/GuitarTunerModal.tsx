import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  Mic,
  MicOff,
  Guitar,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface GuitarTunerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'vintage' | 'stage' | 'paper-clean';
}

interface GuitarString {
  number: number;
  note: string;
  nameEs: string;
  frequency: number;
  octave: number;
}

const STANDARD_GUITAR_STRINGS: GuitarString[] = [
  { number: 6, note: 'E', nameEs: 'Mi grave', frequency: 82.41, octave: 2 },
  { number: 5, note: 'A', nameEs: 'La', frequency: 110.0, octave: 2 },
  { number: 4, note: 'D', nameEs: 'Re', frequency: 146.83, octave: 3 },
  { number: 3, note: 'G', nameEs: 'Sol', frequency: 196.0, octave: 3 },
  { number: 2, note: 'B', nameEs: 'Si', frequency: 246.94, octave: 3 },
  { number: 1, note: 'E', nameEs: 'Mi agudo', frequency: 329.63, octave: 4 },
];

export const GuitarTunerModal: React.FC<GuitarTunerModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'ear' | 'mic'>('ear');
  const [selectedString, setSelectedString] = useState<GuitarString>(
    STANDARD_GUITAR_STRINGS[0]
  );
  const [isLooping, setIsLooping] = useState<boolean>(false);

  // Mic state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [detectedFreq, setDetectedFreq] = useState<number | null>(null);
  const [closestString, setClosestString] = useState<GuitarString>(
    STANDARD_GUITAR_STRINGS[0]
  );
  const [centsDiff, setCentsDiff] = useState<number>(0);

  // Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopIntervalRef = useRef<number | null>(null);

  // Mic analyzer refs
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const isDark = theme === 'stage';

  // Helper to get or init AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play synthesized acoustic guitar pluck
  const playGuitarStringTone = (targetFreq: number) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.4, now + 0.02);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
      masterGain.connect(ctx.destination);

      // Fundamental oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(targetFreq, now);

      // 2nd harmonic (warmth)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(targetFreq * 2, now);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.2, now);
      osc2.connect(gain2);
      gain2.connect(masterGain);

      // 3rd harmonic (twang/string definition)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(targetFreq * 3, now);
      const gain3 = ctx.createGain();
      gain3.gain.setValueAtTime(0.08, now);
      osc3.connect(gain3);
      gain3.connect(masterGain);

      osc1.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + 2.5);
      osc2.stop(now + 2.5);
      osc3.stop(now + 2.5);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const handleStringClick = (str: GuitarString) => {
    setSelectedString(str);
    playGuitarStringTone(str.frequency);
  };

  // Handle looping mode
  useEffect(() => {
    if (isLooping && activeTab === 'ear') {
      playGuitarStringTone(selectedString.frequency);
      loopIntervalRef.current = window.setInterval(() => {
        playGuitarStringTone(selectedString.frequency);
      }, 2600);
    } else {
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = null;
      }
    }
    return () => {
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = null;
      }
    };
  }, [isLooping, selectedString, activeTab]);

  // Autocorrelation Pitch Detection Algorithm (for Guitar frequencies ~70Hz - 450Hz)
  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    const SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      sumOfSquares += val * val;
    }
    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);
    // Ignore silence or ambient noise
    if (rootMeanSquare < 0.015) return -1;

    let r1 = 0;
    let r2 = SIZE - 1;
    const thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < thres) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }
    }

    const sliced = buffer.slice(r1, r2);
    const c = new Array(sliced.length).fill(0);
    for (let i = 0; i < sliced.length; i++) {
      for (let j = 0; j < sliced.length - i; j++) {
        c[i] = c[i] + sliced[j] * sliced[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < sliced.length; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    // Parabolic interpolation for fine precision
    const x1 = c[T0 - 1];
    const x2 = c[T0];
    const x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  };

  // Start Mic Pitch Detection
  const startMicTuning = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });
      micStreamRef.current = stream;

      const ctx = getAudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsListening(true);

      const buffer = new Float32Array(analyser.fftSize);

      const updatePitch = () => {
        analyser.getFloatTimeDomainData(buffer);
        const pitch = autoCorrelate(buffer, ctx.sampleRate);

        if (pitch !== -1 && pitch > 65 && pitch < 500) {
          setDetectedFreq(Math.round(pitch * 10) / 10);

          // Find closest standard guitar string
          let minDiff = Infinity;
          let bestStr = STANDARD_GUITAR_STRINGS[0];
          STANDARD_GUITAR_STRINGS.forEach((str) => {
            const diff = Math.abs(pitch - str.frequency);
            if (diff < minDiff) {
              minDiff = diff;
              bestStr = str;
            }
          });

          setClosestString(bestStr);
          // Calculate cents difference: 1200 * log2(f / f0)
          const cents = 1200 * Math.log2(pitch / bestStr.frequency);
          setCentsDiff(Math.max(-50, Math.min(50, Math.round(cents))));
        }

        animationFrameRef.current = requestAnimationFrame(updatePitch);
      };

      updatePitch();
    } catch (err) {
      console.error('Microphone error:', err);
      setMicError(
        'No se pudo acceder al micrófono. Por favor concede permisos o usa el modo de afinación de oído.'
      );
      setIsListening(false);
    }
  };

  const stopMicTuning = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    setIsListening(false);
    setDetectedFreq(null);
  };

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      stopMicTuning();
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const isInTune = Math.abs(centsDiff) <= 3 && detectedFreq !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => {
        stopMicTuning();
        onClose();
      }}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border ${
          isDark
            ? 'bg-[#141414] border-gray-800 text-gray-100'
            : 'bg-[#1c1a17] text-[#f7f2e7] border-amber-900/40'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Cifra Club Style: Dark background with vibrant #e60 orange accent) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e60] flex items-center justify-center shadow-lg shadow-orange-950/40">
              <Guitar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                  Afinador de Guitarra
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#e60]/20 text-[#ff8833] border border-[#e60]/30">
                  Cifra Club Style
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Afinación estándar: E · A · D · G · B · e (440 Hz)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopMicTuning();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
            title="Cerrar afinador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls: De oído vs Micrófono */}
        <div className="flex items-center justify-center gap-2 px-6 pt-4 pb-2 bg-black/20 border-b border-white/5">
          <button
            onClick={() => {
              stopMicTuning();
              setActiveTab('ear');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ear'
                ? 'bg-[#e60] text-white shadow-md shadow-orange-900/40'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Cuerda por cuerda (De Oído)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('mic');
              startMicTuning();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mic'
                ? 'bg-[#e60] text-white shadow-md shadow-orange-900/40'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Afinador con Micrófono</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'ear' ? (
            /* ================= MODE 1: CUERDA POR CUERDA ================= */
            <div className="space-y-6">
              {/* Central Display Card */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-1 z-10">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#ff8833] uppercase">
                    Cuerda {selectedString.number}ª · {selectedString.nameEs}
                  </span>
                  <div className="text-7xl font-serif font-black text-white tracking-tighter">
                    {selectedString.note}
                    <span className="text-2xl text-stone-400 font-sans font-light">
                      {selectedString.octave}
                    </span>
                  </div>
                  <div className="text-sm font-mono text-stone-400">
                    {selectedString.frequency.toFixed(2)} Hz
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-5 z-10">
                  <button
                    onClick={() => playGuitarStringTone(selectedString.frequency)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e60] hover:bg-[#d55000] text-white font-bold text-sm shadow-lg shadow-orange-950/50 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Tocar Nota</span>
                  </button>

                  <button
                    onClick={() => setIsLooping((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all ${
                      isLooping
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'border-white/15 text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <RotateCcw
                      className={`w-3.5 h-3.5 ${isLooping ? 'animate-spin' : ''}`}
                    />
                    <span>{isLooping ? 'Repitiendo' : 'Repetir'}</span>
                  </button>
                </div>
              </div>

              {/* 6 Peghead Buttons (3 on left, 3 on right like real guitar headstock) */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                {STANDARD_GUITAR_STRINGS.map((str) => {
                  const isSelected = selectedString.number === str.number;
                  return (
                    <button
                      key={`str-btn-${str.number}`}
                      onClick={() => handleStringClick(str)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all group ${
                        isSelected
                          ? 'bg-[#e60] border-orange-400 text-white shadow-lg shadow-orange-950/60 scale-105'
                          : 'bg-black/30 border-white/10 text-stone-300 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-70 mb-0.5">
                        {str.number}ª cuerda
                      </span>
                      <span className="text-2xl font-serif font-black leading-none">
                        {str.note}
                      </span>
                      <span className="text-[11px] font-medium opacity-80 mt-1">
                        {str.nameEs}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 mt-0.5">
                        {str.frequency.toFixed(0)} Hz
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ================= MODE 2: MICRÓFONO CON DETECCIÓN EN TIEMPO REAL ================= */
            <div className="space-y-6">
              {micError ? (
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-200 text-center space-y-2 text-sm">
                  <p>{micError}</p>
                  <button
                    onClick={startMicTuning}
                    className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
                  >
                    Reintentar micrófono
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center space-y-5">
                  {/* Gauge Display */}
                  <div className="w-full max-w-md space-y-2 text-center">
                    <span className="text-xs font-mono font-bold tracking-widest text-stone-400 uppercase">
                      Nota Detectada
                    </span>

                    <div className="flex items-baseline justify-center gap-2">
                      <span
                        className={`text-8xl font-serif font-black tracking-tighter transition-colors ${
                          isInTune
                            ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                            : 'text-white'
                        }`}
                      >
                        {detectedFreq ? closestString.note : '—'}
                      </span>
                      {detectedFreq && (
                        <span className="text-xl font-mono text-stone-400">
                          {closestString.number}ª ({closestString.nameEs})
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-mono text-stone-400">
                      {detectedFreq ? `${detectedFreq} Hz` : 'Toca una cuerda...'}
                    </div>
                  </div>

                  {/* Tuning Needle Meter (-50 to +50 cents) */}
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-[11px] font-mono text-stone-400 px-1">
                      <span>♭ Demasiado bajo (-50)</span>
                      <span className="font-bold text-white">0</span>
                      <span>Demasiado alto (+50) ♯</span>
                    </div>

                    <div className="relative h-6 bg-black/60 rounded-full border border-white/15 overflow-hidden flex items-center px-1">
                      {/* Center In-Tune Target Zone */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-emerald-500/30 border-x border-emerald-400/50" />

                      {/* Moving Needle */}
                      <div
                        className={`absolute top-0 bottom-0 w-2.5 rounded-full transition-all duration-75 shadow-md ${
                          isInTune
                            ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                            : centsDiff < 0
                            ? 'bg-amber-400'
                            : 'bg-red-400'
                        }`}
                        style={{
                          left: `calc(${50 + centsDiff}% - 5px)`,
                        }}
                      />
                    </div>

                    <div className="flex justify-center">
                      {isInTune ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                          <Sparkles className="w-3.5 h-3.5" />
                          ¡Cuerda Afinada! (±{Math.abs(centsDiff)} cents)
                        </span>
                      ) : detectedFreq ? (
                        <span className="text-xs font-mono text-stone-400">
                          {centsDiff > 0
                            ? `Baja un poco la cuerda (${centsDiff} cents)`
                            : `Sube un poco la cuerda (${centsDiff} cents)`}
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-stone-500">
                          Escuchando micrófono...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stop / Pause Mic button */}
                  <button
                    onClick={() => {
                      if (isListening) stopMicTuning();
                      else startMicTuning();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/15 text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3.5 h-3.5 text-red-400" />
                        <span>Pausar Micrófono</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Activar Micrófono</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Useful references for chords & tuning */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400">
            <div>
              <span className="text-white font-semibold block">
                ¿Dónde conseguir más letras y acordes correctos?
              </span>
              <span>
                Recomendamos las transcripciones comunitarias de <strong>LaCuerda.net</strong> y <strong>Cifra Club</strong>.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://lacuerda.net"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 transition-colors flex items-center gap-1"
              >
                <span>LaCuerda</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.cifraclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#e60]/20 hover:bg-[#e60]/30 text-[#ff8833] border border-[#e60]/30 transition-colors flex items-center gap-1"
              >
                <span>Cifra Club</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
