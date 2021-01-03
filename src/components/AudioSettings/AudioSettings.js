import React from "react";
import styled from "styled-components";
import { Select, MenuItem, Typography } from "@material-ui/core";

function scale(value, min, max, newMin, newMax) {
  const scaledValue = newMin + ((value - min) * (newMax - newMin)) / (max - min);
  return scaledValue;
}

function setSoundLevel(soundLevel) {
  const canvas = document.getElementById("volumeLevel");
  const { width } = canvas;
  const canvasContext = canvas.getContext("2d");
  const boxWidth = scale(soundLevel, 0, 1, 0, width);
  canvasContext.fillStyle = "#be4bdb";
  canvasContext.beginPath();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillRect(0, 0, boxWidth, canvas.height);
  canvasContext.stroke();
}

function calculateSoundLevel(e) {
  const data = e.inputBuffer.getChannelData(0);

  let meanValue = 0;
  data.forEach(v => (meanValue += Math.abs(v)));
  meanValue /= data.length;
  const soundLevel = Math.sqrt(meanValue); // [0, 1]

  return soundLevel;
}

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

class AudioSettings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { devices: [] };
    const { mediaDevices } = window.navigator;
    if (mediaDevices !== undefined) {
      mediaDevices.enumerateDevices().then(devices => {
        this.setState({ devices: devices.filter(d => d.kind === "audioinput") });
      });
    }
  }

  render() {
    return (
      <div>
        <Typography variant="h6">Audio Setup</Typography>
        <HorizontalLayout>
          <div>
            <Typography id="inputSourceLabel">Input Source</Typography>
            <Select
              id="audioInputSource"
              aria-labelledby="inputSourceLabel"
              value={this.props.selectedDevice}
              onChange={this.props.onDeviceChange}
            >
              {this.state.devices.map((device, index) => {
                return (
                  <MenuItem key={device.deviceId} value={device.deviceId}>
                    {`${index} ${device.label}`}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div>
            <Typography id="inputVolumeLabel">Input Volume</Typography>
            <canvas height="24" id="volumeLevel" aria-labelledby="inputVolumeLabel" />
          </div>
        </HorizontalLayout>
      </div>
    );
  }
}

export { AudioSettings, setSoundLevel, calculateSoundLevel };
