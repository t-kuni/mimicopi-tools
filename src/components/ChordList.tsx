import React, { FC } from 'react';
import styled from 'styled-components';
import { Chord } from '../types';
import Piano from './Piano';

type ChordListProps = {
    chords: Chord[];
};

const ChordList: FC<ChordListProps> = ({ chords }) => {
    return (
        <ChordListContainer>
            {chords.map((chord, index) => (
                <ChordContainer key={index}>
                    <ChordName>{chord.name}</ChordName>
                    <Piano octave={2} readOnly markedKeys={chord.chord} />
                </ChordContainer>
            ))}
        </ChordListContainer>
    );
};

const ChordListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
`;

const ChordContainer = styled.div`
    flex-basis: calc(25% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

const ChordName = styled.h2`
    text-align: center;
`;

export default ChordList;
