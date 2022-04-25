import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { SettingsBaseDialog } from './SettingsBaseDialog';

const validationSchema = yup.object({
    status: yup
        .string('Enter with a valid rank')
        .required('Rank is required')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid rank'),
});

export const StatusesDialog = (props) => {

    const [error, setError] = useState(null);
    const [rank, setRank] = useState({
        status: "",
    })

    return (
        <div>StatusesDialog</div>
    )
}
