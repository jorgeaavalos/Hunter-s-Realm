import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Views
import home from "./views/home";
import login from "./views/login";
import signUp from "./views/signUp";
//Components
import Navbar from "./components/navBar";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#cfcfcf",
      main: "#9e9e9e",
      dark: "#707070",
      contrastText: "#FFFFFF",
    },
  },
});

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div id="component-container" className="App">
          <Router>
            <Navbar />
            <div color="Primary">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/home" component={home} />
                <Route path="/login" component={login} />
                <Route path="/signup" component={signUp} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
