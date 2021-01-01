import React, { Component } from "react";
import ColorBox from "./ColorBox";
import chroma from "chroma-js";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./Pallete.css";

class Pallete extends Component {
  constructor(props) {
    super(props);
    this.state = { lightness: 0, saturation: 0 };
    this.changeLightness = this.changeLightness.bind(this);
    this.changeSaturation = this.changeSaturation.bind(this);
  }

  changeLightness(lightness) {
    this.setState({ lightness });
  }

  changeSaturation(saturation) {
    this.setState({ saturation });
  }

  colorProcess(color) {
    return chroma(color)
      .brighten(this.state.lightness / 100)
      .saturate(this.state.saturation / 100)
      .hex();
  }

  render() {
    console.log(chroma("#F44336").hex());
    console.log(this.props.colors[1].color);
    const colorBoxes = this.props.colors.map((color) => (
      <ColorBox
        background={this.colorProcess(color.color)}
        name={this.colorProcess(color.color)}
      />
    ));
    return (
      <div className="Pallete">
        <Slider
          className="slider"
          defaultValue={this.state.lightness}
          min={-400}
          max={400}
          onAfterChange={this.changeLightness}
        />
        <Slider
          className="slider"
          defaultValue={this.state.saturation}
          min={-400}
          max={400}
          onAfterChange={this.changeSaturation}
        />
        <div className="Pallete-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default Pallete;
