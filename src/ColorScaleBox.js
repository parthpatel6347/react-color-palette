import React, { Component } from "react";
import "./ColorScaleBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

class ColorScaleBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }

  render() {
    return (
      <div
        className="ColorScaleBox"
        style={{ backgroundColor: this.props.color }}
      >
        <CopyToClipboard
          text={this.props.name}
          onCopy={this.props.changeCopied}
        >
          <p>{this.props.name}</p>
        </CopyToClipboard>
      </div>
    );
  }
}

export default ColorScaleBox;
