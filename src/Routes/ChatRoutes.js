import { Route } from 'react-router-dom';

import { chatRoutes } from './Routes';
import ChatPage from 'Pages/Chat/ChatPage';

const ChatRoutes = (props) => (
  <>
    <Route
      exact
      path={chatRoutes.all}
      component={ChatPage}
    />
  </>
)

export default ChatRoutes;
