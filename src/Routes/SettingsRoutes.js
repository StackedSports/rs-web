import { Route } from 'react-router-dom'

import SettingsPage from 'Pages/Settings/SettingsPage'
import TagSettingsPage from 'Pages/Settings/TagSettingsPage'
import MembersSettingsPage from 'Pages/Settings/MembersSettingsPage'

import { settingsRoutes } from './Routes'

const SettingsRoutes = (props) => (
    <>
        <Route
          exact
          path={settingsRoutes.main}
          component={SettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.tags}
          component={TagSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.members}
          component={MembersSettingsPage}
        />
    </>
)

export default SettingsRoutes
