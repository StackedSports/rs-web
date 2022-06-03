import { Route } from 'react-router-dom';

import {
  TweetRankingPage,
  TweetCreatePage,
  TweetsPage
} from 'Pages/Tweet';

import { routes, tweetRoutes } from './Routes';

const TweetRoutes = (props) => (
  <>
    <Route
      exact
      path={tweetRoutes.tweets}
      component={TweetsPage}
    />
    <Route
      exact
      path={tweetRoutes.ranking}
      component={TweetRankingPage}
    />
  </>
)

export default TweetRoutes;
