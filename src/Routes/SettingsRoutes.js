import { Route } from 'react-router-dom'

import SettingsPage from 'Pages/Settings/SettingsPage'
import TagSettingsPage from 'Pages/Settings/TagSettingsPage'
import TeamMembersSettingsPage from 'Pages/Settings/TeamMembersSettingsPage'

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
          component={TeamMembersSettingsPage}
        />
    </>
)

export default SettingsRoutes
