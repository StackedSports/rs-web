import { useEffect, useState, useMemo } from 'react'
import { Grid, TextField, MenuItem, CircularProgress, Box } from '@mui/material'

import { BaseSection } from './Components/BaseSection'
import * as Styled from './Components/Styles/StyledComponents'

import { Pie, Bar } from 'react-chartjs-2';

export const MessagesGraphs = (props) => {
  const [leftTimeRangeIndex, setLeftTimeRangeIndex] = useState(0);
  const [rightTimeRangeIndex, setRightTimeRangeIndex] = useState(0);
  const [leftGraph, setLeftGraph] = useState([]);
  const [rightGraph, setRightGraph] = useState([]);

  useEffect(() => {
    if (props.stats[leftTimeRangeIndex]?.data && !props.stats[leftTimeRangeIndex].loading)
      setLeftGraph(props.stats[leftTimeRangeIndex].data);
  }, [props.stats, leftTimeRangeIndex]);

  useEffect(() => {
    if (props.stats[rightTimeRangeIndex]?.data && !props.stats[rightTimeRangeIndex].loading)
      setRightGraph(props.stats[rightTimeRangeIndex].data);
  }, [props.stats, rightTimeRangeIndex]);

  const barConfig = useMemo(() => ({
    labels: ['Twitter DM\'s', 'Personal Texts', 'RS Text'],
    datasets: [
      {
        backgroundColor: ['#007bff', '#dc3545', '#ffc107'],
        borderColor: ['#007bff', '#dc3545', '#ffc107'],
        borderWidth: 1,
        data: [3, 19, 3],
      },
    ],
  }), []);

  const pieConfig = useMemo(() => ({
    labels: ['Twitter DM\'s', 'Personal Texts', 'RS Text'],
    datasets: [
      {
        backgroundColor: ['#007bff', '#dc3545', '#ffc107'],
        borderColor: ['#007bff', '#dc3545', '#ffc107'],
        borderWidth: 1,
        data: [leftGraph.total_dms, leftGraph.total_personal_texts, leftGraph.total_rs_texts],
      },
    ],
  }), [leftGraph]);

  useEffect(() => {
    if (props.stats) {
    }
  }, [props.stats]);

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} lg={6} >
        <BaseSection
          sx={{ height: '100%' }}
          title={`${props.stats[leftTimeRangeIndex]?.label} Messages: ${leftGraph.total_messages}`}
          actions={
            <TextField
              size='small'
              inputProps={{ fontWeight: 'bold' }}
              label={null}
              select
              value={leftTimeRangeIndex}
              onChange={(e) => setLeftTimeRangeIndex(e.target.value)}
            >
              {
                props.stats.map(stat =>
                  <MenuItem
                    key={stat.id}
                    value={stat.id}
                  >
                    {stat.label}
                  </MenuItem>
                )
              }
            </TextField>
          }
        >
          {!props.stats[leftTimeRangeIndex].loading ?
            <Pie data={pieConfig} options={{ legend: { position: 'bottom', labels: { padding: 30 } } }} />
            :
            <Box sx={{ display: 'grid', placeItems: 'center', height: '300px' }}>
              <CircularProgress size={80} />
            </Box>
          }
        </BaseSection>
      </Grid>
      <Grid item xs={12} lg={6}>
        <BaseSection
          sx={{ height: '100%' }}
          title='Graphs'
          actions={
            <TextField
               size='small'
              inputProps={{ fontWeight: 'bold' }}
              label={null}
              select
              value={rightTimeRangeIndex}
              onChange={(e) => setRightTimeRangeIndex(e.target.value)}
            >
              {
                props.stats.map(stat =>
                  <MenuItem
                    key={stat.id}
                    value={stat.id}
                  >
                    {stat.label}
                  </MenuItem>
                )
              }
            </TextField>
          }
        >
          {!props.stats[rightTimeRangeIndex].loading ?
            <Bar data={barConfig} options={{ legend: {display:false } }} />
            :
            <Box sx={{ display: 'grid', placeItems: 'center', height: '300px' }}>
              <CircularProgress size={80} />
            </Box>
          }
        </BaseSection>
      </Grid>
    </Grid>
  )
}

export default MessagesGraphs