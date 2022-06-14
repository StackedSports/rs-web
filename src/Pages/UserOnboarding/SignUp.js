import { useState, useContext } from "react";
import BackgroundImage from "images/login.png";
import { Box, Stack, Typography, Grid, TextField, InputAdornment, Tooltip, Button, styled } from "@mui/material";
import { ArrowForwardIos, Visibility, VisibilityOff } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as  yup from 'yup';

import { AuthContext } from 'Context/Auth/AuthProvider'
import { LoadingButton } from "@mui/lab";

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string()
    .required('Please enter your email')
    .email('Please enter a valid email'),
  password: yup.string()
    .required('Please enter your password')
    .trim(),
})

export default function Signup() {

  const auth = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPasswordClick = () => {
    setShowPassword(oldShowPassword => !oldShowPassword);
  }

  const loginUserUsingCredential = (email, password) => {
    setLoading(true);
    auth.login(email, password).then(
      (res) => {
        setLoading(false);
        console.log('redirecting...')
      },
      (error) => {
        console.log('error = ', error);
        console.log("Something went wrong please try again");
        setLoading(false);
      }
    );
  };

  const loginUserUsingTwitter = () => {
    setLoading(true);
    auth.loginWithTwitter().then(
      (res) => {
        setRedirect('/contacts')
      }).finally(() => {
        setLoading(false);
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(values)
      loginUserUsingCredential(values.email, values.password);
    }
  });

  return (
    <Stack
      flex={1}
      direction="column"
      alignItems="center"
      gap={4}
      p={4}
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <Stack alignSelf='stretch'>
        <Button
          variant='contained'
          size="large"
          color='neutral'
          component={Link}
          to='/singup'
          sx={{
            textDecoration: 'none',
            alignSelf: 'flex-end',
          }}
        >
          Create your account
        </Button>
      </Stack>

      <Grid
        container
        sx={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: (theme) => theme.spacing(4),
          overflow: "hidden",
        }}
      >
        <Grid item
          xs={12}
          sm={8}
          md={7}
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: (theme) => theme.spacing(4),
            gap: (theme) => theme.spacing(2),
          }}

        >
          <Typography align="center" component="h1" variant="h4" fontWeight='bold' >
            Sign in to your account
          </Typography>
          <Typography sx={{ color: '#b7b7b7', fontWeight: 500, mb: 2 }} component="span" >
            Complete login details to continue
          </Typography>

          <Button /* twitter */
            variant="outlined"
            size="large"
            color="primary"
            fullWidth
            onClick={loginUserUsingTwitter}
            endIcon={<TwitterIcon style={{ fontSize: 30, color: "#00acee", }} />}
            sx={{ justifyContent: 'space-between' }}
          >
            Sign in with Twitter
          </Button>

          <Typography style={{ color: '#ccc', fontWeight: 500 }} component="span" >
            Or
          </Typography>

          <Stack width={'100%'}>
            <TextField
              name="email"
              type="email"
              variant="outlined"
              color="primary"
              label="Email"
              fullWidth
              error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
              helperText={formik.errors.email || ' '}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              color="primary"
              label="Password"
              autoComplete="current-password"
              fullWidth
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password)}
              helperText={formik.errors.password || ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"
                    onClick={handleShowPasswordClick}
                    sx={{
                      cursor: 'pointer',
                    }}>
                    <Tooltip title={showPassword ? 'Show password' : 'Hide password'}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Button color='neutral' sx={{ ml: 'auto' }}>
              Forgot Password?
            </Button>
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={loading}
            fullWidth
            endIcon={<ArrowForwardIos />}
          >
            Sign in to your account
          </LoadingButton>
        </Grid>

        <Grid item
          xs={0}
          sm={4}
          md={5}
          sx={{
            backgroundColor: "#373D4A",
          }}
        >

        </Grid>

      </Grid>

    </Stack>
  );
}