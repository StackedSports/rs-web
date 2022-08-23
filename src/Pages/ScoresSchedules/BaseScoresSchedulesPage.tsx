import React, { useState, useEffect, useRef, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { scoresSchedulesRoutes } from 'Routes/Routes'
import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import {LoginCollegeWarroomApi, SearchCollegeWarroomApi} from 'Api/CollegeWarroomApi'

export const BaseScoresSchedulesPage = () => {

  // TODO: add useMEMO to show boards when have the endpoint
  const sideFilters = [
    {
      id: 0,
      name: 'By School',
      items: [
        { id: 0, name: 'Search', path: scoresSchedulesRoutes.all },
        { id: 1, name: 'Schedule', path: scoresSchedulesRoutes.all }
      ]
    },
  ]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    SearchCollegeWarroomApi({...data , access_token:""}) // add token when login
  };

  return (
    <MainLayout
      title={'Scores & Schedules'}
      filters={sideFilters}
    >
      <Divider />
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
      <Button onClick={()=>LoginCollegeWarroomApi()}>
        Login api!
      </Button>

    </MainLayout>
  )
}
