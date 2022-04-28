import * as React from 'react';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from "@material-ui/core";
import { useFormik, Field } from 'formik';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SelectNotificationButtons = styled.div`
  width: ${props => props.width || "90px"};
  height: ${props => props.height || "30px"};
  border: #000 1px solid;
  border-radius: "10px";

`


const UserSettingsNotificationsList = (props) => {



  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
      component="nav"
      aria-label="mailbox folders">
      {props.options.map(option => {

        return (
          <>
            <ListItem key={option.id} button>
              <ListItemText primary={option.label} />
              <SelectNotificationButtons />
            </ListItem>
            <Divider />
          </>
        )
      })
      }
    </List>
  )
}

export default UserSettingsNotificationsList;