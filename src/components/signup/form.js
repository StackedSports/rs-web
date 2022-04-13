import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  FormButton1,
  FormH2,
  FormInputWrap,
  Text,
  FormButtonWrap,
  RememberWrap,
  Underline,
  Or,
  FormButton3,
  Logoimage,
  Header,
  HomeButton,
  Rememberme,
  Forgotpassword,
  TwitterButtonText,
  Privacypolicy,
} from "./signupElements";
import { FiMail } from "react-icons/fi";
import { MdVpnKey } from "react-icons/md";
import Checkbox from "./checkbox";
import { FaTwitter } from "react-icons/fa";
import Logo from "../../images/logo.png";
import { BsEyeFill } from "react-icons/bs";
import { loginUser, registerUser } from "../../ApiHelper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";

import { Redirect } from "react-router-dom";

import { AuthContext } from 'Context/Auth/AuthProvider'

var validator = require("email-validator");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Signin() {
  const classes = useStyles();

  const auth = useContext(AuthContext)
  
  const [redirect, setRedirect] = useState(null)

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    console.log("checked :: ", checked);
    setChecked(!checked);
  };

  const registerTheUser = () => {
    setLoading(true);
    registerUser(email, password).then(
      (res) => {
        console.log(res);
        if (res.statusText === "Created") {
          console.log("This is the resonse of login", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(localStorage.getItem("user"));
          setLoading(false);
          notifyUser("User Registered Successfully!!");
        }
      },
      (error) => {
        console.log("this is error", error);
        notifyUser("Something went wrong please try again");
        setLoading(false);
      }
    );
  };

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
        setRedirect('/dashboard')
      },
      (error) => {
        // console.log("this is error", error.JSON());
          console.log('error = ',error);
        notifyUser("Something went wrong please try again");
        setLoading(false);
      }
    );
  };

  useEffect(() => {}, []);

  const notifyUser = (data) => toast(data);

  if(redirect)
    return <Redirect to={redirect}/>

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>

      <Container>
        <FormWrap>
          <Header>
            <Logoimage src={Logo}></Logoimage>
            <HomeButton to="/dashboard">Home</HomeButton>
          </Header>
          <FormContent>
            <Form>
              <FormH2>COMMUNICATION WITH A STRATEGY</FormH2>
              <FormH1>Login to your account</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInputWrap>
                <FiMail
                  style={{
                    color: "#DFE2E6",
                    marginRight: "5px",
                    height: "16px",
                    width: "20px",
                  }}
                />
                <FormInput
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    // console.log("This is password", e.target.value);
                    setEmail(e.target.value);
                  }}
                ></FormInput>
              </FormInputWrap>

              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInputWrap>
                <MdVpnKey
                  style={{
                    color: "#DFE2E6",
                    marginRight: "5px",
                    height: "16px",
                    width: "20px",
                  }}
                />
                <FormInput
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    // console.log("This is password", e.target.value);
                    setPassword(e.target.value);
                  }}
                  placeholder="Your Password"
                ></FormInput>
                <BsEyeFill
                  style={{
                    color: "#DFE2E6",
                    marginRight: "5px",
                    height: "16px",
                    width: "20px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </FormInputWrap>
              <FormButtonWrap>
                <FormButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (email != "" && password != "") {
                      if (!validator.validate(email)) {
                        notifyUser("Please enter a valid email");
                      } else {
                        registerTheUser();
                      }
                    } else {
                      notifyUser("Please fill all fields");
                    }
                  }}
                >
                  Register
                </FormButton>
                <FormButton1
                  onClick={(e) => {
                    e.preventDefault();
                    if (email != "" && password != "") {
                      if (!validator.validate(email)) {
                        notifyUser("Please enter a valid email");
                      } else {
                        loginUserUsingCredential();
                      }
                    } else {
                      notifyUser("Please fill all fields");
                    }
                  }}
                >
                  login
                </FormButton1>
              </FormButtonWrap>

              <RememberWrap>
                <label>
                  <Checkbox checked={checked} onChange={handleCheckboxChange} />
                  <Rememberme>Remember me</Rememberme>
                </label>
                <label>
                  <Forgotpassword>Forgot password</Forgotpassword>
                </label>
              </RememberWrap>
              <Underline></Underline>
              <Or>
                <Forgotpassword>or</Forgotpassword>
              </Or>
              <FormButton3>
                <TwitterButtonText>
                  {" "}
                  <FaTwitter
                    style={{
                      color: "white",
                      marginRight: "10px",
                      height: "16px",
                      width: "19px",
                    }}
                  />
                  Login with Twitter
                </TwitterButtonText>
              </FormButton3>
            </Form>
          </FormContent>
        </FormWrap>
        <Privacypolicy>Privacy Policy</Privacypolicy>
      </Container>
    </>
  );
}
