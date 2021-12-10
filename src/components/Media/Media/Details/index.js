import {Grid, makeStyles} from "@material-ui/core";
import MediaItem from "../Item/item";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";



import MediaInfo from './info';
import SelectedContactItem from './selected-contact';
import ContactItem from './contact-item';



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



const MediaDetails = (props) => {

    const classes = useStyles();


    const filter=props.filter,
        teamContacts=props.teamContacts;

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
                            {filter.length != 0 &&
                            filter.map((fil, index) => {
                                return (
                                    <SelectedContactItem fil={fil} index={index} removeDataFromFilter={props.removeDataFromFilter} />
                                );
                            })}
                            <div class="dropdownMedia">
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
                                    }}
                                    placeholder="+ Add Owner"
                                ></input>
                                <div
                                    className={classes.dropdownHidden}
                                    style={{
                                        display: props.displayOwner ? "block" : "none",
                                    }}
                                >
                                    {teamContacts &&
                                    teamContacts.map((type, index) => {
                                        return (
                                            <ContactItem addDataToFilter={props.addDataToFilter} type={type}/>
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
                            <div class="dropdownMedia">
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
                                        props.setDisplayTags(true);
                                    }}
                                    placeholder="+ Add Tag"
                                ></input>
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
                                <div class="dropdownMedia">
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
                                            props.setDisplayPlaceholder(false);
                                        }}
                                        placeholder="+ Add Media placeholder or personalized graphics"
                                    ></input>
                                    <div
                                        className={classes.dropdownHidden}
                                        style={{
                                            display: props.displayPlaceholder ? "block" : "none",
                                        }}
                                    >
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
                                <div class="dropdownMedia">
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
                                            props.setDisplayPlaceholder(false);
                                        }}
                                        placeholder="+ Add Media placeholder or personalized graphics"
                                    ></input>
                                    <div
                                        className={classes.dropdownHidden}
                                        style={{
                                            display: props.displayPlaceholder ? "block" : "none",
                                        }}
                                    >
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