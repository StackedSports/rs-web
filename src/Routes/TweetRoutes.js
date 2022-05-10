import { Route } from 'react-router-dom';

import TweetRankingPage from 'Pages/Tweet/TweetRankingPage';
import { routes } from './Routes';

const TweetRoutes = (props) => (
  <>
    <Route
      exact
      path={routes.tweet.path}
      component={TweetRankingPage}
    />
  </>
)

export default TweetRoutes;
