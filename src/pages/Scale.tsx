import React, {useEffect, useState} from 'react';
import Piano from "../components/Piano";
import TonalitySelect from "../components/TonalitySelect";
import {DefaultTonality, MajorScale, Mark, MarksOfChord, normalizeNoteNo, NoteNo, Tonality} from "../models";
import styled from "styled-components";

function Chord() {
    const [tonality, setTonality] = useState<Tonality>(DefaultTonality);

    const marks: Mark[] = MajorScale.map<Mark>((noteNo: NoteNo) => {
        const color = (noteNo == 0 as NoteNo ? 'red' : 'green');
        return {
            noteNo: normalizeNoteNo(tonality.majorNoteNo + noteNo as NoteNo),
            color,
        }
    });

    return (
        <>
            <div>
                Key: <TonalitySelect onKeyChange={(tonality) => {setTonality(tonality)}}/>
            </div>
            <PianoArea>
                <Piano octave={2} readOnly markedKeys={marks} />
            </PianoArea>
        </>
    );
}


const PianoArea = styled.div`
    margin-top: 10px;
`;

export default Chord;
