import { useState, useEffect, useRef, useContext } from "react";
import { Grid, Typography, Stack, Box } from "@mui/material"
import { Tune, Event, KeyboardArrowDown } from '@mui/icons-material';
import lodash from "lodash";
import { useHistory } from "react-router-dom";

import { SectionSubTitle } from "./Components/Styles/StyledComponents"
import { BaseSection } from "./Components/BaseSection";
import Button from "../Buttons/Button"
import TasksQueueTable from "UI/Tables/TasksQueue/TasksQueueTable";
import DateRangePicker from "UI/Forms/Inputs/DateRangePicker";
import PanelFilters from "../PanelFilters";

import { AuthContext } from "Context/Auth/AuthProvider";
import { useMessages, useTeamMembers } from "Api/Hooks";
import { getFullName } from "utils/Parser";

export const TeamQueue = () => {
  const [loadedRows, setLoadedRows] = useState([]);
  const filterChanged = useRef(false);
  const lastFilter = useRef({});
  const firstRender = useRef(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [dates, setDates] = useState([null, null]);
  const { user } = useContext(AuthContext);
  const senders = useTeamMembers();
  const history = useHistory();

  const getBaseFilter = () => {
    if (dates.includes(null))
      return ({ message_status: ['Pending'], includeTeam: user.role === "Admin" });
    else
      return ({ message_status: ['Pending'], includeTeam: user.role === "Admin", send_at_dates: [dates] });
  };

  //console.log("queue date", dates)

  const messages = useMessages(1, 10, getBaseFilter());

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
    // we don't want to run this on first render
    if (firstRender.current) {
      firstRender.current = false;
      return
    }
    if (dates[0] && dates[1]) {
      filterChanged.current = true;
      lastFilter.current = { ...lastFilter.current, ...getBaseFilter() };
      messages.filter(lastFilter.current);
    }
    else {
      filterChanged.current = true;
      if (lastFilter.current instanceof Object)
        delete lastFilter.current['send_at_dates'];
      messages.filter({ ...lastFilter.current, ...getBaseFilter() });
    }
  }, [dates]);


  // create a new message
  const onNewTaskClick = () => {
    history.push("messages/create");
  }

  const onFilterClick = () => {
    setOpenFilters(!openFilters);
  }

  const filtersOptions = {
    sender: {
      label: "Sender",
      options: senders.items,
      optionsLabel: (sender) => getFullName(sender),
    },
    platform: {
      label: "Type",
      options: [
        { id: 1, name: "Twitter", value: "Twitter" },
        { id: 2, name: "Personal Text", value: "Personal Text" },
        { id: 3, name: "RS Text", value: "RS Text" },
      ]
    }
  }

  const onFilterChange = (filters) => {
    filterChanged.current = filters;
    const filter = lodash.cloneDeep(getBaseFilter());
    if (filters.sender)
      filter.sender = filters.sender.map(sender => sender.id);
    if (filters.platform)
      filter.platform = filters.platform.map(platform => platform.value);
    lastFilter.current = filter;
    messages.filter(filter);
  }

  return (
    <BaseSection
      title='Team Queue'
      subtitle={
        <>
          <SectionSubTitle >
            You have {" "} <SectionSubTitle component="span" color='primary'>{messages.pagination.totalItems} items</SectionSubTitle> in your queue
          </SectionSubTitle>
        </>
      }
      actions={
        <Stack gap={2} direction='row'>
          <DateRangePicker
            label={dates.includes(null) ? "Filter by date" : dates.join(" - ")}
            endIcon={<KeyboardArrowDown />}
            startIcon={<Event color="primary" />}
            onChange={setDates}

          />
          <Button variant="outlined" name='Filter' endIcon={<Tune />} onClick={onFilterClick} />
        </Stack>
      }
      filter={
        <PanelFilters
          open={openFilters}
          filters={filtersOptions}
          onFilterChange={onFilterChange}
        />
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
        <Box height={Math.min(messages.items.length + 2, 6) * 56 + 'px'} >
          <TasksQueueTable rows={loadedRows} apiPagination={messages.pagination} loading={messages.loading} />
        </Box>
      )}
    </BaseSection>
  )
}
