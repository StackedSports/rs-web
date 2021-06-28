import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  Grid,
  Checkbox,
  Snackbar,
  CircularProgress,
  Badge,
} from "@material-ui/core";
import AvatarImg from "../../images/avatar.png";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ArrowDropDown, Check, Search, Send, Info } from "@material-ui/icons";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";
import InputEmoji from "react-input-emoji";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  FaPhone,
  FaTwitter,
  FaComment,
  FaPlus,
  FaCalendar,
  FaCalendarAlt,
  FaMagic,
  FaFilePdf,
  FaVideo,
  FaImage,
  FaSlidersH,
  FaBars,
  FaTh,
} from "react-icons/fa";
import DialogBox from "../common/Dialogs";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";

import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import TimePicker from "../DateTimePicker/index";
import MediaComponnet from "../Media/MediaComponent";
import {
  getAllContacts,
  getBoardFilters,
  getMedia,
  getTeamContacts,
  getPlaceholder,
} from "../../ApiHelper";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MessageCreate() {
  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [displayCreateMessage, setDisplayCreateMessage] = useState(false);
  const [displaySnippets, setDisplaySnippets] = useState(false);
  const [displayEmojiSelect, setDisplayEmojiSelect] = useState(false);
  const [displayTextPlaceholders, setDisplayTextPlaceholders] = useState(false);
  const [addMedia, setAddMedia] = useState(false);
  const [displayMessageSenders, setDisplayMessageSenders] = useState(false);
  const [displayMessageReceivers, setDisplayMessageReceivers] = useState(false);
  const [displaySendTo, setDisplaySendTo] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(true);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(new Date());
  const [fetching, setFetching] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [messageSender, setMessageSender] = useState(null);
  const [messageDetails, setMessageDetails] = useState(null);
  const [messagePreview, setMessagePreview] = useState(null);
  const [messageStatus, setMessageStatus] = useState("Drafts");
  const [messageCreated, setMessageCreated] = useState(false);

  const [messageReceiver, setMessageReceiver] = useState([]);

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
  const [placeholders, setPlaceHolders] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [media, setMedia] = useState(null);
  const [copyContacts, setCopyContacts] = useState(null);
  const [allColumns, setAllColumns] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);
  const [allGradYears, setAllGraderYears] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [allRanks, setAllRanks] = useState(null);
  const [allBoards, setAllBoards] = useState(null);
  const [positions, setAllPositions] = useState(null);
  const [teamContacts, setTeamContacts] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [page, setPage] = useState(1);

  const [openSnakBar, setOpenSnackBar] = React.useState(false);

  const makeMessageSelected = (index) => {
    var alreadySelected = false;
    selectedMessages.map((item) => {
      if (index.id === item.id) {
        alreadySelected = true;
      }
    });
    if (alreadySelected) {
      var temp = [];
      selectedMessages.map((item) => {
        if (index.id != item.id) {
          temp.push(item);
        }
      });
      setSelectedMessages(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedMedia;
      temp.push(index);
      setSelectedMessages(temp);
      setuseLessState(uselessState + 1);
    }
  };

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

  const makeCheckBoxSelected = (index) => {
    if (selectedCheckBoxes.indexOf(index) > -1) {
      var temp = [];
      selectedCheckBoxes.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      // console.log("This is temp", temp);
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

  const placeholderContainer = (m) => {
    // console.log("THis is media placeholderContainer ", m);
    return (
      <div
        style={{
          width: 270,
          height: 250,
          // marginLeft: 16,
          border:
            selectedCheckBoxes.indexOf(m.media_preview) > -1
              ? "3px solid #4d83e0"
              : "1px solid #d2d2d2",
          borderRadius: 4,
          // marginBottom: 10,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
        >
          <img
            style={{ width: "80%", height: 190, objectFit: "contain" }}
            src={m.media_preview}
          ></img>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 16, marginTop: 2 }}
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
              marginLeft: 16,
              fontSize: 15,
            }}
          >
            {m.name}
          </p>
          <div style={{ width: "100%" }}></div>
        </Grid>
        <Grid container direction="row" style={{ height: 30, marginLeft: 16 }}>
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
  const getMyPlaceholders = () => {
    getPlaceholder().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          // console.log("These are all placeholder", res.data);
          setPlaceHolders(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };

  const getMyTeamContacts = () => {
    getTeamContacts().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          // console.log("These are all team contacts", res.data);

          var temp = [];
          temp.push(JSON.parse(localStorage.getItem("user")));
          var alldata = [];
          var cont = res.data;
          res.data &&
            res.data.map((d) => {
              if (d.id != JSON.parse(localStorage.getItem("user")).id) {
                alldata.push(d);
              }
            });
          var temp2 = temp.concat(alldata);

          setTeamContacts(temp2);
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

  const getMyContacts = (page) => {
    // setLoading(true);
    setFetching(true);
    // console.log("This is the date", page);
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
            // console.log("These are all new contacts", temp);
            // document.getElementById("infinit").scrollTop = 0;
            setFetching(false);
          } else {
            // console.log("These are all contacts", res.data);
            setContacts(res.data);
            setCopyContacts(res.data);
            if (document.getElementById("infinit")) {
              document.getElementById("infinit").scrollTop = 0;
            }

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

  const getMyMedia = () => {
    getMedia().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          // console.log("These are all media", res.data);
          setMedia(res.data);
        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };

  const getAllBoards = () => {
    getBoardFilters().then(
      (res) => {
        console.log("THis is all boards", res);
        var gradYears = [];
        if (res.statusText === "OK") {
          // console.log("These are all boards", res.data);
          setAllBoards(res.data);
        }
      },
      (error) => {
        console.log("this is error all grad year", error);
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
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
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

  const mediaContainer = (m) => {
    // console.log("THis is container ", m);
    return (
      <Badge
        badgeContent={
          <ClearIcon
            style={{ height: 10, width: 10, cursor: "pointer" }}
            onClick={() => {
              var alreadySelected = false;
              selectedMedia.map((item) => {
                if (m.hashid === item.hashid) {
                  alreadySelected = true;
                }
              });
              if (alreadySelected) {
                var temp = [];
                selectedMedia.map((item) => {
                  if (m.hashid != item.hashid) {
                    temp.push(item);
                  }
                });
                setSelectedMedia(temp);
                localStorage.setItem("selectedMedia", JSON.stringify(temp));
                setuseLessState(uselessState + 1);
              }
            }}
          ></ClearIcon>
        }
        color="error"
      >
        <div
          style={{
            width: 270,
            height: 250,
            marginLeft: 20,
            // border: "1px solid #d2d2d2",
            border: "1px solid #d2d2d2",
            borderRadius: 4,
            // marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Grid
            container
            direction="row"
            justify="center"
            style={{ background: "#f6f6f6" }}
            // onMouseEnter={() => {
            //   if (m.urls) {
            //     setMediaHover(m.urls.medium);
            //   }
            // }}
            // onMouseLeave={() => {
            //   setMediaHover(null);
            // }}
          >
            <img
              style={{ width: "80%", height: 190, objectFit: "contain" }}
              src={m.urls && m.urls.thumb}
            ></img>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ height: 30, marginLeft: 16, marginTop: 2 }}
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
                marginLeft: 16,
                fontSize: 15,
              }}
            >
              {m.file_name.length > 17
                ? m.file_name.substring(0, 17) + " ..."
                : m.file_name}
            </p>
            <div style={{ width: "100%" }}></div>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ height: 30, marginLeft: 16 }}
          >
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
      </Badge>
    );
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

  const MessageDetailsCard = (props) => {
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
          <Grid container direction="row" justify="center">
            {props.hideCheckBox === null && (
              <Checkbox
                color={"primary"}
                checked={
                  selectedMessages.indexOf(props.selectedPlaceholder.id) > -1
                }
                onChange={() => {
                  makeMessageSelected(props.selectedPlaceholder.id);
                }}
              ></Checkbox>
            )}
          </Grid>
        </div>
        <Grid
          container
          direction="row"
          style={{
            width: props.hideStats ? "90%" : "70%",
            padding: 16,
          }}
        >
          {placeholderContainer(props.selectedPlaceholder)}
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
                  Sent
                </span>
              )}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Send As:
              <strong className={classes.mdMargin}>SMS/MMS TEXT</strong>{" "}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Sender:
              <strong className={classes.mdMargin}>Jake Smith</strong>{" "}
              (651.999.9999)
            </p>
            <p class className={classes.messageDetailsHeading}>
              Recepient:
              <strong className={classes.mdMargin}>
                Jake Smith Ohio Group
              </strong>{" "}
              (256 participants)
            </p>
            {props.messageStatus === "Scheduled" ? (
              <p class className={classes.messageDetailsHeading}>
                Start Sending at:
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
                Start Sending at:
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
            <p class className={classes.messageDetailsHeading}>
              Message Text:
            </p>
            <p
              class
              className={classes.messageDetailsHeading}
              style={{ color: "black", fontWeight: 500 }}
            >
              Hy first_name - Register online now to reserve your sport in
              paradise http://www.manydiazfootballcampuse.manucampus.com
            </p>
          </div>
          <p class className={classes.messageDetailsHeading}>
            Queued by Ben Graves on 20 march 2021 at 2:21 pm
          </p>
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
                height: "15%",
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
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                height: "60%",
                borderBottom: "1px solid #d2d2d2",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  margin: 0,
                  width: "100%",
                  textAlign: "center",
                }}
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
                Delivery Rate (286/300)
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  margin: 0,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                95%
              </p>
              <p
                style={{
                  fontSize: 12,
                  margin: 0,
                }}
              >
                Response Rate (286/300)
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  margin: 0,
                  width: "100%",
                  textAlign: "center",
                }}
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
                Opt out Rate (286/300)
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                height: "25%",
                // borderBottom: "1px solid #d2d2d2",
              }}
            >
              <IconTextField
                text="Delivery Details"
                width={180}
                onClick={() => {}}
                icon={
                  <Search style={{ color: "#0091ff", marginRight: 8 }}></Search>
                }
              ></IconTextField>
            </Grid>
          </div>
        )}
      </Grid>
    );
  };

  const MessageDetails = () => {
    return (
      <div
        style={{
          width: showSideFilters === true ? "85%" : "100%",
          height: "100%",
          background: "white",
          borderRadius: 5,
          padding: 16,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {" "}
        <Grid container direction="row">
          <Grid item md={4} sm={4}>
            <FormatAlignLeftIcon
              onClick={(e) => {
                setshowSideFilters(!showSideFilters);
              }}
              style={{ cursor: "pointer", fontSize: 18 }}
            ></FormatAlignLeftIcon>

            <span
              style={{
                padding: 16,
                fontWeight: "bold",
                // marginLeft: 20,
                fontSize: 20,
              }}
            >
              Messages
            </span>
          </Grid>
          <Grid item md={8} sm={8}>
            <Grid container direction="row" justify="flex-end">
              <IconTextField
                // width={180}
                width={100}
                text="Action"
                textColor="gray"
                icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
              ></IconTextField>
              <IconTextField
                text="Filter"
                textColor={selectedMessages.length === 0 ? "black" : "white"}
                background={
                  selectedMessages.length === 0 ? "transparent" : "#3871DA"
                }
                width={120}
                onClick={() => {
                  setShowFiltersRow(!showFiltersRow);
                }}
                icon={
                  <FaSlidersH
                    style={{
                      color:
                        selectedMessages.length === 0 ? "#3871DA" : "white",
                    }}
                  ></FaSlidersH>
                }
              ></IconTextField>
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
          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}
            className="fullHeightCreateMessageDetails"
          >
            {placeholders &&
              placeholders.map((selectedPlaceholder) => {
                return (
                  <MessageDetailsCard
                    hideCheckBox={null}
                    hideStats={null}
                    selectedPlaceholder={selectedPlaceholder}
                  ></MessageDetailsCard>
                );
              })}
          </div>
        </Grid>
      </div>
    );
  };

  const MessagePreview = () => {
    return (
      <div
        style={{
          width: showSideFilters === true ? "85%" : "100%",
          height: "100%",
          background: "white",
          borderRadius: 5,
          padding: 16,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {" "}
        <Grid container direction="row">
          <Grid item md={4} sm={4}>
            <FormatAlignLeftIcon
              onClick={(e) => {
                setshowSideFilters(!showSideFilters);
              }}
              style={{ cursor: "pointer", fontSize: 18 }}
            ></FormatAlignLeftIcon>

            <span
              style={{
                padding: 16,
                fontWeight: "bold",
                // marginLeft: 20,
                fontSize: 20,
              }}
            >
              Message Preview
            </span>
          </Grid>
          <Grid item md={8} sm={8}>
            <Grid container direction="row" justify="flex-end">
              <IconTextField
                // width={180}
                width={100}
                text="Action"
                textColor="gray"
                icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
              ></IconTextField>
              <IconButton
                text="Schedule"
                textColor="white"
                width={130}
                onClick={() => {
                  setMessageStatus("Scheduled");
                  setMessageCreated(true);
                }}
                icon={<FaCalendar style={{ color: "white" }}></FaCalendar>}
              ></IconButton>
              {/* <IconTextField
                text="Filter"
                textColor={selectedMessages.length === 0 ? "black" : "white"}
                background={
                  selectedMessages.length === 0 ? "transparent" : "#3871DA"
                }
                width={120}
                onClick={() => {
                  setShowFiltersRow(!showFiltersRow);
                }}
                icon={
                  <FaSlidersH
                    style={{
                      color:
                        selectedMessages.length === 0 ? "#3871DA" : "white",
                    }}
                  ></FaSlidersH>
                }
              ></IconTextField> */}
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
          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}
            className="fullHeightCreateMessageSide"
          >
            {placeholders && (
              <MessageDetailsCard
                hideCheckBox
                hideStats
                selectedPlaceholder={placeholders[0]}
                messageStatus={messageStatus}
              ></MessageDetailsCard>
            )}
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
                <Checkbox color="primary"></Checkbox>
              </Grid>
              <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Full Name</span>
              </Grid>
              <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>Board/List</span>
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
                <span className={classes.tableHeading}>First Name</span>
              </Grid>
              <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Delivered at</span>
              </Grid>
              <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Message Status</span>
              </Grid>
            </Grid>

            {[1, 2, 3, 4, 5, 6].map((item, index) => {
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
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <span className={classes.tableFields}>David Buttler</span>
                  </Grid>
                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>Midwest List</span>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <span
                      className={classes.tableFields}
                      style={{ marginLeft: 40 }}
                    >
                      {formatPhoneNumber(5555555555)}
                    </span>
                  </Grid>

                  <Grid item md={1} xs={1}>
                    <span className={classes.tableFields}>David</span>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <span className={classes.tableFields}>-</span>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    {messageStatus === "Drafts" ? (
                      <span className={classes.tableFields}>
                        <Info style={{ color: "#f0ad24", fontSize: 16 }}></Info>{" "}
                        Drafts{" "}
                      </span>
                    ) : (
                      <span className={classes.tableFields}>
                        <FaCalendar
                          style={{ color: "#0292ff", fontSize: 16 }}
                        ></FaCalendar>{" "}
                        Scheduled{" "}
                      </span>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </div>
        </Grid>
      </div>
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
        // console.log("This is temp", temp);
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

  const addDataToReceivers = (value, type) => {
    if (messageReceiver.includes(value)) {
      var temp = [];
      messageReceiver.map((item) => {
        if (value != item) {
          temp.push(item);
        }
      });
      setMessageReceiver(temp);
      console.log("This is temp", temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = messageReceiver;
      temp.push(value);
      setMessageReceiver(temp);
      console.log("This is temp", temp);
      setuseLessState(uselessState + 1);
    }
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
      if (localStorage.getItem("selectedMedia")) {
        console.log("THis is greate", localStorage.getItem("selectedMedia"));
        setSelectedMedia(JSON.parse(localStorage.getItem("selectedMedia")));
      }
      getMyPlaceholders();
      getMyContacts();
      getMyMedia();
      getMyTeamContacts();
      // getAllGradeYears();
      // getAllRanks();
      // getAllStatuses();
      // getAllTags();
      getAllBoards();
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

  // console.log("THis is great message type", messageType);

  const renderMessageReceiver = (messageType) => {
    return messageType.map((item) => {
      return (
        <div
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.tags}
          style={{ paddingLeft: 0, marginBottom: 6, marginLeft: 16 }}
        >
          <Grid
            style={{ height: 40 }}
            container
            direction="row"
            alignItems="center"
          >
            {messageType.icon}
            <p style={{ margin: 0, marginLeft: 16, marginRight: 5 }}>{item}</p>
            <ClearIcon
              onClick={() => {
                addDataToReceivers(item);
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
    });
  };

  const renderMessageSenderTag = (sender) => {
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
          <img
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              marginLeft: 16,
            }}
            src={sender.twitter_profile && sender.twitter_profile.profile_image}
          ></img>
          <p style={{ margin: 0, marginLeft: 5, marginRight: 16 }}>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                marginLeft: 16,
              }}
            >
              {sender.twitter_profile && sender.twitter_profile.screen_name}
            </p>
          </p>
          <ClearIcon
            onClick={() => {
              setMessageSender(null);
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
    <DarkContainer contacts style={{ padding: 16, marginLeft: 60 }}>
      <TimePicker
        open={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onTimeChange={(time) => {
          setTime(time);
        }}
        onDateChange={(time) => {
          setDate(time);
        }}
      ></TimePicker>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={messageCreated}
        autoHideDuration={2000}
        onClose={() => {
          setMessageCreated(false);
        }}
      >
        <Alert
          onClose={() => {
            setMessageCreated(false);
          }}
          severity="success"
        >
          Message Created Sucessfully !
        </Alert>
      </Snackbar>

      <Grid container direction="row">
        {showSideFilters === true && (
          <div style={{ width: "15%" }}>
            <p
              style={{
                // padding: 5,
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
              <div>
                {["Ben Graves"].map((item) => {
                  return (
                    <p
                      className={classes.sideSubFilter}
                      onClick={() => {
                        addDataToFilter(item, "Board");
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </p>
            <p
              className={classes.sideFilter}
              onClick={() => {
                // setshowBoardFilters(!showBoardFilters);
                setMessageDetails(!messageDetails);
              }}
            >
              Messages
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            {showBoardFilters === true && (
              <div>
                {["Scheduled", "In Progress", "Finished", "Archived"].map(
                  (item) => {
                    return (
                      <p
                        className={classes.sideSubFilter}
                        onClick={() => {
                          addDataToFilter(item, "Board");
                        }}
                      >
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}
        {addMedia ? (
          // <div></div>
          // renderAddMedia()
          <MediaComponnet
            showSideFilters={true}
            // setshowSideFilters={setshowSideFilters}
            setAddMedia={setAddMedia}
            filter={filter}
            addDataToFilter={addDataToFilter}
            message
            makeMediaSelected={makeMediaSelected}
          ></MediaComponnet>
        ) : messageDetails ? (
          <MessageDetails></MessageDetails>
        ) : messagePreview ? (
          <MessagePreview></MessagePreview>
        ) : (
          <div
            style={{
              width: showSideFilters === true ? "85%" : "100%",
              height: "100%",
              background: "white",
              borderRadius: 5,
              padding: 16,
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <Grid container direction="row">
              <Grid item md={4} sm={4}>
                <span
                  style={{
                    fontWeight: "bold",
                    // marginLeft: 20,
                    fontSize: 20,
                  }}
                >
                  Create Message
                </span>
              </Grid>
              <Grid item md={8} sm={8}>
                <Grid container direction="row" justify="flex-end">
                  <IconTextField
                    width={100}
                    text="More"
                    textColor="#3871DA"
                    icon={
                      <ArrowDropDown
                        style={{ color: "#3871DA" }}
                      ></ArrowDropDown>
                    }
                  ></IconTextField>
                  <IconTextField
                    text="Save and Close"
                    textColor="#3871DA"
                    width={180}
                    onClick={() => {
                      // setShowFiltersRow(!showFiltersRow);
                    }}
                    icon={<Check style={{ color: "#3871DA" }}></Check>}
                  ></IconTextField>
                  <IconButton
                    text="Preview and Send"
                    textColor="white"
                    width={200}
                    onClick={() => {
                      setMessagePreview(true);
                    }}
                    icon={<Send style={{ color: "white" }}></Send>}
                  ></IconButton>
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
                marginTop: 16,
              }}
            ></div>
            {showFiltersRow === true ? renderFilters() : <div></div>}
            <Grid container direction="row" alignItems="center"></Grid>
            <div style={{ width: "100%", overflowX: "hide", marginTop: 16 }}>
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
                                      addDataToReceivers(boards.name);
                                      // setMessageReceiver();
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
                      // alignItems="center"
                      style={{
                        // background: "#f5f6f9",
                        width: "100%",
                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        height: 70,
                        paddingTop: 16,
                      }}
                      onMouseEnter={() => {
                        setDisplayCreateMessage(false);
                        setDisplayMessageSenders(false);
                      }}
                    >
                      {/* <Grid
                        item
                        md={displaySendTo ? 2 : 1}
                        xs={displaySendTo ? 2 : 1}
                      > */}
                      <p
                        style={{
                          margin: 0,
                          marginLeft: 16,
                          marginRight: 16,
                          width: 90,
                        }}
                      >
                        Send As:
                      </p>
                      {/* </Grid> */}
                      {/* <Grid
                        item
                        md={displaySendTo ? 10 : 11}
                        xs={displaySendTo ? 10 : 11}
                      > */}
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
                                padding: 16,
                                background: "#3871da",
                                color: "white",
                                fontWeight: 600,
                                marginBottom: -4,
                              }}
                            >
                              Set Message Type
                            </p>
                            {[
                              {
                                title: "Twitter DM",
                                icon: (
                                  <FaTwitter
                                    className={classes.messageTypeIcon}
                                  ></FaTwitter>
                                ),
                              },
                              {
                                title: "Personal Text",
                                icon: (
                                  <FaPhone
                                    className={classes.messageTypeIcon}
                                  ></FaPhone>
                                ),
                              },
                              {
                                title: "RS Text",
                                icon: (
                                  <FaComment
                                    className={classes.messageTypeIcon}
                                  ></FaComment>
                                ),
                              },
                            ].map((type) => {
                              return (
                                <Grid
                                  container
                                  alignItems="center"
                                  className={classes.messagetypeGrid}
                                  onClick={() => {
                                    setMessageType(type);
                                  }}
                                >
                                  {type.icon}
                                  <p
                                    style={{
                                      margin: 0,
                                      fontWeight: 600,
                                      marginLeft: 16,
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
                      {/* </Grid> */}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      // alignItems="center"
                      style={{
                        // background: "#f5f6f9",
                        width: "100%",
                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        height: 70,
                        marginTop: 16,
                        paddingTop: 16,
                      }}
                    >
                      {/* <Grid
                        item
                        md={displaySendTo ? 2 : 2}
                        xs={displaySendTo ? 2 : 2}
                      > */}
                      <p
                        style={{
                          margin: 0,
                          marginLeft: 16,
                          marginRight: 16,
                          width: 90,
                        }}
                      >
                        Send From:
                      </p>
                      {/* </Grid>
                      <Grid item md={10} xs={10}> */}
                      {messageSender ? (
                        renderMessageSenderTag(messageSender)
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
                                padding: 8,
                                marginBottom: 0,
                                background: "#3871da",
                                color: "white",
                                fontWeight: 600,
                              }}
                            >
                              Send on the behalf of
                            </p>

                            <p
                              // style={{
                              //   color: "black",
                              //   padding: 16,
                              //   marginBottom: 0,
                              //   fontWeight: 600,

                              // }}
                              className={classes.sendAsP}
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
                              // style={}
                              className={classes.sendAsP}
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
                                marginLeft: 16,
                              }}
                            >
                              ** select a default send account if recruite do
                              not have a coach assigned
                            </p>
                            {
                              // [
                              //   {
                              //     title:
                              //       "You (@" +
                              //       JSON.parse(localStorage.getItem("user"))
                              //         .twitter_profile.screen_name +
                              //       ")",
                              //     icon: (
                              //       <img
                              //         style={{
                              //           width: 30,
                              //           height: 30,
                              //           borderRadius: 20,
                              //           marginLeft: 16,
                              //         }}
                              //         src={
                              //           JSON.parse(localStorage.getItem("user"))
                              //             .twitter_profile.profile_image
                              //         }
                              //       ></img>
                              //     ),
                              //   },
                              // ]
                              teamContacts &&
                                teamContacts.map((type) => {
                                  return (
                                    <Grid
                                      container
                                      alignItems="center"
                                      // style={{
                                      //   height: 50,
                                      //   marginLeft: 0,
                                      //   marginTop: -12,
                                      //   cursor: "pointer",
                                      // }}
                                      className={classes.sendAsP}
                                      onClick={() => {
                                        setMessageSender(type);
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: 20,
                                          marginLeft: 16,
                                        }}
                                        src={
                                          type.twitter_profile &&
                                          type.twitter_profile.profile_image
                                        }
                                      ></img>
                                      {JSON.parse(localStorage.getItem("user"))
                                        .id === type.id ? (
                                        <p
                                          style={{
                                            margin: 0,
                                            fontWeight: 600,
                                            marginLeft: 8,
                                          }}
                                        >
                                          {type.twitter_profile &&
                                            "You @" +
                                              type.twitter_profile.screen_name +
                                              ""}
                                        </p>
                                      ) : (
                                        <p
                                          style={{
                                            margin: 0,
                                            fontWeight: 600,
                                            marginLeft: 16,
                                          }}
                                        >
                                          {type.twitter_profile &&
                                            " @" +
                                              type.twitter_profile.screen_name +
                                              " "}
                                        </p>
                                      )}
                                    </Grid>
                                  );
                                })
                            }
                          </div>
                        </div>
                      )}
                      {/* </Grid> */}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      // alignItems="center"
                      style={{
                        // background: "#f5f6f9",
                        width: "100%",
                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        minHeight: 70,
                        marginTop: 16,
                        padding: 16,
                        paddingLeft: 0,
                      }}
                      onMouseEnter={() => {
                        setDisplayCreateMessage(false);
                        setDisplayMessageSenders(false);
                      }}
                    >
                      {/* <Grid item md={1} xs={1}> */}
                      <p
                        style={{
                          margin: 0,
                          marginLeft: 16,
                          marginRight: 16,
                          width: 90,
                        }}
                      >
                        Send To:
                      </p>
                      {/* </Grid> */}
                      {/* <Grid item md={11} xs={11}> */}
                      {messageReceiver.length > 0 ? (
                        <Grid
                          container
                          direction="row"
                          style={{ width: "80%" }}
                        >
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
                                  Add Contacts
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
                          {renderMessageReceiver(messageReceiver)}
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
                                Add Contacts
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
                      {/* </Grid> */}
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      // alignItems="center"
                      style={{
                        // background: "#f5f6f9",
                        width: "100%",
                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        height: 70,
                        marginTop: 16,
                        paddingTop: 16,
                      }}
                    >
                      {/* <Grid item md={2} xs={2}> */}
                      <p style={{ margin: 0, marginLeft: 16, width: 140 }}>
                        Begin Sending At:
                      </p>
                      {/* </Grid> */}
                      {/* <Grid item md={10} xs={10}> */}
                      <div class="dropdown">
                        <IconTextField
                          width={time ? 220 : 170}
                          background={
                            displayMessageReceivers ? "#3871da" : "white"
                          }
                          text={
                            <p
                              style={{
                                margin: 0,
                                marginLeft: time ? -20 : 0,
                                color: displayMessageReceivers
                                  ? "white"
                                  : "black",
                              }}
                            >
                              {time
                                ? moment(date).format("MM-DD-YYYY") + " " + time
                                : "ASAP"}
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
                          onClick={() => {
                            setShowTimePicker(true);
                          }}
                          onMouseEnter={() => {
                            setDisplayCreateMessage(false);
                            setDisplayMessageSenders(false);
                          }}
                        ></IconTextField>
                      </div>
                      {/* </Grid> */}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      // alignItems="center"
                      style={{
                        // background: "#f5f6f9",
                        width: "100%",
                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        minHeight: 170,
                        marginTop: 16,
                        paddingTop: 16,
                        paddingBottom: 16,
                      }}
                    >
                      <Grid item md={2} xs={2}>
                        <p style={{ margin: 0, marginLeft: 16 }}>Add Media:</p>
                      </Grid>

                      {selectedMedia.length > 0 ? (
                        selectedMedia.map((m) => {
                          return mediaContainer(m);
                        })
                      ) : (
                        <Grid item md={10} xs={10}>
                          <div class="dropdown">
                            <Grid
                              container
                              direction="row"
                              style={{
                                border: "1px solid #d8d8d8",
                                height: 150,
                                width: 150,
                                cursor: "pointer",
                                borderRadius: 4,
                              }}
                              onClick={() => {
                                setAddMedia(true);
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
                          </div>{" "}
                        </Grid>
                      )}
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
                        marginTop: 16,
                        paddingTop: 16,
                      }}
                      onMouseEnter={() => {
                        setDisplaySnippets(false);
                        setDisplayTextPlaceholders(false);
                      }}
                    >
                      {/* <Grid item md={2} xs={2}> */}
                      <p style={{ margin: 0, marginLeft: 16, width: 100 }}>
                        Message Text:
                      </p>
                      {/* </Grid> */}
                      <Grid item md={12} xs={12}>
                        <div class="dropdown">
                          <textarea
                            type="text"
                            id={"textArea"}
                            style={{
                              border: "none",
                              height: 120,
                              width: "100%",
                              borderRadius: 4,
                              paddingLeft: 16,
                              resize: "none",
                            }}
                            value={messageText}
                            onChange={(e) => {
                              setMessageText(e.target.value);
                            }}
                            placeholder="Type message"
                          ></textarea>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <div class="dropdown" style={{ marginLeft: 0 }}>
                        <IconTextField
                          width={170}
                          marginTop={16}
                          marginLeft={1}
                          background={
                            displayTextPlaceholders ? "#3871da" : "white"
                          }
                          text={
                            <p
                              style={{
                                margin: 0,
                                color: displayTextPlaceholders
                                  ? "white"
                                  : "black",
                              }}
                            >
                              Text Placeholder
                            </p>
                          }
                          icon={
                            <ExpandLessOutlinedIcon
                              style={{
                                color: displayTextPlaceholders
                                  ? "white"
                                  : "#3871da",
                              }}
                            ></ExpandLessOutlinedIcon>
                          }
                          onMouseEnter={() => {
                            setDisplayTextPlaceholders(true);
                            setDisplaySnippets(false);
                            setDisplayMessageSenders(false);
                            setDisplayEmojiSelect(false);
                          }}
                        ></IconTextField>
                        <div
                          // class="dropdown-content"
                          className={classes.dropdownHidden}
                          style={{
                            marginLeft: 180,
                            marginTop: -200,
                            maxHeight: 200,
                            display: displayTextPlaceholders ? "block" : "none",
                          }}
                          onMouseLeave={() => {
                            setDisplayTextPlaceholders(false);
                          }}
                        >
                          <p
                            style={{
                              color: "black",
                              padding: 16,
                              background: "#3871da",
                              color: "white",
                              fontWeight: 600,
                              marginBottom: -4,
                            }}
                          >
                            Text Placeholders
                          </p>
                          <p
                            style={{
                              color: "black",
                              padding: 16,
                              // background: "#3871da",
                              // color: "white",
                              fontWeight: "bold",
                              marginBottom: -4,
                            }}
                          >
                            Contact Details
                          </p>
                          {[
                            {
                              title: "[Fist_Name]",
                            },
                            {
                              title: "[Last_Name]",
                            },
                            {
                              title: "[Nick_Name]",
                            },
                            {
                              title: "[State]",
                            },
                            {
                              title: "[HighSchool]",
                            },
                          ].map((type) => {
                            return (
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={(e) => {
                                  var newVal = "";
                                  for (var i = 0; i < messageText.length; i++) {
                                    newVal = newVal + messageText[i];
                                    if (
                                      i ===
                                      document.getElementById("textArea")
                                        .selectionStart
                                    ) {
                                      newVal = newVal + type.title;
                                    }
                                  }
                                  setMessageText(newVal);
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    marginLeft: 16,
                                  }}
                                >
                                  {type.title}
                                </p>
                              </Grid>
                            );
                          })}
                          <p
                            style={{
                              color: "black",
                              padding: 16,
                              // background: "#3871da",
                              // color: "white",
                              fontWeight: "bold",
                              marginBottom: -4,
                            }}
                          >
                            Contact Relationships
                          </p>
                          {[
                            {
                              title: "[Mother_Name]",
                            },
                            {
                              title: "[Father_Name]",
                            },
                          ].map((type) => {
                            return (
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={(e) => {
                                  var newVal = "";
                                  for (var i = 0; i < messageText.length; i++) {
                                    newVal = newVal + messageText[i];
                                    if (
                                      i ===
                                      document.getElementById("textArea")
                                        .selectionStart
                                    ) {
                                      newVal = newVal + type.title;
                                    }
                                  }
                                  setMessageText(newVal);
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 500,
                                    marginLeft: 16,
                                  }}
                                >
                                  {type.title}
                                </p>
                              </Grid>
                            );
                          })}
                        </div>
                      </div>

                      <div class="dropdown" style={{ marginLeft: 20 }}>
                        <IconTextField
                          width={170}
                          marginTop={16}
                          marginLeft={1}
                          background={displaySnippets ? "#3871da" : "white"}
                          text={
                            <p
                              style={{
                                margin: 0,
                                color: displaySnippets ? "white" : "black",
                              }}
                            >
                              Snippets
                            </p>
                          }
                          icon={
                            <ExpandLessOutlinedIcon
                              style={{
                                color: displaySnippets ? "white" : "#3871da",
                              }}
                            ></ExpandLessOutlinedIcon>
                          }
                          onMouseEnter={() => {
                            setDisplaySnippets(true);
                            setDisplayMessageSenders(false);
                            setDisplayEmojiSelect(false);
                          }}
                        ></IconTextField>
                        <div
                          // class="dropdown-content"
                          className={classes.dropdownHidden}
                          style={{
                            marginLeft: 180,
                            marginTop: -200,
                            display: displaySnippets ? "block" : "none",
                          }}
                          onMouseLeave={() => {
                            setDisplaySnippets(false);
                          }}
                        >
                          <p
                            style={{
                              color: "black",
                              padding: 16,
                              background: "#3871da",
                              color: "white",
                              fontWeight: 600,
                              marginBottom: -4,
                            }}
                          >
                            Snippets
                          </p>
                          {[
                            {
                              title: "#StackedSports",
                            },
                            {
                              title: "- Ben Graves",
                            },
                            {
                              title: "#Beleive22",
                            },
                          ].map((type) => {
                            return (
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={(e) => {
                                  var newVal = "";
                                  for (var i = 0; i < messageText.length; i++) {
                                    newVal = newVal + messageText[i];
                                    if (
                                      i ===
                                      document.getElementById("textArea")
                                        .selectionStart
                                    ) {
                                      newVal = newVal + type.title;
                                    }
                                  }
                                  setMessageText(newVal);
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                  }}
                                >
                                  {type.title}
                                </p>
                              </Grid>
                            );
                          })}
                        </div>
                      </div>
                      {/* <div className="partialOveride" style={{ width: 20 }}> */}
                      {/* </div> */}
                      <div class="dropdown" style={{ marginLeft: 20 }}>
                        <div
                          onClick={() => {
                            setDisplayEmojiSelect(true);
                          }}
                          style={{
                            fontSize: 30,
                            marginLeft: 20,
                            marginTop: 16,
                            cursor: "pointer",
                          }}
                        >
                          😀
                        </div>{" "}
                        <div
                          // class="dropdown-content"
                          className={classes.dropdownHidden}
                          style={{
                            marginLeft: 50,
                            marginTop: -450,
                            display: displayEmojiSelect ? "block" : "none",
                          }}
                          onMouseLeave={() => {
                            setDisplayEmojiSelect(false);
                          }}
                        >
                          <Picker
                            set="apple"
                            // onSelect={(e) => {
                            //   console.log("This si ", e.native);
                            //   setMessageText(messageText + e.native);
                            // }}
                            onSelect={(e) => {
                              var newVal = "";
                              for (var i = 0; i < messageText.length; i++) {
                                newVal = newVal + messageText[i];
                                if (
                                  i ===
                                  document.getElementById("textArea")
                                    .selectionStart
                                ) {
                                  newVal = newVal + e.native;
                                }
                              }
                              setMessageText(newVal);
                            }}
                          />
                        </div>
                      </div>

                      {/* <div
                        onClick={() => {
                          var emojiVar = document.getElementsByClassName(
                            "react-input-emoji--button"
                          );
                          console.log("This is emoji var", emojiVar[0]);
                          emojiVar[0].click();
                        }}
                        style={{
                          fontSize: 30,
                          marginLeft: 20,
                          cursor: "pointer",
                        }}
                      >
                        😀
                      </div> */}
                    </Grid>
                    <div style={{ height: 200, width: "100%" }}></div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Grid container direction="row" alignItems="center"></Grid>
          </div>
        )}
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
                              // makeMessageSelected(item.id);
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
    marginLeft: 16,
    cursor: "pointer",
  },
  tags: {
    border: "1px solid #d8d8d8",
    height: 40,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
    overflowY: "scroll",
    overflowX: "hidden",
    zIndex: 200000000,
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
  messagetypeGrid: {
    height: 50,
    marginLeft: 0,
    // marginTop: -12,
    cursor: "pointer",
    color: "#3871da",
    "&>p": {
      color: "black",
    },
    "&:hover": {
      background: "#3871da",
      color: "white",
      "&>p": {
        color: "white",
      },
    },
  },
  sendAsP: {
    color: "black",
    padding: 8,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 600,
    "&:hover": {
      background: "#3871da",
      color: "white",
    },
  },
  messageTypeIcon: {
    marginLeft: 16,
  },
  messageDetailsHeading: {
    fontSize: 13,
    marginBottom: 4,
    color: "#676767",
  },
  mdMargin: {
    marginLeft: 16,
    color: "black",
  },
});

export default MessageCreate;
