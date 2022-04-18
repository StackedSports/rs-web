import { Route } from 'react-router-dom'

import ContactsPage from 'Pages/Contacts/ContactsPage'
import ContactsProfilePage from 'Pages/Contacts/ContactsProfilePage'
import BoardPage from 'Pages/Contacts/BoardPage'

import { routes, contactsRoutes } from './Routes'

const ContactsRoutes = (props) => (
  <>
    <Route
      exact
      path={routes.contacts.path}
      component={ContactsPage}
    />
    <Route
      exact
      path={`${contactsRoutes.board}/:boardId`}
      component={BoardPage}
    />
    <Route
      exact
      path={`${contactsRoutes.profile}/:id`}
      component={ContactsProfilePage}
    />
  </>
)

export default ContactsRoutes
