import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import axios from "axios";
import Scream from "../components/scream";
class home extends Component {
  state = {
    screams: null,
  };

  componentDidMount() {
    axios
      .get("/scream")
      .then((res) => {
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let recentScreams = this.state.screams ? (
      this.state.screams.map((scream) => {
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
        <Grid item sm={1} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
