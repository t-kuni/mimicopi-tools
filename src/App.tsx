import React from 'react';
import logo from './logo.svg';
import './App.css';
import Piano from "./components/Piano";
import KeySelect from "./components/KeySelect";
import {Chord} from "./types";
import {createDiatonicChords, createModalInterchangeChords, createSecondaryDominantChords} from "./util";
import ChordList from "./components/ChordList";

function App() {
    const defaultKey = { major: 'C', minor: 'A', accidentals: '0' };
    const [diatonicChords, setDiatonicChords] = React.useState<Chord[]>(createDiatonicChords(defaultKey));
    const [secondaryDominantChords, setSecondaryDominantChords] = React.useState<Chord[]>(createSecondaryDominantChords(defaultKey));
    const [modalInterchangeChords, setModalInterchangeChords] = React.useState<Chord[]>(createModalInterchangeChords(defaultKey));

    return (
        <div className="App">
            <div>
                Key: <KeySelect onKeyChange={(key) => {
                    setDiatonicChords(createDiatonicChords(key));
                    setSecondaryDominantChords(createSecondaryDominantChords(key));
                    setModalInterchangeChords(createModalInterchangeChords(key));
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
