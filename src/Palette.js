import React, { Component } from "react";
import ColorBox from "./ColorBox";
import chroma from "chroma-js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Slider from "@material-ui/core/Slider";

import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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
  header: {
    position: "fixed",
    display: "inline",
    left: "0",
    top: "0",
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
    [sizes.down("lg")]: {
      width: "80%",
      height: "70%",
    },
    [sizes.down("md")]: {
      width: "85%",
      height: "65%",
    },
  },
  colorsContainer: {
    height: "100%",
    width: "70%",
    display: "flex",
  },
  sidePanel: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "25%",
    padding: "0 2.5% 0",
  },
  paletteName: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    "& h1": {
      // display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "box",
      lineHeight: "33px", // to get ellipses on line 3
      lineClamp: "3",
      boxOrient: "vertical",
      height: "98px",
      color: "#979797",
      fontWeight: "500",
    },
  },
  adjustments: {
    height: "80%",
    color: "#979797",
    letterSpacing: ".08em",
    fontSize: ".8em",
    textTransform: "uppercase",
    "& p": {
      marginTop: "1em",
      marginBottom: "0",
    },
  },
  label: {
    marginTop: "2px",
    fontSize: "1em",
    fontFamily: "'Josefin Sans', sans-serif",
    letterSpacing: "0.08em",
  },
};

const CustomSlider = withStyles({
  root: {
    color: "#979797",
    height: 8,
    marginBottom: "0",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#3f51b5",
    border: "2px solid #2196f3",
    marginTop: -6,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    color: "#2196f3",
    // left: "calc(-50% + 4px)",
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider);

const CustomRadio = withStyles({
  root: {
    color: "#979797",
    "&$checked": {
      color: "#2196f3",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { lightness: 0, saturation: 0, format: "hex" };
    this.changeLightness = this.changeLightness.bind(this);
    this.changeSaturation = this.changeSaturation.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLightness(event, lightness) {
    this.setState({ lightness });
  }

  changeSaturation(event, saturation) {
    this.setState({ saturation });
  }

  colorProcess(color) {
    return chroma(color)
      .saturate(this.state.saturation / 25)
      .brighten(this.state.lightness / 30)
      .hex();
  }

  changeFormat(event) {
    this.setState({ format: event.target.value });
  }

  returnFormat(color) {
    return `${chroma(color)[this.state.format]()}`;
  }

  render() {
    const { classes } = this.props;
    const { colors, paletteName, id } = this.props.palette;
    const colorBoxes = colors.map((color, i) => (
      <ColorBox
        key={i}
        background={this.colorProcess(color.color)}
        name={this.returnFormat(this.colorProcess(color.color))}
        format={this.state.format}
      />
    ));
    return (
      <div className={classes.root}>
        <Link to="/">
          <h1 className={classes.header}>colorPalettes</h1>
        </Link>
        <Paper className={classes.container} elevation={10}>
          <div className={classes.colorsContainer}>{colorBoxes}</div>

          <div className={classes.sidePanel}>
            <div className={classes.paletteName}>
              <h1>{paletteName}</h1>
            </div>
            <div className={classes.adjustments}>
              <p>Lightness</p>
              <CustomSlider
                className={classes.slider}
                value={this.state.lightness}
                onChange={this.changeLightness}
                min={-100}
                max={100}
                aria-labelledby="continuous-slider"
                track={false}
                valueLabelDisplay="auto"
              />
              <p>Saturation</p>
              <CustomSlider
                value={this.state.saturation}
                onChange={this.changeSaturation}
                min={-100}
                max={100}
                aria-labelledby="continuous-slider"
                track={false}
                valueLabelDisplay="auto"
              />

              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="copy format"
                    name="format"
                    value={this.state.format}
                    onChange={this.changeFormat}
                  >
                    <FormControlLabel
                      classes={{
                        label: classes.label,
                      }}
                      value="hex"
                      control={<CustomRadio size="small" />}
                      label="HEX"
                    />
                    <FormControlLabel
                      classes={{
                        label: classes.label,
                      }}
                      value="rgb"
                      control={<CustomRadio size="small" />}
                      label="RGB"
                    />
                    <FormControlLabel
                      classes={{
                        label: classes.label,
                      }}
                      value="css"
                      control={<CustomRadio size="small" />}
                      label="CSS"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
