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
import AvatarImg from "../../images/avatar.png";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  FaPhone,
  FaTwitter,
  FaComment,
  FaPlus,
  FaCalendar,
  FaCalendarAlt,
} from "react-icons/fa";
import DialogBox from "../common/Dialogs";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import {
  getAllContacts,
  getTags,
  getRanks,
  getStatuses,
  getGradeYears,
  getBoardFilters,
  getPositions,
  getAllColumns,
} from "../../ApiHelper";
import { TramRounded } from "@material-ui/icons";
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
    marginLeft: -140,
    zIndex: 1,
    maxHeight: "60vh",
    overflowY: "hidden",
    overflowX: "hidden",
  },
  blueButtonActive: {
    width: "100%",
    borderRadius: 4,
    background: "#3871da",
    color: "white",
    height: 40,
    border: "none",
  },
  blueButton: {
    width: "100%",
    borderRadius: 4,
    background: "transparent",
    height: 40,
    border: "none",
    color: "#b5b9c0",
  },
});

function Home() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [displayCreateMessage, setDisplayCreateMessage] = useState(false);
  const [displayMessageSenders, setDisplayMessageSenders] = useState(false);
  const [displayMessageReceivers, setDisplayMessageReceivers] = useState(false);
  const [displaySendTo, setDisplaySendTo] = useState(true);
  const [showSideFilters, setshowSideFilters] = useState(true);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [messageSender, setMessageSender] = useState(null);
  const [messageReceiver, setMessageReceiver] = useState(null);

  const [showBoardFilters, setshowBoardFilters] = useState(true);
  const [stateSearch, setStateSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [positionFilter, setPositionFilter] = useState(null);
  const [coachFilter, setCoachFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [contacts, setContacts] = useState(null);
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
  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      //Remove the matched extension code
      //Change this to format for any country code.
      let intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }

    return null;
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
          if (page > 1) {
            var temp = contacts;
            temp = temp.concat(res.data);
            // temp.push(res.data);
            setContacts(temp);
            setCopyContacts(temp);
            setuseLessState(uselessState + 1);
            console.log("These are all new contacts", temp);
            // document.getElementById("infinit").scrollTop = 0;
            setFetching(false);
          } else {
            console.log("These are all contacts", res.data);
            setContacts(res.data);
            setCopyContacts(res.data);
            document.getElementById("infinit").scrollTop = 0;
            setFetching(false);
          }
        }
      },
      (error) => {
        // getMyContacts(1);
        document.getElementById("infinit").scrollTop = 0;
        setPage(1);
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
          // console.log("These are all contacts", res.data);
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

  const getAllBoards = () => {
    getBoardFilters().then(
      (res) => {
        console.log("THis is all boards", res);
        var gradYears = [];
        if (res.statusText === "OK") {
          console.log("These are all boards", res.data);
          setAllBoards(res.data);
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
          // console.log("These are all statuses", res.data);
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

  const getAllPositions = () => {
    getPositions().then(
      (res) => {
        // console.log("THis is all ranks", res);
        var POSITIONS = [];
        if (res.statusText === "OK") {
          console.log("These are all positions", res.data);
          res.data.map((item) => {
            POSITIONS.push({
              value: item.name,
              label: item.name,
            });
          });
          setAllPositions(POSITIONS);
        }
      },
      (error) => {
        console.log("this is error all poistion", error);
      }
    );
  };
  const getColumns = () => {
    getAllColumns().then(
      (res) => {
        // console.log("THis is all ranks", res);
        var POSITIONS = [];
        if (res.statusText === "OK") {
          console.log("These are all cols", res.data);
          // res.data.map((item) => {
          //   POSITIONS.push({
          //     value: item.name,
          //     label: item.name,
          //   });
          // });
          setAllColumns(res.data);
        }
      },
      (error) => {
        console.log("this is error all poistion", error);
      }
    );
  };
  const getAllRanks = () => {
    getRanks().then(
      (res) => {
        // console.log("THis is all ranks", res);
        var RANKS = [];
        if (res.statusText === "OK") {
          // console.log("These are all ranks", res.data);
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
          <div>
            <Grid container direction="row" justify="center">
              <input
                type="text"
                style={{
                  width: "90%",
                  border: "1px solid #ebebeb",
                  borderRadius: 4,
                }}
                placeholder="Search States"
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
        <DropdownButton
          id="dropdown-basic-button"
          title={positionFilter || "Position"}
          drop={"down"}
          style={filtesSpacingStyle}
        >
          {positions &&
            positions.map((option) => (
              <Dropdown.Item
                style={{
                  background:
                    positionFilter === option.label ? "#348ef7" : "white",
                  color: positionFilter === option.label ? "white" : "black",
                }}
                onClick={() => {
                  addDataToFilter(option, "Position");
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
                    addDataToFilter(option.label, "Tag");
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
      getMyContacts();
      getAllGradeYears();
      getAllRanks();
      getAllStatuses();
      getAllTags();
      getAllBoards();
      getAllPositions();
      getColumns();
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

  console.log("THis is great message type", messageType);

  const renderMessageTypeTag = (messageType) => {
    return (
      <div
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes.tags}
        style={{ paddingLeft: 0 }}
      >
        <Grid
          style={{ height: 40 }}
          container
          direction="row"
          alignItems="center"
        >
          {messageType.icon}
          <p style={{ margin: 0, marginLeft: 5, marginRight: 5 }}>
            {messageType.title}
          </p>
          <ClearIcon
            onClick={() => {
              setMessageType(null);
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
  };

  return (
    <DarkContainer contacts style={{ padding: 20, marginLeft: 60 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnakBar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {selectedCheckBoxes.length + " "} contacts have been tagged!
        </Alert>
      </Snackbar>
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
              Create Message
            </p>
            <p className={classes.sideFilter}>
              Drafts{" "}
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
              My Boards
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            {showBoardFilters === true && (
              <div>
                {allBoards &&
                  allBoards.map((board) => {
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
                  })}
              </div>
            )}
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
              {/* <FormatAlignLeftIcon
                onClick={(e) => {
                  setshowSideFilters(!showSideFilters);
                }}
                style={{ cursor: "pointer", fontSize: 18 }}
              ></FormatAlignLeftIcon> */}

              <span
                style={{
                  padding: 5,
                  fontWeight: "bold",
                  // marginLeft: 20,
                  fontSize: 20,
                }}
              >
                Create Message
              </span>
            </Grid>
            <Grid item md={6} sm={6}></Grid>
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
          <Grid container direction="row" alignItems="center"></Grid>
          <div style={{ width: "100%", overflowX: "hide", marginTop: 10 }}>
            <Grid container direction="row">
              {displaySendTo ? (
                <Grid item md={4} xs={4}>
                  <Grid container direction="row" justify="flex-start">
                    <div
                      style={{
                        background: "#edeef2",
                        width: "97%",
                        height: 40,
                        borderRadius: 4,
                      }}
                    >
                      <Grid container direction="row">
                        <Grid item md={4} xs={4}>
                          <button className={classes.blueButton}>
                            My Boards
                          </button>
                        </Grid>
                        <Grid item md={4} xs={4}>
                          <button className={classes.blueButtonActive}>
                            Team Boards
                          </button>
                        </Grid>
                        <Grid item md={4} xs={4}>
                          <button className={classes.blueButton}>
                            Individuals
                          </button>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginTop: 10 }}>
                        <div
                          style={{
                            width: "100%",
                            maxHeight: 330,
                            //  minWidth: 1110
                          }}
                          className="fullHeightCreateMessageSide"
                        >
                          {allBoards &&
                            allBoards.map((boards) => {
                              return (
                                <div
                                  style={{
                                    borderTop: "1px solid #edeef2",
                                    width: "100%",
                                    height: 100,
                                    color: "#9e9e9e",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setMessageReceiver({ title: boards.name });
                                  }}
                                >
                                  {boards.name}
                                  <Grid container direction="row">
                                    {boards.athletes.profile_images.map(
                                      (image, index) => {
                                        if (index < 8) {
                                          return (
                                            <img
                                              src={image || AvatarImg}
                                              style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 20,
                                                marginTop: 5,
                                                marginLeft:
                                                  index != 0 ? -10 : 0,
                                              }}
                                            ></img>
                                          );
                                        }
                                      }
                                    )}
                                    <img></img>
                                  </Grid>
                                  <p style={{ color: "#3871da" }}>
                                    {boards.athletes.profile_images.length}{" "}
                                    contacts
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                <div></div>
              )}

              <Grid
                item
                md={displaySendTo ? 8 : 12}
                xs={displaySendTo ? 8 : 12}
              >
                {" "}
                <div
                  style={{
                    width: "100%",
                    maxHeight: 330,
                    //  minWidth: 1110
                  }}
                  className="fullHeightCreateMessage"
                  id="infinit"
                  onScroll={() => {
                    handleScroll();
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 70,
                    }}
                    onMouseEnter={() => {
                      setDisplayCreateMessage(false);
                      setDisplayMessageSenders(false);
                    }}
                  >
                    <Grid item md={1} xs={1}>
                      <p style={{ margin: 0, marginLeft: 12 }}>Send As:</p>
                    </Grid>
                    <Grid item md={11} xs={11}>
                      {messageType ? (
                        renderMessageTypeTag(messageType)
                      ) : (
                        <div class="dropdown">
                          <IconTextField
                            width={170}
                            background={
                              displayCreateMessage ? "#3871da" : "white"
                            }
                            text={
                              <p
                                style={{
                                  margin: 0,
                                  color: displayCreateMessage
                                    ? "white"
                                    : "black",
                                }}
                              >
                                Message Type
                              </p>
                            }
                            icon={
                              <ExpandMoreOutlinedIcon
                                style={{
                                  color: displayCreateMessage
                                    ? "white"
                                    : "black",
                                }}
                              ></ExpandMoreOutlinedIcon>
                            }
                            onMouseEnter={() => {
                              setDisplayCreateMessage(true);
                              setDisplayMessageSenders(false);
                            }}
                          ></IconTextField>
                          <div
                            // class="dropdown-content"
                            className={classes.dropdownHidden}
                            style={{
                              marginLeft: 180,
                              marginTop: -40,
                              display: displayCreateMessage ? "block" : "none",
                            }}
                            onMouseLeave={() => {
                              setDisplayCreateMessage(false);
                            }}
                          >
                            <p
                              style={{
                                color: "black",
                                padding: 12,
                                background: "#3871da",
                                color: "white",
                                fontWeight: 600,
                              }}
                            >
                              Set Message Type
                            </p>
                            {[
                              {
                                title: "Twitter DM",
                                icon: (
                                  <FaTwitter
                                    style={{ color: "#3871da", marginLeft: 12 }}
                                  ></FaTwitter>
                                ),
                              },
                              {
                                title: "Personal Text",
                                icon: (
                                  <FaPhone
                                    style={{ color: "#3871da", marginLeft: 12 }}
                                  ></FaPhone>
                                ),
                              },
                              {
                                title: "RS Text",
                                icon: (
                                  <FaComment
                                    style={{ color: "#3871da", marginLeft: 12 }}
                                  ></FaComment>
                                ),
                              },
                            ].map((type) => {
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
                                  onClick={() => {
                                    setMessageType(type);
                                  }}
                                >
                                  {type.icon}
                                  <p
                                    style={{
                                      margin: 0,
                                      fontWeight: 600,
                                      marginLeft: 12,
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
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 70,
                      marginTop: 12,
                    }}
                  >
                    <Grid item md={1} xs={1}>
                      <p style={{ margin: 0, marginLeft: 12 }}>Send As:</p>
                    </Grid>
                    <Grid item md={11} xs={11}>
                      {messageSender ? (
                        renderMessageTypeTag(messageSender)
                      ) : (
                        <div class="dropdown">
                          <IconTextField
                            width={170}
                            background={
                              displayMessageSenders ? "#3871da" : "white"
                            }
                            text={
                              <p
                                style={{
                                  margin: 0,
                                  color: displayMessageSenders
                                    ? "white"
                                    : "black",
                                }}
                              >
                                Add Sender
                              </p>
                            }
                            iconStart={
                              <FaPlus
                                style={{
                                  color: displayMessageSenders
                                    ? "white"
                                    : "#3871da",
                                }}
                              ></FaPlus>
                            }
                            onMouseEnter={() => {
                              setDisplayCreateMessage(false);
                              setDisplayMessageSenders(true);
                            }}
                          ></IconTextField>
                          <div
                            // class="dropdown-content"
                            className={classes.dropdownHidden}
                            style={{
                              marginLeft: 180,
                              marginTop: -40,
                              display: displayMessageSenders ? "block" : "none",
                            }}
                            onMouseLeave={() => {
                              setDisplayMessageSenders(false);
                            }}
                          >
                            <p
                              style={{
                                color: "black",
                                padding: 12,
                                marginBottom: 0,
                                background: "#3871da",
                                color: "white",
                                fontWeight: 600,
                              }}
                            >
                              Send on the behalf of
                            </p>

                            <p
                              style={{
                                color: "black",
                                padding: 12,
                                marginBottom: 0,
                                fontWeight: 600,
                              }}
                            >
                              Area Recruiting Coach
                            </p>
                            <div
                              style={{
                                width: "100%",
                                border: "1px solid #d8d8d8",
                              }}
                            ></div>
                            <p
                              style={{
                                color: "black",
                                padding: 12,
                                marginTop: 0,
                                marginBottom: 0,
                                fontWeight: 600,
                              }}
                            >
                              Position Coach
                            </p>
                            <div
                              style={{
                                width: "100%",
                                border: "1px solid #d8d8d8",
                              }}
                            ></div>
                            <p
                              style={{
                                color: "gray",
                                fontSize: 11,
                                width: 200,
                                marginLeft: 12,
                              }}
                            >
                              ** select a default send account if recruite do
                              not have a coach assigned
                            </p>
                            {[
                              {
                                title:
                                  "You (@" +
                                  JSON.parse(localStorage.getItem("user"))
                                    .twitter_profile.screen_name +
                                  ")",
                                icon: (
                                  <img
                                    style={{
                                      width: 30,
                                      height: 30,
                                      borderRadius: 20,
                                      marginLeft: 12,
                                    }}
                                    src={
                                      JSON.parse(localStorage.getItem("user"))
                                        .twitter_profile.profile_image
                                    }
                                  ></img>
                                ),
                              },
                            ].map((type) => {
                              console.log(
                                JSON.parse(localStorage.getItem("user"))
                                  .twitter_profile.screen_name
                              );
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
                                  onClick={() => {
                                    setMessageSender(type);
                                  }}
                                >
                                  {type.icon}
                                  <p
                                    style={{
                                      margin: 0,
                                      fontWeight: 600,
                                      marginLeft: 12,
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
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 70,
                      marginTop: 12,
                    }}
                    onMouseEnter={() => {
                      setDisplayCreateMessage(false);
                      setDisplayMessageSenders(false);
                    }}
                  >
                    <Grid item md={1} xs={1}>
                      <p style={{ margin: 0, marginLeft: 12 }}>Send To:</p>
                    </Grid>
                    <Grid item md={11} xs={11}>
                      {messageReceiver ? (
                        <Grid container direction="row">
                          {displaySendTo ? (
                            <IconTextField
                              width={170}
                              background={"#3871da"}
                              text={
                                <p
                                  style={{
                                    margin: 0,
                                    color: "white",
                                  }}
                                >
                                  Done Adding
                                </p>
                              }
                              iconStart={
                                <ArrowForwardIosIcon
                                  style={{
                                    color: "white",
                                  }}
                                ></ArrowForwardIosIcon>
                              }
                              onMouseEnter={() => {
                                setDisplayCreateMessage(false);
                                setDisplayMessageSenders(false);
                              }}
                              onClick={() => {
                                setDisplaySendTo(false);
                              }}
                            ></IconTextField>
                          ) : (
                            <IconTextField
                              width={170}
                              background={
                                displayMessageReceivers ? "#3871da" : "white"
                              }
                              text={
                                <p
                                  style={{
                                    margin: 0,
                                    color: displayMessageReceivers
                                      ? "white"
                                      : "black",
                                  }}
                                >
                                  Add Contact
                                </p>
                              }
                              iconStart={
                                <FaPlus
                                  style={{
                                    color: displayMessageReceivers
                                      ? "white"
                                      : "#3871da",
                                  }}
                                ></FaPlus>
                              }
                              // onMouseEnter={() => {
                              //   setDisplayCreateMessage(false);
                              //   setDisplayMessageSenders(false);
                              // }}
                              onClick={() => {
                                setDisplaySendTo(true);
                              }}
                            ></IconTextField>
                          )}
                          {renderMessageTypeTag(messageReceiver)}
                        </Grid>
                      ) : (
                        <div class="dropdown">
                          <IconTextField
                            width={170}
                            background={
                              displayMessageReceivers ? "#3871da" : "white"
                            }
                            text={
                              <p
                                style={{
                                  margin: 0,
                                  color: displayMessageReceivers
                                    ? "white"
                                    : "black",
                                }}
                              >
                                Add Contact
                              </p>
                            }
                            iconStart={
                              <FaPlus
                                style={{
                                  color: displayMessageReceivers
                                    ? "white"
                                    : "#3871da",
                                }}
                              ></FaPlus>
                            }
                            // onMouseEnter={() => {
                            //   setDisplayCreateMessage(false);
                            //   setDisplayMessageSenders(false);
                            // }}
                            onClick={() => {
                              setDisplaySendTo(true);
                            }}
                          ></IconTextField>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 70,
                      marginTop: 12,
                    }}
                  >
                    <Grid item md={2} xs={2}>
                      <p style={{ margin: 0, marginLeft: 12 }}>
                        Begin Sending At:
                      </p>
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <div class="dropdown">
                        <IconTextField
                          width={170}
                          background={
                            displayMessageReceivers ? "#3871da" : "white"
                          }
                          text={
                            <p
                              style={{
                                margin: 0,
                                color: displayMessageReceivers
                                  ? "white"
                                  : "black",
                              }}
                            >
                              ASAP
                            </p>
                          }
                          iconStart={
                            <FaCalendarAlt
                              style={{
                                color: displayMessageReceivers
                                  ? "white"
                                  : "#3871da",
                              }}
                            ></FaCalendarAlt>
                          }
                          onMouseEnter={() => {
                            setDisplayCreateMessage(false);
                            setDisplayMessageSenders(false);
                          }}
                        ></IconTextField>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 170,
                      marginTop: 12,
                    }}
                  >
                    <Grid item md={2} xs={2}>
                      <p style={{ margin: 0, marginLeft: 12, height: 160 }}>
                        Add Media:
                      </p>
                    </Grid>
                    <Grid item md={10} xs={10}>
                      <div class="dropdown">
                        <Grid
                          container
                          direction="row"
                          style={{
                            border: "1px solid #d8d8d8",
                            height: 150,
                            width: 150,

                            borderRadius: 4,
                          }}
                          alignItems="center"
                          justify="center"
                        >
                          {" "}
                          <FaPlus
                            style={{
                              // color: displayMessageSenders ? "white" : "#3871da",
                              color: "#3871da",
                            }}
                          ></FaPlus>{" "}
                          Add Media
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,
                      border: "1px solid #d8d8d8",
                      borderRadius: 4,
                      height: 170,
                      marginTop: 12,
                    }}
                  >
                    <Grid item md={2} xs={2}>
                      <p style={{ margin: 0, marginLeft: 12 }}>Message Text:</p>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <div class="dropdown">
                        <textarea
                          type="text"
                          style={{
                            border: "none",
                            height: 140,
                            width: "100%",
                            borderRadius: 4,
                            paddingLeft: 12,
                          }}
                          placeholder="Type message"
                        ></textarea>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
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

export default Home;
