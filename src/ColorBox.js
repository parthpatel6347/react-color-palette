import React, { Component } from "react";
import "./ColorBox.css";
import ReactTooltip from "react-tooltip";
import chroma from "chroma-js";
import { CopyToClipboard } from "react-copy-to-clipboard";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopied = this.changeCopied.bind(this);
  }
  changeCopied() {
    console.log("in function");
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  }

  render() {
    const { background, name } = this.props;
    const isDark = chroma(background).luminance() <= 0.07;
    return (
      <div className="ColorBox" style={{ background }}>
        <div className="ColorBox-container">
          <span className={isDark && "white-font"}>{name}</span>
          <CopyToClipboard text={name} onCopy={this.changeCopied}>
            <div>
              <div
                className={`copied-overlay ${this.state.copied && "show"}`}
                style={{ background }}
              />
              <div className={`copied-msg ${this.state.copied && "show"}`}>
                <h1 className={isDark && "white-font"}>Copied</h1>
                <p className={isDark && "white-font"}>{name}</p>
              </div>
              <i
                className={`fas fa-copy ${isDark && "white-font"}`}
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
            className={`fas fa-palette ${isDark && "white-font"}`}
            data-tip
            data-for="more"
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
      </div>
    );
  }
}

export default ColorBox;
