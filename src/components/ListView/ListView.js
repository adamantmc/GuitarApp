import React from "react";
import ListViewStyle from "./styles";

class ListView extends React.Component {
  render() {
    return (
      <div style={{ ...this.props.style, ...ListViewStyle }}>
        {this.props.items.map(i => (
          <div key={i}>{i}</div>
        ))}
      </div>
    );
  }
}

export default ListView;
