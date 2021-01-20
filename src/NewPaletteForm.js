import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "teal", colors: ["coral"] };
    this.changeCurrColor = this.changeCurrColor.bind(this);
    this.addColor = this.addColor.bind(this);
  }

  changeCurrColor(color) {
    this.setState({ currentColor: color.hex });
  }

  addColor() {
    this.setState({ colors: [...this.state.colors, this.state.currentColor] });
  }

  render() {
    return (
      <div>
        <div>
          <Button variant="outlined" color="primary">
            Random Color
          </Button>
          <Button variant="outlined" color="secondary">
            Clear Palette
          </Button>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.changeCurrColor}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: this.state.currentColor }}
            onClick={this.addColor}
          >
            Add Color
          </Button>
        </div>
        <div>
          <ul>
            {this.state.colors.map((color) => (
              <li style={{ backgroundColor: color }}>{color}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default NewPaletteForm;
