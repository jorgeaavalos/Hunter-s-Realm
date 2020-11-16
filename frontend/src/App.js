import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";
import jwtDecode from "jwt-decode";
//Views
import home from "./views/home";
import login from "./views/login";
import signUp from "./views/signUp";
import user from "./views/user";
//Components
import AuthRoute from "./utils/AuthRoute";
import Navbar from "./components/navBar";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userAction";
import { SET_AUTHENTICATED } from "./redux/types";
import Axios from "axios";
const theme = createMuiTheme(themeFile);

const token = localStorage.FBidToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div id="component-container" className="App">
            <Router>
              <Navbar />
              <div color="Primary">
                <Switch>
                  <Route exact path="/" component={home} />
                  <Route exact path="/home" component={home} />

                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signUp} />

                  <Route exact path="/user/:userName" component={user} />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
