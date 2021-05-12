import React, { Component } from "react";
import "./ColorBox.css";
import ReactTooltip from "react-tooltip";
import chroma from "chroma-js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ColorScale from "./ColorScale";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false, scaleOpen: false };
    this.changeCopied = this.changeCopied.bind(this);
    this.openScale = this.openScale.bind(this);
    this.closeScale = this.closeScale.bind(this);
  }
  changeCopied() {
    console.log("in function");
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  }

  openScale() {
    this.setState({ scaleOpen: true });
  }

  closeScale() {
    this.setState({ scaleOpen: false });
  }

  render() {
    const { background, name } = this.props;
    const isDark = chroma(background).get("lab.l") <= 60;
    let colorScale = this.state.scaleOpen && (
      <div className="Color-scale show">
        <ColorScale
          key={background}
          color={background}
          changeCopied={this.changeCopied}
          closeScale={this.closeScale}
          format={this.props.format}
        />
      </div>
    );
    return (
      <div className="ColorBox" style={{ background }}>
        {colorScale}
        <div className="ColorBox-container">
          <span className={isDark ? "white-font" : "dark-font"}>{name}</span>
          <CopyToClipboard text={name} onCopy={this.changeCopied}>
            <div>
              <i
                className={`Icons-top fas fa-copy ${isDark && "white-font"}`}
                data-tip
                data-for="copy"
              ></i>
            </div>
          </CopyToClipboard>
          <ReactTooltip
            className="tooltip"
            id="copy"
            place="right"
            effect="solid"
          >
            COPY
          </ReactTooltip>
          <i
            className={`Icons-top fas fa-palette ${isDark && "white-font"}`}
            data-tip
            data-for="more"
            onClick={this.openScale}
          ></i>
          <ReactTooltip
            className="tooltip"
            id="more"
            place="right"
            effect="solid"
          >
            MORE
          </ReactTooltip>
        </div>
        <div className={`Copied-msg ${this.state.copied && "show"}`}>
          <h1 className={isDark ? "white-font" : undefined}>
            Copied<i className="Icon-check fas fa-check"></i>
          </h1>
        </div>
      </div>
    );
  }
}

export default ColorBox;
