import {
    ChordStructure,
    MajorChord,
    Mark,
    Minorb5Chord,
    MinorChord,
    NoteNo,
    NoteNoToTextOnSharp, NoteTextToNoteNo, PianoBlackKeys,
    SeventhChord
} from "./models";

type PlayChordProgression = Array<Array<Array<{note: string, duration: string}>>>;

export const ChordStructures: { [key: string]: ChordStructure } = {
    '': MajorChord,
    'm': MinorChord,
    'm(b5)': Minorb5Chord,
    '7': SeventhChord,
};

export function parseProgression(input: string): PlayChordProgression {
    const bars = input.split(' | ');
    const progression: PlayChordProgression = bars.map((bar, barIndex) => {
        const chords = bar.split(' ');
        return chords.map((chord, chordIndex) => {
            const matchResult = chord.match(/[A-G](#|b)?/);
            if (!matchResult) {
                throw new Error(`Invalid chord: ${chord}`);
            }
            const rootNoteText = matchResult[0];
            const suffix = chord.slice(rootNoteText.length);
            const rootNoteNo = NoteTextToNoteNo[rootNoteText];
            if (rootNoteNo === undefined) {
                throw new Error(`Invalid chord: ${chord}`);
            }
            const chordStructure = ChordStructures[suffix];
            return chordStructure.notes.map((interval) => {
                const noteNo = (rootNoteNo + interval) % 12 as NoteNo;
                const note: Mark = {
                    noteNo: noteNo,
                    color: PianoBlackKeys.includes(noteNo) ? 'black' : 'white',
                };
                const noteText = NoteNoToTextOnSharp[note.noteNo] + '4';
                const duration = chords.length > 1 ? '2n' : '1n';
                return {
                    note: noteText,
                    duration: duration
                };
            });
        });
    });
    return progression;
}
