import React from "react";
import DraggableColor from "./DraggableColor";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer((props) => {
  const { colors, removeColor } = props;
  return (
    <div style={{ display: "flex", width: "70%", height: "500px" }}>
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

export default DraggableColorList;
