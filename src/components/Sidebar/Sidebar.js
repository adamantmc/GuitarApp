import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGuitar, faMusic } from "@fortawesome/free-solid-svg-icons";

const SidebarButtons = {
  Tuner: "tuner",
  NotePractice: "note_practice",
};

const SidebarButton = styled.button`
  height: 64px;
  width: 64px;
  background-color: #ffffff;
  border: none;
  outline: none;

  &:hover,
  &.activeSidebarButton {
    background-color: #be4bdb;

    .sidebarButtonIcon {
      color: #ffffff;
    }
  }
`;

const SidebarButtonIcon = styled(FontAwesomeIcon).attrs(props => ({
  ...props,
  className: "sidebarButtonIcon",
}))`
  && {
    height: 36px;
    width: 36px;
  }
  color: #be4bdb;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: SidebarButtons.Tuner };
  }

  buttonClicked = key => {
    this.setState({ activeButton: key });
    this.props.selectionChanged(key);
  };

  getButtonClassName = key => {
    if (key === this.state.activeButton) {
      return "activeSidebarButton";
    }
    return "";
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ededed",
          borderRadius: "4px",
        }}
      >
        <SidebarButton
          className={this.getButtonClassName(SidebarButtons.Tuner)}
          onClick={() => this.buttonClicked(SidebarButtons.Tuner)}
        >
          <SidebarButtonIcon icon={faGuitar} />
        </SidebarButton>
        <SidebarButton
          className={this.getButtonClassName(SidebarButtons.NotePractice)}
          onClick={() => this.buttonClicked(SidebarButtons.NotePractice)}
        >
          <SidebarButtonIcon icon={faMusic} />
        </SidebarButton>
      </div>
    );
  }
}

export { Sidebar, SidebarButtons };
