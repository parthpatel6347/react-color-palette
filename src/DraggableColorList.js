import React from "react";
import DraggableColor from "./DraggableColor";
import { SortableContainer } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    width: "70%",
    height: "100%",
  },
};

const DraggableColorList = SortableContainer((props) => {
  const { colors, removeColor, classes } = props;
  return (
    <div className={classes.root}>
      {colors.map((color, i) => (
        <DraggableColor
          index={i}
          color={color}
          handleRemove={() => removeColor(color.color)}
        />
      ))}
    </div>
  );
});

export default withStyles(styles)(DraggableColorList);
