import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import chroma from "chroma-js";
import PaletteSaveForm from "./PaletteSaveForm";
import ColorPicker from "./ColorPicker";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

const styles = {
  root: {
    fontFamily: "'Josefin Sans', sans-serif",
    backgroundColor: "#323232",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "70%",
    height: "75%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#424242",
    borderRadius: "30px",
    overflow: "hidden",
    // boxShadow: " 20px 20px 60px #2b2b2b",
  },
  header: {
    position: "fixed",
    display: "inline",
    left: "0",
    top: "0",
  },
  ControlsContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "25%",
    padding: "0 2.5% 0",
    alignItems: "center",
  },
  HeaderContainer: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    "& h1": {
      color: "#979797",
      fontWeight: "500",
    },
  },
};

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 6,
    minColors: 1,
  };
  constructor(props) {
    super(props);
    this.state = {
      colors: [{ color: "#B5553B" }],
    };
    this.addColor = this.addColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    // this.clearPalette = this.clearPalette.bind(this);
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

  // clearPalette() {
  //   this.setState({ colors: [] });
  // }

  addRandColor() {
    const randColor = { color: chroma.random().hex() };
    this.setState({ colors: [...this.state.colors, randColor] });
  }

  render() {
    const { classes, maxColors, palettes, minColors } = this.props;
    const isPaletteFull = this.state.colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <Link to="/">
          <Button
            className={classes.header}
            variant="contained"
            color="secondary"
          >
            Go Back
          </Button>
        </Link>
        <Paper className={classes.container} elevation={10}>
          <DraggableColorList
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis="x"
            onSortEnd={this.onSortEnd}
          />
          <div className={classes.ControlsContainer}>
            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={this.clearPalette}
            >
              Clear Palette
            </Button> */}
            <div className={classes.HeaderContainer}>
              <h1>Create a Palette</h1>
            </div>
            <ColorPicker
              colors={this.state.colors}
              isPaletteFull={isPaletteFull}
              addColor={this.addColor}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.addRandColor}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>
            <PaletteSaveForm
              palettes={palettes}
              colors={this.state.colors}
              minColors={minColors}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
