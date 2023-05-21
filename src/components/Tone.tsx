import React from 'react';
import * as Tone from 'tone';
import { parseProgression } from '../playChordProgression';

interface PlayChordButtonProps {
    progression: string;
}

const PlayChordButton: React.FC<PlayChordButtonProps> = ({ progression }) => {
    const playChord = async () => {
        await Tone.start(); // 必要な初期化を行います

        const piano = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

        const playChordProgression = parseProgression(progression);

        await Tone.loaded();

        Tone.Transport.cancel(); // 再生中の場合止める
        Tone.Transport.stop();

        // BPMを120に設定
        Tone.Transport.bpm.value = 120;

        playChordProgression.forEach((bar, barIndex) => {
            bar.forEach((chord, chordIndex) => {
                // Schedulerにコードを登録します。小節とコードの数に基づいて遅延時間を設定します。
                // 小節の中のコードの位置に基づいてスケジュールします
                Tone.Transport.scheduleOnce((time) => {
                    piano.triggerAttackRelease(chord.map(note => note.note), chord[0].duration, time);
                }, `${barIndex}:${chordIndex}:0`);
            });
        });

        // 再生を開始
        Tone.Transport.start();
    };

    return (
        <button onClick={playChord}>
            Play Chord Progression
        </button>
    );
};

export default PlayChordButton;
