import { useEffect, useState, useMemo } from 'react'
import { Grid, TextField, MenuItem, CircularProgress, Box } from '@mui/material'

import BaseSection from './Components/BaseSection'
import SelecRangeDates from './Components/SelecRangeDates'
import * as Styled from './Components/Styles/StyledComponents'

import { Pie, Bar } from 'react-chartjs-2';

export const MessagesGraphs = (props) => {
  const [leftTimeRangeIndex, setLeftTimeRangeIndex] = useState(0);
  const [rightTimeRangeIndex, setRightTimeRangeIndex] = useState(0);
  const [leftGraph, setLeftGraph] = useState([]);
  const [rightGraph, setRightGraph] = useState([]);

  useEffect(() => {
    if (!props.stats[leftTimeRangeIndex].loading && props.stats[leftTimeRangeIndex]?.data === null)
      props.stats[leftTimeRangeIndex].fetch();
    if (props.stats[leftTimeRangeIndex]?.data && !props.stats[leftTimeRangeIndex].loading)
      setLeftGraph(props.stats[leftTimeRangeIndex].data);
  }, [props.stats, leftTimeRangeIndex]);

  useEffect(() => {
    if (!props.stats[rightTimeRangeIndex].loading && props.stats[rightTimeRangeIndex]?.data === null)
      props.stats[rightTimeRangeIndex].fetch();
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
        data: [rightGraph.total_dms, rightGraph.total_personal_texts, rightGraph.total_rs_texts],
      },
    ],
  }), [rightGraph]);

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
          title={`${props.stats[leftTimeRangeIndex]?.label} Messages: ${leftGraph.total_messages || ''}`}
          actions={
            <SelecRangeDates
              value={leftTimeRangeIndex}
              onChange={(index) => setLeftTimeRangeIndex(index)}
              options={props.stats}
            />
          }
        >
          {!props.stats[leftTimeRangeIndex].loading ?
            <Pie data={pieConfig} options={{ legend: { position: 'bottom', labels: { padding: 30 } } }} />
            :
            <Box sx={{ display: 'grid', placeItems: 'center', height: '120px' }}>
              <CircularProgress size={60} />
            </Box>
          }
        </BaseSection>
      </Grid>
      <Grid item xs={12} lg={6}>
        <BaseSection
          sx={{ height: '100%' }}
          title={`${props.stats[rightTimeRangeIndex]?.label} Messages: ${rightGraph.total_messages || ''}`}
          actions={
            <SelecRangeDates
              value={rightTimeRangeIndex}
              onChange={(index) => setRightTimeRangeIndex(index)}
              options={props.stats}
            />
          }
        >
          {!props.stats[rightTimeRangeIndex].loading ?
            <Bar data={barConfig} options={{ legend: { display: false } }} />
            :
            <Box sx={{ display: 'grid', placeItems: 'center', height: '120px' }}>
              <CircularProgress size={60} />
            </Box>
          }
        </BaseSection>
      </Grid>
    </Grid>
  )
}

export default MessagesGraphs