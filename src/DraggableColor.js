import React from "react";
import { withStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const styles = {
  colorBox: {
    height: "100%",
    width: "calc(100%/6)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "rgba(0,0,0,0.5)",
    height: "100%",
  },
  colorName: {
    marginBottom: "10px",
  },
  deleteIcon: {
    marginBottom: "20px",
    transition: "all 0.2s ease-in-out",
    fontSize: "1.4rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      transform: "scale(1.3)",
    },
  },
};

function DraggableColor(props) {
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
}

export default withStyles(styles)(DraggableColor);
