import React, { Component } from "react";
import "./ColorScale.css";
import chroma from "chroma-js";
import ColorScaleBox from "./ColorScaleBox";

class ColorScale extends Component {
  constructor(props) {
    super(props);
    this.state = { colorScale: [] };
  }

  componentDidMount() {
    let colorScale = this.getScale(this.props.color, 12);
    this.setState({ colorScale });
  }

  getScale(color, NumOfColors) {
    let colorScale = chroma
      .scale(["white", color, "black"])
      .correctLightness()
      .padding([0.2, 0.2])
      .colors(NumOfColors);
    return colorScale;
  }

  returnFormat(color) {
    return `${chroma(color)[this.props.format]()}`;
  }

  render() {
    return (
      <div className="ColorScale" onClick={this.props.closeScale}>
        {this.state.colorScale.map((c) => (
          <ColorScaleBox
            key={c}
            color={c}
            changeCopied={this.props.changeCopied}
            name={this.returnFormat(c)}
          />
        ))}
      </div>
    );
  }
}

export default ColorScale;
