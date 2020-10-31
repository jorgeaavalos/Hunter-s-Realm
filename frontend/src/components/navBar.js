import React, { Component } from 'react'
import "../App.css";

import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
const Link = require('react-router-dom').Link;
 class navBar extends Component {
    render() {
        return (
          <AppBar>
            <Toolbar className="nav-container">
              <Button component={Link} to="/" color="inherit" >
                Home
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                SignUp
              </Button>
            </Toolbar>
          </AppBar>
        );
    }
}

export default navBar
