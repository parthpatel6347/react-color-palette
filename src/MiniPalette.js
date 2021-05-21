import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Paper from "@material-ui/core/Paper";
import sizes from "./styles/sizes";

const styles = {
  root: {
    backgroundColor: "#424242",
    fontFamily: "'Josefin Sans', sans-serif",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "150px",
    "&:hover svg": { opacity: "0.7" },
    // boxShadow: " 10px 10px 30px #2b2b2b",
  },
  palette: {
    backgroundColor: "grey",
    height: "75%",
    width: "100%",
    display: "flex",
  },
  title: {
    height: "25%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    fontSize: "1rem",
    position: "relative",
    padding: "0 12px 0",
  },
  name: {
    color: "#979797",
    fontWeight: "500",
    paddingTop: "4px",
    width: "85%",
    fontSize: ".95rem",
    height: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  miniColor: {
    height: "100%",
    flexGrow: "1",
  },
  deleteIcon: {
    color: "grey",
    opacity: "0",
    "&:hover": {
      color: "#eb3d30",
      opacity: "1",
      transform: "scale(1.1)",
    },
    [sizes.down("sm")]: {
      opacity: "1",
    },
  },
};

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

  handleClick() {
    this.props.handleClick(this.props.id);
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
