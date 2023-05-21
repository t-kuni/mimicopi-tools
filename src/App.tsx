import {useEffect, useState} from 'react';
import './App.css';
import Piano from "./components/Piano";
import TonalitySelect from "./components/TonalitySelect";
import {DefaultTonality, MarksOfChord, NoteNo, Tonality} from "./models";
import {createDiatonicChords, createModalInterchangeChords, createSecondaryDominantChords, filterChords} from "./util";
import ChordList from "./components/ChordList";
import styled from "styled-components";
import Tone from "./components/Tone";

function App() {
    const [tonality, setTonality] = useState<Tonality>(DefaultTonality);
    const [diatonicChords, setDiatonicChords] = useState(createDiatonicChords(tonality));
    const [secondaryDominantChords, setSecondaryDominantChords] = useState(createSecondaryDominantChords(tonality));
    const [modalInterchangeChords, setModalInterchangeChords] = useState(createModalInterchangeChords(tonality));
    const [filterNotes, setFilterNotes] = useState<NoteNo[]>([]);
    const [chordProgressText, setChordProgressText] = useState<string>('');

    useEffect(() => {
        if (filterNotes.length === 0) {
            setDiatonicChords(createDiatonicChords(tonality));
            setSecondaryDominantChords(createSecondaryDominantChords(tonality));
            setModalInterchangeChords(createModalInterchangeChords(tonality));
        } else {
            setDiatonicChords(filterChords(createDiatonicChords(tonality), filterNotes));
            setSecondaryDominantChords(filterChords(createSecondaryDominantChords(tonality), filterNotes));
            setModalInterchangeChords(filterChords(createModalInterchangeChords(tonality), filterNotes));
        }
    }, [tonality, filterNotes]);

    const onClickChord = (chord: MarksOfChord) => {
        setChordProgressText((prev) => {
            if (prev === '') {
                return chord.chordName;
            }
            return prev + ' | ' + chord.chordName
        });
    }

    return (
        <AppContainer className="App">
            <div>
                Key: <TonalitySelect onKeyChange={(tonality) => {
                setTonality(tonality)
            }}/>
            </div>
            <div>
                <h2>構成音フィルタ</h2>
                <Piano onMarkChange={(markedNotes: NoteNo[]) => {
                    setFilterNotes(markedNotes);
                }}/>
            </div>
            <div>
                <h2>ダイアトニックコード</h2>
                <ChordList chords={diatonicChords} onClickChord={onClickChord}/>
                <h2>セカンダリードミナント</h2>
                <ChordList chords={secondaryDominantChords} onClickChord={onClickChord}/>
                <h2>モーダルインターチェンジ</h2>
                <ChordList chords={modalInterchangeChords} onClickChord={onClickChord}/>
            </div>
            <FooterContainer>
                <textarea value={chordProgressText} cols={100} rows={4} onChange={e => setChordProgressText(e.target.value)}></textarea>
                <div>
                    <Tone progression={chordProgressText}/>
                </div>
            </FooterContainer>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    margin-bottom: 300px;
`;

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid black;
    background-color: white;
    padding: 5px;
    z-index: 10;
`;

export default App;
