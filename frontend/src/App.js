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
      light: "#2c2c2c",
      main: "#000000",
      dark: "#000000",
      contrastText: "white",
    },
    secondary: {
      light: "#2c2c2c",
      main: "#FFFFFF",
      dark: "#000000",
      contrastText: "white",
    },
  },
});

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container" color="primary">
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
