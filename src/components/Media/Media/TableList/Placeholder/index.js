import {Grid} from "@mui/material";
import { makeStyles } from "@mui/styles";
import GifIcon from "@mui/material/SvgIcon/SvgIcon";
import moment from "moment";
import React from "react";
import ListHeader from './header';
import PlaceholderItem from './item';


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


const PlaceholderTableList=(props)=>{
    const classes = useStyles();
    const placeholders=props.placeholders;
    return(
        <div style={{width: "100%", overflowX: "scroll", marginTop: 10}}>
            <ListHeader/>

            <div
                style={{width: "100%", maxHeight: 330, minWidth: 1110}}
                className="fullHeightContacts"
                id="infinit"
                onScroll={() => {
                    props.handleScroll();
                }}
            >
                {placeholders &&
                placeholders.map((item, index) => {
                    if (index < 4) {
                        return (
                            <PlaceholderItem item={item} setSelectedPlaceHolder={props.setSelectedPlaceHolder}/>
                        );
                    }
                })}
            </div>
        </div>
    )
}
export default PlaceholderTableList
