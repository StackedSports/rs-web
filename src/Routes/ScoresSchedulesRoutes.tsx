import { Route } from 'react-router-dom';
import { scoresSchedulesRoutes } from './Routes';
import { BaseScoresSchedulesPage } from 'Pages/ScoresSchedules/BaseScoresSchedulesPage';

import React from 'react'

export const ScoresSchedulesRoutes = () => {
    return (
        <Route
            exact
            path={scoresSchedulesRoutes.all}
            component={BaseScoresSchedulesPage}
        />
    )
}

export default ScoresSchedulesRoutes
