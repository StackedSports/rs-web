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
import { FaMarker, FaSlidersH } from "react-icons/fa";
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
import {
  FaMagic,
  FaColumns,
  FaUserCircle,
  FaPhone,
  FaTwitter,
  FaMapMarker,
  FaLocationArrow,
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

function Home() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(true);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const [showBoardFilters, setshowBoardFilters] = useState(true);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");
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

  const columnNames = [
    {
      name: "First Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Last Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Nick Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className={classes.icons}></FaTwitter>,
    },
    {
      name: "Phone Number",
      icon: <FaPhone className={classes.icons}></FaPhone>,
    },
    {
      name: "State",
      icon: <FaMapMarker className={classes.icons}></FaMapMarker>,
    },
    {
      name: "High School",
      icon: <FaLocationArrow className={classes.icons}></FaLocationArrow>,
    },
    { name: "Grad Year" },
    { name: "Position" },
    { name: "Area Coach" },
    { name: "Recruiting Coach" },
    { name: "Status" },
    { name: "Rank" },
    { name: "Last Messaged" },
    { name: "Most Active Time" },
    { name: "Date Added" },
    {
      name: "Total Messages Sent",
    },
    { name: "Personal Text", sub: true },
    { name: "Twitter DM's", sub: true },

    { name: "RS Text", sub: true },
    { name: "Relationships Type", Heading: "Display Relationship Detail" },
    {
      name: "First Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Last Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Nick Name",
      icon: <FaUserCircle className={classes.icons}></FaUserCircle>,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className={classes.icons}></FaTwitter>,
    },
    {
      name: "Phone Number",
      icon: <FaPhone className={classes.icons}></FaPhone>,
    },
    { name: "Lives With" },
    { name: "Active In life" },
    { name: "Top Influencer" },
    { name: "Opponent Week", Heading: "Opponent Details" },
    { name: "Opponent Name", sub: true },
    { name: "Game Results", sub: true },
    { name: "Game Notes", sub: true },
  ];

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
              {selectedCheckBoxes.length != 0 ? (
                <span
                  style={{
                    padding: 5,
                    fontWeight: "bold",
                    marginTop: 20,
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  <span style={{ color: "#3871DA" }}>
                    {selectedCheckBoxes.length + " "} contacts selected
                  </span>{" "}
                </span>
              ) : (
                <span
                  style={{
                    padding: 5,
                    fontWeight: "bold",
                    marginTop: 20,
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  You have <span style={{ color: "#3871DA" }}>1806</span>{" "}
                  contacts in the system
                </span>
              )}
            </Grid>
            <Grid item md={3} sm={3}>
              <IconButton
                text="Send Message"
                textColor="white"
                width={180}
                icon={<SendIcon style={{ color: "white" }}></SendIcon>}
              ></IconButton>
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid container direction="row" justify="flex-end">
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
                <div class="dropdown">
                  <IconTextField
                    width={100}
                    text={<FaColumns style={{ color: "#3871DA" }}></FaColumns>}
                    icon={<ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>}
                  ></IconTextField>
                  <div class="dropdown-content">
                    <p style={{ color: "black", margin: 12 }}>
                      Displayed Recruite Data
                    </p>
                    {allColumns &&
                      allColumns.map((item) => {
                        return (
                          <Grid
                            container
                            alignItems="center"
                            style={{
                              height: item.Heading ? 60 : 30,
                              marginLeft: item.sub ? 35 : 0,
                            }}
                          >
                            {item.Heading && (
                              <p
                                style={{
                                  marginTop: 10,
                                  marginBottom: 0,
                                  width: "100%",
                                  paddingLeft: 4,
                                  fontWeight: 600,
                                }}
                              >
                                {item.Heading}
                              </p>
                            )}
                            <Checkbox color="primary"></Checkbox>
                            {/* {item.icon} */}
                            {/* <i
                              class="fa fa-user-circle"
                              style={{ color: "#dadada", marginRight: 10 }}
                            ></i> */}
                            <i
                              class={item.fa_classes}
                              style={{ color: "#dadada", marginRight: 10 }}
                            ></i>
                            <p style={{ margin: 0 }}>{item.name}</p>
                          </Grid>
                        );
                      })}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
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
              <Grid item md={1} xs={1}>
                <Checkbox
                  checked={selectAll}
                  onChange={() => {
                    if (selectAll === false) {
                      setSelectAll(true);
                      contacts &&
                        contacts.map((item) => {
                          makeCheckBoxSelected(item.id);
                        });
                    } else {
                      setSelectAll(false);
                      setSelectedCheckboxes([]);
                    }
                  }}
                  color="primary"
                ></Checkbox>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>First Name</span>
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
                  Phone Number
                </span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>State</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Grad Year</span>
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

            <div
              style={{ width: "100%", maxHeight: 330, minWidth: 1110 }}
              className="fullHeightContacts"
              id="infinit"
              onScroll={() => {
                handleScroll();
              }}
            >
              {contacts &&
                contacts.map((item, index) => {
                  // console.log(
                  //   "This is filter funtion",
                  //   isSelectedCheckbox(index)
                  // );
                  if (checkFilters(item) === true) {
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
                        <Grid item md={1} xs={1}>
                          {hoveredIndex === index ? (
                            <Checkbox
                              color="primary"
                              onChange={() => {
                                makeCheckBoxSelected(item.id);
                              }}
                              style={{ marginTop: 1, marginBottom: 1 }}
                              onMouseLeave={() => {
                                setHoveredIndex(null);
                              }}
                            ></Checkbox>
                          ) : selectedCheckBoxes.indexOf(item.id) > -1 ? (
                            <Checkbox
                              color="primary"
                              checked={true}
                              onChange={() => {
                                makeCheckBoxSelected(item.id);
                              }}
                              style={{ marginTop: 1, marginBottom: 1 }}
                              onMouseLeave={() => {
                                setHoveredIndex(null);
                              }}
                            ></Checkbox>
                          ) : (
                            <img
                              onMouseEnter={() => {
                                setHoveredIndex(index);
                              }}
                              src={
                                item.twitter_profile &&
                                item.twitter_profile.profile_image.includes(
                                  "contact-missing-image"
                                ) == false
                                  ? item.twitter_profile.profile_image
                                  : AvatarImg
                              }
                              style={{
                                width: 35,
                                height: 35,
                                borderRadius: "50%",
                                marginLeft: 5,
                                marginTop: 5,
                                marginBottom: 5,
                              }}
                            ></img>
                          )}
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
                            {formatPhoneNumber(item.phone)}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.state}
                          </span>
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
                        {index === contacts.length - 1 && (
                          <Grid item md={12} xs={12}>
                            <Grid container direction="row" justify="center">
                              <CircularProgress />
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    );
                  }
                })}
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

export default Home;
