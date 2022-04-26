import { useState, useEffect } from 'react'
import { TextField, MenuItem, FormGroup, FormControlLabel,Checkbox } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormBaseDialog } from "../Dialogs/FormBaseDialog";

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
  "person_relationship_type_id": yup.string().required("Required"),
  "first_name": yup.string().required("Required"),
  "last_name": yup.string().required("Required"),
  "phone": yup.string().required("Required"),
  "email": yup.string().required("Required").email("Invalid email address"),
  "lives_with": yup.boolean(),
  "active_in_life": yup.boolean(),
  "top_influencer": yup.boolean(),
  "twitter_profile": yup.string().required("Required")
})

export const CreatePersonDialog = (props) => {

  const [contact, setContact] = useState(props.contact || {});


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(values)
    }
  })

  const handleClose=()=>{
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
      >
        <MenuItem value="">
          Family
        </MenuItem>
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

      <TextField
        label="Lives With"
        name="lives_with"
        type='checkbox'
        fullWidth
        value={formik.values.lives_with}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.lives_with && Boolean(formik.errors.lives_with)}
        helperText={formik.touched.lives_with && formik.errors.lives_with}
      />

      <TextField
        label="Active in Life"
        name="active_in_life"
        type='checkbox'
        fullWidth
        value={formik.values.active_in_life}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.active_in_life && Boolean(formik.errors.active_in_life)}
        helperText={formik.touched.active_in_life && formik.errors.active_in_life}
      />

      <TextField
        label="Top Influencer"
        name="top_influencer"
        type='checkbox'
        fullWidth
        value={formik.values.top_influencer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        margin="dense"
        error={formik.touched.top_influencer && Boolean(formik.errors.top_influencer)}
        helperText={formik.touched.top_influencer && formik.errors.top_influencer}
      />

      <FormGroup>
        <FormControlLabel control={<Checkbox checked={formik.values.lives_with} onChange={formik.handleChange} name="lives_with" />} label="Lives With" />
        <FormControlLabel control={<Checkbox checked={formik.values.active_in_life} onChange={formik.handleChange} name="active_in_life" />} label="Active in Life" />
      </FormGroup>


    </FormBaseDialog>
  )
}
