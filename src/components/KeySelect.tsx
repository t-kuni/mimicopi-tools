import React, { ChangeEvent, FC } from 'react';

// 型定義のインポート
import { Key, KeyInfo } from '../types'; // <- このパスは実際のものに変更してください

// 五度圏の全キー
const keys: KeyInfo[] = [
    { major: 'C', minor: 'A', accidentals: '0' },
    { major: 'G', minor: 'E', accidentals: '1♯' },
    { major: 'D', minor: 'B', accidentals: '2♯' },
    { major: 'A', minor: 'F#', accidentals: '3♯' },
    { major: 'E', minor: 'C#', accidentals: '4♯' },
    { major: 'B', minor: 'G#', accidentals: '5♯' },
    { major: 'F#', minor: 'D#', accidentals: '6♯' },
    { major: 'C#', minor: 'A#', accidentals: '7♯' },
    { major: 'F', minor: 'D', accidentals: '1♭' },
    { major: 'B♭', minor: 'G', accidentals: '2♭' },
    { major: 'E♭', minor: 'C', accidentals: '3♭' },
    { major: 'A♭', minor: 'F', accidentals: '4♭' },
    { major: 'D♭', minor: 'B♭', accidentals: '5♭' },
    { major: 'G♭', minor: 'E♭', accidentals: '6♭' },
    { major: 'C♭', minor: 'A♭', accidentals: '7♭' },
];

type Props = {
    onKeyChange: (key: KeyInfo) => void;
}

const KeySelect: FC<Props> = ({ onKeyChange }) => {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(event.target.value, 10);
        onKeyChange(keys[index]);
    };

    return (
        <div>
            <select onChange={handleChange}>
                {keys.map((key, index) => (
                    <option value={index} key={index}>
                        {`${key.major} Major / ${key.minor} Minor (${key.accidentals})`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default KeySelect;
