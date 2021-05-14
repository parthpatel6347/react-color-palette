import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  colorScaleBox: {
    width: "100%",
    flexGrow: "1",
    display: "flex",
    textAlign: "center",
    transition: ".1s",
    "& p": {
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
      transition: ".1s",
    },
    "&:hover p": {
      opacity: "1",
      position: "relative",
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
          <p>{this.props.name}</p>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withStyles(styles)(ColorScaleBox);
