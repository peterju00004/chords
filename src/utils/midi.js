import { WebMidi } from "webmidi";

const pitchOrder = {
    'C': 0,
    'C#': 1,
    'D': 2,
    'D#': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'G': 7,
    'G#': 8,
    'A': 9,
    'A#': 10,
    'B': 11
  };

const patterns = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    dominant7: [0, 4, 7, 10],
    diminished7: [0, 3, 6, 9],
    halfDiminished7: [0, 3, 6, 10],
    augmented7: [0, 4, 8, 10],
    minormajor7: [0, 3, 7, 11],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7],
    major6: [0, 4, 7, 9],
    minor6: [0, 3, 7, 9],
    add2: [0, 2, 4, 7],
    major9: [0, 2, 4, 7, 11],
    minor9: [0, 2, 3, 7, 10],
    dominant9: [0, 2, 4, 7, 10],
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
    if (!Array.isArray(notes) || notes.length === 0) return null;
    
    let base = "", below = "", type = "";

    // sort, remove duplicate
    notes = removeOctaves(sort(notes));
    below = notes[0]; // lowest note

    const normalizedNotes = normalize(notes);
    let rotatedNotes = [...normalizedNotes];

    const patternArray = Object.entries(patterns).map(([name, formula]) => ({ name, formula }));

    rotation: for (let i = 0; i < normalizedNotes.length; i++) { // ith rotation
        if (i != 0) rotatedNotes = rotate(rotatedNotes);

        console.log(rotatedNotes);
        
        for (const pattern of patternArray) {
            const { name, formula } = pattern;
            base = notes[i];

            if (arraysEqual(rotatedNotes, formula)) {
                type = name;
                break rotation;
            }
        }
    }

    // format result
    let result = "";
    switch (type) {
        case "":
            return null;
        case "major":
            type = "";
            break;
        case "minor":
            type = "m";
            break;
        case "diminished":
            type = "dim";
            break;
        case "augmented": 
            type = "aug";
            break;
        case "major7":
            type = "maj7";
            break;
        case "minor7":
            type = "m7";
            break;
        case "dominant7":
            type = "7";
            break;
        case "diminished7":
            type = "dim7";
            break;
        case "halfDiminished7":
            type = "m7b5";
            break;
        case "minormajor7":
            type = "m/maj7";
            break;
        case "augmented7":
            type = "aug7";
            break;
        case "sus2":
            type = "sus2";
            break;
        case "sus4":
            type = "sus4";
            break;
        case "major6":
            type = "maj6";
            break;
        case "minor6":
            type = "m6";
            break;
        case "add2":
            type = "add2";
            break;
        case "major9":
            type = "maj9";
            break;
        case "minor9":
            type = "m9";
            break;
        case "dominant9":
            type = "9";
            break;
        default:
            break;
    }
    
    result = result.concat(base.slice(0, -1)).concat(type);

    console.log("below: " + below + ", base: " + base);

    if (below !== base) result = result.concat("/").concat(below.slice(0, -1));

    return result;
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

        const semitoneA = pitchOrder[pitchA];
        const semitoneB = pitchOrder[pitchB];

        if (octaveA !== octaveB) return octaveA - octaveB;
        return semitoneA - semitoneB;
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
    const basePitch = pitchOrder[notes[0].slice(0, -1)];

    return notes.map(note => {
        const pitch = note.slice(0, -1);
        const semitoneOffset = (pitchOrder[pitch] - basePitch + 12) % 12; // Normalize within an octave
        return semitoneOffset;
    }).sort((a, b) => a - b); // Ensure sorted order for pattern matching
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
    return arr1.every((value, index) => value === arr2[index]);
}

/**
 * 
 * @param {Array} notes 
 * @returns the array of notes without octaves
 */
const removeOctaves = (notes) => {
    const seen = new Set();
    return notes.filter(note => {
        const pitch = note.slice(0, -1);
        if (seen.has(pitch)) return false;
        seen.add(pitch);
        return true;
    });
};