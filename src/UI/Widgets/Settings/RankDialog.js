import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from '../Dialogs/FormBaseDialog';
import { createRank, updateRank } from 'Api/Endpoints';

const validationSchema = yup.object({
  rank: yup
    .string('Enter with a valid rank')
    .required('Rank is required'),
});

export const RankDialog = (props) => {
  const [error, setError] = useState(null);
  const [rank, setRank] = useState({
    rank: "",
  })

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
            setError(err)
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
            setError(err)
          }).finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (props.rank) {
      setRank(props.rank)
    }else{
      setRank({
        rank: ""
      })
    }
  }, [props.rank])

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick")
      return;

    formik.resetForm()
    setError(null)
    props.onClose()
  }

  return (
    <FormBaseDialog
      open={props.open}
      onClose={handleClose}
      title={props.rank ? "Edit Rank" : "Add Rank"}
      onSubmit={formik.handleSubmit}
      loading={formik.isSubmitting}
      error={error}
    >
      <TextField
        label="Rank"
        name="rank"
        margin='dense'
        autoComplete='off'
        value={formik.values.rank}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rank && formik.errors.rank ? true : false}
        helperText={formik.touched.rank && formik.errors.rank}
        InputLabelProps={{ shrink: true }}
        disabled={formik.isSubmitting}
        fullWidth
      />

    </FormBaseDialog>
  )
}

export default RankDialog
