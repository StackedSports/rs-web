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
        {/* <Route
          exact
          path="/auth/login"
          render={(props) => <LoginPage/>}
        />
        <Route
          exact
          path="/auth/signup"
          render={(props) => <SignUpPage/>}
        />
        <Route
          exact
          path="/auth/password"
          render={(props) => <PasswordPage/>}
        /> */}
    </>
)

export default ContactsRoutes
