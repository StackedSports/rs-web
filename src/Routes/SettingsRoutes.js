import { Route } from 'react-router-dom'

import {
  SettingsPage,
  OrganizationSettingsPage,
  TagSettingsPage,
  TeamMembersSettingsPage,
  GradYearsSettingsPage,
  PositionsSettingsPage,
  StatusesSettingsPage,
  RanksSettingsPage,
  SnippetsSettingsPage,
  BoardSettingsPage,
} from 'Pages/Settings'

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
      path={settingsRoutes.general.organization}
      component={OrganizationSettingsPage}
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
      component={BoardSettingsPage}
    />
    {/* <Route
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
        /> */}
  </>
)

export default SettingsRoutes
