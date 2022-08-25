import { Route } from 'react-router-dom';
import { scoresSchedulesRoutes } from './Routes';
import { SearchPage } from 'Pages/ScoresSchedules/SearchPage';
import { EventPage } from 'Pages/ScoresSchedules/EventPage';

import React from 'react'

export const ScoresSchedulesRoutes = () => {
    return (
        <>
            <Route
                exact
                path={scoresSchedulesRoutes.all}
                component={SearchPage}
            />
            <Route
                exact
                path={scoresSchedulesRoutes.event}
                component={EventPage}
            />
        </>
    )
}

export default ScoresSchedulesRoutes
