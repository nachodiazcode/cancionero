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

  // English aliases: C -> DO, D -> RE, E -> MI, F -> FA, G -> SOL, A -> LA, B -> SI
  const angloToLatin: Record<string, string> = {
    'C': 'DO', 'D': 'RE', 'E': 'MI', 'F': 'FA', 'G': 'SOL', 'A': 'LA', 'B': 'SI',
    'CM': 'dom', 'DM': 'rem', 'EM': 'mim', 'FM': 'fam', 'GM': 'solm', 'AM': 'lam', 'BM': 'sim',
    'C7': 'DO7', 'D7': 'RE7', 'E7': 'MI7', 'F7': 'FA7', 'G7': 'SOL7', 'A7': 'LA7', 'B7': 'SI7',
    'CADD9': 'DO9', 'DSUS4': 'RE4', 'BB': 'LA#',
  };

  if (angloToLatin[upper] && CHORD_DATABASE[angloToLatin[upper]]) {
    return CHORD_DATABASE[angloToLatin[upper]];
  }

  return null;
}
