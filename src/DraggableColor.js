import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";
import sizes from "./styles/sizes";
import CloseIcon from "@material-ui/icons/Close";

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
    [sizes.down("xs")]: {
      display: "flex",
      justifyContent: "center",
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
    [sizes.down("xs")]: {
      width: "40px",
    },
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
    [sizes.down("xs")]: {
      fontSize: "0.8em",
      transform: "rotate(-90deg)",
      marginBottom: "30px",
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
    [sizes.down("xs")]: {
      opacity: ".7",
      marginBottom: "10px",
      fontSize: "1rem",
    },
  },
};

const DraggableColor = SortableElement((props) => {
  const { classes, handleRemove, color } = props;
  return (
    <div className={classes.colorBox} style={{ backgroundColor: color.color }}>
      <div className={classes.container}>
        <span className={classes.colorName}>{color.color}</span>
        <CloseIcon className={classes.deleteIcon} onClick={handleRemove} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColor);
