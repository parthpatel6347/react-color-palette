import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import sizes from "./styles/sizes";

const styles = {
  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "white",
    color: "white",
    backgroundColor: "black",
    marginBottom: "2.5rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    fontFamily: "'Josefin Sans', sans-serif",
    "& a": {
      color: "#979797",
      textDecoration: "none",
      textTransform: "uppercase",
      fontSize: ".85rem",
      fontWeight: "600",
      letterSpacing: ".1rem",
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
      width: "65%",
    },
    [sizes.down("l")]: {
      width: "75%",
    },
    [sizes.down("md")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "85%",
    },
    [sizes.down("xxs")]: {
      width: "90%",
    },
  },
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.nav}>
        <div className={classes.container}>
          <h1>colorPalette</h1>
          <Link to="/palette/new">New Palette</Link>
        </div>
      </nav>
    );
  }
}

export default withStyles(styles)(Navbar);
