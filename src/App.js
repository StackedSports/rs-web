import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// import { ThemeProvider } from '@mui/styles';

import Signup from "./components/signup";
import Dashboard from "./components/dashboard/index";
import Contacts from "./Pages/Contacts";
import Chat from "./Pages/Chat";

import Test from './Pages/Test'

import Media from "./Pages/Media";
import MessageCreate from "./Pages/MessageCreate";
import UserProfile from "./Pages/UserProfile";
import TweetCreate from "./Pages/TweetCreate";
import TeamSettings from "./Pages/TeamSettings";

import NewDashboard from "./Pages/Dashboard";

import TwitterStream from './components/TwitterStream/TwitterStream'
import MediaC from "./components/MediaComponent/Media";

import MessageCreatePage from 'Pages/Messages/MessageCreatePage'

import {
	ContactsRoutes,
	MessagesRoutes,
	MediaRoutes,
	SettingsRoutes,
	UserSettingsRoutes,
	routes,
	TweetRoutes,
	ChatRoutes
} from 'Routes'

import ThemeProvider from 'Theme/ThemeProvider'
import AppProvider from 'Context/AppProvider'
import { chatRoutes } from "Routes/Routes";

function App() {
	return (
		<ThemeProvider>
			<AppProvider>
				<div className="body">
					<Switch>
						<Route path="/" exact component={Signup} />
						<Route path="/olddashboard" exact component={Dashboard} />
						<Route path="/olddashboard/:user" exact component={Dashboard} />
						<Route path="/oldcontacts" exact component={Contacts} />
						<Route path="/chat" exact component={Chat} />

						<Route path="/oldmedia" exact component={Media} />
						<Route path="/tweet-create" exact component={TweetCreate} />

						<Route path="/contact-profile/:id" exact component={UserProfile} />
						<Route path="/message-create" exact component={MessageCreatePage} />
						<Route path="/team-settings" exact component={TeamSettings} />
						<Route path="/team-settings/:userID" exact component={TeamSettings} />
						<Route path="/twitter-stream" exact component={TwitterStream} />
						<Route path="/Media-component" exact component={MediaC} />

						<Route path='/test' component={Test} />

						<Route path={routes.contacts.path} component={ContactsRoutes} />
						<Route path={routes.messages.path} component={MessagesRoutes} />
						<Route path={routes.media.path} component={MediaRoutes} />
						<Route path={routes.settings.path} component={SettingsRoutes} />
						<Route path={routes.userSettings.path} component={UserSettingsRoutes} />
						<Route path={routes.dashboard.path} component={NewDashboard} />
						<Route path={routes.tweet.path} component={TweetRoutes} />
						<Route path={chatRoutes.all} component={ChatRoutes} />
					</Switch>
				</div>
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
