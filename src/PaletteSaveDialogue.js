import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  dialog: {
    borderRadius: "20px",
    backgroundColor: "#424242",
    paddingBottom: "0.3rem",
  },
  title: {
    color: "#cccccc",
    "& h1": {
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "1.5rem",
      fontWeight: "400",
      margin: "0",
    },
  },
  content: {
    color: "#bebebe",
    fontFamily: "'Josefin Sans', sans-serif",
    letterSpacing: ".05rem",
    fontWeight: "300",
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  saveBtn: {
    width: "90px",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    background: "#0D66D0",
    paddingTop: "9px",
    marginRight: "0.3rem",
  },
  cancelBtn: {
    color: "#0D66D0",
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: "400",
    letterSpacing: "0.07rem",
    height: "2rem",
    fontSize: ".8rem",
    paddingTop: "9px",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "rgba(13,101,208,0.2)",
    },
  },
  inputContainer: {
    paddingTop: ".5rem !important",
  },
};

const CustomTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0D66D0",
    },
    "& .MuiInputBase-root": {
      fontFamily: "'Josefin Sans', sans-serif",
      color: "#bebebe",
    },
  },
})(TextValidator);

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
    const { hideSaveDialogue, handleSubmit, classes } = this.props;
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
        <ValidatorForm onSubmit={() => handleSubmit(this.state.newPaletteName)}>
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
