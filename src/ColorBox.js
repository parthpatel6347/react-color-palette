import React, { Component } from "react";
import chroma from "chroma-js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ColorScale from "./ColorScale";
import { withStyles } from "@material-ui/core/styles";
import sizes from "./styles/sizes";

const styles = {
  root: {
    flexGrow: "1",
    height: "100%",
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    textTransform: "uppercase",
    overflow: "hidden",
    transition: "all .1s ease-in",
    "&:hover": {
      flexGrow: "2",
      transition: "all .1s",
      "& $icons": {
        opacity: "0.6",
        [sizes.down("xs")]: {
          opacity: ".7",
        },
      },
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "unset",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& span": {
      marginTop: "10px",
      fontSize: ".9em",
      width: "70px",
      textAlign: "center",
      fontWeight: "500",
      [sizes.down("md")]: {
        fontSize: ".8em",
      },
      [sizes.down("xs")]: {
        bottom: "0",
        left: "0",
        position: "absolute",
        marginLeft: "0.5em",
        marginBottom: "0.5em",
        width: "unset",
        fontSize: ".8em",
      },
    },
    [sizes.down("xs")]: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  },
  icons: {
    marginTop: "30px",
    fontSize: "1rem",
    opacity: "0",
    "&:hover": {
      opacity: "1 !important",
      cursor: "pointer",
      transform: "scale(1.1)",
      transition: "0s",
    },
    [sizes.down("md")]: {
      fontSize: "0.8rem",
    },
    [sizes.down("xs")]: {
      fontSize: "1.3rem",
      marginTop: "unset",
    },
  },
  copiedMsg: {
    width: "100%",
    height: "0px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "absolute",
    bottom: "0",
    opacity: "1",
    textAlign: "center",
    transition: "all .3s ease-in-out",
    "& h1": {
      fontSize: "1rem",
      fontWeight: "500",
      margin: "9px auto 0",
      [sizes.down("xs")]: {
        fontSize: ".9rem",
      },
    },
  },
  showCopiedMsg: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: "30px",
    transition: "all .3s ease-in-out",
  },
  checkIcon: {
    marginLeft: "5px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(2, 192, 2)",
  },
  colorScale: {
    height: "100%",
    overflow: "hidden",
    [sizes.down("xs")]: {
      width: "100%",
    },
  },
  dynamicColor: {
    color: (props) =>
      chroma(props.background).get("lab.l") <= 60 ? "white" : "#4B4B4B",
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false, scaleOpen: false };
    this.changeCopied = this.changeCopied.bind(this);
    this.openScale = this.openScale.bind(this);
    this.closeScale = this.closeScale.bind(this);
  }
  changeCopied() {
    console.log("in function");
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  }

  openScale() {
    this.setState({ scaleOpen: true });
  }

  closeScale() {
    this.setState({ scaleOpen: false });
  }

  render() {
    const { background, name, classes } = this.props;
    let colorScale = this.state.scaleOpen && (
      <div className={classes.colorScale}>
        <ColorScale
          key={background}
          color={background}
          changeCopied={this.changeCopied}
          closeScale={this.closeScale}
          format={this.props.format}
        />
      </div>
    );
    return (
      <div className={classes.root} style={{ background }}>
        {colorScale}
        <div className={classes.mainContainer}>
          <span className={classes.dynamicColor}>{name} </span>
          <CopyToClipboard text={name} onCopy={this.changeCopied}>
            <i
              className={`${classes.icons} fas fa-clone ${classes.dynamicColor}`}
            ></i>
          </CopyToClipboard>
          <i
            className={`${classes.icons} fas fa-palette ${classes.dynamicColor}`}
            onClick={this.openScale}
          ></i>
        </div>
        <div
          className={`${classes.copiedMsg} ${
            this.state.copied && classes.showCopiedMsg
          }`}
        >
          <h1 className={classes.dynamicColor}>
            Copied<i className={`${classes.checkIcon} fas fa-check`}></i>
          </h1>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ColorBox);
