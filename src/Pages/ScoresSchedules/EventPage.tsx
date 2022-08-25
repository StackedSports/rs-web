import { Grid, Stack } from '@mui/material'
import React from 'react'
import { BaseScoresSchedulesPage } from './BaseScoresSchedulesPage'
import { EventCard } from './EventCard'
import { searchEvent } from './PlaceholderData'
import { GridView } from '@mui/icons-material'

export const EventPage = () => {
    const { data } = searchEvent

    const actions = [
        {
            variant: 'outlined',
            type: 'icon',
            icon: GridView,
        }
    ]

    return (
        <BaseScoresSchedulesPage actions={actions} >
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