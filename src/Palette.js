import React, { Component } from "react";
import ColorBox from "./ColorBox";
import chroma from "chroma-js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./Palette.css";
import { Link } from "react-router-dom";

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
    const { colors, paletteName, id } = this.props.palette;
    const colorBoxes = colors.map((color) => (
      <ColorBox
        background={this.colorProcess(color.color)}
        name={this.returnFormat(this.colorProcess(color.color))}
      />
    ));
    return (
      <div className="palette">
        <Link to="/">
          <h1 className="header">colorPalettes</h1>
        </Link>

        <div className="palette-adjustments">
          <Typography id="continuous-slider" gutterBottom>
            Lightness
          </Typography>
          <Slider
            value={this.state.lightness}
            onChange={this.changeLightness}
            min={-100}
            max={100}
            aria-labelledby="continuous-slider"
          />
          <Typography id="continuous-slider" gutterBottom>
            Saturation
          </Typography>
          <Slider
            value={this.state.saturation}
            onChange={this.changeSaturation}
            min={-100}
            max={100}
            aria-labelledby="continuous-slider"
          />

          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="copy format"
                name="format"
                value={this.state.format}
                onChange={this.changeFormat}
              >
                <FormControlLabel value="hex" control={<Radio />} label="HEX" />
                <FormControlLabel value="rgb" control={<Radio />} label="RGB" />
                <FormControlLabel value="css" control={<Radio />} label="CSS" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="palette-container">
          <div className="palette-colors">{colorBoxes}</div>
        </div>
      </div>
    );
  }
}

export default Palette;
