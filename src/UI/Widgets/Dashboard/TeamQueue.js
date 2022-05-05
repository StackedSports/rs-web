import { useState } from "react";
import { Grid, Typography, Stack, Box, Card, CardHeader } from "@mui/material"
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
      {
        (!tasksQueue.loading && tasksQueue.items.length === 0) ? 
        (
          <Box>
            <Typography variant="h6"> Your task queue is clear!</Typography>
            <Typography variant="h6"> Consistent messaging is key</Typography>
            <Typography variant="h6">  to building an engaging audience!</Typography>
            <Typography variant="h6">  to building an engaging audience!</Typography>
            <Button variant="contained" color="primary" name='+New' onClick={onNewTaskClick} />
          </Box>
        )
        :
        <Box maxHeight='300px' >
        <TasksQueueTable rows={tasksQueue.items} loading={tasksQueue.loading} autoHeight />
        </Box>
      }

    </BaseSection>
  )
}
