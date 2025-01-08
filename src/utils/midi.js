import { WebMidi } from "webmidi";
import { Chord } from "tonal";

const pitchOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const patterns = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8]
};

WebMidi
  .enable()
  .then(() => console.log("WebMidi enabled!"))
  .catch(err => alert(err));

export const onEnabled = () => {
    // WebMidi.inputs.forEach(input => console.log(input));
    // WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

    return WebMidi.inputs;
}

/**
 * Returns the designated chord given an array of notes.
 * 
 * @param {Array} notes the array containing the identifiers of notes to detect
 * @returns a chords.
 */
export const detection = (notes) => {
    const result = Chord.detect(notes, {assumePerfectFifth: true})[0];
    if (result) return result.replace(/M(?!aj)/g, '');
    else return null;
} 

/**
 * Returns the sorted array of notes on a first number then letter principle based on the {@code pitchOrder} object.
 * @example sort([C4, E3, A3, B4]) -> [E3, A3, C4, B4].
 * 
 * @param {Array} notes 
 * @returns the sorted array
 */
export const sort = (notes) => {
    // SORT THE NOTES ARRAY:  number first, then letter
    const sortedNotes = notes.sort((a, b) => {
        const [pitchA, octaveA] = [a.slice(0, -1), parseInt(a.slice(-1))];
        const [pitchB, octaveB] = [b.slice(0, -1), parseInt(b.slice(-1))];

        if (octaveA !== octaveB) return octaveA - octaveB;
        return pitchOrder.indexOf(pitchA) - pitchOrder.indexOf(pitchB);
    });

    return sortedNotes;
}

export const normalize = (notes) => {
    const midiNotes = notes.map(noteToMidi);

    // normalize to the bass note
    const minNote = Math.min(...midiNotes);
    const normalized = midiNotes.map(note => note - minNote);

    return normalized.sort((a, b) => a - b);
}

export const rotate = (notes) => {

}