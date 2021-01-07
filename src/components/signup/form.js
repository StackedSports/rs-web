import React, { useState } from "react";
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
export default function Signin() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = (event) => {
    console.log("checked :: ", checked);
    setChecked(!checked);
  };
  return (
    <>
      <Container>
        <FormWrap>
          <Header>
            <Logoimage src={Logo}></Logoimage>
            <HomeButton to='/dashboard'>Home</HomeButton>
          </Header>
          <FormContent>
            <Form action='#'>
              <FormH2>COMMUNICATION WITH A STRATEGY</FormH2>
              <FormH1>Login to your account</FormH1>
              <FormLabel htmlFor='for'>Email</FormLabel>
              <FormInputWrap>
                <FiMail
                  style={{
                    color: "#DFE2E6",
                    marginRight: "5px",
                    height: "16px",
                    width: "20px",
                  }}
                />
                <FormInput type='email' placeholder='Your Email'></FormInput>
              </FormInputWrap>

              <FormLabel htmlFor='for'>Password</FormLabel>
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
                  placeholder='Your Password'></FormInput>
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
                <FormButton type='submit'>Register</FormButton>
                <FormButton1 type='submit'>login</FormButton1>
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
