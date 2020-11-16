import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataAction";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import MyButton from "../utils/MyButton";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CommentSection from "./CommentSection";
import { CircularProgress, Typography, useRadioGroup } from "@material-ui/core";
const Link = require("react-router-dom").Link;
const useStyles = (theme) => ({
  ...theme.spread,
  profileImg: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
});

class ScreamDetails extends Component {
  //the state for this instance.
  state = {
    scream: {},
    open: false,
    loading: false,
  };

  componentDidMount() {
    const { scream } = this.props;
    this.mapScreamToState(scream);
  }

  mapScreamToState = (scream) => {
    this.setState({
      scream: scream ? scream : null,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: {
        body,
        createdOn,
        imageUrl,
        userName,
        screamId,
        likeCount,
        commentCount,
        comments,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200}></CircularProgress>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img src={imageUrl} className={classes.profileImg}></img>
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} variant="h5" to={`/users/${userName}`}>
            @{userName}
          </Typography>

          <hr className={classes.invisibleSeperator}></hr>
          <Typography variant="body2">
            {dayjs(createdOn).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator}></hr>

          <Typography variant="body1">{body}</Typography>
        </Grid>
        <CommentSection comments={comments}></CommentSection>
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Scream"
          tipClassName={classes.expandButton}
        >
          <ExpandIcon></ExpandIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  ui: state.ui,
});

export default connect(mapStateToProps, { getScream })(
  withStyles(useStyles)(ScreamDetails)
);
