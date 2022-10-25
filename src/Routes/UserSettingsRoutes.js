import { Route } from 'react-router-dom';

import { routes, userRoutes } from './Routes';
import {
  UserSettingsPage,
  UserSettingsProfilePage,
  UserSettingsAccountPage,
  UserSettingsNotificationsPage,
  UserSettingsPreferencesPage
} from 'Pages/UserSettings';

const UserSettingsRoutes = (props) => (
  <>
    <Route
      exact
      path={routes.userSettings.path}
      component={UserSettingsPage}
    />
    <Route
      exact
      path={userRoutes.profile}
      component={UserSettingsProfilePage}
    />
    <Route
      exact
      path={userRoutes.account}
      component={UserSettingsAccountPage}
    />
    <Route
      exact
      path={userRoutes.preferences}
      component={UserSettingsPreferencesPage}
    />
    {/* <Route
      exact
      path={userRoutes.notifications}
      component={UserSettingsNotificationsPage}
    /> */}
    {/* <Route
      exact
      path={userRoutes.twitterLinkCallback}
    /> */}
  </>
)

export default UserSettingsRoutes
