import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppIcon from "../assets/images/huntLogo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  loginForm: {
    textAlign: "center",
    contentAlign: "center",
  },
  pageTitle: {
    textAlign: "left",
    fontFamily: "Raleway",
    fontWeight: 400,
  },
  loginIcon: {
    margin: 10,
  },
  textField: {
    fontFamily: "Arial",
    color: "white",
    width: "200x",
  },
  loginButton: {
    position: "relative",
    marginTop: 20,
  },
  generalError: {
    color: "#FF0000",
  },
  progressBar: {
    postition: "absolute",
  },
  inputArea: {
    backgroundColor: "rgba(0, 0, 0, 0.6); ",
    borderRadius: 10,
    padding: "10px 10px 30px 10px",
  },
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
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
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
};
export default withStyles(useStyles)(login);
