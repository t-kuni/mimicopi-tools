import {useEffect, useState} from 'react';
import './App.css';
import Piano from "./components/Piano";
import TonalitySelect from "./components/TonalitySelect";
import {DefaultTonality, MarksOfChord, NoteNo, Tonality} from "./models";
import {createDiatonicChords, createModalInterchangeChords, createSecondaryDominantChords, filterChords} from "./util";
import ChordList from "./components/ChordList";

function App() {
    const [tonality, setTonality] = useState<Tonality>(DefaultTonality);
    const [diatonicChords, setDiatonicChords] = useState(createDiatonicChords(tonality));
    const [secondaryDominantChords, setSecondaryDominantChords] = useState(createSecondaryDominantChords(tonality));
    const [modalInterchangeChords, setModalInterchangeChords] = useState(createModalInterchangeChords(tonality));
    const [filterNotes, setFilterNotes] = useState<NoteNo[]>([]);

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

    return (
        <div className="App">
            <div>
                Key: <TonalitySelect onKeyChange={(tonality) => {
                    setTonality(tonality)
                }}/>
            </div>
            <div>
                <h2>構成音フィルタ</h2>
                <Piano onMarkChange={(markedNotes: NoteNo[]) => {
                    console.log("onMarkChange", markedNotes);
                    setFilterNotes(markedNotes);
                }}/>
            </div>
            <div>
                <h2>ダイアトニックコード</h2>
                <ChordList chords={diatonicChords} />
                <h2>セカンダリードミナント</h2>
                <ChordList chords={secondaryDominantChords} />
                <h2>モーダルインターチェンジ</h2>
                <ChordList chords={modalInterchangeChords} />
            </div>
        </div>
    );
}

export default App;
