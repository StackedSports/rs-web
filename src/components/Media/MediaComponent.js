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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AmimatedBurger from '../../images/animated_burger.gif';

import DrawerAnimation from '../../images/drawer_animation.gif';
import BackAnimation from '../../images/back_animation.gif';
import BackIcon from '../../images/back.png';
import DrawerIcon from '../../images/drawer_contact.png';

import {
  Search,
} from "@material-ui/icons";

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
  getTeamContacts,
  getTags
} from "../../ApiHelper";
import { MoreHoriz } from "@material-ui/icons";

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
    zIndex: 415,
    // maxHeight: "60vh",
    // overflowY: "scroll",
    overflowX: "hidden",
  },
  mediaStatsRightHeading: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 0,
    width: "100%",
    textAlign: "center",
  },
  mediaStatsRightState: {
    fontSize: 18,
    margin: 0,
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center'
  },
  mediaStatsGrid: {
    borderBottom: "1px solid #d2d2d2",
    paddingTop: 16, paddingBottom: 16
  }
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
  const [showMediaStats, setShowMediaStats] = useState(false);
  const [teamContacts, setTeamContacts] = useState(null);
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
  const [searchTags, setSearchTags] = useState("");
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
  const [displayOwner, setDisplayOwner] = useState(null);
  const [displayTags, setDisplayTags] = useState(null);
  const [tagFilter, setTagFilter] = useState([]);
  const [placeholderFilter, setPlaceholderFilter] = useState([]);

  const [displayPlaceholder, setDisplayPlaceholder] = useState(null);

  const [allTags, setAllTags] = useState(null);
  const [page, setPage] = useState(1);

  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  
  const [showDrawer, setShowDrawer] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

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

  const getMyTeamContacts = () => {
    getTeamContacts().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          setTeamContacts(res.data);
        }
      },
      (error) => { }
    );
  };
  const getAllTags = () => {
    getTags().then(
      (res) => {
        // console.log("THis is all tags", res);
        var TAGS = [];
        if (res.statusText === "OK") {
          // console.log("These are all tags", res.data);
          setAllTags(res.data);
        }
      },
      (error) => {
        console.log("this is error all tags", error);
      }
    );
  };


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
          // setCopyContacts(res.data);
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      style={{ fontSize: 17 }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        // onClick(e);
      }}
    >
      {children}
      <KeyboardArrowDownIcon style={{ marginLeft: 15, fontSize: 30 }} />
    </div>
  ));


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

  const ContainerIconText = (props) => {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{
          border: props.border || "1px solid #d8d8d8",
          width: props.width || "max-content",
          background: props.background || "white",
          height: 40,
          borderRadius: 4,
          marginLeft: props.marginLeft != null ? props.marginLeft : 16,
          marginTop: props.marginTop || 0,
          marginBottom: props.marginBottom || 0,
          cursor: "pointer",
          paddingLeft: 20,
          paddingRight: 20,
        }}
        onClick={() => {
          if (props.onClick) {
            props.onClick();
          }
        }}
        onMouseEnter={() => {
          if (props.onMouseEnter) {
            props.onMouseEnter();
          }
        }}
        onMouseLeave={() => {
          if (props.onMouseLeave) {
            props.onMouseLeave();
          }
        }}
      >
        <Grid item md={12} sm={12} direction="row">
          <div style={{ display: "flex" }}>
            {props.icon && <span> {props.icon}</span>}
            <span
              id={props.id}
              style={{
                fontWeight: "bold",
                color: props.textColor || "black",
                overflowText: "ellipsis",
                marginLeft: 10,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {props.text}
            </span>
          </div>
        </Grid>
      </Grid>
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
      getMyTeamContacts();
      // getAllTags();
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

  useEffect(() => {
    setShowDrawer(false);
    setShowAnimation(true);
    handleAnimation();

  }, []);

  const handleAnimation=()=>{
    //setShowDrawer(true);
    setTimeout(()=>{
      setShowAnimation(false);
    },500)
  }


  const MediaDetailsCard = (props) => {
    return (
      <Grid
        container
        direction="row"
        style={{
          border: "1px solid #d2d2d2",
          borderRadius: 4,
          marginTop: 16,
          height: "auto",
        }}
      >
        {/* <Grid item md={4} xs={4}> */}
        <div
          style={{
            borderRight: "1px solid #d2d2d2",
            width: "5%",
          }}
        >
          {/* <Grid container direction="row" justify="center">
            {props.hideCheckBox === null && (
              <Checkbox
                color={"primary"}
                checked={
                  selectedMessages.indexOf(props.selectedPlaceholder.name) > -1
                    ? true
                    : false
                }
                onChange={() => {
                  console.log("THis is selected", props.selectedPlaceholder);
                  makeMessageSelected(props.selectedPlaceholder.name);
                }}
              ></Checkbox>
            )}
          </Grid> */}
        </div>
        <Grid
          container
          direction="row"
          style={{
            width: props.hideStats ? "90%" : "70%",
            padding: 16,
          }}
        >
          {mediaContainer(props.selectedPlaceholder)}
          {/* </Grid> */}
          {/* <Grid item md={8} xs={8}> */}
          <div
            style={{
              marginLeft: 16,
              width: "50%",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 0,
              }}
            >
              {props.selectedPlaceholder.name}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Message Status:
              {props.messageStatus === "Drafts" ? (
                <span className={classes.mdMargin} style={{ color: "#f0ad24" }}>
                  Drafts
                </span>
              ) : props.messageStatus === "Scheduled" ? (
                <span className={classes.mdMargin} style={{ color: "#54a300" }}>
                  Scheduled
                </span>
              ) : (
                <span className={classes.mdMargin} style={{ color: "#8bb14c" }}>
                  Published
                </span>
              )}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Published On:
              <strong className={classes.mdMargin}>Twitter</strong>{" "}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Published to :
              <strong className={classes.mdMargin}>@JakeSmith</strong>{" "}
            </p>
            {props.messageStatus === "Scheduled" ? (
              <p class className={classes.messageDetailsHeading}>
                Published Time:
                <strong className={classes.mdMargin}>
                  June 15, 2021 15:00
                </strong>{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => {
                    setMessageStatus("Drafts");
                    setMessageCreated(false);
                  }}
                >
                  (Unschedule & more to drafts)
                </span>
              </p>
            ) : (
              <p class className={classes.messageDetailsHeading}>
                Published Time:
                <strong className={classes.mdMargin}>
                  June 15, 2021 15:00
                </strong>{" "}
              </p>
            )}

            <Grid
              container
              direction="row"
              className={classes.messageDetailsHeading}
            >
              Tags:
              <div
                style={{
                  border: "1px solid #0091ff",
                  color: "#0091ff",
                  padding: 4,
                  fontSize: 10,
                  borderRadius: 4,
                  marginLeft: 16,
                }}
              >
                OV WEEKENDS
              </div>
              <div
                style={{
                  border: "1px solid #0091ff",
                  color: "#0091ff",
                  padding: 4,
                  fontSize: 10,
                  borderRadius: 4,
                  marginLeft: 16,
                }}
              >
                OV WEEKENDS
              </div>
            </Grid>
          

          </div>
          <Grid container direction="row">
              <Grid item md={12} xs={12}>
                <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
                  Owner
                </p>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
                >
                  {filter.length != 0 &&
                    filter.map((fil, index) => {
                      return (
                        <div
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.tags}
                        >
                          <Grid
                            style={{ height: 50 }}
                            container
                            direction="row"
                            alignItems="center"
                          >
                            {fil}
                            <ClearIcon
                              onClick={() => {
                                addDataToFilter(fil);
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
                  <div class="dropdownMedia">
                    <input
                      type="text"
                      style={{
                        height: 60,
                        flex: "auto",
                        border: "none",
                        padding: 16,
                      }}
                      id="owner"
                      onClick={(e) => {
                        console.log("This is ", e.target.id);
                        setDisplayOwner(true);
                      }}
                      placeholder="+ Add Owner"
                    ></input>
                    <div
                      className={classes.dropdownHidden}
                      style={{
                        display: displayOwner ? "block" : "none",
                      }}
                    >
                      {teamContacts &&
                        teamContacts.map((type, index) => {
                          return (
                            <Grid
                              container
                              alignItems="center"
                              style={{
                                height: 60,
                                marginLeft: 0,
                                marginTop: -12,
                                cursor: "pointer",
                              }}
                              className={classes.hoverGrid}
                              onClick={() => {
                                if (type.twitter_profile) {
                                  addDataToFilter(type.twitter_profile.screen_name);
                                }
                              }}
                            // className={classes.sendAsP}
                            >
                              <img
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 20,
                                  marginLeft: 12,
                                }}
                                src={
                                  type.twitter_profile &&
                                  type.twitter_profile.profile_image
                                }
                              ></img>

                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 600,
                                  marginLeft: 12,
                                }}
                              >
                                {type.twitter_profile &&
                                  type.twitter_profile.screen_name + " "}
                              </p>
                            </Grid>
                          );
                        })}
                    </div>{" "}
                  </div>
                </Grid>
              </Grid>

              <Grid item md={12} xs={12}>
                <p
                  style={{
                    color: "#b5bccd",
                    fontSize: 17,
                    fontWeight: 500,
                    marginTop: 16,
                  }}
                >
                  Tags
                </p>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
                >
                  {tagFilter.length != 0 &&
                    tagFilter.map((fil, index) => {
                      return (
                        <div
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.tags}
                        >
                          <Grid
                            style={{ height: 50 }}
                            container
                            direction="row"
                            alignItems="center"
                          >
                            {fil}
                            <ClearIcon
                              onClick={() => {
                                addTagToFilter(fil);
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
                  <div class="dropdownMedia">
                    <input
                      type="text"
                      style={{
                        height: 60,
                        flex: "auto",
                        border: "none",
                        padding: 16,
                      }}
                      id="tags"
                      onClick={(e) => {
                        console.log("This is ", e.target.id);
                        setDisplayTags(true);
                      }}
                      placeholder="+ Add Tag"
                    ></input>
                    <div
                      className={classes.dropdownHidden}
                      style={{
                        display: displayTags ? "block" : "none",
                      }}
                    >
                      <Grid container direction="row" justify="center">
                        <input
                          type="text"
                          style={{
                            width: "90%",
                            border: "1px solid #ebebeb",
                            borderRadius: 4,
                            marginTop: 8,
                          }}
                          id="searchtags"
                          placeholder="Search Tags"
                          value={searchTags}
                          onChange={(e) => {
                            setSearchTags(e.target.value);
                            setDisplayTags(true);
                          }}
                          onClick={(e) => {
                            setDisplayTags(true);
                          }}
                        ></input>
                      </Grid>
                      {allTags &&
                        allTags.map((item, index) => {
                          // console.log("This is item", item);
                          if (searchTags != "") {
                            if (
                              item.name
                                .toLowerCase()
                                .indexOf(searchTags.toLowerCase()) > -1
                            ) {
                              return (
                                <Grid
                                  container
                                  alignItems="center"
                                  style={{
                                    height: 50,
                                    marginLeft: 0,

                                    cursor: "pointer",
                                  }}
                                  className={classes.hoverGrid}
                                  onClick={() => {
                                    addTagToFilter(item.name);
                                  }}
                                // className={classes.sendAsP}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontWeight: 600,
                                      marginLeft: 12,
                                    }}
                                  >
                                    {item.name}
                                  </p>
                                </Grid>
                              );
                            }
                          } else {
                            return (
                              <Grid
                                container
                                alignItems="center"
                                style={{
                                  height: 50,
                                  marginLeft: 0,
                                  marginTop: 0,
                                  cursor: "pointer",
                                }}
                                className={classes.hoverGrid}
                                onClick={() => {
                                  addTagToFilter(item.name);
                                }}
                              // className={classes.sendAsP}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 12,
                                  }}
                                >
                                  {item.name}
                                </p>
                              </Grid>
                            );
                          }
                        })}
                    </div>{" "}
                  </div>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={1}>
              <Grid item md={6} xs={6}>
                <p
                  style={{
                    color: "#b5bccd",
                    fontSize: 17,
                    fontWeight: 500,
                    marginTop: 16,
                  }}
                >
                  Associate to placeholder
                </p>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
                >
                  {placeholderFilter.length != 0 &&
                    placeholderFilter.map((fil, index) => {
                      return (
                        <div
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.tags}
                        >
                          <Grid
                            style={{ height: 50 }}
                            container
                            direction="row"
                            alignItems="center"
                          >
                            {fil}
                            <ClearIcon
                              onClick={() => {
                                addPlaceholderToFilter(fil);
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
                  <div class="dropdownMedia">
                    <input
                      type="text"
                      style={{
                        height: 60,
                        flex: "auto",
                        border: "none",
                        padding: 16,
                      }}
                      id="placeholder"
                      onClick={(e) => {
                        setDisplayPlaceholder(true);
                      }}
                      placeholder="+ Add Media placeholder or personalized graphics"
                    ></input>
                    <div
                      className={classes.dropdownHidden}
                      style={{
                        display: displayPlaceholder ? "block" : "none",
                      }}
                    >
                      {allTags &&
                        allTags.map((type, index) => {
                          return (
                            <Grid
                              container
                              alignItems="center"
                              style={{
                                height: 50,
                                marginLeft: 0,
                                marginTop: -12,
                                cursor: "pointer",
                              }}
                              className={classes.hoverGrid}
                            // onClick={() => {
                            //   addPlaceholderToFilter(type.name);
                            // }}
                            // className={classes.sendAsP}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 600,
                                  marginLeft: 12,
                                }}
                              >
                                {type.name}
                              </p>
                            </Grid>
                          );
                        })}
                    </div>{" "}
                  </div>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <p
                  style={{
                    color: "#b5bccd",
                    fontSize: 17,
                    fontWeight: 500,
                    marginTop: 16,
                  }}
                >
                  Associate to Contact
                </p>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
                >
                  {placeholderFilter.length != 0 &&
                    placeholderFilter.map((fil, index) => {
                      return (
                        <div
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.tags}
                        >
                          <Grid
                            style={{ height: 50 }}
                            container
                            direction="row"
                            alignItems="center"
                          >
                            {fil}
                            <ClearIcon
                              onClick={() => {
                                addPlaceholderToFilter(fil);
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
                  <div class="dropdownMedia">
                    <input
                      type="text"
                      style={{
                        height: 60,
                        flex: "auto",
                        border: "none",
                        padding: 16,
                      }}
                      id="placeholder"
                      onClick={(e) => {
                        setDisplayPlaceholder(true);
                      }}
                      placeholder="+ Add Media placeholder or personalized graphics"
                    ></input>
                    <div
                      className={classes.dropdownHidden}
                      style={{
                        display: displayPlaceholder ? "block" : "none",
                      }}
                    >
                      {allTags &&
                        allTags.map((type, index) => {
                          return (
                            <Grid
                              container
                              alignItems="center"
                              style={{
                                height: 50,
                                marginLeft: 0,
                                marginTop: -12,
                                cursor: "pointer",
                              }}
                              className={classes.hoverGrid}
                            // onClick={() => {
                            //   addPlaceholderToFilter(type.name);
                            // }}
                            // className={classes.sendAsP}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 600,
                                  marginLeft: 12,
                                }}
                              >
                                {type.name}
                              </p>
                            </Grid>
                          );
                        })}
                    </div>{" "}
                  </div>
                </Grid>
              </Grid>
              </Grid>
              
            </Grid>
        </Grid>
        {props.hideStats === null && (
          <div
            style={{
              borderLeft: "1px solid #d2d2d2",
              width: "25%",
            }}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                height: "10%",
                borderBottom: "1px solid #d2d2d2",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 0,
                  height: 30,
                }}
              >
                Media Stats
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.mediaStatsGrid}
            >
              <p
                className={classes.mediaStatsRightHeading}
              >
                Media Sent In:
              </p>
              <p
                className={classes.mediaStatsRightState}
              >
                0 Messages
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.mediaStatsGrid}
            >
              <p
                className={classes.mediaStatsRightHeading}
              >
                Media Published In:
              </p>
              <p
                className={classes.mediaStatsRightState}
              >
                0 Tweets
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                // height: "15%",
                borderBottom: "1px solid #d2d2d2",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 0,
                  height: 30,
                }}
              >
                Message Stats
              </p>
              <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                // height: "60%",
              }}
            >
              <p
            className={classes.mediaStatsRightState}
              >
                95%
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                  height: 30,
                }}
              >
                Contact Engagement (286/300)
              </p>
              <p
                 className={classes.mediaStatsRightState}
              >
                64
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                }}
              >
                Favorite From Contacts (286/300)
              </p>
              <p
             className={classes.mediaStatsRightState}
              >
                17
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                  height: 30,
                }}
              >
                Retweets front Contacts (286/300)
              </p>
            </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                // height: "15%",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 0,
                  height: 30,
                }}
              >
                Post Stats
              </p>
              <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                // height: "60%",
              }}
            >
              <p
            className={classes.mediaStatsRightState}
              >
                95%
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                  height: 30,
                }}
              >
                Contact Engagement (286/300)
              </p>
              <p
                 className={classes.mediaStatsRightState}
              >
                64
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                }}
              >
                Favorite From Contacts (286/300)
              </p>
              <p
             className={classes.mediaStatsRightState}
              >
                17
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                  height: 30,
                }}
              >
                Retweets front Contacts (286/300)
              </p>
            </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    );
  };

  const mediaContainer = (m) => {
    console.log("THis is container ", m);
    return (
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          // background: 'red',
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
              setDisplayAction(false);
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
          onClick={
            (e) => {
              // console.log("This is the target", e.target)
              setShowMediaStats(true)
              setSelectedPlaceHolder(m);
            }
          }
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
          setDisplayAction(false);
        }}
        onMouseLeave={() => {
          setPlaceholderHover(null);
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6", height: 180 }}
        >
          {placeholderHover === m.media_preview ||
            selectedCheckBoxes.indexOf(m.media_preview) > -1 ? (
            <div
              style={{
                width: "100%",
                height: 190,
                background: "rgba(0,0,0,0.6)",
                marginBottom: -190,
                width: 270,
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
          <div>
            <div
              style={{
                display: "flex",
                width: 270,
                marginleft: 10,
                marginRight: 10,
              }}
            >
              <img
                style={{
                  marginTop: 10,
                  height: 170,
                  width: 75,
                  objectFit: "cover",
                  zIndex: 4,
                  opacity: 0.9,
                  marginLeft: 20,
                }}
                src={m.media_preview}
              ></img>
              <img
                style={{
                  marginTop: 10,
                  height: 170,
                  width: 150,
                  marginLeft: -20,
                  objectFit: "cover",
                  zIndex: 10,
                }}
                src={m.media_preview}
              ></img>
              <img
                style={{
                  marginTop: 10,
                  height: 170,
                  zIndex: 4,
                  opacity: 0.9,

                  marginLeft: -30,
                  width: 75,

                  objectFit: "cover",
                }}
                src={m.media_preview}
              ></img>
            </div>
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 12, marginTop: 10 }}
          alignItems="center"
        >
          {m.media_preview.indexOf(".gif") > -1 ? (
            <GifIcon></GifIcon>
          ) : m.media_preview.indexOf(".png") > -1 ||
            m.media_preview.indexOf(".jpg") > -1 ||
            m.media_preview.indexOf(".jpeg") > -1 ? (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FaImage
                  style={{
                    marginLeft: 4,

                    color: "#3871da",
                    fontSize: 15,
                    display: "block",
                  }}
                ></FaImage>

                <FaImage
                  style={{
                    zIndex: 100,
                    marginTop: -12,
                    color: "#3871da",
                    fontSize: 15,
                    display: "block",
                  }}
                ></FaImage>
              </div>
            </>
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
           
        {
              showDrawer?
              <img src={showAnimation?DrawerAnimation:DrawerIcon} onClick={(e) => {
                setshowSideFilters(!showSideFilters);
                setShowDrawer(false);
                setShowAnimation(true);
                props.handleMediaDrawer(true);
                handleAnimation();
              }}
              style={{ cursor: "pointer", width:40}}></img>
              :
              <img src={showAnimation?BackAnimation:BackIcon} onClick={(e) => {
                setshowSideFilters(!showSideFilters);
                setShowDrawer(true);
                setShowAnimation(true);
                handleAnimation();
                props.handleMediaDrawer(false);

              }}
              style={{ cursor: "pointer", width:40}}></img>            }
              <span
                  style={{
                    fontWeight: "bold",
                    // marginLeft: 20,
                    fontSize: 20,
                  }}
                >

                  Media
                </span>
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
                  textColor={displayAction ? "white" : "#3871DA"}
                  // background={displayAction ? "#3871da" : "white"}
                  background={"white"}
                  background={displayAction ? "#3871DA" : "transparent"}
                  text="Action"
                  icon={
                    <FaMagic
                      style={{
                        color: displayAction ? "white" : "#3871DA",
                      }}
                    ></FaMagic>
                  }
                  onClick={() => {
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
        {
          showMediaStats ? <MediaDetailsCard
            id={"messageDetailScrollPublished"}
            hideCheckBox={null}
            hideStats={null}
            selectedPlaceholder={selectedPlaceholder}></MediaDetailsCard> :
            <div
              style={{ width: "100%", maxHeight: 460, minWidth: 1110 }}
              className="fullHeightMedia"
              id="infinit"
            // onScroll={() => {
            //   handleScroll();
            // }}
            >
              <Grid direction="row" container style={{ padding: "0 25px 0 10px" }}>
                <Grid md={6}>
                  <p>Quick Access</p>
                </Grid>
                <Grid md={6} direction="row" justify="flex-end">
                  <div style={{ textAlign: "end" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      >
                        Last Modified
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                      // as={CustomMenu}
                      >
                        <Dropdown.Item eventKey="1">Last Modified</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Grid>
              </Grid>

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
                          : "Load More"}
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
                    marginBottom: 10,
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
              <Grid direction="row" container style={{ padding: "0 25px 0 10px" }}>
                <Grid md={6}>
                  <p>Placeholders</p>
                </Grid>
                <Grid md={6} direction="row" justify="flex-end">
                  <div style={{ textAlign: "end" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      >
                        Last Modified
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                      // as={CustomMenu}
                      >
                        <Dropdown.Item eventKey="1">Last Modified</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Grid>
              </Grid>
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
                          : "Load More"}
                      </span>
                    </Grid>
                  </div>
                </Grid>
              )}
              {props.message ? (
                <div></div>
              ) : (
                <Grid
                  direction="row"
                  container
                  style={{ padding: "0 25px 0 10px" }}
                >
                  <Grid md={6}>
                    <p>Tagged Media</p>
                  </Grid>
                  <Grid md={6} direction="row" justify="flex-end">
                    <div style={{ textAlign: "end" }}>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          Last Modified
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                        // as={CustomMenu}
                        >
                          <Dropdown.Item eventKey="1">Last Modified</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Grid>
                </Grid>
              )}
              {props.message ? (
                <div></div>
              ) : (
                <Grid container>
                  {taggedMedia &&
                    taggedMedia.map((tag, index) => {
                      if (index < 7) {
                        return (
                          <ContainerIconText
                            width={200}
                            onClick={() => {
                              setShowTagsDialog(false);
                              setOpenSnackBar(true);
                            }}
                            text={tag.name}
                            textColor="black"
                            background="white"
                            marginBottom={15}
                            icon={
                              <LocalOfferOutlinedIcon
                                style={{ color: "#3871DA" }}
                              ></LocalOfferOutlinedIcon>
                            }
                          />
                        );
                      }
                    })}
                </Grid>
              )}
            </div>
        }

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
                marginBottom: 16,
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
                  paddingLeft: 4,
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
                  setShowTagsDialog(false);
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
