import IconTextField from "../../common/Fields/IconTextField";
import LocalOfferOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import DropDownItem from './item';
import { FaMagic, FaFilePdf, FaVideo, FaImage } from "react-icons/fa";

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


const DropDownButton = (props) => {
    const [displayAction, setDisplayAction] = useState(null);
    const classes = useStyles();


    const Icon = props.Icon;

    console.log('icon = ', Icon)
    return (
        <div className="dropdown">
            {props.haveLink && props.Link}
            <IconTextField
                width={100}
                textColor={displayAction ? props.textColor : props.textColorSelected}
                background={displayAction ? props.backgroundColor : props.backgroundColorSelected}
                text={props.text}
                icon={React.cloneElement(props.Icon, { style: { color: displayAction ? props.iconSelectedColor : props.iconColor } })}
                onClick={(e) => {
                    props?.onClick()
                    setDisplayAction(true);
                }}
            ></IconTextField>
            {
               props.list &&
                <div
                    className={classes.dropdownHidden}
                    style={{
                        marginLeft: -120,
                        marginTop: 10,
                        display: displayAction ? "block" : "none",
                    }}
                    onMouseLeave={() => {
                        setDisplayAction(false);
                    }}
                >
                    {(props.list).map((type, index) => {
                        return (
                            <DropDownItem title={type.title} index={index}/>
                        );
                    })}
                </div>
            }
        </div>

    )
}


export default DropDownButton;