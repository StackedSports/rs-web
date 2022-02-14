import React, { useState, useEffect, useReducer, Fragment } from "react";
import ReactDOM from "react-dom";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import IconTextField from "../common/Fields/IconTextField";


import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import {
    makeStyles,
    Grid,
    Checkbox,
    Dialog,
    withStyles,
    Slider, Snackbar,
} from "@material-ui/core";
import moment from "moment";


import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Dropdown, DropdownButton } from "react-bootstrap";


import MediaItemDetails from './Media/Details';
import ItemMainHeader from './Media/Header';
import TagSearchModal from './Tags/TagSearchModal';
import LightboxDialog from './LightboxDialog';
import Header from './Header';
import SelectedItemsContainer from './SelectedItemsContainer';
import Media from './Media';
import PlaceholderDetails from './PlaceholderDetails';
import PlaceholderListButton from './Placehoder/PlaceholderListButton';
import Tag from './Tags';
import Pagination from './Pagination';
import PlaceholderTableList from './Media/TableList/index';
import Placeholder from './Placehoder';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import {
    getAllContacts,
    getMedia,
    getMediaTag,
    getPlaceholder,
    getMediaUsers,
    getTeamContacts,
    getTags,
    getSearchedContacts,
} from "../../ApiHelper";
import { fileTypes } from '../../utils/FileUtils';

import { MoreHoriz } from "@material-ui/icons";
import SelectedContactItem from "./Media/Details/selected-contact";
import TimePicker from "../DateTimePicker";
import ArrowBackwardIosIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { DarkContainer } from "../common/Elements/Elements";

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
    const [filter, setFilter] = useState([]);


    const [displayRangeCalendar, setDisplayRageCalendar] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);


    const [mediaHistory, setMediaHistory] = useState([]);
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

    const [contacts, setContacts] = useState([]);


    const [searchedContacts, setSearchedContacts] = useState([]);

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
    const [loadingContacts, setLoadingContacts] = useState(false);

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
        setShowFilters(!showFilters);
    }

    const getMyTeamContacts = () => {
        getTeamContacts().then(
            (res) => {
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
                var TAGS = [];
                if (res.statusText === "OK") {
                    setAllTags(res.data);
                }
            },
            (error) => {
            }
        );
    };


    const getMyContacts = (page) => {
        // setLoading(true);
        setFetching(true);
        // || "2020-12-13"
        getAllContacts(page).then(
            (res) => {
                if (res.statusText === "OK") {
                    let tempContacts = (res.data).map((c) => {
                        c.page = page;
                        return c;
                    });
                    tempContacts = contacts.concat(tempContacts);
                    setContacts(tempContacts);

                    setFetching(false);
                }
            },
            (error) => {
                setFetching(false);
            }
        );
    };


    const handleSearchContacts = async (search) => {
        setFetching(true);
        try {
            const res = await getSearchedContacts(search);
            setSearchedContacts(res.data);
            setFetching(false);

        } catch (error) {
            setFetching(false);
        }
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
                if (res.statusText === "OK") {
                    setMyMediaContacts(res.data);
                }
            },
            (error) => {
            }
        );
    };

    const getMyPlaceholders = async () => {
        try {
            const res = await getPlaceholder();
            if (res.statusText === "OK") {
                setPlaceHolders(res.data);
                return res.data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };

    const getTaggedMedia = () => {
        getMediaTag().then(
            (res) => {
                if (res.statusText === "OK") {
                    setTaggedMedia(res.data);
                }
            },
            (error) => {
            }
        );
    };


    const filtesSpacingStyle = {
        marginRight: 5,
    };


    const handleHistory = () => {

        const tempHistory = mediaHistory.slice(0, -1);
        if (tempHistory.length > 0) {
            const placeholder = tempHistory[0].selectedPlaceholder;

            //setShowBackButton(false);
            //handleSelectedPlaceHolder(null,false,false,true);
            setDisplayListContainer(tempHistory[0]);

            setShowMediaStats(false);
            props.history.push("?id=" + placeholder.id + "&type=" + placeholder.type);


        } else {
            setShowBackButton(false);
            handleSelectedPlaceHolder(null, false, false, true);
            setShowMediaStats(false);
            props.history.push('/media');
        }

        setMediaHistory(tempHistory);

    }


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

                //setDisplayRageCalendar(false);

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


    const onPaginationChange = (page) => {

        const pageExistInContact = contacts.findIndex((f) => f.page === page);

        if (pageExistInContact === -1) {
            getMyContacts(page);
        }
        setPage(page);

    }


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const renderFilters = () => {

        let owners = [];
        let dateCreated = [];
        let mediaContacts = [];


        for (let m of media) {
            if (m.owner && m.owner.first_name && m.owner.last_name) {
                if (owners.findIndex((o) => o.value === (m.owner.first_name + " " + m.owner.last_name)) === -1) {
                    owners.push({ type: 'owner', value: m.owner.first_name + " " + m.owner.last_name })
                }
            }
        }


        for (let m of media) {
            if (m.created_at) {
                if (dateCreated.findIndex((o) => o.value === m.created_at) === -1) {
                    dateCreated.push({ type: 'date_created', value: m.created_at })
                }
            }
        }


        for (let c of searchedContacts) {
            if (c.first_name && c.last_name) {
                if (mediaContacts.findIndex((o) => o.value === c.first_name + ' ' + c.last_name) === -1) {
                    mediaContacts.push({ type: 'associated_to', value: (c.first_name + ' ' + c.last_name) })
                }
            }
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
                                onClick={(e) => {
                                    props.addDataToFilter(option.label, "file_type");
                                    e.stopPropagation();
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
                        <Fragment style={{ position: 'relative' }}>

                            <Grid container direction="row" justify="center"
                                style={{ position: 'sticky', top: -10 }}>
                                <input
                                    type="text"
                                    style={{
                                        width: "90%",
                                        border: "1px solid #ebebeb",
                                        borderRadius: 4,
                                    }}
                                    disabled={fetching ? true : false}
                                    placeholder="Search Contacts"
                                    value={contactSearch}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            handleSearchContacts(contactSearch)
                                        }
                                        e.stopPropagation();
                                    }}
                                    onChange={(e) => {
                                        const search = e.target.value;
                                        setContactSearch(search);
                                    }}
                                ></input>
                            </Grid>
                            <div style={{ height: '120px', width: '250px' }}>
                                {
                                    fetching ?
                                        <Grid style={{ width: '100%', height: '100%' }} alignItems="center"
                                            justify="center" container>
                                            <CircularProgress />
                                        </Grid>
                                        :
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
                            </div>
                        </Fragment>


                    </DropdownButton>

                </div>

                <CalendarFilter></CalendarFilter>

                <DropdownButton
                    id="dropdown-basic-button"
                    title={stateFilter || "Tag"}
                    drop={"down"}
                    style={filtesSpacingStyle}
                    style={{ marginLeft: 5 }}
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
            setSearchMediaDetailsContainer({ ...searchMediaDetailsContainer, ownerSearch: value });
        } else if (type === 'SELECTED_TAGS') {
            setSearchMediaDetailsContainer({ ...searchMediaDetailsContainer, tagSearch: value });
        } else if (type === 'SELECTED_PLACEHOLDERS') {
            setSearchMediaDetailsContainer({ ...searchMediaDetailsContainer, placeholderSearch: value });
        } else if (type === 'SELECTED_ASSOCIATE_PLACEHOLDER') {
            setSearchMediaDetailsContainer({ ...searchMediaDetailsContainer, associateSearch: value });
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
const getalltagsuseeffcet = async ()=>{
   
        if (localStorage.getItem("user")) {
            await getMyContacts(1);
            await getTaggedMedia();
            await getMyMediaContacts();
            await getMyTeamContacts();

            const media = await getMyMedia();
            const placeholders = await getMyPlaceholders();
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const type = urlParams.get('type');

            if (type && type === "media" && media && id) {

                const index = media.findIndex((m) => m.id == id);
                if (index !== -1) {
                    ReactDOM.unstable_batchedUpdates(() => {
                        setShowMediaStats(true);
                        setShowBackButton(true);
                        handleSelectedPlaceHolder(media[index], false, false, false);
                    });
                }
            } else if (type && type === "placeholder" && placeholders && id) {

                const index = placeholders.findIndex((m) => m.id == id);
                if (index !== -1) {
                    ReactDOM.unstable_batchedUpdates(() => {
                        setShowMediaStats(false);
                        setShowBackButton(true);
                        handleSelectedPlaceHolder(placeholders[index], true, false, false);
                    });
                }
            }

            // getAllTags();
        } else {
            window.location.href = "/";
        }
  
}

    useEffect(() => {
        getalltagsuseeffcet()
      

    }, []);


    const isSelectedCheckbox = (index) => {
    };

    const checkFilters = (item) => {
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
                        isValid = true;
                        return;
                    }
                }
                if (filterType[index] === "Tag") {
                    if (Number(moment(item.grad_year).format("YYYY")) === filt) {

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


        if (isPlaceholder) {


            setDisplayListContainer({
                ...displayListContainer,
                showPlaceholderListView: true,
                showPlaceholderDetailsListView: true,
                isPlaceholderSelected: isPlaceholder,
                selectedPlaceholder: placeholder
            })

            mediaHistory.push({
                ...displayListContainer,
                showPlaceholderListView: true,
                showPlaceholderDetailsListView: true,
                isPlaceholderSelected: isPlaceholder,
                selectedPlaceholder: placeholder
            });

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


            mediaHistory.push({
                ...displayListContainer,
                showPlaceholderListView: false,
                isPlaceholderSelected: isPlaceholder,
                selectedPlaceholder: placeholder
            })
        }

        if (placeholder) {
            props.history.push("?id=" + placeholder.id + "&type=" + placeholder.type);
        }


        setMediaHistory(mediaHistory);
        console.log('media history handleSelectedPlaceHolder = ', mediaHistory)

    }


    const handleSelectedPlaceHolderListView = (id, isPlaceholder) => {


        if (isPlaceholder) {
            const index = placeholders.findIndex((item) => item.id === id);

            if (index !== -1) {
                setShowBackButton(true);
                setShowMediaStats(false);
                if (displayListContainer.showMediaListView) {
                    setDisplayListContainer({
                        ...displayListContainer,
                        selectedPlaceholder: placeholders[index]
                    });

                    mediaHistory.push({
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


                    mediaHistory.push({
                        showPlaceholderListView: true,
                        showMediaListView: false,
                        selectedPlaceholder: placeholders[index]
                    })
                    props.history.push("?id=" + placeholders[index].id + "&type=" + placeholders[index].type);

                }

                setMediaHistory(mediaHistory);
            }

        } else {
            const index = media.findIndex((item) => item.id === id);

            if (index !== -1) {
                setShowBackButton(true);
                setShowMediaStats(true);


                setDisplayListContainer({
                    ...displayListContainer,
                    selectedPlaceholder: media[index]
                });

                mediaHistory.push({
                    ...displayListContainer,
                    selectedPlaceholder: media[index]
                })

                props.history.push("?id=" + media[index].id + "&type=" + media[index].type);


                setMediaHistory(mediaHistory);

            }
        }

        console.log('media history handleSelectedPlaceHolderListView = ', mediaHistory)

    }


    const handleSetPlaceholderDetailsListView = (listView) => {

        setDisplayListContainer({
            ...displayListContainer,
            showPlaceholderDetailsListView: listView
        });




        //props.history.push("?id=" + listView.id + "&type=" + listView.type);


        console.log('media history handleSetPlaceholderDetailsListView = ', mediaHistory)

    }


    const handleSuggestionPlaceholder = (placeholder, isPlaceholder, placeholderId) => {

        props.history.push("?id=" + placeholder.id + "&type=" + placeholder.type);

        placeholder.parentId = placeholderId;
        placeholder.file_name = placeholder.name;
        setDisplayListContainer({
            ...displayListContainer,
            isPlaceholderSelected: isPlaceholder,
            selectedPlaceholder: placeholder
        });

        mediaHistory.push({
            ...displayListContainer,
            isPlaceholderSelected: isPlaceholder,
            selectedPlaceholder: placeholder
        })

        setMediaHistory(mediaHistory);

        console.log('media history handleSuggestionPlaceholder = ', mediaHistory)


    }

    const handlePlaceholderClick = (m) => {

        setDisplayListContainer({ ...displayListContainer, selectedPlaceholder: m });

        mediaHistory.push({ ...displayListContainer, selectedPlaceholder: m })

        setMediaHistory(mediaHistory);
        console.log('media history handlePlaceholderClick = ', mediaHistory)

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
        setTagSearch(tagSearch);
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

            setDisplaySearchContainers({ ...displaySearchContainers, displayOwner: false }
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

            setDisplaySearchContainers({ ...displaySearchContainers, selectedTagContainer: false }
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
            setDisplaySearchContainers({ ...displaySearchContainers, selectedPlaceholderContainer: false }
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
            setDisplaySearchContainers({ ...displaySearchContainers, selectedAssociatePlaceholderContainer: false }
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


        let mediaIndex = displayListContainer.selectedPlaceholder.parentId ?
            placeholders.findIndex((m) => m.id === displayListContainer.selectedPlaceholder.parentId)
            :
            media.findIndex((m) => m.id === displayListContainer.selectedPlaceholder.id);


        let placeholderMediaItemIndex = displayListContainer.selectedPlaceholder.parentId &&
            (placeholders[mediaIndex].media).findIndex((f) => f.id === displayListContainer.selectedPlaceholder.id);


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
                    selectedMedia.tags.push({ id: tag.id, name: tag.username });
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
        //notify("Media saved successfully")
        setOpenSnackBar(true);

    }


    let MediaList = null;


    const showOnlyPlaceholders =
        props.filter &&
            props.filter.findIndex((f) => f.type === 'placeholders') === -1 ? false :
            !displayListContainer.selectedPlaceholder && true


    const personalizedMediaSelected =
        props.filter &&
            props.filter.findIndex((f) => f.type === 'personalized') === -1 ? false : true



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


    if (personalizedMediaSelected) {
        for (let placeholder of placeholders) {
            if (placeholder.media && (placeholder.media).length > 0) {
                const placeholderMedia = (placeholder.media).map((p) => {
                    p.IsPlaceholderMedia = true;
                    return p;
                });
                MediaList = MediaList.concat(placeholderMedia);
            }
        }
    }


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
                setDisplayRageCalendar(false)
                e.stopPropagation();

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
                // setMedia={}
                
                setAddMedia={props.setAddMedia}
                showFilter={!displayListContainer.selectedPlaceholder ? true : false}
                setShowFilters={handleSetShowFilters}
                showListButton={displayListContainer.selectedPlaceholder ? false : true}
                setShowTagsDialog={handleTagsDialog}
                handleHistory={handleHistory}
            />
            

            {!displayListContainer.selectedPlaceholder &&
                <SelectedItemsContainer filter={props.filter} removeDataFromFilter={props.removeDataFromFilter} />
            }

            {showFilters && !showMediaStats && renderFilters()}
            {props.filter.length > 0 && !showOnlyPlaceholders && !displayListContainer.selectedPlaceholder &&
                <Fragment>
                    <ItemMainHeader title={"Media"}
                        dropdown_item_title={"Last Modified"}
                        CustomToggle={CustomToggle} />
                    <PlaceholderTableList list={MediaList}
                        handleScroll={handleScroll}
                        isPlaceholder={false}
                        setLightboxPicture={handleSetLightboxPicture}
                        setLightboxVideo={handleSetLightboxVideo}
                        filter={props.filter}
                        isMedia={true}
                        showFullHeight={(props.filter).length > 0 ? true : false}
                        setSelectedPlaceHolder={handleSelectedPlaceHolderListView} />


                </Fragment>}

            {
                (showOnlyPlaceholders) &&
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
                <div style={{ width: "100%", overflowX: "scroll", marginTop: 10 }}>
                    {
                        showMediaStats ?

                            <Grid container direction="column">
                                <Grid item xs={displayListContainer.isPlaceholderSelected ? 6 : 12}>
                                    <MediaItemDetails
                                        getMyContacts={getMyContacts}
                                        fetching={fetching}
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
                                style={{ width: "100%", maxHeight: 460, minWidth: 1110 }}
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
                                                        CustomToggle={CustomToggle} />
                                                    <PlaceholderTableList list={MediaList}
                                                        handleScroll={handleScroll}
                                                        isPlaceholder={false}
                                                        setLightboxPicture={handleSetLightboxPicture}
                                                        setLightboxVideo={handleSetLightboxVideo}
                                                        setSelectedPlaceHolder={handleSelectedPlaceHolderListView} />
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
                                        <div style={{ marginTop: 20, height: '100%' }}>
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
                                                        setSelectedPlaceHolder={handleSuggestionPlaceholder} />
                                                    :
                                                    <Media
                                                        CustomToggle={CustomToggle}
                                                        setViewMoreQuickAccess={handleViewMoreQuickAccess}
                                                        setQuickAccessEndIndex={handleQuickAccessEndIndex}
                                                        setQuickAccessStartIndex={handleQuickAccessStartIndex}
                                                        selectedPlaceholder={displayListContainer.selectedPlaceholder}
                                                        message={props.message}
                                                        media={MediaList}
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
                <LightboxDialog url={lightboxPicture} isVideo={false} closeModal={handleSetLightboxPicture} />
            )}

            {lightboxVideo && (
                <LightboxDialog url={lightboxVideo} isVideo={true} closeModal={handleSetLightboxVideo} />
            )}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openSnakBar}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    Media saved successfully
                </Alert>
            </Snackbar>
        </div>
    );
}

export default MediaComponent;
