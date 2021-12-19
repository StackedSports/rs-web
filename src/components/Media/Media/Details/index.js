import {Grid, makeStyles} from "@material-ui/core";
import MediaItem from "../Item/item";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";


import MediaInfo from './info';
import SelectedContactItem from './selected-contact';
import DropDownItem from './contact-item';


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
        backgroundColor: "white",
        minWidth: 230,
        boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
        border: "1px solid #d5d5d5",
        borderRadius: 4,
        // padding: 5,
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


const MediaDetails = (props) => {

    const classes = useStyles();


    const filter = props.filter,
        selectedTeamContacts = props.selectedTeamContacts,
        teamContacts = props.teamContacts,
        selectedTags = props.selectedTags,
        taggedMedia = props.taggedMedia,
        selectedMediaPlaceholders = props.selectedMediaPlaceholders,
        placeholders = props.placeholders,
        myMediaContacts = props.myMediaContacts,
        selectedAssociatePlaceholders = props.selectedAssociatePlaceholders;


    console.log('setMyMediaContacts =  ', props.searchMediaDetailsContainer)

    return (
        <Grid
            container
            direction="row"
            style={{
                border: "1px solid #d2d2d2",
                borderRadius: 4,
                marginTop: 16,
                position: 'relative',
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
            </div>
            <Grid
                container
                direction="row"
                style={{
                    width: props.hideStats ? "90%" : "70%",
                    padding: 16,
                }}
            >
                {/*Media item container*/}
                {<MediaItem
                    handlePlaceholderClick={props.handlePlaceholderClick}
                    setPlacehoderHover={props.setPlacehoderHover}
                    placeholderHover={props.placeholderHover}
                    isPlaceHolder={false}
                    item={props.selectedPlaceholder}
                    selectedCheckBoxes={props.selectedCheckBoxes}
                    mediaHover={props.mediaHover}
                    makeMediaSelected={props.makeMediaSelected}
                    setMediaHover={props.setMediaHover}
                    setDisplayAction={props.setDisplayAction}
                    makeCheckBoxSelected={props.makeCheckBoxSelected}
                    setShowMediaStats={props.setShowMediaStats}
                    setSelectedPlaceHolder={props.setSelectedPlaceHolder}
                    setShowBackButton={props.setShowBackButton}

                />}
                {/*Item details*/}
                {<MediaInfo selectedPlaceholder={props.selectedPlaceholder} messageStatus={props.messageStatus}/>}
                <Grid container direction="row">
                    <Grid item md={12} xs={12}>
                        <p style={{color: "#b5bccd", fontSize: 17, fontWeight: 500}}>
                            Owner
                        </p>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            style={{border: "1px solid #b5bccd", borderRadius: 4}}
                        >
                            {(selectedTeamContacts).length != 0 &&
                            selectedTeamContacts.map((teamContact, index) => {
                                return (
                                    <SelectedContactItem
                                        item={teamContact}
                                        type={"SELECTED_TEAM_CONTACTS"}
                                        index={index}
                                        removeDataFromFilter={props.removeDataFromFilter}/>
                                );
                            })}
                            <div class="dropdownMedia" style={{position: 'relative'}}>
                                <input
                                    type="text"
                                    style={{
                                        height: 60,
                                        flex: "auto",
                                        border: "none",
                                        padding: 16
                                    }}
                                    id="owner"
                                    onClick={(e) => {
                                        console.log("This is ", e.target.id);
                                        props.setDisplayOwner(true);
                                        e.stopPropagation();
                                    }}
                                    placeholder="+ Add Owner"
                                ></input>

                                <div
                                    className={classes.dropdownHidden}
                                    style={{
                                        display: props.displaySearchContainers.displayOwner ? "block" : "none",
                                        height: '35vh',
                                        position: 'absolute',
                                        left: 1,
                                        top: '-26vh',
                                        overflowX: 'hidden',
                                        overflowY: 'scroll'
                                    }}
                                >
                                    <Grid container direction="row" justify="center">
                                        <input
                                            type="text"
                                            style={{
                                                width: "100%",
                                                border: "1px solid #ebebeb",
                                                borderRadius: 4,
                                                height: 40,
                                                paddingLeft: 4,
                                            }}
                                            onChange={(e) => {
                                                props.onChangeMediaDetailsSearch("SELECTED_TEAM_CONTACTS", e.target.value);
                                                e.stopPropagation();
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            placeholder="Search"
                                            value={props.searchMediaDetailsContainer.ownerSearch}
                                        ></input>
                                    </Grid>
                                    {teamContacts &&
                                    teamContacts
                                        .filter((type) => ((type && type.twitter_profile && type.twitter_profile.screen_name &&
                                                (type.twitter_profile.screen_name).toLowerCase()
                                                    .includes((props.searchMediaDetailsContainer.ownerSearch).toLowerCase())) ||
                                            props.searchMediaDetailsContainer.ownerSearch.length === 0
                                        ))
                                        .map((type, index) => {
                                            return (
                                                type && type.twitter_profile && type.twitter_profile.screen_name &&
                                                <DropDownItem
                                                    addDataToFilter={props.addDataToFilter}
                                                    username={type.twitter_profile.screen_name}
                                                    url={type.twitter_profile.profile_image}
                                                    setDisplay={props.setDisplayOwner}
                                                    type={"SELECTED_TEAM_CONTACTS"}/>
                                            );
                                        })}
                                </div>


                                {" "}
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <p
                            style={{
                                color: "#b5bccd",
                                fontSize: 17,
                                fontWeight: 500,
                                marginTop: 16,
                            }}
                        >
                            Tags
                        </p>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            style={{border: "1px solid #b5bccd", borderRadius: 4}}
                        >
                            {(selectedTags).length != 0 &&
                            selectedTags.map((tag, index) => {
                                return (
                                    <SelectedContactItem
                                        item={tag}
                                        type={"SELECTED_TAGS"}
                                        index={index}
                                        removeDataFromFilter={props.removeDataFromFilter}/>
                                );
                            })}
                            <div class="dropdownMedia" style={{position: 'relative'}}>
                                <input
                                    type="text"
                                    style={{
                                        height: 60,
                                        flex: "auto",
                                        border: "none",
                                        padding: 16,
                                    }}
                                    id="tags"
                                    onClick={(e) => {
                                        console.log("This is ", e.target.id);
                                        props.setSelectedTagContainer(true);
                                        e.stopPropagation();

                                    }}
                                    placeholder="+ Add Tag"
                                ></input>
                                <div
                                    className={classes.dropdownHidden}
                                    style={{
                                        display: props.displaySearchContainers.selectedTagContainer ? "block" : "none",
                                        height: '35vh',
                                        position: 'absolute',
                                        top: '-26vh',
                                        left: 1,
                                        overflowX: 'hidden',
                                        overflowY: 'scroll'
                                    }}
                                >
                                    <Grid container direction="row" justify="center">
                                        <input
                                            type="text"
                                            style={{
                                                width: "100%",
                                                border: "1px solid #ebebeb",
                                                borderRadius: 4,
                                                height: 40,
                                                paddingLeft: 4,
                                            }}
                                            onChange={(e) => {
                                                props.onChangeMediaDetailsSearch("SELECTED_TAGS", e.target.value);
                                                e.stopPropagation();
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            placeholder="Search"
                                            value={props.searchMediaDetailsContainer.tagSearch}
                                        ></input>
                                    </Grid>
                                    {taggedMedia &&
                                    taggedMedia
                                        .filter((tag) => ((tag && tag.name &&
                                                (tag.name).toLowerCase()
                                                    .includes((props.searchMediaDetailsContainer.tagSearch).toLowerCase())) ||
                                            props.searchMediaDetailsContainer.tagSearch.length === 0
                                        ))
                                        .map((tag, index) => {
                                            return (
                                                tag && tag.name &&
                                                <DropDownItem
                                                    addDataToFilter={props.addDataToFilter}
                                                    username={tag.name}
                                                    url={''}
                                                    setDisplay={props.setSelectedTagContainer}
                                                    type={"SELECTED_TAGS"}/>
                                            );
                                        })}
                                </div>
                                {" "}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={1}>
                        <Grid item md={6} xs={6}>
                            <p
                                style={{
                                    color: "#b5bccd",
                                    fontSize: 17,
                                    fontWeight: 500,
                                    marginTop: 16,
                                }}
                            >
                                Associate to placeholder
                            </p>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                style={{border: "1px solid #b5bccd", borderRadius: 4}}
                            >
                                {(selectedMediaPlaceholders).length != 0 &&
                                selectedMediaPlaceholders.map((teamContact, index) => {
                                    return (
                                        <SelectedContactItem
                                            item={teamContact}
                                            type={"SELECTED_PLACEHOLDERS"}
                                            index={index}
                                            removeDataFromFilter={props.removeDataFromFilter}/>
                                    );
                                })}
                                <div class="dropdownMedia" style={{position: 'relative'}}>
                                    <input
                                        type="text"
                                        style={{
                                            height: 60,
                                            flex: "auto",
                                            border: "none",
                                            padding: 16,
                                        }}
                                        id="placeholder"
                                        onClick={(e) => {
                                            props.setSelectedMediaPlaceholders(true);
                                            e.stopPropagation();

                                        }}
                                        placeholder="+ Add Media placeholder or personalized graphics"
                                    ></input>
                                    <div
                                        className={classes.dropdownHidden}
                                        style={{
                                            display: props.displaySearchContainers.selectedPlaceholderContainer ? "block" : "none",
                                            height: '35vh',
                                            top: '-26vh',
                                            position: 'absolute',
                                            left: 1,
                                            overflowX: 'hidden',
                                            overflowY: 'scroll'
                                        }}
                                    >
                                        <Grid container direction="row" justify="center">
                                            <input
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    border: "1px solid #ebebeb",
                                                    borderRadius: 4,
                                                    height: 40,
                                                    paddingLeft: 4,
                                                }}
                                                onChange={(e) => {
                                                    props.onChangeMediaDetailsSearch("SELECTED_PLACEHOLDERS", e.target.value);
                                                    e.stopPropagation();
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                placeholder="Search"
                                                value={props.searchMediaDetailsContainer.placeholderSearch}
                                            ></input>
                                        </Grid>
                                        {placeholders &&
                                        placeholders
                                            .filter((placeholder) => ((
                                                    placeholder && placeholder.name &&
                                                    (placeholder.name).toLowerCase()
                                                        .includes((props.searchMediaDetailsContainer.placeholderSearch).toLowerCase())) ||
                                                props.searchMediaDetailsContainer.placeholderSearch.length === 0
                                            ))
                                            .map((placeholder, index) => {
                                                return (
                                                    placeholder && placeholder.name &&
                                                    <DropDownItem
                                                        addDataToFilter={props.addDataToFilter}
                                                        username={placeholder.name}
                                                        url={placeholder.media_preview}
                                                        setDisplay={props.setSelectedMediaPlaceholders}
                                                        type={"SELECTED_PLACEHOLDERS"}/>
                                                );
                                            })}
                                    </div>

                                    {" "}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <p
                                style={{
                                    color: "#b5bccd",
                                    fontSize: 17,
                                    fontWeight: 500,
                                    marginTop: 16,
                                }}
                            >
                                Associate to Contact
                            </p>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                style={{border: "1px solid #b5bccd", borderRadius: 4}}
                            >
                                {(selectedAssociatePlaceholders).length != 0 &&
                                selectedAssociatePlaceholders.map((placeholder, index) => {
                                    return (
                                        <SelectedContactItem
                                            item={placeholder}
                                            type={"SELECTED_ASSOCIATE_PLACEHOLDER"}
                                            index={index}
                                            removeDataFromFilter={props.removeDataFromFilter}/>
                                    );
                                })}
                                <div class="dropdownMedia" style={{position: 'relative'}}>
                                    <input
                                        type="text"
                                        style={{
                                            height: 60,
                                            flex: "auto",
                                            border: "none",
                                            padding: 16,
                                        }}
                                        id="placeholder"
                                        onClick={(e) => {
                                            props.setSelectedAssociatePlaceholderContainer(true);
                                            e.stopPropagation();
                                        }}
                                        placeholder="+ Associate to Contact"
                                    ></input>

                                    <div
                                        className={classes.dropdownHidden}
                                        style={{
                                            display: props.displaySearchContainers.selectedAssociatePlaceholderContainer ? "block" : "none",
                                            height: '35vh',
                                            position: 'absolute',
                                            left: 1,
                                            top: '-26vh',
                                            overflowX: 'hidden',
                                            overflowY: 'scroll'
                                        }}
                                    >
                                        <Grid container direction="row" justify="center">
                                            <input
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    border: "1px solid #ebebeb",
                                                    borderRadius: 4,
                                                    height: 40,
                                                    paddingLeft: 4,
                                                }}
                                                onChange={(e) => {
                                                    props.onChangeMediaDetailsSearch("SELECTED_ASSOCIATE_PLACEHOLDER", e.target.value);
                                                    e.stopPropagation();
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                placeholder="Search"
                                                value={props.searchMediaDetailsContainer.associateSearch}
                                            ></input>
                                        </Grid>
                                        {myMediaContacts &&
                                        myMediaContacts
                                            .filter((contact) => ((
                                                    contact.first_name && contact.last_name &&
                                                    ((contact.first_name).toLowerCase()+' '+(contact.last_name).toLowerCase())
                                                        .includes((props.searchMediaDetailsContainer.associateSearch).toLowerCase())) ||
                                                props.searchMediaDetailsContainer.associateSearch.length === 0
                                            ))
                                            .map((contact, index) => {
                                            return (
                                                contact.first_name && contact.last_name &&
                                                <DropDownItem
                                                    addDataToFilter={props.addDataToFilter}
                                                    username={contact.first_name + ' ' + contact.last_name}
                                                    url={contact.url}
                                                    setDisplay={props.setSelectedAssociatePlaceholderContainer}
                                                    type={"SELECTED_ASSOCIATE_PLACEHOLDER"}/>
                                            );
                                        })}
                                    </div>
                                    {" "}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
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
                            height: "10%",
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
                            Media Stats
                        </p>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.mediaStatsGrid}
                    >
                        <p
                            className={classes.mediaStatsRightHeading}
                        >
                            Media Sent In:
                        </p>
                        <p
                            className={classes.mediaStatsRightState}
                        >
                            0 Messages
                        </p>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.mediaStatsGrid}
                    >
                        <p
                            className={classes.mediaStatsRightHeading}
                        >
                            Media Published In:
                        </p>
                        <p
                            className={classes.mediaStatsRightState}
                        >
                            0 Tweets
                        </p>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{
                            // height: "15%",
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
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{
                                // height: "60%",
                            }}
                        >
                            <p
                                className={classes.mediaStatsRightState}
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
                                Contact Engagement (286/300)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                64
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    margin: 0,
                                }}
                            >
                                Favorite From Contacts (286/300)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                17
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    margin: 0,
                                    height: 30,
                                }}
                            >
                                Retweets front Contacts (286/300)
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{
                            // height: "15%",
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
                            Post Stats
                        </p>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{
                                // height: "60%",
                            }}
                        >
                            <p
                                className={classes.mediaStatsRightState}
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
                                Contact Engagement (286/300)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                64
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    margin: 0,
                                }}
                            >
                                Favorite From Contacts (286/300)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                17
                            </p>
                            <p
                                style={{
                                    fontSize: 12,
                                    margin: 0,
                                    height: 30,
                                }}
                            >
                                Retweets front Contacts (286/300)
                            </p>
                        </Grid>
                    </Grid>
                </div>
            )}
        </Grid>
    );
};

export default MediaDetails;