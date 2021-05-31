import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ColorScale from "./ColorScale";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import ClickAwayListener from "react-click-away-listener";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false, scaleOpen: false };
    this.changeCopied = this.changeCopied.bind(this);
    this.openScale = this.openScale.bind(this);
    this.closeScale = this.closeScale.bind(this);
  }

  changeCopied() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  }

  openScale(e) {
    e.stopPropagation();
    this.setState({ scaleOpen: true });
  }

  closeScale() {
    if (this.state.scaleOpen === true) {
      this.setState({ scaleOpen: false });
    }
  }

  render() {
    const { background, name, classes } = this.props;
    let newName = name.split("(").join(" (");
    return (
      <div className={classes.root} style={{ background }}>
        <ClickAwayListener onClickAway={this.closeScale}>
          <Fade in={this.state.scaleOpen} timeout={500}>
            <div>
              <ColorScale
                key={background}
                color={background}
                changeCopied={this.changeCopied}
                closeScale={this.closeScale}
                format={this.props.format}
                isOpen={this.state.scaleOpen}
              />
            </div>
          </Fade>
        </ClickAwayListener>

        <div className={classes.mainContainer}>
          <p className={classes.dynamicColor}>{newName} </p>

          <div className={classes.iconsContainer}>
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
