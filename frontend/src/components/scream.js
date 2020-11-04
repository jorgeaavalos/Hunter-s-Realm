import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
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
  render() {
    const {
      scream: {
        body,
        createdOn,
        imageUrl,
        userName,
        // screamId,
        // likeCount,
        // commentCount,
      },
    } = this.props;
    const { classes } = this.props;


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
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(Scream);
