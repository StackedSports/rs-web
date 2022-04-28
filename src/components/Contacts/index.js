import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Checkbox,
  TextField,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Form,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl
} from "@material-ui/core";
import { addDays } from "date-fns";


// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

import DatePicker from "react-date-picker";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackwardIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { DateRangePicker } from "react-date-range";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

import { FaMarker, FaSlidersH } from "react-icons/fa";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AmimatedBurger from '../../images/animated_burger.gif';
import DrawerAnimation from '../../images/drawer_animation.gif';
import BackAnimation from '../../images/back_animation.gif';
import BackIcon from '../../images/back.png';
import DrawerIcon from '../../images/drawer_contact.png';
import { NavLink, Redirect } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import RowingIcon from "@material-ui/icons/Rowing";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import AvatarImg from "../../images/avatar.png";
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
import { useFormik } from "formik";
import * as yup from "yup";
import DialogBox from "../common/Dialogs";
import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import {
  addTagstoContacts,
  archiveContactEnd,
  createBoardFilter,
  filterContacts,
  getAllContacts,
  getBoardFiltersById,
  getContact,
  removeTagsFromContacts,
} from "../../ApiHelper";
import { SelectAll } from "@material-ui/icons";
import { useContact, useMyContacts, useRanks, useStatus, useGradYears, useBoards, usePositions, useAllColumns, useTeamContact, useTagWithContact, useTags, useTagsWithContacts } from "../../Api/Hooks";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//Data
const initialValues = {
  boardName: "",
  isShared: ""
};
const validationSchema = yup.object({
  boardName: yup
    .string("Enter Board name")
    .required("Board Name is required"),

});
// const useStyles2 = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(4),
    outline: "none"
  },
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
  contactsRow: {
    border: "1px solid #d8d8d8",
    borderBottom: "none",
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    minWidth: 1110,
    "&:hover": {
      background: "#ebebeb",
    },
  },
  contactsColumnCheckbox: {
    // "&:after": {
    color: '#3871DA'
    // },

  },
  padding: {
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}));


function Home(props) {
  const classes = useStyles();
  const [filter, setFilter] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
  const [selectedCheckBoxesForTags, setselectedCheckBoxesForTags] = useState([]);
  const [alertValue, setalertValue] = useState('');
  const [uselessState, setuseLessState] = useState(0);
  const [showFiltersRow, setShowFiltersRow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [showSideFilters, setshowSideFilters] = useState(true);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [showRemoveTagsDialog, setshowRemoveTagsDialog] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [boardsById, setBordsById] = useState();
  const [showBoardFilters, setshowBoardFilters] = useState(true);
  const [showSideSubFilters, setshowSubSideFilters] = useState(false);
  const [filterBar, setFilterBar] = useState("This Month");
  const [stateSearch, setStateSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [isBoardContact, setIsBoardContact] = useState(false);
  const [contacttags, setcontacttags] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [rankFilter, setRankFilter] = useState(null);
  const [gradeYearFilter, setGradeYearFilter] = useState(null);
  const [timeZoneFilter, setTimeZoneFilter] = useState(null);
  const [FilterObj, setFilterObj] = useState(null);


  const [stateFilter, setStateFilter] = useState(null);
  const [dobstate, setdobstate] = useState(null);
  const [boardCount, setboardCount] = useState(0);
  const [modalData, setData] = useState();
  const [positionFilter, setPositionFilter] = useState(null);
  const [coachFilter, setCoachFilter] = useState(null);
  const [areacoachFilter, setareacoachFilter] = useState(null);
  const [status_2Filter, setstatus_2Filter] = useState(null);


  const [boardFilter, setBoardFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);
  const [dobFilter, setDobFilter] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [allcontacts, setAllContacts] = useState(null);
  const [copyContacts, setCopyContacts] = useState(null);
  const [allColumns, setAllColumns] = useState(null);
  const [handlescroll, sethandlescroll] = useState(true)
  const [page, setPage] = useState(1);
  const [showDrawer, setShowDrawer] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showFilterButton, setShowFilterButton] = useState(false)
  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  const [openerrSnakBar, setopenerrSnakBar] = React.useState(false);
  const [open, setOpen] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [value, onChange] = useState(new Date());
  const [displayRangeCalendar, setDisplayRageCalendar] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // Pagination
  const [pagination, setPagination] = useState({
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0
  })
  const mycode = useMyContacts(page)
  console.log(mycode, 'mycode')
  const totalContacts = 0
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

  const history = useHistory()



  const handleClick = () => {
    setOpenSnackBar(true);
  };
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `50%`,
      transform: `translate(-${top}%, -50%)`
    };
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenerrSnakBar(false)
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

  const TagstoContacts = async () => {
    setalertValue(`${selectedCheckBoxes.length + " "} contacts have been tagged`)

    // var tagsid={
    //   tag_ids:selectedCheckBoxesForTags
    // }
    var tagsid = {
      "contact": {
        tag_ids: selectedCheckBoxesForTags
      }
    }
    try {

      let res = await selectedCheckBoxes.map((id) => { addTagstoContacts(id, tagsid) });
      console.log(selectedCheckBoxesForTags, 'id,selectedCheckBoxesForTags')
      console.log("addtags", res)

      setOpenSnackBar(true);


      // const ress= await updateMedia(addOwner)
      //    console.log("addOwner",ress)
    }
    catch (e) {
      console.log("erroraddtags", e)
      setopenerrSnakBar(true)

    }

    //setShowBackButton(false);
    //handleSelectedPlaceHolder(null, false, false, true);
    //setShowMediaStats(false);
    //props.props.history.push('/media');
    //notify("Media saved successfully")
    setOpenSnackBar(true);

  }
  // const getContactsByid = async () => {
  //   setFetching(true)
  //   selectedCheckBoxes.map((id) => {
  //     getContact(id).then((res) => {

  //       setcontacttags(res.tags)

  //       console.log(res, 'response with contacts by id')


  //       setFetching(false)



  //     }, (error) => {
  //       console.log("this is error get contact by id", error);
  //     })
  //   });
  // }


  const removeTags = async () => {
    // setalertValue('')
    setalertValue(`${selectedCheckBoxes.length + " "} contacts have been un tagged`)


    // var tagsid={
    //   tag_ids:selectedCheckBoxesForTags
    // }
    var tagsid = {
      "contact": {
        tag_ids: selectedCheckBoxesForTags
      }
    }
    try {

      let res = await selectedCheckBoxes.map((id) => { removeTagsFromContacts(id, tagsid) });
      console.log(selectedCheckBoxesForTags, 'id,selectedCheckBoxesForTags')
      console.log("addtags", res)

      setOpenSnackBar(true);


      // const ress= await updateMedia(addOwner)
      //    console.log("addOwner",ress)
    }
    catch (e) {
      console.log("erroraddtags", e)
      setopenerrSnakBar(true);

    }

    //setShowBackButton(false);
    //handleSelectedPlaceHolder(null, false, false, true);
    //setShowMediaStats(false);
    //props.props.history.push('/media');
    //notify("Media saved successfully")
    setOpenSnackBar(true);
    // var tagsid={
    //   tag_ids:selectedCheckBoxesForTags
    // }



  }

  // Date picker for filter 
  const CalendarFilter = () => {
    return (
      <div class="dropdown" onMouseLeave={() => {
        setDisplayRageCalendar(false);

      }}>
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
          onClick={(e) => {
            setDisplayRageCalendar(true);
            e.stopPropagation()
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
              "-" +
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

        // setDisplayRageCalendar(false);

        >
          <Grid style={{}}>
            {/* <DateRange
      minDate={addDays(new Date(), -30)}
      maxDate={addDays(new Date(), 30)}
    ></DateRange> */}
            <DateRangePicker
              onChange={(item) => {
                setState([item.selection])

                const value = new moment(item.startDate).format("MM-DD-YYYY")
                  + ',' +
                  new moment(item.endDate).format("MM-DD-YYYY");

                addDataToFilter(value, "dob", item.selection)
                AddFilterContacts(value, item.selection)

                // if (dobFilter === 'dob') {
                //   setDobFilter(null);
                //   addDataToFilter(option.label);


                //   filter.map((filt, index) => {


                //     AddFilterContacts( filter)
                //     console.log(filter, "filter object 2", filterType[index])

                //   })



                // } else {
                //   addDataToFilter(option.label, "status");

                //   filter.map((filt, index) => {
                //     console.log(filter, "filter object 2", filterType)
                //     if (filterType[index] === 'status') {

                //       AddFilterContacts()
                //     }
                //   })



                // }

              }}
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
  // save as Board Modal
  const SaveBoardModal = () => {
    const formik = useFormik({
      initialValues: {
        boardName: "",
        // password: "",
        isshared: false
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setalertValue(`Board has been Created`)

        var obj = {
          "filter": {
            name: values.boardName,
            is_shared: values.isshared,
            criteria: FilterObj.criteria,

          }
        }

        // createBoardFilter
        // setalertValue('un tagged')

        // var tagsid={
        //   tag_ids:selectedCheckBoxesForTags
        // }

        try {

          let res = await createBoardFilter(obj);



          // const ress= await updateMedia(addOwner)
          console.log("addOwner", res)
        }
        catch (e) {
          setopenerrSnakBar(true);
          console.log("erroraddtags", e)

        }

        //setShowBackButton(false);
        //handleSelectedPlaceHolder(null, false, false, true);
        //setShowMediaStats(false);
        //props.props.history.push('/media');
        //notify("Media saved successfully")
        setOpenSnackBar(true);
        // var tagsid={
        //   tag_ids:selectedCheckBoxesForTags
        // }

        // var temp = []
        // temp.push(values)
        // // var arr = [...temp, ...FilterObj]
        // var arr = values.concat(FilterObj)
        // // arr.push(values)
        // // arr.push(FilterObj)
        console.log("value of form and contacts", obj)


        handleCloseModal()
      }
    });
    return (


      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paper}>

          <div className={classes.padding}>
            <CardHeader title="Create Board"></CardHeader>


            <div>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="boardName"
                  name="boardName"
                  variant="outlined"
                  label="Board Name"
                  style={{ marginBottom: "1rem" }}
                  value={formik.values.boardName}
                  onChange={formik.handleChange}
                  error={formik.touched.boardName && Boolean(formik.errors.boardName)}
                  helperText={formik.touched.boardName && formik.errors.boardName}
                />

                <FormLabel component="legend">Is Shared</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue='false'
                  value={formik.values.isShared}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                </RadioGroup>
                <div className="d-flex align-items-center justify-content-between">
                  <Button color="primary" variant="contained" type="submit">
                    Submit
                  </Button>
                  <Button onClick={handleCloseModal} color="danger" variant="contained" >
                    Cancel
                  </Button>
                </div>


              </form>
            </div>
          </div>




          {/* <Grid >
            <div className={classes.padding}>
              <CardHeader title="Create Board"></CardHeader>
              <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >


                <CardContent>
                  <Grid item container spacing={1} justify="center">
                    <Grid

                      item xs={12} sm={12} md={12}>
                      <Field
                        // height={40}
                        label="Board Name"
                        variant="outlined"
                        fullWidth
                        name="boardName"
                        onChange={handleChange=()=>{e.target.value}}
                        value={values.boardName}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div id="my-radio-group">is Shared</div>
                      <div role="group" aria-labelledby="my-radio-group">
                        <label className="mr-5">
                          <Field type="radio" name="isShared" value="true" />
                          yes
                        </label>
                        <label >
                          <Field
                            type="radio"
                            name="isShared"
                            value="false"
                            checked
                          />
                          no
                        </label>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <div className="w-100">

                    <div className="d-flex justify-content-between align-items-center">

                      <IconTextField
                        // width={50}

                        text="Cancel "
                        textColor="white"
                        background="#FF0000"

                        onClick={() => {
                          setOpen(false)
                        }}
                      ></IconTextField>
                      <div>
                        <Button
                          variant="contained"
                          // color="primary"
                          type="Submit"
                          className={classes.button}
                        >
                          Create Board
                        </Button>
                      </div>






                    </div>
                  </div>

                </CardActions>

              </Form>
            </div>
          </Grid> */}


          {/* <SimpleModal /> */}
        </div>
      </Modal>
    )


  };
  const getMyContacts = (page) => {
    // setLoading(true);
    // if(!pagination.currentPage===pagination.totalPages){}
    setFetching(true);
    // setContacts(null)
    console.log("This is the date", page);
    // || "2020-12-13"
    getAllContacts(page).then(
      (res) => {
        console.log(res.headers['current-page'], "THis is all contacts res", res.headers['total-pages'], res);

        if (res.statusText === "OK") {
          if (res.headers.currentPage === res.headers.totalPages) {
            setFetching(false)
          }
          var temp = Object.assign([], contacts);
          temp = temp.concat(res.data);

          console.log("*********** CONTACTS **********")
          console.log(res)
          console.log("*********** CONTACTS **********")


          setPagination({
            totalItems: res.headers['total-count'],
            itemsPerPage: res.headers['page-items'],
            totalPages: res.headers['total-pages'],
            currentPage: res.headers['current-page']
          })

          // temp.push(res.data);
          setContacts(temp);
          // setCopyContacts(temp);
          setuseLessState(uselessState + 1);
          console.log("These are all new contacts", contacts);


          // document.getElementById("infinit").scrollTop = 0;
          setFetching(false);
        } else {

          //console.log("These are all contacts", res.data);

          //setContacts(res.data);
          //setCopyContacts(res.data);

          if (document.getElementById("infinit")) {
            document.getElementById("infinit").scrollTop = 0;
          }

          console.log("These are all contacts", contacts);
          setFetching(false);
          // if (page > 1) {

          // } else {

          // }
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

  const handleOpen = () => {
    setOpen(true);

  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  // Filter Contacts
  const AddFilterContacts = async () => {
    var obj = {
      criteria: {
        status: [],
        ranks: [],
        years: [],
        states: [],
        positions: [],
        timezones: [],
        tags: [],
        area_coaches: [],
        position_coaches: [],
        status_2: [],
        dob: []
      }
    }
    for (let i = 0; i < filterType.length; i++) {

      // console.log(filttype[i], "filter object with i", filter[i])  
      if (filterType[i] === 'status') {


        obj.criteria.status.push(filter[i])

      }
      else if (filterType[i] === 'ranks') {
        obj.criteria.ranks.push(filter[i])

      }
      else if (filterType[i] === 'gradeYear') {
        obj.criteria.years.push(filter[i])

      }
      else if (filterType[i] === 'State') {
        obj.criteria.states.push(filter[i])

      }
      else if (filterType[i] === 'Position') {
        obj.criteria.positions.push(filter[i])

      }
      else if (filterType[i] === 'timezones') {
        obj.criteria.timezones.push(filter[i])

      }
      else if (filterType[i] === 'Tag') {
        obj.criteria.tags.push(filter[i])

      }

      else if (filterType[i] === 'area_coaches') {
        obj.criteria.area_coaches.push(filter[i])

      }
      else if (filterType[i] === 'position_coaches') {
        obj.criteria.position_coaches.push(filter[i])

      }
      else if (filterType[i] === 'status_2') {
        obj.criteria.status_2.push(filter[i])

      }
      else if (filterType[i] === 'dob') {
        console.log(filter[i].split(","), "filter[i]")
        var temp = filter[i].split(",")
        for (let i = 0; i < temp.length; i++) {

          obj.criteria.dob.push(temp[i])
        }

      }

    }
    console.log(obj, "filter object")


    setFilterObj(obj)


    try {
      let res = await filterContacts(obj);
      console.log(res, "res filter contacts")
      setPagination({
        totalItems: res.headers['total-count'],
        itemsPerPage: res.headers['page-items'],
        totalPages: res.headers['total-pages'],
        currentPage: res.headers['current-page']
      })
      // setPagination({totalItems:res?.data?.contacts?.count})

      setContacts(res.data)
    }
    catch (e) {
      console.log("res filter contact", e)
      setopenerrSnakBar(true);
    }

  }

  const onSubmit = (values) => {
    console.log(values, 'submit form values', contacts);

  };




  let getTagsWithContacts = useTagsWithContacts().items
  console.log(getTagsWithContacts, "getTagsWithContacts")
  var TeamContacts = useTeamContact()
  var COACH = []
  TeamContacts?.map((item) => {

    COACH.push({
      value: `${item.first_name} ${item.last_name}`,
      label: `${item.first_name} ${item.last_name}`,
    });
  });
  const usetags = useTags()
  console.log("These are all tags", usetags)
  var allTeamContacts = COACH;
  var gettags = useTagWithContact()
  var TAGS = [];
  console.log("These are useTagWithContact tags", gettags);

  console.log("These are allTeamContacts tags", allTeamContacts);
  gettags?.map((item) => {
    TAGS.push({
      value: item.name,
      label: item.name,
      id: item.id
    });
  });
  var allTags = TAGS
  var Columns = useAllColumns()
  const getColumns = () => {
    setShowFilterButton(true)
    setAllColumns(Columns)
  };
  const allpositions = usePositions()
  console.log('positions', allpositions)
  var POSITIONS = [];
  allpositions?.map((item) => {
    POSITIONS.push({
      value: item,
      label: item.name,
    });
  });
  console.log(POSITIONS, "POSITIONS")
  var positions = POSITIONS
  const ranks = useRanks().items
  console.log('Ranks', ranks)
  var RANKS = [];
  ranks?.map((item) => {
    RANKS.push({
      value: item.rank,
      label: item.rank,
    });
  });
  console.log(RANKS, "RANKS")
  var allRanks = RANKS
  const status = useStatus()
  console.log('Status', status)
  var STATUS = [];
  status?.map((item) => {
    STATUS.push({
      value: item.status,
      label: item.status,
    });
  });
  console.log(STATUS, "STATUS")
  var allStatuses = STATUS
  const GradeYears = useGradYears().items
  console.log('GradeYears', GradeYears)
  var GRADYEAR = [];
  GradeYears?.map((item) => {
    GRADYEAR.push({
      value: item,
      label: item,
    });
  });
  console.log(GRADYEAR, "GRADYEAR")
  var allGradYears = GRADYEAR
  var allBoards = useBoards().items
  console.log('allBoards', allBoards)
  const ArchiveContact = () => {

    setalertValue(`${selectedCheckBoxes.length + " "} contacts have been Archived`)

    setFetching(true);
    selectedCheckBoxes.map((id) => {
      return (
        archiveContactEnd(id).then(
          (res) => {
            setOpenSnackBar(true);
            console.log("THis is res", res);
            if (res.status === (202 || 201 || 204)) {
              console.log(res, 'res for archive contact')
              setFetching(false);
            }
          },
          (error) => {
            console.log("this is error all contacts", error);
          }
        )
      )
    })


  }
  const getBoardsFilterById = (id) => {
    setFetching(true);
    console.log("This is board id", id);
    getBoardFiltersById(id).then(
      (res) => {
        console.log("THis is all boards by id", res);
        if (res.statusText === "OK") {
          setPagination({ totalItems: res?.data?.contacts?.count })
          var temp = Object.assign([], copyContacts);
          temp = temp.concat(res?.data?.contacts?.list);
          setContacts(temp);
          setuseLessState(uselessState + 1);
          setBordsById(res.data)
          console.log("These are all board contacts", res?.data?.contacts?.list);
          setFetching(false);
        }
      },
      (error) => {

        console.log("this is error all contacts", error);
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
    {
      name: "Alabama",
      abbreviation: "AL"
    },
    {
      name: "Alaska",
      abbreviation: "AK"
    },
    {
      name: "American Samoa",
      abbreviation: "AS"
    },
    {
      name: "Arizona",
      abbreviation: "AZ"
    },
    {
      name: "Arkansas",
      abbreviation: "AR"
    },
    {
      name: "California",
      abbreviation: "CA"
    },
    {
      name: "Colorado",
      abbreviation: "CO"
    },
    {
      name: "Connecticut",
      abbreviation: "CT"
    },
    {
      name: "Delaware",
      abbreviation: "DE"
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC"
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM"
    },
    {
      name: "Florida",
      abbreviation: "FL"
    },
    {
      name: "Georgia",
      abbreviation: "GA"
    },
    {
      name: "Guam",
      abbreviation: "GU"
    },
    {
      name: "Hawaii",
      abbreviation: "HI"
    },
    {
      name: "Idaho",
      abbreviation: "ID"
    },
    {
      name: "Illinois",
      abbreviation: "IL"
    },
    {
      name: "Indiana",
      abbreviation: "IN"
    },
    {
      name: "Iowa",
      abbreviation: "IA"
    },
    {
      name: "Kansas",
      abbreviation: "KS"
    },
    {
      name: "Kentucky",
      abbreviation: "KY"
    },
    {
      name: "Louisiana",
      abbreviation: "LA"
    },
    {
      name: "Maine",
      abbreviation: "ME"
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH"
    },
    {
      name: "Maryland",
      abbreviation: "MD"
    },
    {
      name: "Massachusetts",
      abbreviation: "MA"
    },
    {
      name: "Michigan",
      abbreviation: "MI"
    },
    {
      name: "Minnesota",
      abbreviation: "MN"
    },
    {
      name: "Mississippi",
      abbreviation: "MS"
    },
    {
      name: "Missouri",
      abbreviation: "MO"
    },
    {
      name: "Montana",
      abbreviation: "MT"
    },
    {
      name: "Nebraska",
      abbreviation: "NE"
    },
    {
      name: "Nevada",
      abbreviation: "NV"
    },
    {
      name: "New Hampshire",
      abbreviation: "NH"
    },
    {
      name: "New Jersey",
      abbreviation: "NJ"
    },
    {
      name: "New Mexico",
      abbreviation: "NM"
    },
    {
      name: "New York",
      abbreviation: "NY"
    },
    {
      name: "North Carolina",
      abbreviation: "NC"
    },
    {
      name: "North Dakota",
      abbreviation: "ND"
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP"
    },
    {
      name: "Ohio",
      abbreviation: "OH"
    },
    {
      name: "Oklahoma",
      abbreviation: "OK"
    },
    {
      name: "Oregon",
      abbreviation: "OR"
    },
    {
      name: "Palau",
      abbreviation: "PW"
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA"
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR"
    },
    {
      name: "Rhode Island",
      abbreviation: "RI"
    },
    {
      name: "South Carolina",
      abbreviation: "SC"
    },
    {
      name: "South Dakota",
      abbreviation: "SD"
    },
    {
      name: "Tennessee",
      abbreviation: "TN"
    },
    {
      name: "Texas",
      abbreviation: "TX"
    },
    {
      name: "Utah",
      abbreviation: "UT"
    },
    {
      name: "Vermont",
      abbreviation: "VT"
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI"
    },
    {
      name: "Virginia",
      abbreviation: "VA"
    },
    {
      name: "Washington",
      abbreviation: "WA"
    },
    {
      name: "West Virginia",
      abbreviation: "WV"
    },
    {
      name: "Wisconsin",
      abbreviation: "WI"
    }]
  const usTimezone = [
    { value: "America/Puerto_Rico", name: "Atlantic" },
    { value: "America/New_York", name: "Eastern" },
    { value: "America/Chicago", name: "Central" },
    { value: "America/Denver", name: "Mountain" },
    { value: "America/Phoenix", name: "MST" },
    { value: "America/Los_Angeles", name: "Pacific" },
    { value: "America/Anchorage", name: "Alaska" },
    { value: "Pacific/Honolulu", name: "Hawaii" }
  ]
  useEffect(() => {
    setShowDrawer(false);
    setShowAnimation(true);
    handleAnimation();
  }, []);
  // const getData = () => {
  //   setboardCount(1)
  // }
  // const getRemoveData =  (newCount) => {
  //   // alert(newCount)
  //    setboardCount(newCount)
  // }



  const handleAnimation = () => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 500)
  }
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


                    filter.map((filt, index) => {


                      AddFilterContacts()
                      console.log(filter, "filter object 2", filterType[index])

                    })



                  } else {
                    addDataToFilter(option.label, "status");

                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'status') {

                        AddFilterContacts()
                      }
                    })



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
                  // 
                  // setContacts(allcontacts)
                  if (rankFilter === option.label) {
                    setRankFilter(null);
                    addDataToFilter(option.label);
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'ranks') {

                        AddFilterContacts()
                      }
                    })
                  } else {
                    addDataToFilter(option.label, "ranks");
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'ranks') {

                        AddFilterContacts()
                      }
                    })
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
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'gradeYear') {

                        AddFilterContacts()
                      }
                    })
                  } else {
                    addDataToFilter(option.label, "gradeYear");
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'gradeYear') {

                        AddFilterContacts()
                      }
                    })
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
          placeholder="Time Zone"
          style={filtesSpacingStyle}
        >
          {usTimezone.map((option) => (
            <Dropdown.Item
              style={{
                background:
                  timeZoneFilter === option.name ? "#348ef7" : "white",
                color: timeZoneFilter === option.name ? "white" : "black",
              }}
              onClick={() => {

                if (timeZoneFilter === option.name) {
                  settimeZoneFilter(null);
                  addDataToFilter(option.name);
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'timezones') {

                      AddFilterContacts()
                    }
                  })
                } else {
                  addDataToFilter(option.name, "timezones");
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'timezones') {

                      AddFilterContacts()
                    }
                  })
                }

              }}
            >
              {option.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={stateFilter || "State"}
          drop={"down"}
          placeholder="State"
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

            {states.map((option, ind) => {
              console.log(option, "=====option------option===========>>>>>>>>>>>>>>>>");
              if (stateSearch != "") {
                if (
                  option.name.toLowerCase().indexOf(stateSearch.toLowerCase()) > -1
                ) {
                  return (
                    <Dropdown.Item
                      key={ind}
                      style={{
                        background:
                          stateFilter === option.abbreviation ? "#348ef7" : "white",
                        color: stateFilter === option.abbreviation ? "white" : "black",
                      }}
                      onClick={() => {

                        addDataToFilter(option.abbreviation, "State");
                        filter.map((filt, index) => {
                          console.log(filter, "filter object 2", filterType)
                          if (filterType[index] === 'State') {

                            AddFilterContacts()
                          }
                        })
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
                      background: stateFilter === option.abbreviation ? "#348ef7" : "white",
                      color: stateFilter === option.abbreviation ? "white" : "black",
                    }}
                    onClick={() => {
                      addDataToFilter(option.abbreviation, "State");
                      filter.map((filt, index) => {
                        console.log(filter, "filter object 2", filterType)
                        if (filterType[index] === 'State') {

                          AddFilterContacts()
                        }
                      })
                    }}
                  >
                    {option.name}
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
            //console.log(positions, "position ok"),
            positions.map((option, ind) => (
              <Dropdown.Item
                key={ind}
                style={{
                  background:
                    positionFilter === option.value.abbreviation ? "#348ef7" : "white",
                  color: positionFilter === option.value.abbreviation ? "white" : "black",
                }}
                // onClick={() => {
                //   addDataToFilter(option, "Position");
                // }}
                onClick={() => {
                  if (positionFilter === option.value.abbreviation) {
                    setPositionFilter(null);
                    addDataToFilter(option.label);
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'Position') {

                        AddFilterContacts()
                      }
                    })
                  } else {
                    addDataToFilter(option.value.abbreviation, "Position");
                    filter.map((filt, index) => {
                      console.log(filter, "filter object 2", filterType)
                      if (filterType[index] === 'Position') {

                        AddFilterContacts()
                      }
                    })
                  }
                }}
              >
                {option.label}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={coachFilter || "Position Coach"}
          drop={"down"}
          placeholder="position_coaches"
          style={filtesSpacingStyle}
        >
          {/* area_coaches */}
          {allTeamContacts.map((option) => (
            <Dropdown.Item
              style={{
                background: coachFilter === option.label ? "#348ef7" : "white",
                color: coachFilter === option.label ? "white" : "black",


              }}
              // onClick={() => {
              //   setCoachFilter(option.label);
              // }}
              onClick={() => {
                if (coachFilter === option.label) {
                  setCoachFilter(null);
                  addDataToFilter(option.label);
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'position_coaches') {

                      AddFilterContacts()
                    }
                  })

                } else {
                  addDataToFilter(option.label, "position_coaches");
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'position_coaches') {

                      AddFilterContacts()
                    }
                  })
                }
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={areacoachFilter || "Area Coach"}
          drop={"down"}
          placeholder="Status"
          style={filtesSpacingStyle}
        >
          {/* area_coaches */}
          {allTeamContacts.map((option) => (
            <Dropdown.Item

              style={{
                background: areacoachFilter === option.label ? "#348ef7" : "white",
                color: areacoachFilter === option.label ? "white" : "black",

              }}
              // onClick={() => {
              //   setareacoachFilter(option.label);
              // }}
              onClick={() => {
                if (areacoachFilter === option.label) {
                  setareacoachFilter(null);
                  addDataToFilter(option.label);
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'area_coaches') {

                      AddFilterContacts()
                    }
                  })

                } else {
                  addDataToFilter(option.label, "area_coaches");
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'area_coaches') {

                      AddFilterContacts()
                    }
                  })
                }
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {/* boardsById */}

        <DropdownButton
          id="dropdown-basic-button"
          title={status_2Filter || "Status 2"}
          drop={"down"}
          placeholder="Status 2"
          style={filtesSpacingStyle}
        >
          {/* area_coaches */}
          {allTeamContacts.map((option) => (
            <Dropdown.Item

              style={{
                background: status_2Filter === option.label ? "#348ef7" : "white",
                color: status_2Filter === option.label ? "white" : "black",

              }}
              // onClick={() => {
              //   setstatus_2Filter(option.label);
              // }}
              onClick={() => {
                if (status_2Filter === option.label) {
                  setstatus_2Filter(null);
                  addDataToFilter(option.label);
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'status_2') {

                      AddFilterContacts()
                    }
                  })

                } else {
                  addDataToFilter(option.label, "status_2");
                  filter.map((filt, index) => {
                    console.log(filter, "filter object 2", filterType)
                    if (filterType[index] === 'status_2') {

                      AddFilterContacts()
                    }
                  })
                }
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
          placeholder="Tag"
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
              placeholder="Search Tag"
              value={tagSearch}
              onChange={(e) => {
                setTagSearch(e.target.value);
              }}
            ></input>
          </Grid>
          {allTags &&
            allTags.map((option, ind) => {
              console.log(allTags, "all TAGS")
              if (tagSearch != "") {
                if (
                  option?.label?.toLowerCase()?.indexOf(tagSearch?.toLowerCase()) > -1
                ) {
                  (
                    <Dropdown.Item
                      style={{
                        background: tagFilter === option.label ? "#348ef7" : "white",
                        color: tagFilter === option.label ? "white" : "black",
                      }}
                      onClick={() => {


                        if (tagFilter === option.label) {
                          setTagFilter(null);
                          addDataToFilter(option.label);
                          filter.map((filt, index) => {
                            console.log(filter, "filter object 2", filterType)
                            if (filterType[index] === 'Tag') {

                              AddFilterContacts()
                            }
                          })
                        } else {

                          addDataToFilter(option.label, "Tag");
                          console.log(filter, "filter object 2", filterType)
                          filter.map((filt, index) => {
                            if (filterType[index] === 'Tag') {

                              AddFilterContacts()
                            }
                          })
                        }
                      }}
                    >
                      {option.label}
                    </Dropdown.Item>

                  );
                }
              } else {
                return (
                  <Dropdown.Item
                    style={{
                      background: tagFilter === option.label ? "#348ef7" : "white",
                      color: tagFilter === option.label ? "white" : "black",
                    }}
                    onClick={() => {


                      if (tagFilter === option.label) {
                        setTagFilter(null);
                        addDataToFilter(option.label);
                        filter.map((filt, index) => {
                          console.log(filter, "filter object 2", filterType)
                          if (filterType[index] === 'Tag') {

                            AddFilterContacts()
                          }
                        })
                      } else {

                        addDataToFilter(option.label, "Tag");
                        console.log(filter, "filter object 2", filterType)
                        filter.map((filt, index) => {
                          if (filterType[index] === 'Tag') {

                            AddFilterContacts()
                          }
                        })
                      }
                    }}
                  >
                    {option.label}
                  </Dropdown.Item>
                );
              }

            })}
        </DropdownButton>
        <CalendarFilter></CalendarFilter>
      </Grid>
    );
  };

  if (localStorage.getItem("user")) {
  } else {
    window.location.href = "/";
  }
  const addDataToFilter = (value, type) => {
    console.log(value, 'Add data to filter function', type, filter);
    if (type === 'boards') {
      setFilter([value])
      setFilterType([type])
    }
    else if (filter.includes(value)) {
      var temp = filter;
      if (temp.length === 1) {
        var data = {
          type: filter,
        }
        console.log(data, 'Data of filter')
        // setFilter(temp);
      } else {
        temp.splice(value, 1);
        console.log("This is temp", temp);
        var data = {
          type: filter,
        }
        console.log(data, 'Data of filter')
        // setFilter(temp);
      }
    } else {
      var temp = filter;
      var tempType = filterType;
      // if(temp==='boards'){

      // }
      temp.push(value);
      tempType.push(type);
      setFilterType(tempType);
      // setFilter(temp);
      var data = {
        type: filter,
      }
      console.log(data, 'Data of filter')
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
    console.log("THis is selected Checkbox", selectedCheckBoxes);
  };
  const makeCheckBoxSelectedForTags = (index) => {
    if (selectedCheckBoxesForTags.indexOf(index) > -1) {
      var temp = [];
      selectedCheckBoxesForTags.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      console.log("This is temp", temp);
      setselectedCheckBoxesForTags(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedCheckBoxesForTags;
      temp.push(index);
      setselectedCheckBoxesForTags(temp);
      setuseLessState(uselessState + 1);
    }
    console.log("THis is selected Checkbox", selectedCheckBoxesForTags);
  };

  var totalcount = 0
  const removeDataFromFilter = (index) => {
    // setboardCount(0)
    const newCount = 0;
    console.log('filtertype', boardCount === 1, filter.length === 1)
    setboardCount(0)
    window.history.pushState("", "", `/contacts`);

    if (filterType.includes('boards') && filter.length === 1 && boardCount === 1) {

      getMyContacts();
      var temp = filter;
      var tempType = filterType;
      temp.splice(index, 1);
      tempType.splice(index, 1);
      var newArray = temp;
      setFilter(newArray);
      setFilterType(tempType);
      setuseLessState(uselessState + 1);
    }
    // getRemoveData(newCount);
    var temp = filter;
    var tempType = filterType;
    temp.splice(index, 1);
    tempType.splice(index, 1);
    var newArray = temp;
    setFilter(newArray);
    setFilterType(tempType);
    setuseLessState(uselessState + 1);
    if (filter && filter.length > 0) {
      filter.map((filt, index) => {
        // setboardCount(1)
        AddFilterContacts(filter)
        console.log(filter, "filter object remove 2", filterType[index])
      })

    } else {

      if (filter.length === 0 && boardCount === 0) {
        console.log(filter.length, 'filter.length === 0')

        getMyContacts();
      }

    }

    console.log(filter, "filter object remove filter", newArray)


    // sethandlescroll(true)
    // alert("sdfasd")
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(filter.length, 'THis is all contacts res')
      if (filter.length === 0 && boardCount === 0) {


        getMyContacts();
      }
      // getAllGradeYears();
      // getAllRanks();
      // getAllStatuses();
      // getAllTags();
      // getAllBoards();
      // getAllTeamContacts()
      // getAllPositions();
      getColumns();
      // getMyContactsSearch();
      // setupPage();
    } else {
      window.location.href = "/";
    }
  }, []);

  console.log("This is filter bar", filter, filterType);

  const isSelectedCheckbox = (index) => {
    console.log("This is great", selectedCheckBoxes.indexOf(index) > -1);
  };

  const checkFilters = (item) => {
    // console.log("These are tags for all", item.tags);

    if (totalcount < 50) {
      // setContacts(allcontacts)
      // setPage(page+1)
      // setFetching(true)
    }
    var isValid = false;
    if (filter.length != 0) {
      filter.map((filt, index) => {
        console.log(filterType[index], 'cheking')
        if (filterType[index] === "status") {
          console.log(item?.status, '<==== : item?.status:: filt:====>', filt)
        }
        if (filterType[index] === "boards") {
          console.log('boards zain', filterType[index])

          if (item != null && boardsById?.name === filt) {


            isValid = true;
            return;

            // }
            // setContacts(null)
            // setContacts(boardsById.contacts.list)

          }
        }
        if (filterType[index] === "ranks") {
          if (item.rank != null && item.rank.rank === filt) {
            isValid = true;
            return;
          }
        }
        if (filterType[index] === "Position") {
          console.log(item.positions, "<<<<<<<<<<<<<---------Item--------->>>>>>>>>>>>>>", filt);
          if (item.positions != null && filt.includes((item.positions.map((el) => (el.name))))) {
            isValid = true;
            return;
          }
        }

        if (filterType[index] === "gradeYear") {
          if (Number(item.grad_year) === filt) {
            console.log(
              "This is inseide grader",
              item.grad_year,
              filt
            );
            isValid = true;
            return;
          }
        }

        // if (filterType[index] === 'ustimezones') {
        //   if (item.ustimezones.ustimezones === filt) {
        //     console.log(
        //       "This is inseide ustimezones",
        //       item.ustimezones,
        //       filt
        //     );
        //     isValid = true;
        //     return;
        //   }
        // }
        if (filterType[index] === 'State') {
          console.log(item, '<<<<<<<<<================item= 0========>>>>>>>>>>>>', filt);

          if (item?.state === filt) {
            console.log(
              "This is inseide state",
              item.State,
              filt
            );
            isValid = true;
            return;
          }
        }

        if (filterType[index] === 'Coach') {
          console.log(item.area_coach?.full_name, '<<<<<<<<<================item= 1========>>>>>>>>>>>>', filt);

          if (item.area_coach?.full_name === filt || item.position_coach?.full_name === filt) {
            console.log(
              "This is inseide state",
              item.State,
              filt
            );
            isValid = true;
            return;
          }
        }
        if (filterType[index] === "Tag") {
          console.log(item.tags.map((el) => (el.name)), "-------------->>>>>>Tag item<-------------->");
          if (filt.includes((item.tags.map((el) => (el.name))))) {

            console.log(
              "This is inseide grader",
              item.tags,
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
  const handleBoardClick = (board, index) => {
    // history?.push('contacts/board/yBgMwvsbRmGa')
    window.history.pushState("", "", `/contacts/board/${board.id}`);
    setboardCount(1)



    getBoardsFilterById(board.id)

    if (boardFilter === board.name) {


      addDataToFilter(board.name, "boards");

    }

    else {

      setBoardFilter(null);


      addDataToFilter(board.name, "boards");
      // var ind = 1
      // removeDataFromFilter(ind);

    }
  }

  function handleScroll() {
    // if(handlescroll){
    var agreement = document.getElementById("infinit");
    var visibleHeight = agreement.clientHeight;
    var scrollableHeight = agreement.scrollHeight;
    var position = agreement.scrollTop;
    console.log(
      "This is poistion",
      fetching,
      "This is scrollable",
      scrollableHeight,
      "This is visible height",
      visibleHeight
    );
    // if (position + visibleHeight === scrollableHeight) {
    // alert("We are in the endgaem now");
    if (!fetching) {
      if (filter.length === 0 && boardCount === 0) {

        getMyContacts(page + 1);
        setPage(page + 1);
      }

    }
    // agreement.scrollTop = 0;
    // }
  }

  // if(redirect !== '')
  //   return <Redirect to={redirect}/>
  // console.log(boardCount,'setboardCount')
  console.log('setboardCount', boardCount)

  return (
    <DarkContainer contacts style={{ padding: 20, marginLeft: 60 }}>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnakBar}
        autoHideDuration={2000}
        onClose={handleClose}
      >

        <Alert onClose={handleClose} severity="success">
          {alertValue}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openerrSnakBar}
        autoHideDuration={2000}
        onClose={handleClose}
      >

        <Alert onClose={handleClose} severity="error">
          Something went wrong please try again!
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
            <p className={props.sideFilterClass}>
              All Contacts{" "}
              <ArrowForwardIosIcon
                style={{ fontSize: 12 }}
              ></ArrowForwardIosIcon>
            </p>
            <p
              className={props.sideFilterClass}
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
                  allBoards.map((board, index) => {
                    return (
                      <p
                        className={classes.sideSubFilter}
                        // onClick={() => {
                        //   // alert(board.id)
                        //   getBoardsFilterById(board.id)

                        //   addDataToFilter(board.name,'boards');
                        // }}
                        onClick={() => handleBoardClick(board, index)}
                      >
                        {board.name}
                      </p>
                      // {allStatuses &&
                      //   allStatuses.map((option) => (
                      //     <Dropdown.Item
                      //       style={{
                      //         background:
                      //           statusFilter === option.label ? "#348ef7" : "white",
                      //         color: statusFilter === option.label ? "white" : "black",
                      //       }}
                      //       onClick={() => {
                      //         if (statusFilter === option.label) {
                      //           setStatusFilter(null);
                      //           addDataToFilter(option.label);
                      //         } else {
                      //           addDataToFilter(option.label, "status");
                      //         }
                      //       }}
                      //     >
                      //       {option.label}
                      //     </Dropdown.Item>
                      //   ))}
                    );
                  })}
              </div>
            )}

            <p className={props.sideFilterClass}>
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

              {/* <FormatAlignLeftIcon
               
              ></FormatAlignLeftIcon> */}

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
                  onClick={() => {
                    // setShowFiltersRow(!showFiltersRow);
                    handleOpen();
                    // setContacts(allcontacts)
                  }}
                  icon={
                    <AccountBoxIcon
                      style={{ color: "#3871DA" }}
                    ></AccountBoxIcon>
                  }
                ></IconTextField>
                {showFilterButton === false ? null :
                  <IconTextField
                    text="Filter"
                    width={120}
                    onClick={() => {
                      setShowFiltersRow(!showFiltersRow);
                      // setContacts(allcontacts)
                    }}

                    textColor={showFiltersRow === false ? "black" : "white"}
                    background={
                      showFiltersRow === false ? "transparent" : "#3871DA"
                    }
                    icon={
                      <FaSlidersH
                        style={{
                          color: showFiltersRow === false ? "#3871DA" : "white",
                        }}
                      ></FaSlidersH>
                    }
                  ></IconTextField>
                }

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
                  <span style={{ color: "#3871DA", width: "100%" }}>
                    {selectedCheckBoxes.length + " "} contacts selected
                  </span>{" "}
                  <br></br>
                  <span
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCheckboxes([]);
                    }}
                  >
                    Clear Selected
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
                  You have <span style={{ color: "#3871DA" }}> {contacts != null && contacts.length > 0 ? pagination.totalItems : 0} </span>{" "} contacts
                  {/* {" "} contacts in the system */}
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
                {/* <IconTextField
                  // width={180}
                  width={100}
                  text="Action"
                  textColor="gray"
                  icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
                ></IconTextField> */}
                <div class="dropdown">
                  <IconTextField
                    width={100}
                    text="Action"

                    icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
                  ></IconTextField>
                  <div class="dropdown-content">


                    <Grid
                      container
                      alignItems="left"
                      className="p-3"
                    // className="ml-auto"
                    // style={{
                    //   height: item.Heading ? 60 : 30,
                    //   marginLeft: item.sub ? 35 : 0,
                    // }}
                    >

                      <p
                        style={{
                          // marginTop: 10,
                          marginBottom: 0,
                          width: "100%",
                          paddingLeft: 4,
                          fontWeight: 600,
                          textAlign: 'end',
                          cursor: 'pointer'

                        }}
                      // className="ml-auto"

                      >

                        Edit
                      </p>
                      <p
                        style={{
                          marginTop: 10,
                          marginBottom: 0,
                          width: "100%",
                          paddingLeft: 4,
                          fontWeight: 600,
                          textAlign: 'end',
                          cursor: 'pointer'

                        }}
                        // className="ml-auto"
                        // onClick={removeTags}
                        onClick={() => {
                          // if (selectedCheckBoxes.length > 0) {
                          // removeTags()
                          // getContactsByid()
                          // if (contacttags.length > 0) {
                          setshowRemoveTagsDialog(true);

                          // }
                          // else {
                          // alert("No tag found ")
                          // return false
                          // }

                          // }
                        }}
                      >

                        Remove Tag
                      </p>
                      <p
                        style={{
                          marginTop: 10,
                          marginBottom: 0,
                          width: "100%",
                          paddingLeft: 4,
                          fontWeight: 600,
                          textAlign: 'end',
                          cursor: 'pointer'
                        }}
                        // className="ml-auto"
                        onClick={() => { ArchiveContact() }}
                      >

                        Archive Contact
                      </p>
                      <p
                        style={{
                          marginTop: 10,
                          marginBottom: 0,
                          width: "100%",
                          paddingLeft: 4,
                          fontWeight: 600,
                          textAlign: 'end',
                          cursor: 'pointer'

                        }}
                      // className="ml-auto"

                      >

                        Delete Contact
                      </p>

                      {/* {item.icon} */}
                      {/* <i
                              class="fa fa-user-circle"
                              style={{ color: "#dadada", marginRight: 10 }}
                            ></i> */}



                    </Grid>

                  </div>
                </div>
                <IconTextField
                  width={100}
                  onClick={() => {
                    if (selectedCheckBoxes.length > 0) {
                      setShowTagsDialog(true);

                    }
                  }}
                  text="Tag"
                  textColor={selectedCheckBoxesForTags.length <= 0 ? "gray" : "black"}
                  icon={
                    <LocalOfferOutlinedIcon
                      style={{
                        color:
                          selectedCheckBoxesForTags.length <= 0 ? "gray" : "#3871DA",
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
                      Display Contact Data
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
                            <Checkbox color="primary" ></Checkbox>
                            {/* {item.icon} */}
                            {/* <i
                              class="fa fa-user-circle"
                              style={{ color: "#dadada", marginRight: 10 }}
                            ></i> */}
                            <i
                              class={item.fa_classes}
                              style={{ color: "black", marginRight: 10 }}
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
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
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
                // if(handlescroll){

                handleScroll();
                // }

              }}
            >


              {contacts ? (
                contacts.map((item, index) => {

                  // console.log(item,'===============contacts====================='),
                  // console.log(isBoardContact, '<<<<<<<<<<===contacts=<<<<<<<'),
                  console.log(checkFilters(item), '<<<<==<<<<<==============contacts====================');
                  // if (checkFilters(item) === true) {

                  // totalcount++
                  return (
                    <Grid
                      key={index}
                      container
                      direction="row"
                      alignItems="center"
                      className={classes.contactsRow}
                      onClick={() => {
                        if (hoveredIndex === null) {
                          localStorage.setItem(
                            "CONTACT_DATA",
                            JSON.stringify(item)
                          );
                          //setRedirect(`/contact-profile/${item.id}`)
                          // window.location.href = "/contact-profile/" + item.id;
                        }

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

                      {/* <NavLink>
                          
                        </NavLink> */}
                      <Grid item md={1} xs={1}>
                        <NavLink style={{ color: 'inherit' }} to={"contact-profile/" + item.id} className={classes.tableFields}>
                          {item.first_name}
                        </NavLink>
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
                          }
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
                      {/* // {pagination.totalPages===pagination.currentPage} */}
                      {console.log((pagination.totalPages !== pagination.currentPage), 'THis is all contacts res')}

                      {index === contacts.length - 1 && pagination.totalPages !== pagination.currentPage && (

                        <Grid item md={12} xs={12}>
                          <Grid container direction="row" justify="center">
                            {/* {console.log(":adfsad")} */}
                            <CircularProgress />
                          </Grid>
                        </Grid>
                      )}



                    </Grid>
                  );
                  // }
                })
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  style={{ marginTop: 50 }}
                >
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </Grid>
              )}


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
              {usetags &&
                usetags.map((tags) => {
                  console.log(tags, 'This is tag map ')
                  if (tags.name.indexOf(tagSearch) > -1) {
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
                              makeCheckBoxSelectedForTags(tags.id);
                            }}
                            style={{ marginTop: 1, marginBottom: 1 }}
                          ></Checkbox>
                        </Grid>
                        <Grid item md={9} sm={9}>
                          {tags.name}
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

                text="Tag "
                textColor="white"
                background="#3871DA"
                icon={
                  <LocalOfferOutlinedIcon
                    style={{ color: "white" }}
                  ></LocalOfferOutlinedIcon>
                }
                onClick={() => {
                  setShowTagsDialog(false);
                  TagstoContacts()

                  console.log(selectedCheckBoxesForTags, 'selectedCheckBoxesForTags for tags')
                }}
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
      <DialogBox
        // title={"POST"}
        maxWidth="sm"
        open={showRemoveTagsDialog}
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
              Remove Tags
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
              {getTagsWithContacts &&

                getTagsWithContacts.map((tags) => {
                  console.log(tags, 'This is tag map ')
                  if (tags.name.indexOf(tagSearch) > -1) {
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
                              makeCheckBoxSelectedForTags(tags.id);
                            }}
                            style={{ marginTop: 1, marginBottom: 1 }}
                          ></Checkbox>
                        </Grid>
                        <Grid item md={9} sm={9}>
                          {tags.name}
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
                  setshowRemoveTagsDialog(false);
                }}
                text="Cancel"
                textColor="#3871DA"
                background="white"
              ></HollowWhiteButton>
              <IconTextField
                // width={100}

                text="Remove Tag "
                textColor="white"
                background="#3871DA"
                icon={
                  <LocalOfferOutlinedIcon
                    style={{ color: "white" }}
                  ></LocalOfferOutlinedIcon>
                }
                onClick={() => {
                  setshowRemoveTagsDialog(false);
                  // TagstoContacts()
                  removeTags()


                  console.log(selectedCheckBoxesForTags, 'selectedCheckBoxesForTags for tags')
                }}
              ></IconTextField>
            </Grid>
          </div>
        }
        // applyForm={() => dispatch(hidePost())}
        cancelForm={() => {
          setshowRemoveTagsDialog(false);
        }}
        hideActions={true}
      />
      <SaveBoardModal />
    </DarkContainer>
  );
}

export default Home;
