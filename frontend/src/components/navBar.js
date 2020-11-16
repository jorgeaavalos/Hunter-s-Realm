import React, { Component, Fragment } from "react";
import "../App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MyButton from "../utils/MyButton";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import withStyles from "@material-ui/styles/withStyles";
import PostScream from "./PostScream";

const Link = require("react-router-dom").Link;

const useStyles = (theme) => ({
  ...theme.spread,
});

class navBar extends Component {
  render() {
    const { auth } = this.props;

    return (
      <AppBar>
        <Toolbar className="nav-container">
          {auth ? (
            <Fragment>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <PostScream></PostScream>
              <MyButton tip="Notifications">
                <NotificationsIcon></NotificationsIcon>
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                SignUp
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
const maptoStatetoProps = (state) => ({
  auth: state.user.auth,
});

export default connect(maptoStatetoProps)(withStyles(useStyles)(navBar));
