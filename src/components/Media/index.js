import React, { useState, useEffect } from "react";
import { Grid, Checkbox, Dialog,Alert as MuiAlert, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { FaSlidersH, FaBars, FaTh } from "react-icons/fa";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";

import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ClearIcon from "@material-ui/icons/Clear";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaMagic, FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import GifIcon from "@material-ui/icons/Gif";
import DialogBox from "../common/Dialogs";

import { DarkContainer } from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import MediaComponnet from "./MediaComponent";

import SidebarComponent from './Sidebar/';

import {
    getAllContacts,
    getMedia,
    getMediaTag,
    getPlaceholder,
    getMediaUsers,
} from "../../ApiHelper";
import { MoreHoriz } from "@material-ui/icons";
import Sidebar from "../common/sidebar/sidebar";

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
        color: "rgb(137, 138, 140)",
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

function Media(props) {
    const classes = useStyles();
    // console.log("This is logged in user", localStorage.getItem("user"));
    const [filter, setFilter] = useState([]);
    const [filterType, setFilterType] = useState([]);
    const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);

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

    const [statusFilter, setStatusFilter] = useState(null);
    const [rankFilter, setRankFilter] = useState(null);
    const [gradeYearFilter, setGradeYearFilter] = useState(null);
    const [timeZoneFilter, setTimeZoneFilter] = useState(null);
    const [stateFilter, setStateFilter] = useState(null);
    const [showlistView, setShowlistView] = useState(false);

    const [contacts, setContacts] = useState(null);
    const [myMediaContacts, setMyMediaContacts] = useState(null);
    const [media, setMedia] = useState(null);
    const [placeholders, setPlaceHolders] = useState(null);
    const [selectedPlaceholder, setSelectedPlaceHolder] = useState(null);
    const [taggedMedia, setTaggedMedia] = useState(null);

    const [allTags, setAllTags] = useState(null);
    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);


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
                    // setCopyContacts(res.data);
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

    const filtesSpacingStyle = {
        marginRight: 5,
    };
    const renderFilters = () => {
        console.log("taggedMedia", taggedMedia)
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
                        {myMediaContacts &&
                            myMediaContacts.map((option) => {
                                var name = option.first_name + " " + option.last_name;
                                if (contactSearch != "") {
                                    if (
                                        name.toLowerCase().indexOf(contactSearch.toLowerCase()) > -1
                                    ) {
                                        return (
                                            <Dropdown.Item
                                                style={{
                                                    background:
                                                        timeZoneFilter === option.label
                                                            ? "#348ef7"
                                                            : "white",
                                                    color:
                                                        timeZoneFilter === option.label ? "white" : "black",
                                                }}
                                                onClick={() => {
                                                    // setTimeZoneFilter(
                                                    //   option.first_name + " " + option.last_name
                                                    // );
                                                    addDataToFilter(
                                                        option.first_name + " " + option.last_name
                                                    );
                                                }}
                                            >
                                                {option.first_name + " " + option.last_name}
                                            </Dropdown.Item>
                                        );
                                    }
                                } else {
                                    return (
                                        <Dropdown.Item
                                            style={{
                                                background:
                                                    timeZoneFilter === option.label ? "#348ef7" : "white",
                                                color:
                                                    timeZoneFilter === option.label ? "white" : "black",
                                            }}
                                            onClick={() => {
                                                addDataToFilter(
                                                    option.first_name + " " + option.last_name
                                                );
                                            }}
                                        >
                                            {option.first_name + " " + option.last_name}
                                        </Dropdown.Item>
                                    );
                                }
                            })}
                    </DropdownButton>
                </div>

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
                                                    addDataToFilter(option.name, "State");
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
                                                addDataToFilter(option.name, "State");
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

    // console.log("THis is selected placeholders", selectedPlaceholder);

    const addDataToFilter = (value, type,raw) => {

        const index = filter.findIndex((fil) => fil.username === value);


        console.log('addDataToFilter = ',value, type,raw)

        if (index === -1 && type!=='date_created') {
            filter.push({ username: value,type:type?type:'owner',raw });
            setFilter(filter);
            setCount(count + 1)

        }else{
            if(type==='date_created'){
                let tempFilter=filter.filter((f)=>f.type!=='date_created');
                tempFilter.push({ username: value,type:type?type:'owner',raw });
                setFilter(tempFilter);
                setCount(count + 1)

            }
        }
        console.log('filter = ', filter);
    };
    const removeDataFromFilter = (value, type) => {

        const index = filter.findIndex((fil) => fil.username === value.username);
        if (index !== -1) {
            filter.splice(index, 1);
            setFilter(filter);
            setCount(count + 1)
        }
        console.log('filter = ', filter);
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


    useEffect(() => {


        if (localStorage.getItem("user")) {
            // getMyContacts();
            getMyMedia();
            getMyPlaceholders();
            getTaggedMedia();
            getMyMediaContacts();
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
        console.log("THis is container ", m);
        return (
            <div
                style={{
                    width: 270,
                    height: 250,
                    marginLeft: 10,
                    // border: "1px solid #d2d2d2",
                    border:
                        selectedCheckBoxes.indexOf(m.hashid) > -1
                            ? "3px solid #4d83e0"
                            : "1px solid #d2d2d2",
                    borderRadius: 4,
                    marginBottom: 10,
                }}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ background: "#f6f6f6" }}
                    onMouseEnter={() => {
                        if (m.urls) {
                            setMediaHover(m.urls.medium);
                        }
                    }}
                    onMouseLeave={() => {
                        setMediaHover(null);
                    }}
                >
                    {(m.urls && mediaHover === m.urls.medium) ||
                        selectedCheckBoxes.indexOf(m.hashid) > -1 ? (
                        <div
                            style={{
                                width: "100%",
                                height: 190,
                                background: "rgba(0,0,0,0.6)",
                                marginBottom: -190,
                                position: "relative",
                                zIndex: 100,
                            }}
                        >
                            <Grid container direction="row">
                                <Grid item md={2} xs={2}>
                                    <Checkbox
                                        color="primary"
                                        checked={
                                            selectedCheckBoxes.indexOf(m.hashid) > -1 ? true : false
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            makeCheckBoxSelected(m.hashid);
                                        }}
                                        style={{
                                            // color: "#4d83e0",
                                            cursor: "pointer",
                                            zIndex: 500,
                                            position: "relative",
                                        }}
                                    ></Checkbox>
                                </Grid>
                                <Grid item md={9} xs={9}></Grid>
                                <Grid item md={1} xs={1}>
                                    <MoreHoriz
                                        style={{
                                            marginTop: 12,
                                            marginLeft: -12,
                                            color: "#979797",
                                            cursor: "pointer",
                                            zIndex: 500,
                                            position: "relative",
                                        }}
                                    ></MoreHoriz>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="center"
                                style={{ height: 100 }}
                            >
                                <button
                                    style={{
                                        border: "1px solid white",
                                        background: "transparent",
                                        borderRadius: 4,
                                        color: "white",
                                        fontWeight: 600,
                                        height: 35,
                                    }}
                                    onClick={() => {
                                        if (m.file_type.indexOf("video") > -1) {
                                            if (m.urls) {
                                                setLightboxVideo(m.urls.large);
                                            }
                                        } else if (m.urls) {
                                            setLightboxPicture(m.urls.medium);
                                        }
                                    }}
                                >
                                    
                                    View Media
                                </button>
                            </Grid>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <img
                        style={{ width: "80%", height: 190, objectFit: "contain" }}
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
                            fontSize: 17,
                            marginLeft: 17,
                            margin: 0,
                            marginLeft: 10,
                            fontSize: 15,
                        }}
                    >
                        {m.file_name.length > 17
                            ? m.file_name.substring(0, 17) + " ..."
                            : m.file_name}
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


    const handleMediaDrawer = (showDrawer) => {
        setshowSideFilters(showDrawer);

    }

    const placeholderContainer = (m) => {
        console.log("THis is media placeholderContainer ", m);
        return (
            <div
                style={{
                    width: 270,
                    height: 250,
                    marginLeft: 10,
                    border:
                        selectedCheckBoxes.indexOf(m.media_preview) > -1
                            ? "3px solid #4d83e0"
                            : "1px solid #d2d2d2",
                    borderRadius: 4,
                    marginBottom: 10,
                }}
                onClick={() => {
                    setSelectedPlaceHolder(m);
                }}
                onMouseEnter={() => {
                    setPlaceholderHover(m.media_preview);
                }}
                onMouseLeave={() => {
                    setPlaceholderHover(null);
                }}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ background: "#f6f6f6" }}
                >
                    {placeholderHover === m.media_preview ||
                        selectedCheckBoxes.indexOf(m.media_preview) > -1 ? (
                        <div
                            style={{
                                width: "100%",
                                height: 190,
                                background: "rgba(0,0,0,0.6)",
                                marginBottom: -190,
                                position: "relative",
                                zIndex: 100,
                            }}
                        >
                            <Grid container direction="row">
                                <Grid item md={2} xs={2}>
                                    <Checkbox
                                        color="primary"
                                        checked={
                                            selectedCheckBoxes.indexOf(m.media_preview) > -1
                                                ? true
                                                : false
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            makeCheckBoxSelected(m.media_preview);
                                        }}
                                        style={{
                                            // color: "#979797",
                                            cursor: "pointer",
                                            zIndex: 500,
                                            position: "relative",
                                        }}
                                    ></Checkbox>
                                </Grid>
                                <Grid item md={9} xs={9}></Grid>
                                <Grid item md={1} xs={1}>
                                    <MoreHoriz
                                        style={{
                                            marginTop: 12,
                                            marginLeft: -12,
                                            color: "#979797",
                                            cursor: "pointer",
                                            zIndex: 500,
                                            position: "relative",
                                        }}
                                    ></MoreHoriz>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="center"
                                style={{ height: 100 }}
                            >
                                <button
                                    style={{
                                        border: "1px solid white",
                                        background: "transparent",
                                        borderRadius: 4,
                                        color: "white",
                                        fontWeight: 600,
                                        height: 35,
                                    }}
                                    onClick={() => {
                                        setLightboxPicture(m.media_preview);
                                    }}
                                >
                                    View Media
                                </button>
                            </Grid>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <img
                        style={{ width: "80%", height: 190, objectFit: "contain" }}
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
                            fontSize: 17,
                            marginLeft: 17,
                            margin: 0
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

    return (
        <DarkContainer contacts style={{ padding: 20, marginLeft: 60 }}>
            {lightboxPicture && (
                <Dialog
                    open={true}
                    onClose={() => {
                        setLightboxPicture(null);
                    }}
                >
                    <img src={lightboxPicture}></img>
                </Dialog>
            )}

            {lightboxVideo && (
                <Dialog
                    open={true}
                    onClose={() => {
                        setLightboxVideo(null);
                    }}
                >
                    <video width="400" height="400" loop autoPlay controls>
                        <source src={lightboxVideo} type="video/mp4"></source>
                    </video>
                </Dialog>
            )}

            <Grid container direction="row" style={{ height: '80%' }}>
                {showSideFilters === true && (
                    <SidebarComponent myMediaContacts={myMediaContacts}
                        addDataToFilter={addDataToFilter}
                    />
                )}
                <MediaComponnet
                    message={null}
                    showSideFilters={showSideFilters}
                    setshowSideFilters={setshowSideFilters}
                    filter={filter}
                    count={count}
                    removeDataFromFilter={removeDataFromFilter}
                    addDataToFilter={addDataToFilter}
                    makeMediaSelected={makeMediaSelected}
                    handleMediaDrawer={handleMediaDrawer}
                    history={props?.history}
                ></MediaComponnet>
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
