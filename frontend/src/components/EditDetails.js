import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userAction";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
const useStyles = (theme) => ({
  ...theme.spread,
  button:{
    float: 'right'
  }
});

class EditDetails extends Component {
  //the state for this instance.
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon></EditIcon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="bio"
                multiline
                rows="3"
                placeholder="Enter a bio about yourself"
                className={classes.TextField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="website"
                type="text"
                label="website"
                multiline
                rows="3"
                placeholder="Enter a website"
                className={classes.TextField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                type="text"
                label="location"
                multiline
                rows="3"
                placeholder="Enter a location"
                className={classes.TextField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleSubmit}>Save</Button>
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
export default connect(mapStateToProps, { editUserDetails })(
  withStyles(useStyles)(EditDetails)
);
