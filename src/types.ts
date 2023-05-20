export type Key = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#';

export type Mark = {
    key: Key;
    color: string;
};

export type Chord = {
    name: string;
    chord: Mark[];
};

export interface KeyInfo {
    major: string;  // Key type changed to string to accept flat keys as input
    minor: string;  // Key type changed to string to accept flat keys as input
    accidentals: string;
}