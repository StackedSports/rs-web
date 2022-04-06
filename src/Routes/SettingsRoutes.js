import { Route } from 'react-router-dom'

import SettingsPage from 'Pages/Settings/SettingsPage'

import { settingsRoutes } from './Routes'

const SettingsRoutes = (props) => (
    <>
        <Route
          exact
          path={settingsRoutes.main}
          component={SettingsPage}
        />
    </>
)

export default SettingsRoutes
