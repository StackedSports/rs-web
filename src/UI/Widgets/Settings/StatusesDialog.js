import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from '../Dialogs/FormBaseDialog';
import { createStatus, updateStatus } from 'Api/Endpoints';

const validationSchema = yup.object({
    status: yup
        .string('Enter with a valid rank')
        .required('Rank is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid rank'),
});

const initialValues = {
    status: "",
}

export const StatusesDialog = (props) => {

    const [error, setError] = useState(null);
    const [status, setStatus] = useState({
        status: "",
    })

    const formik = useFormik({
        initialValues: status,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            console.log(values)
            if (props.status) {
                updateStatus(props.status.id, values)
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
                createStatus(values)
                    .then(() => {
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
        enableReinitialize: true,
    });
    
    useEffect(() => {
        if (props.status) {
            setStatus(props.status)
        }else{
            setStatus({
                status: ""
            })
        }
    }, [props.status])

    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick")
            return;
        formik.resetForm();
        setError(null);
        props.onClose()
    };

    return (
        <FormBaseDialog
            open={props.open}
            onClose={handleClose}
            title={props.rank ? "Edit Statuses" : "Add Statuses"}
            onSubmit={formik.handleSubmit}
            loading={formik.isSubmitting}
            error={error}
        >
            <TextField
                label="Status"
                name="status"
                margin='dense'
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && formik.errors.status ? true : false}
                helperText={formik.touched.status && formik.errors.status}
                InputLabelProps={{ shrink: true }}
                disabled={formik.isSubmitting}
                fullWidth
            />

        </FormBaseDialog>
    )
}
