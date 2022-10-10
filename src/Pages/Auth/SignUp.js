import { useState, useContext } from "react";
import { Stack, Typography, Grid, TextField, InputAdornment, Button } from "@mui/material";
import { ArrowForward, Visibility, VisibilityOff } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as  yup from 'yup';

import BackgroundImage from "images/login.png";
import BrandIcon from "images/stacked-favicon.png"

import { AuthContext } from 'Context/Auth/AuthProvider'
import { AppContext } from 'Context/AppProvider';
import { LoadingButton } from "@mui/lab";

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string()
    .required('Please enter your email')
    .email('Please enter a valid email')
    .trim(),
  password: yup.string()
    .required('Please enter your password')
    .trim(),
})

export default function Signup() {
  const app = useContext(AppContext)
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
      },
      (error) => {
        app.alert.setError(`${error.message}: ${error.response.data.error}`);
        setLoading(false);
      }
    );
  };

  const loginUserUsingTwitter = () => {
    setLoading(true);
    auth.loginWithTwitter().
      catch(error => {
        app.alert.setError(`You need link your account with Twitter: ${error.response.data.error}`);
      }).
      finally(() => {
        setLoading(false);
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      loginUserUsingCredential(values.email, values.password);
    }
  });

  return (
    <Stack
      flex={1}
      direction="column"
      alignItems="center"
      gap={3}
      py={2}
      px={[2, 5, 8.7]}
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <Stack alignSelf='stretch' direction='row' gap={1} justifyContent='space-between' alignItems='center' >
        <img src={BrandIcon} width={55} alt="brand" />
        {/* <Button
          variant='contained'
          size="large"
          color='neutral'
          component={Link}
          to='/singup'
          sx={{
            paddingY: 2,
            textTransform: 'none',
            letterSpacing: '1px',
          }}
        >
          Create your account
        </Button> */}
      </Stack>

      <Grid
        container
        sx={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '40px',
          overflow: "hidden",
        }}
      >
        <Grid item
          xs={12}
          sm={8}
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 5,
            paddingX: 7,
            gap: (theme) => theme.spacing(2),
          }}

        >
          <Typography
            component="h1"
            align="center"
            fontSize='40px'
            lineHeight={1.2}
            fontWeight={600}
            px='12px'
          >
            Sign in to your account
          </Typography>
          <Typography
            component="span"
            sx={{
              color: '#b7b7b7',
              fontSize: '1rem',
              lineHeight: 1.2,
              mb: 4
            }}
          >
            Complete login details to continue
          </Typography>

          <Button /* twitter */
            variant="outlined"
            size="large"
            color="primary"
            fullWidth
            onClick={loginUserUsingTwitter}
            endIcon={<TwitterIcon style={{ fontSize: 25, color: "#03A9F4", }} />}
            sx={{
              justifyContent: 'space-between',
              py: 1.7,
              fontSize: '1rem',
              lineHeight: 1.2,
            }}
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
              error={Boolean(formik.errors.email) && formik.touched.email}
              helperText={formik.touched.email && formik.errors.email || ' '}
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
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.password) && formik.touched.password}
              helperText={formik.touched.password && formik.errors.password || ' '}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"
                    onClick={handleShowPasswordClick}
                    sx={{
                      cursor: 'pointer',
                    }}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
            <Button color='neutral' sx={{ fontSize: '1rem', ml: 'auto' }}>
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
            endIcon={<ArrowForward />}
            sx={{
              mt: 2,
              py: 1.7,
              justifyContent: 'space-between',
              textTransform: 'none',
              letterSpacing: '1px',
            }}
          >
            Sign in to your account
          </LoadingButton>
        </Grid>

        <Grid item
          xs={0}
          sm={4}
          sx={{
            backgroundColor: "#373D4A",
          }}
        >

        </Grid>
      </Grid>
    </Stack>
  );
}