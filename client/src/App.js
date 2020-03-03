import React from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import UpdateCommands from './components/Commands'
import { CssBaseline } from "@material-ui/core";
import "./App.css";
import Map from "./components/Map";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />

      <Map />
      <UpdateCommands/>
    </div>
  );
};

export default withRouter(App);
