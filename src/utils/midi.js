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
 * @returns a chord
 */
export const detection = (notes) => {
    // const result = Chord.detect(notes, {assumePerfectFifth: true})[0];
    // if (result) return result.replace(/M(?!aj)/g, '');
    let base = "", below = "", type = "";

    if (!Array.isArray(notes) || notes.length === 0) return null;
    
    notes = sort(notes);

    const normalizedNotes = normalize(notes);

    below = notes[0]; // lowest note


    
    let rotatedNotes = [...normalizedNotes];

    for (let i = 0; i < normalizedNotes.length; i++) { // ith rotation
        if (i != 0) rotatedNotes = rotate(rotatedNotes);

        for (const pattern of patterns) {
            const { name, formula } = pattern;

            if (arraysEqual(rotatedNotes, formula)) type = name;
        }

    }

    for (const pattern of patterns) {
        const { name, formula } = pattern;

        let rotatedNotes = [...normalizedNotes];
        for (let i = 0; i < normalizedNotes.length; i++) {
            if (arraysEqual(rotatedNotes, formula)) return name;
            rotatedNotes = rotate(rotatedNotes);
            
        }
    }

    return "Unknown";
} 



/**
 * Returns the sorted array of notes on a first number then letter principle based on the {@code pitchOrder} object.
 * 
 * @example sort([C4, E3, A3, B4]) -> [E3, A3, C4, B4].
 * 
 * @param {Array} notes 
 * @returns the sorted array
 */
const sort = (notes) => {
    const sortedNotes = notes.sort((a, b) => {
        const [pitchA, octaveA] = [a.slice(0, -1), parseInt(a.slice(-1))];
        const [pitchB, octaveB] = [b.slice(0, -1), parseInt(b.slice(-1))];

        if (octaveA !== octaveB) return octaveA - octaveB;
        return pitchOrder.indexOf(pitchA) - pitchOrder.indexOf(pitchB);
    });

    return sortedNotes;
}

/**
 * Normalizes the array of notes.
 * 
 * @example normalize([C4, E4, G4]) -> [0, 4, 7]
 * 
 * @param {Array} notes 
 * @returns the array containing normalized notes
 */
const normalize = (notes) => {
    const midiNotes = notes.map(noteToMidi);

    // normalize to the bass note
    const minNote = Math.min(...midiNotes);
    const normalized = midiNotes.map(note => note - minNote);

    return normalized.sort((a, b) => a - b);
}

/**
 * Rotates to put the bass note (first element) to the last.
 * @param {Array} notes an array of normalized notes
 * @returns the resulting array after one rotation
 */
const rotate = (notes) => {
    if (!Array.isArray(notes) || notes.length === 0) return notes;

    const rotated = [...notes.slice(1), notes[0] + 12];
    const base = rotated[0];

    return rotated.map(note => note - base);
}

/**
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns if the two arrays have the same elements
 */
const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => val === arr2[index]);
}