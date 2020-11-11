import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import { commentScream } from "../redux/actions/dataAction";
import { Typography } from "@material-ui/core";
const useStyles = (theme) => ({
  ...theme.spread,
  button: {
    float: "right",
  },
});

class CommentScream extends Component {
  state = {
    body: "",
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const comment = {
      body: this.state.body,
    };
    this.props.commentScream(this.props.screamId, comment);
    this.handleClose();
  };

  render() {
    const { classes, commentCount } = this.props;

    return (
      <Fragment>
        <Tooltip title="Comment Scream" placement="bottom">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <ChatIcon></ChatIcon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Comment Scream</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="body"
                type="text"
                label=""
                multiline
                rows="3"
                placeholder=""
                className={classes.TextField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleSubmit}>Comment</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  screams: state.screams
});

export default connect(mapStateToProps, { commentScream })(
  withStyles(useStyles)(CommentScream)
);
