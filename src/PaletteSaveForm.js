import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

class PaletteSaveForm extends Component {
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
    return (
      <div>
        <ValidatorForm
          onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)}
        >
          <TextValidator
            value={this.state.newPaletteName}
            onChange={this.handleChange}
            validators={["required", "paletteNameUnique", "reqMinColor"]}
            errorMessages={[
              "Enter Palette Name",
              "Palette name already taken",
              "Require atleast 1 color in palette",
            ]}
          />
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </ValidatorForm>
      </div>
    );
  }
}

export default PaletteSaveForm;
