import {Fragment} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import React from "react";
import Checkbox from '@mui/material/Checkbox';


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

const ListHeader=(props)=>{
    const classes = useStyles();
    return(
        <Grid
            container
            direction="row"
            alignItems="center"
            style={{
                background: "#f5f6f9",
                width: "100%",
            }}
        >
            <Grid item md={0.5} xs={0.5}>
                 <span className={classes.tableHeading}>  { <Checkbox />}</span>
            </Grid>
            <Grid item md={3} xs={3} >
                <span className={classes.tableHeading}>Name</span>
            </Grid>
            <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>File</span>
            </Grid>
            <Grid item md={1} xs={1}>
                <span className={classes.tableHeading}>File Sent</span>
            </Grid>
            <Grid item md={2} xs={2}>
                      <span
                          className={classes.tableHeading}
                      >
                        Associated To
                      </span>
            </Grid>
            <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Owner</span>
            </Grid>
            <Grid item md={2} xs={2}>
                <span className={classes.tableHeading}>Last Modified</span>
            </Grid>
        </Grid>
    )
}

export default ListHeader;