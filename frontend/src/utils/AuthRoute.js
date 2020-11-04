import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Redirect to="/" /> : <Component {...props} />
    }
  ></Route>
);

const mapStatetoProps = (state) => ({
  auth: state.user.auth,
});
export default connect(mapStatetoProps)(AuthRoute);
