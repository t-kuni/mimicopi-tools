import {
    MarksOfChord,
    Tonality,
    NoteNo,
    FlatToSharp,
    Chord,
    MajorChord,
    MinorChord,
    Minorb5Chord,
    SeventhChord,
    NoteNoToTextOnFlat,
    NoteNoToTextOnSharp,
    NoteNoToRomanTextOnFlat, NoteNoToRomanTextOnSharp,
} from './models';

const diatonicChords: Chord[] = [
    {
        rootNoteNo: 0,
        chordStructure: MajorChord
    },
    {
        rootNoteNo: 2,
        chordStructure: MinorChord
    },
    {
        rootNoteNo: 4,
        chordStructure: MinorChord
    },
    {
        rootNoteNo: 5,
        chordStructure: MajorChord
    },
    {
        rootNoteNo: 7,
        chordStructure: MajorChord
    },
    {
        rootNoteNo: 9,
        chordStructure: MinorChord
    },
    {
        rootNoteNo: 11,
        chordStructure: Minorb5Chord
    }
]

const SecondaryDominantChords: Chord[] = [
    {
        rootNoteNo: 0,
        chordStructure: SeventhChord
    },
    {
        rootNoteNo: 2,
        chordStructure: SeventhChord
    },
    {
        rootNoteNo: 4,
        chordStructure: SeventhChord
    },
    {
        rootNoteNo: 7,
        chordStructure: SeventhChord
    },
    {
        rootNoteNo: 11,
        chordStructure: SeventhChord
    }
]

const ModalInterchangeChords: Chord[] = [
    {
        // Ⅱ
        rootNoteNo: 2,
        chordStructure: MajorChord
    },
    {
        // ♭Ⅲ
        rootNoteNo: 3,
        chordStructure: MajorChord
    },
    {
        // ♭Ⅵ
        rootNoteNo: 8,
        chordStructure: MajorChord
    },
    {
        // ♭Ⅶ
        rootNoteNo: 10,
        chordStructure: MajorChord
    },
    {
        // Ⅳm
        rootNoteNo: 5,
        chordStructure: MinorChord
    }
]

const RootKeyColor = 'red';
const OtherKeyColor = 'green';

export function createDiatonicChords(tonality: Tonality): MarksOfChord[] {
    return createChords(tonality, diatonicChords);
}

export function createSecondaryDominantChords(tonality: Tonality): MarksOfChord[] {
    return createChords(tonality, SecondaryDominantChords);
}

export function createModalInterchangeChords(tonality: Tonality): MarksOfChord[] {
    return createChords(tonality, ModalInterchangeChords);
}

function createChords(tonality: Tonality, chordList: Chord[]): MarksOfChord[] {
    const majorNoteNo = FlatToSharp[tonality.majorNoteNo] ?? tonality.majorNoteNo;

    return chordList.map<MarksOfChord>((c: Chord) => {
        const rootNoteNo = (majorNoteNo + c.rootNoteNo) % 12 as NoteNo;
        const rootNoteText = tonality.isFlat ? NoteNoToTextOnFlat[rootNoteNo] : NoteNoToTextOnSharp[rootNoteNo];
        const chordName = `${rootNoteText}${c.chordStructure.suffix}`;
        const rootNoteRomanText = tonality.isFlat ? NoteNoToRomanTextOnFlat[c.rootNoteNo] : NoteNoToRomanTextOnSharp[c.rootNoteNo];
        const chordNameWithRoman = `${rootNoteRomanText}${c.chordStructure.suffix}`;
        const marks = c.chordStructure.notes.map((interval, idx) => {
            return {
                noteNo: (rootNoteNo + interval) % 12 as NoteNo,
                color: idx == 0 ? RootKeyColor : OtherKeyColor
            }
        });
        return { chordName, chordNameWithRoman, marks };
    });
}

export function filterChords(chords: MarksOfChord[], filterNotes: NoteNo[]): MarksOfChord[] {
    return chords.filter(c => {
        return c.marks.filter(m => filterNotes.includes(m.noteNo)).length > 0;
    });
}