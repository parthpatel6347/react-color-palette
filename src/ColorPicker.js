import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";
import sizes from "./styles/sizes";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    border: "1px solid #323232",
  },
  colorPicker: {
    width: "100% !important",
    background: "#424242 !important",
    boxShadow: "none !important",
    fontFamily: "'Josefin Sans', sans-serif !important",
  },
  addColorBtn: {
    width: "100% !important",
    fontFamily: "'Josefin Sans', sans-serif",
    height: "75px",
    fontSize: ".8rem",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "0",
    [sizes.down("lg")]: {
      height: "65px",
    },
    [sizes.down("md")]: {
      fontSize: ".7rem",
    },
  },
  icon: {
    marginRight: "6px",
  },
  disabledBtn: {
    color: "#979797 !important",
  },
  popover: {
    color: "#b9b9b9",
    backgroundColor: "RGBa(37,37,37,0.9)",
    fontFamily: "'Josefin Sans', sans-serif",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
};

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: this.props.colors[0].color, anchorEl: null };
    this.changeCurrColor = this.changeCurrColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePopOver = this.handlePopOver.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  changeCurrColor(color) {
    this.setState({ currentColor: color.hex });
  }

  handleSubmit() {
    const newColor = { color: this.state.currentColor };
    this.props.addColor(newColor);
  }

  handlePopOver(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "popover" : undefined;
    const { isPaletteFull, colors, classes } = this.props;
    let isColorUnique = colors.every(
      (color) => color.color !== this.state.currentColor
    );
    const isDark = chroma(this.state.currentColor).get("lab.l") <= 60;
    return (
      <div className={classes.root}>
        <ChromePicker
          className={classes.colorPicker}
          color={this.state.currentColor}
          onChange={this.changeCurrColor}
        />
        <Button
          classes={{ disabled: classes.disabledBtn }}
          className={classes.addColorBtn}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: !isPaletteFull && this.state.currentColor,
            color: isDark ? "white" : "#4B4B4B",
          }}
          onClick={isColorUnique ? this.handleSubmit : this.handlePopOver}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? (
            "Palette Full"
          ) : (
            <p>
              <i className={`${classes.icon} fas fa-plus`}></i>
              Add to Palette
            </p>
          )}
        </Button>
        <Popover
          classes={{ paper: classes.popover }}
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <p>Color already added.</p>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
