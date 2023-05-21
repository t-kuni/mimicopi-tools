export const Cf: NoteNo = 11;
export const C: NoteNo = 0;
export const Cs: NoteNo = 1;
export const Df: NoteNo = 1;
export const D: NoteNo = 2;
export const Ds: NoteNo = 3;
export const Ef: NoteNo = 3;
export const E: NoteNo = 4;
export const Es: NoteNo = 5;
export const Ff: NoteNo = 4;
export const F: NoteNo = 5;
export const Fs: NoteNo = 6;
export const Gf: NoteNo = 6;
export const G: NoteNo = 7;
export const Gs: NoteNo = 8;
export const Af: NoteNo = 8;
export const A: NoteNo = 9;
export const As: NoteNo = 10;
export const Bf: NoteNo = 10;
export const B: NoteNo = 11;
export const Bs: NoteNo = 0;

export type NoteNo = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const PianoKeys: NoteNo[] = [C, Cs, D, Ds, E, F, Fs, G, Gs, A, As, B];
export const PianoBlackKeys: NoteNo[] = [Cs, Ds, Fs, Gs, As];

export const FlatToSharp: { [key: number]: NoteNo } = {
    [Cf]: B,
    [Df]: Cs,
    [Ef]: Ds,
    [Ff]: E,
    [Gf]: Fs,
    [Af]: Gs,
    [Bf]: As,
};

export const NoteNoToTextOnSharp: { [key: number]: string } = {
    [C]: 'C',
    [Cs]: 'C#',
    [D]: 'D',
    [Ds]: 'D#',
    [E]: 'E',
    [F]: 'F',
    [Fs]: 'F#',
    [G]: 'G',
    [Gs]: 'G#',
    [A]: 'A',
    [As]: 'A#',
    [B]: 'B',
}

export const NoteNoToTextOnFlat: { [key: number]: string } = {
    [C]: 'C',
    [Cs]: 'Db',
    [D]: 'D',
    [Ds]: 'Eb',
    [E]: 'E',
    [F]: 'F',
    [Fs]: 'Gb',
    [G]: 'G',
    [Gs]: 'Ab',
    [A]: 'A',
    [As]: 'Bb',
    [B]: 'B',
}

export const NoteTextToNoteNo: { [key: string]: NoteNo } = {
    'C': C,
    'C#': Cs,
    'Db': Cs,
    'D': D,
    'D#': Ds,
    'Eb': Ds,
    'E': E,
    'F': F,
    'F#': Fs,
    'Gb': Fs,
    'G': G,
    'G#': Gs,
    'Ab': Gs,
    'A': A,
    'A#': As,
    'Bb': As,
    'B': B,
};


export type Mark = {
    noteNo: NoteNo;
    color: string;
};

export type MarksOfChord = {
    chordName: string;
    marks: Mark[];
};

export type Tonality = {
    majorNoteNo: NoteNo;
    minorNoteNo: NoteNo;
    accidentals: string;
    isFlat: boolean;
};

export const TonalityCMajor = { majorNoteNo: C, minorNoteNo: A, accidentals: '0', isFlat: false };
export const DefaultTonality: Tonality = TonalityCMajor;
export const Tonalities: Tonality[] = [
    TonalityCMajor,
    { majorNoteNo: G, minorNoteNo: E, accidentals: '1♯', isFlat: false },
    { majorNoteNo: D, minorNoteNo: B, accidentals: '2♯', isFlat: false },
    { majorNoteNo: A, minorNoteNo: Fs, accidentals: '3♯', isFlat: false },
    { majorNoteNo: E, minorNoteNo: Cs, accidentals: '4♯', isFlat: false },
    { majorNoteNo: B, minorNoteNo: Gs, accidentals: '5♯', isFlat: false },
    { majorNoteNo: Fs, minorNoteNo: Ds, accidentals: '6♯', isFlat: false },
    { majorNoteNo: Cs, minorNoteNo: As, accidentals: '7♯', isFlat: false },
    { majorNoteNo: F, minorNoteNo: D, accidentals: '1♭', isFlat: true },
    { majorNoteNo: Bf, minorNoteNo: G, accidentals: '2♭', isFlat: true },
    { majorNoteNo: Ef, minorNoteNo: C, accidentals: '3♭', isFlat: true },
    { majorNoteNo: Af, minorNoteNo: F, accidentals: '4♭', isFlat: true },
    { majorNoteNo: Df, minorNoteNo: Bf, accidentals: '5♭', isFlat: true },
    { majorNoteNo: Gf, minorNoteNo: Ef, accidentals: '6♭', isFlat: true },
    { majorNoteNo: Cf, minorNoteNo: Af, accidentals: '7♭', isFlat: true },
];

export type ChordStructure = {
    suffix: string;
    notes: NoteNo[];
}

export const MajorChord: ChordStructure = {
    suffix: '',
    notes: [0, 4, 7],
}
export const MinorChord: ChordStructure = {
    suffix: 'm',
    notes: [0, 3, 7],
}
export const Minorb5Chord: ChordStructure = {
    suffix: 'm(b5)',
    notes: [0, 3, 6],
}
export const SeventhChord: ChordStructure = {
    suffix: '7',
    notes: [0, 4, 7, 11],
};

export type Chord = {
    rootNoteNo: NoteNo;
    chordStructure: ChordStructure;
}

export type PlayNote = {
    note: string;
    duration: string;
}

export type PlayChordProgression = PlayNote[][][];