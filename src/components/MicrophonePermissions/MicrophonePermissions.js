import React from "react";
import Overlay from "../Overlay/Overlay";

class MicrophonePermissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { permissionsGranted: true };
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        this.setState({ permissionsGranted: true });
      })
      .catch(e => {
        this.setState({ permissionsGranted: false });
      });
  }

  render() {
    return (
      <Overlay message={this.props.message} enabled={!this.state.permissionsGranted}>
        {this.props.children}
      </Overlay>
    );
  }
}

export default MicrophonePermissions;
