import { Route } from 'react-router-dom';

import {
  TweetSearchPage,
  TweetsReportsPage
} from 'Pages/TweetReports';

import {
  TweetCreatePage,
  TweetDetailsPage,
  TweetsPage
} from 'Pages/Tweet';

import { tweetRoutes } from './Routes';

const TweetRoutes = (props) => (
  <>
    <Route
      exact
      path={tweetRoutes.reports}
      component={TweetsReportsPage}
    />
    <Route
      exact
      path={tweetRoutes.search}
      component={TweetSearchPage}
    />
    <Route
      exact
      path={tweetRoutes.create}
      component={TweetCreatePage}
    />
    <Route
      exact
      path={tweetRoutes.details}
      component={TweetDetailsPage}
    />
    <Route
      exact
      path={tweetRoutes.all}
      component={TweetsPage}
    />
  </>
)

export default TweetRoutes;
