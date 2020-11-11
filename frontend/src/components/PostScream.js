import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { postScream } from "../redux/actions/userAction";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import CloseButton from "@material-ui/icons/Close";
import CirclarProgress from "@material-ui/core/CircularProgress";
import MyButton from "../utils/MyButton";
import theme from "../utils/theme";
const useStyles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.close}
          fullWidth
          maxWidth="sm"
        ></Dialog>
        <MyButton onClick={this.handleClose} ctip="Close">
          <CloseButton />
        </MyButton>
        <DialogTitle>Post A Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              <CirclarProgress
                size={30}
                className={classes.progressSpinner}
              ></CirclarProgress>
            </Button>
          </form>
        </DialogContent>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) = {
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream })(
  withStyles(useStyles)(PostScream)
);
