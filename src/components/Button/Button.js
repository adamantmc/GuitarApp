import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BaseButton = styled.button`
  outline: none;
  border: none;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0);
  font-family: "Roboto";
  font-size: 1.2rem;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(60, 60, 60, 0.25);

  &:hover {
    background-color: rgba(182, 182, 182, 0.25);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(182, 182, 182, 0.75);
  }
`;

class Button extends React.Component {
  render() {
    return (
      <BaseButton
        disabled={this.props.disabled}
        type="button"
        onClick={e => this.props.onClick(e)}
        style={{ ...this.props.style }}
      >
        {this.props.text}
      </BaseButton>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Button.defaultProps = {
  text: "",
  onClick: () => {},
  disabled: false,
  style: {},
};

export default Button;
