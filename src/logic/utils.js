const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function stepDistance(n1, n2) {
  const n1Octave = Number(n1.substr(n1.length - 1));
  const n2Octave = Number(n2.substr(n2.length - 1));

  const n1Index =
    noteNames.indexOf(n1.substr(0, n1.length - 1)) + noteNames.length * (n1Octave - 1);
  const n2Index =
    noteNames.indexOf(n2.substr(0, n2.length - 1)) + noteNames.length * (n2Octave - 1);

  return n2Index - n1Index;
}

function calculateFreq(noteName) {
  const baseNote = "A4";
  const baseFreq = "440";

  const dist = stepDistance(baseNote, noteName);
  const freq = baseFreq * 2 ** (dist / 12);

  return freq;
}

export { noteNames, stepDistance, calculateFreq };
