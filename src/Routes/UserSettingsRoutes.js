import { Route } from 'react-router-dom'

import {
  OrganizationSettingsPage,
} from 'Pages/Settings'

import { routes, userRoutes } from './Routes'
import {
  UserSettingsPage,
  UserSettingsProfilePage,
  UserSettingsAccountPage,
  UserSettingsNotificationsPage
} from 'Pages/Settings'

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
      path={userRoutes.notifications}
      component={UserSettingsNotificationsPage}
    />
  </>
)

export default UserSettingsRoutes
