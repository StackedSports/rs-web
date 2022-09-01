import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from '../Dialogs/FormBaseDialog';
import { createSnippets, updateSnippets } from 'Api/Endpoints';

const validationSchema = yup.object({
    content: yup
        .string('Enter with a valid snippet')
        .required('Snippet is required'),
});

export const SnippetsDialog = (props) => {
    const [error, setError] = useState(null);
    const [snippet, setSnippet] = useState({
        content: "",
    })

    const formik = useFormik({
        initialValues: snippet,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            console.log(values)
            if (props.snippet) {
                updateSnippets(props.snippet.id, values)
                    .then(() => {
                        props.onSusccess()
                        handleClose()
                    })
                    .catch(err => {
                        setError(err)
                    }).finally(() => {
                        formikHelpers.setSubmitting(false)
                    })
            } else {
                createSnippets(values)
                    .then(() => {
                        props.onSusccess()
                        handleClose()
                    })
                    .catch(err => {
                        setError(err)
                    }).finally(() => {
                        formikHelpers.setSubmitting(false)
                    })
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.snippet) {
            setSnippet(props.snippet)
        } else {
            setSnippet({
                content: ""
            })
        }
    }, [props.snippet])


    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick")
            return;
        formik.resetForm()
        setError(null)
        props.onClose()
    };

    return (
        <FormBaseDialog
            open={props.open}
            onClose={handleClose}
            title={props.snippet ? "Edit Snippet" : "Ad  Snippet"}
            onSubmit={formik.handleSubmit}
            loading={formik.isSubmitting}
            error={error}
        >

            <TextField
                label="Snippet"
                multiline
                minRows={3}
                maxRows={10}
                name='content'
                margin='dense'
                autoComplete='off'
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && formik.errors.content ? true : false}
                helperText={formik.touched.content && formik.errors.content}
                InputLabelProps={{ shrink: true }}
                disabled={formik.isSubmitting}
                fullWidth
            />

        </FormBaseDialog>
    )
}

export default SnippetsDialog