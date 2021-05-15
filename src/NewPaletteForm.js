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
import sizes from "./styles/sizes";

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
    [sizes.down("lg")]: {
      width: "80%",
      height: "70%",
    },
    [sizes.down("md")]: {
      width: "85%",
      height: "65%",
      borderRadius: "20px",
    },
    [sizes.down("sm")]: {
      flexDirection: "column",
      height: "80%",
    },
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
    justifyContent: "space-between",
    [sizes.down("sm")]: {
      flexDirection: "row",
      width: "100%",
      height: "40%",
      padding: "2.5% 0",
      justifyContent: "space-around",
    },
  },
  colorControls: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    [sizes.down("sm")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      // width: "70%",
      height: "100%",
    },
  },
  HeaderContainer: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    [sizes.down("sm")]: {
      width: "25%",
      height: "100%",
      flexDirection: "column",
      padding: "0 1.5em 0",
    },
    "& h1": {
      color: "#979797",
      fontWeight: "500",
      [sizes.down("lg")]: {
        fontSize: "1.8rem",
      },
      [sizes.down("md")]: {
        fontSize: "1.6em",
      },
      [sizes.down("sm")]: {
        textAlign: "center",
        fontSize: "1.9rem",
      },
    },
    "& h2": {
      color: "#979797",
      // [sizes.down("lg")]: {
      //   fontSize: "1.8rem",
      // },
      // [sizes.down("md")]: {
      //   fontSize: "1.6em",
      // },
      [sizes.down("sm")]: {
        marginTop: "0em",
        textAlign: "center",
        fontSize: "1.2em",
        fontWeight: "300",
      },
    },
  },
  buttonGroup: {
    [sizes.down("sm")]: {
      width: "35%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  colorButtons: {
    [sizes.down("sm")]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  randBtn: {
    marginTop: "1.5rem",
    // width: "60%",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    paddingTop: "9px",
    background:
      "linear-gradient(90deg, hsla(189, 92%, 69%, 1) 0%, hsla(335, 89%, 66%, 1) 50%, hsla(240, 63%, 57%, 1) 100%)",
    [sizes.down("md")]: {
      fontSize: ".7rem",
      height: "1.8rem",
      borderRadius: "14px",
    },
  },
  clearBtn: {
    marginTop: "1.5rem",
    // width: "60%",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    paddingTop: "9px",
    // background: "#CE7073",
    [sizes.down("md")]: {
      fontSize: ".7rem",
      height: "1.8rem",
      borderRadius: "14px",
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
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
