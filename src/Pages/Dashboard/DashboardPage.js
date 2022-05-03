import { useContext } from 'react';
import { Typography, Grid, Stack } from '@mui/material';

import SecondaryLayout from '../../UI/Layouts/SecondaryLayout';
import { TeamQueue } from 'UI/Widgets/Dashboard/TeamQueue'
import { AuthContext } from 'Context/Auth/AuthProvider';

import { getFullName } from 'utils/Parser';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const onTopActionClick = () => {
    console.log('onTopActionClick')
  }

  return (
    <SecondaryLayout
      topActionName="+ New"
      onTopActionClick={onTopActionClick}
    >
      <Grid container spacing={3}>
        <Grid item component={Stack} xs={12} lg={8} gap={2} direction='column'>
          <Typography variant="h4">Welcome Back {getFullName(user)} </Typography>
          <TeamQueue />
        </Grid>
        <Grid item xs={12} lg={4}>
        </Grid>
      </Grid>
    </SecondaryLayout>
  )
}