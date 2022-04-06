import { Route } from 'react-router-dom'

import ContactsPage from 'Pages/Contacts/ContactsPage'

import { routes } from './Routes'

const ContactsRoutes = (props) => (
    <>
        <Route
          exact
          path={routes.contacts.path}
          component={ContactsPage}
        />
    </>
)

export default ContactsRoutes
