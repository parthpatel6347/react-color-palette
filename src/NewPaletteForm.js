import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const styles = {
  paletteContainer: {},
};

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 6,
    minColors: 1,
  };
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
    this.removeColor = this.removeColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandColor = this.addRandColor.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule(
      "reqMinColor",
      (value) => this.state.colors.length >= this.props.minColors
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearPalette() {
    this.setState({ colors: [] });
  }

  addRandColor() {
    const randColor = { color: chroma.random().hex() };
    this.setState({ colors: [...this.state.colors, randColor] });
  }

  render() {
    const { classes, maxColors } = this.props;
    const isPaletteFull = this.state.colors.length >= maxColors;
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={this.state.newPaletteName}
            onChange={this.handleChange}
            validators={["required", "paletteNameUnique", "reqMinColor"]}
            errorMessages={[
              "Enter Palette Name",
              "Palette name already taken",
              "Require atleast 1 color in palette",
            ]}
          />
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </ValidatorForm>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.addRandColor}
            disabled={isPaletteFull}
          >
            Random Color
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.clearPalette}
          >
            Clear Palette
          </Button>
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
            onClick={this.addColor}
            disabled={isPaletteFull}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </div>
        <div className={classes.paletteContainer}>
          <DraggableColorList
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis="x"
            onSortEnd={this.onSortEnd}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
