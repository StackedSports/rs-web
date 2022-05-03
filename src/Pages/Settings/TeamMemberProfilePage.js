import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from "@material-ui/core";
import { Formik, Form, Field } from 'formik';

import MainLayout from 'UI/Layouts/MainLayout';

import { useTeamMember } from 'Api/Hooks';
import { settingsRoutes } from 'Routes/Routes';
import { formatPhoneNumber, getFullName } from 'utils/Parser';

const TeamMemberProfilePage = (props) => {

  const { id } = useParams();
  const teamMember = useTeamMember(id)
  // console.log(teamMember.item)

  const filters = [
    { // Category
      id: '0',
      name: 'General',
      items: [
        // Filters
        { id: '0', name: 'Organization', path: settingsRoutes.main },
        { id: 'team-members', name: 'Team Members', path: settingsRoutes.general.members },
      ]
    },
    { // Category
      id: '1',
      name: 'Configurations',
      items: [
        // Filters
        { id: 'positions', name: 'Positions', path: settingsRoutes.team.positions },
        { id: 'statuses', name: 'Status', path: settingsRoutes.team.statuses },
        { id: 'ranks', name: 'Ranks', path: settingsRoutes.team.ranks },
        { id: 'snippets', name: 'Snippets', path: settingsRoutes.team.snippets },
      ]
    },
    {// Category
      id: '2',
      name: 'Tags',
      items: [
        // Filters
        { id: 'media-tags', name: 'Media Tags', path: settingsRoutes.tags.mediaTags },
        { id: 'contacts-tags', name: 'Contacts Tags', path: settingsRoutes.tags.contactsTags },
        { id: 'message-tags', name: 'Message Tags', path: settingsRoutes.tags.messageTags },
      ]
    }
  ]

  const initialValues = {
    first_name: teamMember.item?.first_name || "",
    last_name: teamMember.item?.last_name || "",
    email: teamMember.item?.email || "",
    phone: formatPhoneNumber(teamMember.item?.phone) || "",
    // organization: teamMember.item?.team.org.name || ""
  }

  const onSubmitForm = (values) => {
    console.log(values)
    // let data = {}
    // Object.keys(values).forEach(key => {
    //   if (values[key] !== initialValues[key]) {
    //     if (key === "first_name" || key === "last_name")
    //       data.name = `${values.first_name} ${values.last_name}`
    //     else
    //       data[key] = values[key]
    //   }
    // })
    // updateUser(data, userStorage.id)
  }

  const onRemovePicture = () => {
    console.log("onRemovePicture")
  }

  const onUploadPicture = () => {
    console.log("onUploadPicture")
  }

  const onSaveSettings = () => {
    console.log("onSaveSettings")
  }

  const disableBtnRemovePicture = () => {
    if (teamMember.item?.twitter_profile?.profile_image == null ||
      teamMember.item?.twitter_profile?.profile_image === "https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png")
      return true;
    else
      return false;
  }

  return (
    <MainLayout
      title={props.title || 'Team Member Profile'}
      topActionName={props.topActionName || null}
      // onTopActionClick={onTopActionClick}
      filters={filters}
    >
      {teamMember.loading ?
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
        :
        <Stack flex={1} spacing={2} direction="row">
          <Box
            sx={{
              height: "250px",
              display: "grid",
              alignItems: "center",
              gridTemplateRows: "2fr .1fr .9fr",
              borderRadius: "7px",
              border: "#dadada  1px solid",
            }}
          >
            <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4} padding="20px">
              <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="start" spacing={1}>
                <Typography variant="h6" component="p">{getFullName(initialValues)}</Typography>
                <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>{initialValues.email}</Typography>
                <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>{initialValues.phone}</Typography>
              </Stack>
              <Stack flex={1} justifyContent="flex-start" alignItems="center">
                <Avatar sx={{ width: "146px", height: "146px" }} alt="org favicon" src={teamMember.item?.twitter_profile?.profile_image?.replace("_normal", "") || ""} />
              </Stack>
            </Stack>

            <Divider style={{ gridColumn: "1/2" }} />

            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
              <input hidden accept="image/*" id="contained-button-file" multiple type="file" />
              <Button style={{ fontSize: "12px" }} component="label" htmlFor="contained-button-file" onClick={onUploadPicture}>
                UPLOAD PICTURE
              </Button>
              <Button style={{ fontSize: "12px" }} component="label" onClick={onRemovePicture} disabled={disableBtnRemovePicture}>
                REMOVE PICTURE
              </Button>
            </Stack>
          </Box>

          <Box
            flex={1}
            sx={{
              display: "grid",
              borderRadius: "7px",
              alignItems: "center",
              border: "#dadada  1px solid",
              gridTemplateRows: ".3fr .1fr 2.6fr",
            }}
          >
            <Stack direction="row" justifyContent="flex-start" alignItems="end" spacing={1} p="20px">
              <Typography sx={{ fontWeight: 500 }}>User Info</Typography>
              <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>Your profile information can be edited below</Typography>
            </Stack>

            <Divider style={{ gridColumn: "1/2" }} />

            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                onSubmitForm(values)
              }}>
              {(formikProps) => (
                <Form
                  style={{
                    padding: "25px 20px",
                    display: "grid",
                    gridGap: "20px",
                    alignItems: "center",
                    alignSelf: "start",
                    justifyItems: "center",
                    gridTemplateRows: "repeat(3, 1fr)",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}>

                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <Field
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      component={TextField}
                      value={formikProps.values.first_name}
                      onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("first_name", e.target.value) }} />
                    <FormHelperText id="first_name">First Name</FormHelperText>
                  </FormControl>

                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <Field
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      component={TextField}
                      value={formikProps.values.last_name}
                      onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("last_name", e.target.value) }} />
                    <FormHelperText id="last_name">Last Name</FormHelperText>
                  </FormControl>

                  <FormControl sx={{ width: '100%', }} variant="outlined">
                    <Field
                      id="email"
                      name="email"
                      label="Email"
                      component={TextField}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={formikProps.values.email}
                    // onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("email", e.target.value) }}
                    />
                    <FormHelperText id="email">Email</FormHelperText>
                  </FormControl>

                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <Field
                      type="number"
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      component={TextField}
                      value={formikProps.values.phone}
                      onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("phone", e.target.value) }} />
                    <FormHelperText id="phone">Phone Number</FormHelperText>
                  </FormControl>

                  {/* <FormControl sx={{ width: '100%' }} variant="outlined">
                    <Field
                      id="organization"
                      name="organization"
                      label="Organization"
                      component={TextField}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={formikProps.values.organization}
                    // onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("organization", e.target.value) }}
                    />
                    <FormHelperText id="organization">Organization</FormHelperText>
                  </FormControl> */}

                  <Button
                    type="submit"
                    variant="contained"
                    onClick={onSaveSettings}
                    sx={{ alignSelf: "center", gridColumn: "1/3" }}
                  >
                    Save Settings
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack >
      }
    </MainLayout>
  )
}

export default TeamMemberProfilePage;