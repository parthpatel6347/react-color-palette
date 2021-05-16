import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";
import sizes from "./styles/sizes";
import Navbar from "./Navbar";

const styles = {
  root: {
    backgroundColor: "#323232",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
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
      width: "60%",
    },
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2.5rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2,45%)",
      gridGap: "2rem",
    },
    [sizes.down("xxs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1.8rem",
    },
  },
};

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <Navbar />
        <div className={classes.container}>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={this.props.deletePalette}
                key={palette.id}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
