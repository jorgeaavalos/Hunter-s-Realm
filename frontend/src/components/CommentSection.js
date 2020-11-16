import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
const Link = require("react-router-dom").Link;

const useStyles = (theme) => ({
  ...theme.spread,
  commentImg: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
});
class CommentSection extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Grid container>
        {comments.map((comment) => {
          const { body, createdOn, imageUrl, userName } = comment;
          return (
            <Fragment key={createdOn}>
              <Grid item sm={10}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={imageUrl}
                      alt="comment"
                      className={classes.commentImg}
                    ></img>
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userName}`}
                      >
                        {userName}
                      </Typography>
                      <Typography variant="body2">
                        {dayjs(createdOn).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSepartor}></hr>
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr></hr>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(useStyles)(CommentSection);
