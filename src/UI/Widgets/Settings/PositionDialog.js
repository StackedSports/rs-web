import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, TextField, IconButton, DialogActions, MenuItem } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { createPosition, updatePosition } from 'Api/Endpoints';

const validationSchema = yup.object({
    name: yup
        .string('Enter with a valid name')
        .required('Name is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    abbreviation: yup
        .string('Enter with a valid abbreviation')
        .required('abbreviation is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid abbreviation'),
    standardized_name: yup
        .string('Enter with a valid standardized name')
        .required('standardized name'),
    role: yup
        .string('Enter with a valid role')
        .required('role is required'),
    alternate_names: yup
        .string('Enter with a valid alternate names')
});

export const PositionDialog = (props) => {

    const [error, setError] = useState(null);
    const [position, setPosition] = useState({
        name: "",
        abbreviation: "",
        standardized_name: "",
        role: "", //Accepts `Offense`, `Defense`, `Special`
        alternate_names: ""
    })

    useEffect(() => {
        if (props.position) {
            setPosition(props.position)
        }
    }, [props.position])

    const formik = useFormik({
        initialValues: position,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            console.log(values)
            if (props.position) {
                updatePosition(props.position.id, values)
                    .then(() => {
                        props.onSusccess()
                        handleClose()
                    })
                    .catch(err => {
                        setError(err.message)
                    }).finally(() => {
                        formikHelpers.setSubmitting(false)
                    })

            } else {
                createPosition(values)
                    .then(res => {
                        props.onSusccess()
                        handleClose()
                    })
                    .catch(err => {
                        setError(err.message)
                    }).finally(() => {
                        formikHelpers.setSubmitting(false)
                    })
            }
        },
    });

    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick")
            return;

        formik.resetForm();
        props.onClose()
    }

    return (
        <Dialog
            component="form"
            maxWidth="md"
            fullWidth
            open={props.open}
            onClose={handleClose}
            onSubmit={formik.handleSubmit}
        >
            <DialogTitle
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                }}
            >
                {props.title}

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

            <DialogContent
                sx={{
                    ' >*:not(:last-child) ': {
                        marginBottom: '1rem'
                    },
                }}
            >
                <TextField
                    margin="dense"
                    name='name'
                    label="Name*"
                    type='text'
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputLabelProps={{ shrink: true }}
                    disabled={formik.isSubmitting}
                />
                <TextField
                    margin="dense"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Abbreviation*"
                    name='abbreviation'
                    type='text'
                    value={formik.values.abbreviation}
                    onChange={formik.handleChange}
                    error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                    helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                    disabled={formik.isSubmitting}
                />
                <TextField
                    margin="dense"
                    fullWidth
                    name='standardized_name'
                    InputLabelProps={{ shrink: true }}
                    label="Standardized Name*"
                    type='text'
                    value={formik.values.standardized_name}
                    onChange={formik.handleChange}
                    error={formik.touched.standardized_name && Boolean(formik.errors.standardized_name)}
                    helperText={formik.touched.standardized_name && formik.errors.standardized_name}
                    disabled={formik.isSubmitting}
                />
                <TextField
                    margin="dense"
                    fullWidth
                    name='role'
                    select
                    InputLabelProps={{ shrink: true }}
                    label="Role*"
                    type='text'
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                    disabled={formik.isSubmitting}
                >
                    <MenuItem value="Offense">Offense</MenuItem>
                    <MenuItem value="Offense">Defense</MenuItem>
                    <MenuItem value="Offense">Special</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    fullWidth
                    name='alternate_names'
                    InputLabelProps={{ shrink: true }}
                    label="Alternate Names"
                    type='text'
                    value={formik.values.alternate_names}
                    onChange={formik.handleChange}
                    error={formik.touched.alternate_names && Boolean(formik.errors.alternate_names)}
                    helperText={formik.touched.alternate_names && formik.errors.alternate_names}
                    disabled={formik.isSubmitting}
                />

            </DialogContent>
            <DialogActions sx={{ padding: '0 20px 24px' }}>
                <LoadingButton
                    type="submit"
                    size='large'
                    variant="contained"
                    color="primary"
                    loading={formik.isSubmitting}
                >
                    Salvar
                </LoadingButton>
            </DialogActions>

        </Dialog>
    )
}

export default PositionDialog