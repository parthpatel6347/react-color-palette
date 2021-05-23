import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

import { styles, CustomTextField } from "./styles/PaletteSaveDialogueStlyes";

class PaletteSaveDialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("paletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule(
      "reqMinColor",
      (value) => this.props.colors.length >= this.props.minColors
    );
  }

  handleChange(evt) {
    this.setState({ newPaletteName: evt.target.value });
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.newPaletteName);
    this.props.hideSaveDialogue();
  }

  render() {
    const { hideSaveDialogue, classes } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.dialog, root: classes.root }}
        maxWidth="xs"
        fullWidth
        open={true}
        onClose={hideSaveDialogue}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle classes={{ root: classes.title }} id="form-dialog-title">
          <h1>Save Pallete</h1>
        </DialogTitle>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <DialogContent className={classes.inputContainer}>
            <DialogContentText classes={{ root: classes.content }}>
              Please enter a palette name.
            </DialogContentText>
            <CustomTextField
              autoFocus
              fullWidth
              value={this.state.newPaletteName}
              onChange={this.handleChange}
              validators={["required", "paletteNameUnique", "reqMinColor"]}
              errorMessages={[
                "Enter Palette Name",
                "Palette name already taken",
                "Require atleast 1 color in palette",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.cancelBtn}
              onClick={hideSaveDialogue}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className={classes.saveBtn}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PaletteSaveDialogue);
