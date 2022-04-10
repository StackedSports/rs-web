import { Route } from 'react-router-dom'

import { MainMediaPage, AllMediaPage, AllMediaPlaceholderPage, MediaDetailsPage, MediaPlaceholderDetailsPage } from 'Pages/Media/index'

import { mediaRoutes } from './Routes'

const MediaRoutes = (props) => (
  <>
    <Route
      exact
      path={mediaRoutes.all}
      component={MainMediaPage}
    />
    <Route
      exact
      path={`${mediaRoutes.media}`}
      component={AllMediaPage}
    />
    <Route
      exact
      path={`${mediaRoutes.placeholders}`}
      component={AllMediaPlaceholderPage}
    />
    <Route
      exact
      path={`${mediaRoutes.mediaDetails}/:id`}
      component={MediaDetailsPage}
    />
    <Route
      exact
      path={`${mediaRoutes.placeholderDetails}/:id`}
      component={MediaPlaceholderDetailsPage}
    />
  </>
)

export default MediaRoutes
