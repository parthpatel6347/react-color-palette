import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "teal" };
    this.changeCurrColor = this.changeCurrColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeCurrColor(color) {
    this.setState({ currentColor: color.hex });
  }

  handleSubmit() {
    const newColor = { color: this.state.currentColor };
    this.props.addColor(newColor);
  }
  render() {
    const { isPaletteFull } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.changeCurrColor}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: isPaletteFull ? "" : this.state.currentColor,
          }}
          onClick={this.handleSubmit}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </div>
    );
  }
}

export default ColorPicker;
