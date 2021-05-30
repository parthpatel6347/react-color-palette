import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Paper from "@material-ui/core/Paper";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDialogueOpen = this.handleDialogueOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDialogueOpen(e) {
    e.stopPropagation();
    this.props.openDeleteDialog(this.props.id);
  }

  handleClick(e) {
    this.props.handleClick(this.props.id, e);
  }

  render() {
    const { classes, paletteName, colors } = this.props;
    const miniColorBox = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.color}
      />
    ));
    return (
      <Paper className={classes.root} onClick={this.handleClick} elevation={4}>
        <div className={classes.palette}>{miniColorBox}</div>
        <h5 className={classes.title}>
          <p className={classes.name}>{paletteName}</p>
          <DeleteOutlinedIcon
            className={classes.deleteIcon}
            style={{ transition: "all 0.2s ease-in-out" }}
            onClick={this.handleDialogueOpen}
          />
        </h5>
      </Paper>
    );
  }
}

export default withStyles(styles)(MiniPalette);
