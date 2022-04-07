import { Route } from 'react-router-dom'

import SettingsPage from 'Pages/Settings/SettingsPage'
import TagSettingsPage from 'Pages/Settings/TagSettingsPage'
import TeamMembersSettingsPage from 'Pages/Settings/TeamMembersSettingsPage'
import GradYearsSettingsPage from 'Pages/Settings/GradYearsSettingsPage'
import PositionsSettingsPage from 'Pages/Settings/PositionsSettingsPage'

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
        <Route
          exact
          path={settingsRoutes.team.gradYears}
          component={GradYearsSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.positions}
          component={PositionsSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.statuses}
          component={PositionsSettingsPage}
        />
    </>
)

export default SettingsRoutes
