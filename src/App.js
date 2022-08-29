import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./App.css";

import Signup from "Pages/Auth/SignUp";
// import Dashboard from "./components/dashboard/index";
// import Contacts from "./Pages/Contacts";
// import Chat from "./Pages/Chat";

import StuckMessages from './Pages/AdminPanel/StuckMessages'
import NewDashboard from "./Pages/Dashboard";

// import MessageCreatePage from 'Pages/Messages/MessageCreatePage'

import FirebaseDataCollection from 'Api/Firebase/FirebaseDataCollection'

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
					<FirebaseDataCollection>
						<div className="body">
							<Switch>
								{/** Only Route left from old code */}
								{/* <Route path="/twitter-stream" exact component={TwitterStream} /> */}

								{/** New Routes */}
								{/* <Route path="/tweet-create" exact component={TweetCreate} /> */}
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

								<Route path="/super" component={StuckMessages}/>
							</Switch>
						</div>
					</FirebaseDataCollection>
				</AppProvider>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
