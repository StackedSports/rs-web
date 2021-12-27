import {Grid, makeStyles} from "@material-ui/core";
import moment from "moment";
import React from "react";

import GifIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {FaMagic, FaFilePdf, FaVideo, FaImage} from "react-icons/fa";
import {isImage, isVideo} from '../../../../utils/FileUtils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Checkbox from "@mui/material/Checkbox/Checkbox";

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

const PlaceholderItem = (props) => {
    const classes = useStyles();
    const item = props.item;
    return (
        <Grid
            onClick={() => {
                props.setSelectedPlaceHolder(item.id, props.isPlaceholder);
            }}
            container
            direction="row"
            alignItems="right"
            alignContent="center"
            style={{
                background: "#f5f6f9",
                padding:10
            }}
        >
            <Grid item md={0.5} xs={0.5}>
                {item.url.indexOf(".gif") > -1 ? (
                    <GifIcon></GifIcon>
                ) : item.url.indexOf(".png") > -1 ||
                item.url.indexOf(".jpg") > -1 ||
                item.url.indexOf(".jpeg") > -1 ? (
                    <FaImage
                        style={{color: "#3871da", fontSize: 20}}
                    ></FaImage>
                ) : item.url.indexOf(".mp4") > -1 ? (
                    <FaVideo></FaVideo>
                ) : (
                    <FaFilePdf
                        style={{color: "#3871da", fontSize: 20}}
                    ></FaFilePdf>
                )}
            </Grid>
            <Grid item md={3} xs={3}>

                <span
                    className={classes.tableFields}
                >
                                  {(item.name).length > 15 ? (item.name.slice(0, 15) + ' ...') : item.name}
                                </span>
            </Grid>
            <Grid item md={1} xs={1} onClick={(e) => {
                if (isVideo(item.url)) {
                    props.setLightboxVideo(item.url);
                } else {
                    props.setLightboxPicture(item.url);
                }
                e.stopPropagation();
            }}>
                <img
                    style={{width: 30, height: 30}}
                    src={item.url}
                ></img>
            </Grid>

            <Grid item md={1} xs={1}>
                                <span className={classes.tableFields}>
                                  {(item.name).length > 15 ? (
                                      <CheckCircleIcon fontSize='small' style={{
                                          fill: '#006644',
                                      }}/>) : ''}
                                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                                <span
                                    className={classes.tableFields}
                                >
                                  {/* {formatPhoneNumber(item.phone)} */}
                                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                                <span className={classes.tableFields}>
                                  {/*item.state*/}
                                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                                <span className={classes.tableFields}>
                                  {moment(item.created_at).format("MMMM Do YYYY")}
                                </span>
            </Grid>


        </Grid>
    )
}

export default PlaceholderItem;