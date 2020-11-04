import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppIcon from "../assets/images/huntLogo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userAction";
//take this an use it as global in muithemebuilder

const useStyles = (theme) => ({
  ...theme.spread,
});

class signUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      loading: false,
      errors: {
        email: "",
        password: "",
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userName: this.state.userName,
    };
    this.props.signUpUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.loginForm}>
        <Grid item sm>
          <img className={classes.loginIcon} src={AppIcon} alt="monkey/" />
          <Typography variant="h2" className={classes.pageTitle}>
            Register
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className={classes.inputArea}>
              <TextField
                InputLabelProps={{
                  style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "white",
                  },
                }}
                inputProps={{ className: classes.textField }}
                id="email"
                name="email"
                type="input"
                label="Email"
                helperText={this.state.errors.email}
                error={this.state.errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "white",
                  },
                }}
                inputProps={{ className: classes.textField }}
                id="userName"
                name="userName"
                type="email"
                label="Username"
                helperText={this.state.errors.email}
                error={this.state.errors.email ? true : false}
                value={this.state.userName}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                InputLabelProps={{
                  style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "white",
                  },
                }}
                inputProps={{ className: classes.textField }}
                id="password"
                name="password"
                label="Password"
                type="password"
                helperText={this.state.errors.password}
                error={this.state.errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
                variant="standard"
              />
              <TextField
                InputLabelProps={{
                  style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "white",
                  },
                }}
                inputProps={{ className: classes.textField }}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                helperText={this.state.errors.password}
                error={this.state.errors.password ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
                variant="standard"
              />

              {this.state.errors.general && (
                <Typography className={classes.generalError} variant="body2">
                  {this.state.errors.general}
                </Typography>
              )}
            </div>
            <Button
              disabled={this.state.loading}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.loginButton}
            >
              Register
              {this.state.loading && (
                <CircularProgress
                  size={20}
                  className={classes.progressBar}
                ></CircularProgress>
              )}
            </Button>
            <Typography variant="subtitle1" color="textPrimary">
              Already have an account? Log in <Link to={"/login"}>here</Link>
            </Typography>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signUp.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

const maptoStatetoProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionsToProps = {
  signUpUser,
};
export default connect(
  maptoStatetoProps,
  mapActionsToProps
)(withStyles(useStyles)(signUp));
