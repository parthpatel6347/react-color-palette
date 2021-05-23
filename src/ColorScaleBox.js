import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorScaleBoxStyles";

class ColorScaleBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }

  render() {
    return (
      <div
        className={this.props.classes.colorScaleBox}
        style={{ backgroundColor: this.props.color }}
      >
        <CopyToClipboard
          text={this.props.name}
          onCopy={this.props.changeCopied}
        >
          <div className={this.props.classes.copyContainer}>
            <p>{this.props.name}</p>
          </div>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withStyles(styles)(ColorScaleBox);
