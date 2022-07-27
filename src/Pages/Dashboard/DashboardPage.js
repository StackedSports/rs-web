import { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { format, startOfQuarter, endOfQuarter, subMonths, startOfYear, endOfYear, subYears, startOfMonth, endOfMonth, subDays } from 'date-fns';
import { useHistory } from 'react-router-dom';

import SecondaryLayout from '../../UI/Layouts/SecondaryLayout';
import { AuthContext } from 'Context/Auth/AuthProvider';
import { PersonalScore, TeamQueue, StackUp, MessagesGraphs } from 'UI/Widgets/Dashboard'

import { getStats } from 'Api/Endpoints'
import { useStats } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser';

export const DashboardPage = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [monthlyStats, setMontlyStats] = useState({ data: null, loading: true });
  const [quarterlyStats, setQuarterlyStats] = useState({ data: null, loading: false });
  const [yearlyStats, setYearlyStats] = useState({ data: null, loading: false });
  const [lastMonthStats, setLastMonthStates] = useState({ data: null, loading: false });
  const [lastQuarterStats, setLastQuarterStates] = useState({ data: null, loading: false });
  const [lastYearStats, setLastYearStates] = useState({ data: null, loading: false });
  const [last30DaysStats, setLast30DaysStats] = useState({ data: null, loading: false });
  const stats = useStats(format(startOfMonth(new Date()), 'yyyy-MM-dd'), format(endOfMonth(new Date()), 'yyyy-MM-dd'));

  // first fetch stats for this month when component is mounted
  useEffect(() => {
    if (!stats.loading)
      setMontlyStats({ data: stats.items, loading: false });
  }, [stats.loading, stats.items]);

  // predifined filters dates
  const getArrayOfDates = useCallback(() => {
    const dates = [];
    const today = new Date();

    // this month
    const monthStart = format(startOfMonth(today), 'yyyy-MM-dd');
    const monthEnd = format(endOfMonth(today), 'yyyy-MM-dd');

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

    dates.push({ start: monthStart, end: monthEnd });
    dates.push({ start: last30Start, end: last30End });
    dates.push({ start: quarterStart, end: quarterEnd });
    dates.push({ start: yearStart, end: yearEnd });
    dates.push({ start: lastMonthStart, end: lastMonthEnd });
    dates.push({ start: lastQuarterStart, end: lastQuarterEnd });
    dates.push({ start: lastYearStart, end: lastYearEnd });
    return dates;
  }, [])

  // get stats for each date using promise.allSettled
  /*  useEffect(() => {
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
   }, [getArrayOfDates]); */

  // Fetch stats for each period, used in useMemo, is it batter use useReducer?
  const getStatsForDate = (index) => {
    const arrayOfDates = getArrayOfDates();
    let setState = null;
    switch (index) {
      case 0:
        break;
      case 1:
        setState = setLast30DaysStats;
        break;
      case 2:
        setState = setQuarterlyStats;
        break;
      case 3:
        setState = setYearlyStats;
        break;
      case 4:
        setState = setLastMonthStates;
        break;
      case 5:
        setState = setLastQuarterStates;
        break;
      case 6:
        setState = setLastYearStates;
        break;
      default:
        null;
    }
    if (setState === null) return
    setState({ data: null, loading: true });
    getStats(arrayOfDates[index].start, arrayOfDates[index].end).then(([res]) => {
      setState({ data: { ...res.table }, loading: false })
    }).catch(() => {
      setState({ data: null, loading: false, error: true })
    })
  }

  // array of all stats by period
  const statsData = useMemo(() => {
    return [
      {
        id: 0,
        label: 'This Month',
        fetch: () => getStatsForDate(0),
        ...monthlyStats,

      },
      {
        id: 1,
        label: 'Last 30 Days',
        fetch: () => getStatsForDate(1),
        ...last30DaysStats,
      },
      {
        id: 2,
        label: 'This Quarter',
        fetch: () => getStatsForDate(2),
        ...quarterlyStats,
      },
      {
        id: 3,
        label: 'This Year',
        fetch: () => getStatsForDate(3),
        ...yearlyStats,
      },
      {
        id: 4,
        label: 'Last Month',
        fetch: () => getStatsForDate(4),
        ...lastMonthStats,
      },
      {
        id: 5,
        label: 'Last Quarter',
        fetch: () => getStatsForDate(5),
        ...lastQuarterStats,
      },
      {
        id: 6,
        label: 'Last Year',
        fetch: () => getStatsForDate(6),
        ...lastYearStats,
      }
    ]
  }, [monthlyStats, last30DaysStats, quarterlyStats, yearlyStats, lastMonthStats, lastQuarterStats, lastYearStats]);

  const onTopActionClick = () => {
    history.push("messages/create");
  }

  return (
    <SecondaryLayout
      topActionName="+ New"
      onTopActionClick={onTopActionClick}
    >
      <Grid container spacing={3} sx={{ pb: 2 }}>
        <Grid item xs={12} lg={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h5" fontWeight='bold'>Welcome Back, {/*getFullName(user)*/ user.first_name} </Typography>
          <TeamQueue />
          <MessagesGraphs stats={statsData} />
        </Grid>

        <Grid container item xs={12} lg={4} direction='column' gap={3}  >
          <PersonalScore user={user} stats={monthlyStats} />
          <StackUp stats={statsData} />
        </Grid>
      </Grid>
    </SecondaryLayout>
  )
}