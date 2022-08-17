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
import StuckMessages from './Pages/AdminPanel/StuckMessages'

// import Media from "./Pages/Media";
// import MessageCreate from "./Pages/MessageCreate";
// import UserProfile from "./Pages/UserProfile";
import TweetCreate from "./Pages/TweetCreate";
// import TeamSettings from "./Pages/TeamSettings";

import NewDashboard from "./Pages/Dashboard";

import TwitterStream from './components/TwitterStream/TwitterStream'
// import MediaC from "./components/MediaComponent/Media";

// import MessageCreatePage from 'Pages/Messages/MessageCreatePage'

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
							<Route path="/twitter-stream" exact component={TwitterStream} />

							{/** New Routes */}
							<Route path="/tweet-create" exact component={TweetCreate} />
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
							
							<Route path='/test' component={Test} />
							<Route path="/super" component={StuckMessages}/>
						</Switch>
					</div>
				</AppProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
