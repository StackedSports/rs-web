import { useState } from "react";
import { Grid, Typography, Stack, CircularProgress, Box, Card, CardHeader } from "@mui/material"
import { Tune, Event } from '@mui/icons-material';
import { format } from "date-fns";

import { SectionSubTitle } from "./Components/Styles/StyledComponents"
import { BaseSection } from "./Components/BaseSection";
import DatePicker from "UI/Forms/Inputs/DatePicker"
import Button from "../Buttons/Button"
import TasksQueueTable  from "UI/Tables/TasksQueue/TasksQueueTable";

import { useTaskQueue } from "Api/Hooks";

export const TeamQueue = () => {
  const [date, setDate] = useState();
  const tasksQueue = useTaskQueue(date);

  const onNewTaskClick = () => {
    console.log("onNewTaskClick");
  }

  const onFilterClick = () => {
    console.log("onFilterClick");
  }

  const onDateChange = (date) => {
    setDate(format(date, "yyyy-MM-dd"))
  }


  return (
    <BaseSection
      title='Team Queue'
      subtitle={
        <SectionSubTitle >
          You have {" "} <SectionSubTitle component="span" color='primary'>{tasksQueue.items.length} items</SectionSubTitle> in your queue
        </SectionSubTitle>
      }
      actions={
        <Stack gap={2} direction='row'>
          <DatePicker value={date} onChange={onDateChange} />
          <Button variant="outlined" name='Filter' endIcon={<Tune />} onClick={onFilterClick} />
        </Stack>
      }
    >
      {tasksQueue.loading && (
        <Box sx={{ display: 'grid', placeItems: 'center', height: '180px' }} >
          <CircularProgress />
        </Box>
      )}
      {!tasksQueue.loading && tasksQueue.items.length === 0 && (
        <Stack flex={1} alignItems="center" justifyContent="center">
          <Typography variant="h6" fontSize={16} fontWeight="bold"> Your task queue is clear!</Typography>
          <Typography variant="h6" fontSize={16}>Consistent messaging is key to</Typography>
          <Typography variant="h6" fontSize={16}>building an engaging audience.</Typography>
          <Button
            variant="contained" 
            color="primary" 
            name='+ New' 
            sx={{ minWidth: 120, marginTop: 2 }}
            onClick={onNewTaskClick} 
          />
        </Stack>
      )}
      {!tasksQueue.loading && tasksQueue.items.length > 0 && (
        <Box maxHeight='300px' >
          <TasksQueueTable rows={tasksQueue.items} loading={tasksQueue.loading} autoHeight />
        </Box>
      )}
    </BaseSection>
  )
}
