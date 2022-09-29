import { TweetCreatePage, TweetsPage, TweetDetailsPage } from 'Pages/Tweet';
import { Route, Switch } from 'react-router-dom';


import { routes, tweetRoutes } from './Routes';

const TweetRoutes = (props) => (
  <Switch>
    
    <Route
      exact
      path={tweetRoutes.create}
      component={TweetCreatePage}
    />
    <Route
      exact
      path={`${tweetRoutes.details}/:id`}
      component={TweetDetailsPage}
    />
    <Route
      path={tweetRoutes.all}
      component={TweetsPage}
    />
  </Switch>
)

export default TweetRoutes
