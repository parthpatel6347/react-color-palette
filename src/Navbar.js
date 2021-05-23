import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "./styles/NavbarStyles";

class Navbar extends Component {
  render() {
    const { classes, location } = this.props;
    return (
      <nav className={classes.nav}>
        <div className={classes.container}>
          {location === "home" ? (
            <h1>colorPalette</h1>
          ) : (
            <Link to="/">
              <Button
                className={classes.backBtn}
                variant="contained"
                color="secondary"
                disableRipple
              >
                <i className="fas fa-chevron-left"></i>All Palettes
              </Button>
            </Link>
          )}
          {location !== "newPalette" && (
            <Link to="/palette/new">New Palette</Link>
          )}
        </div>
      </nav>
    );
  }
}

export default withStyles(styles)(Navbar);
