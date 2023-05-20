import {useState} from 'react';
import './App.css';
import Piano from "./components/Piano";
import TonalitySelect from "./components/TonalitySelect";
import {DefaultTonality, MarksOfChord} from "./models";
import {createDiatonicChords, createModalInterchangeChords, createSecondaryDominantChords} from "./util";
import ChordList from "./components/ChordList";

function App() {
    const [diatonicChords, setDiatonicChords] = useState(createDiatonicChords(DefaultTonality));
    const [secondaryDominantChords, setSecondaryDominantChords] = useState(createSecondaryDominantChords(DefaultTonality));
    const [modalInterchangeChords, setModalInterchangeChords] = useState(createModalInterchangeChords(DefaultTonality));

    return (
        <div className="App">
            <div>
                Key: <TonalitySelect onKeyChange={(tonality) => {
                    setDiatonicChords(createDiatonicChords(tonality));
                    setSecondaryDominantChords(createSecondaryDominantChords(tonality));
                    setModalInterchangeChords(createModalInterchangeChords(tonality));
                }}/>
            </div>
            <div>
                <h2>構成音フィルタ</h2>
                <Piano />
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
