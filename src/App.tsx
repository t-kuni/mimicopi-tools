import './App.css';
import Chord from "./pages/Chord";
import {useState} from "react";
import {Tab} from "./models";
import styled from "styled-components";
import Scale from "./pages/Scale";

function App() {
    const [tab, setTab] = useState<Tab>('Chord');

    const content = tab === 'Chord' ? <Chord /> : <Scale />;

    return (
        <AppContainer className="App">
            <div>
                <button onClick={() => setTab('Chord')}>Chord</button>
                <button onClick={() => setTab('Scale')}>Scale</button>
            </div>
            <ContentArea>
                {content}
            </ContentArea>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    margin-bottom: 300px;
    padding: 10px;
`;

const ContentArea = styled.div`
    margin-top: 10px;
`;

export default App;
