import React, {useState, useEffect, FC} from 'react';
import styled from 'styled-components';
import {Mark, NoteNo, PianoKeys, PianoBlackKeys} from "../models";

type PianoProps = {
    octave?: number;
    readOnly?: boolean;
    markedKeys?: Mark[];
    defaultMarkColor?: string;
};

const Piano: FC<PianoProps> = (props: PianoProps) => {
    const {
        octave = 1,
        readOnly = false,
        markedKeys = [],
        defaultMarkColor = 'red',
    } = props;
    const [keyMarks, setKeyMarks] = useState<{ [key: number]: Mark | undefined }>({});

    useEffect(() => {
        let updatedKeyMarks: { [key: number]: Mark | undefined } = {};
        if (markedKeys !== undefined) {
            markedKeys.forEach((mark: Mark) => {
                updatedKeyMarks[mark.noteNo] = mark;
            });
        }
        setKeyMarks(updatedKeyMarks);
    }, [props.markedKeys]); // ここをmarkedKeysにすると無限ループになる

    const handleClick = (noteNo: NoteNo) => {
        if (readOnly) {
            return;
        }
        setKeyMarks((prevKeyMarks) => ({
            ...prevKeyMarks,
            [noteNo]: prevKeyMarks[noteNo] ? undefined : {noteNo, color: defaultMarkColor},
        }));
    };

    const renderKey = (noteNo: NoteNo, index: number) => {
        const mark = keyMarks[noteNo];
        const isBlackKey = PianoBlackKeys.includes(noteNo);
        return (
            <KeyUI
                key={`${noteNo}-${index}`}
                isBlackKey={isBlackKey}
                isMarked={!!mark}
                markColor={mark?.color}
                onClick={() => handleClick(noteNo)}
            />
        );
    };

    return (
        <PianoContainer>
            {Array.from({length: octave}, (_, i) => i).flatMap((_, index) =>
                PianoKeys.map((key) => renderKey(key, index))
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
