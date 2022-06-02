import { useState, useContext } from 'react';
import { Box, Divider } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog';
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';

import { followOnTwitter } from 'Api/Endpoints';

import { AppContext } from 'Context/AppProvider';

const FollowOnTwitterDialog = (props) => {
  const app = useContext(AppContext)

  const [following, setFollowing] = useState(false)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);


  const onSelectionChange = (selected) => {
    setSelectedTeamMembers(selected)
  }

  const visibleTableRows = {
    // fullname: true,(default)
    profileImg: false,
    phone: false,
    twitterName: true,
  }

  const onConfirm = () => {
    console.log("onConfirm FollowOnTwitterDialog")

    if (following)
      return

    const data = {
      user_ids: selectedTeamMembers,
      contact_ids: props.selectedContacts
    }

    if (data.user_ids.length <= 0 || data.contact_ids.length <= 0)
      return

    setFollowing(true)

    followOnTwitter(data)
      .then(res => {
        console.log(res)

        //if(res.followed_contacts.length > 0)

        app.alert.setSuccess('It worked')
      })
      .catch(error => {
        console.log(error)
        app.alert.setError('It did not work')
      })
      .finally(() => setFollowing(false))
    // else
  }

  return (
    <BaseDialog
      // title="title"
      maxWidth="lg"
      open={props.open}
      onConfirm={onConfirm}
      actionDisabled={selectedTeamMembers.length === 0}
      actionLoading={following}
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
          spacing={2}
        >
          <Typography sx={{ fontWeight: 600 }}>Follow on Twitter:</Typography>
          <ContactsTableServerMode
            id="follow-on-twitter-contacts"
            height="600px"
            hideFooter
            mini
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            contacts={props.contacts}
            columnVisibilityModel={visibleTableRows}
            selectionModel={props.selectedContacts}
            onSelectionModelChange={props.onSelectionChange}
          />
        </Stack>

        <Stack flex={1} spacing={1} >
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 600 }}>On behalf of User Accounts:</Typography>
            <ContactsTableServerMode
              id="follow-on-twitter-team-members"
              height="600px"
              mini
              hideFooter
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              contacts={props.teamMembers.filter(member => member.twitter_profile.screen_name != null)}
              selectionModel={selectedTeamMembers}
              columnVisibilityModel={visibleTableRows}
              onSelectionModelChange={onSelectionChange}
            />
          </Stack>
          <Typography sx={{ fontWeight: 500 }}>Select the accounts you would like to have follow the selected contacts.</Typography>
        </Stack>

      </Box>

    </BaseDialog>
  )
}
export default FollowOnTwitterDialog;