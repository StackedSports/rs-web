import { TweetCreatePage, TweetsPage, TweetDetailsPage } from 'Pages/Tweet';
import { Route } from 'react-router-dom';


import { routes, tweetRoutes } from './Routes';

const TweetRoutes = (props) => (
  <>
    <Route
      exact
      path={tweetRoutes.all}
      component={TweetsPage}
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
  </>
)

export default TweetRoutes
