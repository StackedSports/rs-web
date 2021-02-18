import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  Grid,
  Checkbox,
  TextField,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { FaMarker, FaSlidersH, FaBars, FaTh } from "react-icons/fa";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import SendIcon from "@material-ui/icons/Send";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AvatarImg from "../../images/avatar.jpeg";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  FaMagic,
  FaColumns,
  FaUserCircle,
  FaPhone,
  FaTwitter,
  FaMapMarker,
  FaLocationArrow,
  FaFilePdf,
  FaVideo,
  FaImage,
} from "react-icons/fa";
import GifIcon from "@material-ui/icons/Gif";
import DialogBox from "../common/Dialogs";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import {
  getAllContacts,
  getMedia,
  getMediaTag,
  getPlaceholder,
} from "../../ApiHelper";
import { SelectAll } from "@material-ui/icons";
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
});

function Media() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(false);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const [showBoardFilters, setshowBoardFilters] = useState(false);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");
  const [stateSearch, setStateSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [showlistView, setShowlistView] = useState(false);
  const [coachFilter, setCoachFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [contacts, setContacts] = useState(null);
  const [media, setMedia] = useState(null);
  const [placeholders, setPlaceHolders] = useState(null);
  const [taggedMedia, setTaggedMedia] = useState(null);

  const [copyContacts, setCopyContacts] = useState(null);
  const [allColumns, setAllColumns] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);
  const [allGradYears, setAllGraderYears] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [allRanks, setAllRanks] = useState(null);
  const [allBoards, setAllBoards] = useState(null);
  const [positions, setAllPositions] = useState(null);
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
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    " New Mexico",
    " New York",
    " North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    " Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
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
                    addDataToFilter(option.label);
                  } else {
                    addDataToFilter(option.label, "status");
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
          {statuses &&
            statuses.map((option) => (
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
                    addDataToFilter(option.label);
                  } else {
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
          title={timeZoneFilter || "Associated To"}
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

            {states.map((option) => {
              if (stateSearch != "") {
                if (
                  option.toLowerCase().indexOf(stateSearch.toLowerCase()) > -1
                ) {
                  return (
                    <Dropdown.Item
                      style={{
                        background:
                          stateFilter === option ? "#348ef7" : "white",
                        color: stateFilter === option ? "white" : "black",
                      }}
                      onClick={() => {
                        addDataToFilter(option, "State");
                      }}
                    >
                      {option}
                    </Dropdown.Item>
                  );
                }
              } else {
                return (
                  <Dropdown.Item
                    style={{
                      background: stateFilter === option ? "#348ef7" : "white",
                      color: stateFilter === option ? "white" : "black",
                    }}
                    onClick={() => {
                      addDataToFilter(option, "State");
                    }}
                  >
                    {option}
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
  const addDataToFilter = (value, type) => {
    if (filter.includes(value)) {
      var temp = filter;
      if (temp.length === 1) {
        setFilter(temp);
      } else {
        temp.splice(value, 1);
        console.log("This is temp", temp);
        setFilter(temp);
      }
    } else {
      var temp = filter;
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
      // console.log("This is index", index);
      // var other = temp.splice(index, 1);
      // console.log("This is other", other);
      // var newArray = temp;
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedCheckBoxes;
      temp.push(index);
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    }
    console.log("THis is selected Checkbox", selectedCheckBoxes);
  };

  const removeDataFromFilter = (index) => {
    var temp = filter;
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

  // console.log("This is filter bar", filter, filterType);

  const isSelectedCheckbox = (index) => {
    console.log("This is great", selectedCheckBoxes.indexOf(index) > -1);
  };

  const checkFilters = (item) => {
    // console.log("These are tags for all", item.tags);
    var isValid = false;
    if (filter.length != 0) {
      filter.map((filt, index) => {
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
    return (
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          border: "1px solid #d2d2d2",
          borderRadius: 4,
          marginBottom: 10,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
        >
          <img
            style={{ width: "80%", height: 190 }}
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
            {m.file_name}
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
    return (
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          border: "1px solid #d2d2d2",
          borderRadius: 4,
          marginBottom: 10,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
        >
          <img
            style={{ width: "80%", height: 190 }}
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
    <DarkContainer contacts style={{ padding: 20, marginLeft: 60 }}>
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
              Media
            </p>
            <p className={classes.sideFilter}>
              My Media{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                setshowBoardFilters(!showBoardFilters);
              }}
            >
              Recent
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                setshowBoardFilters(!showBoardFilters);
              }}
            >
              Images
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                setshowBoardFilters(!showBoardFilters);
              }}
            >
              Videos
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                setshowBoardFilters(!showBoardFilters);
              }}
            >
              Gifs
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            {showBoardFilters === true && (
              <div>
                {/* {allBoards.map((board) => {
                  return (
                    <p
                      className={classes.sideSubFilter}
                      onClick={() => {
                        addDataToFilter(board.name, "Board");
                      }}
                    >
                      {board.name}
                    </p>
                  );
                })} */}
              </div>
            )}

            <p className={classes.sideFilter}>
              Personalized Media
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p className={classes.sideFilter}>
              Placeholders
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
            paddingLeft: 30,
            paddingRight: 30,
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
                <IconTextField
                  // width={180}
                  width={100}
                  text="Action"
                  textColor="gray"
                  icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
                ></IconTextField>
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
                <IconTextField
                  text="Filter"
                  width={120}
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
              style={{ width: "100%", maxHeight: 440, minWidth: 1110 }}
              className="fullHeightContacts"
              id="infinit"
              // onScroll={() => {
              //   handleScroll();
              // }}
            >
              <p>Quick Access</p>
              <Grid container>
                {media &&
                  media.map((m) => {
                    return mediaContainer(m);
                  })}
              </Grid>
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
              {showlistView === true ? (
                <div
                  style={{ width: "100%", overflowX: "scroll", marginTop: 10 }}
                >
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
                      <span className={classes.tableHeading}>
                        Last Modified
                      </span>
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
                        return (
                          <Grid
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
                      })}
                  </div>
                </div>
              ) : (
                <Grid container>
                  {placeholders &&
                    placeholders.map((m) => {
                      return placeholderContainer(m);
                    })}
                </Grid>
              )}

              <p>Tagged Media</p>
              <Grid container>
                {taggedMedia &&
                  taggedMedia.map((tag) => {
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
                  })}
              </Grid>
            </div>
          </div>
          <Grid container direction="row" alignItems="center"></Grid>
        </div>
      </Grid>
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
    </DarkContainer>
  );
}

export default Media;
