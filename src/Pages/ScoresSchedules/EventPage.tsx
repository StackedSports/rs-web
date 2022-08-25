import { Grid, Stack } from '@mui/material'
import React from 'react'
import { BaseScoresSchedulesPage } from './BaseScoresSchedulesPage'
import { EventCard } from './EventCard'
import { searchEvent } from './PlaceholderData'

export const EventPage = () => {
    const { data } = searchEvent

    return (
        <BaseScoresSchedulesPage>
            <Grid container spacing={2}>
                {
                    data.map((data, index) => {
                        return (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                md={6}
                            >
                                <EventCard event={data} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </BaseScoresSchedulesPage>
    )
}