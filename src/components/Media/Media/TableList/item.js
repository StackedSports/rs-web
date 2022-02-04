import {Grid, makeStyles} from "@material-ui/core";
import moment from "moment";
import React, {useState} from "react";

import GifIcon from '@mui/icons-material/GifBoxOutlined';
import {FaMagic, FaFilePdf, FaVideo, FaImage} from "react-icons/fa";
import {isImage, isVideo} from '../../../../utils/FileUtils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Checkbox from "@mui/material/Checkbox/Checkbox";

const useStyles = makeStyles({
    tableHeading: {
        fontWeight: 700,
        fontSize: 15,
        margin: 0,
        padding: 0
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
    },
});

const PlaceholderItem = (props) => {
    const classes = useStyles();

    const item = props.item;
    console.log("tablelist details",item)
    const [checkboxval, setcheckboxval] = useState(false);
    return (
        <Grid
            onClick={() => {
                if (props.isPlaceholderDetails) {
                    props.setShowMediaStats(true);
                    props.setSelectedPlaceHolder(item, props.isPlaceholder,props.placeholderId);
                } else {
                    props.setSelectedPlaceHolder(item.id, props.isPlaceholder);
                }
            }}
            onMouseEnter={(e) => {
                props.handleHover(props.index, true);
            }}
            onMouseLeave={(e) => {
                props.handleHover(props.index, false);
            }}
            container
            direction="row"
            alignItems="center"
            style={{
                border: "1px solid #d8d8d8",
                borderBottom: "none",
                borderRadius: 4,
                paddingTop: 4,
                paddingBottom: 4,
                width: "100%",
                padding: 10,
                backgroundColor: item.hover ? '#f5f6f9' : 'white'
            }}
        >

            <Grid item md={0.5} xs={0.5} style={{}}>
                {item.hover || item.isSelected ?
                    <span className={classes.tableHeading}
                          onClick={(e) => {
                              e.stopPropagation();
                          }
                          }
                    >  {<Checkbox checked={item.isSelected} onChange={(e) => props.handleItemSelected(props.index)}
                    className={classes.tableHeading} size="small"  style={{borderRadius:"1px",padding:0}} 
                    />}</span>
                    :
                   (item.file_type==="image/gif" ? (
                        <GifIcon 
                        style={{color: "3871da", fontSize: 25}}
                        >    
                        </GifIcon>
                    ): item.file_type==="image/jpeg" ||
                    item.file_type==="image/png"?
                    (
                        <FaImage
                            style={{color: "#3871da", fontSize: 20}}
                        ></FaImage>
                    ) : 
                    item.file_type==="video/mp4"  ||
                    item.file_type==="video/quicktime" 
                    ? (
                        <FaVideo 
                        style={{color: "#3871da", fontSize: 20}}
                        >    
                        </FaVideo>
                    ) : (
                        <FaFilePdf
                            style={{color: "#3871da", fontSize: 20}}
                        ></FaFilePdf>
                    ))}
            </Grid>
            <Grid item md={2} xs={2}>

                <span
                    className={classes.tableFields}

                    style={{marginLeft: 10, cursor: 'pointer'}}
                >
                    {(item.name).length > 15 ? (item.name.slice(0, 15) + ' ...') : item.name}
                </span>
            </Grid>
            <Grid item md={1} xs={1} onClick={(e) => {


                if (props.isPlaceholder) {
                    if (isVideo(item.media_preview)) {
                        props.setLightboxVideo(item.media_preview);
                    } else  {
                        props.setLightboxPicture(item.media_preview);
                    }
                } else {
                    if (item.file_type.indexOf("video") > -1) {
                        props.setLightboxVideo(item.urls.original);
                    } else {
                        props.setLightboxPicture(item.urls.original);
                    }
                }


                e.stopPropagation();
            }}>
                <img

                    style={{width: 30, height: 30, marginLeft: 13, cursor: 'pointer'}}
                    src={!item.IsPlaceholderMedia?item.url:item.urls.thumb}
                ></img>
            </Grid>

            <Grid item md={2} xs={2}>
                <span className={classes.tableFields}>
                    {
                        props.isPlaceholder && item.media ? (
                            item.media.length > 0 && item.media[0].activity &&
                            Object.keys(item.media[0].activity)
                                .filter((k, i) => item.media[0].activity[k] > 0).length > 0
                            &&
                            <CheckCircleIcon fontSize='small' style={{
                                fill: '#006644',
                                marginTop: '5px',
                                marginLeft: 50

                            }}/>
                        ) : (
                             item.activity &&
                            Object.keys(item.activity)
                                .filter((k, i) => item.activity[k] > 0).length > 0 &&
                            <CheckCircleIcon fontSize='small' style={{
                                fill: '#006644',
                                marginTop: '5px',
                                marginLeft: 50

                            }}/>
                        )

                    }
                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                <span
                    className={classes.tableFields}
                    style={{marginLeft: 40}}
                >
                    {
                        item.contact && item.contact.first_name &&
                        (item.contact.first_name+' '+item.contact.last_name)
                    }
                    {props.isPlaceholder && 
                     item.media && item.media.length 
            
                    }
                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                <span className={classes.tableFields}
                      style={{marginLeft: 40}}>
                    {item.owner && item.owner.first_name && ((item.owner.first_name + ' ' + item.owner.last_name).length > 15 ?
                        (item.owner.first_name + ' ' + item.owner.last_name).slice(0, 14) :
                        (item.owner.first_name + ' ' + item.owner.last_name))
                    }
                    {
                        props.isPlaceholder&& item.media[0] && item.media[0].media_placeholder_id && 
                        item.media[0].media_placeholder_id
                    }
                </span>
            </Grid>
            <Grid item md={2} xs={2}>
                <span className={classes.tableFields}
                      style={{marginLeft: 40}}
                >
                    {moment(item.date).format("MMMM Do YYYY")}
                </span>
            </Grid>


        </Grid>
    )
}

export default PlaceholderItem;