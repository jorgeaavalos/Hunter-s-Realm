import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import axios from "axios";
import Scream from "../components/scream";
import Profile from "../components/profile";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";
class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreams = !loading ? (
      screams.map((scream) => {
        return <Scream key={scream.screamId} scream={scream} />;
      })
    ) : (
      <p>Loading Screams</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={7} xs={12}>
          {recentScreams}
        </Grid>
        <Grid item sm={5} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
