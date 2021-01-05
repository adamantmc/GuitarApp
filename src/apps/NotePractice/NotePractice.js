import React from "react";
import { Typography } from "@material-ui/core";
import Timer from "../../components/Timer/Timer";
import { Notes } from "../../logic/Notes";
import Countdown from "../../components/Countdown/Countdown";
import ListView from "../../components/ListView/ListView";
import NotePracticeAudio from "./components/NotePracticeAudio";
import { getRandomNote } from "../../logic/utils";
import Button from "../../components/Button/Button";
import timeToString from "../../components/utils";
import MicrophonePermissions from "../../components/MicrophonePermissions/MicrophonePermissions";

const NOTE_PRACTICE_MICROPHONE_NO_PERMISSIONS_MESSAGE =
  "Please grant Microphone access to the app to use the Note Practice tool";

class NotePractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: getRandomNote(Notes, false),
      starting: false,
      stopped: true,
      notesHit: [],
      lastElapsedTime: undefined,
      startTime: Date.now(),
    };

    this.noteDetectedLock = false;
  }

  getNoteSwitcher() {
    if (this.state.stopped && this.state.starting) {
      return (
        <Countdown
          start={3}
          valueChanged={value => {
            if (value === 0) this.start();
          }}
        />
      );
    }
    if (!this.state.stopped) {
      return (
        <>
          <Timer
            startTime={this.state.startTime}
            elapsedTimeChanged={time => this.setState({ lastElapsedTime: time })}
          />
          <Typography variant="h1" align="center">
            {this.state.currentNote.baseNoteName()}
          </Typography>
        </>
      );
    }

    return <></>;
  }

  noteDetected = note => {
    const { currentNote, lastElapsedTime, notesHit } = this.state;

    if (this.state.stopped || lastElapsedTime <= 50) {
      // 50ms is too fast - probably an event doubling up
      return;
    }

    if (note.baseNoteName() === currentNote.baseNoteName()) {
      notesHit.push({ note, time: lastElapsedTime });
      this.setState({ notesHit, currentNote: getRandomNote(Notes, false), startTime: Date.now() });
    }
  };

  notesHitList = () => {
    return this.state.notesHit
      .map((noteHit, index) => {
        return (
          <span style={{ whiteSpace: "pre", fontFamily: "Roboto Mono" }}>
            {String(index + 1).padEnd(3)} {noteHit.note.baseNoteName().padEnd(3)}{" "}
            {timeToString(noteHit.time, true)}
          </span>
        );
      })
      .reverse();
  };

  controlButtonClicked = () => {
    if (this.state.stopped) {
      this.setState({ stopped: true, starting: true });
    } else {
      this.stop();
    }
  };

  start = () => {
    this.setState({
      stopped: false,
      starting: false,
      lastElapsedTime: undefined,
      startTime: Date.now(),
      currentNote: getRandomNote(Notes, false),
    });
  };

  stop = () => {
    this.setState({ stopped: true, starting: false, currentNote: undefined });
  };

  render() {
    return (
      <MicrophonePermissions message={NOTE_PRACTICE_MICROPHONE_NO_PERMISSIONS_MESSAGE}>
        <div>
          <NotePracticeAudio audioProcessed={this.noteDetected} />
          <br />
          <hr />
          <br />
          <div>
            <Typography variant="h6">Note Practice</Typography>
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                <span style={{ fontFamily: "Roboto" }}>Notes Hit:</span>
                <ListView
                  items={this.notesHitList()}
                  style={{ height: "500px", maxHeight: "500px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 3,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button
                    text={this.state.stopped ? "Start" : "Stop"}
                    onClick={() => this.controlButtonClicked()}
                  />
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {this.getNoteSwitcher()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MicrophonePermissions>
    );
  }
}

export default NotePractice;
