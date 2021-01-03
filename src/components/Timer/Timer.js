import React from "react";
import PropTypes from "prop-types";
import timeToString from "../utils";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elapsedTime: undefined };
  }

  componentDidMount() {
    this.updateInterval = setInterval(this.calculateElapsedTime, 10);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  calculateElapsedTime = () => {
    const currentTime = Date.now();
    const diff = currentTime - this.props.startTime;
    this.setState({ elapsedTime: diff }, this.elapsedTimeChanged());
  };

  elapsedTimeChanged() {
    if (this.props.elapsedTimeChanged !== undefined) {
      this.props.elapsedTimeChanged(this.state.elapsedTime);
    }
  }

  render() {
    return <span style={{ textAlign: "center" }}>{timeToString(this.state.elapsedTime)}</span>;
  }
}

Timer.propTypes = {
  startTime: PropTypes.number,
  elapsedTimeChanged: PropTypes.func,
};

Timer.defaultProps = {
  startTime: undefined,
  elapsedTimeChanged: undefined,
};

export default Timer;
