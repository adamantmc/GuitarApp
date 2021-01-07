import React from "react";
import styled from "styled-components";
import { Select, MenuItem, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import EventHandler from "../../events/EventHandler";
import SoundLevelChanged from "../../events/Events";
import { scale } from "../../logic/utils";

import { setSoundLevel, drawThresholdBar } from "./AudioSettingsUtils";

const HorizontalLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

class AudioSettings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { devices: [], soundLevel: 0, threshold: 0.2, thresholdBarDrag: false };
    const { mediaDevices } = window.navigator;
    if (mediaDevices !== undefined) {
      mediaDevices.enumerateDevices().then(devices => {
        this.setState({ devices: devices.filter(d => d.kind === "audioinput") });
      });
    }

    this.uuid = uuid();
    EventHandler.register(SoundLevelChanged, this.uuid, soundLevel =>
      this.setState({ soundLevel }),
    );
  }

  componentWillUnmount() {
    EventHandler.unregister(SoundLevelChanged, this.uuid);
  }

  getCanvasThresholdCoordinates = (threshold, canvasWidth) => {
    const boxWidth = 4;
    const thresholdPoint = threshold * canvasWidth;

    return { x1: thresholdPoint - boxWidth / 2, x2: thresholdPoint + boxWidth / 2 };
  };

  getCanvasMouseCoordinates = mouseX => {
    const canvas = document.getElementById("volumeLevel");
    const boundingRect = canvas.getBoundingClientRect();

    const canvasX = mouseX - boundingRect.x;

    return canvasX;
  };

  getMouseOnThresholdBar = mouseX => {
    const canvas = document.getElementById("volumeLevel");

    const canvasX = this.getCanvasMouseCoordinates(mouseX);

    const thresholdXBounds = this.getCanvasThresholdCoordinates(this.state.threshold, canvas.width);
    if (canvasX >= thresholdXBounds.x1 && canvasX <= thresholdXBounds.x2) {
      return true;
    }

    return false;
  };

  onCanvasMouseMove = e => {
    if (this.state.thresholdBarDrag) {
      const canvas = document.getElementById("volumeLevel");
      const mouseX = this.getCanvasMouseCoordinates(e.pageX);
      const newThreshold = scale(mouseX, 0, canvas.width, 0, 1);
      this.setState({ threshold: newThreshold }, () => {
        this.props.onThresholdChange(newThreshold);
      });
    }
  };

  onCanvasMouseDown = e => {
    if (this.getMouseOnThresholdBar(e.pageX)) {
      this.setState({ thresholdBarDrag: true });
    }
  };

  onCanvasMouseOut = e => {
    this.setState({ thresholdBarDrag: false });
  };

  render() {
    setSoundLevel(this.state.soundLevel);
    drawThresholdBar(this.state.threshold);

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
            <Typography id="inputVolumeLabel">
              Input Volume - Threshold: {(100 * this.state.threshold).toFixed(2)}%
            </Typography>
            <canvas
              height="24"
              id="volumeLevel"
              aria-labelledby="inputVolumeLabel"
              onMouseMove={this.onCanvasMouseMove}
              onMouseDown={this.onCanvasMouseDown}
              onMouseOut={this.onCanvasMouseOut}
              onMouseUp={this.onCanvasMouseOut}
            />
          </div>
        </HorizontalLayout>
      </div>
    );
  }
}

AudioSettings.propTypes = {
  selectedDevice: PropTypes.string,
  onDeviceChange: PropTypes.func,
  onThresholdChange: PropTypes.func,
};

AudioSettings.defaultProps = {
  selectedDevice: undefined,
  onDeviceChange: () => {},
  onThresholdChange: () => {},
};

export default AudioSettings;
