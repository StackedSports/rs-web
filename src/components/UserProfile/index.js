import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Checkbox,
  TextField,
  Alert as MuiAlert,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import DoughnutChart from "../charts/Doughnut";
import { Picker } from "emoji-mart";
import InputEmoji from "react-input-emoji";
import DoughnutChart from "../charts/DoughnutChartCenterText";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import AmimatedBurger from '../../images/animated_burger.gif';
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

import AccordionContactDetails from 'UI/Forms/Inputs/AccordionContactDetails'
import SearchableOptions from 'UI/Forms/Inputs/SearchableOptions'
import {
  getContact,
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
  updateContact,
  getRanksNew
} from "../../ApiHelper";

import { 
  useContact,
  useTeamMembers,
  useRanks
} from 'Api/Hooks'

import {
  formatPhoneNumber
} from 'utils/Parser'

import useArray from 'Hooks/ArrayHooks'

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
    marginLeft: 5,
    fontWeight: 500,
    width: "100%",
  },
  input: {
    border: "none",
    borderBottom: "1px solid #d8d8d8",
    height: 40,
    marginLeft: 5,
    width: "95%",
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
  accordionGridHeight: {
    height: 56,
  },
}));

// const messages = [
//   {
//     message: "Hy there i am using Recruite Suite",
//     left: true,
//     underText: "6:25pm",
//   },
//   {
//     message:
//       "Hy there i am using Recruite Suite, there i am using Recruite Suite",
//     left: false,
//     underText: "Sent by Chris Highland at 8:25pm",
//   },
//   {
//     message: "Hy there i am using Recruite Suite",
//     left: true,
//     underText: "6:25pm",
//     date: "Wed Mar 17",
//   },
//   {
//     message:
//       "Hy there i am using Recruite Suite, there i am using Recruite Suite",
//     left: true,
//     underText: "6:25pm",
//   },
//   {
//     message:
//       "Hy there i am using Recruite Suite, there i am using Recruite Suite",
//     left: false,
//     underText: "Sent by Chris Highland at 8:25pm",
//   },
//   {
//     message: "Hy there i am using Recruite Suite",
//     left: true,
//     underText: "6:25pm",
//   },
//   {
//     message:
//       "Hy there i am using Recruite Suite, there i am using Recruite Suite",
//     left: true,
//     underText: "6:25pm",
//   },
// ];

const platforms_enum = {
  twitter: "twitter",
  sms: "sms",
  text: "text"
}

const all_platforms = [
  { id: platforms_enum.twitter, name: "Twitter DM" },
  { id: platforms_enum.sms, name: "SMS Text" },
  { id: platforms_enum.text, name: "Personal Text" },
]

const getContactHandle = (contact, platformId) => {
  let handle = "none"

  switch(platformId) {
    case platforms_enum.twitter:
      handle = contact.twitter_profile?.screen_name
      if(!handle)
        handle = "no twitter handle"
      else
        handle = "@" + handle
      break
    case platforms_enum.sms:
    case platforms_enum.text:
      handle = contact.phone
      if(!handle)
        handle = "no phone number"
      else
        handle = formatPhoneNumber(handle)
      break
  }

  return handle
}

function ContactProfile(props) {
  const classes = useStyles();

  const contactId = useRef(props.match.params.id)

  // Contact
  const contact = useContact(contactId.current)
  const [contactGeneral, setContactGeneral] = useState(null)
  const [contactGeneralSaved, setContactGeneralSaved] = useState(false)
  const [contactDetails, setContactDetails] = useState(null)
  const [contactCoaches, setContactCoaches] = useState(null)
  const [contactPositions, setContactPositions] = useState(null)
  const [contactRelationships, setContactRelationships] = useState(null)
  const [contactOpponents, setContactOpponents] = useState(null)
  const [contactExternal, setContactExternal] = useState(null)
  const [contactTags, setContactTags] = useState(null)

  // Details
  const teamMembers = useTeamMembers()  
  const ranks = useRanks().items

  console.log(ranks)

  // Details Inputs
  const [positionCoach, setPositionCoach] = useArray()
  const [searchedPositionCoaches, setSearchedPositionCoaches] = useArray(teamMembers.items)
  const [areaCoach, setAreaCoach] = useArray()
  const [searchedAreaCoaches, setSearchedAreaCoaches] = useArray(teamMembers.items)
  const [coordinator, setCoordinator] = useArray()
  const [searchedCoordinator, setSearchedCoordinator] = useArray(teamMembers.items)



  // Visibility 
  const [areaCoachDropdownVisible, setAreaCoachDropdownVisible] = useState(false)
  const [coordinatorDropdownVisible, setCoordinatorDropdownVisible] = useState(false)

  // Messaging
  const [platforms, setPlatforms] = useState([])
  const [platformSelected, setPlatformSelected] = useState(null)
  const [messages, setMessages] = useState([])


  // console.log("This is logged in user", localStorage.getItem("user"));
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [loggedInUserStats, setLoggedInUserStats] = useState(null);
  const [currency, setCurrency] = React.useState("This Month");
  const [contacts, setContacts] = useState(null);
  const [messageText, setMessageText] = useState("");

  const [allTags, setAllTags] = useState(null);
  const [allRanks, setAllRanks] = useState(null);
  const [allBoards, setAllBoards] = useState(null);
  const [positions, setAllPositions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayEmojiSelect, setDisplayEmojiSelect] = useState(false);

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

  useEffect(() => {
    if(!contact)
      return

    const getPlatforms = (contact) => {
        let plat = []
  
        if(contact.twitter_profile && contact.twitter_profile.screen_name)
          plat.push(all_platforms[0])
        
        if(contact.phone) {
          plat.push(all_platforms[1])
          plat.push(all_platforms[2])
        }
  
        return plat
    }
  
    const setContactEdit = (contact) => {
      console.log(contact)
        setContactGeneral({
          first_name: contact.first_name,
          last_name: contact.last_name,
          nick_name: contact.nick_name,
          phone: contact.phone,
          email: contact.email,
          twitter_handle: contact.twitter_profile?.screen_name
        })
  
        setContactDetails({
          graduation_year: contact.grad_year,
          high_school: contact.high_school,
          state: contact.state,
          status: contact.status,
          rank: contact.rank,
          // timezone: contact.timezone,
        })
  
        setContactCoaches({
          area_coach: contact.area_coach,
          position_coach: contact.position_coach,
        })
  
        setContactPositions({
          positions: contact.positions,
        })
  
        setContactRelationships({
          relationships: contact.relationships
        })
  
        setContactOpponents({
          opponents: contact.opponents
        })
  
        setContactExternal({
          hudl: contact.hudl,
          // armsid: contact.armsid
        })
        
        setContactTags({
          tags: contact.tags
        })
    }

    setContactEdit(contact)

    let platforms = getPlatforms(contact)

    setPlatforms(platforms)
    setPlatformSelected(platforms[0])

  }, [contact])

  

  const myMonthlyStats = () => {
    // || "2020-12-13"
    setLoading(true);
    getMonthlyStats().then(
      (res) => {
        if (res.statusText === "OK") {
          console.log("This is the monthlly stats");
          console.log(res.data)
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

  const onContactInfoChange = (type, e) => {
    let info, set;

    switch(type) {
      case 'general':
        info = contactGeneral
        set = setContactGeneral
        break
      case 'details':
        info = contactDetails
        set = setContactDetails
        break
      case 'coaches':
        info = contactCoaches
        set = setContactCoaches
        break
      case 'positions':
        info = contactPositions
        set = setContactPositions
        break
      case 'relationships':
        info = contactRelationships
        set = setContactRelationships
        break
      case 'opponents':
        info = contactOpponents
        set = setContactOpponents
        break
      case 'external':
        info = contactExternal
        set = setContactExternal
        break
      case 'tags':
        info = contactTags
        set = setContactTags
        break
    }

    set({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const onSaveContactInfo = (type) => {
    let info

    switch(type) {
      case 'general':
        info = contactGeneral
        break
      case 'details':
        info = contactDetails
        break
      case 'coaches':
        info = contactCoaches
        break
      case 'positions':
        info = contactPositions
        break
      case 'relationships':
        info = contactRelationships
        break
      case 'opponents':
        info = contactOpponents
        break
      case 'external':
        info = contactExternal
        break
      case 'tags':
        info = contactTags
        break
    }

    //if(type === 'details') {
    info = {
        first_name: info.first_name,
        last_name: info.last_name,
        // nick_name: info.nick_name
        // graduation_year: info.graduation_year,
        // // high_school: info.high_school,
        // // state: info.state,
        // // status_id: contactDetails.status.id,
        //rank_id: parseInt(info.rank)
        // rank: rank value
    }
   // }

    //  {id: 29, rank: '1'}
    //  {id: 30, rank: '2'}
    //  {id: 110, rank: '3'}
    //  {id: 111, rank: '4'}

    updateContact(contact.id, info)
      .then(res => {
        console.log("update contact " + type + " success")
        console.log(res)

        setContactGeneralSaved(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onCoachInputChange = (input, type) => {
    const filterFunc = (member) => {
      console.log(member)
      console.log(input)
      return member.first_name.includes(input)
    }
    //const filterFunc = (member) => (`${member.first_name} ${member.last_name}`).includes(input)

    if(type === 'position') {
      //console.log('filtering ' + input)
      setSearchedPositionCoaches.filter(filterFunc)
    } else if(type === 'area') {
      //console.log('filtering ' + input)
      searchedAreaCoaches.filter(filterFunc)
    } else if(type === 'coordinator') {
      //console.log('filtering ' + input)
      searchedCoordinator.filter(filterFunc)
    }
  }

  const onCoachOptionSelected = (coach, type) => {


    let info = {}
    let set = () => {}

    if(type === 'position') {
      info = {
        position_coach_id: coach.id
      }
      set = setPositionCoach

    } else if(type === 'area') {
      info = {
        recruiting_coach_id: coach.id
      }
      set = setAreaCoach

    } else if(type === 'coordinator') {
      info = {
        coordinator_id: coach.id
      }
      set = setAreaCoach
    }

    console.log(info)

    updateContact(contact.id, info)
      .then(res => {
        console.log("update contact " + type + " success")
        console.log(res)

        set.all([coach])
        //setContactGeneralSaved(true)
      })
      .catch(error => {
        console.log(error)
      })
  }




  if (localStorage.getItem("user")) {
  } else {
    window.location.href = "/";
  }
  

  const onPlatformClick = (platformIndex) => {
    setPlatformSelected(platforms[platformIndex])
  }  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  let coachesAccordionHeight = null

  // areaCoachDropdownVisible coordinatorDropdownVisible
  if(areaCoachDropdownVisible) coachesAccordionHeight = 420
  if(coordinatorDropdownVisible) coachesAccordionHeight = 520


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

        <div
          style={{
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: 5,
            // padding: 10,
            // paddingLeft: 30,
            // paddingRight: 30,
          }}
        >
          <div
            style={{
              width: "100%",
              // border: "1px solid #f8f8f8",
              marginTop: 10,
            }}
          ></div>

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
              className="fullHeightMessagesOuterDiv hideScrollBar"
              id="infinit"
            >
              <Grid container direction="row">
                <Grid item md={3} sm={3}>
                  <div
                    className="hideScrollBar"
                    style={{
                      maxHeight: "calc( 100vh - 160px )",
                      overflow: "scroll",
                    }}
                  >
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

                        <img src={AmimatedBurger} onClick={(e) => {
                          //setshowSideFilters(!showSideFilters);
                          // TODO: go back
                          props.history.goBack()
                        }}
                          style={{ cursor: "pointer", width: 40 }}></img>

                      </div>

                      {/*****************************************************************/}
                      {/********************* SIDE PANEL START **************************/}
                      {/*****************************************************************/}

                      {/* <Grid
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
                      </Grid> */}

                      <Accordion
                        style={{ width: "100%", marginTop: 5, marginLeft: 0, marginRight: 0 }}
                      >
                        <AccordionContactDetails
                          eventKey='101'
                          label='General'
                          items={[
                            { label: 'First Name', name: 'first_name', value: contactGeneral?.first_name },
                            { label: 'Last Name', name: 'last_name', value: contactGeneral?.last_name },
                            { label: 'Nick Name', name: 'nick_name', value: contactGeneral?.nick_name },
                            { label: 'Phone Number', name: 'phone', value: contactGeneral?.phone },
                            { label: 'Email', name: 'email', value: contactGeneral?.email },
                            { label: 'Twitter Handle', name: 'twitter_handle', value: contactGeneral?.twitter_handle },
                          ]}
                          onChange={(e) => onContactInfoChange('general', e)}
                          onSave={() => onSaveContactInfo('general')}
                          saved={contactGeneralSaved}
                        />
                        <AccordionContactDetails
                          eventKey='102'
                          label='Details'
                          items={[
                            { label: 'Graduation Year', name: 'graduation_year', value: contactDetails?.graduation_year },
                            { label: 'Current School', name: 'high_school', value: contactDetails?.high_school },
                            { label: 'State', name: 'state', value: contactDetails?.state },
                            // { label: 'Status', name: 'state', value: contactDetails?.state },
                            { label: 'Status', name: 'status', value: contactDetails?.status?.status },
                            { label: 'Rank', name: 'rank', value: contactDetails?.rank?.rank },
                            // { label: 'Timezone', name: 'timezone', value: contactDetails?.timezone },
                          ]}
                          onChange={(e) => onContactInfoChange('details', e)}
                          onSave={() => onSaveContactInfo('details')}
                          saved={contactGeneralSaved}
                        />
                        <AccordionContactDetails
                          height={coachesAccordionHeight}
                          eventKey='103'
                          label='Coaches'
                          onChange={(e) => onContactInfoChange('coaches', e)}
                          onSave={() => onSaveContactInfo('coaches')}
                          saved={contactGeneralSaved}
                        >
                          <AccordionContactDetails.Label label='Position Coach'/>
                          
                          <SearchableOptions  noBorderOnSelected
                            canSelectMoreOptions={positionCoach.length < 1}
                            selection={positionCoach}
                            selectedNameDef={['first_name', 'last_name']}
                            selectedImgDef={'twitter_profile.profile_image'}
                            optionNameDef={['first_name', 'last_name']}
                            optionImgDef={'twitter_profile.profile_image'}
                            placeholder='+ Add Position Coach'
                            options={teamMembers.items}
                            search={searchedPositionCoaches}
                            onInputChange={(input) => onCoachInputChange(input, 'position')}
                            onInputPressEnter={() => {}}
                            onOptionSelected={(coach, index) => onCoachOptionSelected(coach, 'position')}
                            onRemoveSelected={(coach, index) =>  setPositionCoach.clear()}
                          />

                          <div style={{marginBottom: 20}}></div>

                          <AccordionContactDetails.Label label='Area Coach'/>
                          
                          <SearchableOptions  noBorderOnSelected
                            canSelectMoreOptions={areaCoach.length < 1}
                            selection={areaCoach}
                            selectedNameDef={['first_name', 'last_name']}
                            selectedImgDef={'twitter_profile.profile_image'}
                            optionNameDef={['first_name', 'last_name']}
                            optionImgDef={'twitter_profile.profile_image'}
                            placeholder='+ Add Area Coach'
                            options={teamMembers.items}
                            search={searchedAreaCoaches}
                            onInputChange={(input) => onCoachInputChange(input, 'area')}
                            onInputPressEnter={() => {}}
                            onOptionSelected={(coach, index) => onCoachOptionSelected(coach, 'area')}
                            onRemoveSelected={(owner, index) =>  setAreaCoach.clear()}
                            onDropDownVisibilityChange={(visible) => setAreaCoachDropdownVisible(visible)}
                            // onShowDropDown={() => setDisplayPositionCoach(true)}
                          />

                          <div style={{marginBottom: 20}}></div>

                          <AccordionContactDetails.Label label='Coordinator'/>
                          
                          <SearchableOptions
                            noBorderOnSelected
                            canSelectMoreOptions={coordinator.length < 1}
                            selection={coordinator}
                            selectedNameDef={['first_name', 'last_name']}
                            selectedImgDef={'twitter_profile.profile_image'}
                            optionNameDef={['first_name', 'last_name']}
                            optionImgDef={'twitter_profile.profile_image'}
                            placeholder='+ Add Coordinator'
                            options={teamMembers.items}
                            search={searchedCoordinator}
                            onInputChange={(input) => onCoachInputChange(input, 'coordinator')}
                            onInputPressEnter={() => {}}
                            onOptionSelected={(coach, index) => onCoachOptionSelected(coach, 'coordinator')}
                            onRemoveSelected={(coach, index) =>  setCoordinator.clear()}
                            onDropDownVisibilityChange={(visible) => setCoordinatorDropdownVisible(visible)}
                            // onShowDropDown={() => setDisplayPositionCoach(true)}
                          />
                        </AccordionContactDetails>

                        <AccordionContactDetails
                          eventKey='104'
                          label='Positions'
                          items={[
                            { label: 'Offense', name: 'offense', value: '' },
                            { label: 'Defense', name: 'defense', value: '' },
                          ]}
                          onChange={(e) => onContactInfoChange('positions', e)}
                          onSave={() => onSaveContactInfo('positions')}
                          saved={contactGeneralSaved}
                        />

                        <AccordionContactDetails
                          eventKey='105'
                          label='Family & Relationships'
                          items={[
                            { label: 'People', name: 'relationships', value: '' },
                          ]}
                          onChange={(e) => onContactInfoChange('relationships', e)}
                          onSave={() => onSaveContactInfo('relationships')}
                          saved={contactGeneralSaved}
                        />

                        <AccordionContactDetails
                          eventKey='106'
                          label='Opponents'
                          items={[
                            { label: 'Opponents', name: 'opponents', value: '' },
                          ]}
                          onChange={(e) => onContactInfoChange('opponents', e)}
                          onSave={() => onSaveContactInfo('opponents')}
                          saved={contactGeneralSaved}
                        />

                        <AccordionContactDetails
                          eventKey='107'
                          label='External Profiles'
                          items={[
                            { label: 'Hudl', name: 'hudl', value: contactExternal?.hudl },
                            { label: 'ARMS ID', name: 'arms_id', value: '' }
                          ]}
                          onChange={(e) => onContactInfoChange('external', e)}
                          onSave={() => onSaveContactInfo('external')}
                          saved={contactGeneralSaved}
                        />

                        <AccordionContactDetails
                          eventKey='109'
                          label='Tags'
                          items={[
                            { label: 'Tags', name: 'tags', value: '' },
                          ]}
                          onChange={(e) => onContactInfoChange('tags', e)}
                          onSave={() => onSaveContactInfo('tags')}
                          saved={contactGeneralSaved}
                        />

                        <AccordionContactDetails
                          eventKey='110'
                          label='Actions'
                          items={[
                            { label: 'Archive', name: 'opponents', value: '' },
                          ]}
                          onChange={(e) => onContactInfoChange('coaches', e)}
                          onSave={() => onSaveContactInfo('coaches')}
                          saved={contactGeneralSaved}
                        />

                      </Accordion>

                      {/*****************************************************************/}
                      {/********************* SIDE PANEL END ****************************/}
                      {/*****************************************************************/}

                    </Grid>
                  </div>
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
                          
                          text={
                            <Grid container direction="row" alignItems="center">
                              <img
                                src={contact && contact.twitter_profile?.profile_image ? 
                                  contact.twitter_profile.profile_image 
                                  : AvatarImg}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 25,
                                  marginRight: 5,
                                }}
                              ></img>
                              <p style={{ color: "black", margin: 0 }}>
                                {contact && (contact.first_name + " " + contact.last_name)}
                                <span style={{ color: "gray", marginLeft: 10 }}>
                                  {platforms.length == 0 && 'Contact has no messaging platform'}
                                  {contact && platformSelected && getContactHandle(contact, platformSelected.id)}
                                </span>
                              </p>
                            </Grid>
                          }
                          icon={
                            <ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon>
                          }
                        ></IconTextField>
                        {platforms.length > 0 && 
                          <div class="dropdown-contact-profile">
                            {platforms.map((platform, index) => {
                              return (
                                <p key={platform.id}
                                  style={{ color: "black", margin: 12 }}
                                  onClick={() => onPlatformClick(index)}  
                                >
                                  {platform.name}
                                </p>
                              )
                            })}
                          </div>
                        }
                      </div>
                    </div>

                    {/*****************************************************************/}
                    {/********************* MESSAGE PANEL START ***********************/}
                    {/*****************************************************************/}

                    <div
                      style={{
                        width: "100%",
                        maxHeight: 380,
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

                    {/*****************************************************************/}
                    {/********************* MESSAGE PANEL END *************************/}
                    {/*****************************************************************/}

                    {/*****************************************************************/}
                    {/********************* TEXT SEND START ***************************/}
                    {/*****************************************************************/}

                    <Grid
                      container
                      direction="row"
                      style={{ borderRadius: 5, marginTop: 10 }}
                      alignItems="center"
                    >
                      <Grid
                        item
                        md={10}
                        sm={10}
                        lg={10}
                        xl={10}
                        sm={10}
                        xs={10}
                      >
                        <Grid style={{ background: "white", borderRadius: 5 }}>
                          {/* {image && (
                <img
                  style={{ width: 100, height: 100 }}
                  src={URL.createObjectURL(image)}
                ></img>
              )} */}
                          <textarea
                            style={{
                              width: "90%",
                              borderRadius: 5,
                              // height: 50,
                              border: "none",
                              resize: "none",
                              padding: 16,
                            }}
                            placeholder="Type Message to send"
                            onChange={(e) => {
                              setMessageText(e.target.value);
                            }}
                            value={messageText}
                          ></textarea>
                        </Grid>
                      </Grid>
                      <Grid item md={2} sm={2} lg={2} xl={2} sm={2} xs={2}>
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
                          <div
                            onClick={() => {
                              setDisplayEmojiSelect(true);
                            }}
                            style={{
                              fontSize: 25,
                              marginLeft: 20,
                              cursor: "pointer",
                            }}
                          >
                            😀
                          </div>{" "}
                          <div class="dropdown" style={{ marginLeft: 20 }}>
                            <div
                              // class="dropdown-content"
                              className={classes.dropdownHidden}
                              style={{
                                marginLeft: -50,
                                marginTop: -450,
                                display: displayEmojiSelect ? "block" : "none",
                              }}
                              onMouseLeave={() => {
                                setDisplayEmojiSelect(false);
                              }}
                            >
                              <Picker
                                set="apple"
                                onSelect={(e) => {
                                  console.log("This si ", e.native);
                                  setMessageText(messageText + e.native);
                                }}
                              />
                            </div>
                          </div>
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

                    {/*****************************************************************/}
                    {/********************* TEXT SEND END *****************************/}
                    {/*****************************************************************/}
                  </Grid>
                </Grid>

                {/*****************************************************************/}
                {/********************* MESSAGE STATS START ***********************/}
                {/*****************************************************************/}

                <Grid item md={3} sm={3}>
                  <div
                    className="hideScrollBar"
                    style={{
                      maxHeight: "calc( 100vh - 160px )",
                      overflow: "scroll",
                    }}
                  >
                    <Grid container direction="row" style={{}}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
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
                            marginLeft: 16,
                            fontWeight: 600,
                            width: "75%",
                          }}
                        >
                          Message Stats
                        </p>
                        <Autorenew style={{ marginRight: 16 }}></Autorenew>
                      </Grid>
                      {loggedInUserStats != null ? (
                        <DoughnutChart data={loggedInUserStats} />
                      ) : (
                        <Grid container direction="row" justify="center">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
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
                                  {loggedInUserStats
                                    ? loggedInUserStats.dms
                                    : 0}
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
                                <p className={classes.sideText}>
                                  Personal Text
                                </p>
                                <p
                                  style={{
                                    color: "#ec4c47",
                                    fontSize: 28,
                                    fontWeight: 700,
                                  }}
                                >
                                  {loggedInUserStats
                                    ? loggedInUserStats.pts
                                    : 0}
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
                                  {loggedInUserStats
                                    ? loggedInUserStats.rst
                                    : 0}
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
                                      } else if (
                                        option.label === "Last Month"
                                      ) {
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

                      {/*****************************************************************/}
                      {/********************* MEDIA DETAILS START ***********************/}
                      {/*****************************************************************/}

                      <Grid
                        container
                        style={{
                          borderBottom: "2px solid #f8f8f8",
                          borderTop: "2px solid #f8f8f8",
                          width: "100%",
                          height: 50,
                        }}
                        alignItems="center"
                        justify="space-between"
                      >
                        <p
                          style={{
                            color: "black",
                            margin: 0,
                            marginLeft: 16,
                            fontWeight: 600,
                            width: "75%",
                          }}
                        >
                          Sent Media
                        </p>
                        <Autorenew style={{ marginRight: 16 }}></Autorenew>
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
                        justify="space-between"
                        alignItems="center"
                      >
                        <p
                          style={{
                            color: "black",
                            margin: 0,
                            marginLeft: 16,
                            fontWeight: 600,
                            width: "75%",
                          }}
                        >
                          Associated Media
                        </p>
                        <Autorenew style={{ marginRight: 16 }}></Autorenew>
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

                      {/*****************************************************************/}
                      {/********************* MEDIA DETAILS END *************************/}
                      {/*****************************************************************/}

                    </Grid>
                  </div>
                </Grid>
              </Grid>

              {/*****************************************************************/}
              {/********************* MESSAGE STATS END *************************/}
              {/*****************************************************************/}

            </div>
          </div>
          <Grid container direction="row" alignItems="center"></Grid>
        </div>
      </Grid>

      {/*****************************************************************/}
      {/********************* DIALOG BOX START **************************/}
      {/*****************************************************************/}

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

      {/*****************************************************************/}
      {/********************* DIALOG BOX END ****************************/}
      {/*****************************************************************/}

    </DarkContainer>
  );
}

export default ContactProfile;
