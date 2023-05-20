import {Chord, Key, KeyInfo} from './types'

const allKeys: Key[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const flatToSharp: { [key: string]: Key } = { 'B♭': 'A#', 'E♭': 'D#', 'A♭': 'G#', 'D♭': 'C#', 'G♭': 'F#', 'C♭': 'B' };

const MajorChord = [0, 4, 7];
const MinorChord = [0, 3, 7];
const Minorb5Chord = [0, 3, 6];
const SeventhChord = [0, 4, 7, 11];

const DiatonicChords = [
    {
        suffix: '',
        root: 0,
        chord: MajorChord
    },
    {
        suffix: 'm',
        root: 2,
        chord: MinorChord
    },
    {
        suffix: 'm',
        root: 4,
        chord: MinorChord
    },
    {
        suffix: '',
        root: 5,
        chord: MajorChord
    },
    {
        suffix: '',
        root: 7,
        chord: MajorChord
    },
    {
        suffix: 'm',
        root: 9,
        chord: MinorChord
    },
    {
        suffix: 'm(b5)',
        root: 11,
        chord: Minorb5Chord
    }
]

const SecondaryDominantChords = [
    {
        suffix: '7',
        root: 0,
        chord: SeventhChord
    },
    {
        suffix: '7',
        root: 2,
        chord: SeventhChord
    },
    {
        suffix: '7',
        root: 4,
        chord: SeventhChord
    },
    {
        suffix: '7',
        root: 7,
        chord: SeventhChord
    },
    {
        suffix: '7',
        root: 11,
        chord: SeventhChord
    }
]

const ModalInterchangeChords = [
    {
        // Ⅱ
        suffix: '',
        root: 2,
        chord: MajorChord
    },
    {
        // ♭Ⅲ
        suffix: '',
        root: 3,
        chord: MajorChord
    },
    {
        // ♭Ⅵ
        suffix: '',
        root: 8,
        chord: MajorChord
    },
    {
        // ♭Ⅶ
        suffix: '',
        root: 10,
        chord: MajorChord
    },
    {
        // Ⅳm
        suffix: 'm',
        root: 5,
        chord: MinorChord
    }
]

export function createDiatonicChords(keyInfo: KeyInfo): Chord[] {
    const majorKey = flatToSharp[keyInfo.major] || keyInfo.major as Key;
    const rootIndex = allKeys.indexOf(majorKey);

    return DiatonicChords.map<Chord>((chordInfo, idx) => {
        const chordRootIdx = (rootIndex + chordInfo.root) % 12;
        const name = allKeys[chordRootIdx] + chordInfo.suffix;
        const chord = chordInfo.chord.map((interval, idx) => {
            return { key: allKeys[(chordRootIdx + interval) % 12], color: idx == 0 ? 'green' : 'red' }
        });
        return { name, chord };
    });
}

export function createSecondaryDominantChords(keyInfo: KeyInfo): Chord[] {
    const majorKey = flatToSharp[keyInfo.major] || keyInfo.major as Key;
    const rootIndex = allKeys.indexOf(majorKey);

    return SecondaryDominantChords.map<Chord>((chordInfo, idx) => {
        const chordRootIdx = (rootIndex + chordInfo.root) % 12;
        const name = allKeys[chordRootIdx] + chordInfo.suffix;
        const chord = chordInfo.chord.map((interval, idx) => {
            return { key: allKeys[(chordRootIdx + interval) % 12], color: idx == 0 ? 'green' : 'red' }
        });
        return { name, chord };
    });
}

export function createModalInterchangeChords(keyInfo: KeyInfo): Chord[] {
    const majorKey = flatToSharp[keyInfo.major] || keyInfo.major as Key;
    const rootIndex = allKeys.indexOf(majorKey);

    return ModalInterchangeChords.map<Chord>((chordInfo, idx) => {
        const chordRootIdx = (rootIndex + chordInfo.root) % 12;
        const name = allKeys[chordRootIdx] + chordInfo.suffix;
        const chord = chordInfo.chord.map((interval, idx) => {
            return { key: allKeys[(chordRootIdx + interval) % 12], color: idx == 0 ? 'green' : 'red' }
        });
        return { name, chord };
    });
}