import { useState, useEffect, useContext } from 'react'
import { TextField, MenuItem, FormGroup, FormControlLabel, Checkbox, Stack, RadioGroup, Radio, Button } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from "../Dialogs/FormBaseDialog";
import { createOpponent, updateOpponent, deleteOpponent } from 'Api/Endpoints';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const initialValues = {
  "week": 1,
  "name": "",
  "win_loss": true,
  "score": "",
  "notes": ""
}

const validationSchema = yup.object().shape({
  "week": yup.number().required("Required"),
  "name": yup.string().required("Required"),
  "win_loss": yup.boolean(),
  "score": yup.string(),
  "notes": yup.string()
})


export const CreateOpponentDialog = (props) => {
  const confirmDialog = useContext(ConfirmDialogContext);
  const [contact, setContact] = useState(props.contact || {});
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      if (contact.id) {
        formikHelpers.setSubmitting(true);
        if (props.opponent) {
          updateOpponent(contact.id, props.opponent.id, values)
            .then((res) => {
              if (props.onSuccess)
                props.onSuccess()
              handleClose()
            })
            .catch(err => {
              console.log(err)
              setError(err)
            }).finally(() => {
              formikHelpers.setSubmitting(false);
            })
        } else {
          createOpponent(contact.id, values)
            .then((res) => {
              if (props.onSuccess)
                props.onSuccess()
              handleClose()
            })
            .catch(err => {
              console.log(err)
              setError(err)
            }).finally(() => {
              formikHelpers.setSubmitting(false);
            })
        }
      }
    }
  })

  const onDeleteOpponent = () => {
    if (props.opponent) {
      confirmDialog.show("Delete Opponent", `Are you sure you want to delete this opponent (${props.opponent.name}) ?`, () => {
        formik.setSubmitting(true);
        deleteOpponent(contact.id, props.opponent.id)
          .then((res) => {
            if (props.onSuccess)
              props.onSuccess("removed")
            handleClose()
          })
          .catch(err => {
            console.log(err)
            setError(err)
          }).finally(() => {
            formik.setSubmitting(false);
          })
      })
    }
  }

  useEffect(() => {
    if (props.opponent) {
      formik.setValues(props.opponent)
    }
  }, [props.opponent])

  const handleClose = () => {
    props.onClose();
    formik.resetForm();
  }

  return (
    <FormBaseDialog
      open={props.open}
      onClose={handleClose}
      title={`${props.opponent ? `Update opponent` : 'New opponent'} for contact: ${props?.contact?.first_name} ${props?.contact?.last_name}`}
      onSubmit={formik.handleSubmit}
      loading={formik.isSubmitting}
      error={error}
      secondaryAction={props.opponent &&
        <Button variant="contained" color="error" size='large' sx={{ mr: 'auto' }} onClick={onDeleteOpponent}>
          Delete
        </Button>
      }
    >

      <TextField
        label="Name"
        name="name"
        placeholder='Name'
        type='text'
        fullWidth
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        InputLabelProps={{ shrink: true }}
      />
      <Stack gap={2} direction="row" flexWrap='wrap'>
        <TextField
          sx={{ flex: 1, minWidth: '200px' }}
          label="Score"
          name="score"
          placeholder='xx-xx'
          type='text'
          fullWidth
          value={formik.values.score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="dense"
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          sx={{ flex: 1, minWidth: '200px' }}
          label="Choose Week"
          name="week"
          select
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.week}
          variant="outlined"
          margin="dense"
          SelectProps={{
            MenuProps: {
              sx: { maxHeight: "300px" }
            }
          }}
        >
          {[...Array(17)].map((option, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TextField
        label="Notes"
        name="notes"
        placeholder='Notes'
        type='text'
        multiline
        fullWidth
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.notes && Boolean(formik.errors.notes)}
        helperText={formik.touched.notes && formik.errors.notes}
        InputLabelProps={{ shrink: true }}
      />

      <RadioGroup
        row
        name='win_loss'
        value={formik.values.win_loss}
        onChange={(e) => {
          formik.setFieldValue('win_loss', e.target.value === 'true')
        }}
      >
        <FormControlLabel value={true} control={<Radio />} label="Win" />
        <FormControlLabel value={false} control={<Radio />} label="Loss" />
      </RadioGroup>

    </FormBaseDialog>
  )
}

export default CreateOpponentDialog