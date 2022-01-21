import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {makeStyles} from "@material-ui/core";



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


export default function Sidebar(props){
    const classes = useStyles();

    const myMediaContacts=props.myMediaContacts;

    return (
        <div style={{ width: "15%" }}>
            <p
                style={{
                    padding: 5,
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingBottom: 0,
                    marginBottom: 20,
                    cursor: "pointer",
                }}
                onClick={() => {
                    //setSelectedPlaceHolder(null);
                }}
            >
                Media
            </p>
            <p className={classes.sideFilter}>
                My Media{" "}
                <KeyboardArrowDownIcon
                    style={{ fontSize: 26, marginLeft: 20 }}
                ></KeyboardArrowDownIcon>
            </p>
            {myMediaContacts &&
            myMediaContacts.map((item) => {
                return (
                    <p
                        className={classes.sideSubFilter}
                        onClick={() => {
                            props.addDataToFilter(
                                item.first_name + " " + item.last_name,
                                "owner"
                            );
                        }}
                    >
                        {item.first_name + " " + item.last_name} {"(0)"}
                    </p>
                );
            })}
            <p
                className={classes.sideFilter}
                onClick={() => {
                    //setshowBoardFilters(!showBoardFilters);
                }}
            >
                Recent
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
            <p
                className={classes.sideFilter}
                onClick={() => {
                    setshowBoardFilters(!showBoardFilters);
                }}
            >
                Images
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
            <p
                className={classes.sideFilter}
                onClick={() => {
                    //setshowBoardFilters(!showBoardFilters);
                }}
            >
                Videos
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
            <p
                className={classes.sideFilter}
                onClick={() => {
                    //setshowBoardFilters(!showBoardFilters);
                }}
            >
                Gifs
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
            {/*showBoardFilters === true && <div></div>*/}

            <p className={classes.sideFilter}>
                Personalized Media
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
            <p className={classes.sideFilter}>
                Placeholders
                <ArrowForwardIosIcon
                    style={{ fontSize: 17, marginLeft: 17 }}
                ></ArrowForwardIosIcon>
            </p>
        </div>
    )
}