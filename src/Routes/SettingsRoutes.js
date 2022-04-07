import { Route } from 'react-router-dom'

import SettingsPage from 'Pages/Settings/SettingsPage'
import TagSettingsPage from 'Pages/Settings/TagSettingsPage'
import TeamMembersSettingsPage from 'Pages/Settings/TeamMembersSettingsPage'
import GradYearsSettingsPage from 'Pages/Settings/GradYearsSettingsPage'
import PositionsSettingsPage from 'Pages/Settings/PositionsSettingsPage'
import StatusesSettingsPage from 'Pages/Settings/StatusesSettingsPage'
import RanksSettingsPage from 'Pages/Settings/RanksSettingsPage'
import SnippetsSettingsPage from 'Pages/Settings/SnippetsSettingsPage'
import PlatformsSettingsPage from 'Pages/Settings/PlatformsSettingsPage'
import PlaceholdersSettingsPage from 'Pages/Settings/PlaceholdersSettingsPage'
import SendCoachTypesSettingsPage from 'Pages/Settings/SendCoachTypesSettingsPage'
import PeopleTypesSettingsPage from 'Pages/Settings/PeopleTypesSettingsPage'

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
          component={StatusesSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.ranks}
          component={RanksSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.snippets}
          component={SnippetsSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.platforms}
          component={PlatformsSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.placeholders}
          component={PlaceholdersSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.getSendCoachTypes}
          component={SendCoachTypesSettingsPage}
        />
        <Route
          exact
          path={settingsRoutes.team.peopleTypes}
          component={PeopleTypesSettingsPage}
        />
    </>
)

export default SettingsRoutes
