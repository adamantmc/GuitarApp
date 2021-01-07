import React from "react";
import uuid from "react-uuid";

const OverlayDivStyle = {
  position: "absolute",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = uuid();
    this.state = {};
  }

  componentDidMount() {
    const wrapper = document.getElementById(this.uuid);
    const br = wrapper.getBoundingClientRect();

    if (this.state.boundingRect !== br) {
      this.setState({ boundingRect: br });
    }
  }

  calculateStyle = br => {
    if (br === undefined) return {};

    const { width, height } = br;
    const style = {
      ...OverlayDivStyle,
      height: `${height}px`,
      width: `${width}px`,
    };
    return style;
  };

  render() {
    return (
      <div>
        {this.props.enabled && (
          <div style={{ ...this.calculateStyle(this.state.boundingRect) }}>
            <span>{this.props.message}</span>
          </div>
        )}
        <div id={this.uuid}>{this.props.children}</div>
      </div>
    );
  }
}

export default Overlay;
