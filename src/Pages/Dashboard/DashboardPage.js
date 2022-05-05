import { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Typography, Grid, Stack } from '@mui/material';
import { format, startOfQuarter, endOfQuarter, subMonths, startOfYear, endOfYear, subYears, startOfMonth, endOfMonth, subDays } from 'date-fns';

import SecondaryLayout from '../../UI/Layouts/SecondaryLayout';
import { AuthContext } from 'Context/Auth/AuthProvider';
import { PersonalScore, TeamQueue, StackUp,MessagesGraphs } from 'UI/Widgets/Dashboard'

import { getStats } from 'Api/Endpoints'
import { useStats } from 'Api/Hooks';
import { getFullName } from 'utils/Parser';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const stats = useStats();
  const [monthlyStats, setMontlyStats] = useState(null);
  const [quarterlyStats, setQuarterlyStats] = useState(null);
  const [yearlyStats, setYearlyStats] = useState(null);
  const [lastMonthStats, setLastMonthStates] = useState(null);
  const [lastQuarterStats, setLastQuarterStates] = useState(null);
  const [lastYearStats, setLastYearStates] = useState(null);
  const [last30DaysStats, setLast30DaysStats] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch this month stats first for faster loading
  useEffect(() => {
    if (!stats.loading && stats.items) {
      setMontlyStats(stats.items);
    }
  }, [stats.loading, stats.items]);

  const getArrayOfDates = useCallback(() => {
    const dates = [];
    const today = new Date();

    // this quarter
    const quarterStart = format(startOfQuarter(today), 'yyyy-MM-dd')
    const quarterEnd = format(endOfQuarter(today), 'yyyy-MM-dd')

    // last quarter
    const lastQuarterStart = format(startOfQuarter(subMonths(today, 3)), 'yyyy-MM-dd')
    const lastQuarterEnd = format(endOfQuarter(subMonths(today, 3)), 'yyyy-MM-dd')

    // this year
    const yearStart = format(startOfYear(today), 'yyyy-MM-dd')
    const yearEnd = format(endOfYear(today), 'yyyy-MM-dd')

    // last year
    const lastYearStart = format(startOfYear(subYears(today, 1)), 'yyyy-MM-dd')
    const lastYearEnd = format(endOfYear(subYears(today, 1)), 'yyyy-MM-dd')

    // last month
    const lastMonthStart = format(startOfMonth(subMonths(today, 1)), 'yyyy-MM-dd')
    const lastMonthEnd = format(endOfMonth(subMonths(today, 1)), 'yyyy-MM-dd')

    // last 30 days
    const last30Start = format(subDays(today, 30), 'yyyy-MM-dd')
    const last30End = format(today, 'yyyy-MM-dd')

    dates.push({ start: last30Start, end: last30End });
    dates.push({ start: quarterStart, end: quarterEnd });
    dates.push({ start: yearStart, end: yearEnd });
    dates.push({ start: lastMonthStart, end: lastMonthEnd });
    dates.push({ start: lastQuarterStart, end: lastQuarterEnd });
    dates.push({ start: lastYearStart, end: lastYearEnd });
    return dates;
  }, [])

  // get stats for each date using promise.allSettled
  useEffect(() => {
    const dates = getArrayOfDates();
    const promises = dates.map(date => getStats(date.start, date.end));
    Promise.allSettled(promises)
      .then(results => {
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const { table } = result.value[0];
            switch (index) {
              case 0:
                setLast30DaysStats(table);
                break;
              case 1:
                setQuarterlyStats(table);
                break;
              case 2:
                setYearlyStats(table);
                break;
              case 3:
                setLastMonthStates(table);
                break;
              case 4:
                setLastQuarterStates(table);
                break;
              case 5:
                setLastYearStates(table);
                break;
              default:
                break;
            }
          }
        })
        setLoading(false)
      })
  }, [getArrayOfDates]);

  const statsData = useMemo(() => {
    return [
      {
        id: 0,
        label: 'This Month',
        data: monthlyStats,
        loading: stats.loading,
      },
      {
        id: 1,
        label: 'Last 30 Days',
        data: last30DaysStats,
        loading: loading,
      },
      {
        id: 2,
        label: 'This Quarter',
        data: quarterlyStats,
        loading: loading,
      },
      {
        id: 3,
        label: 'This Year',
        data: yearlyStats,
        loading: loading,
      },
      {
        id: 4,
        label: 'Last Month',
        data: lastMonthStats,
        loading: loading,
      },
      {
        id: 5,
        label: 'Last Quarter',
        data: lastQuarterStats,
        loading: loading,
      },
      {
        id: 6,
        label: 'Last Year',
        data: lastYearStats,
        loading: loading,
      }
    ]
  }, [loading, monthlyStats, last30DaysStats, quarterlyStats, yearlyStats, lastMonthStats, lastQuarterStats, lastYearStats, stats.loading]);

  console.log(statsData);

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
          <MessagesGraphs stats={statsData} />
        </Grid>

        <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PersonalScore user={user} stats={monthlyStats} loading={stats.loading} />
          <StackUp stats={statsData} />
        </Grid>
      </Grid>
    </SecondaryLayout>
  )
}