import { useState, useEffect, useMemo } from 'react'
import { TextField, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from "../Dialogs/FormBaseDialog";
import { createPerson } from 'Api/Endpoints';
import { usePeopleTypes } from 'Api/Hooks';

const initialValues = {
  "person_relationship_type_id": "",
  "first_name": "",
  "last_name": "",
  "phone": "",
  "email": "",
  "lives_with": false,
  "active_in_life": false,
  "top_influencer": false,
  "twitter_profile": ""
}

const validationSchema = yup.object().shape({
  "person_relationship_type_id": yup.number().required("Required"),
  "first_name": yup.string().required("Required"),
  "last_name": yup.string().required("Required"),
  "phone": yup.string(),
  "email": yup.string().email("Invalid email address"),
  "lives_with": yup.boolean(),
  "active_in_life": yup.boolean(),
  "top_influencer": yup.boolean(),
  "twitter_profile": yup.string()
})

export const CreatePersonDialog = (props) => {

  const [contact, setContact] = useState(props.contact || {});
  const [error, setError] = useState(null);
  const peopleTypes = usePeopleTypes();

  const relationshipsTypesOptions = useMemo(() => {
    return peopleTypes.items.map(item => (
      <MenuItem key={item.id} value={item.id}>
        {item.description}
      </MenuItem>
    ))
  }, [peopleTypes.items])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      if (contact.id) {
        formikHelpers.setSubmitting(true);
        createPerson(contact.id, values)
          .then((res) => {
            if (props.onCreated && typeof props.onCreated instanceof Function && res.status === 201)
              props.onCreated(res.data)
            handleClose();
          })
          .catch(err => {
            setError(err)
          }).finally(() => {
            formikHelpers.setSubmitting(false);
          })
      }
    }
  })

  const handleClose = () => {
    props.onClose();
    formik.resetForm();
  }

  return (
    <FormBaseDialog
      open={props.open}
      onClose={handleClose}
      title={`New Relationship for contact: ${props?.contact?.first_name} ${props?.contact?.last_name}`}
      onSubmit={formik.handleSubmit}
      loading={formik.isSubmitting}
      error={error}
    >

      <TextField
        label="Relationship Type"
        name="person_relationship_type_id"
        select
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.person_relationship_type_id}
        variant="outlined"
        margin="dense"
        SelectProps={{
          MenuProps: {
            sx: { maxHeight: "300px" }
          }
        }}
      >
        {relationshipsTypesOptions}
      </TextField>

      <TextField
        label="First Name"
        name="first_name"
        type='text'
        fullWidth
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />

      <TextField
        label="Last Name"
        name="last_name"
        type='text'
        fullWidth
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
      />

      <TextField
        label="Phone"
        name="phone"
        type='text'
        fullWidth
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <TextField
        label="Email"
        name="email"
        type='text'
        fullWidth
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        label="Twitter Profile"
        name="twitter_profile"
        type='text'
        fullWidth
        value={formik.values.twitter_profile}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.twitter_profile && Boolean(formik.errors.twitter_profile)}
        helperText={formik.touched.twitter_profile && formik.errors.twitter_profile}
      />

      <FormGroup >
        <FormControlLabel control={<Checkbox checked={formik.values.lives_with} onChange={formik.handleChange} name="lives_with" />} label="Lives With?" />
        <FormControlLabel control={<Checkbox checked={formik.values.active_in_life} onChange={formik.handleChange} name="active_in_life" />} label="Active in Life?" />
        <FormControlLabel control={<Checkbox checked={formik.values.top_influencer} onChange={formik.handleChange} name="top_influencer" />} label="Top Influencer?" />
      </FormGroup>

    </FormBaseDialog>
  )
}

export default CreatePersonDialog