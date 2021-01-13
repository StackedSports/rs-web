import React, { useState } from "react";
import "./App.css";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/dashboard/Home";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="body">
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
