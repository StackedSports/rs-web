import { useState } from "react";
import BackgroundImage from "images/login.png";
import { Stack, Typography, Grid, TextField, InputAdornment, Tooltip, Button, styled } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import * as  yup from 'yup';

const initalValues = {
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

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordClick = () => {
    setShowPassword(oldShowPassword => !oldShowPassword);
  }

  const loginUserUsingCredential = () => {
    setLoading(true);
    auth.login(email, password).then(
      (res) => {
        // console.log(res);
        // console.log("This is the resonse of login", res.data);
        //localStorage.setItem("user", JSON.stringify(res.data));
        //console.log(localStorage.getItem("user"));
        setLoading(false);
        // window.location.href = "/dashboard";
        console.log('redirecting...')
        setRedirect('/contacts')
      },
      (error) => {
        // console.log("this is error", error.JSON());
        console.log('error = ', error);
        notifyUser("Something went wrong please try again");
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


  return (
    <Stack
      flex={1}
      direction="column"
      alignItems="center"
      gap={4}
      padding={4}
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <Stack alignSelf='stretch'>
        <Button
          variant='contained'
          component={Link}
          to='/singup'
          sx={{
            textDecoration: 'none',
            alignSelf: 'flex-end',
            backgroundColor: '#00acee',
          }}
        >
          Create your account
        </Button>
      </Stack>

      <Grid
        container
        sx={{
          width: "100%",
          maxWidth: "700px",
          minHeight: "590px",
          borderRadius: (theme) => theme.spacing(5),
          overflow: "hidden",
        }}
      >
        <Grid item
          xs={12}
          md={8}
          component={Stack}
          direction="column"
          sx={{
            backgroundColor: "#fff",
          }}
          gap={5}
          justifyContent="center"
          alignItems="center"
        >
          <Typography align="center" component="h2" variant="h3" >
            Sign in to your account
          </Typography>
          <Typography style={{ color: '#ccc', fontWeight: 500 }} component="span" >
            Complete login details to continue
          </Typography>

          <Button /* twitter */
            sx={{
              width: "378px",
              padding: "10px 20px",
              border: "#dadada solid 1px",
              borderRadius: "5px",
              justifyContent: "space-between",
              color: "#000"
            }}
            onClick={loginUserUsingTwitter}
            name="Sign in with Twitter"
            endIcon={<TwitterIcon style={{ fontSize: 30, color: "#00acee", }} />}
          />

          <Typography style={{ color: '#ccc', fontWeight: 500 }} component="span" >
            Or
          </Typography>

          <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {(forkmikProps) => (
              <Form
              //onFocus={handleCloseError}
              >
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Email"
                  fullWidth
                  error={Boolean(forkmikProps.errors.email) && Boolean(forkmikProps.touched.email)}
                  helperText={forkmikProps.errors.email || ' '}
                />

                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Senha"
                  autoComplete="current-password"
                  fullWidth
                  margin="dense"
                  error={Boolean(forkmikProps.errors.password)}
                  helperText={forkmikProps.errors.password || ' '}
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

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!forkmikProps.isValid || !forkmikProps.dirty}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Iniciar Sessão
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item
          xs={0}
          md={4}
          sx={{
            backgroundColor: "#373D4A",
          }}
        >

        </Grid>

      </Grid>

    </Stack>
  );
}