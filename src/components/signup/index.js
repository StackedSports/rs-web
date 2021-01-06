import React from "react";
import {
  SignupContainer,
  SignupWrapper,
  SignupRow,
  Column1,
  Column2,
  Img,
  Privacypolicy,
  PrivacypolicyContainer,
  VertivalSpace,
} from "./signupElements";
import Image from "../../images/login.png";
import Form from "./form";

export default function Signup() {
  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupRow>
          <Column1>
            <Form />
          </Column1>
          <Column2>
            <Img src={Image}></Img>
          </Column2>
        </SignupRow>
      </SignupWrapper>
    </SignupContainer>
  );
}
