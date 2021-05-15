import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PaletteSaveDialogue from "./PaletteSaveDialogue";

import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import sizes from "./styles/sizes";

const styles = {
  main: {
    paddingBottom: "2rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    [sizes.down("sm")]: {
      paddingBottom: "1rem",
    },
  },
  saveBtn: {
    marginTop: "1rem",
    width: "90px",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    background: "#0D66D0",
    paddingTop: "9px",
    [sizes.down("md")]: {
      fontSize: ".7rem",
      width: "80px",
      height: "1.8rem",
      borderRadius: "14px",
    },
  },
  popover: {
    color: "#b9b9b9",
    backgroundColor: "RGBa(37,37,37,0.9)",
    fontFamily: "'Josefin Sans', sans-serif",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
};

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
    const { handleSubmit, palettes, colors, minColors, classes } = this.props;
    return (
      <div className={classes.main}>
        <Button
          className={classes.saveBtn}
          variant="contained"
          color="primary"
          onClick={colors.length ? this.openSaveDialogue : this.handlePopOver}
          aria-describedby={id}
        >
          Save
        </Button>
        <Popover
          classes={{ paper: classes.popover }}
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

export default withStyles(styles)(PaletteSaveForm);
