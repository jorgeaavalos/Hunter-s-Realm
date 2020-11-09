import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import { connect } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatIcon from "@material-ui/icons/Chat";
import MyButton from "../utils/MyButton";
import {
  likeScream,
  unlikeScream,
  deleteScream,
} from "../redux/actions/dataAction";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteDialogue from "./DeleteScream";
const Link = require("react-router-dom").Link;

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const link = require("react-router-dom").Link;

const useStyles = (theme) => ({
  card: {
    borderRadius: 20,
    display: "flex",
    padding: 10,
    marginBottom: 30,
    background: "linear-gradient(45deg, #212121 30%, #000000 90%)",
    color: theme.palette.primary.contrastText,
  },
  content: {
    padding: 20,
    width: "auto",
    objectFit: "cover",
    color: theme.palette.primary.contrastText,
  },
  userImage: {
    width: 100,
    height: 100,
    margin: 9,
    borderRadius: 20,
    color: theme.palette.primary.contrastText,
  },
  userName: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
    marginBottom: 10,
  },
  screamBody: {
    fontSize: 15,
    position: "relative",
    marginTop: 10,
  },
  createdOn: {
    marginTop: 10,
    fontSize: 10,
  },
});

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else return false;
  };

  userScream = () => {
    if (
      this.props.scream &&
      this.props.scream.userName === this.props.user.credentials.userName
    ) {
      return true;
    } else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    const {
      scream: {
        body,
        createdOn,
        imageUrl,
        userName,
        screamId,
        likeCount,
        commentCount,
      },
      user: { auth },
    } = this.props;
    const { classes } = this.props;

    const likeButton = !auth ? (
      <MyButton tip="Please Sign in to like a scream">
        <Link to="/login">
          <FavoriteBorderIcon />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Unlike" onClick={this.unlikeScream}>
        <FavoriteIcon />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorderIcon />
      </MyButton>
    );

    const deleteButton = !auth ? (
      ""
    ) : this.userScream() ? (
      <DeleteDialogue screamId={this.props.scream.screamId}></DeleteDialogue>
    ) : (
      ""
    );

    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          title="Profile Image"
          component={link}
          to={`/scream/${userName}`}
          className={classes.userImage}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.userName}
            component={link}
            to={`/scream/${userName}`}
          >
            {userName}
          </Typography>
          <Typography className={classes.screamBody} variant="body1">
            {body}
          </Typography>

          <Typography className={classes.createdOn} variant="body2">
            {dayjs(createdOn).fromNow()}
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="Comment">
              <ChatIcon></ChatIcon>
            </MyButton>
            {commentCount}
            <span>{deleteButton}</span>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const maptoStatetoProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
  deleteScream,
};
export default connect(
  maptoStatetoProps,
  mapActionsToProps
)(withStyles(useStyles)(Scream));
