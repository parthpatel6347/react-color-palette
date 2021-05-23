import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";
import styles from "./styles/ColorPickerStyles";

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
          disableAlpha
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
