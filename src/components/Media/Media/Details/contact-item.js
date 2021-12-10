import {Grid, makeStyles} from "@material-ui/core";
import React from "react";


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


const ContactItem=(props)=>{

    const classes = useStyles();

    return (
        <Grid
            container
            alignItems="center"
            style={{
                height: 60,
                marginLeft: 0,
                marginTop: -12,
                cursor: "pointer",
            }}
            className={classes.hoverGrid}
            onClick={() => {
                if (props.type.twitter_profile) {
                    props.addDataToFilter(props.type.twitter_profile.screen_name);
                }
            }}
            // className={classes.sendAsP}
        >
            <img
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    marginLeft: 12,
                }}
                src={
                    props.type.twitter_profile &&
                    props.type.twitter_profile.profile_image
                }
            ></img>

            <p
                style={{
                    margin: 0,
                    fontWeight: 600,
                    marginLeft: 12,
                }}
            >
                {props.type.twitter_profile &&
                props.type.twitter_profile.screen_name + " "}
            </p>
        </Grid>
    )
}

export default ContactItem;