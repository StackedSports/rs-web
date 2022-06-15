import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';

import UserSettingsPage from "./UserSettingsPage";
import UserSettingsNotificationsList from './UserSettingsNotificationsList';

const UserSettingsNotificationsPage = (props) => {

  const generalNotificationsOptions = [
    {
      id: 0,
      name: "personal_text",
      label: "A Personal Text is ready to be sent.",
    },
    {
      id: 1,
      name: "twitter_dm",
      label: "A Twitter DM will be sent in ",
      time: "minutes",
    },
    {
      id: 2,
      name: "sms_mms",
      label: "A SMS/MMS Text will be sent in",
      time: "minutes",
    },
  ]

  const customNotificationsOptions = [
    {
      id: 0,
      name: "",
      label: "",
    },
    {
      id: 1,
      name: "",
      label: "",
    },
    {
      id: 2,
      name: "",
      label: "",
    },
  ]


  return (
    <UserSettingsPage
      title='Notifications'
    // topActionName='+ New Grad Year'
    // onTopActionClick={onTopActionClick}
    >
      <Formik
        initialValues={{}}
      >
        {(formikProps) => (
          <Form
            flex={1}
            style={{
              // height: "250px",
              display: "grid",
              marginTop: "20px",
              gridRowGap: "20px",
              gridColumnGap: "40px",
              alignItems: "center",
              gridTemplateColumns: ".5fr 1.5fr",
              gridTemplateRows: "2.1fr .1fr 1.8fr",
            }}
          >
            <Stack
              flex={1}
              spacing={2}
              alignSelf="start"
            >
              <Typography variant="h6" component="p">General Notifications</Typography>
              <Typography>Select when you'll be notified when the following occur.</Typography>
            </Stack>

            <Stack
              flex={1}
              spacing={2}
              alignItems="flex-end"
              justifyContent="center"
            >
              <UserSettingsNotificationsList
                values={formikProps.values}
                options={generalNotificationsOptions}
                setFieldValue={formikProps.setFieldValue}
              />
            </Stack>

            <Divider style={{ gridColumn: "1/3" }} />

            <Stack
              flex={1}
              spacing={2}
            >
              <Typography variant="h6" component="p">Custom Notifications</Typography>
              <Typography>Add custom notifications for your team when changes occur.</Typography>
            </Stack>

            <Stack
              flex={1}
              spacing={2}
              alignItems="flex-end"
              justifyContent="center"
            >
              <UserSettingsNotificationsList
                values={formikProps.values}
                options={generalNotificationsOptions}
                setFieldValue={formikProps.setFieldValue}
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </UserSettingsPage >
  )
}

export default UserSettingsNotificationsPage;