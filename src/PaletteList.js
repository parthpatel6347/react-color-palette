import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";

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

import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { deleteDialogShowing: false, deletingId: "" };
    this.goToPalette = this.goToPalette.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  goToPalette(id, e) {
    this.props.history.push(`/palette/${id}`);
    e.stopPropagation();
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
            <p>Confirm Delete?</p>
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
