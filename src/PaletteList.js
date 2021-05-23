import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";
import sizes from "./styles/sizes";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 300ms ease-out",
    },
  },
  root: {
    backgroundColor: "#323232",
    height: "calc(100vh - 88px);",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: "2.5rem",
    overflow: "scroll",
    overflowX: "hidden",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "65%",
    },
    [sizes.down("l")]: {
      width: "75%",
    },
    [sizes.down("md")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "85%",
    },
    [sizes.down("xxs")]: {
      width: "60%",
    },
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2.5rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2,45%)",
      gridGap: "2rem",
    },
    [sizes.down("xxs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1.8rem",
    },
  },
  dialog: {
    borderRadius: "15px",
    backgroundColor: "#424242",
    paddingBottom: "0.3rem",
  },
  title: {
    color: "#cccccc",
    paddingBottom: "5px",

    "& h1": {
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "1.3rem",
      fontWeight: "400",
      margin: "0",
    },
  },
  listText: {
    color: "#cccccc",
    "& span": {
      fontFamily: "'Josefin Sans', sans-serif",
    },
  },
  listItem: {
    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
  },
};

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { deleteDialogShowing: false, deletingId: "" };
    this.goToPalette = this.goToPalette.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  openDialog(id) {
    this.setState({ deleteDialogShowing: true, deletingId: id });
  }
  closeDialog(e) {
    this.setState({ deleteDialogShowing: false, deletingId: "" });
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  render() {
    const { palettes, classes } = this.props;
    const { deleteDialogShowing } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette
                  {...palette}
                  handleClick={this.goToPalette}
                  openDeleteDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          classes={{ paper: classes.dialog }}
          open={deleteDialogShowing}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle
            id="delete-dialog-title"
            classes={{ root: classes.title }}
          >
            <h1>Confirm Delete?</h1>
          </DialogTitle>
          <List>
            <ListItem
              classes={{ button: classes.listItem }}
              button
              onClick={this.handleDelete}
            >
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: "rgba(144,202,249,0.2)",
                    color: blue[400],
                  }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listText}>
                <span>Delete</span>
              </ListItemText>
            </ListItem>
            <ListItem
              button
              classes={{ button: classes.listItem }}
              onClick={this.closeDialog}
            >
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: "rgba(234,84,82,0.2)",
                    color: red[600],
                  }}
                >
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listText}>
                <span>Cancel</span>
              </ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
