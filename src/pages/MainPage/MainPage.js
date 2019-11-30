import React from "react";
import { Paper, Container } from "@material-ui/core";
import styled from "styled-components";
import NoteSwitcher from "../../components/NoteSwitcher/NoteSwitcher";
import Tuner from "../../apps/Tuner/Tuner";

const PaddedContainer = styled(Container)`
  padding: 16px 16px;
`;

const PaddedPaper = styled(Paper)`
  padding: 16px 16px;
`;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PaddedContainer>
        <PaddedPaper>
          {/* <NoteSwitcher /> */}
          {/* <br /> */}
          <Tuner />
        </PaddedPaper>
      </PaddedContainer>
    );
  }
}

export default MainPage;
