import React from "react";
import AudioInput from "../../../components/AudioInput/AudioInput";
import {
  AudioSettings,
  setSoundLevel,
  calculateSoundLevel,
} from "../../../components/AudioSettings/AudioSettings";

import detectFrequency from "../../../logic/PitchDetectors/AutoCorrelation";
import { getNote } from "../../../logic/Notes";

class NotePracticeAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDevice: "" };
    this.soundLevelThreshold = 0.2; // TODO: make this configurable
  }

  render() {
    return (
      <div>
        <AudioInput
          selectedDevice={this.state.selectedDevice}
          processors={[
            {
              bufferSize: 2048,
              hash: "1235",
              process: e => {
                const soundLevel = calculateSoundLevel(e);
                setSoundLevel(soundLevel);

                if (soundLevel > this.soundLevelThreshold) {
                  const data = e.inputBuffer.getChannelData(0);
                  const freq = detectFrequency(data, e.inputBuffer.sampleRate);
                  const note = getNote(freq);

                  this.props.audioProcessed(note);
                }
              },
            },
          ]}
        />
        <AudioSettings
          onDeviceChange={e => this.setState({ selectedDevice: e.target.value })}
          selectedDevice={this.state.selectedDevice}
        />
      </div>
    );
  }
}

export default NotePracticeAudio;
