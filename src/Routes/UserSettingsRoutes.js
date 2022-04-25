import { Route } from 'react-router-dom'

import {
  OrganizationSettingsPage,
} from 'Pages/Settings'

import { routes, userRoutes } from './Routes'
import UserSettingsPage from 'Pages/Settings/UserSettingsPage'

const UserSettingsRoutes = (props) => (
  <>
    <Route
      exact
      path={routes.userSettings.path}
      component={UserSettingsPage}
    // component={SettingsPage}
    />
    <Route
      exact
      path={userRoutes.account}
      component={OrganizationSettingsPage}
    />
    <Route
      exact
      path={userRoutes.notifications}
      component={OrganizationSettingsPage}
    />
  </>
)

export default UserSettingsRoutes
