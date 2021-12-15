import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #373d4a;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;
  font-family: ProximaNovaSemibold;
  padding-left: 1rem;
  &:hover {
    background: linear-gradient(
      90deg,
      #dddddd 10%,
      rgba(226, 232, 239, 0) 100%
    );
    border-left: 4px solid #a4a4a4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  color: #373d4a;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  text-align: center;
  margin-left: 1rem;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImgIcon = styled.img``;

const SubMenu = ({ item, contacts, index, selectedTab }) => {
  console.log("keykey", index, selectedTab);
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  // console.log("THis is path", item.path);
    console.log('sidebar = ',item, contacts, index, selectedTab);
  return (
    <>
      <div
        style={{
          borderLeft: "4px solid #a4a4a4",
          cursor: "pointer",
        }}
      ></div>
      <SidebarLink
        style={{
          background:
            index === selectedTab &&
            "linear-gradient(90deg,#dddddd 10%,rgba(226, 232, 239, 0) 100%)",
        }}
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <LabelContainer>
          {item.icon}
          {contacts == null && <SidebarLabel>{item.title}</SidebarLabel>}
        </LabelContainer>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
