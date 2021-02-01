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
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import IconButton from "../common/Buttons/IconButton";
import {
  getAllContacts,
  getTags,
  getRanks,
  getStatuses,
  getGradeYears,
} from "../../ApiHelper";

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
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 4,
  },
});

function Home() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(false);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");

  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [positionFilter, setPositionFilter] = useState(null);
  const [coachFilter, setCoachFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);

  const [contacts, setContacts] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);
  const [allGradYears, setAllGraderYears] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [allRanks, setAllRanks] = useState(null);

  const getMyContacts = (date) => {
    // setLoading(true);
    console.log("This is the date", date);
    // || "2020-12-13"
    getAllContacts().then(
      (res) => {
        console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all contacts", res.data);
          setContacts(res.data);
        }
      },
      (error) => {
        console.log("this is error all contacts", error);
      }
    );
  };

  const getAllGradeYears = () => {
    getGradeYears().then(
      (res) => {
        // console.log("THis is all grade Years", res);
        var gradYears = [];
        if (res.statusText === "OK") {
          console.log("These are all contacts", res.data);
          res.data.map((item) => {
            gradYears.push({
              value: item,
              label: item,
            });
          });
          setAllGraderYears(gradYears);
        }
      },
      (error) => {
        console.log("this is error all grad year", error);
      }
    );
  };

  const getAllTags = () => {
    getTags().then(
      (res) => {
        // console.log("THis is all tags", res);
        var TAGS = [];
        if (res.statusText === "OK") {
          console.log("These are all tags", res.data);
          res.data.map((item) => {
            TAGS.push({
              value: item.name,
              label: item.name,
            });
          });
          setAllTags(TAGS);
        }
      },
      (error) => {
        console.log("this is error all tags", error);
      }
    );
  };

  const getAllStatuses = () => {
    getStatuses().then(
      (res) => {
        // console.log("THis is all statuses", res);
        var STATUSES = [];
        if (res.statusText === "OK") {
          console.log("These are all statuses", res.data);
          res.data.map((item) => {
            STATUSES.push({
              value: item.status,
              label: item.status,
            });
          });
          setAllStatuses(STATUSES);
        }
      },
      (error) => {
        console.log("this is error all statuses", error);
      }
    );
  };

  const getAllRanks = () => {
    getRanks().then(
      (res) => {
        // console.log("THis is all ranks", res);
        var RANKS = [];
        if (res.statusText === "OK") {
          console.log("These are all ranks", res.data);
          res.data.map((item) => {
            RANKS.push({
              value: item.rank,
              label: item.rank,
            });
          });
          setAllRanks(RANKS);
        }
      },
      (error) => {
        console.log("this is error all ranks", error);
      }
    );
  };

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
    marginRight: 5,
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
          {allStatuses &&
            allStatuses.map((option) => (
              <Dropdown.Item
                style={{
                  background:
                    statusFilter === option.label ? "#348ef7" : "white",
                  color: statusFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (statusFilter === option.label) {
                    setStatusFilter(null);
                    addDataToFilter(option.label);
                  } else {
                    setStatusFilter(option.label, "status");
                    addDataToFilter(option.label);
                  }
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
          style={filtesSpacingStyle}
        >
          {allRanks &&
            allRanks.map((option) => (
              <Dropdown.Item
                style={{
                  background: rankFilter === option.label ? "#348ef7" : "white",
                  color: rankFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (rankFilter === option.label) {
                    setRankFilter(null);
                    addDataToFilter(option.label);
                  } else {
                    setRankFilter(option.label);
                    addDataToFilter(option.label, "ranks");
                  }
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={gradeYearFilter || "Grade Year"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {allGradYears &&
            allGradYears.map((option) => (
              <Dropdown.Item
                style={{
                  background:
                    gradeYearFilter === option.label ? "#348ef7" : "white",
                  color: gradeYearFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (rankFilter === option.label) {
                    setGradeYearFilter(null);
                    addDataToFilter(option.label);
                  } else {
                    setGradeYearFilter(option.label);
                    addDataToFilter(option.label, "gradeYear");
                  }
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={timeZoneFilter || "Time Zone"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background:
                  timeZoneFilter === option.label ? "#348ef7" : "white",
                color: timeZoneFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setTimeZoneFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={stateFilter || "State"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: stateFilter === option.label ? "#348ef7" : "white",
                color: stateFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setStateFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={positionFilter || "Position"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background:
                  positionFilter === option.label ? "#348ef7" : "white",
                color: positionFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setPositionFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={coachFilter || "Coach"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses.map((option) => (
            <Dropdown.Item
              style={{
                background: coachFilter === option.label ? "#348ef7" : "white",
                color: coachFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                setCoachFilter(option.label);
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={tagFilter || "Tag"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {allTags &&
            allTags.map((option) => (
              <Dropdown.Item
                style={{
                  background: tagFilter === option.label ? "#348ef7" : "white",
                  color: tagFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (rankFilter === option.label) {
                    setTagFilter(null);
                    addDataToFilter(option.label);
                  } else {
                    setTagFilter(option.label);
                    addDataToFilter(option.label, "gradeYear");
                  }
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
  const addDataToFilter = (value) => {
    if (filter.includes(value)) {
      var temp = filter;
      temp.splice(value, 1);
      console.log("This is temp", temp);
      setFilter(temp);
    } else {
      var temp = filter;
      temp.push(value);
      setFilter(temp);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      getMyContacts();
      getAllGradeYears();
      getAllRanks();
      getAllStatuses();
      getAllTags();
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
          <Grid container direction="row">
            {filter.length != 0 &&
              filter.map((fil) => {
                return (
                  <div
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                    className={classes.tags}
                  >
                    {fil}
                    <ClearIcon
                      onClick={() => {
                        addDataToFilter(fil);
                      }}
                      style={{ color: "red", fontSize: 17, cursor: "pointer" }}
                    ></ClearIcon>{" "}
                  </div>
                );
              })}
          </Grid>

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
          <div
            style={{ maxWidth: "100%", maxHeight: 400, overflowX: "scroll" }}
          >
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
                <span
                  className={classes.tableHeading}
                  style={{ marginLeft: 40 }}
                >
                  Phone
                </span>
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
            {contacts &&
              contacts.map((item) => {
                // console.log(
                //   "This is status",
                //   item.twitter_profile.profile_image.includes(
                //     "contact-missing-image"
                //   )
                // );
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
                      minWidth: 1110,
                    }}
                  >
                    <Grid item md={1} xs={1}>
                      <img
                        src={
                          item.twitter_profile.profile_image.includes(
                            "contact-missing-image"
                          ) == false
                            ? item.twitter_profile.profile_image
                            : AvatarImg
                        }
                        style={{ width: 30, height: 30, borderRadius: "50%" }}
                      ></img>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {item.first_name}
                      </span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {item.last_name}
                      </span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {item.twitter_profile.screen_name
                          ? "@" + item.twitter_profile.screen_name
                          : ""}
                      </span>
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <span
                        className={classes.tableFields}
                        style={{ marginLeft: 40 }}
                      >
                        {item.phone}
                      </span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>{item.state}</span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {item.grad_year
                          ? moment(item.grad_year).format("YYYY")
                          : ""}
                      </span>
                    </Grid>
                    <Grid item md={2} xs={2}>
                      <span className={classes.tableFields}>
                        {item.high_school}
                      </span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {item.status &&
                          new moment(item.status.created_at).fromNow()}
                      </span>
                    </Grid>
                    <Grid item md={1} xs={1}>
                      <span className={classes.tableFields}>
                        {" "}
                        {item.status && item.status.status}
                      </span>
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
