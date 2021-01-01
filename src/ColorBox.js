import React, { Component } from "react";
import "./ColorBox.css";
import ReactTooltip from "react-tooltip";
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
    return (
      <div className="ColorBox" style={{ background }}>
        <div className="ColorBox-container">
          <span>{name}</span>
          <CopyToClipboard text={background} onCopy={this.changeCopied}>
            <div>
              <div
                className={`copied-overlay ${this.state.copied && "show"}`}
                style={{ background }}
              />
              <div className={`copied-msg ${this.state.copied && "show"}`}>
                <h1>Copied</h1>
                <p>{background}</p>
              </div>
              <i className="fas fa-copy" data-tip data-for="copy"></i>
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
          <i className="fas fa-palette" data-tip data-for="more"></i>
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
