import { Route } from 'react-router-dom';

import {
  TweetRankingPage,
  TweetRankingDetailsPage,
  TweetsArchivedPage,
  TweetsPage
} from 'Pages/TweetRanking';

import { routes, tweetRankingRoutes } from './Routes';

const TweetRankingRoutes = (props) => (
  <>
    <Route
      exact
      path={tweetRankingRoutes.tweets}
      component={TweetsPage}
    />
    <Route
      exact
      path={tweetRankingRoutes.archived}
      component={TweetsArchivedPage}
    />
    <Route
      exact
      path={tweetRankingRoutes.ranking}
      component={TweetRankingPage}
    />
    <Route
      exact
      path={`${tweetRankingRoutes.details}/:tweetId`}
      component={TweetRankingDetailsPage}
    />
  </>
)

export default TweetRankingRoutes
