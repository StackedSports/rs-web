import { Route } from 'react-router-dom';

import {
  TweetRankingPage,
  TweetCreatePage,
  TweetsPage
} from 'Pages/Tweet';

import { tweetRoutes } from './Routes';

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
    <Route
      exact
      path={tweetRoutes.create}
      component={TweetCreatePage}
    />
  </>
)

export default TweetRoutes;
