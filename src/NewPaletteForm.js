import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import DraggableColor from "./DraggableColor";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
  paletteContainer: {
    display: "flex",
    width: "70%",
    height: "500px",
  },
};

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      colors: [{ color: "coral" }],
      newPaletteName: "",
    };
    this.changeCurrColor = this.changeCurrColor.bind(this);
    this.addColor = this.addColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({ newPaletteName: evt.target.value });
  }

  changeCurrColor(color) {
    this.setState({ currentColor: color.hex });
  }

  addColor() {
    const newColor = { color: this.state.currentColor };
    this.setState({ colors: [...this.state.colors, newColor] });
  }

  handleSubmit() {
    const paletteName = this.state.newPaletteName;
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,
    };
    this.props.addPalette(newPalette);
    this.props.history.push("/");
  }

  removeColor(colorToRemove) {
    this.setState({
      colors: this.state.colors.filter(
        (color) => color.color !== colorToRemove
      ),
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={this.state.newPaletteName}
            onChange={this.handleChange}
            validators={["required", "paletteNameUnique"]}
            errorMessages={["Enter Palette Name", "Palette name already taken"]}
          />
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </ValidatorForm>
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
        <div className={classes.paletteContainer}>
          {this.state.colors.map((color) => (
            <DraggableColor
              color={color}
              handleRemove={() => this.removeColor(color.color)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
