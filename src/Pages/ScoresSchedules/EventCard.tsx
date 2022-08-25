import { Box, Paper, Typography, Stack, Divider, Button } from '@mui/material'
import React from 'react'
import { formatDate } from 'utils/Parser'

import { IDataEvent } from './PlaceholderData'

interface IEventCardProps {
    event: IDataEvent
}

export const EventCard = ({ event }: IEventCardProps) => {
    return (
        <Paper sx={{ p: 2 }} variant='outlined' component={Stack} gap={2} >
            <Typography>
                {`${event.name} - ${formatDate(event.event_time, 'medium', 'short')}`}
            </Typography>

            <Stack direction='row' justifyContent='space-between' >
                <Stack direction='row' gap={1}>
                    <Typography>
                        <img src={event.team1_logo_url} />
                    </Typography>
                    <Typography>
                        {event.home_team_name}
                    </Typography>
                </Stack>
                <Typography>
                    {event.team1_score || 0}
                </Typography>
            </Stack>

            <Stack direction='row' justifyContent='space-between' >
                <Stack direction='row' gap={1}>
                    <Typography>
                        <img src={event.team2_logo_url} />
                    </Typography>
                    <Typography>
                        {event.away_team_name}
                    </Typography>
                </Stack>
                <Typography>
                    {event.team1_score || 0}
                </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction='row' justifyContent='space-between' >
                <Button color='inherit' >
                    Recruits (6)
                </Button>
                <Button color='inherit' >
                    Verify Score
                </Button>
            </Stack>
        </Paper>
    )
}
