import { useState, useContext } from 'react';
import { Box, Divider } from '@material-ui/core';
import { Stack, Typography } from '@mui/material';

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog';

import { AppContext } from 'Context/AppProvider';
import PeopleTable from 'UI/Tables/People/PeopleTable';

const PeopleDialog = (props) => {
  const app = useContext(AppContext)

  const [following, setFollowing] = useState(false)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);

  // const visibleTableRows = {
  //   // fullname: true,(default)
  //   profileImg: false,
  //   twitterName: true,
  // }

  const onClose = () => {
    props.onClose(false)
  }

  return (
    <BaseDialog
      title="FAMILY & RELATIONSHIP"
      hideActions
      maxWidth="lg"
      open={props.open}
      onClose={onClose}
    >
      <PeopleTable
        mini
        people={props.people}
        onViewPerson={props.onViewPerson}
      />
    </BaseDialog>
  )
}
export default PeopleDialog;