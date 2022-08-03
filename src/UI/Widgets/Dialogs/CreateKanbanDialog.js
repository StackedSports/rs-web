import { useState, useEffect, useMemo } from 'react';

import {
  Dialog,
  DialogTitle,
  Stack,
  DialogContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  Typography,
  Alert,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '../Buttons/Button'

import { createKanban } from 'Api/Firebase/Kanban/Kanban'

const validationSchema = yup.object({
  name: yup
    .string('Name format invalid')
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
});

/**
 * 
 * @param {boolean} open controls the state of the dialog open/close
 * @param {function} onClose callback function to be called when the dialog is closed
 * @param {object} selectedFilters Object with the selected filters Object.Keys are the filter names and the values[] are the array with selected filters name
 * @returns 
 */
export const CreateKanbanDialog = (props) => {

  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      is_shared: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikHelpers) => {
      const { name } = values

    //   return console.log('new kanban ' + name)

      createKanban(name)
        .then(() => {
            formikHelpers.setSubmitting(false)
            if(props.onSuccess)
                props.onSuccess()
        })
        .catch((error) => {
            console.log(error)
            formikHelpers.setSubmitting(false)
        })
    }
  });


  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick")
      return;

    formik.resetForm()
    props.onClose()
  }

  return (
    <Dialog
      component="form"
      open={props.open}
      onClose={handleClose}
      aria-labelledby='form-dialog-save-board'
      fullWidth
      maxWidth='sm'
      onSubmit={formik.handleSubmit}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold !important',
        }}
      >
        New Kanban
      </DialogTitle>

      <DialogContent>
        <Divider
          sx={{
            mb: 3,
          }}
        />
        {error && (
          <Alert security='true' severity='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <TextField
          margin='dense'
          id='name'
          name='name'
          label='Kanban Name'
          type='text'
          autoComplete='off'
          value={formik.values.name}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          InputProps={{
            sx: {
              fontSize: '1.2rem',
            }
          }}
          InputLabelProps={{
            sx: {
              color: 'text.disabled',
            }
          }}
        />

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Stack direction='row' gap={2} justifyContent="flex-end">
          {/* <FormControlLabel
            sx={{
              mr: 'auto',
              alignSelf: 'center',
            }}
            control={
              <Checkbox
                name='is_shared'
                color='primary'
                disabled={formik.isSubmitting}
                checked={formik.values.is_shared}
                onChange={formik.handleChange}
              />
            }
            label='Share with team'
          /> */}

          <Button
            variant='outlined'
            onClick={handleClose}
            name='Cancel'
            disabled={formik.isSubmitting}
          />
          <LoadingButton
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
            loadingPosition="end"
            variant='contained'
            type='submit'
          >
            Create
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>

  )
}

export default CreateKanbanDialog
