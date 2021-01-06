import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignupContainer = styled.div`
  height: 100%;
`;

export const SignupWrapper = styled.div`
  display: grid;
`;

export const SignupRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Column1 = styled.div``;

export const Column2 = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  @media screen and (max-width: 1000px) {
    min-height: 800px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
  }

  @media screen and (max-width: 500px) {
    padding-right: 4rem;
  }
`;

export const FormWrap = styled.div`
  height: 100%;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: black;
  font-weight: 700;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  color: #222222;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.73px;
  line-height: 29px;
  margin-bottom: 2rem;
`;
export const FormH2 = styled.h1`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 17px;
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 5px;
  margin-bottom: 0.8rem;
  margin-left: 0.7rem;
`;

export const FormInput = styled.input`
  border: none;
  ::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.43px;
    line-height: 17px;
  }
  width: 80%;
  :focus {
    outline: none;
  }
`;

export const FormInputWrap = styled.div`
  padding: 10px 10px;
  margin-bottom: 32px;
  justify-content: flex-start;
  border-radius: 4px;
  border-color: rgb(117, 117, 117);
  border-width: 1px;
  border-style: solid;
  display: flex;
`;

export const FormButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FormButton = styled.button`
  border: none;
  border-radius: 4px;
  color: #3fa2f9;
  font-size: 20px;
  cursor: pointer;
  background: #ffffff;
  width: 45%;
  border-color: #3fa2f9;
  border-width: 2px;
  border-style: solid;
  height: 40px;
`;
export const FormButton1 = styled.button`
  background: #3fa2f9;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  width: 45%;
  height: 40px;
  cursor: pointer;
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;

export const RememberWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Underline = styled.div`
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: rgb(117, 117, 117);
  margin-top: 2rem;
`;

export const Or = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

export const FormButton3 = styled.button`
  background: #348ef7;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Logoimage = styled.img`
  margin: 44px;
`;

export const HomeButton = styled(Link)`
  margin: 51px;
  text-decoration: none;
  color: #6b6c6f;
  width: 40px;
  height: 10px;
`;

export const Rememberme = styled.span`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 1rem;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 17px;
`;

export const Forgotpassword = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 17px;
`;

export const TwitterButtonText = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 17px;
`;

export const PrivacypolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-space-between;
`;

export const VertivalSpace = styled.div`
  height: 100%;
`;

export const Privacypolicy = styled.p`
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.43px;
  line-height: 17px;
  margin: 44px;
  margin-top: 4rem;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    margin-top: 8rem;
  }
`;
