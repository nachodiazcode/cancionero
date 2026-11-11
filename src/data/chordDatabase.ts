import { GuitarChord } from '../types/song';

export const CHORD_DATABASE: Record<string, GuitarChord> = {
  // Chords from the original book scan
  'SOL*': {
    name: 'SOL*',
    frets: [3, 2, 0, 0, 3, 3],
    fingers: [2, 1, 0, 0, 3, 4],
    baseFret: 1,
  },
  'RE4': {
    name: 'RE4',
    frets: [-1, -1, 0, 2, 3, 3],
    fingers: [0, 0, 0, 1, 2, 3],
    baseFret: 1,
  },
  'DO9': {
    name: 'DO9',
    frets: [-1, 3, 2, 0, 3, 3],
    fingers: [0, 2, 1, 0, 3, 4],
    baseFret: 1,
  },
  'SOL': {
    name: 'SOL',
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    baseFret: 1,
  },
  'rem': {
    name: 'rem',
    frets: [-1, -1, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
    baseFret: 1,
  },
  'FA': {
    name: 'FA',
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    baseFret: 1,
    barres: [1],
  },
  'DO': {
    name: 'DO',
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    baseFret: 1,
  },
  'mim': {
    name: 'mim',
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    baseFret: 1,
  },
  'RE': {
    name: 'RE',
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    baseFret: 1,
  },
  'LA': {
    name: 'LA',
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    baseFret: 1,
  },
  'LA7': {
    name: 'LA7',
    frets: [-1, 0, 2, 0, 2, 0],
    fingers: [0, 0, 2, 0, 3, 0],
    baseFret: 1,
  },
  'SI7': {
    name: 'SI7',
    frets: [-1, 2, 1, 2, 0, 2],
    fingers: [0, 2, 1, 3, 0, 4],
    baseFret: 1,
  },
  'sim': {
    name: 'sim',
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    baseFret: 2,
    barres: [2],
  },
  'lam': {
    name: 'lam',
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    baseFret: 1,
  },
  'LA#': {
    name: 'LA#',
    frets: [-1, 1, 3, 3, 3, 1],
    fingers: [0, 1, 2, 3, 4, 1],
    baseFret: 1,
    barres: [1],
  },
  'MI': {
    name: 'MI',
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    baseFret: 1,
  },
  'MI7': {
    name: 'MI7',
    frets: [0, 2, 0, 1, 0, 0],
    fingers: [0, 2, 0, 1, 0, 0],
    baseFret: 1,
  },
  'FA#m': {
    name: 'FA#m',
    frets: [2, 4, 4, 2, 2, 2],
    fingers: [1, 3, 4, 1, 1, 1],
    baseFret: 2,
    barres: [2],
  },
  'do#m': {
    name: 'do#m',
    frets: [-1, 4, 6, 6, 5, 4],
    fingers: [0, 1, 3, 4, 2, 1],
    baseFret: 4,
    barres: [4],
  },
  'C#m': {
    name: 'C#m',
    frets: [-1, 4, 6, 6, 5, 4],
    fingers: [0, 1, 3, 4, 2, 1],
    baseFret: 4,
    barres: [4],
  },
  'SOL7': {
    name: 'SOL7',
    frets: [3, 2, 0, 0, 0, 1],
    fingers: [3, 2, 0, 0, 0, 1],
    baseFret: 1,
  },
  'DO7': {
    name: 'DO7',
    frets: [-1, 3, 2, 3, 1, 0],
    fingers: [0, 3, 2, 4, 1, 0],
    baseFret: 1,
  },
  'RE7': {
    name: 'RE7',
    frets: [-1, -1, 0, 2, 1, 2],
    fingers: [0, 0, 0, 2, 1, 3],
    baseFret: 1,
  },
  'SI': {
    name: 'SI',
    frets: [-1, 2, 4, 4, 4, 2],
    fingers: [0, 1, 2, 3, 4, 1],
    baseFret: 2,
    barres: [2],
  },
  // Chords for Cifra Club & LaCuerda (Víctor Jara, Los Bunkers, Silvio Rodríguez)
  'G7M': {
    name: 'G7M',
    frets: [3, 2, 0, 0, 0, 2],
    fingers: [2, 1, 0, 0, 0, 3],
    baseFret: 1,
  },
  'G6': {
    name: 'G6',
    frets: [3, 2, 0, 0, 0, 0],
    fingers: [2, 1, 0, 0, 0, 0],
    baseFret: 1,
  },
  'D6': {
    name: 'D6',
    frets: [-1, -1, 0, 2, 0, 2],
    fingers: [0, 0, 0, 1, 0, 2],
    baseFret: 1,
  },
  'A7M': {
    name: 'A7M',
    frets: [-1, 0, 2, 1, 2, 0],
    fingers: [0, 0, 2, 1, 3, 0],
    baseFret: 1,
  },
  'A7M/E': {
    name: 'A7M/E',
    frets: [0, 0, 2, 1, 2, 0],
    fingers: [0, 0, 2, 1, 3, 0],
    baseFret: 1,
  },
  'Bm/F#': {
    name: 'Bm/F#',
    frets: [2, 2, 4, 4, 3, 2],
    fingers: [1, 1, 3, 4, 2, 1],
    baseFret: 2,
    barres: [2],
  },
  'Em/G': {
    name: 'Em/G',
    frets: [3, 2, 2, 0, 0, 0],
    fingers: [3, 1, 2, 0, 0, 0],
    baseFret: 1,
  },
  'F#m': {
    name: 'F#m',
    frets: [2, 4, 4, 2, 2, 2],
    fingers: [1, 3, 4, 1, 1, 1],
    baseFret: 2,
    barres: [2],
  },
  'Bm': {
    name: 'Bm',
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    baseFret: 2,
    barres: [2],
  },
  'D': {
    name: 'D',
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    baseFret: 1,
  },
  'G': {
    name: 'G',
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    baseFret: 1,
  },
  'A': {
    name: 'A',
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    baseFret: 1,
  },
  'C': {
    name: 'C',
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    baseFret: 1,
  },
  'E': {
    name: 'E',
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    baseFret: 1,
  },
  'Em': {
    name: 'Em',
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    baseFret: 1,
  },
};

export function getChordDiagram(chordName: string): GuitarChord | null {
  if (!chordName) return null;
  const clean = chordName.trim();

  // Direct match
  if (CHORD_DATABASE[clean]) return CHORD_DATABASE[clean];

  // Case normalization e.g. "Sol" -> "SOL", "Rem" -> "rem"
  const upper = clean.toUpperCase();
  for (const [key, val] of Object.entries(CHORD_DATABASE)) {
    if (key.toUpperCase() === upper) return val;
  }

  // English aliases & extensions
  const angloToLatin: Record<string, string> = {
    'C': 'DO', 'D': 'RE', 'E': 'MI', 'F': 'FA', 'G': 'SOL', 'A': 'LA', 'B': 'SI',
    'CM': 'dom', 'DM': 'rem', 'EM': 'mim', 'FM': 'fam', 'GM': 'solm', 'AM': 'lam', 'BM': 'sim',
    'C7': 'DO7', 'D7': 'RE7', 'E7': 'MI7', 'F7': 'FA7', 'G7': 'SOL7', 'A7': 'LA7', 'B7': 'SI7',
    'CADD9': 'DO9', 'DSUS4': 'RE4', 'BB': 'LA#',
    'F#M': 'F#m', 'C#M': 'C#m', 'DO#M': 'do#m',
    'GMAJ7': 'G7M', 'AMAJ7': 'A7M', 'CMAJ7': 'DO7', 'DMAJ7': 'RE7',
  };

  if (angloToLatin[upper] && CHORD_DATABASE[angloToLatin[upper]]) {
    return CHORD_DATABASE[angloToLatin[upper]];
  }

  // If it's a slash chord like Bm/F# or Em/G, check base chord if slash version not found
  if (clean.includes('/')) {
    const baseChord = clean.split('/')[0].trim();
    if (CHORD_DATABASE[baseChord]) return CHORD_DATABASE[baseChord];
  }

  return null;
}
