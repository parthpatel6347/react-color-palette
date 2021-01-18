import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  palette: {
    backgroundColor: "grey",
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  miniColor: {
    height: "100%",
    width: "calc(100%/6)",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
  },
};

function MiniPalette(props) {
  const { classes, paletteName, colors } = props;
  const miniColorBox = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  return (
    <div className={classes.root}>
      <div className={classes.palette}>{miniColorBox}</div>
      <h5 className={classes.title}>{paletteName}</h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
