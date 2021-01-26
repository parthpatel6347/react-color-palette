import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PaletteSaveDialogue from "./PaletteSaveDialogue";

class PaletteSaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveDialogueOpen: false,
    };
    this.openSaveDialogue = this.openSaveDialogue.bind(this);
    this.hideSaveDialogue = this.hideSaveDialogue.bind(this);
  }

  openSaveDialogue() {
    this.setState({ saveDialogueOpen: true });
  }

  hideSaveDialogue() {
    this.setState({ saveDialogueOpen: false });
  }

  render() {
    const { handleSubmit, palettes, colors, minColors } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.openSaveDialogue}
        >
          Save Palette
        </Button>
        <Link to="/">
          <Button variant="contained" color="secondary">
            Go Back
          </Button>
        </Link>
        {this.state.saveDialogueOpen && (
          <PaletteSaveDialogue
            handleSubmit={handleSubmit}
            palettes={palettes}
            colors={colors}
            minColors={minColors}
            hideSaveDialogue={this.hideSaveDialogue}
          />
        )}
      </div>
    );
  }
}

export default PaletteSaveForm;
