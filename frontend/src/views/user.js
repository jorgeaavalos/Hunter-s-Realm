import React, { Component } from "react";
import propTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream";
import StaticProfile from "../components/StaticProfile";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getUserData } from "../redux/actions/dataAction";
import { connect } from "react-redux";
export class user extends Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const userName = this.props.match.params.userName;
    this.props.getUserData(userName);

    axios
      .get(`/user/${userName}`)
      .then((res) => {
        console.log(res.data.user);
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const screamMarkup = loading ? (
      <p>Loading Data...</p>
    ) : screams === null ? (
      <p>No Screams from this user</p>
    ) : (
      screams.map((scream) => {
        return <Scream key={scream.screamId} scream={scream} />;
      })
    );

    const profileMarkup =
      this.state.profile === null ? (
        <p>Loading Profile</p>
      ) : (
        <StaticProfile profile={this.state.profile}></StaticProfile>
      );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profileMarkup}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
