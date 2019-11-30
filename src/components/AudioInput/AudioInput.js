import React from "react";
import PropTypes from "prop-types";

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

class AudioInput extends React.Component {
  constructor(props) {
    super(props);
    this.context = undefined;
    this.source = undefined;
    this.scriptNodes = [];
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedDevice !== prevProps.selectedDevice ||
      !arraysEqual(this.props.processors.map(p => p.hash), prevProps.processors.map(p => p.hash))
    )
      this.handleAudio();
  }

  handleAudio = () => {
    if (this.props.selectedDevice === undefined) return;

    window.navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: this.props.selectedDevice }, video: false })
      .then(stream => {
        if (this.context !== undefined && this.source !== undefined) {
          this.scriptNodes.forEach(node => {
            this.source.disconnect(node);
            node.disconnect(this.context.destination);
          });
        }
        this.scriptNodes = [];

        this.context = new AudioContext();
        this.source = this.context.createMediaStreamSource(stream);
        this.props.processors.forEach(processor => {
          const scriptProcessor = this.context.createScriptProcessor(processor.bufferSize, 1, 1);
          this.scriptNodes.push(scriptProcessor);

          this.source.connect(scriptProcessor);
          scriptProcessor.connect(this.context.destination);

          scriptProcessor.onaudioprocess = e => {
            processor.process(e);
          };
        });
      });
  };

  render() {
    return <></>;
  }
}

AudioInput.propTypes = {
  selectedDevice: PropTypes.string,
  processors: PropTypes.arrayOf(PropTypes.object),
};

AudioInput.defaultProps = {
  selectedDevice: undefined,
  processors: [],
};

export default AudioInput;
