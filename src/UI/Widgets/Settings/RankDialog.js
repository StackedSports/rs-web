import { useState, useEffect } from 'react'
import {  TextField} from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { SettingsBaseDialog } from './SettingsBaseDialog';

const validationSchema = yup.object({
  rank: yup
    .string('Enter with a valid rank')
    .required('Rank is required')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid rank'),
});

export const RankDialog = (props) => {
  const [error, setError] = useState(null);
  const [rank, setRank] = useState({
    rank: "",
  })
  useEffect(() => {
    if (props.rank) {
      setRank(props.rank)
    }
  }, [props.rank])

  const formik = useFormik({
    initialValues: rank,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(values)
      if (props.rank) {
        updateRank(props.rank.id, values)
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
        createRank(values)
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
  });

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick")
      return;

    formik.resetForm();
    props.onClose()
  }

  return (
    <SettingsBaseDialog
      open={props.open}
      onClose={handleClose}
      title={props.rank ? "Edit Rank" : "Add Rank"}
      onSubmit={formik.handleSubmit}
      loading = {formik.isSubmitting}
    >
      <TextField
        label="Rank"
        name="rank"
        margin='dense'
        value={formik.values.rank}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rank && formik.errors.rank ? true : false}
        helperText={formik.touched.rank && formik.errors.rank}
        InputLabelProps={{ shrink: true }}
        disabled={formik.isSubmitting}
        fullWidth
      />

    </SettingsBaseDialog>
  )
}

export default RankDialog
