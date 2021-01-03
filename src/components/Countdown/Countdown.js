import React from "react";
import PropTypes from "prop-types";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentValue: 0 };
  }

  componentWillMount() {
    this.countdownInterval = setInterval(this.updateValue, this.props.interval);
    this.setState({ currentValue: this.props.start });
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  updateValue = () => {
    const { start, end } = this.props;
    const { currentValue } = this.state;

    const step = start > end ? -1 : 1;

    if (this.state.currentValue !== end) {
      this.setState(
        { currentValue: currentValue + step },
        this.props.valueChanged(currentValue + step),
      );
    } else {
      clearInterval(this.countdownInterval);
    }
  };

  render() {
    return <span style={{ textAlign: "center" }}>{this.state.currentValue}</span>;
  }
}

Countdown.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  interval: PropTypes.number,
  valueChanged: PropTypes.func,
};

Countdown.defaultProps = {
  start: undefined,
  end: 0,
  interval: 1000,
  valueChanged: () => {},
};

export default Countdown;
