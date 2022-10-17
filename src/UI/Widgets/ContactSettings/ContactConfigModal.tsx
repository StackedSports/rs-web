import React from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { labelValues } from 'Pages/Settings/ContactSettingsPage'
import { FormBaseDialog } from '../Dialogs/FormBaseDialog'

interface ContactConfigModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (form: labelValues) => void,
    value?: labelValues
}

export const ContactConfigModal: React.FC<ContactConfigModalProps> = (props) => {

    const handleClose = () => {
        props.onClose()
    }

    const initalValues: labelValues = props.value || { customizable: false, enabled: false, id: '', index: 0, label: '', type: 'text' }

    const formik = useFormik<labelValues>({
        initialValues: initalValues,
        onSubmit: (values) => {
            console.log(values)
            props.onSubmit(values)
        },
        enableReinitialize: true,
    });

    return (
        <FormBaseDialog
            open={props.open}
            onClose={handleClose}
            title={"Edit Property"}
            onSubmit={formik.handleSubmit}
        >
            <TextField fullWidth name={'label'} value={formik.values.label} onChange={formik.handleChange} />
        </FormBaseDialog>
    )
}
