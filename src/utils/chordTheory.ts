import { NotationSystem } from '../types/song';

// Scale mappings (12 chromatic semitones)
export const LATIN_SCALE_SHARP = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];
export const LATIN_SCALE_FLAT = ['DO', 'REb', 'RE', 'MIb', 'MI', 'FA', 'SOLb', 'SOL', 'LAb', 'LA', 'SIb', 'SI'];

export const ANGLO_SCALE_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const ANGLO_SCALE_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Map aliases to semitone indices (0..11)
const ROOT_NOTE_MAP: Record<string, number> = {
  // Latin
  'DO': 0, 'DO#': 1, 'REB': 1,
  'RE': 2, 'RE#': 3, 'MIB': 3,
  'MI': 4,
  'FA': 5, 'FA#': 6, 'SOLB': 6,
  'SOL': 7, 'SOL#': 8, 'LAB': 8,
  'LA': 9, 'LA#': 10, 'SIB': 10,
  'SI': 11,

  // Anglo
  'C': 0, 'C#': 1, 'DB': 1,
  'D': 2, 'D#': 3, 'EB': 3,
  'E': 4,
  'F': 5, 'F#': 6, 'GB': 6,
  'G': 7, 'G#': 8, 'AB': 8,
  'A': 9, 'A#': 10, 'BB': 10,
  'B': 11,
};

// Recognizes chord roots in Latin or Anglo:
// E.g. "SOL*", "rem", "mim", "sim", "lam", "FA", "DO9", "RE4", "SI7", "LA#", "Cadd9", "F#m"
interface ParsedChord {
  rootIndex: number;
  suffix: string;
  isMinorStyleWord: boolean; // e.g., 'rem', 'mim', 'sim', 'lam'
  bassChord?: string;
  original: string;
}

export function parseChord(chordRaw: string): ParsedChord | null {
  if (!chordRaw || typeof chordRaw !== 'string') return null;
  const clean = chordRaw.trim();
  if (!clean) return null;

  // Check for slash chord (e.g. SOL/SI or G/B)
  const slashParts = clean.split('/');
  const mainPart = slashParts[0];
  const bassPart = slashParts.length > 1 ? slashParts[1] : undefined;

  // Match Latin short minors like 'rem', 'mim', 'sim', 'lam', 'dom', 'solm', 'fam'
  const latinMinorWordMatch = mainPart.match(/^(do|re|mi|fa|sol|la|si)m(.*)$/i);
  if (latinMinorWordMatch) {
    const rootWord = latinMinorWordMatch[1].toUpperCase();
    const rest = latinMinorWordMatch[2]; // e.g. "7" in "mim7"
    if (rootWord in ROOT_NOTE_MAP) {
      return {
        rootIndex: ROOT_NOTE_MAP[rootWord],
        suffix: 'm' + rest,
        isMinorStyleWord: true,
        bassChord: bassPart,
        original: clean,
      };
    }
  }

  // General pattern: (Root)(Accidental)(Suffix)
  // Roots can be SOL, DO, RE, MI, FA, LA, SI or C, D, E, F, G, A, B
  const generalRegex = /^(SOL|DO|RE|MI|FA|LA|SI|[CDEFGAB])([#b]?)(.*)$/i;
  const match = mainPart.match(generalRegex);
  if (!match) return null;

  const rootName = match[1].toUpperCase();
  const accidental = match[2];
  const suffix = match[3];
  const combinedRoot = rootName + accidental.toUpperCase();

  if (combinedRoot in ROOT_NOTE_MAP) {
    return {
      rootIndex: ROOT_NOTE_MAP[combinedRoot],
      suffix: suffix,
      isMinorStyleWord: false,
      bassChord: bassPart,
      original: clean,
    };
  }

  return null;
}

export function transposeChord(
  chord: string,
  semitones: number,
  targetNotation: NotationSystem = 'latin',
  preferFlats: boolean = false
): string {
  if (semitones === 0 && targetNotation === 'latin') {
    // If no transposition and latin requested, check if it was anglo and needs translation
    const parsed = parseChord(chord);
    if (!parsed) return chord;
    // Format according to notation
    return formatChord(parsed, targetNotation, preferFlats);
  }

  const parsed = parseChord(chord);
  if (!parsed) return chord;

  const newIndex = (parsed.rootIndex + semitones + 24) % 12;
  const transposedParsed: ParsedChord = {
    ...parsed,
    rootIndex: newIndex,
  };

  if (parsed.bassChord) {
    transposedParsed.bassChord = transposeChord(parsed.bassChord, semitones, targetNotation, preferFlats);
  }

  return formatChord(transposedParsed, targetNotation, preferFlats);
}

function formatChord(parsed: ParsedChord, notation: NotationSystem, preferFlats: boolean): string {
  const scale = notation === 'latin'
    ? (preferFlats ? LATIN_SCALE_FLAT : LATIN_SCALE_SHARP)
    : (preferFlats ? ANGLO_SCALE_FLAT : ANGLO_SCALE_SHARP);

  const rootStr = scale[parsed.rootIndex];

  // If originally written in Latin minor shorthand like 'mim' or 'rem', keep that flavor if notation is Latin
  if (notation === 'latin' && parsed.isMinorStyleWord && parsed.suffix.startsWith('m')) {
    const rootLower = rootStr.toLowerCase();
    const restSuffix = parsed.suffix.slice(1);
    const main = `${rootLower}m${restSuffix}`;
    return parsed.bassChord ? `${main}/${parsed.bassChord}` : main;
  }

  const main = `${rootStr}${parsed.suffix}`;
  return parsed.bassChord ? `${main}/${parsed.bassChord}` : main;
}

/**
 * Parses bracketed chords like "[SOL]Compañeros [RE]poetas" into tokens
 */
export function parseChordProLine(lineText: string): { chord?: string; lyric: string }[] {
  const tokens: { chord?: string; lyric: string }[] = [];
  const regex = /\[([^\]]+)\]([^\[]*)/g;
  let match;
  let lastIndex = 0;

  // Text before first bracket
  const firstBracket = lineText.indexOf('[');
  if (firstBracket > 0) {
    tokens.push({
      lyric: lineText.substring(0, firstBracket),
    });
    lastIndex = firstBracket;
  } else if (firstBracket === -1) {
    return [{ lyric: lineText }];
  }

  while ((match = regex.exec(lineText)) !== null) {
    tokens.push({
      chord: match[1].trim(),
      lyric: match[2],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < lineText.length) {
    tokens.push({
      lyric: lineText.substring(lastIndex),
    });
  }

  return tokens;
}
