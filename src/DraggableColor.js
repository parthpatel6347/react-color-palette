import React from "react";
import { withStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";

const styles = {
  colorBox: {
    height: "100%",
    flexGrow: "1",
    "&:hover": {
      flexGrow: "1.3",
      "& $colorName": {
        opacity: "1",
      },
      "& $deleteIcon": {
        opacity: "1",
      },
    },
    // transition: "all 0.2s",

    // width: "calc(100%/6)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    color: (props) =>
      chroma(props.color.color).get("lab.l") <= 60 ? "white" : "#4B4B4B",
    height: "100%",
  },
  colorName: {
    opacity: "0.75",
    marginBottom: "10px",
    fontSize: "0.9em",
    fontWeight: "500",
    textTransform: "uppercase",
    "&:hover": {
      cursor: "default",
    },
  },
  deleteIcon: {
    opacity: "0",
    marginBottom: "20px",
    transition: "all 0.2s ease-in-out",
    fontSize: "1.4rem",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.3)",
    },
  },
};

const DraggableColor = SortableElement((props) => {
  const { classes, handleRemove, color } = props;
  return (
    <div className={classes.colorBox} style={{ backgroundColor: color.color }}>
      <div className={classes.container}>
        <span className={classes.colorName}>{color.color}</span>
        <HighlightOffIcon
          className={classes.deleteIcon}
          onClick={handleRemove}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColor);
