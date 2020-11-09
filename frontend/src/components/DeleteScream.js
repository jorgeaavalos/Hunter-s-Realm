import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import { deleteScream } from "../redux/actions/dataAction";
const useStyles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});

class DeleteDialogue extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  deleteScream = () => {
    this.props.deleteScream(
      this.props.screamId,
      this.props.credentials.userName
    );
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Delete Scream" placement="bottom">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream?
          </DialogTitle>
          <DialogContent>
            Scream will be lost permanently!
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.deleteScream}>Delete</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { deleteScream })(
  withStyles(useStyles)(DeleteDialogue)
);
