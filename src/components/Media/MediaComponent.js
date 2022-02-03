import React, {useState, useEffect, useReducer, Fragment} from "react";
import ReactDOM from "react-dom";

import MuiAlert from "@material-ui/lab/Alert";
import {Link} from "react-router-dom";
import {
    makeStyles,
    Grid,
    Checkbox,
    Dialog,
    withStyles,
    Slider,
} from "@material-ui/core";
import moment from "moment";
import {FaSlidersH, FaBars, FaTh} from "react-icons/fa";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import AmimatedBurger from '../../images/animated_burger.gif';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
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
import {Dropdown, DropdownButton} from "react-bootstrap";
import {FaMagic, FaFilePdf, FaVideo, FaImage} from "react-icons/fa";
import GifIcon from "@material-ui/icons/Gif";
import DialogBox from "../common/Dialogs";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {DarkContainer} from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";


import MediaItem from './Media/Item/item';
import MediaItemDetails from './Media/Details';
import DropDownButton from './DropDownButton';
import ItemMainHeader from './Media/Header';
import TagItem from './Tags/item';
import TagSearchModal from './Tags/TagSearchModal';
import LightboxDialog from './LightboxDialog';
import Header from './Header';
import SelectedItemsContainer from './SelectedItemsContainer';
import Media from './Media';
import PlaceholderDetails from './PlaceholderDetails';
import PlaceholderListButton from './Placehoder/PlaceholderListButton';
import Tag from './Tags';

import PlaceholderTableList from './Media/TableList/index';
import Placeholder from './Placehoder';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    getAllContacts,
    getMedia,
    getMediaTag,
    getPlaceholder,
    getMediaUsers,
    getTeamContacts,
    getTags,
    postTag,
    getPlaceholderById,
    getMessages
} from "../../ApiHelper";
import {fileTypes} from '../../utils/FileUtils';

import {MoreHoriz} from "@material-ui/icons";
import SelectedContactItem from "./Media/Details/selected-contact";
import TimePicker from "../DateTimePicker";
import ArrowBackwardIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {DateRangePicker} from "react-date-range";
import {addDays} from "date-fns";

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
        width: '100%',
        textAlign: 'center'
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

    const [displayRangeCalendar, setDisplayRageCalendar] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);


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

    const [contacts, setContacts] = useState(null);
    const [myMediaContacts, setMyMediaContacts] = useState(null);
    const [media, setMedia] = useState(null);
    const [placeholders, setPlaceHolders] = useState(null);
    const [taggedMedia, setTaggedMedia] = useState(null);
    const [displayAction, setDisplayAction] = useState(null);
    const [displayTags, setDisplayTags] = useState(null);
    const [tagFilter, setTagFilter] = useState([]);
    const [placeholderFilter, setPlaceholderFilter] = useState([]);

    const [displayPlaceholder, setDisplayPlaceholder] = useState(null);

    const [allTags, setAllTags] = useState(null);
    const [page, setPage] = useState(1);

    const [openSnakBar, setOpenSnackBar] = React.useState(false);

    const [showDrawer, setShowDrawer] = useState(true);
    const [showAnimation, setShowAnimation] = useState(true);

    const [selectedTeamContacts, setSelectedTeamContacts] = useState([]);

    const [selectedTags, setSelectedTags] = useState([]);


    const [selectedMediaPlaceholders, setSelectedMediaPlaceholders] = useState([]);

    const [selectedAssociatePlaceholders, setSelectedAssociatePlaceholders] = useState([]);


    const [showBackButton, setShowBackButton] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [count, setCount] = useState(0);
    const [showNotification, setShowNotification] = useState(false);

    const [displaySearchContainers, setDisplaySearchContainers] = useState({
        displayOwner: false,
        selectedTagContainer: false,
        selectedPlaceholderContainer: false,
        selectedAssociatePlaceholderContainer: false
    });


    const [searchMediaDetailsContainer, setSearchMediaDetailsContainer] = useState({
        ownerSearch: '',
        tagSearch: '',
        placeholderSearch: '',
        associateSearch: ''
    });


    const [displayListContainer, setDisplayListContainer] = useState({
        showPlaceholderListView: false,
        showPlaceholderDetailsListView: false,
        showMediaListView: false,
        isPlaceholderSelected: false,
        selectedPlaceholder: null
    });


    const dropDownButtonItemsList = [
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
    ];


    const notify = (msg) => toast(msg);


    const handleClick = () => {
        setOpenSnackBar(true);
    };

    const handleSetSelectedMediaDetails = (selectedTeamContacts, selectedTags,
                                           selectedMediaPlaceholders, selectedAssociatePlaceholders) => {
        setSelectedTeamContacts(selectedTeamContacts);
        setSelectedTags(selectedTags);
        setSelectedMediaPlaceholders(selectedMediaPlaceholders)
        setSelectedAssociatePlaceholders(selectedAssociatePlaceholders)
    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }


        setOpenSnackBar(false);
    };


    const handleMediaHover = (mediaHover) => {
        console.log('media hover = ', mediaHover)
        setMediaHover(mediaHover);
    }

    const handleMediaDisplayAction = (action) => {
        setDisplayAction(action);
    }

    const handleShowMediaStats = (stats) => {
        setShowMediaStats(stats);
    }


    const handleSetShowBackButton = (back) => {
        setShowBackButton(back);
    }

    const handleTagsDialog = () => {
        setShowTagsDialog(!showTagsDialog)
    }

    const handleSetShowFilters = () => {
        console.log('handleSetShowFilters = ', filter);
        setShowFilters(!showFilters);
    }

    const getMyTeamContacts = () => {
        getTeamContacts().then(
            (res) => {
                // console.log("THis is all contacts res", res);
                if (res.statusText === "OK") {
                    setTeamContacts(res.data);
                }
            },
            (error) => {
            }
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
                    // document.getElementById("infinit").scrollTop = 0;
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

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div
            style={{fontSize: 17}}
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                // onClick(e);
            }}
        >
            {children}
            <KeyboardArrowDownIcon style={{marginLeft: 15, fontSize: 30}}/>
        </div>
    ));


    const getMyMedia = async () => {
        try {
            const res = await getMedia();
            if (res.statusText === "OK") {
                console.log("These are all media", res.data);
                const media = (res.data).map((item) => {
                    item.type = "media";
                    return item;
                })
                setMedia(media);
                return media;
            } else {
                return null;
            }
        } catch (error) {
            console.log("this is error all media", error);
            return null;

        }
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

    const getMyPlaceholders = async () => {
        try {
            const res = await getPlaceholder();
            if (res.statusText === "OK") {
                console.log("These are all placeholder", res.data);
                setPlaceHolders(res.data);
                return res.data;
            } else {
                return null;
            }
        } catch (error) {
            console.log("this is error all media", error);
            return null;
        }
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


    const filtesSpacingStyle = {
        marginRight: 5,
    };


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
                        style={{marginRight: 8, marginLeft: 8, fontSize: 12}}
                    ></ArrowBackwardIosIcon>
                    <div style={{border: "1px solid #dadada", height: 38}}></div>
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
                    <div style={{borderLeft: "1px solid #dadada", height: 38}}></div>
                    <ArrowForwardIosIcon
                        style={{marginRight: 8, marginLeft: 8, fontSize: 12}}
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
                            onChange={(item) => {
                                setState([item.selection])
                                console.log('item = ', item);

                                const value = new moment(item.startDate).format("MM-DD-YYYY")
                                    + ' - ' +
                                    new moment(item.endDate).format("MM-DD-YYYY");

                                props.addDataToFilter(value, "date_created", item.selection);

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

    const renderFilters = () => {

        let owners = [];
        let dateCreated = [];
        let mediaContacts = [];

        for (let m of media) {
            if (m.owner && m.owner.first_name && m.owner.last_name) {
                if (owners.findIndex((o) => o.value === (m.owner.first_name + " " + m.owner.last_name)) === -1) {
                    owners.push({type: 'owner', value: m.owner.first_name + " " + m.owner.last_name})
                }
            }
        }


        for (let m of media) {
            if (m.created_at) {
                if (dateCreated.findIndex((o) => o.value === m.created_at) === -1) {
                    dateCreated.push({type: 'date_created', value: m.created_at})
                }
            }
        }


        for (let c of contacts) {
            if (c.first_name && c.last_name) {
                if (mediaContacts.findIndex((o) => o.value === c.first_name + ' ' + c.last_name) === -1) {
                    mediaContacts.push({type: 'associated_to', value: (c.first_name + ' ' + c.last_name)})
                }
            }
        }


        if (contactSearch.length > 0) {
            mediaContacts = mediaContacts.filter((m) => ((m.value.toLowerCase()).includes(contactSearch.toLowerCase())));
        }


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
                    {fileTypes &&
                    fileTypes.map((option) => (
                        <Dropdown.Item
                            style={{
                                background:
                                    statusFilter === option.label ? "#348ef7" : "white",
                                color: statusFilter === option.label ? "white" : "black",
                            }}
                            onClick={() => {
                                props.addDataToFilter(option.label, "file_type");
                            }}
                        >
                            {option.label}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                <DropdownButton
                    id="dropdown-basic-button"
                    title={rankFilter || "Distributed"}
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
                                props.addDataToFilter(option.label, "distributed");

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
                    {
                        owners.map((m) => {
                            return (
                                <Dropdown.Item
                                    style={{
                                        background: "white",
                                        color: "black",
                                    }}
                                    onClick={() => {
                                        props.addDataToFilter(m.value, "owner");
                                    }}
                                >
                                    {m.value}
                                </Dropdown.Item>
                            )
                        })}
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
                        {
                            mediaContacts.map((m) => {
                                return (
                                    <Dropdown.Item
                                        style={{
                                            background: "white",
                                            color: "black",
                                        }}
                                        onClick={() => {
                                            props.addDataToFilter(m.value, "associated_to");
                                        }}
                                    >
                                        {m.value}
                                    </Dropdown.Item>
                                )
                            })}
                    </DropdownButton>
                </div>

                <CalendarFilter></CalendarFilter>

                <DropdownButton
                    id="dropdown-basic-button"
                    title={stateFilter || "Tag"}
                    drop={"down"}
                    style={filtesSpacingStyle}
                    style={{marginLeft: 5}}
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
                                                props.addDataToFilter(option.name, "tag");
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
                                            props.addDataToFilter(option.name, "tag");
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


    const addDataToFilter = (value, type) => {


        if (type === 'SELECTED_TEAM_CONTACTS') {

            const index = selectedTeamContacts.findIndex((contact) => contact.username === value.username);

            if (index === -1) {
                const tempSelectedTeamContacts = [...selectedTeamContacts, value];
                setSelectedTeamContacts(tempSelectedTeamContacts);
            }

            console.log(selectedTeamContacts);

        } else if (type === 'SELECTED_TAGS') {

            const index = selectedTags.findIndex((tag) => tag.username === value.username);

            if (index === -1) {
                const tempSelectedTags = [...selectedTags, value];
                setSelectedTags(tempSelectedTags);
            }

        } else if (type === 'SELECTED_PLACEHOLDERS') {

            const index = selectedMediaPlaceholders.findIndex((media) => media.username === value.username);

            if (index === -1) {
                const tempSelectedPlaceholders = [...selectedMediaPlaceholders, value];
                setSelectedMediaPlaceholders(tempSelectedPlaceholders);
            }

        } else if (type === 'SELECTED_ASSOCIATE_PLACEHOLDER') {

            const index = selectedAssociatePlaceholders.findIndex((associate) => associate.username === value.username);

            if (index === -1) {
                const tempSelectedAssociatePlaceholders = [...selectedAssociatePlaceholders, value];
                setSelectedAssociatePlaceholders(tempSelectedAssociatePlaceholders);
            }
        }

    };


    const onChangeMediaDetailsSearch = (type, value) => {
        if (type === 'SELECTED_TEAM_CONTACTS') {
            setSearchMediaDetailsContainer({...searchMediaDetailsContainer, ownerSearch: value});
        } else if (type === 'SELECTED_TAGS') {
            setSearchMediaDetailsContainer({...searchMediaDetailsContainer, tagSearch: value});
        } else if (type === 'SELECTED_PLACEHOLDERS') {
            setSearchMediaDetailsContainer({...searchMediaDetailsContainer, placeholderSearch: value});
        } else if (type === 'SELECTED_ASSOCIATE_PLACEHOLDER') {
            setSearchMediaDetailsContainer({...searchMediaDetailsContainer, associateSearch: value});
        }
    }


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

    const removeDataFromFilter = (value, type) => {
        if (type === 'SELECTED_TEAM_CONTACTS') {
            //setSelectedTeamContacts(selectedTeamContacts.filter((contact) => contact.username !== value.username));
            setSelectedTeamContacts([]);
        } else if (type === 'SELECTED_TAGS') {
            setSelectedTags(selectedTags.filter((tag) => tag.username !== value.username));
        } else if (type === 'SELECTED_PLACEHOLDERS') {
            setSelectedMediaPlaceholders(selectedMediaPlaceholders.filter((placeholder) => placeholder.username !== value.username));
        } else if (type === 'SELECTED_ASSOCIATE_PLACEHOLDER') {
            setSelectedAssociatePlaceholders(selectedAssociatePlaceholders.filter((placeholder) => placeholder.username !== value.username));
        }
    };


    useEffect(() => {

        (async () => {
            if (localStorage.getItem("user")) {
                await getMyContacts();
                await getTaggedMedia();
                await getMyMediaContacts();
                await getMyTeamContacts();

                const media = await getMyMedia();
                const placeholders = await getMyPlaceholders();
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id');
                const type = urlParams.get('type');
                console.log('type = ', type, '  ', id);

                if (type && type === "media" && media && id) {
                    console.log('comes in media = ', type, '  ', id);

                    const index = media.findIndex((m) => m.id == id);
                    if (index !== -1) {
                        ReactDOM.unstable_batchedUpdates(() => {
                            setShowMediaStats(true);
                            setShowBackButton(true);
                            handleSelectedPlaceHolder(media[index], false, false, false);
                        });
                    }
                    console.log('type = ', type, '  ', index);
                } else if (type && type === "placeholder" && placeholders && id) {
                    console.log('comes in placeholder = ', type, '  ', id);

                    const index = placeholders.findIndex((m) => m.id == id);
                    if (index !== -1) {
                        ReactDOM.unstable_batchedUpdates(() => {
                            setShowMediaStats(false);
                            setShowBackButton(true);
                            handleSelectedPlaceHolder(placeholders[index], true, false, false);
                        });
                    }
                }

                console.log('id=', id, 'type=', type, media)
                // getAllTags();
            } else {
                window.location.href = "/";
            }
        })();

    }, []);


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

    const handleAnimation = () => {
        //setShowDrawer(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 500)
    }


    const handleSetDisplayTags = (tags) => {
        setDisplayTags(tags);
    }

    const handleSetDisplayPlaceholder = (placeholder) => {
        setDisplayPlaceholder(placeholder);
    }


    const handleSelectedPlaceHolder = (placeholder, isPlaceholder, setToDefault, isFromBackButton) => {
        console.log('setSelectedPlaceholder = ', placeholder, isPlaceholder, setToDefault, isFromBackButton);


        if (isPlaceholder) {


            setDisplayListContainer({
                ...displayListContainer,
                showPlaceholderListView: true,
                showPlaceholderDetailsListView: true,
                isPlaceholderSelected: isPlaceholder,
                selectedPlaceholder: placeholder
            })
        } else if (setToDefault) {
            setDisplayListContainer({
                showPlaceholderListView: false,
                showMediaListView: false,
                selectedPlaceholder: null
            })
        } else if (isFromBackButton) {
            const placehodlerListView = displayListContainer.showMediaListView ? true : false;
            setDisplayListContainer({
                ...displayListContainer,
                showPlaceholderListView: placehodlerListView,
                selectedPlaceholder: null
            })
        } else {


            setDisplayListContainer({
                ...displayListContainer,
                showPlaceholderListView: false,
                isPlaceholderSelected: isPlaceholder,
                selectedPlaceholder: placeholder
            })
        }

        if (placeholder) {
            props.history.push("?id=" + placeholder.id + "&type=" + placeholder.type);
        }


    }


    const handleSelectedPlaceHolderListView = (id, isPlaceholder) => {
        console.log('handleSelectedPlaceHolderListView = ', id, '   ', isPlaceholder)


        if (isPlaceholder) {
            const index = placeholders.findIndex((item) => item.id === id);

            if (index !== -1) {
                setShowBackButton(true);
                setShowMediaStats(false);
                if (displayListContainer.showMediaListView) {
                    setDisplayListContainer({
                        ...displayListContainer,
                        selectedPlaceholder: placeholders[index]
                    })
                    props.history.push("?id=" + placeholders[index].id + "&type=" + placeholders[index].type);
                } else {
                    setDisplayListContainer({
                        showPlaceholderListView: true,
                        showMediaListView: false,
                        selectedPlaceholder: placeholders[index]
                    })
                    props.history.push("?id=" + placeholders[index].id + "&type=" + placeholders[index].type);

                }

            }

        } else {
            const index = media.findIndex((item) => item.id === id);

            if (index !== -1) {
                setShowBackButton(true);
                setShowMediaStats(true);
                setDisplayListContainer({
                    ...displayListContainer,
                    selectedPlaceholder: media[index]
                })
                props.history.push("?id=" + media[index].id + "&type=" + media[index].type);

            }
        }
    }


    const handleSetPlaceholderDetailsListView = (listView) => {

        setDisplayListContainer({
            ...displayListContainer,
            showPlaceholderDetailsListView: listView
        })
        props.history.push("?id=" + listView.id + "&type=" + listView.type);

    }


    const handleSuggestionPlaceholder = (placeholder, isPlaceholder, placeholderId) => {

        console.log('special case care = ', placeholderId)
        props.history.push("?id=" + placeholder.id + "&type=" + placeholder.type);

        placeholder.parentId = placeholderId;
        placeholder.file_name = placeholder.name;
        setDisplayListContainer({
            ...displayListContainer,
            isPlaceholderSelected: isPlaceholder,
            selectedPlaceholder: placeholder
        })
    }

    const handlePlaceholderClick = (m) => {

        console.log('handlePlaceholderClick = ', handlePlaceholderClick)
        setDisplayListContainer({...displayListContainer, selectedPlaceholder: m})
    }

    const handlePlaceholderHover = (hover) => {
        setPlaceholderHover(hover);
    }


    const handleShowTagsDialog = (dialog) => {
        setShowTagsDialog(dialog);
    }

    const handleOpenSnackBar = (snackbar) => {
        setOpenSnackBar(snackbar);
    }

    const handleSetTagSearch = (tagSearch) => {
        setOpenSnackBar(tagSearch);
    }

    const handleSetLightboxVideo = (lightbox) => {
        setLightboxVideo(lightbox)
    }
    const handleSetLightboxPicture = (lightbox) => {
        setLightboxPicture(lightbox)
    }

    const handleShowSideFilters = (sideFilters) => {
        setshowSideFilters(sideFilters);
    }

    const handleShowDrawer = (drawer) => {
        setShowDrawer(drawer);
    }

    const handleShowAnimation = (animation) => {
        setShowAnimation(animation);
    }

    const handleViewMoreQuickAccess = (access) => {
        setViewMoreQuickAccess(access)
    }


    const handleQuickAccessEndIndex = (access) => {
        setQuickAccessEndIndex(access);
    }


    const handleQuickAccessStartIndex = (access) => {
        setQuickAccessStartIndex(access);
    }

    const handleSetShowListView = (showMediaList, showPlaceholderList) => {

        console.log('handleSetShowListView = ', showMediaList, showPlaceholderList)
        setDisplayListContainer({
            selectedPlaceholder: null,
            showPlaceholderListView: showPlaceholderList,
            showMediaListView: showMediaList
        });

    }


    const handleViewMorePlaceholder = (view) => {
        setViewMorePlaceholder(view)
    }


    const handlePlaceholderEndIndex = (end) => {
        setQuickAccessEndIndex(end);
    }


    const handlePlaceholderStartIndex = (access) => {
        setPlaceholderStartIndex(access);
    }


    const handleSetDisplayOwner = (owner) => {
        if (owner) {
            setDisplaySearchContainers(
                {
                    displayOwner: true, selectedTagContainer: false,
                    selectedPlaceholderContainer: false, selectedAssociatePlaceholderContainer: false
                }
            );
        } else {

            setDisplaySearchContainers({...displaySearchContainers, displayOwner: false}
            );
        }
    }

    const handleSetSelectedTagContainer = (container) => {
        if (container) {
            setDisplaySearchContainers(
                {
                    displayOwner: false, selectedTagContainer: true,
                    selectedPlaceholderContainer: false, selectedAssociatePlaceholderContainer: false
                }
            );
        } else {

            setDisplaySearchContainers({...displaySearchContainers, selectedTagContainer: false}
            );
        }
    }


    const handleSetSelectedMediaPlaceholders = (placeholder) => {
        if (placeholder) {
            setDisplaySearchContainers(
                {
                    displayOwner: false, selectedTagContainer: false,
                    selectedPlaceholderContainer: true, selectedAssociatePlaceholderContainer: false
                }
            );
        } else {
            setDisplaySearchContainers({...displaySearchContainers, selectedPlaceholderContainer: false}
            );
        }
    }

    const handleSetSelectedAssociatePlaceholder = (placeholder) => {
        if (placeholder) {
            setDisplaySearchContainers(
                {
                    displayOwner: false, selectedTagContainer: false,
                    selectedPlaceholderContainer: false, selectedAssociatePlaceholderContainer: true
                }
            );
        } else {
            setDisplaySearchContainers({...displaySearchContainers, selectedAssociatePlaceholderContainer: false}
            );
        }
    }


    const closeAllMediaDetailsDialogs = () => {
        setDisplaySearchContainers(
            {
                displayOwner: false, selectedTagContainer: false,
                selectedPlaceholderContainer: false, selectedAssociatePlaceholderContainer: false
            }
        );

        setSearchMediaDetailsContainer({
            ownerSearch: '',
            tagSearch: '',
            placeholderSearch: '',
            associateSearch: ''
        })
    }


    const saveTag = async () => {
        console.log('index= ', displayListContainer.selectedPlaceholder);
        /*try{
            const result=await postTag({id:displayListContainer.selectedPlaceholder.id,tag:displayListContainer.selectedPlaceholder.tags})
            console.log('result = ',result);
        }catch (e) {
            console.log('exception = ',e.toString())
        }*/


        let mediaIndex = displayListContainer.selectedPlaceholder.parentId ?
            placeholders.findIndex((m) => m.id === displayListContainer.selectedPlaceholder.parentId)
            :
            media.findIndex((m) => m.id === displayListContainer.selectedPlaceholder.id);

        console.log('media index= ', placeholders[mediaIndex])

        let placeholderMediaItemIndex = displayListContainer.selectedPlaceholder.parentId &&
            (placeholders[mediaIndex].media).findIndex((f) => f.id === displayListContainer.selectedPlaceholder.id);

        console.log('media index= ', placeholderMediaItemIndex)

        if (mediaIndex != -1) {
            const selectedMedia = displayListContainer.selectedPlaceholder.parentId ?
                placeholders[mediaIndex].media[placeholderMediaItemIndex] : media[mediaIndex];
            if (selectedTeamContacts && selectedTeamContacts.length > 0) {
                const selectedContact = selectedTeamContacts[0];
                const teamContactIndex = teamContacts.findIndex((contact) => selectedContact.id === contact.id);

                if (teamContactIndex !== -1) {
                    const contact = teamContacts[teamContactIndex];
                    selectedMedia.owner = {
                        id: contact.id, first_name: contact.first_name,
                        last_name: contact.last_name, email: contact.email,
                        twitter_profile: contact.twitter_profile
                    }
                }
            }

            if (selectedTags && selectedTags.length > 0) {
                selectedMedia.tags = [];
                for (let tag of selectedTags) {
                    selectedMedia.tags.push({id: tag.id, name: tag.username});
                }
            }


            if (selectedMediaPlaceholders && selectedMediaPlaceholders.length > 0) {
                selectedMedia.media_placeholder_id = selectedMediaPlaceholders[0].id;
            }

            if (selectedAssociatePlaceholders && selectedAssociatePlaceholders.length > 0) {
                selectedMedia.contact = {
                    id: selectedAssociatePlaceholders[0].id,
                    first_name: selectedAssociatePlaceholders[0].username.split(" ")[0],
                    last_name: selectedAssociatePlaceholders[0].username.split(" ")[1]
                };
            }


            if (selectedAssociatePlaceholders.parentId) {
                placeholders[mediaIndex].media[placeholderMediaItemIndex] = selectedMedia;
                setPlaceHolders(placeholders);
            } else {
                media[mediaIndex] = selectedMedia;
                setMedia(media);
            }
        }

        //setShowBackButton(false);
        //handleSelectedPlaceHolder(null, false, false, true);
        //setShowMediaStats(false);
        //props.history.push('/media');
        notify("Media saved successfully")

        console.log('id = ', mediaIndex, '   ', taggedMedia, '  ', selectedTags, '  ',)

    }


    let MediaList = null;


    const showOnlyPlaceholders =
        props.filter &&
        props.filter.findIndex((f) => f.type === 'placeholders') === -1 ? false :
            !displayListContainer.selectedPlaceholder && true


    const personalizedMediaSelected =
        props.filter &&
        props.filter.findIndex((f) => f.type === 'personalized') === -1 ? false : true


    console.log('render = ', displayListContainer.selectedPlaceholder)

    if ((displayListContainer.showMediaListView || props.filter.length > 0 || displayListContainer.selectedPlaceholder) && media) {
        if (displayListContainer.selectedPlaceholder && displayListContainer.selectedPlaceholder.media) {
            MediaList = displayListContainer.selectedPlaceholder.media.filter((item) => item.name && item.urls && item.urls.thumb && item.created_at)
                .map((item) => {
                    return {
                        ...item,
                        name: item.name,
                        url: item.urls.thumb,
                        date: item.created_at,
                        id: item.id,
                        type: 'media'
                    }
                });
        } else {
            MediaList = media.filter((item) => item.name && item.urls && item.urls.thumb && item.created_at)
                .map((item) => {
                    return {
                        ...item,
                        name: item.name,
                        url: item.urls.thumb,
                        date: item.created_at,
                        id: item.id,
                        type: 'media'
                    }
                });
        }

    }


    console.log('filter = ', displayListContainer, '  showMediaStats = ', showMediaStats);
    return (
        <div
            style={{
                width: props.showSideFilters === true ? "85%" : "100%",
                height: showMediaStats ? "100%" :
                    (personalizedMediaSelected && !showOnlyPlaceholders) ? "130vh" : "95vh",
                background: "white",
                borderRadius: 5,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
            }}
            onClick={(e) => {
                closeAllMediaDetailsDialogs();
            }}
        >
            <Header
                setshowSideFilters={handleShowSideFilters}
                setShowDrawer={handleShowDrawer}
                setShowAnimation={handleShowAnimation}
                setShowMediaStats={handleShowMediaStats}
                setSelectedPlaceHolder={handleSelectedPlaceHolder}
                handleMediaDrawer={props.handleMediaDrawer}
                handleAnimation={handleAnimation}
                showAnimation={showAnimation}
                showSideFilters={showSideFilters}
                showMediaStats={showMediaStats}
                selectedCheckBoxes={selectedCheckBoxes}
                dropDownButtonItemsList={dropDownButtonItemsList}
                showDrawer={showDrawer}
                setShowBackButton={handleSetShowBackButton}
                showBackButton={showBackButton}
                setShowlistView={handleSetShowListView}
                displayListContainer={displayListContainer}
                history={props.history}
                showSave={displayListContainer.selectedPlaceholder && !displayListContainer.isPlaceholderSelected ? true : false}
                saveTag={saveTag}
                showFilter={!displayListContainer.selectedPlaceholder ? true : false}
                setShowFilters={handleSetShowFilters}
                showListButton={displayListContainer.selectedPlaceholder ? false : true}
                setShowTagsDialog={handleTagsDialog}
            />
            {!displayListContainer.selectedPlaceholder &&
            <SelectedItemsContainer filter={props.filter} removeDataFromFilter={props.removeDataFromFilter}/>
            }

            {showFilters && !showMediaStats && renderFilters()}
            {props.filter.length > 0 && !showOnlyPlaceholders && !displayListContainer.selectedPlaceholder &&
            <Fragment>
                <ItemMainHeader title={"Media"}
                                dropdown_item_title={"Last Modified"}
                                CustomToggle={CustomToggle}/>
                <PlaceholderTableList list={MediaList}
                                      handleScroll={handleScroll}
                                      isPlaceholder={false}
                                      setLightboxPicture={handleSetLightboxPicture}
                                      setLightboxVideo={handleSetLightboxVideo}
                                      filter={props.filter}
                                      isMedia={true}
                                      showFullHeight={(props.filter).length > 0 ? true : false}
                                      setSelectedPlaceHolder={handleSelectedPlaceHolderListView}/>


            </Fragment>}

            {
                (showOnlyPlaceholders || personalizedMediaSelected) &&
                <Placeholder
                    CustomToggle={CustomToggle}
                    placeholders={placeholders}
                    handleScroll={handleScroll}
                    handleSelectedPlaceHolder={handleSelectedPlaceHolder}
                    viewMorePlaceholder={viewMorePlaceholder}
                    placeholderEndIndex={placeholderEndIndex}
                    setViewMorePlaceholder={handleViewMorePlaceholder}
                    setPlaceholderEndIndex={handlePlaceholderEndIndex}
                    setPlaceholderStartIndex={handlePlaceholderStartIndex}
                    handlePlaceholderClick={handlePlaceholderClick}
                    setPlacehoderHover={handlePlaceholderHover}
                    placeholderHover={placeholderHover}
                    isPlaceHolder={true}
                    selectedCheckBoxes={selectedCheckBoxes}
                    mediaHover={mediaHover}
                    makeMediaSelected={props.makeMediaSelected}
                    setMediaHover={handleMediaHover}
                    setDisplayAction={handleMediaDisplayAction}
                    makeCheckBoxSelected={makeCheckBoxSelected}
                    setShowMediaStats={handleShowMediaStats}
                    setSelectedPlaceHolder={handleSelectedPlaceHolder}
                    setSelectedPlaceHolderListView={handleSelectedPlaceHolderListView}
                    showlistView={true}
                    message={props.message}
                    showHover={true}
                    setShowBackButton={handleSetShowBackButton}
                    showBackButton={showBackButton}
                    setLightboxVideo={handleSetLightboxVideo}
                    setLightboxPicture={handleSetLightboxPicture}
                    personalizedMediaSelected={personalizedMediaSelected}
                />
            }


            <div
                style={{
                    width: "100%",
                    border: "1px solid #f8f8f8",
                    marginTop: 10,
                }}
            ></div>


            {showFiltersRow === true ? renderFilters() : <div></div>}
            {(props.filter.length <= 0 || displayListContainer.selectedPlaceholder) &&
            <div style={{width: "100%", overflowX: "scroll", marginTop: 10}}>
                {
                    showMediaStats ?

                        <Grid container direction="column">
                            <Grid item xs={displayListContainer.isPlaceholderSelected ? 6 : 12}>
                                <MediaItemDetails
                                    count={count}
                                    filter={filter}
                                    teamContacts={teamContacts}
                                    handlePlaceholderClick={handlePlaceholderClick}
                                    setPlacehoderHover={handlePlaceholderHover}
                                    placeholderHover={placeholderHover}
                                    isPlaceHolder={false}
                                    selectedCheckBoxes={selectedCheckBoxes}
                                    mediaHover={mediaHover}
                                    displayPlaceholder={displayPlaceholder}
                                    makeMediaSelected={props.makeMediaSelected}
                                    setMediaHover={handleMediaHover}
                                    setDisplayAction={handleMediaDisplayAction}
                                    makeCheckBoxSelected={makeCheckBoxSelected}
                                    setShowMediaStats={handleShowMediaStats}
                                    setSelectedPlaceHolder={handleSelectedPlaceHolder}
                                    setDisplayOwner={handleSetDisplayOwner}
                                    setDisplayTags={handleSetDisplayTags}
                                    setDisplayPlaceholder={handleSetDisplayPlaceholder}
                                    displayPlaceholder={displayPlaceholder}
                                    displayTags={displayTags}
                                    addDataToFilter={addDataToFilter}
                                    id={"messageDetailScrollPublished"}
                                    hideCheckBox={null}
                                    hideStats={null}
                                    selectedPlaceholder={displayListContainer.selectedPlaceholder}
                                    removeDataFromFilter={removeDataFromFilter}
                                    selectedTeamContacts={selectedTeamContacts}
                                    showHover={false}
                                    setSelectedTagContainer={handleSetSelectedTagContainer}
                                    selectedTags={selectedTags}
                                    taggedMedia={taggedMedia}
                                    myMediaContacts={myMediaContacts}
                                    setSelectedMediaPlaceholders={handleSetSelectedMediaPlaceholders}
                                    selectedMediaPlaceholders={selectedMediaPlaceholders}
                                    placeholders={placeholders}
                                    setSelectedAssociatePlaceholderContainer={handleSetSelectedAssociatePlaceholder}
                                    selectedAssociatePlaceholders={selectedAssociatePlaceholders}
                                    displaySearchContainers={displaySearchContainers}
                                    onChangeMediaDetailsSearch={onChangeMediaDetailsSearch}
                                    searchMediaDetailsContainer={searchMediaDetailsContainer}
                                    contacts={contacts}
                                    setSelectedItems={handleSetSelectedMediaDetails}
                                />
                            </Grid>

                        </Grid>
                        :
                        <div
                            style={{width: "100%", maxHeight: 460, minWidth: 1110}}
                            className="fullHeightMedia"
                            id="infinit"
                            // onScroll={() => {
                            //   handleScroll();
                            // }}
                        >

                            {
                                displayListContainer.selectedPlaceholder === null || props.message ?
                                    (
                                        displayListContainer.showMediaListView ? (
                                                <Fragment>
                                                    <ItemMainHeader title={"Media"}
                                                                    dropdown_item_title={"Last Modified"}
                                                                    CustomToggle={CustomToggle}/>
                                                    <PlaceholderTableList list={MediaList}
                                                                          handleScroll={handleScroll}
                                                                          isPlaceholder={false}
                                                                          setLightboxPicture={handleSetLightboxPicture}
                                                                          setLightboxVideo={handleSetLightboxVideo}
                                                                          setSelectedPlaceHolder={handleSelectedPlaceHolderListView}/>
                                                </Fragment>
                                            ) :
                                            <Media
                                                CustomToggle={CustomToggle}
                                                setViewMoreQuickAccess={handleViewMoreQuickAccess}
                                                setQuickAccessEndIndex={handleQuickAccessEndIndex}
                                                setQuickAccessStartIndex={handleQuickAccessStartIndex}
                                                selectedPlaceholder={displayListContainer.selectedPlaceholder}
                                                message={props.message}
                                                media={media}
                                                viewMoreQuickAccess={viewMoreQuickAccess}
                                                quickAccessEndIndex={quickAccessEndIndex}
                                                handlePlaceholderClick={handlePlaceholderClick}
                                                setPlacehoderHover={handlePlaceholderHover}
                                                placeholderHover={placeholderHover}
                                                isPlaceHolder={false}
                                                selectedCheckBoxes={selectedCheckBoxes}
                                                mediaHover={mediaHover}
                                                makeMediaSelected={props.makeMediaSelected}
                                                setMediaHover={handleMediaHover}
                                                setDisplayAction={handleMediaDisplayAction}
                                                makeCheckBoxSelected={makeCheckBoxSelected}
                                                setShowMediaStats={handleShowMediaStats}
                                                setSelectedPlaceHolder={handleSelectedPlaceHolder}
                                                showHover={true}
                                                setShowBackButton={handleSetShowBackButton}
                                                showBackButton={showBackButton}
                                                setLightboxVideo={handleSetLightboxVideo}
                                                setLightboxPicture={handleSetLightboxPicture}
                                            />
                                    )
                                    : (
                                        <PlaceholderDetails
                                            handlePlaceholderClick={handlePlaceholderClick}
                                            setPlacehoderHover={handlePlaceholderHover}
                                            placeholderHover={placeholderHover}
                                            isPlaceHolder={true}
                                            item={displayListContainer.selectedPlaceholder}
                                            selectedCheckBoxes={selectedCheckBoxes}
                                            mediaHover={mediaHover}
                                            makeMediaSelected={props.makeMediaSelected}
                                            setMediaHover={handleMediaHover}
                                            setDisplayAction={handleMediaDisplayAction}
                                            makeCheckBoxSelected={makeCheckBoxSelected}
                                            setShowMediaStats={handleShowMediaStats}
                                            setSelectedPlaceHolder={handleSelectedPlaceHolder}
                                            showHover={false}

                                        />

                                    )}

                            {/*<PlaceholderListButton
                                setShowlistView={handleSetShowListView}
                                displayListContainer={displayListContainer}
                            />*/}

                            {
                                displayListContainer.selectedPlaceholder === null ?
                                    <Placeholder
                                        CustomToggle={CustomToggle}
                                        placeholders={placeholders}
                                        handleScroll={handleScroll}
                                        handleSelectedPlaceHolder={handleSelectedPlaceHolder}
                                        viewMorePlaceholder={viewMorePlaceholder}
                                        placeholderEndIndex={placeholderEndIndex}
                                        setViewMorePlaceholder={handleViewMorePlaceholder}
                                        setPlaceholderEndIndex={handlePlaceholderEndIndex}
                                        setPlaceholderStartIndex={handlePlaceholderStartIndex}
                                        handlePlaceholderClick={handlePlaceholderClick}
                                        setPlacehoderHover={handlePlaceholderHover}
                                        placeholderHover={placeholderHover}
                                        isPlaceHolder={true}
                                        selectedCheckBoxes={selectedCheckBoxes}
                                        mediaHover={mediaHover}
                                        makeMediaSelected={props.makeMediaSelected}
                                        setMediaHover={handleMediaHover}
                                        setDisplayAction={handleMediaDisplayAction}
                                        makeCheckBoxSelected={makeCheckBoxSelected}
                                        setShowMediaStats={handleShowMediaStats}
                                        setSelectedPlaceHolder={handleSelectedPlaceHolder}
                                        setSelectedPlaceHolderListView={handleSelectedPlaceHolderListView}
                                        showlistView={displayListContainer.showPlaceholderListView}
                                        message={props.message}
                                        showHover={true}
                                        setShowBackButton={handleSetShowBackButton}
                                        showBackButton={showBackButton}
                                        setLightboxVideo={handleSetLightboxVideo}
                                        setLightboxPicture={handleSetLightboxPicture}
                                    />
                                    :
                                    <div style={{marginTop: 20, height: '100%'}}>
                                        <PlaceholderListButton
                                            setShowlistView={handleSetPlaceholderDetailsListView}
                                            displayListContainer={displayListContainer}
                                            isPlaceholderDetails={true}
                                        />
                                        {
                                            displayListContainer.showPlaceholderDetailsListView ?
                                                <PlaceholderTableList list={MediaList}
                                                                      handleScroll={handleScroll}
                                                                      isPlaceholder={false}
                                                                      placeholderId={displayListContainer.selectedPlaceholder.id}
                                                                      isPlaceholderDetails={true}
                                                                      setShowMediaStats={handleShowMediaStats}
                                                                      setLightboxPicture={handleSetLightboxPicture}
                                                                      setLightboxVideo={handleSetLightboxVideo}
                                                                      setSelectedPlaceHolder={handleSuggestionPlaceholder}/>
                                                :
                                                <Media
                                                    CustomToggle={CustomToggle}
                                                    setViewMoreQuickAccess={handleViewMoreQuickAccess}
                                                    setQuickAccessEndIndex={handleQuickAccessEndIndex}
                                                    setQuickAccessStartIndex={handleQuickAccessStartIndex}
                                                    selectedPlaceholder={displayListContainer.selectedPlaceholder}
                                                    message={props.message}
                                                    media={displayListContainer.selectedPlaceholder.media}
                                                    viewMoreQuickAccess={viewMoreQuickAccess}
                                                    quickAccessEndIndex={quickAccessEndIndex}
                                                    handlePlaceholderClick={handlePlaceholderClick}
                                                    setPlacehoderHover={handlePlaceholderHover}
                                                    placeholderHover={placeholderHover}
                                                    isPlaceHolder={false}
                                                    selectedCheckBoxes={selectedCheckBoxes}
                                                    mediaHover={mediaHover}
                                                    makeMediaSelected={props.makeMediaSelected}
                                                    setMediaHover={handleMediaHover}
                                                    setDisplayAction={handleMediaDisplayAction}
                                                    makeCheckBoxSelected={makeCheckBoxSelected}
                                                    setShowMediaStats={handleShowMediaStats}
                                                    setSelectedPlaceHolder={handleSelectedPlaceHolder}
                                                    showHover={true}
                                                    setShowBackButton={handleSetShowBackButton}
                                                    showBackButton={showBackButton}
                                                    setLightboxVideo={handleSetLightboxVideo}
                                                    setLightboxPicture={handleSetLightboxPicture}
                                                    isPlaceholderDetails={true}

                                                />
                                        }
                                    </div>
                            }


                            {props.message ? (
                                <div></div>
                            ) : (
                                !displayListContainer.selectedPlaceholder &&
                                <Tag
                                    taggedMedia={taggedMedia}
                                    CustomToggle={CustomToggle}
                                    handleShowTagsDialog={handleShowTagsDialog}
                                    handleOpenSnackBar={handleOpenSnackBar}
                                    addDataToFilter={props.addDataToFilter}
                                />
                            )}
                        </div>
                }

            </div>
            }
            <Grid container direction="row" alignItems="center"></Grid>
            {

                < TagSearchModal
                    showTagsDialog={showTagsDialog}
                    tagSearch={tagSearch}
                    allTags={allTags}
                    setTagSearch={handleSetTagSearch}
                    setShowTagsDialog={handleShowTagsDialog}
                    setOpenSnackBar={handleOpenSnackBar}
                />
            }
            {lightboxPicture && (
                <LightboxDialog url={lightboxPicture} isVideo={false} closeModal={handleSetLightboxPicture}/>
            )}

            {lightboxVideo && (
                <LightboxDialog url={lightboxVideo} isVideo={true} closeModal={handleSetLightboxVideo}/>
            )}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default MediaComponent;
