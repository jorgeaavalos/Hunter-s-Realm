import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import EditIcon from "@material-ui/icons/Edit";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalenderToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import MuiLink from "@material-ui/core/Link";
import { logoutUser, uploadImage } from "../redux/actions/userAction";
import EditDetails from "./EditDetails";
import MyButton from "../utils/MyButton";


var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const link = require("react-router-dom").Link;

const useStyles = (theme) => ({
  paper: {
    padding: 20,
    borderRadius: "10%",
  },
  buttons: {
    position: "relative",
    marginRight: 20,
    marginLeft: 40,
    marginTop: 10,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
});

export class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = (event) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = (event) => {
    this.props.logoutUser();
  };
  render() {
    const { classes } = this.props;
    const {
      user: {
        credentials: { userName, bio, website, location, imageUrl, createdOn },
        loading,
        auth,
      },
    } = this.props;

    let profileMarkUp = !loading ? (
      auth ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              ></input>

              <Tooltip title="Change Profile Image" placement="top">
                <IconButton
                  onClick={this.handleEditPicture}
                  className={classes.buttons}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${userName}`}
                color="primary"
                variant="h5"
              >
                @{userName}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalenderToday /> {"  "}
              <span>Joined {dayjs(createdOn).format("DD/MM/YYYY")}</span>
            </div>



              <MyButton tip="Logout" onClick={this.handleLogout}>
                <KeyboardReturn></KeyboardReturn>
              </MyButton>
            
            <EditDetails></EditDetails>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div>
            <Button
              className={classes.buttons}
              variant="contained"
              color="primary"
              component={link}
              to="/login"
            >
              Login
            </Button>

            <Button
              className={classes.buttons}
              variant="contained"
              color="primary"
              component={link}
              to="/signup"
            >
              Register
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );
    return profileMarkUp;
  }
}
const mapStatetoProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
  mapStatetoProps,
  mapActionsToProps
)(withStyles(useStyles)(Profile));
