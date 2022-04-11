import SettingsPage from './SettingsPage'
import BoxFaviconOrganization from './BoxFaviconOrganization'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

const OrganizationSettingsPage = (props) => {

    const initialValues = {
        organization: "University of Miami",
        teamName: "Miami Football",
        address: "Street Adress",
        city: "City",
        state: "State",
        zipCode: "Zip Code",
        email: "Email",
        phone: "Phone",
    }

    const inputProps = {
        readOnly: true,
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
                        padding: "15px 50px 30px 20px",
                        borderBottom: "#dadada  1px solid",
                    }}
                        width="100%" flex={1} direction="row" justifyContent="space-between"
                        alignItems="start" flexWrap="nowrap">

                        <b>Organization Info</b>
                        <span style={{ color: '#7F7F7F', width: '65%' }}>Your org information can be edited bellow</span>
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
                <BoxFaviconOrganization />
            </Stack>
        </SettingsPage>
    )
}

export default OrganizationSettingsPage