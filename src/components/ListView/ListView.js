import React from "react";
import uuid from "react-uuid";
import ListViewStyle from "./styles";

class ListView extends React.Component {
  render() {
    return (
      <div style={{ ...this.props.style, ...ListViewStyle }} className="scrollbar">
        {this.props.items.map(i => (
          <div key={uuid()}>{i}</div>
        ))}
      </div>
    );
  }
}

export default ListView;
