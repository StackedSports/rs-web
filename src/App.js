import React, { useState } from "react";
import "./App.css";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/index";
import Contacts from "./Pages/Contacts";
import Media from "./Pages/Media";
import MessageCreate from "./Pages/MessageCreate";
import UserProfile from "./Pages/UserProfile";
import TweetCreate from "./Pages/TweetCreate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="body">
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/media" exact component={Media} />
          <Route path="/tweet-create" exact component={TweetCreate} />

          <Route path="/contact-profile" exact component={UserProfile} />
          <Route path="/message-create" exact component={MessageCreate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
