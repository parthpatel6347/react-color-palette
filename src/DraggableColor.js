import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { SortableElement } from "react-sortable-hoc";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles/DraggableColorStyles";

const DraggableColor = SortableElement((props) => {
  const { classes, handleRemove, color } = props;
  return (
    <div className={classes.colorBox} style={{ backgroundColor: color.color }}>
      <div className={classes.container}>
        <i className="fas fa-arrows-alt-h"></i>
        <span className={classes.colorName}>{color.color}</span>
        <CloseIcon className={classes.deleteIcon} onClick={handleRemove} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColor);
