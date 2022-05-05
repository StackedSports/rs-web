import { useContext } from 'react';
import { Typography, Grid, Stack } from '@mui/material';

import SecondaryLayout from '../../UI/Layouts/SecondaryLayout';
import { AuthContext } from 'Context/Auth/AuthProvider';
import { PersonalScore, TeamQueue, StackUp } from 'UI/Widgets/Dashboard'

import { useStats } from 'Api/Hooks';

import { getFullName } from 'utils/Parser';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const stats = useStats();

  console.log(user)
  console.log("Stats: ", stats);

  const onTopActionClick = () => {
    console.log('onTopActionClick')
  }

  return (
    <SecondaryLayout
      topActionName="+ New"
      onTopActionClick={onTopActionClick}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h4" fontWeight='bold'>Welcome Back {getFullName(user)} </Typography>
          <TeamQueue />
        </Grid>

        <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PersonalScore user={user} stats={stats} />
          <StackUp stats={stats} />
        </Grid>
      </Grid>
    </SecondaryLayout>
  )
}