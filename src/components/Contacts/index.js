import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Checkbox, TextField } from "@material-ui/core";
import { FaSlidersH } from "react-icons/fa";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import SendIcon from "@material-ui/icons/Send";
import RowingIcon from "@material-ui/icons/Rowing";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import AvatarImg from "../../images/avatar.jpeg";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styled from "styled-components";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import IconButton from "../common/Buttons/IconButton";

const useStyles = makeStyles({
  tableHeading: {
    fontWeight: 700,
    fontSize: 15,
  },
  tableFields: {
    fontWeight: 500,
    fontSize: 15,
  },
  sideFilter: {
    padding: 5,
    fontWeight: 600,
    fontSize: 15,
    paddingBottom: 0,
    marginBottom: 0,
    cursor: "pointer",
  },
  sideSubFilter: {
    padding: 5,
    fontWeight: 500,
    fontSize: 13,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 10,
    cursor: "pointer",
  },
  tags: {
    border: "1px solid #d8d8d8",
    height: 30,
    width: 120,
    fontWeight: 600,
    borderRadius: 4,
  },
});

function Home() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState(null);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(false);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");

  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);

  const statuses = [
    {
      value: "1",
      label: "Offer Hold",
    },
    {
      value: "1",
      label: "Offer Take",
    },
    {
      value: "1",
      label: "Off Board",
    },
    {
      value: "1",
      label: "Not Good Enough",
    },
  ];
  const filtesSpacingStyle = {
    marginRight: 15,
  };
  const renderFilters = () => {
    return (
      <Grid
        container
        direction="row"
        spacing={1}
        style={{
          marginTop: 25,
          borderBottom: "1px solid #f8f8f8",
          paddingBottom: 20,
        }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title={statusFilter || "Status"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
                setFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Rank"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: statusFilter === option.label ? "#348ef7" : "white",
                color: statusFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStatusFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Grid>
    );
  };

  if (localStorage.getItem("user")) {
  } else {
    window.location.href = "/";
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      // console.log("There is a user");
      // setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      window.location.href = "/";
    }
  }, []);

  console.log("This is filter bar", filterBar);
  return (
    <DarkContainer style={{ padding: 20, marginLeft: 60 }}>
      <Grid container direction="row">
        {showSideFilters === true && (
          <div style={{ width: "15%" }}>
            <p
              style={{
                padding: 5,
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Contacts
            </p>
            <p className={classes.sideFilter}>
              All Contacts{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                setshowSubSideFilters(!showSideSubFilters);
              }}
            >
              My Boards
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            {showSideSubFilters === true && (
              <div>
                <p
                  className={classes.sideSubFilter}
                  onClick={() => {
                    setFilter("Fl Offer");
                  }}
                >
                  Fl Offers Take
                </p>
                <p className={classes.sideSubFilter}>Fl Offers Hold</p>
              </div>
            )}

            <p className={classes.sideFilter}>
              All Contacts{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
          </div>
        )}

        <div
          style={{
            width: showSideFilters === true ? "85%" : "100%",
            height: "100%",
            background: "white",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Grid container direction="row">
            <Grid item md={6} sm={6}>
              <FormatAlignLeftIcon
                onClick={(e) => {
                  setshowSideFilters(!showSideFilters);
                }}
                style={{ cursor: "pointer", fontSize: 18 }}
              ></FormatAlignLeftIcon>

              <span
                style={{
                  padding: 5,
                  fontWeight: "bold",
                  marginLeft: 20,
                }}
              >
                All Contacts
              </span>
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid container direction="row" justify="flex-end">
                <IconTextField
                  width={180}
                  text="Save as Board"
                  textColor="gray"
                  icon={
                    <AccountBoxIcon
                      style={{ color: "#3871DA" }}
                    ></AccountBoxIcon>
                  }
                ></IconTextField>
                <IconTextField
                  text="Filter"
                  onClick={() => {
                    setShowFiltersRow(!showFiltersRow);
                  }}
                  icon={<FaSlidersH style={{ color: "#3871DA" }}></FaSlidersH>}
                ></IconTextField>
              </Grid>
            </Grid>
          </Grid>
          {filter != null && (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.tags}
            >
              {filter}
              <ClearIcon
                onClick={() => {
                  setFilter(null);
                }}
                style={{ color: "red", fontSize: 17, cursor: "pointer" }}
              ></ClearIcon>{" "}
            </Grid>
          )}
          <div
            style={{
              width: "100%",
              border: "1px solid #f8f8f8",
              marginTop: 10,
            }}
          ></div>
          {showFiltersRow === true ? renderFilters() : <div></div>}
          <Grid container direction="row" alignItems="center">
            <Grid item md={3} sm={3}>
              <p
                style={{
                  padding: 5,
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                Contacts
              </p>
              <span
                style={{
                  padding: 5,
                  fontWeight: "bold",
                  marginTop: 20,
                  fontSize: 14,
                  width: "100%",
                }}
              >
                You have <span style={{ color: "#3871DA" }}>1806</span> contacts
                in the system
              </span>
            </Grid>
            <Grid item md={3} sm={3}>
              <IconButton
                text="Send Message"
                textColor="white"
                width={170}
                icon={<SendIcon style={{ color: "white" }}></SendIcon>}
              ></IconButton>
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid container direction="row" justify="flex-end">
                <IconTextField
                  // width={180}
                  width={90}
                  text="Action"
                  textColor="gray"
                  icon={<RowingIcon style={{ color: "#3871DA" }}></RowingIcon>}
                ></IconTextField>
                <IconTextField
                  width={80}
                  text="Tag"
                  icon={
                    <LocalOfferOutlinedIcon
                      style={{ color: "#3871DA" }}
                    ></LocalOfferOutlinedIcon>
                  }
                ></IconTextField>
                <IconTextField
                  width={80}
                  text={
                    <ViewCarouselIcon
                      style={{ color: "#3871DA" }}
                    ></ViewCarouselIcon>
                  }
                  icon={<ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>}
                ></IconTextField>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ background: "#f5f6f9", minWidth: 1080 }}
            >
              <Grid item md={1} xs={1}>
                <Checkbox></Checkbox>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Name</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Last Name</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Twitter</span>
              </Grid>
              <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Phone</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>State</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Grade Year</span>
              </Grid>
              <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>School</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Date Added</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Status</span>
              </Grid>
            </Grid>
            {[1, 2, 3, 4, 6, 7, 8, 9].map(() => {
              return (
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{
                    border: "1px solid #d8d8d8",
                    borderRadius: 4,
                    paddingTop: 4,
                    paddingBottom: 4,
                    marginBottom: 2,
                    minWidth: 1080,
                  }}
                >
                  <Grid item md={1} xs={1}>
                    <img
                      src={AvatarImg}
                      style={{ width: 30, height: 30, borderRadius: "50%" }}
                    ></img>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>Alex</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>Smith Jr.</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>@alexsmith17</span>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <span className={classes.tableFields}>1(555) 55555555</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>TN</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>2020</span>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <span className={classes.tableFields}>
                      Gradview Height Hs
                    </span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>2 Days Ago</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>Offer</span>
                  </Grid>
                </Grid>
              );
            })}
          </div>
          <Grid container direction="row" alignItems="center"></Grid>
        </div>
      </Grid>
    </DarkContainer>
  );
}

export default Home;
