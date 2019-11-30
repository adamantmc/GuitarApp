import { calculateFreq, noteNames } from "./utils";

class Note {
  constructor(name) {
    this.name = name;
    this.freq = calculateFreq(name);
  }

  centDiff(freq) {
    const diff = 1200 * Math.log2(freq / this.freq);
    return diff;
  }
}

function calculateAllNotes(minOctave = 1, maxOctave = 5) {
  const notes = {};

  for (let i = minOctave; i <= maxOctave; i += 1) {
    noteNames.forEach(noteName => {
      const noteNameWithOctave = `${noteName}${i}`;
      notes[noteNameWithOctave] = new Note(noteNameWithOctave);
    });
  }

  return notes;
}

const Notes = calculateAllNotes(2, 6);

function getNote(frequency) {
  const notes = Object.values(Notes);

  const diffs = notes.map(note => Math.abs(note.freq - frequency));
  return notes[diffs.indexOf(Math.min(...diffs))];
}

export { Note, Notes, getNote };
