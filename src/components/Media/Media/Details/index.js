import {Grid, makeStyles} from "@material-ui/core";
import MediaItem from "../Item/item";
import ClearIcon from "@material-ui/icons/Clear";
import React, {Fragment, useState} from "react";


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


    // const [selectedTeamContacts, setSelectedTeamContacts] = useState(props.selectedTeamContacts);
    // const [selectedTags, setSelectedTags] = useState(props.selectedTags);

    const filter = props.filter,
        teamContacts = props.teamContacts,
        taggedMedia = props.taggedMedia,
        placeholders = props.placeholders,
        myMediaContacts = props.myMediaContacts,
        contacts = props.contacts,
        selectedPlaceholder = props.selectedPlaceholder;


    let selectedTags = props.selectedTags;
    let selectedTeamContacts = props.selectedTeamContacts;
    let selectedMediaPlaceholders = props.selectedMediaPlaceholders;
    let selectedAssociatePlaceholders = props.selectedAssociatePlaceholders;


    React.useEffect(() => {
        selectedTags = [];
        selectedTeamContacts = [];
        selectedMediaPlaceholders = [];
        selectedAssociatePlaceholders = [];


        if (selectedPlaceholder &&
            selectedPlaceholder.owner &&
            selectedPlaceholder.owner.twitter_profile) {

            selectedTeamContacts.push({
                id: selectedPlaceholder.owner.id,
                username: selectedPlaceholder.owner.twitter_profile.screen_name,
                url: selectedPlaceholder.owner.twitter_profile.profile_image
            });
        }


        if (selectedPlaceholder && selectedPlaceholder.tags && selectedPlaceholder.tags.length > 0) {
            for (let tag of selectedPlaceholder.tags) {
                selectedTags.push({
                    username: tag.name, url: '',
                    id: tag.id

                })
            }

        }


        if (selectedPlaceholder && selectedPlaceholder.media_placeholder_id) {
            const findIndex = placeholders.findIndex((p) => p.id === selectedPlaceholder.media_placeholder_id)
            if (findIndex != -1) {
                const placeholder = placeholders[findIndex];
                selectedMediaPlaceholders.push({
                    username: placeholder.name, id: placeholder.id,
                    url: placeholder.media_preview
                })
            }
        }


        if (selectedPlaceholder && selectedPlaceholder.contact && selectedPlaceholder.contact.first_name
        && selectedPlaceholder.contact.last_name) {
            const findIndex = contacts.findIndex((c) => c.first_name + ' ' + c.last_name
                ===
                selectedPlaceholder.contact.first_name+' '+selectedPlaceholder.contact.last_name)
            if (findIndex != -1) {
                const contact = contacts[findIndex];
                selectedAssociatePlaceholders.push({
                    username: contact.first_name + ' ' + contact.last_name,
                    id: contact.id,
                    url: contact.twitter_profile.profile_image
                })
            }
        }

        // setSelectedTeamContacts(selectedTeamContacts)
        // setSelectedTags(selectedTags)

        props.setSelectedItems(selectedTeamContacts, selectedTags,
            selectedMediaPlaceholders,selectedAssociatePlaceholders);
        console.log('MediaDetails componentDidMount = ',);

    }, []);


    console.log('setMyMediaContacts =  ', props.selectedPlaceholder, '   ', selectedTags, '   ', selectedTeamContacts, '  ', props.count);

    return (
        <div style={{
            height: '100%'
        }}>
            <Grid
                container
                direction="row"
                style={{
                    border: "1px solid #d2d2d2",
                    borderRadius: 4,
                    marginTop: 16,
                    position: 'relative',
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
                                            padding: 16,
                                        }}
                                        id="owner"
                                        onClick={(e) => {
                                            console.log("This is ", e.target.id);
                                            props.setDisplayOwner(true);
                                            e.stopPropagation();
                                        }}
                                        placeholder="+ Add Owner"
                                    ></input>
                                    {selectedTeamContacts.length < 1 &&
                                    <div
                                        className={classes.dropdownHidden}
                                        style={{
                                            display: props.displaySearchContainers.displayOwner ? "block" : "none",
                                            height: '35vh',
                                            position: 'absolute',
                                            left: '27%',
                                            top: '-26vh',
                                            overflowX: 'hidden',
                                            overflowY: 'scroll'
                                        }}
                                    >
                                        <Fragment style={{position: 'relative'}}>
                                            <Grid container direction="row" justify="center"
                                                  style={{position: 'sticky', top: 0, padding: 7}}>
                                                <input
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        border: "1px solid #ebebeb",
                                                        borderRadius: 4,
                                                        height: 40,
                                                        paddingLeft: 16,

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
                                                            id={type.id}
                                                            username={type.twitter_profile.screen_name}
                                                            url={type.twitter_profile.profile_image}
                                                            setDisplay={props.setDisplayOwner}
                                                            type={"SELECTED_TEAM_CONTACTS"}/>
                                                    );
                                                })}
                                        </Fragment>

                                    </div>}


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
                                            left: '27%',
                                            overflowX: 'hidden',
                                            overflowY: 'scroll'
                                        }}
                                    >
                                        <Fragment style={{position: 'relative'}}>
                                            <Grid container direction="row" justify="center"
                                                  style={{position: 'sticky', top: 0, padding: 7}}>
                                                <input
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        border: "1px solid #ebebeb",
                                                        borderRadius: 4,
                                                        height: 40,
                                                        paddingLeft: 16,
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
                                                            id={tag.id}
                                                            username={tag.name}
                                                            url={''}
                                                            setDisplay={props.setSelectedTagContainer}
                                                            type={"SELECTED_TAGS"}/>
                                                    );
                                                })}
                                        </Fragment>
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
                                        {selectedMediaPlaceholders.length < 1 &&
                                        <div
                                            className={classes.dropdownHidden}
                                            style={{
                                                display: props.displaySearchContainers.selectedPlaceholderContainer ? "block" : "none",
                                                height: '35vh',
                                                top: '-26vh',
                                                position: 'absolute',
                                                left: '55%',
                                                overflowX: 'hidden',
                                                overflowY: 'scroll'
                                            }}
                                        >
                                            <Fragment style={{position: 'relative'}}>
                                                <Grid container direction="row" justify="center"
                                                      style={{position: 'sticky', top: 0, padding: 7}}>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            width: "100%",
                                                            border: "1px solid #ebebeb",
                                                            borderRadius: 4,
                                                            height: 40,
                                                            paddingLeft: 16,
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
                                                                id={placeholder.id}
                                                                username={placeholder.name}
                                                                url={placeholder.media_preview}
                                                                setDisplay={props.setSelectedMediaPlaceholders}
                                                                type={"SELECTED_PLACEHOLDERS"}/>
                                                        );
                                                    })}
                                            </Fragment>
                                        </div>
                                        }
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
                                        {selectedAssociatePlaceholders.length < 1 &&


                                        <div
                                            className={classes.dropdownHidden}
                                            style={{
                                                display: props.displaySearchContainers.selectedAssociatePlaceholderContainer ? "block" : "none",
                                                height: '35vh',
                                                position: 'absolute',
                                                left: '55%',
                                                top: '-26vh',
                                                overflowX: 'hidden',
                                                overflowY: 'scroll'

                                            }}

                                        >
                                            <Fragment style={{position: 'relative'}}>
                                                <Grid container direction="row" justify="center"
                                                      style={{position: 'sticky', top: 0, padding: 7}}>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            width: "100%",
                                                            border: "1px solid #ebebeb",
                                                            borderRadius: 4,
                                                            height: 40,
                                                            paddingLeft: 16,
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
                                                {contacts &&
                                                contacts
                                                    .filter((contact) => ((
                                                            contact.first_name && contact.last_name &&
                                                            ((contact.first_name + " " + contact.last_name).toLowerCase())
                                                                .includes((props.searchMediaDetailsContainer.associateSearch).toLowerCase())) ||
                                                        props.searchMediaDetailsContainer.associateSearch.length === 0
                                                    ))
                                                    .map((contact, index) => {
                                                        return (
                                                            contact.first_name && contact.last_name &&
                                                            <DropDownItem
                                                                addDataToFilter={props.addDataToFilter}
                                                                id={contact.id}
                                                                username={contact.first_name + ' ' + contact.last_name}
                                                                url={contact.twitter_profile.profile_image}
                                                                setDisplay={props.setSelectedAssociatePlaceholderContainer}
                                                                type={"SELECTED_ASSOCIATE_PLACEHOLDER"}/>
                                                        );
                                                    })}
                                            </Fragment>
                                        </div>
                                        }
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
                                className={classes.mediaStatsRightState}
                            >
                                0%
                            </p>
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
                                0
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
                                0
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                Retweets front Contacts (0/0)
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
                                className={classes.mediaStatsRightState}
                            >
                                0%
                            </p>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    margin: 0,
                                    height: 30,
                                }}
                            >
                                Contact Engagement (0/0)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                0
                            </p>
                            <p
                                style={{
                                    // height: "60%",
                                }}
                            >
                                Favorite From Contacts (0/0)
                            </p>
                            <p
                                className={classes.mediaStatsRightState}
                            >
                                0
                            </p>
                            <p
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    margin: 0,
                                    height: 30,
                                }}
                            >
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
        </div>
    );
};

export default MediaDetails;