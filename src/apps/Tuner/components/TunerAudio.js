import React from "react";
import AudioInput from "../../../components/AudioInput/AudioInput";
import AudioSettings from "../../../components/AudioSettings/AudioSettings";
import { calculateSoundLevel } from "../../../logic/utils";
import detectFrequency from "../../../logic/PitchDetectors/AutoCorrelation";
import { getNote } from "../../../logic/Notes";
import EventHandler from "../../../events/EventHandler";
import SoundLevelChanged from "../../../events/Events";

class TunerAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDevice: "", soundLevelThreshold: 0.2 };
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
                EventHandler.trigger(SoundLevelChanged, soundLevel);

                if (soundLevel > this.state.soundLevelThreshold) {
                  const data = e.inputBuffer.getChannelData(0);
                  const freq = detectFrequency(data, e.inputBuffer.sampleRate);
                  const note = getNote(freq);
                  const diff = note.centDiff(freq);

                  this.props.audioProcessed(note, diff);
                }
              },
            },
          ]}
        />
        <AudioSettings
          onDeviceChange={e => this.setState({ selectedDevice: e.target.value })}
          selectedDevice={this.state.selectedDevice}
          onThresholdChange={threshold => this.setState({ soundLevelThreshold: threshold })}
        />
      </div>
    );
  }
}

export default TunerAudio;
