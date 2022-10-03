import { useState, useMemo } from 'react';

import {
    Dialog,
    DialogTitle,
    Stack,
    DialogContent,
    TextField,
    Divider,
    Typography,
    Alert,
    Box,
    AlertTitle,
    DialogActions,
    IconButton,
    InputAdornment,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { PersonOutline, CheckCircleOutline, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom'

import Button from 'UI/Widgets/Buttons/Button';

import { createContact } from 'Api/Endpoints';
import { contactsRoutes } from 'Routes/Routes'

const validationSchema = yup.object({
    first_name: yup
        .string('Enter with a valid name')
        .required('Name is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(3, 'Name must be at least 3 characters')
        .max(40),
    last_name: yup
        .string('Enter with a valid name')
        .required('Name is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(3, 'Name must be at least 3 characters')
        .max(40),
    phone: yup
        .string('Enter with a valid phone number'),
    twitter_handle: yup
        .string('Enter with a valid twitter handle')
        .matches(/^[a-zA-Z0-9_]{1,15}$/, 'Please enter valid twitter handle')
});

// todo: add validation for twitter handle and phone validation, backend adds +1


export const CreateContactDialog = (props) => {

    const [error, setError] = useState(null)
    const [showCreatedContact, setShowCreatedContact] = useState(false)
    const [id, setId] = useState(null)

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            twitter_handle: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, formikHelpers) => {

            if (values.twitter_handle.length > 0 && !values.twitter_handle.startsWith('@')) {
                values.twitter_handle = `${values.twitter_handle}`
            }
            if (values.phone.length > 0 || values.twitter_handle.length > 0) {
                createContact(values).then((res) => {
                    setId(res.data.id)
                    props.onContactCreated()
                    formikHelpers.resetForm()
                    setShowCreatedContact(true)
                }).catch(error => {
                    setError(error)
                    formikHelpers.setSubmitting(false)
                })
            } else {
                formikHelpers.setSubmitting(false)
                formikHelpers.setFieldError('phone', 'Please enter at least one contact method')
                formikHelpers.setFieldError('twitter_handle', 'Please enter at least one contact method')
            }
        }
    });

    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick")
            return;

        formik.resetForm()
        setError(null)
        props.onClose()
    }

    const FormPanel = useMemo(() => (
        <>
            <DialogContent dividers>

                <Stack direction='row' gap={2} mb={1}>

                    <TextField
                        margin='dense'
                        name='first_name'
                        label='First Name'
                        placeholder='First Name'
                        type='text'
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.first_name}
                        disabled={formik.isSubmitting}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        fullWidth
                    />

                    <TextField
                        margin='dense'
                        name='last_name'
                        label='Last Name'
                        placeholder='Last Name'
                        type='text'
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.last_name}
                        disabled={formik.isSubmitting}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                        fullWidth
                    />

                </Stack>

                <TextField
                    margin='dense'
                    name='phone'
                    label='Phone'
                    placeholder='Phone'
                    type='text'
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.phone}
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                    }}
                    fullWidth
                />
                <Divider>
                    AND/OR
                </Divider>
                <TextField
                    margin='dense'
                    name='twitter_handle'
                    label='Twitter Handle'
                    placeholder='Twitter Handle'
                    type='text'
                    value={formik.values.twitter_handle}
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    error={formik.touched.twitter_handle && Boolean(formik.errors.twitter_handle)}
                    helperText={formik.touched.twitter_handle && formik.errors.twitter_handle}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                    }}
                />

                {(error !== null) &&
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(null);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        } >
                        <AlertTitle >Error</AlertTitle>
                        {error.message}
                    </Alert>
                }
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 2, paddingInline: 3 }}>
                <Button
                    onClick={handleClose}
                    color='primary'
                    size='large'
                    disabled={formik.isSubmitting}
                    variant='outlined'
                    name='Cancel'
                />

                <LoadingButton
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={formik.isSubmitting}
                    endIcon={<PersonOutline />}
                    loading={formik.isSubmitting}
                >
                    Create Profile
                </LoadingButton>
            </DialogActions>
        </>
    ), [formik])


    const CreatedProfilePanel = useMemo(() => (
        <>
            <DialogContent dividers>
                <Box sx={{ textAlign: 'center', mt: 1 }} >
                    <CheckCircleOutline color="success" sx={{ fontSize: '5rem !important' }} />
                    <Typography variant='h5' sx={{ mt: 1 }} gutterBottom>
                        Contact created!
                    </Typography>
                    <Link to={`${contactsRoutes.profile}/${id}`}>
                        click here to see the profile page
                    </Link>
                </Box>
            </DialogContent>

            <DialogActions sx={{ paddingBottom: 2, paddingInline: 3 }}>
                <Button
                    onClick={() => setShowCreatedContact(old => !old)}
                    variant='contained'
                    name='Create Another Contact'
                />
            </DialogActions>
        </>
    ), [id])

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            PaperProps={{
                onSubmit: formik.handleSubmit,
                component: "form",
            }}
        >

            <DialogTitle
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                }}
            >
                <PersonOutline color='primary' sx={{ verticalAlign: 'middle', mr:1 }} />
                New Contact Profile
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            {
                showCreatedContact ?
                    CreatedProfilePanel :
                    FormPanel
            }
        </Dialog>
    )
}

export default CreateContactDialog