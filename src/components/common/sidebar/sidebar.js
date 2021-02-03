import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebarData";
import SubMenu from "./subMenu";
import { IconContext } from "react-icons/lib";
import DashboardLogo from "../../../images/dashboardLogo.png";
import { FiSearch } from "react-icons/fi";
import Logo from "../../../images/logoRight.png";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import ForumIcon from "@material-ui/icons/Forum";
import { BiChat, BiBell } from "react-icons/bi";
import Modal from "../../dashboard/model";
import { GlobalStyle } from "./globalStyle";
import { IoIosMenu } from "react-icons/io";
import { Grid } from "@material-ui/core";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";

const Nav = styled.div`
  height: 70px;
  display: flex;
  background: white;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavResponsive = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    height: 70px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  color: #060606;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 71px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;

  @media screen and (min-width: 1000px) {
    left: 0;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Logoimage = styled.img`
  margin: 44px;
  height: 38px;
  width: 176px;
`;

const Button = styled(Link)`
  border-radius: 5px;
  background: #3871da;
  white-space: nowrap;
  padding: 0.5rem;
  width: 219px;
  margin: 2rem;
  box-sizing: border-box;
  font-weight: bold;
  color: white;
  font-size: 14px;
  outtion: all 0.2s ease-in-out;
  @medialine: none;
  border: none;
  height: 40px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transi screen and (max-width: 1000px) {
    width: 180px;
  }
`;

const LogoContainer = styled.div`
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right-width: 2px;
  border-right-color: #d8d8d8;
  border-right-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #d8d8d8;
  border-bottom-style: solid;
  height: 70px;
`;

const NavLogo = styled.img`
  height: 37px;
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  border: none;
  background: #f5f6f9;
  font-size: 14px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    letter-spacing: 0.43px;
    line-height: 17px;
  }
  width: 80%;
  :focus {
    outline: none;
  }
`;

const FormInputWrap = styled.div`
  padding: 5px;
  padding-right: 0px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  border-color: rgb(117, 117, 117);
  border-width: 1px;
  background: #f5f6f9;
  display: flex;
  width: 600px;
  margin: 2rem;
  height: 40px;
`;

const LeftSectionNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

const NotificationIcon = styled(NotificationsIcon)``;

const HeaderIcons = styled.div`
  display: flex;
`;

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const setOpen = (a) => {
    setShowModal(a);
  };

  const showSidebar = () => setSidebar(!sidebar);

  console.log("This is props contacts", props.contacts);
  return (
    <>
      <Modal open={showModal} setShowModal={setShowModal} />
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavResponsive>
          <IoIosMenu
            style={{ color: "#222222", margin: "2rem" }}
            size={30}
            onClick={showSidebar}
          />

          <LeftSectionNav>
            <BiBell
              style={{
                color: "#999898",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24.2px",
                width: "21.2px",
              }}
            />
            <BiChat
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24px",
                width: "25px",
              }}
            />
          </LeftSectionNav>
        </NavResponsive>
        <Nav>
          {props.contacts === true ? (
            <LogoContainer style={{ width: 60 }}>
              <NavLogo src={DashboardLogo} style={{ width: 50 }} />
            </LogoContainer>
          ) : (
            <LogoContainer>
              <NavLogo src={DashboardLogo} />
            </LogoContainer>
          )}
          {props.contacts === true ? (
            <Button onClick={openModal}>+ Add Contact</Button>
          ) : (
            <div></div>
          )}

          <FormInputWrap>
            <FiSearch
              style={{
                color: "#999898",
                marginRight: "5px",
                marginLeft: "5px",
                height: "26px",
                width: "30px",
              }}
            />
            <FormInput
              type="email"
              placeholder="Search for contacts by name, phone number, Twitter Handle or School"
            ></FormInput>
          </FormInputWrap>
          <LeftSectionNav>
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <BiBell
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24.2px",
                width: "21.2px",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <BiChat
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24px",
                width: "25px",
              }}
            />
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <Logoimage src={Logo}></Logoimage>
          </LeftSectionNav>
        </Nav>
        <SidebarNav
          sidebar={sidebar}
          style={{ width: props.contacts ? 60 : 250 }}
        >
          <Grid container direction="column">
            <SidebarWrap style={{ position: "relative", zIndex: 12 }}>
              {props.contacts === true ? (
                <div></div>
              ) : (
                <Button onClick={openModal}>+ New</Button>
              )}

              {SidebarData.map((item, index) => {
                return (
                  <SubMenu contacts={props.contacts} item={item} key={index} />
                );
              })}
            </SidebarWrap>
            <div
              style={{
                height: "100%",
                position: "absolute",
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                style={{
                  padding: 20,
                  paddingTop: 0,

                  height: "90%",
                }}
              >
                <Grid item md={4} xs={4} lg={4}>
                  {" "}
                  <img
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    src={
                      JSON.parse(localStorage.getItem("user")).twitter_profile
                        .profile_image
                    }
                  ></img>
                </Grid>
                <Grid item md={8} xs={8} lg={8}>
                  {props.contacts === true ? (
                    <div></div>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ height: "100%" }}
                    >
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {JSON.parse(localStorage.getItem("user")).first_name +
                          " " +
                          JSON.parse(localStorage.getItem("user")).last_name}
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
