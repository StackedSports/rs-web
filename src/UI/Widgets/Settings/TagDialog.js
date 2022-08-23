import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from '../Dialogs/FormBaseDialog';
import { useTagMutation } from 'Api/ReactQuery';

const validationSchema = yup.object({
    name: yup
        .string('Enter with a valid tag')
        .required('Tag name is required')
});

const defaultTag = {
    name: "",
}

export const TagDialog = (props) => {
    const { update: updateTag } = useTagMutation()
    const [error, setError] = useState(null);
    const [tag, setTag] = useState(props.tag || defaultTag)

    const formik = useFormik({
        initialValues: tag,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            updateTag({ id: values.id, name: values.name }, {
                onSuccess: () => {
                    props.onSusccess && props.onSusccess()
                    handleClose()
                },
                onError: (err) => {
                    setError(err.message)
                },
                onSettled: () => {
                    formikHelpers.setSubmitting(false)
                }
            })
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.tag)
            setTag(props.tag)
        else
            setTag(defaultTag)
    }, [props.tag])

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
            title={props.title}
            onSubmit={formik.handleSubmit}
            loading={formik.isSubmitting}
            error={error}
        >
            <TextField
                label="Tag name"
                name="name"
                margin='dense'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? true : false}
                helperText={formik.touched.name && formik.errors.name}
                InputLabelProps={{ shrink: true }}
                disabled={formik.isSubmitting}
                fullWidth
            />

        </FormBaseDialog>
    )
}
