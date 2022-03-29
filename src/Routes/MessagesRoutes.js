import { Route } from 'react-router-dom'

// import AuthPage from 'main/pages/auth/AuthPage'
// import LoginPage from 'main/pages/auth/LoginPage'
// import SignUpPage from 'main/pages/auth/SignUpPage'
// import PasswordPage from 'main/pages/auth/PasswordPage'

import MessageCreatePage from 'Pages/Messages/MessageCreatePage'
import MessageDetailsPage from 'Pages/Messages/MessageDetailsPage'
import MessageEditPage from 'Pages/Messages/MessageEditPage'
import MessagesPage from 'Pages/Messages/MessagesPage'

import { messageRoutes } from './Routes'

const MessagesRoutes = (props) => (
    <>
        <Route
          exact
          path={messageRoutes.create}
          component={MessageCreatePage}
        />
        <Route
          exact
          path={`${messageRoutes.details}/:id`}
          component={MessageDetailsPage}
        />
        <Route
          exact
          path={`${messageRoutes.edit}/:id`}
          component={MessageEditPage}
        />
        <Route
          exact
          path={messageRoutes.all}
          component={MessagesPage}
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

export default MessagesRoutes
