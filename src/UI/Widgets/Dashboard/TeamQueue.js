import { useState, useEffect, useRef, useContext } from "react";
import { Grid, Typography, Stack, Box } from "@mui/material"
import { Tune, Event } from '@mui/icons-material';
import lodash from "lodash";

import { SectionSubTitle } from "./Components/Styles/StyledComponents"
import { BaseSection } from "./Components/BaseSection";
import Button from "../Buttons/Button"
import TasksQueueTable from "UI/Tables/TasksQueue/TasksQueueTable";
import PanelFilters from "../PanelFilters";

import { AuthContext } from "Context/Auth/AuthProvider";
import { useMessages, useTeamMembers } from "Api/Hooks";
import { getFullName } from "utils/Parser";

export const TeamQueue = () => {
  const [loadedRows, setLoadedRows] = useState([]);
  const filterChanged = useRef(false);
  const [openFilters, setOpenFilters] = useState(false);
  const { user } = useContext(AuthContext);


  const baseFilter = { message_status: ['Pending', "in progress"], includeTeam: user.role === "Admin" };

  const messages = useMessages(1, 10, baseFilter);
  const senders = useTeamMembers();

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

  const onNewTaskClick = () => {
    console.log("onNewTaskClick");
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
    const filter = lodash.cloneDeep(baseFilter);
    if (filters.sender)
      filter.sender = filters.sender.map(sender => sender.id);
    if (filters.platform)
      filter.platform = filters.platform.map(platform => platform.value);
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
