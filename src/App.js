import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./App.css";

//import Signup from "./components/signup";
import Signup from "Pages/Auth/SignUp";
// import Dashboard from "./components/dashboard/index";
// import Contacts from "./Pages/Contacts";
// import Chat from "./Pages/Chat";

import Test from './Pages/Test'

// import Media from "./Pages/Media";
// import MessageCreate from "./Pages/MessageCreate";
// import UserProfile from "./Pages/UserProfile";
// import TeamSettings from "./Pages/TeamSettings";

import NewDashboard from "./Pages/Dashboard";

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
import { TweetCreatePage } from "Pages/Tweet";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60000,
			refetchOnWindowFocus: false,
		}
	}
})

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<div className="body">
						<Switch>
							{/** Only Route left from old code */}

							{/** New Routes */}
							<Route path='/test' component={Test} />
							<Route path="/" exact component={Signup} />
							<Route path={routes.contacts.path} component={ContactsRoutes} />
							<Route path={routes.messages.path} component={MessagesRoutes} />
							<Route path={routes.media.path} component={MediaRoutes} />
							<Route path={routes.settings.path} component={SettingsRoutes} />
							<Route path={routes.userSettings.path} component={UserSettingsRoutes} />
							<Route path={routes.dashboard.path} component={NewDashboard} />
							<Route path={routes.tweet.path} component={TweetRoutes} />
							<Route path={routes.tweetPost.path} component={TweetCreatePage} />
							<Route path={chatRoutes.all} component={ChatRoutes} />
						</Switch>
					</div>
				</AppProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
