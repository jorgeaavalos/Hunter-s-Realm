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
import { loginUser } from "../redux/actions/userAction";

const useStyles = (theme) => ({
  ...theme.spread,
});
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
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
            Login
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
                type="email"
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
              Login
              {this.state.loading && (
                <CircularProgress
                  size={20}
                  className={classes.progressBar}
                ></CircularProgress>
              )}
            </Button>
            <Typography variant="subtitle1" color="textPrimary">
              Register for an account <Link to={"/signup"}>here</Link>
            </Typography>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  logoutser: PropTypes.func.isRequired,
};
const maptoStatetoProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionsToProps = {
  loginUser,
};
export default connect(
  maptoStatetoProps,
  mapActionsToProps
)(withStyles(useStyles)(login));
