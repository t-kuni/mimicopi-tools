import React, {ChangeEvent, FC} from 'react';
import {Tonality, Tonalities, NoteNoToTextOnFlat, NoteNoToTextOnSharp} from '../models';

type Props = {
    onKeyChange: (key: Tonality) => void;
}

const TonalitySelect: FC<Props> = ({onKeyChange}) => {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(event.target.value, 10);
        onKeyChange(Tonalities[index]);
    };

    return (
        <div>
            <select onChange={handleChange}>
                {Tonalities.map((tonality, index) => {
                    const majorNoteName = tonality.isFlat ? NoteNoToTextOnFlat[tonality.majorNoteNo] : NoteNoToTextOnSharp[tonality.majorNoteNo];
                    const minorNoteName = tonality.isFlat ? NoteNoToTextOnFlat[tonality.minorNoteNo] : NoteNoToTextOnSharp[tonality.minorNoteNo];
                    return (
                        <option value={index} key={index}>
                            {`${majorNoteName} Major / ${minorNoteName} Minor (${tonality.accidentals})`}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default TonalitySelect;
