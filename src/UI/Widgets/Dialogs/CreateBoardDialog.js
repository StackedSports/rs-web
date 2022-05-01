import { useState, useMemo } from 'react';

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
import { People } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '../Buttons/Button'
import { createNewBoard } from 'Api/Endpoints'


const validationSchema = yup.object({
  name: yup
    .string('Enter with a valid name')
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
export const CreateBoardDialog = (props) => {

  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      is_shared: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikHelpers) => {
      createNewBoard(values, props.selectedFilters)
        .then((res) => {
          console.log(values, res)
          props.onBoardCreated()
        })
        .catch(error => {
          formikHelpers.isSubmitting = false
          setError(error)
        })
    }
  });

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick")
      return;

    formik.resetForm()
    props.onClose()
  }

  const selectedFiltersKeys = useMemo(() => Object.keys(props.selectedFilters), [props.selectedFilters])
  // console.log(props.selectedFilters)
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
        Create Board
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
          label='Create Board Name'
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

        <Typography py={1} fontWeight='bold' fontSize='12px' color='text.secondary' >
          Filter Criteria:{' '}
          {props.selectedFilters && selectedFiltersKeys.map((key, index) => {
            const filter = props.selectedFilters[key];
            console.log(key)
            return (
              <Typography
                component='span'
                color='text.primary'
                fontWeight='700 !important'
                textTransform='capitalize'
              >
                {`${key}: ${filter?.map(f => f.name).join(', ')}${index === selectedFiltersKeys.length - 1 ? '' : '; '}`}
              </Typography>
            )
          })
          }
        </Typography>
        <Divider
          sx={{
            my: 2,
          }}
        />

        <Stack direction='row' gap={2}>
          <FormControlLabel
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
          />

          <Button
            variant='outlined'
            onClick={handleClose}
            name='Cancel'
            disabled={formik.isSubmitting}
          />
          <LoadingButton
            loading={formik.isSubmitting}
            loadingPosition="end"
            variant='contained'
            type='submit'
            endIcon={<People />}
          >
            Create Board
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>

  )
}

export default CreateBoardDialog
