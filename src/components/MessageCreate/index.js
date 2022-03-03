import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, Grid, Checkbox, Snackbar, Badge, Paper } from "@material-ui/core";
import AvatarImg from "../../images/avatar.png";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import SelectSearch from "react-select-search";
import PropTypes from 'prop-types'
import ArrowBackwardIosIcon from "@material-ui/icons/ArrowBackIos";
import SendIcon from '@mui/icons-material/Send';

import PhotoIcon from "@material-ui/icons/Photo";
import GifIcon from "@material-ui/icons/Gif";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { ArrowDropDown, Check, CheckCircle, Search, Send, Info, Favorite } from "@material-ui/icons";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import AmimatedBurger from '../../images/animated_burger.gif';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";

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
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";

import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import TimePicker from "../DateTimePicker/index";
import MediaComponnet from "../Media/MediaComponent";
import {
  getAllContactsWithSearch,
  getBoardFilters,
  getMedia,
  getTeamContacts,
  getPlaceholder,
  getMessage,
  createMessage,
  getMessages,
  getBoardFiltersById,
  getSnippets
} from "../../ApiHelper";
// import SearchBar from "material-ui-search-bar";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import DrawerAnimation from '../../images/drawer_animation.gif';
import BackAnimation from '../../images/back_animation.gif';
import BackIcon from '../../images/back.png';
import SearchBar from "material-ui-search-bar";


import DrawerIcon from '../../images/drawer_contact.png';


import { id } from "date-fns/locale";

function Alert(props) {

  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const today = new Date().toLocaleDateString()
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function MessageCreate(props) {
  //api
  //var userProfile;
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showModal, setShowModal] = useState(true);
  const [snippets, setSnippets] = useState([]);

  const [allMessages, setAllMessages] = useState();
  //const [allTags, setAllTags] = useState(null);
  console.log("AllMessages", allMessages)
  const getAllMessages = () => {
    getMessages().then(
      (res) => {
        // console.log("THis is all ranks", res);

        if (res.statusText === "OK") {
          console.log("These are all message", res.data);
          setAllMessages(res.data)

        }
      },
      (error) => {
        console.log("this is error all message", error);
      }
    );
  };
  const getAllSnippets = () => {
    getSnippets().then(
      (res) => {
        // console.log("THis is all ranks", res);

        if (res.statusText === "OK") {
          console.log("These are all Snippets", res.data);
        }
        setSnippets(res.data)
      },
      (error) => {
        console.log("this is error all Snippets", error);
      }
    );
  };




  useEffect(() => {
    setShowDrawer(false);
    setShowAnimation(true);
    handleAnimation();
    getAllSnippets();
    getAllMessages();
  }, []);
  const handleAnimation = () => {
    //setShowDrawer(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 500)
  }



  const classes = useStyles();
  // console.log("This is logged in user", localStorage.getItem("user"));
  const [filter, setFilter] = useState([]);
  const [isMesasgeStatusClick, setIsMesasgeStatusClick] = useState(false);
  const [messageSelected, setMessageSelected] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [addMedia, setAddMedia] = useState(false);
  const [recieve, setRecieve] = useState([])
  // const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [showMessageFiltersRow, setShowMessageFiltersRow] = useState(false);
  const [displayCreateMessage, setDisplayCreateMessage] = useState(false);
  const [displaySnippets, setDisplaySnippets] = useState(false);
  const [displayEmojiSelect, setDisplayEmojiSelect] = useState(false);
  const [displayTextPlaceholders, setDisplayTextPlaceholders] = useState(false);
  // const [addMedia, setAddMedia] = useState(false);
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
  const [messageType, setMessageType] = useState();
  const [twitterDm, settwitterDm] = useState(false);
  const [personalText, setPersonalText] = useState(false);
  const [rsText, setrsText] = useState(false);
  const handleAddMedia = (media) => setAddMedia(media)
  const [messageStatus, setMessageStatus] = useState(null)
  const [messageSender, setMessageSender] = useState(null);
  const [messageDetails, setMessageDetails] = useState(null);
  const [messagePreview, setMessagePreview] = useState(null);

  const [messageCreated, setMessageCreated] = useState(false);
  const [messageNotCreated, setMessageNotCreated] = useState(false);
  const [messageDeleted, setMessageDeleted] = useState(false)
  const [saveDraft, setSaveDraft] = useState(false)
  const [fromAreaCoach, setFromAreaCoach] = useState(false);
  const [fromPositionCoach, setFromPositinCoach] = useState(false);

  const [messageReceiver, setMessageReceiver] = useState([]);
  const [selectedMessageTypes, setSelectedMessageTypes] = useState([]);

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
  const [media, setMedia] = useState();
  const handleMedia = (media) => setMedia(media)
  const [copyContacts, setCopyContacts] = useState(null);
  const [allColumns, setAllColumns] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);
  const [allGradYears, setAllGraderYears] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [allRanks, setAllRanks] = useState(null);
  const [allBoards, setAllBoards] = useState(null);
  const [allindividualBoards, setAllindividualBoards] = useState(null);
  const [saveMessage, setSaveMessage] = useState([]);
  const [AllSearchBoards, setAllSearchBoards] = useState(null);
  console.log("SaveMessage", saveMessage)

  const [positions, setAllPositions] = useState(null);
  const [rows, setRows] = useState(allBoards);
  const [individualrows, setindividualRows] = useState(allindividualBoards);

  const [sendMessage, setSendMessage] = useState(false)
  const [scheduleMessage, setScheduleMessage] = useState(false)
  const [searched, setSearched] = useState("");

  const [teamContacts, setTeamContacts] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [page, setPage] = useState(1);
  var [scrollPosition, setScrollPosition] = React.useState(0);
  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  const [showDrawer, setShowDrawer] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [stateiconColor, setstateiconColor] = useState('gray');
  console.log("selectedcheckbox", media)
  console.log(allBoards, "All Boards")
  const [tableData, setTableData] = React.useState([]);
  function showStatus() {

    //   setTimeout(()=>{
    //  moment(date).format(" MM/DD/YYYY")<=moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ?setMessageStatus("Drafts"):""

    // },100)



  }  // const classes = useStyles();

  const requestSearch = (searchedVal) => {
    console.log("searchedVal", searchedVal)
    getMyContactsSearch()

    const filteredRows = allBoards?.filter((row) => {
      return row?.name?.toLowerCase().includes(searchedVal?.toLowerCase());
    });
    const filteredRowsIndv = allindividualBoards?.filter((row) => {
      return row?.first_name?.toLowerCase().includes(searchedVal?.toLowerCase()) ||
        row?.twitter_profile.screen_name?.toLowerCase().includes(searchedVal?.toLowerCase()) ||
        row?.phone?.includes(searchedVal) || row?.last_name?.toLowerCase().includes(searchedVal?.toLowerCase())
        ;
    });
    // phone
    setRows(filteredRows);
    setindividualRows(filteredRowsIndv)

    getMyContactsSearch()

  };
  const requestSearchForindividual = (searchedVal) => {

    const filteredRows = allBoards.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    getMyContactsSearch()
    setRows(filteredRows);

  };
  console.log('-----------------individualFilter result-------------------------')
  console.log('====================================');
  console.log(individualrows);
  console.log('===========individualFilter result=========================');
  const cancelSearchIndividual = () => {
    setSearched("");
    requestSearchForindividual(searched);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  useEffect(() => {
    setRows(allBoards)
  }, [allBoards])
  useEffect(
    (data) => {

      setTableData(saveMessage?.filter_ids);
      console.log("tabledata = ", tableData)
      requestSearch()
      // setindividualRows(s)
      // action on update of movies
    },
    [tableData]
  );
  const [displayRangeCalendar, setDisplayRageCalendar] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  console.log('===========allindividualBoards=========================');
  console.log(allindividualBoards, "allindividualBoards");
  console.log('======================allindividualBoards==============');
  console.log('============selectedMedia========================');
  console.log(selectedMedia);
  console.log('=======================selectedMedia=============');
  const CalendarFilter = () => {
    return (
      <div class="dropdown">
        <Grid
          container
          direction={"row"}
          alignItems="center"
          justify="space-between"
          style={{
            border: "1px solid #dadada",
            width: "max-content",
            borderRadius: 4,
            height: 40,
            color: displayRangeCalendar === false ? "black" : "white",
            background:
              displayRangeCalendar === false ? "transparent" : "#3871DA",
          }}
          onClick={() => {
            setDisplayRageCalendar(true);
          }}
        >
          <ArrowBackwardIosIcon
            style={{ marginRight: 8, marginLeft: 8, fontSize: 12 }}
          ></ArrowBackwardIosIcon>
          <div style={{ border: "1px solid #dadada", height: 38 }}></div>
          <p
            style={{
              fontWeight: "bold",
              margin: 0,
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            {new moment(state[0].startDate).format("MM-DD-YYYY") +
              " - " +
              new moment(state[0].endDate).format("MM-DD-YYYY")}
          </p>
          <div style={{ borderLeft: "1px solid #dadada", height: 38 }}></div>
          <ArrowForwardIosIcon
            style={{ marginRight: 8, marginLeft: 8, fontSize: 12 }}
          ></ArrowForwardIosIcon>
        </Grid>

        <div
          // class="dropdown-content"
          className={classes.dropdownHidden}
          style={{
            marginLeft: 0,
            marginTop: 0,
            display: displayRangeCalendar ? "block" : "none",
          }}
          onMouseLeave={() => {
            setDisplayRageCalendar(false);
          }}
        >
          <Grid style={{}}>
            {/* <DateRange
          minDate={addDays(new Date(), -30)}
          maxDate={addDays(new Date(), 30)}
        ></DateRange> */}
            <DateRangePicker
              onChange={(item) => setState([item.selection])}
              months={1}
              minDate={addDays(new Date(), -30)}
              maxDate={addDays(new Date(), 30)}
              direction="horizontal"
              // scroll={{ enabled: true }}
              ranges={state}
            />
          </Grid>
        </div>
      </div>
    );
  };

  // const makeMediaSelected = (index) => {
  //   var alreadySelected = false;
  //   selectedMedia.map((item) => {
  //     if (index.hashid === item.hashid) {
  //       alreadySelected = true;
  //     }
  //   });
  //   if (alreadySelected) {
  //     var temp = [];
  //     selectedMedia.map((item) => {
  //       if (index.hashid != item.hashid) {
  //         temp.push(item);
  //       }
  //     });
  //     setSelectedCheckboxes(temp);
  //     setSelectedMedia(temp);
  //     setuseLessState(uselessState + 1);
  //   } else {
  //     var temp = selectedMedia;
  //     temp.push(index);
  //     setSelectedMedia(temp);
  //     setuseLessState(uselessState + 1);
  //   }
  //   localStorage.setItem("selectedMedia", JSON.stringify(selectedMedia));
  //   // console.log("This is selected media", selectedMedia);
  // };

  const makeMediaSelected = (index) => {
    var alreadySelected = false;
    selectedMedia.map((item) => {
      if (index.hashid === item.hashid) {
        alreadySelected = true;
      }
    });
    if (alreadySelected) {
      var temp = [];
      selectedMedia.map((item) => {
        if (index.hashid != item.hashid) {
          temp.push(item);
        }
      });
      setSelectedCheckboxes(temp);
      setSelectedMedia(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedMedia;
      temp.push(index);
      setSelectedMedia(temp);
      setuseLessState(uselessState + 1);
    }
    localStorage.setItem("selectedMedia", JSON.stringify(selectedMedia));
    // console.log("This is selected media", selectedMedia);
  };

  const makeMessageSelected = (index) => {
    if (selectedMessages.indexOf(index) > -1) {
      var temp = [];
      selectedMessages.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      setSelectedMessages(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedMessages;
      temp.push(index);
      setSelectedMessages(temp);
      setuseLessState(uselessState + 1);
    }
    // var scroll = document.getElementById("messageDetailScrollPublished");
    // scroll.style.overflow = "hidden";
    // console.log("Now we will scroll here", scroll.style);
    setTimeout(() => {
      var scroll = document.getElementById("messageDetailScrollPublished");
      // console.log("Now we will scroll here", scroll.style);
      if (scroll) {
        scroll.scrollTop = scrollPosition;
      }
    }, 1);
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

  /*const makeDraftSelected = (index) => {
    if (selectedDrafts.indexOf(index) > -1) {
      var temp = [];
      selectedDrafts.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      console.log(temp);

      setSelectedDrafts(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedDrafts;
      temp.push(index);
      console.log(temp);
      setSelectedDrafts(temp);
      setuseLessState(uselessState + 1);
    }
    // console.log("THis is selected Checkbox", selectedCheckBoxes);
  };*/

  const makeCheckBoxSelected = (index) => {
    if (selectedCheckBoxes.indexOf(index) > -1) {
      var temp = [];
      selectedCheckBoxes.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
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

          // marginLeft: 16,
          border:
            selectedCheckBoxes.indexOf(m) > -1
              ? "3px solid #4d83e0"
              : "1px solid #d2d2d2",
          borderRadius: 4,
          //marginBottom: 10,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6" }}
        >
          {m.file_type === "video/mp4" ?
            <video
              style={{ width: "100%", height: 150, objectFit: "contain" }}
              src={m?.urls?.original}
            >
            </video>

            : <img
              style={{ width: "100%", height: 150, objectFit: "contain" }}
              src={m?.urls?.original}
            ></img>}
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 16, marginTop: 10 }}
          alignItems="center"
        >
          {m.file_type == "image/gif" ? (
            <GifIcon style={{ color: "black", fontSize: 20 }} ></GifIcon>
          ) : m.file_type == "image/png" ||
            m.file_type == "image/jpg" ||
            m.file_type == "image/jpeg" ||
            m.file_type == "image" ? (
            <FaImage style={{ color: "black", fontSize: 20 }}></FaImage>
          ) : m.file_type == "video/mp4" ? (
            <FaVideo style={{ color: "black", fontSize: 20 }} ></FaVideo>
          ) : (
            <FaFilePdf style={{ color: "black", fontSize: 20 }}></FaFilePdf>
          )}
          <p
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 0,
              marginLeft: 5,

            }}
          >
            {m.file_name ? m.file_name : m.name}
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
            Uploaded at : {new moment(m.created_at).format("YYYY-MM-DD h:mm a")} by {" "}
            {m.owner?.first_name + " " + m.owner?.last_name}
          </p>
        </Grid>
      </div>
    );
  };
  const getMyPlaceholders = async () => {

    try {
      const data = await getPlaceholder();
      if (data.statusText === "OK") {
        // console.log("These are all placeholder", res.data);
        setPlaceHolders(data.data);
        console.log('placeholder data = ', data.data);
      }
    } catch (error) {
      console.log("this is error all media", error);
    }


  };

  const showActionButton = () => {
    return (
      <>
        <div class="dropdown" >
          <IconTextField
            // width={180}
            width={100}

            text="Action"
            background={selectedDrafts ? "#3871DA" : "transparent"}
            textColor={selectedDrafts ? "white" : "black"}
            icon={
              <FaMagic
                style={{
                  color: selectedDrafts ? "white" : "#3871DA",
                }}
              ></FaMagic>
            }

            onClick={() => {
              setSelectedDrafts(!selectedDrafts)

            }}


          ></IconTextField>
          {selectedDrafts && (
            <Paper elevation={3} class="dropdown"
              style={{ textAlign: "end", cursor: "pointer", background: 'white', marginLeft: -20, position: "fixed" }} >
              <div class="dropdown" style={{}}>
                <p style={{ color: "black", margin: 12 }}
                  onClick={() => {
                    setMessagePreview(false)
                    setSelectedDrafts(false)
                  }}

                >Edit</p>
                <p
                  onClick={() => {
                    setSaveMessage(null)
                    setMessageType(null)
                    setMessageText("")
                    setMessageSender(null)
                    setRecieve(null)
                    setMessageReceiver([])
                    settwitterDm(false)
                    setrsText(false)
                    setPersonalText(false)
                    setMedia(null)
                    setMessageDeleted(true)
                    setMessagePreview(false)
                    setDate("ASAP")
                    setMessageDeleted(true)
                    setSelectedDrafts(false)
                  }}
                  style={{ color: "red", margin: 12 }}
                >
                  Delete Message



                </p>
                <p style={{ color: "black", margin: 12 }}
                  onClick={() => {
                    setSaveMessage(null)
                    setMessageType(null)
                    setMessageText("")
                    setMessageSender(null)
                    setRecieve(null)
                    setMessageReceiver([])
                    settwitterDm(false)
                    setrsText(false)
                    setPersonalText(false)
                    setMedia(null)
                    setSaveDraft(true)
                    setMessagePreview(false)
                    setDate(new Date())
                    setSelectedDrafts(false)
                  }}
                >
                  Save As Draft & Exit
                </p>
              </div>
            </Paper>
          )}
        </div>
      </>
    );
  };
  const showFilterButton = () => {

    return (

      <IconTextField
        text={moment(date).format(" MM/DD/YYYY") > moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ? "Schedule" : "Send"}
        textColor={"white"}
        background={"#3871DA"}
        width={120}
        onClick={() => {
          setSaveMessage(null)
          setMessageType(null)
          setMessageText("")
          setMessageSender(null)
          setRecieve(null)
          setMessageReceiver([])
          settwitterDm(false)
          setrsText(false)
          setPersonalText(false)
          setMedia(null)
          moment(date).format(" MM/DD/YYYY") > moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ?
            setScheduleMessage(true) : setSendMessage(true)
          setMessagePreview(false)
          setDate(new Date())

        }}
        icon={
          moment(date).format(" MM/DD/YYYY") > moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ?
            <CalendarTodayIcon
              style={{
                color: "white",
              }}
            ></CalendarTodayIcon> : <SendIcon
              style={{
                color: "white",
              }} />
        }
      ></IconTextField>
    );
  };
  const showScheduleButton = () => {
    return (
      <IconTextField
        text="Schedule"
        textColor={showMessageFiltersRow === false ? "white" : "white"}
        background={
          showMessageFiltersRow === false ? "rgb(196, 213, 244)" : "#3871DA"
        }
        width={120}
        // onClick={() => {
        //   setShowMessageFiltersRow(!showMessageFiltersRow);
        // }}
        icon={
          <CalendarTodayIcon
            style={{
              color: showMessageFiltersRow === false ? "white" : "white",
            }}
          ></CalendarTodayIcon>
        }
      ></IconTextField>
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
        // getMyContactsSearch(1);
        // document.getElementById("infinit").scrollTop = 0;
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

        }
      },
      (error) => {
        console.log("this is error all media", error);
      }
    );
  };
  const getMyContactsSearch = (page) => {
    // setLoading(true);
    setFetching(true);
    console.log("This is the date", page);
    // || "2020-12-13"
    getAllContactsWithSearch(page).then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          console.log("These are all contacts", res.data);
          setAllindividualBoards(res.data);
          // setAllBoards(res.data);
          // setCopyContacts(res.data);
          // document.getElementById("infinit").scrollTop = 0;
          setFetching(false);
        }
      },
      (error) => {
        getMyContactsSearch(1);
        setPage(1);
        console.log("this is error all contacts", error);
      }
    );
    // setLoading(false)
  };
  // const getCreateSearch = () => {
  //   getAllContacts,Search().then(
  //     (res) => {
  //       // console.log("THis is all boards", res);
  //       var gradYears = [];
  //       if (res.statusText === "OK") {
  //         // console.log("These are all boards", res.data);
  //         setAllBoards(res.data);
  //         console.log(res.data, "getCreateSearch")

  //       }
  //     },
  //     (error) => {
  //       console.log("this is error all grad year", error);
  //     }
  //   );
  // }
  const getBoardsFilterById = (id) => {
    console.log("boardID", id)
    getBoardFiltersById(id).then(
      (res) => {
        if (res.statusText === "OK") {
          console.log(res.data, "boardsById")
        }
      }, (error) => {
        console.log("this is error all grad year", error);
      }
    );
  }
  const getAllBoards = () => {
    getBoardFilters().then(
      (res) => {
        // console.log("THis is all boards", res);
        var gradYears = [];
        if (res.statusText === "OK") {
          // console.log("These are all boards", res.data);
          setAllBoards(res.data);
          console.log(res.data, "all boards")

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
    //alert('ok')

    console.log("THis is container ", media);
    return (
      <Badge
        badgeContent={
          <ClearIcon
            style={{ height: 10, width: 10, cursor: "pointer" }}
            /*  onClick={() => {
                var alreadySelected = false;
                media.map((item) => {
                  if (m.hashid === item.hashid) {
                    alreadySelected = true;
                  }
                });
                if (alreadySelected) {
                  var temp = [];
                  media.map((item) => {
                    if (m.hashid != item.hashid) {
                      temp.push(item);
                    }
                  });
                  setMedia(temp);
                  localStorage.setItem("selectedMedia", JSON.stringify(temp));
                  setuseLessState(uselessState + 1);
                }
              }}*/
            onClick={() => {
              setMedia(null)
              saveMessage.media_placeholder_id = null
              setSaveMessage(saveMessage)
            }}


          ></ClearIcon>
        }
        color="error"
      >
        <div
          style={{
            width: 270,

            marginLeft: 20,
            // border: "1px solid #d2d2d2",
            border: "1px solid #d2d2d2",
            borderRadius: 4,
            // marginTop: 20,

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
              style={{ width: "100%", height: 150, objectFit: "contain" }}
              src={m.urls && m.urls.original}
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

  const renderMessageFilters = () => {
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
          title={statusFilter || "Type"}
          drop={"down"}
          placeholder="Type"
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
          title={stateFilter || "Sender"}
          drop={"down"}
          placeholder="Sender"
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

            {teamContacts.map((option) => {
              var name = option.first_name + " " + option.last_name;
              if (stateSearch != "") {
                if (
                  name.toLowerCase().indexOf(stateSearch.toLowerCase()) > -1
                ) {
                  if (option.twitter_profile) {
                    return (
                      <Dropdown.Item
                        style={{
                          background:
                            stateFilter === name ? "#348ef7" : "white",
                          color: stateFilter === name ? "white" : "black",
                        }}
                        onClick={() => {
                          addDataToFilter(option, "State");
                        }}
                      >
                        {name}
                      </Dropdown.Item>
                    );
                  }
                }
              } else {
                return (
                  <Dropdown.Item
                    style={{
                      background: stateFilter === name ? "#348ef7" : "white",
                      color: stateFilter === name ? "white" : "black",
                    }}
                    onClick={() => {
                      addDataToFilter(name, "State");
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                );
              }
            })}
          </div>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={gradeYearFilter || "Tags"}
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
          title={timeZoneFilter || "Status"}
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
        <CalendarFilter></CalendarFilter>
      </Grid>
    );
  };

  const renderMessageDetails = () => {
    console.log("table data = ", tableData)
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
            {/* <FormatAlignLeftIcon
              onClick={(e) => {
                setshowSideFilters(!showSideFilters);
              }}
              style={{ cursor: "pointer", fontSize: 18 }}
            ></FormatAlignLeftIcon> */}

            <img src={AmimatedBurger} onClick={(e) => {
              setshowSideFilters(!showSideFilters);
            }}
              style={{ cursor: "pointer", width: 40 }}></img>

            <span
              style={{
                padding: 16,
                fontWeight: "bold",
                // marginLeft: 20,
                fontSize: 20,
              }}
            >
              Messages Details
            </span>
          </Grid>

          <Grid item md={8} sm={8}>
            <Grid container direction="row" justify="flex-end">
              {showActionButton()}
              {/* {showFilterButton() } */}
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
          {showMessageFiltersRow === true ? (
            renderMessageFilters()
          ) : (
            <div></div>
          )}

          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}
            className="fullHeightCreateMessageDetails hideScrollBar"
            id={"messageDetailScrollPublished"}
            onScroll={() => {
              var scroll = document.getElementById(
                "messageDetailScrollPublished"
              );
              if (scroll) {
                scrollPosition = scroll.scrollTop;
                // console.log("THis is scroll", scrollPosition);
              }
            }}
          >

            {placeholders &&
              placeholders.map((selectedPlaceholder, index) => {
                if (index < 1) {
                  return (
                    <MessageDetailsCard
                      hideCheckBox={null}
                      hideStats={null}
                      selectedPlaceholder={selectedPlaceholder}
                    ></MessageDetailsCard>
                  );
                }
              })}
          </div>
        </Grid>
      </div>
    );
  };
  const messageStatusTable = () => (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{
          background: "#f5f6f9",
          width: "100%",
          cursor: "pointer",
          minWidth: 1025,
        }}
      >
        <Grid item md={1} xs={1}>
          <Checkbox
            color="primary"
          //      checked={selectedDrafts.length === 6}
          /* onChange={() => {
             var array = [1, 2, 3, 4, 5, 6];
             var temp = [];
             if (selectedDrafts.length === array.length) {
               setSelectedDrafts([]);
             } else {
               array.map((item) => {
                 temp.push(item);
               });
               setSelectedDrafts(temp);
             }
           }}*/
          ></Checkbox>
        </Grid>
        <Grid item md={2} xs={2}>
          <Grid
            container
            direction="row"
            onClick={() => {
              let data = tableData.sort((a, b) =>
                a.first_name ? (a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0) : (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
              );
              console.log(data);
              setTableData(() => [...data]);
              console.log("asda");
            }}
          >
            <span className={classes.tableHeading}>Full Name</span>
            {/* <pan style={{ transform: "rotate(180deg)" }}>
              {" "}
              <ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>{" "}
            </span> */}
          </Grid>
        </Grid>
        <Grid
          item
          md={1}
          xs={1}
          onClick={() => {
            let data = saveMessage.filter_ids.sort((a, b) =>
              a.first_name ? (a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0) : (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
            );

            setTableData(() => [...data]);

          }}
        >
          <span className={classes.tableHeading}>Board/List</span>
        </Grid>

        <Grid
          item
          md={2}
          xs={2}
          onClick={() => {
            let data = tableData.sort((a, b) =>
              a.phone ? (a.phone > b.phone
                ? 1
                : b.phoneNumber > a.phoneNumber
                  ? -1
                  : 0) : ''
            );
            console.log(data);
            setTableData(() => [...data]);
            console.log("asda");
          }}
        >
          <span className={classes.tableHeading} style={{ marginLeft: 40 }}>
            Phone Number
          </span>
        </Grid>
        <Grid
          onClick={() => {
            let data = tableData.sort((a, b) =>
              a.first_name ? (a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0) : (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)

            );
            console.log(data);
            setTableData(() => [...data]);
            console.log("asda");
          }}
          item
          md={2}
          xs={2}
        >
          <span className={classes.tableHeading}>First Name</span>
        </Grid>
        <Grid
          item
          md={2}
          xs={2}

        >
          <span className={classes.tableHeading}>Delivered at</span>
        </Grid>
        <Grid
          item
          md={2}
          xs={2}
          onClick={() => {
            setIsMesasgeStatusClick(true);
            setMessageStatus("error");
          }}
        >
          <Grid container direction="row">
            <span className={classes.tableHeading}>Message Status</span>
            <ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>
          </Grid>
        </Grid>
      </Grid>

      {tableData && tableData.map((item, index) => {
        console.log("date", date, item)
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
              minWidth: 1025,
            }}
          >
            okkokokko
            <Grid item md={1} xs={1}>
              <Checkbox
                color="primary"
                onChange={() => {
                  //   makeDraftSelected(item);
                }}
                //    checked={selectedDrafts.indexOf(item) > -1 ? true : false}
                style={{ marginTop: 1, marginBottom: 1 }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
              ></Checkbox>
            </Grid>
            <Grid item md={2} xs={2}>
              <span className={classes.tableFields}>{item.first_name && item.first_name + " " + item.last_name}</span>
            </Grid>
            <Grid item md={1} xs={1}>
              <span className={classes.tableFields}>
              </span>
            </Grid>
            <Grid item md={2} xs={2}>
              <span className={classes.tableFields} style={{ marginLeft: 40 }}>
                {formatPhoneNumber(item?.phone)}
              </span>
            </Grid>

            <Grid item md={2} xs={2}>
              <span className={classes.tableFields}>{item.first_name && item.first_name}</span>
            </Grid>
            <Grid item md={2} xs={2}>
              <span className={classes.tableFields}>
                {isMesasgeStatusClick
                  ? "-"
                  : moment(date).format("MM/DD/YY  h:mm a")}
              </span>
            </Grid>
            <Grid item md={2} xs={2}>

              <span className={classes.tableFields}>
                <Info style={{
                  color: messageStatus === "Drafts" ? "#f0ad24" :
                    messageStatus === "In Progress" ? "#54a300" : "#8bb14c", fontSize: 16
                }}></Info>{" "}
                <span className={classes.mdMargin} style={{ marginLeft: 5 }}>
                  {setMessageStatus("Drafts")}
                  {messageStatus
                  }
                </span>
                {/*moment(date).format(" MM/DD/YYYY")>moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ? (
                <span className={classes.mdMargin} style={{ marginLeft:5 }}>
                 { setMessageStatus("Drafts")}
                { messageStatus
                 }
                </span>
              ) : moment(date).format(" MM/DD/YYYY")<=moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY")  ? (
                <span className={classes.mdMargin} style={{ marginLeft:5 }} >
                   { setMessageStatus("In Progress")}
                { messageStatus
                 }
                 
                </span>
              ) : (
                <span className={classes.mdMargin} style={{ marginLeft:5 }}>
                   { setMessageStatus("Sent")}
                { messageStatus
                 }
                </span>
              )*/}
              </span>

            </Grid>
          </Grid>
        );
      })}
    </>
  );
  const MessageFilterDetails = (props) => {
    console.log("allMessagesss", props)
    const filterMessage = props.selectedPlaceholder
    console.log("filtering", filterMessage)
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
                onChange={(e) => {
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

          {props.selectedPlaceholder.media.urls ? placeholderContainer(props.selectedPlaceholder.media) : ''}
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
              {filterMessage.media?.name && filterMessage.media.name}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Message Status:


              <span className={classes.mdMargin} style={{ color: "#f0ad24" }}>
                {filterMessage.status}
              </span>






            </p>
            <p class className={classes.messageDetailsHeading}>
              Send As:
              <strong className={classes.mdMargin}>{filterMessage.platform.name}</strong>
            </p>
            <p class className={classes.messageDetailsHeading}>
              Sender:
              <strong className={classes.mdMargin}>{filterMessage.sender.first_name + " " + filterMessage.sender.last_name}</strong>{" "}
              {filterMessage.sender.phone ? formatPhoneNumber(filterMessage.sender.phone) : ''}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Recepient:
              <strong className={classes.mdMargin}>
                {filterMessage.recipients.count}
              </strong>

            </p>

            <p class className={classes.messageDetailsHeading}>
              Start Sending at:
              <strong className={classes.mdMargin}>
                {moment(date).format(" MM/DD/YYYY h:mm a")}
              </strong>{" "}
            </p>


            {/*    <Grid
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
                {saveMessage.media_placeholder_id?.tags&&saveMessage.media_placeholder_id.tags.map((tags) => tags.name )}
   </div>
   
              </Grid>*/}
            <p class className={classes.messageDetailsHeading}>
              Message Text :
            </p>
            <p
              class
              className={classes.messageDetailsHeading}
              style={{ color: "black", fontWeight: 500 }}
            >
              {filterMessage.body}
            </p>
          </div>

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
                  fontSize: 26,
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
                  fontSize: 26,
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
                  fontSize: 26,
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
              onClick={() => {
                if (messageSelected.length > 0) {
                  console.log("SAdasd", messageSelected);
                  setMessageDetails(!messageDetails);

                  setIsMesasgeStatusClick(false);
                  setMessageStatus("Drafts");

                  console.log("ASd");
                  setMessageSelected([]);
                } else {
                  setMessageDetails(null);
                  setMessagePreview(null);
                  console.log("ASd");
                  setMessageSelected([{}]);
                }
              }}
            >
              <IconTextField
                background={messageSelected.length && "rgb(58, 114, 217)"}
                text="Delivery Details"
                width={180}
                textColor={messageSelected.length && "white"}
                onClick={() => { }}
                icon={
                  <Search
                    style={{
                      color: messageSelected.length ? "white" : "#0091ff",
                      marginRight: 8,
                    }}
                  ></Search>
                }
              ></IconTextField>
            </Grid>
          </div>
        )}
      </Grid>
    );
  };

  const MessageDetailsCard = (props) => {
    console.log("messageCreateprops", props)
    {/*const [count,setCount] = useState()
    let totalcount= saveMessage.filter_ids.map(m => count+m.contacts.profile_images.length)
    
            totalcount+=  saveMessage.contact_ids.map(m =>m.length)
            setCount(totalcount)
    console.log("totalcount",count)*/}
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
                onChange={(e) => {
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

          {saveMessage?.media_placeholder_id && placeholderContainer(saveMessage?.media_placeholder_id)}
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
              {saveMessage.media_placeholder_id && saveMessage.media_placeholder_id.file_name}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Message Status:

              <span className={classes.mdMargin} style={{ color: "#f0ad24" }}>
                Drafts
              </span>
              {/*moment(date).format(" MM/DD/YYYY")>moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY") ? (
                <span className={classes.mdMargin} style={{ color: "#f0ad24" }}>
                  Drafts
                </span>
              ) : moment(date).format(" MM/DD/YYYY")<=moment(new Date().toLocaleDateString()).format(" MM/DD/YYYY")  ? (
                <span className={classes.mdMargin} style={{ color: "#54a300" }} >
                  
                  In Progress
                </span>
              ) : (
                <span className={classes.mdMargin} style={{ color: "#8bb14c" }}>
                  Sent
                </span>
              )*/}





            </p>
            <p class className={classes.messageDetailsHeading}>
              Send As:
              <strong className={classes.mdMargin}>{saveMessage?.platform}</strong>
            </p>
            <p class className={classes.messageDetailsHeading}>
              Sender:
              <strong className={classes.mdMargin}>{JSON.parse(localStorage.getItem("user")).first_name + " " + JSON.parse(localStorage.getItem("user")).last_name}</strong>{" "}
              {JSON.parse(localStorage.getItem("user")).phone}
            </p>
            <p class className={classes.messageDetailsHeading}>
              Recepient:
              <strong className={classes.mdMargin}>
                {saveMessage.filter_ids.map(m => m.contacts.profile_images.length) +
                  saveMessage.contact_ids.map(m => m.length)}
              </strong>

            </p>
            {saveMessage.contact_ids.status === "Scheduled" ? (
              <p class className={classes.messageDetailsHeading}>
                Start Sending at:
                <strong className={classes.mdMargin}>

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
                  {moment(date).format(" MM/DD/YYYY h:mm a")}
                </strong>{" "}
              </p>
            )}

            <Grid
              container
              direction="row"
              className={classes.messageDetailsHeading}
            >
              Tags:
              {saveMessage.media_placeholder_id?.tags && <div
                style={{
                  border: "1px solid #0091ff",
                  color: "#0091ff",
                  padding: 4,
                  fontSize: 10,
                  borderRadius: 4,
                  marginLeft: 16,
                }}
              >
                {saveMessage.media_placeholder_id.tags.map((tags) => tags.name)}
              </div>}

            </Grid>
            <p class className={classes.messageDetailsHeading}>
              Message Text :
            </p>
            <p
              class
              className={classes.messageDetailsHeading}
              style={{ color: "black", fontWeight: 500 }}
            >
              {saveMessage.body}
            </p>
          </div>

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
                  fontSize: 26,
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
                  fontSize: 26,
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
                  fontSize: 26,
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
              onClick={() => {
                if (messageSelected.length > 0) {
                  console.log("SAdasd", messageSelected);
                  setMessageDetails(!messageDetails);

                  setIsMesasgeStatusClick(false);
                  setMessageStatus("Drafts");

                  console.log("ASd");
                  setMessageSelected([]);
                } else {
                  setMessageDetails(null);
                  setMessagePreview(null);
                  console.log("ASd");
                  setMessageSelected([{}]);
                }
              }}
            >
              <IconTextField
                background={messageSelected.length && "rgb(58, 114, 217)"}
                text="Delivery Details"
                width={180}
                textColor={messageSelected.length && "white"}
                onClick={() => { }}
                icon={
                  <Search
                    style={{
                      color: messageSelected.length ? "white" : "#0091ff",
                      marginRight: 8,
                    }}
                  ></Search>
                }
              ></IconTextField>
            </Grid>
          </div>
        )}
      </Grid>
    );
  };

  const RenderSelectedMessage = () => {
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
            <KeyboardArrowLeftIcon
              onClick={(e) => {
                setMessageDetails(!messageDetails);
                setMessageStatus("Drafts");
                setIsMesasgeStatusClick(false);
                setMessagePreview(null);
                setMessageSelected([]);

              }}
              style={{ cursor: "pointer", fontSize: 30, fontWeight: "bold" }}
            ></KeyboardArrowLeftIcon>

            <span
              style={{
                padding: 16,
                fontWeight: "bold",
                // marginLeft: 20,
                fontSize: 20,
              }}
            >
              Message Details
            </span>
          </Grid>

          <Grid item md={8} sm={8}>
            <Grid container direction="row" justify="flex-end">
              {showActionButton()}
              {showScheduleButton()}
            </Grid>
          </Grid>

          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}
            className="hideScrollBar"
            id={"messageDetailScrollPublished"}
            onScroll={() => {
              var scroll = document.getElementById(
                "messageDetailScrollPublished"
              );
              if (scroll) {
                scrollPosition = scroll.scrollTop;
                // console.log("THis is scroll", scrollPosition);
              }
            }}
          >
            {placeholders &&
              placeholders.map((selectedPlaceholder, index) => {
                if (index < 1) {
                  return (
                    <MessageDetailsCard
                      hideCheckBox={false}
                      hideStats={null}
                      selectedPlaceholder={selectedPlaceholder}
                    ></MessageDetailsCard>

                  );
                }
              })}
          </div>
          <div
            style={{
              marginTop: 10,
              width: "100%",
              minHeight: "calc(100vh - 520px )",
            }}
          >
            {messageStatusTable()}
          </div>
        </Grid>
      </div>
    );
  };

  const MessageDetails = (props) => {
    // const [filter, setFilterMessage] = useState([])
    const firstname = JSON.parse(localStorage.getItem("user")).first_name.trim()
    const lastname = JSON.parse(localStorage.getItem("user")).last_name.trim()
    console.log("fistandlastnamee", firstname, lastname)
    console.log("itemboards", props.item)
    let filterMessage = allMessages?.filter(m => m.sender.first_name === firstname && m.sender.last_name === lastname).slice(0, 100);
    console.log("filtering", filterMessage)
    {
      props.item != null ? (
        props.item === "Scheduled" ?
          filterMessage = filterMessage?.filter(m => m.status === "Draft") :
          props.item === "In Progress" ?
            filterMessage = filterMessage?.filter(m => m.status === "In Progress") :
            props.item === "Finished" ?
              filterMessage = filterMessage?.filter(m => m.status === "Sent") :
              props.item === "Archived" ?
                filterMessage : filterMessage) : filterMessage
    }
    console.log("filterMessages", filterMessage)
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
        <Grid container direction="row" style={{ marginTop: 10 }}>
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
                          setMessageDetails(false)
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
        <Grid container direction="row">
          <Grid item md={4} sm={4}>


            <img src={AmimatedBurger} onClick={(e) => {
              setshowSideFilters(!showSideFilters);
            }}
              style={{ cursor: "pointer", width: 40 }}></img>

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

            </Grid>
          </Grid>

         

          <div
            style={{
              width: "100%",
              border: "1px solid #f8f8f8",
              marginTop: 10,
            }}
          ></div>
          {showMessageFiltersRow === true ? (
            renderMessageFilters()
          ) : (
            <div></div>
          )}

          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}

            className="fullHeightCreateMessageDetails hideScrollBar"
            id={"messageDetailScrollPublished"}
            onScroll={() => {
              var scroll = document.getElementById(
                "messageDetailScrollPublished"
              );
              if (scroll) {
                scrollPosition = scroll.scrollTop;
                // console.log("THis is scroll", scrollPosition);
              }
            }}
          >

            {allMessages &&
              filterMessage.map((selectedPlaceholder, index) => {
                if (index <= filterMessage.length) {
                  return (
                    <MessageFilterDetails
                      hideCheckBox={null}
                      hideStats={null}
                      selectedPlaceholder={selectedPlaceholder}
                    ></MessageFilterDetails>
                  );
                }
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

            <ArrowBackIosNewIcon style={{ cursor: "pointer" }} onClick={() => {
              setMessagePreview(false);
              setSelectedDrafts(false)
            }} />

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
              {showActionButton()}
              {showFilterButton()}
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
          <div
            style={{
              width: "100%",
              maxHeight: 330,
              //  minWidth: 1110
            }}
            className="fullHeightCreateMessagePreview"
          >
            {placeholders && (
              <MessageDetailsCard
                hideCheckBox
                hideStats
                selectedPlaceholder={placeholders[0]}
                messageStatus={messageStatus}
              ></MessageDetailsCard>
            )}
            {messageStatusTable()}
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
    console.log(value, type, 'okkkkkkkkkkkkkkkkkkkkk');
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
      setRecieve(temp)
      // console.log("This is temp", temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = messageReceiver;
      temp.push(value);
      setMessageReceiver(temp);
      setRecieve(temp)
      // console.log("This is temp", temp);
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
      // getMyContactsSearch()
      getMyMedia();
      getMyTeamContacts();
      getAllBoards();
      // setTimeout()
      // getCreateSearch();
    } else {
      window.location.href = "/";
    }
  }, [messagePreview]);

  // console.log("THis is great message type", messageType);

  const renderMessageReceiver = (messageType) => {
    console.log("messageType", messageType)
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
            <p style={{ margin: 0, marginLeft: 16, marginRight: 5 }}>{item?.first_name ? item.first_name + " " + item.last_name : item.name}</p>
            <ClearIcon
              onClick={() => {
                addDataToReceivers(item);
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
    });
  };

  const renderMessageSenderTag = (sender) => {
    console.log("sendertag", sender)
    return (
      <Grid container direction="row" style={{ width: '80%' }}>
        {
          fromAreaCoach && <div

          >
            <Grid
              className="d-flex align-items-center"
              style={{ height: 40 }}
              container
              direction="row"
              alignItems="center"
            >
              <div


                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.tags}
                style={{ paddingLeft: 0, alignItems: 'center', display: 'flex' }}
              >


                <p style={{ margin: 0, marginLeft: 5, marginRight: 16 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      marginLeft: 16,
                    }}
                  >
                    Area Coach
                  </p>
                </p>
                <ClearIcon
                  onClick={() => {
                    setFromAreaCoach(false)
                  }}
                  className={classes.tagCross}
                ></ClearIcon>{" "}
              </div>
              <p className=" m-0 mr-4 ">OR</p>
            </Grid>

          </div >
        }

        {
          fromPositionCoach && <div

          >
            <Grid
              style={{ height: 40 }}
              container
              direction="row"
              alignItems="center"
              className="d-flex align-items-center"

            >
              <div
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.tags}
                style={{ paddingLeft: 0, alignItems: 'center', display: 'flex' }}
              >
                <p style={{ margin: 0, marginLeft: 5, marginRight: 16 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      marginLeft: 16,
                    }}
                  >
                    Position Coach
                  </p>
                </p>
                <ClearIcon
                  onClick={() => {
                    setFromPositinCoach(false)
                  }}
                  className={classes.tagCross}
                ></ClearIcon>{" "}
              </div>
              <p className=" m-0 mr-4 ">OR</p>

            </Grid>
          </div>
        }

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
              className={classes.tagCross}
            ></ClearIcon>{" "}
          </Grid>
        </div>
      </Grid >

    );
  };

  const renderMessageTypeTag = (messageType) => {
    console.log('===========renderMessageTypeTag=========================', messageType);
    console.log(messageType, "title");
    console.log(messageType.icon, "icon");

    console.log('======================renderMessageTypeTag==============');
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
          {messageType[0].icon}

          <p style={{ margin: 0, marginLeft: 5, marginRight: 5 }}>
            {messageType[0].title}
          </p>
          <ClearIcon
            onClick={() => {
              setMessageType(null);
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
  };

  const handleSendMessage = async () => {

    setMessagePreview(true);
    console.log("recieve", recieve)
    const contactsId = messageSender ? messageSender.id : null
    const contactsdata = recieve.filter(m => m.first_name ? recieve : null)
    const filtersdata = recieve.filter(m => m.name ? recieve : null)
    const data = {
      message: {
        platform: messageType[0].title,
        media_placeholder_id: media && media[0] ? media[0].id : null,
        filter_ids: filtersdata.map((filterid) => filterid.id).join(","),
        send_at: date,
        body: messageText,
        contact_ids: contactsdata,
        user_id: JSON.parse(localStorage.getItem("user")).id,
      }
    }


    const save = {

      platform: messageType[0].title,
      media_placeholder_id: media && media[0] ? media[0] : null,
      filter_ids: filtersdata,
      send_at: date,
      body: messageText,
      contact_ids: contactsdata,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    }
    const saverecieve = save.filter_ids + save.contacts_ids
    setTableData(recieve);

    setSaveMessage(save)
    console.log("saveMessage", saveMessage)
    console.log("filter_idscount", save.filter_ids.counts)
    setMessageCreated(true)
    const filterName = save.filter_ids?.filter((filterid) => filterid?.name).map((filter) => filter.name)
    { filterName && getBoardsFilterById(save.filter_ids[0].id) }
    console.log('handleSendMessage = ', data)


    try {
      const response = await createMessage(data);
      console.log('create message = ', response);
    } catch (e) {
      console.log('create message = ', e)
    }

    //  postMessage(data)

  }

  const name = JSON.parse(localStorage.getItem("user")).first_name + " " + JSON.parse(localStorage.getItem("user")).last_name
  const [item, setItem] = useState()
  console.log("date", date)
  return (
    <DarkContainer contacts style={{ padding: 16, marginLeft: 60 }}

    >
      {showTimePicker && (
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
      )}
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
          setMessageDeleted(false)
        }}
      >

        <Alert onClose={() => {
          setMessageCreated(false);
        }} severity="success">
          Message Preview And Send !
        </Alert>


      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={sendMessage}
        autoHideDuration={2000}
        onClose={() => {
          setSendMessage(false);

        }}
      >

        <Alert onClose={() => {
          setSendMessage(false);
        }} severity="success">
          Message Sent !
        </Alert>


      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={scheduleMessage}
        autoHideDuration={2000}
        onClose={() => {
          setScheduleMessage(false)
        }}
      >

        <Alert onClose={() => {
          setScheduleMessage(false);
        }} severity="success">
          Message Scheduled!
        </Alert>


      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={messageDeleted}
        autoHideDuration={2000}
        onClose={() => {

          setMessageDeleted(false)
        }}
      >
        <Alert onClose={() => {
          setMessageDeleted(false);
        }} severity="error">
          Message Removed
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={saveDraft}
        autoHideDuration={2000}
        onClose={() => {

          setSaveDraft(false)
        }}
      >
        <Alert onClose={() => {
          setSaveDraft(false);
        }} severity="info">
          Message Saved As Drafts
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={messageNotCreated}
        autoHideDuration={2000}
        onClose={() => {
          setMessageNotCreated(false);
        }}
      >

        <Alert onClose={() => {
          setMessageNotCreated(false);
        }} severity="error">
          <strong>Fill  all the required fields</strong>
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



              {/* <FormatAlignLeftIcon
               
              ></FormatAlignLeftIcon> */}



              Create Message
            </p>
            <p className={props.sideFilterClass}>
              Drafts{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
              <div>
                {allMessages && [name].map((item) => {
                  return (
                    <p
                      className={classes.sideSubFilter}
                      onClick={() => {
                        addDataToFilter(item, "Board");
                        setMessageDetails(!messageDetails)
                      }}
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </p>
            <p
              className={props.sideFilterClass}
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
                {allMessages && ["Scheduled", "In Progress", "Finished", "Archived"].map(
                  (item) => {
                    return (
                      <p
                        className={classes.sideSubFilter}
                        onClick={() => {
                          setMessageDetails(!messageDetails);
                          setItem(item)
                          messageDetails && addDataToFilter(item, "Board");
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
            addMedia={addMedia}
            setAddMedia={handleAddMedia}
            setMedia={handleMedia}
            filter={filter}
            addDataToFilter={addDataToFilter}
            message
            makeMediaSelected={makeMediaSelected}
          ></MediaComponnet>
        ) : messageDetails ? (
         
           
            <MessageDetails item={item} />
         
          //   <MessageDetails />
        ) : messagePreview ? (
          <MessagePreview />
        ) : messageSelected.length ? (
          <RenderSelectedMessage />
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
              paddingTop: 0
            }}
          >



            <div
              style={{
                width: "100%",
                border: "1px solid #f8f8f8",
                // marginTop: 16,
              }}
            ></div>
            {/* <Grid container direction="row" alignItems="center"></Grid> */}
            <div style={{
              width: "100%", overflowX: "hide",
            }}>
              <Grid container direction="row">
                {displaySendTo ? (
                  <Grid item md={4} xs={4} style={{ borderRight: '1px solid rgb(216, 216, 216)' }}>
                    <Grid container direction="row" justify="flex-start">


                      {
                        showDrawer ?
                          <img src={showAnimation ? DrawerAnimation : DrawerIcon} onClick={(e) => {
                            setshowSideFilters(!showSideFilters);
                            setShowDrawer(false);
                            setShowAnimation(true);
                            handleAnimation();
                          }}
                            style={{ cursor: "pointer", width: 40 }}></img>
                          :
                          <img src={showAnimation ? BackAnimation : BackIcon} onClick={(e) => {
                            setshowSideFilters(!showSideFilters);
                            setShowDrawer(true);
                            setShowAnimation(true);
                            handleAnimation();

                          }}
                            style={{ cursor: "pointer", width: 40 }}></img>}

                      <div
                        style={{
                          // background: "#edeef2",
                          width: "97%",
                          // height: 40,
                          borderRadius: 4,
                        }}
                      >
                        <Grid className="mt-3 mb-3" container direction="row">
                          {/* <Grid item md={4} xs={4}>
                            <button className={classes.blueButton}>
                              My Boards
                            </button>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <button className={classes.blueButton}>
                              Team Boards
                            </button>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <button className={classes.blueButton}>
                              Individuals
                            </button>
                          </Grid> */}
                          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={{ background: '#edeef2', border: 'none', color: "#b5b9c0", height: '40px', borderRadius: "4px" }} label="My Boards" {...a11yProps(0)} />
                            <Tab style={{ background: '#edeef2', border: 'none', color: "#b5b9c0", height: '40px', borderRadius: "4px" }} label="Team Boards" {...a11yProps(1)} />
                            <Tab style={{ background: '#edeef2', border: 'none', color: "#b5b9c0", height: '40px', borderRadius: "4px" }} label="Individuals" {...a11yProps(2)} />
                          </Tabs>

                          <TabPanel value={value} index={0}>
                            <Grid container direction="row" justify="center">
                              {/* /////////////Tab panel for My boards//////////// */}

                              <div className="form-group has-search w-100 mt-3">
                                {/* <span className="fa fa-search form-control-feedback"></span> */}

                                {/* <input
                                  style={{
                                    width: "100%",
                                    border: "1px solid rgb(216, 216, 216)",
                                    borderRadius: 4,
                                    height: 40,
                                    color: '#888',
                                    background: '#edeef2'
                                  }}
                                  type="text" className="form-control w-100" placeholder="Search Board" /> */}
                                <SearchBar
                                  style={{
                                    boxShadow: 'none',
                                    width: "100%",
                                    // border: "1px solid rgb(216, 216, 216)",
                                    borderRadius: 4,
                                    height: 40,
                                    color: '#888',
                                    background: '#edeef2'
                                  }}
                                  placeholder="Search My boards"
                                  value={searched}
                                  onChange={(searchVal) => requestSearch(searchVal)}
                                  onCancelSearch={() => cancelSearch()}
                                />
                              </div>
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
                                {rows &&
                                  rows.map((boards) => {
                                    return (
                                      boards.is_shared === false ? <>
                                        <div
                                          style={{
                                            borderTop: "1px solid #edeef2",
                                            width: "100%",
                                            height: 100,
                                            color: "#9e9e9e",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            addDataToReceivers(boards);

                                            // setMessageReceiver();
                                            // setMessageReceiver(temp);

                                          }}
                                        >
                                          {boards.name}

                                          <Grid container direction="row">
                                            {boards?.contacts?.profile_images?.map(
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
                                            {boards?.athletes?.profile_images?.length}{" "}
                                            contacts
                                          </p>
                                        </div>
                                      </>
                                        :
                                        null
                                    );

                                  })}
                              </div>
                            </Grid>

                          </TabPanel>
                          <TabPanel className="" value={value} index={1}>

                            <Grid container direction="row" justify="center">
                              {/* /////////////Tab panel for Teams boards//////////// */}

                              <div className="form-group has-search w-100 mt-3">


                                <SearchBar
                                  style={{
                                    boxShadow: 'none',
                                    width: "100%",
                                    // border: "1px solid rgb(216, 216, 216)",
                                    borderRadius: 4,
                                    height: 40,
                                    color: '#888',
                                    background: '#edeef2'
                                  }}
                                  placeholder="Search Team boards"
                                  value={searched}
                                  onChange={(searchVal) => requestSearch(searchVal)}
                                  onCancelSearch={() => cancelSearch()}
                                />
                              </div>
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
                                {rows &&
                                  rows.map((boards) => {
                                    return (
                                      boards.is_shared === true ? <>
                                        <div
                                          style={{
                                            borderTop: "1px solid #edeef2",
                                            width: "100%",
                                            height: 100,
                                            color: "#9e9e9e",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            addDataToReceivers(boards);

                                            // setMessageReceiver();
                                          }}
                                        >
                                          {boards.name}

                                          <Grid container direction="row">
                                            {boards?.contacts?.profile_images?.map(
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
                                            {boards?.athletes?.profile_images?.length}{" "}
                                            contacts
                                          </p>
                                        </div>
                                      </>
                                        :
                                        null
                                    );

                                  })}
                              </div>
                            </Grid>
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <Grid container direction="row" justify="center">
                              {/* /////////////Tab panel for Teams Indvidual//////////// */}

                              <div className="form-group has-search w-100 mt-3">

                                <SearchBar
                                  style={{
                                    boxShadow: 'none',
                                    width: "100%",
                                    // border: "1px solid rgb(216, 216, 216)",
                                    borderRadius: 4,
                                    height: 40,
                                    color: '#888',
                                    background: '#edeef2'
                                  }}
                                  placeholder="Search Individual boards"
                                  value={searched}
                                  onChange={(searchVal) => requestSearch(searchVal)}
                                  onCancelSearch={() => cancelSearch()}
                                />
                              </div>
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
                                {individualrows &&
                                  individualrows.map((indv, ind) => {


                                    return (

                                      <div
                                        key={ind}
                                        style={{

                                          borderTop: "1px solid #edeef2",
                                          width: "100%",
                                          height: 60,
                                          color: "#9e9e9e",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          // const full_name=indv.first_name {indv.last_name}
                                          // const m =(indv.first_name,indv.last_name)
                                          addDataToReceivers(indv);

                                          // setMessageReceiver( indv.first_name,indv.last_name);

                                          // setMessageReceiver();
                                        }}
                                        className="d-flex align-items-center"
                                      >
                                        {/* {indv?.contacts?.profile_images?.map((image,index)=>{
                                            return( */}


                                        <div className="mr-4" >
                                          <img
                                            alt={indv?.first_name}
                                            src={indv.twitter_profile.profile_image || AvatarImg}
                                            style={{
                                              width: 35,
                                              height: 35,
                                              borderRadius: 20,
                                              // marginTop: 5,

                                            }}
                                          ></img>

                                        </div>
                                        {/* )
                                          })} */}

                                        {indv.first_name} {indv.last_name}

                                        {/* {boards?.contacts?.profile_images?.map(
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
                                                  
                                                  }}
                                                ></img>
                                              );
                                            }
                                            }
                                          )} */}
                                        {/* <img></img> */}
                                        {/* <p style={{ color: "#3871da" }}>
            {boards?.athletes?.profile_images?.length}{" "}
            contacts
          </p> */}
                                      </div>


                                    );

                                  })}
                              </div>
                            </Grid>
                          </TabPanel>
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
                  <Grid
                    className="mb-3"
                    container
                    direction="row"
                    // alignItems="center"
                    style={{
                      // background: "#f5f6f9",
                      width: "100%",
                      // minWidth: 1110,


                      height: 70,
                    }}


                  >

                    <div className="d-flex justify-content-between align-items-center w-100">
                      <span

                        style={{
                          fontWeight: "bold",
                          fontSize: 20,

                          padding: '16px'
                        }}
                      >
                        <strong>
                          Create Message


                        </strong>
                      </span>

                      <div className="d-flex ">
                        {/*               <IconTextField
                          width={100}
                          text="More"
                          textColor="#3871DA"
                          icon={
                            <ArrowDropDown
                              style={{ color: "#3871DA" }}
                            ></ArrowDropDown>
                          
                        ></IconTextField>
                        <IconTextField
                          text="Save and Close"
                          textColor="#3871DA"
                          width={180}
                          onClick={() => {
                            setShowMessageFiltersRow(!showMessageFiltersRow);
                          }}
                          icon={<Check style={{ color: "#3871DA" }}></Check>}
                        ></IconTextField>*/}
                        <IconButton
                          text="Preview and Send"
                          textColor="#fff"
                          width={200}
                          background='#3871DA'


                          onClick={() => {


                            { messageType && messageReceiver && messageText && messageSender ? handleSendMessage() : setMessageNotCreated(true) }
                          }}
                          icon={<Send style={{ color: "#fff" }}></Send>}
                        ></IconButton>
                      </div>
                    </div>



                  </Grid>

                  <div
                    style={{
                      width: "100%",
                      maxHeight: 330,
                      marginLeft: '10px'
                      //  minWidth: 1110
                    }}
                    className="fullHeightCreateMessage hideScrollBar"
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
                        // paddingTop: 16,
                      }}
                      className="hoverHighlight d-flex align-items-center"
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
                            // onMouseEnter={() => {
                            //   setDisplayCreateMessage(true);
                            //   setDisplayMessageSenders(false);

                            // }}
                            onClick={() => {
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
                              display: displayCreateMessage === false ? 'none' : 'block',
                            }}
                            onMouseLeave={() => {
                              setDisplayCreateMessage(false);
                            }}
                          >

                            {/* <Grid container alignItems="center" className={classes.messagetypeGrid}  >

                              <Favorite className={classes.messageTypeIcon}
                                style={{ fontSize: 16 }}

                              ></Favorite>

                              <p
                                style={{
                                  // color: "black",
                                  // padding: 16,
                                  marginLeft: 16,
                                  width: "65%",
                                  // background: "#3871da",
                                  // color: "white",
                                  fontWeight: 600,
                                  marginBottom: -4,
                                }}
                              >

                                Set Preffered Channel
                              </p> <CheckCircle style={{ color: 'gray', fontSize: 18 }}></CheckCircle>
                            </Grid> */}
                            {/* <Grid container alignItems="center" className={classes.messagetypeGrid}>


                              <p
                                style={{
                                  marginLeft: 16,

                                  fontSize: '10px',
                                  fontWeight: 300,
                                  marginBottom: -4,
                                }}
                              >

                                *Select a default "Send As" option if a contact does not have a set Prefered Channel
                              </p>
                            </Grid> */}

                            {/* {[
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
                            ]
                              .map((type, i) => {
                                return (
                                  <Grid
                                    container
                                    alignItems="center"
                                    className={classes.messagetypeGrid}
                                    onClick={() => {
                                      setDisplayCreateMessage(true);

                                      setMessageType(type)
                                    }}
                                  >
                                    {type.icon}
                                    <p
                                      style={{
                                        margin: 0,
                                        fontWeight: 600,
                                        marginLeft: 16,
                                        width: "65%"
                                      }}
                                    >
                                      {type.title}
                                    </p>
                                    <CheckCircle style={{ color: 'gray', fontSize: 18 }}></CheckCircle>
                                  </Grid>


                                );
                              })} */}


                            {/* ///////////Twitter Dm section////////////// */}
                            {twitterDm === false ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={() => {
                                  settwitterDm(true)
                                  setPersonalText(false)
                                  setrsText(false)
                                  setMessageType([{
                                    title: ' Twitter Dm',
                                    icon: (<FaTwitter
                                      className={classes.messageTypeIcon}
                                    ></FaTwitter>)
                                  }])
                                  // setMessageType([{
                                  //   title: 'Twitter DM',
                                  //   icon: (<FaTwitter className={classes.messageTypeIcon} ></FaTwitter>)
                                  // }])

                                }}
                              >
                                <FaTwitter
                                  className={classes.messageTypeIcon}
                                ></FaTwitter>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Twitter DM
                                </p>
                                <CheckCircle style={{ color: 'gray', fontSize: 18 }}></CheckCircle>
                              </Grid>
                            </> : twitterDm === true ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                style={{


                                }}
                                onClick={() => {
                                  settwitterDm(false)
                                  setPersonalText(false)
                                  setrsText(false)
                                  setMessageType([{
                                    title: ' Twitter Dm',
                                    icon: (<FaTwitter
                                      className={classes.messageTypeIcon}
                                    ></FaTwitter>)
                                  }])

                                  // setMessageType([{
                                  //   title: 'Twitter DM',
                                  //   icon: (<FaTwitter className={classes.messageTypeIcon} ></FaTwitter>)

                                  // }])
                                }}
                              >
                                <FaTwitter
                                  className={classes.messageTypeIcon}
                                ></FaTwitter>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Twitter DM
                                </p>
                                <CheckCircle style={{ color: 'green', fontSize: 18 }}></CheckCircle>
                              </Grid>

                            </> : null}

                            {/* ///////////Personal Text section////////////// */}

                            {personalText === false ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={() => {
                                  settwitterDm(false)
                                  setPersonalText(true)
                                  setrsText(false)
                                  setMessageType([{
                                    title: ' Personal Text',
                                    icon: (<FaPhone
                                      className={classes.messageTypeIcon}
                                    ></FaPhone>)
                                  }])
                                }}
                              >
                                <FaPhone
                                  className={classes.messageTypeIcon}
                                ></FaPhone>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Personal Text
                                </p>
                                <CheckCircle style={{ color: 'gray', fontSize: 18 }}></CheckCircle>
                              </Grid>
                            </> : personalText === true ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={() => {
                                  settwitterDm(false)
                                  setPersonalText(false)
                                  setrsText(false)
                                  setMessageType([{
                                    title: ' Personal Text',
                                    icon: (<BiSave
                                      className={classes.messageTypeIcon}
                                    ></BiSave>)
                                  }])

                                }}
                              >
                                <FaPhone
                                  className={classes.messageTypeIcon}
                                ></FaPhone>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Personal Text
                                </p>
                                <CheckCircle style={{ color: 'green', fontSize: 18 }}></CheckCircle>
                              </Grid>

                            </> : null}
                            {/* ///////////Rs Text section////////////// */}

                            {rsText === false ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={() => {
                                  settwitterDm(false)
                                  setPersonalText(false)
                                  setrsText(true)

                                  setMessageType([{
                                    title: ' Rs Text',
                                    icon: (<FaComment
                                      className={classes.messageTypeIcon}
                                    ></FaComment>)
                                  }])
                                }}
                              >
                                <FaComment
                                  className={classes.messageTypeIcon}
                                ></FaComment>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Rs Text
                                </p>
                                <CheckCircle style={{ color: 'gray', fontSize: 18 }}></CheckCircle>
                              </Grid>
                            </> : rsText === true ? <>
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={() => {
                                  settwitterDm(false)
                                  setPersonalText(false)
                                  setrsText(false)
                                  setMessageType([{
                                    title: ' Rs Text',
                                    icon: (<FaComment
                                      className={classes.messageTypeIcon}
                                    ></FaComment>)
                                  }])

                                }}
                              >
                                <FaComment
                                  className={classes.messageTypeIcon}
                                ></FaComment>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                    width: "65%"
                                  }}
                                >
                                  Rs Text
                                </p>
                                <CheckCircle style={{ color: 'green', fontSize: 18 }}></CheckCircle>
                              </Grid>

                            </> : null}







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
                      }}
                      className="hoverHighlight d-flex align-items-center"
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
                            onClick={() => {
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
                              setDisplayCreateMessage(false)
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
                            <Grid container direction="row" alignItems="center" className={classes.sendAsP}>
                              <p
                                onClick={
                                  () => {
                                    setFromPositinCoach(false)
                                    setFromAreaCoach(true)
                                  }
                                }
                                style={{ width: '80%', margin: 0 }}
                              >
                                Area Recruiting Coach

                              </p>
                              {
                                fromAreaCoach && <CheckCircle style={{ color: '#2a6447', fontSize: 18 }}></CheckCircle>
                              }

                            </Grid>

                            <div
                              style={{
                                width: "100%",
                                border: "1px solid #d8d8d8",
                              }}
                            ></div>
                            <Grid container direction="row" alignItems="center" className={classes.sendAsP}>
                              <p
                                style={{ width: '80%', margin: 0 }}

                                onClick={
                                  () => {
                                    setFromPositinCoach(true)
                                    setFromAreaCoach(false)
                                  }
                                }
                              >
                                Position Coach
                              </p>
                              {
                                fromPositionCoach && <CheckCircle style={{ color: '#2a6447', fontSize: 18 }}></CheckCircle>
                              }
                            </Grid>

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
                      className="hoverHighlight d-flex align-items-center"
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
                              // setDisplaySendTo(true);
                              { displaySendTo === true ? setDisplaySendTo(false) : displaySendTo === false ? setDisplaySendTo(true) : null }
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
                        // paddingTop: 16,
                      }}
                      className="hoverHighlight d-flex align-items-center"
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
                                marginLeft: time ? -28 : 0,
                                color: displayMessageReceivers
                                  ? "white"
                                  : "black",
                                fontWeight: 400,
                              }}
                            >
                              {time
                                ? moment(date).format('MM/DD/YYYY h:mm a')
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
                      className="hoverHighlight"
                    >
                      <Grid item md={2} xs={2}>

                        <p style={{ margin: 0, marginLeft: 16 }}>Add Media:</p>
                      </Grid>

                      {media &&
                        /* media.map((m) => {
                           return mediaContainer(media[0]);
                         })*/
                        mediaContainer(media[0])

                      }
                      <Grid item container md={10} xs={10}>

                        {media ?
                          <div></div>
                          :
                          <Grid item xs={2.5} md={2.5}
                            container
                            direction="row"
                            style={{
                              marginLeft: 10,
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
                          </Grid>}
                        {" "}
                      </Grid>

                    </Grid>




                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{
                        // background: "#f5f6f9",

                        // minWidth: 1110,
                        border: "1px solid #d8d8d8",
                        borderRadius: 4,
                        height: 100,
                        marginTop: 16,
                        paddingTop: 16,
                      }}
                      className="hoverHighlight focusHighlight"
                      onMouseEnter={() => {
                        setDisplaySnippets(false);
                        setDisplayTextPlaceholders(false);
                      }}
                    >
                      {/* <Grid item md={2} xs={2}> */}
                      <p style={{ marginBottom: 40, marginLeft: 10 }}>
                        Message Text:
                      </p>
                      <div class="dropdown">

                        <textarea
                          type="text"
                          id={"textArea"}
                          style={{
                            border: "none",
                            outline: "none",
                            marginBottom: 10,
                            width: "510%",
                            height: "100%",
                            borderRadius: 4,
                            paddingLeft: 12,
                            resize: "none",
                            overflow: "hidden"
                          }}
                          value={messageText}
                          onChange={(e) => {
                            setMessageText(e.target.value);
                          }}
                          placeholder="Type message"
                        ></textarea>

                      </div>
                      {/* </Grid> */}
                      <Grid item md={12} xs={12} direction >

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
                              title: "[First_Name]",
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
                                  if (
                                    document.getElementById("textArea")
                                      .selectionStart === messageText.length
                                  ) {
                                    setMessageText(messageText + type.title);
                                  } else {
                                    for (
                                      var i = 0;
                                      i < messageText.length;
                                      i++
                                    ) {
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
                                  }
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
                                  if (
                                    document.getElementById("textArea")
                                      .selectionStart === messageText.length
                                  ) {
                                    setMessageText(messageText + type.title);
                                  } else {
                                    for (
                                      var i = 0;
                                      i < messageText.length;
                                      i++
                                    ) {
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
                          {(snippets).map((type) => {
                            return (
                              <Grid
                                container
                                alignItems="center"
                                className={classes.messagetypeGrid}
                                onClick={(e) => {
                                  var newVal = "";
                                  if (
                                    document.getElementById("textArea")
                                      .selectionStart === messageText.length
                                  ) {
                                    setMessageText(messageText + type.content);
                                  } else {
                                    for (
                                      var i = 0;
                                      i < messageText.length;
                                      i++
                                    ) {
                                      newVal = newVal + messageText[i];
                                      if (
                                        i ===
                                        document.getElementById("textArea")
                                          .selectionStart
                                      ) {
                                        newVal = newVal + type.content;
                                      }
                                    }
                                    setMessageText(newVal);
                                  }
                                }}
                              >
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    marginLeft: 16,
                                  }}
                                >
                                  {type.content}
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
                              if (
                                document.getElementById("textArea")
                                  .selectionStart === messageText.length
                              ) {
                                setMessageText(messageText + e.native);
                              } else {
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
                              }
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
                    {/* <div style={{ height: 200, width: "100%" }}></div> */}
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
                              makeMessageSelected(tags.id);
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
  sideTwitterFilter: {
    padding: 5,
    fontWeight: 600,
    fontSize: 15,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 20,
    cursor: "pointer",
    marginLeft: '10px'
  },
  sideMediaFilter: {
    padding: 5,
    fontWeight: 600,
    fontSize: 13,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 5,
    cursor: "pointer",
    marginLeft: '10px'
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
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  tagCross: {
    color: "red",
    fontSize: 17,
    cursor: "pointer",
    marginLeft: 8,
  },
  icons: {
    color: "#d8d8d8",
  },
  dropdownHidden: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: 270,
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
    background: "#edeef2",
    height: 40,
    border: "none",
    color: "#b5b9c0",
  },
  messagetypeGrid: {
    height: 50,
    marginLeft: 0,
    borderBottom: "2px solid #d8d8d8",
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
    cursor: 'pointer',
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
export { useStyles };
export default MessageCreate;
