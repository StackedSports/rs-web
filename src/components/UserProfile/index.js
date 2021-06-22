import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  Grid,
  Checkbox,
  TextField,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
// import DoughnutChart from "../charts/Doughnut";
import InputEmoji from "react-input-emoji";
import DoughnutChart from "../charts/DoughnutChartCenterText";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import MyMedia from "../../images/media.jpg";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Accordion, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { Autorenew } from "@material-ui/icons";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import DialogBox from "../common/Dialogs";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ComputerIcon from "@material-ui/icons/Computer";
import AvatarImg from "../../images/avatar.png";
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
  getMonthlyStats,
  getThisQuarterStats,
  getThisYearStats,
  getLastQuarterStats,
  getLastYearStats,
  getLastMonthStats,
  getLast30Stats,
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
const useStyles = makeStyles((theme) => ({
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
  label: {
    margin: 0,
    color: "gray",
    marginLeft: 20,
    fontWeight: 500,
    width: "100%",
  },
  input: {
    border: "none",
    borderBottom: "1px solid #d8d8d8",
    height: 40,
    marginLeft: 20,
    width: "80%",
    "&:active": {
      border: "none",
    },
    "&:focus": {
      border: "none",
    },
  },
  messagBox: {
    margin: 0,
    padding: 8,
    background: "#f1f0f0",
    borderRadius: 16,
    fontWeight: 500,
    fontSize: 13,
    maxWidth: "40%",
    marginBottom: 5,
  },
  messagBoxBlue: {
    margin: 0,
    padding: 8,
    background: "#3871da",
    borderRadius: 16,
    fontWeight: 500,
    fontSize: 13,
    color: "white",
    maxWidth: "40%",
    marginBottom: 5,
  },
  sideText: {
    margin: 0,
    color: "gray",
    fontSize: 12,
  },
  accordionP: {
    color: "black",
    margin: 0,
    fontWeight: 600,
    fontSize: 16,
    width: "85%",
    textTransform: "uppercase",
    [theme.breakpoints.up("xl")]: {
      fontSize: 18,
    },
  },
  accordionGray: {
    color: "gray",
    marginLeft: 16,
    fontWeight: 500,
    fontSize: 14,
  },
}));

function Home() {
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
  const [doughnutChartData, setDoughnutChatData] = useState(null);
  const [showBoardFilters, setshowBoardFilters] = useState(false);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");
  const [stateSearch, setStateSearch] = useState("");
  const [loggedInUserStats, setLoggedInUserStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [positionFilter, setPositionFilter] = useState(null);
  const [coachFilter, setCoachFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currency, setCurrency] = React.useState("This Month");
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
  const [loading, setLoading] = useState(false);

  const [openSnakBar, setOpenSnackBar] = React.useState(false);

  const currencies = [
    {
      value: "1",
      label: "Last 30 Days",
    },
    {
      value: "2",
      label: "This Month",
    },
    {
      value: "3",
      label: "This Quarter",
    },
    {
      value: "4",
      label: "This Year",
    },
    {
      value: "5",
      label: "Last Month",
    },
    {
      value: "6",
      label: "Last Quarter",
    },
    {
      value: "7",
      label: "Last Year",
    },
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

  const myMonthlyStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getMonthlyStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the monthlly stats", res.data.table);
          setDoughnutChatData(res.data.table);
          setLoading(false);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
      }
    );
  };

  const myQuarterlyStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getThisQuarterStats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        console.log("this is error in the stats", error);
        setLoading(false);
      }
    );
  };
  const myYearlyStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getThisYearStats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
      }
    );
  };

  const myLastQuarterStats = () => {
    // || "2020-12-13"

    setLoading(true);
    getLastQuarterStats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
      }
    );
  };
  const myLastYearStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getLastYearStats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
      }
    );
  };
  const myLastMonthStats = () => {
    setLoading(true);
    getLastMonthStats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
      }
    );
  };

  const myLast30DaysStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getLast30Stats().then(
      (res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          setDoughnutChatData(res.data.table);
          res.data.table.users.map((user, index) => {
            var name =
              JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name;
            if (name === user.table.name) {
              setLoggedInUserStats(user.table);
            }
          });
        }
      },
      (error) => {
        setLoading(false);
        console.log("this is error in the stats", error);
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
    // console.log("THis is selected Checkbox", selectedCheckBoxes);
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
      myMonthlyStats();
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

  const messages = [
    {
      message: "Hy there i am using Recruite Suite",
      left: true,
      underText: "6:25pm",
    },
    {
      message:
        "Hy there i am using Recruite Suite, there i am using Recruite Suite",
      left: false,
      underText: "Sent by Chris Highland at 8:25pm",
    },
    {
      message: "Hy there i am using Recruite Suite",
      left: true,
      underText: "6:25pm",
      date: "Wed Mar 17",
    },
    {
      message:
        "Hy there i am using Recruite Suite, there i am using Recruite Suite",
      left: true,
      underText: "6:25pm",
    },
    {
      message:
        "Hy there i am using Recruite Suite, there i am using Recruite Suite",
      left: false,
      underText: "Sent by Chris Highland at 8:25pm",
    },
    {
      message: "Hy there i am using Recruite Suite",
      left: true,
      underText: "6:25pm",
    },
    {
      message:
        "Hy there i am using Recruite Suite, there i am using Recruite Suite",
      left: true,
      underText: "6:25pm",
    },
  ];

  return (
    <DarkContainer contacts style={{ padding: 20, marginLeft: 60 }}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress />
      </Backdrop>
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
            // padding: 10,
            // paddingLeft: 30,
            // paddingRight: 30,
          }}
        >
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
              // border: "1px solid #f8f8f8",
              marginTop: 10,
            }}
          ></div>
          {showFiltersRow === true ? renderFilters() : <div></div>}

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
            ></Grid>

            <div
              style={{ width: "100%", minWidth: 1110 }}
              className="fullHeightMessagesOuterDiv "
              id="infinit"
            >
              <Grid container direction="row">
                <Grid item md={3} sm={3}>
                  <Grid
                    container
                    direction="row"
                    style={
                      {
                        // borderRight: "2px solid #f8f8f8",
                      }
                    }
                  >
                    <div
                      style={{ height: 50, width: "100%", paddingInline: 10 }}
                    >
                      <FormatAlignLeftIcon
                        onClick={(e) => {
                          setshowSideFilters(!showSideFilters);
                        }}
                        style={{
                          cursor: "pointer",
                          fontSize: 25,
                          color: "gray",
                        }}
                      ></FormatAlignLeftIcon>
                    </div>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ height: 60, background: "#f2f2f2" }}
                    >
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          fontWeight: 600,
                          marginLeft: 20,
                          textTransform: "uppercase",
                        }}
                      >
                        Notes
                      </p>
                    </Grid>

                    <Accordion
                      defaultActiveKey="0"
                      style={{ width: "100%", marginTop: 5 }}
                    >
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              General{" "}
                              <span className={classes.accordionGray}>
                                3/6 complete
                              </span>
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <p className={classes.label}>First Name</p>
                            <input className={classes.input}></input>
                            <p className={classes.label}>Last Name</p>{" "}
                            <input className={classes.input}></input>
                            <p className={classes.label}>Nick Name</p>{" "}
                            <input className={classes.input}></input>
                            <p className={classes.label}>Phone</p>{" "}
                            <input className={classes.input}></input>
                            <p className={classes.label}>Email</p>{" "}
                            <input className={classes.input}></input>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              Details{" "}
                              <span className={classes.accordionGray}>
                                3/6 complete
                              </span>
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>

                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              Coaches{" "}
                              <span className={classes.accordionGray}>
                                3/6 complete
                              </span>
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              Family Relationships{" "}
                              {/* <span className={classes.accordionGray}>
                                3/6 complete
                              </span> */}
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              Opponents{" "}
                              <span className={classes.accordionGray}>
                                3/6 complete
                              </span>
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>
                              External Profiles{" "}
                              <span className={classes.accordionGray}>
                                3/6 complete
                              </span>
                            </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="7">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>Tags </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="7">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="8">
                          <Grid container direction="row" alignItems="center">
                            <p className={classes.accordionP}>Actions </p>{" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: 15, marginLeft: 20 }}
                            ></ArrowForwardIosIcon>
                          </Grid>
                        </Accordion.Toggle>
                      </Card>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid item md={6} sm={6}>
                  <Grid
                    container
                    direction="row"
                    style={{
                      borderRight: "2px solid #f8f8f8",
                      borderLeft: "2px solid #f8f8f8",
                    }}
                  >
                    <div
                      style={{
                        borderBottom: "2px solid #f8f8f8",
                        width: "100%",
                        height: 50,
                      }}
                    >
                      <div class="dropdownUserProfile">
                        <IconTextField
                          width={320}
                          text={
                            <Grid container direction="row" alignItems="center">
                              <img
                                src={AvatarImg}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 25,
                                  marginRight: 5,
                                }}
                              ></img>
                              <p style={{ color: "black", margin: 0 }}>
                                Charlse Rice
                                <span style={{ color: "gray", marginLeft: 10 }}>
                                  @CharlseRice
                                </span>
                              </p>
                            </Grid>
                          }
                          icon={
                            <ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>
                          }
                        ></IconTextField>
                        <div class="dropdown-user-profile">
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
                                    style={{
                                      color: "#dadada",
                                      marginRight: 10,
                                    }}
                                  ></i>
                                  <p style={{ margin: 0 }}>{item.name}</p>
                                </Grid>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        maxHeight: 440,
                        // background: "red",
                        paddingInline: 10,
                        marginTop: 8,
                        borderBottom: "2px solid #f8f8f8",
                      }}
                      className="fullHeightMessages hideScrollBar"
                      id="infinit"
                    >
                      {messages.map((item) => {
                        return (
                          <Grid
                            container
                            direction="row"
                            justify={item.left ? "flex-start" : "flex-end"}
                          >
                            <p
                              className={
                                item.left
                                  ? classes.messagBox
                                  : classes.messagBoxBlue
                              }
                            >
                              {item.message}
                            </p>
                            <p
                              style={{
                                width: "90%",
                                textAlign: item.left ? "left" : "right",
                                fontSize: 10,
                                color: "#9ca4ab",
                              }}
                            >
                              {item.underText}
                            </p>
                            {item.date && (
                              <p
                                style={{
                                  width: "95%",
                                  textAlign: "center",
                                  fontSize: 13,
                                  color: "#9ca4ab",
                                }}
                              >
                                {item.date}
                              </p>
                            )}
                          </Grid>
                        );
                      })}
                    </div>
                    <Grid
                      container
                      direction="row"
                      style={{ borderRadius: 5, marginTop: 10 }}
                      alignItems="center"
                    >
                      <Grid
                        item
                        md={11}
                        sm={11}
                        lg={11}
                        xl={11}
                        sm={11}
                        xs={10}
                      >
                        <Grid style={{ background: "white", borderRadius: 5 }}>
                          {/* {image && (
                <img
                  style={{ width: 100, height: 100 }}
                  src={URL.createObjectURL(image)}
                ></img>
              )} */}

                          <InputEmoji
                            style={{
                              width: "90%",
                              borderRadius: 5,
                              marginTop: 5,
                            }}
                            cleanOnEnter
                            placeholder="Type message to send"
                            // onEnter={handleOnEnter}
                            borderColor={"white"}
                          ></InputEmoji>
                        </Grid>
                      </Grid>
                      <Grid item md={1} sm={1} lg={1} xl={1} sm={1} xs={1}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          style={{ height: 40 }}
                        >
                          <CameraAltIcon
                            onClick={() => {
                              // upload.click();
                            }}
                            style={{ fontSize: 30 }}
                          ></CameraAltIcon>{" "}
                        </Grid>
                      </Grid>
                      {/* <input
                        type="file"
                        // accept="video/mp4,video/x-m4v,video/*"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={(ref) => {
                          upload = ref;
                        }}
                        // // multiple
                        onChange={handleFile}
                        name="myfile"
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={3} sm={3}>
                  <Grid container direction="row" style={{}}>
                    <Grid
                      container
                      direction="row"
                      style={{
                        borderBottom: "2px solid #f8f8f8",
                        width: "100%",
                        height: 50,
                      }}
                    >
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          marginLeft: 10,
                          fontWeight: 600,
                          width: "75%",
                        }}
                      >
                        Message Stats
                      </p>
                      <Autorenew></Autorenew>
                    </Grid>
                    {loggedInUserStats != null ? (
                      <DoughnutChart data={loggedInUserStats} />
                    ) : (
                      <Grid container direction="row" justify="center">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </Grid>
                    )}
                    <Grid container direction="row" justify="center">
                      <div style={{ width: "80%", marginTop: 20 }}>
                        <Grid container direction="row">
                          <Grid item md={4} xs={4}>
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                            >
                              <ComputerIcon></ComputerIcon>
                              <p className={classes.sideText}>DM’s</p>
                              <p
                                style={{
                                  color: "#1070ca",
                                  fontSize: 28,
                                  fontWeight: 700,
                                }}
                              >
                                {loggedInUserStats ? loggedInUserStats.dms : 0}
                              </p>
                            </Grid>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                            >
                              <PhoneAndroidIcon></PhoneAndroidIcon>
                              <p className={classes.sideText}>Personal Text</p>
                              <p
                                style={{
                                  color: "#ec4c47",
                                  fontSize: 28,
                                  fontWeight: 700,
                                }}
                              >
                                {loggedInUserStats ? loggedInUserStats.pts : 0}
                              </p>
                            </Grid>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <Grid
                              container
                              direction="column"
                              alignItems="center"
                            >
                              <PhoneAndroidIcon></PhoneAndroidIcon>
                              <p className={classes.sideText}>RS Text</p>
                              <p
                                style={{
                                  color: "#f7d154",
                                  fontSize: 28,
                                  fontWeight: 700,
                                }}
                              >
                                {loggedInUserStats ? loggedInUserStats.rst : 0}
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                      <Grid container direction="row" alignItems="center">
                        <Grid md={6} xs={6}>
                          <div className="contactProfileDropDown">
                            <DropdownButton
                              drop={"right"}
                              id="dropdown-basic-button"
                              title={currency}
                            >
                              {currencies.map((option) => (
                                <Dropdown.Item
                                  style={{
                                    background:
                                      currency === option.label
                                        ? "#348ef7"
                                        : "white",
                                    color:
                                      currency === option.label
                                        ? "white"
                                        : "black",
                                  }}
                                  onClick={(e) => {
                                    if (option.label === "This Quarter") {
                                      myQuarterlyStats();
                                    } else if (option.label === "This Year") {
                                      myYearlyStats();
                                    } else if (
                                      option.label === "Last Quarter"
                                    ) {
                                      myLastQuarterStats();
                                    } else if (option.label === "Last Year") {
                                      myLastYearStats();
                                    } else if (option.label === "Last Month") {
                                      myLastMonthStats();
                                    } else if (
                                      option.label === "Last 30 Days"
                                    ) {
                                      myLast30DaysStats();
                                    } else {
                                      myMonthlyStats();
                                    }
                                    setCurrency(option.label);
                                  }}
                                >
                                  {" "}
                                  {option.label}
                                </Dropdown.Item>
                              ))}
                            </DropdownButton>
                          </div>
                        </Grid>
                        <Grid md={6} xs={6}>
                          <p style={{ fontSize: 11 }}>
                            Last Communication : 3 hrs ago
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      style={{
                        borderBottom: "2px solid #f8f8f8",
                        borderTop: "2px solid #f8f8f8",
                        width: "100%",
                        height: 50,
                      }}
                      alignItems="center"
                    >
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          marginLeft: 10,
                          fontWeight: 600,
                          width: "75%",
                        }}
                      >
                        Sent Media
                      </p>
                      <Autorenew></Autorenew>
                    </Grid>
                    <Grid
                      container
                      style={{
                        width: "100%",
                        height: 120,
                        padding: 8,
                      }}
                      alignItems="center"
                    >
                      <Grid item md={5} xs={5}>
                        <img
                          src={MyMedia}
                          style={{
                            width: "100%",
                            marginRight: 5,
                            width: "100%",
                            height: 100,
                            borderRadius: 4,
                          }}
                        ></img>
                      </Grid>
                      <Grid item md={2} xs={2}></Grid>
                      <Grid item md={5} xs={5}>
                        <img
                          src={MyMedia}
                          style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 4,
                          }}
                        ></img>
                      </Grid>
                    </Grid>
                    <p
                      style={{
                        color: "#3871DA",
                        fontWeight: 600,
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      View More
                    </p>
                    <Grid
                      container
                      style={{
                        borderBottom: "2px solid #f8f8f8",
                        borderTop: "2px solid #f8f8f8",
                        marginTop: 20,
                        width: "100%",
                        height: 50,
                      }}
                      alignItems="center"
                    >
                      <p
                        style={{
                          color: "black",
                          margin: 0,
                          marginLeft: 10,
                          fontWeight: 600,
                          width: "75%",
                        }}
                      >
                        Associated Media
                      </p>
                      <Autorenew></Autorenew>
                    </Grid>
                    <Grid
                      container
                      style={{
                        width: "100%",
                        height: 120,
                        padding: 8,
                      }}
                      alignItems="center"
                    >
                      <Grid item md={5} xs={5}>
                        <img
                          src={MyMedia}
                          style={{
                            width: "100%",
                            marginRight: 5,
                            width: "100%",
                            height: 100,
                            borderRadius: 4,
                          }}
                        ></img>
                      </Grid>
                      <Grid item md={2} xs={2}></Grid>
                      <Grid item md={5} xs={5}>
                        <img
                          src={MyMedia}
                          style={{
                            width: "100%",
                            height: 100,
                            borderRadius: 4,
                          }}
                        ></img>
                      </Grid>
                    </Grid>
                    <p
                      style={{
                        color: "#3871DA",
                        fontWeight: 600,
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      View More
                    </p>
                  </Grid>
                </Grid>
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
    </DarkContainer>
  );
}

export default Home;
