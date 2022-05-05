import { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog';
import ContactsTable from 'UI/Tables/Contacts/ContactsTable';

import { followOnTwitter } from 'Api/Endpoints';


const FollowOnTwitterDialog = (props) => {

  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  const contacts = props.contacts?.filter(contact => {
    if (props.selectedContacts.includes(contact.id))
      return contact
  })

  const onSelectionChange = (selected) => {
    setSelectedTeamMembers(selected)
  }

  const visibleTableRows = {
    // fullname: true,(default)
    profileImg: false,
    twitterName: true,
  }

  const onConfirm = () => {
    console.log("onConfirm FollowOnTwitterDialog")
    const data = {
      user_ids: selectedTeamMembers,
      contact_ids: props.selectedContacts
    }
    if (data.user_ids.length > 0 || data.contact_ids.length > 0)
      followOnTwitter(data)
    // else
  }

  return (
    <BaseDialog
      // title="title"
      maxWidth="lg"
      open={props.open}
      onConfirm={onConfirm}
      onClose={props.onClose}
      confirmLabel="Run Follow Script"
    >
      <Box
        sx={{
          display: "grid",
          gap: "25px",
          gridColumnGap: "40px",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: ".1fr .1fr 1.8fr",
          borderBottom: "1px #dadada solid",
        }}>

        <Stack
          gridColumn="1/3"
          alignItems="center"
          justifyContent="center"
        >
          <Typography sx={{ fontWeight: 600 }}>
            Follow {props.selectedContacts.length}
            <span style={{ color: "blue" }}> selected Contact{props.selectedContacts.length > 1 ? "s" : ""}</span> on Twitter
          </Typography>
        </Stack>

        <Divider style={{ gridColumn: "1/3" }} />

        <Stack
          flex={1}
          spacing={4}
        >
          <Typography sx={{ fontWeight: 600 }}>Follow on Twitter:</Typography>
          <ContactsTable
            id="follow-on-twitter-contacts"
            mini="600px"
            hidePagination
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            contacts={contacts}
            pagination={props.pagination}
            columnsControl={visibleTableRows}
            selection={props.selectedContacts}
            onSelectionChange={props.onSelectionChange}
          />
        </Stack>

        <Stack flex={1} spacing={1} >
          <Stack spacing={4}>
            <Typography sx={{ fontWeight: 600 }}>On behalf of User Accounts:</Typography>
            <ContactsTable
              id="follow-on-twitter-team-members"
              mini="600px"
              hidePagination
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              contacts={props.teamMembers}
              pagination={props.pagination}
              selection={selectedTeamMembers}
              columnsControl={visibleTableRows}
              onSelectionChange={onSelectionChange}
            />
          </Stack>
          <Typography sx={{ fontWeight: 500 }}>Select the accounts you would like to have follow the selected contacts.</Typography>
        </Stack>

        {/* <Divider style={{ gridColumn: "1/3" }} /> */}

      </Box>

    </BaseDialog>
  )
}
export default FollowOnTwitterDialog;