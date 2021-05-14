import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";
import sizes from "./styles/sizes";

const styles = {
  colorScaleBox: {
    width: "100%",
    flexGrow: "1",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    transition: "all .1s",
    alignItems: "center",
    "& p": {
      color: (props) =>
        chroma(props.color).get("lab.l") <= 60 ? "white" : "#4B4B4B",
      margin: "auto",
      opacity: "0",
      fontSize: ".85rem",
      fontWeight: "400",
      letterSpacing: "1px",
      position: "absolute",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    "&:hover": {
      flexGrow: "1.5",
      transition: "all .1s",
    },
    "&:hover p": {
      opacity: "1",
      position: "relative",
      [sizes.down("xs")]: {
        opacity: "0",
      },
    },
  },
  copyContainer: {
    [sizes.down("xs")]: {
      height: "100%",
      width: "100%",
    },
  },
};

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
