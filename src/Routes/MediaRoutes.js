import { Route } from 'react-router-dom'

 import MainMediaPage from 'Pages/Media/MainMediaPage'

import { mediaRoutes } from './Routes'

const MediaRoutes = (props) => (
    <>
        <Route
          exact
          path={mediaRoutes.all}
          component={MainMediaPage}
        />
        {/* <Route
          // exact
          path={`${mediaRoutes.media}`}
          component={MessageCreatePage}
        />
        <Route
          // exact
          path={`${mediaRoutes.placeholders}`}
          component={MessageCreatePage}
        />
        <Route
          // exact
          path={`${mediaRoutes.mediaDetails}/:id`}
          component={MessageDetailsPage}
        />
        <Route
          // exact
          path={`${mediaRoutes.placeholderDetails}/:id`}
          component={MessageEditPage}
        /> */}
    </>
)

export default MediaRoutes
