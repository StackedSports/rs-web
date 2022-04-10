import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Form, Formik } from 'formik'
import InputForm from './InputForm'

import * as Yup from 'yup'

const FormOrganizationSettings = (props) => {

    const initialValues = {
        organization: "",
        teamName: "",
        adress: "",
        city: "",
        state: "",
        zipCode: "",
        email: "",
        phone: "",
    }

    const validationSchema = Yup.object().shape({
        organization: Yup.string().required('Required'),
        teamName: Yup.string().required('Required'),
        adress: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        zipCode: Yup.string().required('Required'),
        email: Yup.string().required('Required')
            .email('Please enter a valid email address'),
        phone: Yup.string().required('Required'),
    })

    return (
        <Box sx={{
            display: "flex",
            flex: 2,
            flexDirection: "column",
        }}>
            <Stack
                flex={1}
                direction="row"
                justifyContent="space-between"
                alignItems="start"
                flexWrap="nowrap"
                marginTop="10px"
                marginBottom="35px">
                <b>Organization Info</b>
                <span style={{ color: '#7F7F7F', width: '65%' }}>Your org information can be edited bellow</span>
            </Stack>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <Stack flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>
                        <InputForm width="327px" height="70px" name="organization" label="Organization" placeholder="University of Miami" />
                        <InputForm width="327px" height="70px" name="teamName" label="Team Name" placeholder="Miami Football" />
                    </Stack>

                    <Stack flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>
                        <InputForm width="327px" height="70px" name="adress" label="Adress" placeholder="Street Adress" />
                        <InputForm width="327px" height="70px" name="city" label="City" placeholder="City" />
                    </Stack>

                    <Stack flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>
                        <InputForm width="327px" height="70px" name="state" label="State" placeholder="State" />
                        <InputForm width="327px" height="70px" name="zipCode" label="Zip Code" placeholder="Zip Code" />
                    </Stack>

                    <Stack flex={1} direction="column" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>
                        <b>Primary Contact Info</b>
                        <Stack flex={1} direction="row" justifyContent="space-between" alignItems="start" flexWrap="nowrap" spacing={2}>
                            <InputForm width="327px" height="70px" name="email" label="Email" placeholder="Email" />
                            <InputForm width="327px" height="70px" name="phone" label="Phone" placeholder="Phone" />
                        </Stack>
                    </Stack>
                    <button type="submit">Save Settings</button>
                </Form>
            </Formik>
        </Box>
    )
}

export default FormOrganizationSettings