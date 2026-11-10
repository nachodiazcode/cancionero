export type NotationSystem = 'latin' | 'anglo';

export interface ChordToken {
  chord?: string;
  lyric: string;
}

export interface SongLine {
  type: 'lyric-chord' | 'chord-only' | 'lyric-only' | 'tab' | 'comment' | 'blank';
  tokens?: ChordToken[];
  text?: string;
  tabText?: string;
}

export interface SongSection {
  marker?: string; // e.g. "(A)", "(B)", "(C)", "Intro"
  lines: SongLine[];
}

export interface GuitarChord {
  name: string;
  frets: number[]; // 6 elements: [E, A, D, G, B, e]. -1 for mute ('x'), 0 for open
  fingers?: number[]; // [E, A, D, G, B, e] 1=index, 2=middle, 3=ring, 4=pinky, 0=none
  baseFret?: number; // 1-based, default 1
  barres?: number[]; // fret numbers where a barre occurs
}

export interface Song {
  id: string;
  title: string;
  subtitle?: string;
  artist: string;
  epigraph?: {
    quote: string;
    author: string;
  };
  intro?: string;
  sections: SongSection[];
  chords: string[]; // List of chord names used
  originalKey: string;
  pageNumber?: number;
  timeSignature?: string;
  tempoBpm?: number;
  notes?: string;
}

export type ViewMode = 'single' | 'book' | 'fitted';
export type ThemeMode = 'vintage' | 'stage' | 'paper-clean';
