import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Checkbox,
  Dialog,
  withStyles,
  Slider,
} from "@material-ui/core";
import moment from "moment";
import { FaSlidersH, FaBars, FaTh } from "react-icons/fa";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";

import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ClearIcon from "@material-ui/icons/Clear";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaMagic, FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import GifIcon from "@material-ui/icons/Gif";
import DialogBox from "../common/Dialogs";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";

import {
  getAllContacts,
  getMedia,
  getMediaTag,
  getPlaceholder,
  getMediaUsers,
} from "../../ApiHelper";
import { MoreHoriz } from "@material-ui/icons";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles2 = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
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
    height: 40,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  icons: {
    color: "#d8d8d8",
  },
  dropdownHidden: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: 230,
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    border: "1px solid #d5d5d5",
    borderRadius: 4,
    // padding: 5,
    marginLeft: -240,
    zIndex: 1,
    // maxHeight: "60vh",
    // overflowY: "scroll",
    overflowX: "hidden",
  },
});

const PrettoSlider = withStyles({
  root: {
    // color: "#52af77",
    color: "#3768e7",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    display: "none",
    marginTop: 2,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 20,
    borderRadius: 20,
  },
  rail: {
    height: 20,
    borderRadius: 20,
    color: "#dadada",
  },
})(Slider);
function MediaComponent(props) {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [quickAccessStartIndex, setQuickAccessStartIndex] = useState(0);
  const [quickAccessEndIndex, setQuickAccessEndIndex] = useState(15);
  const [placeholderStartIndex, setPlaceholderStartIndex] = useState(0);
  const [placeholderEndIndex, setPlaceholderEndIndex] = useState(15);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(true);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const [showBoardFilters, setshowBoardFilters] = useState(false);
  const [viewMorePlaceholder, setViewMorePlaceholder] = useState(false);
  const [viewMoreQuickAccess, setViewMoreQuickAccess] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");
  const [contactSearch, setContactSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [placeholderHover, setPlaceholderHover] = useState(null);
  const [mediaHover, setMediaHover] = useState(null);
  const [lightboxPicture, setLightboxPicture] = useState(null);
  const [lightboxVideo, setLightboxVideo] = useState(null);

  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [showlistView, setShowlistView] = useState(false);

  const [contacts, setContacts] = useState(null);
  const [myMediaContacts, setMyMediaContacts] = useState(null);
  const [media, setMedia] = useState(null);
  const [placeholders, setPlaceHolders] = useState(null);
  const [selectedPlaceholder, setSelectedPlaceHolder] = useState(null);
  const [taggedMedia, setTaggedMedia] = useState(null);
  const [displayAction, setDisplayAction] = useState(null);

  const [allTags, setAllTags] = useState(null);
  const [page, setPage] = useState(1);

  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  // console.log("These are selected checkboxes", selectedCheckBoxes);
  const getMyContacts = (page) => {
    // setLoading(true);
    setFetching(true);
    console.log("This is the date", page);
    // || "2020-12-13"
    getAllContacts(page).then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all contacts", res.data);
          setContacts(res.data);
          setCopyContacts(res.data);
          document.getElementById("infinit").scrollTop = 0;
          setFetching(false);
        }
      },
      (error) => {
        getMyContacts(1);
        setPage(1);
        console.log("this is error all contacts", error);
      }
    );
  };

  const getMyMedia = () => {
    getMedia().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all media", res.data);
          setMedia(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };

  const getMyMediaContacts = () => {
    getMediaUsers().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          // console.log("These are all my media contacts", res.data);
          setMyMediaContacts(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };

  const getMyPlaceholders = () => {
    getPlaceholder().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all placeholder", res.data);
          setPlaceHolders(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };

  const getTaggedMedia = () => {
    getMediaTag().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all tagged  Media", res.data);
          setTaggedMedia(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
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
          title={statusFilter || "File Type"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses &&
            statuses.map((option) => (
              <Dropdown.Item
                style={{
                  background:
                    statusFilter === option.label ? "#348ef7" : "white",
                  color: statusFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (statusFilter === option.label) {
                    setStatusFilter(null);
                    props.addDataToFilter(option.label);
                  } else {
                    props.addDataToFilter(option.label, "status");
                  }
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
        </DropdownButton>

        <DropdownButton
          id="dropdown-basic-button"
          title={rankFilter || "Distibuted"}
          drop={"down"}
          style={filtesSpacingStyle}
        >
          {[
            {
              label: "File Sent",
            },
            {
              label: "File Not Yet Sent",
            },
            {
              label: "Failed to Send",
            },
          ].map((option) => (
            <Dropdown.Item
              style={{
                background: rankFilter === option.label ? "#348ef7" : "white",
                color: rankFilter === option.label ? "white" : "black",
              }}
              onClick={() => {
                if (rankFilter === option.label) {
                  setRankFilter(null);
                  props.addDataToFilter(option.label);
                } else {
                  props.addDataToFilter(option.label, "ranks");
                }
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={gradeYearFilter || "Owner"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {statuses &&
            statuses.map((option) => (
              <Dropdown.Item
                style={{
                  background:
                    gradeYearFilter === option.label ? "#348ef7" : "white",
                  color: gradeYearFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  if (rankFilter === option.label) {
                    setGradeYearFilter(null);
                    props.addDataToFilter(option.label);
                  } else {
                    props.addDataToFilter(option.label, "gradeYear");
                  }
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <div className="associatedButton">
          <DropdownButton
            id="dropdown-basic-button"
            title={timeZoneFilter || "Associated To"}
            drop={"down"}
            placeholder="Status"
            style={filtesSpacingStyle}
          >
            <Grid container direction="row" justify="center">
              <input
                type="text"
                style={{
                  width: "90%",
                  border: "1px solid #ebebeb",
                  borderRadius: 4,
                }}
                placeholder="Search Contacts"
                value={contactSearch}
                onChange={(e) => {
                  setContactSearch(e.target.value);
                }}
              ></input>
            </Grid>
            {myMediaContacts &&
              myMediaContacts.map((option) => {
                var name = option.first_name + " " + option.last_name;
                if (contactSearch != "") {
                  if (
                    name.toLowerCase().indexOf(contactSearch.toLowerCase()) > -1
                  ) {
                    return (
                      <Dropdown.Item
                        style={{
                          background:
                            timeZoneFilter === option.label
                              ? "#348ef7"
                              : "white",
                          color:
                            timeZoneFilter === option.label ? "white" : "black",
                        }}
                        onClick={() => {
                          // setTimeZoneFilter(
                          //   option.first_name + " " + option.last_name
                          // );
                          props.addDataToFilter(
                            option.first_name + " " + option.last_name
                          );
                        }}
                      >
                        {option.first_name + " " + option.last_name}
                      </Dropdown.Item>
                    );
                  }
                } else {
                  return (
                    <Dropdown.Item
                      style={{
                        background:
                          timeZoneFilter === option.label ? "#348ef7" : "white",
                        color:
                          timeZoneFilter === option.label ? "white" : "black",
                      }}
                      onClick={() => {
                        props.addDataToFilter(
                          option.first_name + " " + option.last_name
                        );
                      }}
                    >
                      {option.first_name + " " + option.last_name}
                    </Dropdown.Item>
                  );
                }
              })}
          </DropdownButton>
        </div>

        <DropdownButton
          id="dropdown-basic-button"
          title={timeZoneFilter || "Date"}
          drop={"down"}
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
          title={stateFilter || "Tag"}
          drop={"down"}
          style={filtesSpacingStyle}
        >
          <div>
            <Grid container direction="row" justify="center">
              <input
                type="text"
                style={{
                  width: "90%",
                  border: "1px solid #ebebeb",
                  borderRadius: 4,
                }}
                placeholder="Tag"
                value={stateSearch}
                onChange={(e) => {
                  setStateSearch(e.target.value);
                }}
              ></input>
            </Grid>

            {taggedMedia &&
              taggedMedia.map((option) => {
                if (stateSearch != "") {
                  if (
                    option.name
                      .toLowerCase()
                      .indexOf(stateSearch.toLowerCase()) > -1
                  ) {
                    return (
                      <Dropdown.Item
                        style={{
                          background:
                            stateFilter === option.name ? "#348ef7" : "white",
                          color:
                            stateFilter === option.name ? "white" : "black",
                        }}
                        onClick={() => {
                          props.addDataToFilter(option.name, "State");
                        }}
                      >
                        {option.name}
                      </Dropdown.Item>
                    );
                  }
                } else {
                  return (
                    <Dropdown.Item
                      style={{
                        background:
                          stateFilter === option.name ? "#348ef7" : "white",
                        color: stateFilter === option.name ? "white" : "black",
                      }}
                      onClick={() => {
                        props.addDataToFilter(option.name, "State");
                      }}
                    >
                      {option.name}
                    </Dropdown.Item>
                  );
                }
              })}
          </div>
        </DropdownButton>
      </Grid>
    );
  };

  if (localStorage.getItem("user")) {
  } else {
    window.location.href = "/";
  }

  // console.log("THis is selected placeholders", selectedPlaceholder);

  const addDataToFilter = (value, type) => {
    if (props.filter.includes(value)) {
      var temp = [];
      props.filter.map((item) => {
        if (item != value) {
          temp.push(item);
        }
      });
      setFilter(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = props.filter;
      var tempType = filterType;
      temp.push(value);
      tempType.push(type);
      setFilterType(tempType);
      setFilter(temp);
      setuseLessState(uselessState + 1);
    }
  };

  const makeCheckBoxSelected = (index) => {
    if (selectedCheckBoxes.indexOf(index) > -1) {
      var temp = [];
      selectedCheckBoxes.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      console.log("This is temp", temp);
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedCheckBoxes;
      temp.push(index);
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    }
  };

  const removeDataFromFilter = (index) => {
    var temp = props.filter;
    var tempType = filterType;
    temp.splice(index, 1);
    tempType.splice(index, 1);
    var newArray = temp;
    setFilter(newArray);
    setFilterType(tempType);
    setuseLessState(uselessState + 1);
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      // getMyContacts();
      getMyMedia();
      getMyPlaceholders();
      getTaggedMedia();
      getMyMediaContacts();
      // getAllGradeYears();
      // getAllRanks();
      // getAllStatuses();
      // getAllTags();
      // getAllBoards();
      // getAllPositions();
      // getColumns();
      // setupPage();
    } else {
      window.location.href = "/";
    }
  }, []);

  // console.log("This is props.filter bar", props.filter, filterType);

  const isSelectedCheckbox = (index) => {
    console.log("This is great", selectedCheckBoxes.indexOf(index) > -1);
  };

  const checkFilters = (item) => {
    // console.log("These are tags for all", item.tags);
    var isValid = false;
    if (props.filter.length != 0) {
      props.filter.map((filt, index) => {
        if (filterType[index] === "status") {
          if (item.status != null && item.status.status === filt) {
            isValid = true;
            return;
          }
        }
        if (filterType[index] === "ranks") {
          if (item.rank != null && item.rank.rank === filt) {
            isValid = true;
            return;
          }
        }
        if (filterType[index] === "gradeYear") {
          if (Number(moment(item.grad_year).format("YYYY")) === filt) {
            console.log(
              "This is inseide grader",
              moment(item.grad_year).format("YYYY"),
              filt
            );
            isValid = true;
            return;
          }
        }
        if (filterType[index] === "Tag") {
          if (Number(moment(item.grad_year).format("YYYY")) === filt) {
            console.log(
              "This is inseide grader",
              moment(item.grad_year).format("YYYY"),
              filt
            );
            isValid = true;
            return;
          }
        }
      });
    } else {
      isValid = true;
    }
    return isValid;
  };

  function handleScroll() {
    var agreement = document.getElementById("infinit");
    var visibleHeight = agreement.clientHeight;
    var scrollableHeight = agreement.scrollHeight;
    var position = agreement.scrollTop;
    // console.log(
    //   "This is poistion",
    //   position,
    //   "This is scrollable",
    //   scrollableHeight,
    //   "This is visible height",
    //   visibleHeight
    // );
    if (position + visibleHeight == scrollableHeight) {
      // alert("We are in the endgaem now");
      if (!fetching) {
        getMyContacts(page + 1);
        setPage(page + 1);
      }
      // agreement.scrollTop = 0;
    }
  }

  const mediaContainer = (m) => {
    // console.log("THis is container ", m);
    return (
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          // border: "1px solid #d2d2d2",
          border:
            selectedCheckBoxes.indexOf(m.hashid) > -1
              ? "3px solid #4d83e0"
              : "1px solid #d2d2d2",
          borderRadius: 4,
          marginBottom: 10,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
          onMouseEnter={() => {
            if (m.urls) {
              setMediaHover(m.urls.medium);
            }
          }}
          onMouseLeave={() => {
            setMediaHover(null);
          }}
        >
          {(m.urls && mediaHover === m.urls.medium) ||
          selectedCheckBoxes.indexOf(m.hashid) > -1 ? (
            <div
              style={{
                width: "100%",
                height: 190,
                background: "rgba(0,0,0,0.6)",
                marginBottom: -190,
                position: "relative",
                zIndex: 100,
              }}
            >
              <Grid container direction="row">
                <Grid item md={2} xs={2}>
                  <Checkbox
                    color="primary"
                    checked={
                      selectedCheckBoxes.indexOf(m.hashid) > -1 ? true : false
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      if (props.makeMediaSelected) {
                        props.makeMediaSelected(m);
                      }
                      makeCheckBoxSelected(m.hashid);
                    }}
                    style={{
                      color: "white",
                      cursor: "pointer",
                      zIndex: 500,
                      position: "relative",
                    }}
                  ></Checkbox>
                </Grid>
                <Grid item md={9} xs={9}></Grid>
                <Grid item md={1} xs={1}>
                  <MoreHoriz
                    style={{
                      marginTop: 12,
                      marginLeft: -12,
                      color: "#979797",
                      cursor: "pointer",
                      zIndex: 500,
                      position: "relative",
                    }}
                  ></MoreHoriz>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={{ height: 100 }}
              >
                <button
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    borderRadius: 4,
                    color: "white",
                    fontWeight: 600,
                    height: 35,
                  }}
                  onClick={() => {
                    if (m.file_type.indexOf("video") > -1) {
                      if (m.urls) {
                        setLightboxVideo(m.urls.large);
                      }
                    } else if (m.urls) {
                      setLightboxPicture(m.urls.medium);
                    }
                  }}
                >
                  View Media
                </button>
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
          <img
            style={{ width: "80%", height: 190, objectFit: "contain" }}
            src={m.urls && m.urls.thumb}
          ></img>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 12, marginTop: 2 }}
          alignItems="center"
        >
          {m.file_type === "image/gif" ? (
            <GifIcon></GifIcon>
          ) : m.file_type.indexOf("video") > -1 ? (
            <FaVideo style={{ color: "#3871da", fontSize: 20 }}></FaVideo>
          ) : m.file_type.indexOf("image") > -1 ? (
            <FaImage></FaImage>
          ) : (
            <FaFilePdf style={{ color: "#3871da", fontSize: 20 }}></FaFilePdf>
          )}
          <p
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 0,
              marginLeft: 10,
              fontSize: 15,
            }}
          >
            {m.file_name.length > 17
              ? m.file_name.substring(0, 17) + " ..."
              : m.file_name}
          </p>
          <div style={{ width: "100%" }}></div>
        </Grid>
        <Grid container direction="row" style={{ height: 30, marginLeft: 12 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#5a5a5a",
            }}
          >
            Uploaded at : {new moment(m.created_at).format("YYYY-MM-DD")} by
            Coach Graves
          </p>
        </Grid>
      </div>
    );
  };

  const placeholderContainer = (m) => {
    // console.log("THis is media placeholderContainer ", m);
    return (
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          border:
            selectedCheckBoxes.indexOf(m.media_preview) > -1
              ? "3px solid #4d83e0"
              : "1px solid #d2d2d2",
          borderRadius: 4,
          marginBottom: 10,
        }}
        onClick={() => {
          setSelectedPlaceHolder(m);
        }}
        onMouseEnter={() => {
          setPlaceholderHover(m.media_preview);
        }}
        onMouseLeave={() => {
          setPlaceholderHover(null);
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
        >
          {placeholderHover === m.media_preview ||
          selectedCheckBoxes.indexOf(m.media_preview) > -1 ? (
            <div
              style={{
                width: "100%",
                height: 190,
                background: "rgba(0,0,0,0.6)",
                marginBottom: -190,
                position: "relative",
                zIndex: 100,
              }}
            >
              <Grid container direction="row">
                <Grid item md={2} xs={2}>
                  <Checkbox
                    color="primary"
                    checked={
                      selectedCheckBoxes.indexOf(m.media_preview) > -1
                        ? true
                        : false
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      makeCheckBoxSelected(m.media_preview);
                    }}
                    style={{
                      color: "white",
                      cursor: "pointer",
                      zIndex: 500,
                      position: "relative",
                    }}
                  ></Checkbox>
                </Grid>
                <Grid item md={9} xs={9}></Grid>
                <Grid item md={1} xs={1}>
                  <MoreHoriz
                    style={{
                      marginTop: 12,
                      marginLeft: -12,
                      color: "#979797",
                      cursor: "pointer",
                      zIndex: 500,
                      position: "relative",
                    }}
                  ></MoreHoriz>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={{ height: 100 }}
              >
                <button
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    borderRadius: 4,
                    color: "white",
                    fontWeight: 600,
                    height: 35,
                  }}
                  onClick={() => {
                    setLightboxPicture(m.media_preview);
                  }}
                >
                  View Media
                </button>
              </Grid>
            </div>
          ) : (
            <div></div>
          )}

          <img
            style={{ width: "80%", height: 190, objectFit: "contain" }}
            src={m.media_preview}
          ></img>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 12, marginTop: 2 }}
          alignItems="center"
        >
          {m.media_preview.indexOf(".gif") > -1 ? (
            <GifIcon></GifIcon>
          ) : m.media_preview.indexOf(".png") > -1 ||
            m.media_preview.indexOf(".jpg") > -1 ||
            m.media_preview.indexOf(".jpeg") > -1 ? (
            <FaImage style={{ color: "#3871da", fontSize: 20 }}></FaImage>
          ) : m.media_preview.indexOf(".mp4") > -1 ? (
            <FaVideo></FaVideo>
          ) : (
            <FaFilePdf style={{ color: "#3871da", fontSize: 20 }}></FaFilePdf>
          )}
          <p
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 0,
              marginLeft: 10,
              fontSize: 15,
            }}
          >
            {m.name}
          </p>
          <div style={{ width: "100%" }}></div>
        </Grid>
        <Grid container direction="row" style={{ height: 30, marginLeft: 12 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#5a5a5a",
            }}
          >
            Uploaded at : {new moment(m.created_at).format("YYYY-MM-DD")} by
            Coach Graves
          </p>
        </Grid>
      </div>
    );
  };

  return (
    <div
      style={{
        width: props.showSideFilters === true ? "85%" : "100%",
        height: "100%",
        background: "white",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
      }}
    >
      <Grid container direction="row">
        <Grid item md={6} sm={6}>
          {props.message ? (
            <ArrowBackIos
              onClick={(e) => {
                if (props.setshowSideFilters) {
                  props.setshowSideFilters(!props.showSideFilters);
                }
              }}
              style={{ cursor: "pointer", fontSize: 18 }}
            ></ArrowBackIos>
          ) : (
            <FormatAlignLeftIcon
              onClick={(e) => {
                if (props.setAddMedia) {
                  props.setAddMedia(false);
                }
              }}
              style={{ cursor: "pointer", fontSize: 18 }}
            ></FormatAlignLeftIcon>
          )}
          {props.message ? (
            <span
              style={{
                padding: 5,
                fontWeight: "bold",
                marginLeft: 20,
                cursor: "pointer",
              }}
              onClick={(e) => {
                if (props.setAddMedia) {
                  props.setAddMedia(false);
                }
              }}
            >
              Exit Media Library
            </span>
          ) : (
            <span
              style={{
                padding: 5,
                fontWeight: "bold",
                marginLeft: 20,
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedPlaceHolder(null);
              }}
            >
              Media
            </span>
          )}
        </Grid>
        <Grid item md={6} sm={6}>
          <Grid container direction="row" justify="flex-end">
            {/* <IconTextField
                  width={180}
                  text="Save as Board"
                  textColor="gray"
                  icon={
                    <AccountBoxIcon
                      style={{ color: "#3871DA" }}
                    ></AccountBoxIcon>
                  }
                ></IconTextField> */}
            {props.message ? (
              <div></div>
            ) : (
              <div class="dropdown">
                <Link id={"toMessage"} to="/message-create"></Link>
                <IconTextField
                  width={100}
                  textColor={selectedCheckBoxes.length <= 0 ? "gray" : "black"}
                  // background={displayAction ? "#3871da" : "white"}
                  background={"white"}
                  text="Action"
                  icon={
                    <FaMagic
                      style={{
                        color:
                          selectedCheckBoxes.length <= 0 ? "gray" : "#3871DA",
                      }}
                    ></FaMagic>
                  }
                  onMouseEnter={() => {
                    setDisplayAction(true);
                  }}
                ></IconTextField>
                <div
                  // class="dropdown-content"
                  className={classes.dropdownHidden}
                  style={{
                    marginLeft: -120,
                    marginTop: 10,
                    display: displayAction ? "block" : "none",
                  }}
                  onMouseLeave={() => {
                    setDisplayAction(false);
                  }}
                >
                  {[
                    {
                      title: "Send In Message",
                    },
                    {
                      title: "Download",
                    },
                    {
                      title: "Archive Media",
                    },
                    {
                      title: "Archive Media & Placeholder",
                    },
                  ].map((type, index) => {
                    return (
                      <Grid
                        container
                        alignItems="center"
                        className={classes.messagetypeGrid}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("toMessage").click();
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            marginBottom: 7,
                            fontWeight: 500,
                            marginLeft: 12,
                            color: index > 1 ? "red" : "black",
                          }}
                        >
                          {type.title}
                        </p>
                      </Grid>
                    );
                  })}
                </div>
              </div>
            )}

            {props.message ? (
              <div></div>
            ) : (
              <IconTextField
                width={100}
                onClick={() => {
                  if (selectedCheckBoxes.length > 0) {
                    setShowTagsDialog(true);
                  }
                }}
                text="Tag"
                textColor={selectedCheckBoxes.length <= 0 ? "gray" : "black"}
                icon={
                  <LocalOfferOutlinedIcon
                    style={{
                      color:
                        selectedCheckBoxes.length <= 0 ? "gray" : "#3871DA",
                    }}
                  ></LocalOfferOutlinedIcon>
                }
              ></IconTextField>
            )}
            {props.message && (
              <IconTextField
                width={150}
                onClick={() => {
                  if (props.setAddMedia) {
                    props.setAddMedia(false);
                  }
                }}
                text="Attach Media"
                textColor="white"
                background="#3871DA"
              ></IconTextField>
            )}

            <IconTextField
              text="Filter"
              width={120}
              onClick={() => {
                setShowFiltersRow(!showFiltersRow);
              }}
              // showMessageFiltersRow === false
              textColor={showFiltersRow === false ? "black" : "white"}
              background={showFiltersRow === false ? "transparent" : "#3871DA"}
              icon={
                <FaSlidersH
                  style={{
                    color: showFiltersRow === false ? "#3871DA" : "white",
                  }}
                ></FaSlidersH>
              }
            ></IconTextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row">
        {props.filter.length != 0 &&
          props.filter.map((fil, index) => {
            return (
              <div
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.tags}
              >
                <Grid
                  style={{ height: 40 }}
                  container
                  direction="row"
                  alignItems="center"
                >
                  {fil}
                  <ClearIcon
                    onClick={() => {
                      removeDataFromFilter(index);
                    }}
                    style={{
                      color: "red",
                      fontSize: 17,
                      cursor: "pointer",
                      marginLeft: 8,
                    }}
                  ></ClearIcon>{" "}
                </Grid>
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
      <div style={{ width: "100%", overflowX: "scroll", marginTop: 10 }}>
        <div
          style={{ width: "100%", maxHeight: 460, minWidth: 1110 }}
          className="fullHeightMedia"
          id="infinit"
          // onScroll={() => {
          //   handleScroll();
          // }}
        >
          <p>Quick Access</p>
          {selectedPlaceholder === null || props.message ? (
            <Grid container>
              {media != null ? (
                media.map((m, index) => {
                  if (viewMoreQuickAccess) {
                    if (
                      // index >= quickAccessStartIndex &&
                      index < quickAccessEndIndex
                    ) {
                      return mediaContainer(m);
                    }
                  } else {
                    if (index < 4) {
                      return mediaContainer(m);
                    }
                  }
                })
              ) : (
                <Grid container direction="row" justify="center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </Grid>
              )}
              <div style={{ width: "100%" }}>
                <Grid container direction="row" justify="center">
                  <span
                    style={{
                      color: "#3871DA",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => {
                      if (quickAccessEndIndex >= 20) {
                        setViewMoreQuickAccess(true);
                        setQuickAccessEndIndex(quickAccessEndIndex - 15);
                      } else if (quickAccessEndIndex >= 4) {
                        setViewMoreQuickAccess(false);
                        setQuickAccessEndIndex(quickAccessEndIndex - 4);
                      }
                    }}
                  >
                    {viewMoreQuickAccess == true ? "View Less" : ""}
                  </span>
                  <span
                    style={{
                      color: "#3871DA",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (quickAccessEndIndex >= media.length) {
                        setViewMoreQuickAccess(false);
                        setQuickAccessStartIndex(0);
                        setQuickAccessEndIndex(15);
                      } else {
                        setViewMoreQuickAccess(true);
                        setQuickAccessStartIndex(quickAccessEndIndex);
                        setQuickAccessEndIndex(quickAccessEndIndex + 15);
                      }
                    }}
                  >
                    {viewMoreQuickAccess == true &&
                    quickAccessEndIndex >= media.length
                      ? ""
                      : "View More"}
                  </span>
                </Grid>
              </div>
            </Grid>
          ) : (
            <Grid container direction="row">
              <Grid item md={3} xs={3}>
                {placeholderContainer(selectedPlaceholder)}
              </Grid>
              <Grid item md={9} xs={9}>
                <p style={{ fontWeight: "bold", fontSize: 20 }}>
                  {selectedPlaceholder.name}
                </p>
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  FileType: image/jpeg
                </p>
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  Uploaded On:{" "}
                  {new moment(selectedPlaceholder.created_at).format(
                    "YYYY-MM-DD"
                  )}
                </p>{" "}
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  Uploaded By: Tim Glover
                </p>
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  File Size : 40.5 kb
                </p>
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  Dimensions : 160 x 200
                </p>
                <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
                  Last Sent :{" "}
                  {new moment(selectedPlaceholder.created_at).format(
                    "YYYY-MM-DD"
                  )}
                </p>
              </Grid>
            </Grid>
          )}
          <Grid container direction="row" justify="flex-end">
            <div
              style={{
                border: "1px solid #d2d2d2",
                width: 30,
                height: 30,
                borderRadius: 4,
                marginRight: 30,
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ height: 30, cursor: "pointer" }}
                onClick={() => {
                  setShowlistView(!showlistView);
                }}
              >
                {showlistView === true ? (
                  <FaTh style={{ color: "#3871DA" }}></FaTh>
                ) : (
                  <FaBars style={{ color: "#3871DA" }}></FaBars>
                )}
              </Grid>
            </div>
          </Grid>
          <p>Placeholders</p>
          {showlistView === true && props.message === null ? (
            <div style={{ width: "100%", overflowX: "scroll", marginTop: 10 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                  background: "#f5f6f9",
                  width: "100%",
                  minWidth: 1110,
                }}
              >
                <Grid item md={3} xs={3} style={{ marginLeft: 12 }}>
                  <span className={classes.tableHeading}>Name</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>File</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>File Sent</span>
                </Grid>
                <Grid item md={2} xs={2}>
                  <span
                    className={classes.tableHeading}
                    style={{ marginLeft: 40 }}
                  >
                    Associated To
                  </span>
                </Grid>
                <Grid item md={2} xs={2}>
                  <span className={classes.tableHeading}>Owner</span>
                </Grid>
                <Grid item md={2} xs={2}>
                  <span className={classes.tableHeading}>Last Modified</span>
                </Grid>
              </Grid>

              <div
                style={{ width: "100%", maxHeight: 330, minWidth: 1110 }}
                className="fullHeightContacts"
                id="infinit"
                onScroll={() => {
                  handleScroll();
                }}
              >
                {placeholders &&
                  placeholders.map((item, index) => {
                    if (index < 4) {
                      return (
                        <Grid
                          onClick={() => {
                            setSelectedPlaceHolder(item);
                          }}
                          container
                          direction="row"
                          alignItems="center"
                          style={{
                            border: "1px solid #d8d8d8",
                            borderBottom: "none",
                            borderRadius: 4,
                            paddingTop: 4,
                            paddingBottom: 4,
                            minWidth: 1110,
                          }}
                        >
                          <Grid item md={3} xs={3} style={{ marginLeft: 12 }}>
                            {item.media_preview.indexOf(".gif") > -1 ? (
                              <GifIcon></GifIcon>
                            ) : item.media_preview.indexOf(".png") > -1 ||
                              item.media_preview.indexOf(".jpg") > -1 ||
                              item.media_preview.indexOf(".jpeg") > -1 ? (
                              <FaImage
                                style={{ color: "#3871da", fontSize: 20 }}
                              ></FaImage>
                            ) : item.media_preview.indexOf(".mp4") > -1 ? (
                              <FaVideo></FaVideo>
                            ) : (
                              <FaFilePdf
                                style={{ color: "#3871da", fontSize: 20 }}
                              ></FaFilePdf>
                            )}
                            <span
                              className={classes.tableFields}
                              style={{ marginLeft: 5 }}
                            >
                              {item.name}
                            </span>
                          </Grid>
                          <Grid item md={1} xs={1}>
                            <img
                              style={{ width: 30, height: 30 }}
                              src={item.media_preview}
                            ></img>
                          </Grid>
                          <Grid item md={1} xs={1}>
                            <span className={classes.tableFields}>
                              {item.twitter_profile &&
                              item.twitter_profile.screen_name
                                ? "@" + item.twitter_profile.screen_name
                                : ""}
                            </span>
                          </Grid>
                          <Grid item md={2} xs={2}>
                            <span
                              className={classes.tableFields}
                              style={{ marginLeft: 40 }}
                            >
                              {/* {formatPhoneNumber(item.phone)} */}
                            </span>
                          </Grid>
                          <Grid item md={2} xs={2}>
                            <span className={classes.tableFields}>
                              {item.state}
                            </span>
                          </Grid>
                          <Grid item md={2} xs={2}>
                            <span className={classes.tableFields}>
                              {moment(item.created_at).format("MMMM Do YYYY")}
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
                    }
                  })}
              </div>
            </div>
          ) : (
            <Grid container>
              {placeholders ? (
                placeholders.map((m, index) => {
                  if (viewMorePlaceholder) {
                    if (index < placeholderEndIndex) {
                      return placeholderContainer(m);
                    }
                  } else {
                    if (index < 4) {
                      return placeholderContainer(m);
                    }
                  }
                })
              ) : (
                <Grid container direction="row" justify="center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </Grid>
              )}
              <div style={{ width: "100%" }}>
                <Grid container direction="row" justify="center">
                  <span
                    style={{
                      color: "#3871DA",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                    onClick={() => {
                      if (placeholderEndIndex >= 20) {
                        setViewMorePlaceholder(true);
                        setPlaceholderEndIndex(placeholderEndIndex - 15);
                      } else if (placeholderEndIndex >= 4) {
                        setViewMorePlaceholder(false);
                        setPlaceholderEndIndex(placeholderEndIndex - 4);
                      }
                    }}
                  >
                    {viewMorePlaceholder == true ? "View Less" : ""}
                  </span>
                  <span
                    style={{
                      color: "#3871DA",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      // setViewMorePlaceholder(!viewMorePlaceholder);
                      if (placeholderEndIndex >= placeholders.length) {
                        setViewMorePlaceholder(false);
                        setPlaceholderStartIndex(0);
                        setPlaceholderEndIndex(15);
                      } else {
                        setViewMorePlaceholder(true);
                        setPlaceholderStartIndex(placeholderEndIndex);
                        setPlaceholderEndIndex(placeholderEndIndex + 15);
                      }
                    }}
                  >
                    {viewMorePlaceholder == true &&
                    placeholderEndIndex >= placeholders.length
                      ? ""
                      : "View More"}
                  </span>
                </Grid>
              </div>
            </Grid>
          )}
          {props.message ? <div></div> : <p>Tagged Media</p>}
          {props.message ? (
            <div></div>
          ) : (
            <Grid container>
              {taggedMedia &&
                taggedMedia.map((tag, index) => {
                  if (index < 7) {
                    return (
                      <IconTextField
                        // width={100}
                        onClick={() => {
                          setShowTagsDialog(false);
                          setOpenSnackBar(true);
                        }}
                        text={tag.name}
                        textColor="#3871DA"
                        background="white"
                        icon={
                          <LocalOfferOutlinedIcon
                            style={{ color: "#3871DA" }}
                          ></LocalOfferOutlinedIcon>
                        }
                      ></IconTextField>
                    );
                  }
                })}
            </Grid>
          )}
        </div>
      </div>
      <Grid container direction="row" alignItems="center"></Grid>

      <DialogBox
        // title={"POST"}
        maxWidth="sm"
        open={showTagsDialog}
        message={
          <div>
            <p
              style={{
                fontSize: 22,
                color: "black",
                marginTop: 0,
                marginBottom: 0,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: -25,
              }}
            >
              Tags
            </p>
            <Grid container direction="row" justify="center">
              <input
                type="text"
                style={{
                  width: "100%",
                  border: "1px solid #ebebeb",
                  borderRadius: 4,
                  height: 40,
                }}
                placeholder="Search Tag Name"
                value={tagSearch}
                onChange={(e) => {
                  setTagSearch(e.target.value);
                }}
              ></input>
            </Grid>
            <div style={{ maxHeight: 400, minHeight: 400, overflow: "scroll" }}>
              {allTags &&
                allTags.map((tags) => {
                  if (tags.label.indexOf(tagSearch) > -1) {
                    return (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{
                          borderBottom: "1px solid #d8d8d8",
                          paddingTop: 4,
                          paddingBottom: 4,
                        }}
                      >
                        <Grid item md={3} sm={3}>
                          <Checkbox
                            color="primary"
                            onChange={() => {
                              // makeCheckBoxSelected(item.id);
                            }}
                            style={{ marginTop: 1, marginBottom: 1 }}
                          ></Checkbox>
                        </Grid>
                        <Grid item md={9} sm={9}>
                          {tags.label}
                        </Grid>
                      </Grid>
                    );
                  }
                })}
            </div>
            <Grid
              container
              direction="row"
              justify="flex-end"
              style={{ marginTop: 20, marginBottom: 5 }}
            >
              <HollowWhiteButton
                width={100}
                onClick={() => {
                  setShowTagsDialog(true);
                }}
                text="Cancel"
                textColor="#3871DA"
                background="white"
              ></HollowWhiteButton>
              <IconTextField
                width={100}
                onClick={() => {
                  setShowTagsDialog(false);
                  setOpenSnackBar(true);
                }}
                text="Tag"
                textColor="white"
                background="#3871DA"
                icon={
                  <LocalOfferOutlinedIcon
                    style={{ color: "white" }}
                  ></LocalOfferOutlinedIcon>
                }
              ></IconTextField>
            </Grid>
          </div>
        }
        // applyForm={() => dispatch(hidePost())}
        cancelForm={() => {
          setShowTagsDialog(false);
        }}
        hideActions={true}
      />
      {lightboxPicture && (
        <Dialog
          open={true}
          onClose={() => {
            setLightboxPicture(null);
          }}
        >
          <img src={lightboxPicture}></img>
        </Dialog>
      )}

      {lightboxVideo && (
        <Dialog
          open={true}
          onClose={() => {
            setLightboxVideo(null);
          }}
        >
          <video width="400" height="400" loop autoPlay controls>
            <source src={lightboxVideo} type="video/mp4"></source>
          </video>
        </Dialog>
      )}
    </div>
  );
}

export default MediaComponent;
