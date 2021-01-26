import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteSaveDialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { hideSaveDialogue, handleSubmit } = this.props;
    return (
      <Dialog
        maxWidth="xs"
        fullWidth
        open={true}
        onClose={hideSaveDialogue}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save Pallete</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(this.state.newPaletteName)}>
          <DialogContent>
            <DialogContentText>Please enter a palette name.</DialogContentText>
            <TextValidator
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
            <Button onClick={hideSaveDialogue} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteSaveDialogue;
