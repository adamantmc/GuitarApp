import React from "react";
import { Typography } from "@material-ui/core";
import AudioInput from "../../components/AudioInput/AudioInput";
import {
  AudioSettings,
  setSoundLevel,
  calculateSoundLevel,
} from "../../components/AudioSettings/AudioSettings";
import detectFrequency from "../../logic/PitchDetectors/AutoCorrelation";
import { getNote } from "../../logic/Notes";

const TunerSettings = {
  minVal: -50,
  maxVal: 50,
  stepSize: 2.5,
  widthPadding: 8,
  font: "Arial",
  fontSize: 12,
  topPadding: 12 + 4, // FontSize + padding
  strokeColor: "#666666",
  lineWIdth: 2,
};

const TunerPointerSettings = {
  minVal: -50,
  maxVal: 50,
  stepSize: 2.5,
  widthPadding: 8,
  font: "Arial",
  fontSize: 12,
  topPadding: 12 + 4, // FontSize + padding
  strokeColor: "#00aa00",
  lineWIdth: 2,
};

function scale(value, min, max, newMin, newMax) {
  const scaledValue = newMin + ((value - min) * (newMax - newMin)) / (max - min);
  return scaledValue;
}

function drawTuner(canvas, settings) {
  const {
    minVal,
    maxVal,
    stepSize,
    widthPadding,
    topPadding,
    fontSize,
    font,
    strokeColor,
    lineWIdth,
  } = settings;

  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  const { width, height } = canvas;

  context.strokeStyle = strokeColor;
  context.lineWidth = lineWIdth;
  context.textAlign = "center";
  context.font = `${fontSize}px ${font}`;

  context.beginPath();
  for (let i = minVal; i <= maxVal; i += stepSize) {
    const startingPoint = scale(i, -50, 50, 0 + widthPadding, width - widthPadding);
    if (i % 10 === 0) {
      context.moveTo(startingPoint + 0.5, topPadding);
      context.lineTo(startingPoint + 0.5, height);
      context.fillText(i, startingPoint + 0.5, fontSize);
    } else {
      context.moveTo(startingPoint + 0.5, topPadding + (height - topPadding) / 4);
      context.lineTo(startingPoint + 0.5, topPadding + (3 * (height - topPadding)) / 4);
    }
  }
  context.closePath();
  context.stroke();
}

function drawTunerPointer(canvas, point, settings) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  const { width, height } = canvas;
  const { widthPadding, strokeColor, topPadding } = settings;

  const tunerLineX = scale(point, -50, 50, 0 + widthPadding, width - widthPadding);
  context.strokeStyle = strokeColor;
  context.beginPath();
  context.moveTo(tunerLineX + 0.5, topPadding);
  context.lineTo(tunerLineX + 0.5, height);
  context.closePath();
  context.stroke();
}

function renderTuner(note, centsOff) {
  const canvas = document.getElementById("tunerDisplay");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawTuner(canvas, TunerSettings);

  drawTunerPointer(canvas, centsOff, TunerPointerSettings);
}

const TunerCanvasStyle = {
  position: "absolute",
  top: 0,
  left:0,
};

const TunerCanvas = () => <div style={{position: "relative", textAlign: "center"}}>
  <canvas id="tunerDisplay" width={500} height={75} />
  <canvas id="tunerPointer" style={TunerCanvasStyle} width={500} height={75} />
  </div>;

class Tuner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDevice: "", note: undefined, detectedFrequency: undefined };
  }

  componentDidMount() {
    const canvas = document.getElementById("tunerDisplay");
    const context = canvas.getContext("2d");  
    drawTuner(canvas, TunerSettings);
  }

  render() {
    return (
      <div>
        <AudioInput
          selectedDevice={this.state.selectedDevice}
          processors={[
            {
              bufferSize: 2048,
              hash: "1234",
              process: e => {
                const soundLevel = calculateSoundLevel(e);
                setSoundLevel(soundLevel);

                if (soundLevel > 0.2) {
                  const canvas = document.getElementById("tunerPointer");
                  const context = canvas.getContext("2d");
                  context.clearRect(0, 0, canvas.width, canvas.height);

                  const data = e.inputBuffer.getChannelData(0);
                  const freq = detectFrequency(data, e.inputBuffer.sampleRate);
                  const note = getNote(freq);
                  const diff = note.centDiff(freq);

                  if (this.state.detectedFrequency !== undefined) {
                    const prevVal = getNote(this.state.detectedFrequency).centDiff(
                      this.state.detectedFrequency,
                    );

                    const stepSize = 1;
                    const min = diff > prevVal ? prevVal : diff;
                    const max = diff > prevVal ? diff : prevVal;

                    for (let i = min; i <= max; i += stepSize) {
                      drawTunerPointer(canvas, i, TunerPointerSettings);
                    }
                  } else {
                    drawTunerPointer(canvas, 0, TunerPointerSettings);
                  }
                  // renderTuner(note.name, diff);

                  this.setState({ note, detectedFrequency: freq });
                }
              },
            },
          ]}
        />
        <Typography>
          Note:{" "}
          {this.state.note !== undefined
            ? `${this.state.note.name} off by ${this.state.note.centDiff(
                this.state.detectedFrequency,
              )}`
            : ""}
        </Typography>
        <TunerCanvas />
        <AudioSettings
          onDeviceChange={e => this.setState({ selectedDevice: e.target.value })}
          selectedDevice={this.state.selectedDevice}
        />
      </div>
    );
  }
}

export default Tuner;
