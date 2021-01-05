import React from "react";
import { Typography } from "@material-ui/core";

import { drawTunerDisplay, TunerDisplayCanvas } from "./components/TunerDisplayCanvas";
import { drawTunerPointer, TunerPointerCanvas } from "./components/TunerPointerCanvas";
import TunerAudio from "./components/TunerAudio";

import {
  TunerCanvasSize,
  TunerDisplaySettings,
  TunerPointerSettings,
  TunerDivStyle,
} from "./styles";
import MicrophonePermissions from "../../components/MicrophonePermissions/MicrophonePermissions";

const TUNER_MICROPHONE_NO_PERMISSIONS_MESSAGE =
  "Please grant Microphone access to the app to use the Tuner";

class Tuner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: undefined, centDiff: undefined };
  }

  componentDidMount() {
    const canvas = document.getElementById("tunerDisplay");
    drawTunerDisplay(canvas, TunerDisplaySettings);
  }

  noteChanged = (note, centDiff) => {
    const tunerPointerCanvas = document.getElementById("tunerPointer");
    const context = tunerPointerCanvas.getContext("2d");
    context.clearRect(0, 0, tunerPointerCanvas.width, tunerPointerCanvas.height);

    this.setState({ note, centDiff });
    drawTunerPointer(tunerPointerCanvas, centDiff, TunerPointerSettings);
  };

  getNoteString = () => {
    if (this.state.note === undefined) return "Note:";
    let centDiffStr = this.state.centDiff.toString();
    const dotIndex = centDiffStr.indexOf(".");
    if (dotIndex !== -1) {
      centDiffStr = centDiffStr.substr(0, dotIndex + 4);
    }
    return `Note: ${this.state.note.name} off by ${centDiffStr}`;
  };

  render() {
    return (
      <MicrophonePermissions message={TUNER_MICROPHONE_NO_PERMISSIONS_MESSAGE}>
        <div>
          <Typography>{this.getNoteString()}</Typography>

          <div style={TunerDivStyle}>
            <div style={{ width: TunerCanvasSize.width }}>
              <TunerDisplayCanvas width={TunerCanvasSize.width} height={TunerCanvasSize.height} />
              <TunerPointerCanvas
                width={TunerCanvasSize.width}
                height={TunerPointerSettings.topPadding + TunerPointerSettings.pointerHeight}
              />
            </div>
          </div>

          <TunerAudio audioProcessed={this.noteChanged} />
        </div>
      </MicrophonePermissions>
    );
  }
}

export default Tuner;
