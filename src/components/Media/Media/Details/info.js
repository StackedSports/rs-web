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

const ItemInfo = (props) => {

    const classes = useStyles();

    console.log('info = ',props);
    return (
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
                {props.selectedPlaceholder.name}
            </p>
            <p className className={classes.messageDetailsHeading}>
                Message Status:
                {props.messageStatus === "Drafts" ? (
                    <span className={classes.mdMargin} style={{color: "#f0ad24"}}>
                  Drafts
                </span>
                ) : props.messageStatus === "Scheduled" ? (
                    <span className={classes.mdMargin} style={{color: "#54a300"}}>
                  Scheduled
                </span>
                ) : (
                    <span className={classes.mdMargin} style={{color: "#8bb14c"}}>
                  Published
                </span>
                )}
            </p>
            <p className className={classes.messageDetailsHeading}>
                Published On:
                <strong className={classes.mdMargin}>Twitter</strong>{" "}
            </p>
            <p className className={classes.messageDetailsHeading}>
                Published to :
                <strong className={classes.mdMargin}>@JakeSmith</strong>{" "}
            </p>
            {props.messageStatus === "Scheduled" ? (
                <p className className={classes.messageDetailsHeading}>
                    Published Time:
                    <strong className={classes.mdMargin}>
                        June 15, 2021 15:00
                    </strong>{" "}
                    <span
                        style={{textDecoration: "underline", cursor: "pointer"}}
                        onClick={() => {
                            setMessageStatus("Drafts");
                            setMessageCreated(false);
                        }}
                    >
                  (Unschedule & more to drafts)
                </span>
                </p>
            ) : (
                <p className className={classes.messageDetailsHeading}>
                    Published Time:
                    <strong className={classes.mdMargin}>
                        June 15, 2021 15:00
                    </strong>{" "}
                </p>
            )}
            <Grid
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
                    OV WEEKENDS
                </div>
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
                    OV WEEKENDS
                </div>
            </Grid>
        </div>
    )
}
export default ItemInfo;
