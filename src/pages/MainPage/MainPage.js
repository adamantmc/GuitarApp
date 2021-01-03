import React from "react";
import { Paper, Container } from "@material-ui/core";
import styled from "styled-components";
import Tuner from "../../apps/Tuner/Tuner";
import NotePractice from "../../apps/NotePractice/NotePractice";
import { Sidebar, SidebarButtons } from "../../components/Sidebar/Sidebar";

const PaddedContainer = styled(Container)`
  padding: 16px 16px;
`;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: SidebarButtons.Tuner };
  }

  render() {
    return (
      <PaddedContainer>
        <Paper>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Sidebar selectionChanged={activeButton => this.setState({ activeButton })} />
            <div style={{ flexGrow: 1, marginLeft: "16px", padding: "16px 16px" }}>
              {this.state.activeButton === SidebarButtons.Tuner && <Tuner />}
              {this.state.activeButton === SidebarButtons.NotePractice && <NotePractice />}
            </div>
          </div>
        </Paper>
      </PaddedContainer>
    );
  }
}

export default MainPage;
