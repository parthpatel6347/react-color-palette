import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "#B5553B", anchorEl: null };
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
    const { isPaletteFull, colors } = this.props;
    let isColorUnique = colors.every(
      (color) => color.color !== this.state.currentColor
    );
    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChange={this.changeCurrColor}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: !isPaletteFull && this.state.currentColor,
          }}
          onClick={isColorUnique ? this.handleSubmit : this.handlePopOver}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
        <Popover
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

export default ColorPicker;
