import { Route } from 'react-router-dom';

import {
  TweetRankingPage,
  TweetCreatePage
} from 'Pages/Tweet';

import { routes, tweetRoutes } from './Routes';

const TweetRoutes = (props) => (
  <>
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
