import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Divider, Tooltip, Box } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { mask, unMask } from 'remask';

import { formatPhoneNumber, getFullName } from 'utils/Parser';
import { useMainLayoutAlert } from 'UI/Layouts/MainLayout';
import { UserSettingsPage } from "./UserSettingsPage";
import { updateUser } from 'Api/Endpoints';
import { useUser } from 'Api/Hooks';

const UserSettingsProfilePage = (props) => {
  const user = useUser();
  const alert = useMainLayoutAlert();
  const userStorage = JSON.parse(window.localStorage.getItem("user"));

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user.item)
      return

    console.log(user.item)
  }, [user.item])


  const patternPhoneMask = [
    '(999) 999-9999',
  ]

  const initialValues = {
    first_name: user.item?.first_name || "",
    last_name: user.item?.last_name || "",
    email: user.item?.email || "",
    phone: user.item?.phone ? mask(user.item?.phone.replace(/\D+/g, ""), patternPhoneMask) : "",
    organization: user.item?.team.org.name || ""
  }

  console.log(user.item)

  const handleMask = (e) => {
    let originalValue = unMask(e);
    return mask(originalValue, patternPhoneMask);
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

  const onSubmitForm = (values) => {
    let data = {}
    Object.keys(values).forEach(key => {
      if (values[key] !== initialValues[key]) {
        if (key === "first_name" || key === "last_name")
          data.name = `${values.first_name} ${values.last_name}`
        else
          data[key] = values[key]
      }
    })
    if (Object.keys(data).length > 0) {
      setLoading(true)
      updateUser(data, userStorage.id)
        .then(res => {
          alert.setSuccess("Changes saved successfully!");
          user.refresh();
        })
        .catch(error => {
          console.log(error)
          alert.setError("Failed to save changes.");
        })
        .finally(() => setLoading(false))
    } else {
      alert.setWarning("No changes to save.")
    }
  }

  const disableBtnRemovePicture = () => {
    if (user?.twitter_profile?.profile_image == null ||
      user?.twitter_profile?.profile_image === "https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png")
      return true;
    else
      return false;
  }

  return (
    <UserSettingsPage
      alert={alert}
      title='Profile'
      loading={loading}
    // topActionName=""
    // onTopActionClick={}
    >
      {user.loading ?
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
        :
        <Stack
          flex={1}
          spacing={2}
          direction="row"
        >
          <Box
            sx={{
              width: "400px",
              height: "250px",
              display: "grid",
              alignItems: "center",
              gridTemplateRows: "2fr .1fr .9fr",
              borderRadius: "7px",
              border: "#dadada  1px solid",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" padding="20px">
              <Stack direction="column" justifyContent="flex-start" alignItems="start" spacing={1}>
                <Typography variant="h6" component="p">{getFullName(initialValues)}</Typography>
                <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>
                  {initialValues.email?.length >= 32 ?
                    <Tooltip style={{ fontSize: "14px" }} title={initialValues.email} placement='right-start'>
                      <Typography component='span' noWrap >{`${initialValues.email?.substring(0, 27)}...`}</Typography>
                    </Tooltip>
                    :
                    initialValues.email
                  }
                </Typography>
                <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>{formatPhoneNumber(initialValues.phone)}</Typography>
                <Typography sx={{ color: '#ccc', fontWeight: 500, fontSize: "14px" }}>{initialValues.organization}</Typography>
              </Stack>
              <Stack justifyContent="flex-start" alignItems="center">
                <Avatar
                  sx={{ width: "146px", height: "146px" }}
                  alt={initialValues.first_name}
                  src={user.item?.twitter_profile?.profile_image?.replace("_normal", "") || ""}
                />
              </Stack>
            </Stack>

            <Divider style={{ gridColumn: "1/2" }} />

            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
              <input hidden accept="image/*" id="contained-button-file" multiple type="file" />
              <Button style={{ fontSize: "12px" }} component="label" htmlFor="contained-button-file" onClick={onUploadPicture}>
                UPLOAD PICTURE
              </Button>
              <Button style={{ fontSize: "12px" }} component="label" onClick={onRemovePicture} disabled={disableBtnRemovePicture()}>
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
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      component={TextField}
                      value={mask(formikProps.values.phone, patternPhoneMask)}
                      onChange={e => { formikProps.handleChange(e); formikProps.setFieldValue("phone", handleMask(e.target.value)) }} />
                    <FormHelperText id="phone">Phone Number</FormHelperText>
                  </FormControl>


                  {user.item?.sms_number &&
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                      <Field
                        id="sms-number"
                        name="sms-number"
                        label="Sms Number"
                        component={TextField}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={formatPhoneNumber(user.item?.sms_number) || ""}
                      />
                      <FormHelperText id="sms-number">SMS/MMS</FormHelperText>
                    </FormControl>
                  }

                  <LoadingButton
                    type="submit"
                    sx={{
                      alignSelf: "center",
                      gridColumn: user.item?.sms_number ? "2/3" : "1/3"
                    }}
                    loading={loading}
                    variant="contained"
                    onClick={onSaveSettings}
                  >
                    Save Settings
                  </LoadingButton>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack >
      }
    </UserSettingsPage >
  )
}

export default UserSettingsProfilePage;