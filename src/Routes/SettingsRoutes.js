import { Route } from 'react-router-dom'

import {
  SettingsPage,
  OrganizationSettingsPage,
  TeamMembersSettingsPage,
  TeamMemberProfilePage,
  PositionsSettingsPage,
  StatusesSettingsPage,
  RanksSettingsPage,
  SnippetsSettingsPage,
  MediaTagsSettingsPage,
  ContactsTagsSettingsPage,
  MessageTagsSettingsPage,
  // TagSettingsPage,
  // GradYearsSettingsPage,
  // BoardSettingsPage,
} from 'Pages/Settings'

import { settingsRoutes } from './Routes'

const SettingsRoutes = (props) => (
  <>
    <Route
      exact
      path={settingsRoutes.main}
      component={OrganizationSettingsPage}
    // component={SettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.general.organization}
      component={OrganizationSettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.general.members}
      component={TeamMembersSettingsPage}
    />
    <Route
      exact
      path={`${settingsRoutes.general.member}/:id`}
      component={TeamMemberProfilePage}
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
      path={settingsRoutes.tags.mediaTags}
      component={MediaTagsSettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.tags.contactsTags}
      component={ContactsTagsSettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.tags.messageTags}
      component={MessageTagsSettingsPage}
    />

    {/* <Route
      exact
      path={settingsRoutes.team.tags}
      component={TagSettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.team.gradYears}
      component={GradYearsSettingsPage}
    />
    <Route
      exact
      path={settingsRoutes.team.platforms}
      component={BoardSettingsPage}
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
    /> */}
  </>
)

export default SettingsRoutes
