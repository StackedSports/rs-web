import React, { useState, useEffect, useRef, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { scoresSchedulesRoutes } from 'Routes/Routes'
import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material'

import { search, searchEvent } from './PlaceholderData'

interface IProps {
  children?: JSX.Element[] | JSX.Element;
  actions?: unknown[]
}

export const BaseScoresSchedulesPage = (props: IProps) => {



  const { data: dataEvent } = searchEvent

  // TODO: add useMEMO to show boards when have the endpoint
  const sideFilters = [
    {
      id: 0,
      name: 'By School',
      items: [
        { id: 0, name: 'Search', path: scoresSchedulesRoutes.all },
        { id: 1, name: 'Schedule', path: scoresSchedulesRoutes.event }
      ]
    },
  ]

  return (
    <MainLayout
      title={'Scores & Schedules'}
      filters={sideFilters}
      actions={props.actions}
    >
      <Divider sx={{ mb: 3 }} />

      {props.children}

    </MainLayout>
  )
}
