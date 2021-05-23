import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import chroma from "chroma-js";
import PaletteSaveForm from "./PaletteSaveForm";
import ColorPicker from "./ColorPicker";
import Paper from "@material-ui/core/Paper";
import Navbar from "./Navbar";
import styles from "./styles/NewPaletteFormStyles";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 6,
    minColors: 1,
  };
  constructor(props) {
    super(props);
    this.state = {
      colors: [{ color: chroma.random().hex() }],
    };
    this.addColor = this.addColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandColor = this.addRandColor.bind(this);
  }

  addColor(newColor) {
    this.setState({ colors: [...this.state.colors, newColor] });
  }

  handleSubmit(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
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
    const { classes, maxColors, palettes, minColors } = this.props;
    const isPaletteFull = this.state.colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <Navbar location="newPalette" />
        <div className={classes.main}>
          <Paper className={classes.container} elevation={10}>
            <DraggableColorList
              colors={this.state.colors}
              removeColor={this.removeColor}
              axis="x"
              lockAxis="x"
              onSortEnd={this.onSortEnd}
              distance={10}
            />
            <div className={classes.ControlsContainer}>
              <div className={classes.colorControls}>
                <div className={classes.HeaderContainer}>
                  <h1>Create a Palette</h1>
                  <h2>Drag to arrange colors.</h2>
                </div>
                <ColorPicker
                  colors={this.state.colors}
                  isPaletteFull={isPaletteFull}
                  addColor={this.addColor}
                />
                <div className={classes.buttonGroup}>
                  <div className={classes.colorButtons}>
                    <Button
                      className={classes.randBtn}
                      variant="contained"
                      color="primary"
                      onClick={this.addRandColor}
                      disabled={isPaletteFull}
                    >
                      Random Color
                    </Button>
                    <Button
                      className={classes.clearBtn}
                      variant="outlined"
                      color="secondary"
                      onClick={this.clearPalette}
                    >
                      Clear Palette
                    </Button>
                  </div>
                  <PaletteSaveForm
                    palettes={palettes}
                    colors={this.state.colors}
                    minColors={minColors}
                    handleSubmit={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
