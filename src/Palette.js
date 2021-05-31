import React, { Component } from "react";
import ColorBox from "./ColorBox";
import chroma from "chroma-js";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { styles, CustomSlider, CustomRadio } from "./styles/PaletteStyles";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightness: 0,
      saturation: 0,
      format: "hex",
      pageLoaded: false,
    };
    this.changeLightness = this.changeLightness.bind(this);
    this.changeSaturation = this.changeSaturation.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ pageLoaded: true });
    }, 1000);
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
    const { colors, paletteName } = this.props.palette;
    const colorBoxes = colors.map((color, i) => (
      <ColorBox
        key={i}
        background={this.colorProcess(color.color)}
        name={this.returnFormat(this.colorProcess(color.color))}
        format={this.state.format}
      />
    ));
    return (
      <div className={this.state.pageLoaded ? classes.root : classes.rootInit}>
        <Navbar location="viewPalette" />
        <div className={classes.main}>
          <Paper className={classes.container} elevation={10}>
            <div className={classes.colorsContainer}>{colorBoxes}</div>

            <div className={classes.sidePanel}>
              <div className={classes.paletteName}>
                <h1>{paletteName}</h1>
              </div>
              <div className={classes.adjustments}>
                <div className={classes.sliders}>
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
                </div>
                <div className={classes.radio}>
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
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
