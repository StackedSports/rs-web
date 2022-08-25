import React from 'react'
import { BaseScoresSchedulesPage } from './BaseScoresSchedulesPage'
import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { search } from './PlaceholderData'

export const SearchPage = () => {

    //test data
    const { data } = search
    const responseSearch = data[0] || {}

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //call api
    };

    return (
        <BaseScoresSchedulesPage>
            <Typography variant='h6' fontWeight='bold' textAlign='center' mt={2} mb={3} >
                Enter a High School Name or ETS Number
            </Typography>

            <Stack
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >

                <TextField
                    placeholder="Search High School"
                    name="search"
                    fullWidth
                    sx={{
                        bgcolor: '#f3f4f8',
                        color: '#888',
                        borderRadius: '5px',
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}

                />
                <Button
                    variant='contained'
                    type='submit'
                    size='large'
                    sx={{ ml: 'auto', alignSelf: 'flex-end' }}
                    startIcon={<AutoFixHighIcon />}
                >
                    View Scores & Schedules
                </Button>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
                <Stack color='text.secondary' gap={2}>
                    <Typography variant='h6' fontWeight='800' >
                        {responseSearch.name}
                    </Typography>
                    <Box>
                        <Typography fontWeight='bold' fontSize={18} >
                            Location
                        </Typography>
                        <Typography fontWeight='600' fontSize={13} >
                            {responseSearch.address}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography fontWeight='bold' fontSize={18} >
                            ETS
                        </Typography>
                        <Typography fontWeight='600' fontSize={13} >
                            {responseSearch.ets_code}
                        </Typography>
                    </Box>
                </Stack>

                <Button
                    variant='contained'
                    endIcon={<AutoFixHighIcon />}
                >
                    Action
                </Button>
            </Stack>
        </BaseScoresSchedulesPage>
    )
}
