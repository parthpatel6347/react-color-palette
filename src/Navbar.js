import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import sizes from "./styles/sizes";

const styles = {
  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "white",
    color: "white",
    backgroundColor: "black",
    // marginBottom: "2.5rem",
    height: "3rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: (props) => (props.location === "home" ? "50%" : "70%"),
    fontFamily: "'Josefin Sans', sans-serif",
    "& a": {
      color: "#979797",
      textDecoration: "none",
      textTransform: "uppercase",
      fontSize: ".85rem",
      fontWeight: "600",
      letterSpacing: ".1rem",
      marginRight: "0.5em",
      "&:hover": {
        color: "white",
      },
    },
    "& h1": {
      fontWeight: "400",
      letterSpacing: ".08rem",
      background:
        "linear-gradient(90deg, hsla(238, 100%, 71%, 1) 0%, hsla(295, 100%, 84%, 1) 100%)",
      WebkitBackgroundClip: "text !important",
      backgroundClip: "text !important",
      textFillColor: "transparent",
    },
    [sizes.down("lg")]: {
      width: (props) => (props.location === "home" ? "65%" : "80%"),
    },
    [sizes.down("l")]: {
      width: (props) => (props.location === "home" ? "75%" : "80%"),
    },
    [sizes.down("md")]: {
      width: (props) => (props.location === "home" ? "80%" : "85%"),
    },
    [sizes.down("xs")]: {
      width: (props) => (props.location === "home" ? "85%" : "85%"),
    },
    [sizes.down("xxs")]: {
      width: (props) => (props.location === "home" ? "90%" : "90%"),
    },
  },
  backBtn: {
    padding: "0",
    color: "#979797",
    background: "none",
    boxShadow: "none",
    fontFamily: "'Josefin Sans', sans-serif",
    textTransform: "unset",
    display: "flex",
    fontSize: ".85rem",
    fontWeight: "600",
    letterSpacing: ".1rem",
    "&:hover": {
      background: "none",
      boxShadow: "none",
      color: "white",
      transition: "all .15s ease-in-out",
    },
    "& i": {
      fontSize: ".8rem",
      marginRight: "8px",
      paddingBottom: "2px",
    },
  },
};

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
                <i class="fas fa-chevron-left"></i>All Palettes
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
