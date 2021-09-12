import React, { useState } from "react";
import "./App.css";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/index";
import Contacts from "./Pages/Contacts";
import Chat from "./Pages/Chat";

import Media from "./Pages/Media";
import MessageCreate from "./Pages/MessageCreate";
import UserProfile from "./Pages/UserProfile";
import TweetCreate from "./Pages/TweetCreate";
import TeamSettings from "./Pages/TeamSettings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function App() {
  return (
    <div className="body">
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/:user" exact component={Dashboard} />
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/chat" exact component={Chat} />

          <Route path="/media" exact component={Media} />
          <Route path="/tweet-create" exact component={TweetCreate} />

          <Route path="/contact-profile" exact component={UserProfile} />
          <Route path="/message-create" exact component={MessageCreate} />
          <Route path="/team-settings" exact component={TeamSettings} />
          <Route path="/team-settings/:userID" exact component={TeamSettings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
