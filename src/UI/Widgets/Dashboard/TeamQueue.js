import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Stack, Box } from "@mui/material"
import { Tune, Event } from '@mui/icons-material';
import { format } from "date-fns";
import lodash from "lodash";

import { SectionSubTitle } from "./Components/Styles/StyledComponents"
import { BaseSection } from "./Components/BaseSection";
import DatePicker from "UI/Forms/Inputs/DatePicker"
import Button from "../Buttons/Button"
import TasksQueueTable from "UI/Tables/TasksQueue/TasksQueueTable";

import { useMessages } from "Api/Hooks";

export const TeamQueue = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loadedRows, setLoadedRows] = useState([]);
  const filterChanged = useRef(false);
  const firstRender = useRef(true);
  const [filterSender, setFilterSender] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterType, setFilterType] = useState(null);

  const messages = useMessages(1, 10, { message_status: ['Pending', "in progress"] });

  useEffect(() => {
    if (!messages.loading) {
      if (filterChanged.current) {
        setLoadedRows(messages.items);
        filterChanged.current = false;
      }
      else {
        setLoadedRows((old) => lodash.uniqBy([...old, ...messages.items], 'id'))
      }
    }

  }, [messages.items, messages.loading]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (date) {
      messages.filter({ message_status: ['Pending', "in progress"], send_at_dates: [[date, date]] });
    } else {
      messages.filter({ message_status: ['Pending', "in progress"] });
    }
  }, [date]);


  const onNewTaskClick = () => {
    console.log("onNewTaskClick");
  }

  const onFilterClick = () => {
    console.log("onFilterClick");
  }

  const onDateChange = (newDate) => {
    if (format(newDate, "yyyy-MM-dd") === date) return;
    filterChanged.current = true;
    setDate(format(newDate, "yyyy-MM-dd"))
  }


  return (
    <BaseSection
      title='Team Queue'
      subtitle={
        <SectionSubTitle >
          You have {" "} <SectionSubTitle component="span" color='primary'>{messages.pagination.totalItems} items</SectionSubTitle> in your queue
        </SectionSubTitle>
      }
      actions={
        <Stack gap={2} direction='row'>
          <DatePicker onChange={onDateChange} disableFuture />
          <Button variant="outlined" name='Filter' endIcon={<Tune />} onClick={onFilterClick} />
        </Stack>
      }
    >
      {!messages.loading && messages.items.length === 0 && (
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
      {(messages.items.length !== 0 || messages.loading) && (
        <Box height={Math.min(messages.items.length + 2,6) * 56 + 'px'} >
          <TasksQueueTable rows={loadedRows} apiPagination={messages.pagination} loading={messages.loading} />
        </Box>
      )}
    </BaseSection>
  )
}
