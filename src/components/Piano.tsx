import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import {Mark, Key} from "../types";

type PianoProps = {
    octave?: number;
    readOnly?: boolean;
    markedKeys?: Mark[];
    defaultMarkColor?: string;
};

const KEYS: Key[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const Piano: FC<PianoProps> = ({
                                   octave = 1,
                                   readOnly = false,
                                   markedKeys = [],
                                   defaultMarkColor = 'red',
                               }) => {
    let defaultMarks: { [key: string]: Mark | undefined } = {};
    markedKeys.forEach((mark) => {
        defaultMarks[mark.key] = mark;
    });
    const [marks, setMarks] = useState<{ [key: string]: Mark | undefined }>(defaultMarks);

    const handleClick = (key: Key) => {
        if (readOnly) {
            return;
        }
        setMarks({
            ...marks,
            [key]: marks[key] ? undefined : { key, color: defaultMarkColor },
        });
    };

    const renderKey = (key: Key, index: number) => {
        const mark = marks[key];
        const isBlackKey = key.includes('#');
        return (
            <KeyUI
                key={`${key}-${index}`}
                isBlackKey={isBlackKey}
                isMarked={!!mark}
                markColor={mark?.color}
                onClick={() => handleClick(key)}
            />
        );
    };

    return (
        <PianoContainer>
            {Array.from({ length: octave }, (_, i) => i).flatMap((_, index) =>
                KEYS.map((key) => renderKey(key, index))
            )}
        </PianoContainer>
    );
};

const PianoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid black;
  padding: 5px;
  background-color: white;
  width: fit-content;
`;

const KeyUI = styled.button<{ isBlackKey: boolean; isMarked: boolean; markColor?: string }>`
  width: ${(props) => (props.isBlackKey ? '16px' : '30px')};
  height: ${(props) => (props.isBlackKey ? '55px' : '80px')};
  background-color: ${(props) => (props.isBlackKey ? 'black' : 'white')};
  color: ${(props) => (props.isBlackKey ? 'white' : 'black')};
  border: ${(props) => (props.isBlackKey ? 'none' : '1px solid black')};
  position: relative;
  cursor: ${(props) => (props.isMarked ? 'pointer' : 'default')};
  margin: ${(props) => (props.isBlackKey ? '0 -8px 0 -8px' : '0')};
  z-index: ${(props) => (props.isBlackKey ? '2' : '1')};
  &:active {
    top: 1px;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 5%;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.markColor};
    transform: translate(-50%, -50%);
    border-radius: 50%;
    visibility: ${(props) => (props.isMarked ? 'visible' : 'hidden')};
  }
`;

export default Piano;
