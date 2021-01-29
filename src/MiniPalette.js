import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": { opacity: "0.7" },
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
    justifyContent: "space-between",
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
  deleteIcon: {
    color: "grey",
    opacity: "0",
    "&:hover": {
      color: "#eb3d30",
      opacity: "1",
      transform: "scale(1.1)",
    },
  },
};

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
  }

  deletePalette(e) {
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  }

  render() {
    const { classes, paletteName, colors, handleClick } = this.props;
    const miniColorBox = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={handleClick}>
        <div className={classes.palette}>{miniColorBox}</div>
        <h5 className={classes.title}>
          {paletteName}{" "}
          <DeleteOutlinedIcon
            className={classes.deleteIcon}
            style={{ transition: "all 0.2s ease-in-out" }}
            onClick={this.deletePalette}
          />
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
