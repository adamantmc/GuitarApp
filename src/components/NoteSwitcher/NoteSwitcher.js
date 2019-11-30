import React from "react";
import { Slider, LinearProgress } from "@material-ui/core";
import { Notes } from "../../logic/Notes";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNote(useOctaves = true) {
  let notes = Object.values(Notes);
  if (!useOctaves) {
    notes = notes.filter(note => note.name.endsWith("3"));
  }

  return notes[getRandomInteger(0, notes.length - 1)];
}

class NoteSwitcher extends React.Component {
  minBPM = 6;

  maxBPM = 180;

  constructor(props) {
    super(props);
    this.state = {};
    this.state = { currentNote: {}, bpm: 80 };

    this.bpmMarks = [{ value: this.minBPM, label: this.minBPM }];
    const bpmStep = 20;
    for (let i = 0; i < this.maxBPM; i += bpmStep) {
      if (i > this.minBPM) {
        this.bpmMarks.push({ value: i, label: i });
      }
    }
    this.bpmMarks.push({ value: this.maxBPM, label: this.maxBPM });

    this.noteChangeInterval = setInterval(this.changeNote, (1000 * 60) / this.state.bpm);
  }

  changeNote = () => {
    this.setState({ currentNote: getRandomNote() });
  };

  bpmChanged = newVal => {
    this.setState({ bpm: newVal });
    clearInterval(this.noteChangeInterval);
    this.noteChangeInterval = setInterval(this.changeNote, (1000 * 60) / newVal);
  };

  msPerBeat = () => (1000 * 60) / this.state.bpm;

  render() {
    return (
      <div>
        <p>{this.state.currentNote.name}</p>
        <Slider
          marks={this.bpmMarks}
          min={this.minBPM}
          max={this.maxBPM}
          value={this.state.bpm}
          onChange={(e, val) => this.bpmChanged(val)}
        />
        <p>BPM: {this.state.bpm}</p>
        <LinearProgress variant="determinate" value={100} />
      </div>
    );
  }
}

export default NoteSwitcher;
