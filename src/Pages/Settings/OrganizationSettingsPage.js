import { useContext } from 'react'

import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import favicon from 'images/stacked-favicon.png'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/core/styles'

import SettingsPage from './SettingsPage'

import { AuthContext } from 'Context/Auth/AuthProvider'

const useStyles = makeStyles(theme => ({
    textField: {
        border: "#dadada 1px solid",
        borderRadius: "5px"
    },
}));

const OrganizationSettingsPage = (props) => {
    const classes = useStyles();

    const { user } = useContext(AuthContext)
    console.log(user)

    const initialValues = {
        organization: user.team.org.name,
        teamName: user.team.org.nickname,
        address: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        phone: "",
    }

    const inputProps = {
        readOnly: true,
    }

    const onUploadPicture = (e) => {
        console.log("onUploadPicture")
    }

    const onRemovePicture = (e) => {
        console.log("onRemovePicture")
    }
    return (
        <SettingsPage
            title='Organization'
        >
            <Stack spacing={2} direction="row" flexWrap="nowrap">

                <Stack
                    component="div"
                    style={{
                        borderRadius: "7px",
                        border: "#dadada 1px solid",
                    }}
                    direction="column" justifyContent="space-between"
                    alignItems="start" flexWrap="wrap" flex={2} spacing={1}
                >
                    <Stack style={{
                        padding: "20px",
                        borderBottom: "#dadada  1px solid",
                    }}
                        width="100%" flex={1} direction="row" justifyContent="space-between"
                        alignItems="center" flexWrap="nowrap">

                        <b>Organization Info</b>
                        <span style={{ color: '#dadada', width: '65%' }}>Your org information can be edited bellow</span>
                    </Stack>

                    <Stack
                        component="form"
                        style={{
                            width: "100%",
                            padding: "30px 50px 10px 20px",
                        }}
                        direction="column" justifyContent="space-between"
                        alignItems="start" flexWrap="wrap" flex={2} spacing={4}
                    >
                        <Stack width="100%" flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="organization"
                                    InputProps={inputProps}
                                    className={classes.textField}//
                                    defaultValue={initialValues.organization}
                                />
                                <FormHelperText id="organization" >Organization</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="teamName"
                                    InputProps={inputProps}
                                    defaultValue={initialValues.teamName}
                                />
                                <FormHelperText id="teamName">Team Name</FormHelperText>
                            </FormControl>
                        </Stack>

                        <Stack width="100%" flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="address"
                                    InputProps={inputProps}
                                    defaultValue={initialValues.address}
                                />
                                <FormHelperText id="address" >Address</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="city"
                                    InputProps={inputProps}
                                    defaultValue={initialValues.city}
                                />
                                <FormHelperText id="city">City</FormHelperText>
                            </FormControl>
                        </Stack>

                        <Stack width="100%" flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="state"
                                    defaultValue={initialValues.state}
                                    InputProps={inputProps}
                                />
                                <FormHelperText id="state" >State</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ width: '50%' }} variant="outlined">
                                <TextField
                                    id="zipCode"
                                    InputProps={inputProps}
                                    defaultValue={initialValues.zipCode}
                                />
                                <FormHelperText id="zipCode">Zip Code</FormHelperText>
                            </FormControl>
                        </Stack>

                        <Stack width="100%" flex={1} direction="column" justifyContent="space-around" alignItems="start" flexWrap="nowrap" spacing={2}>

                            <b>Primary Contact Info</b>
                            <Stack width="100%" flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>

                                <FormControl sx={{ width: '50%' }} variant="outlined">
                                    <TextField
                                        id="email"
                                        InputProps={inputProps}
                                        defaultValue={initialValues.email}
                                    />
                                    <FormHelperText id="email" >Email</FormHelperText>
                                </FormControl>

                                <FormControl sx={{ width: '50%' }} variant="outlined">
                                    <TextField
                                        id="phone"
                                        InputProps={inputProps}
                                        defaultValue={initialValues.phone}
                                    />
                                    <FormHelperText id="phone">Phone</FormHelperText>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack flex={1} direction="column"
                    style={{
                        height: "40%",
                        borderRadius: "7px",
                        justifyContent: "flex-start",
                        border: "#dadada  1px solid",
                    }
                    }>
                    <Stack flex={3} direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1} padding="20px">
                        <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Typography variant="h6" component="p">Org Favicon Logo</Typography>
                        </Stack>
                        <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Avatar sx={{ width: "96px", height: "96px", border: "#dadada   1px solid", padding: "15px", }} alt="org favicon" src={favicon} />
                        </Stack>
                    </Stack>

                    <Stack flex={1} direction="row" justifyContent="space-evenly" alignItems="center" style={{ borderTop: "#dadada 1px solid", }}>
                        <input hidden accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button style={{ fontSize: "12px" }} component="label" htmlFor="contained-button-file" onClick={onUploadPicture}>
                            UPLOAD PICTURE
                        </Button>
                        <Button style={{ fontSize: "12px" }} component="label" onClick={onRemovePicture} disabled={props.image == null}>
                            REMOVE PICTURE
                        </Button>
                    </Stack>
                </Stack >
            </Stack>
        </SettingsPage>
    )
}
export default OrganizationSettingsPage