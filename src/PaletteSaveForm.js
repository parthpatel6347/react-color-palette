import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PaletteSaveDialogue from "./PaletteSaveDialogue";

import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

class PaletteSaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveDialogueOpen: false,
      anchorEl: null,
    };
    this.openSaveDialogue = this.openSaveDialogue.bind(this);
    this.hideSaveDialogue = this.hideSaveDialogue.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePopOver = this.handlePopOver.bind(this);
  }

  openSaveDialogue() {
    this.setState({ saveDialogueOpen: true });
  }

  hideSaveDialogue() {
    this.setState({ saveDialogueOpen: false });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handlePopOver(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "popover" : undefined;
    const { handleSubmit, palettes, colors, minColors } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={colors.length ? this.openSaveDialogue : this.handlePopOver}
          aria-describedby={id}
        >
          Save Palette
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <p>Cannot save an empty palette.</p>
        </Popover>
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
