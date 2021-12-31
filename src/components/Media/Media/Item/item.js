import {Checkbox, Grid} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import GifIcon from "@material-ui/icons/Gif";
import {FaMagic, FaFilePdf, FaVideo, FaImage} from "react-icons/fa";
import moment from "moment";
import React, {useState} from "react";

import HoverItem from './hover';
import PlaceHolderImageView from './Placeholer/ImageView'


import {isImage, isVideo} from '../../../../utils/FileUtils';
import Media from "../index";

const MediaItem = (props) => {
    const m = props.item;


    console.log('m = ', props)

    return (
        <div
            style={{
                width: 270,
                height: 250,
                marginLeft: 10,
                border:
                    "1px solid #d2d2d2",
                borderRadius: 4,
                marginBottom: 10,
            }}

        >
            <Grid
                container
                direction="row"
                justify="center"
                style={{background: "#f6f6f6"}}


                onMouseEnter={() => {
                    if (m.urls) {
                        props.setMediaHover(m.urls.medium);
                        props.setDisplayAction(false);
                    } else if (m.media_preview) {
                        props.setPlacehoderHover(m.media_preview);
                        props.setDisplayAction(false);

                    }
                }}
                onMouseLeave={() => {
                    props.setMediaHover(null);
                    props.setPlacehoderHover(null);
                }}
            >
                {
                    (props.placeholderHover === m.media_preview) ||
                    props.selectedCheckBoxes.indexOf(m.media_preview) > -1 ? (
                            props.showHover ?
                                <HoverItem
                                    isPlaceHolder={props.isPlaceHolder}
                                    makeMediaSelected={props.makeMediaSelected}
                                    item={m}
                                    makeCheckBoxSelected={props.makeCheckBoxSelected}
                                    setLightboxVideo={props.setLightboxVideo}
                                    setLightboxPicture={props.setLightboxPicture}
                                    selectedCheckBoxes={props.selectedCheckBoxes}
                                />
                                : <div></div>
                        )

                        :
                        (m.urls && props.mediaHover === m.urls.medium) ||
                        (props.selectedCheckBoxes).indexOf(props.isPlaceHolder ? m.id : m.hashid) > -1 ? (
                            props.showHover ?
                                <HoverItem
                                    isPlaceHolder={props.isPlaceHolder}
                                    makeMediaSelected={props.makeMediaSelected}
                                    item={m}
                                    makeCheckBoxSelected={props.makeCheckBoxSelected}
                                    setLightboxVideo={props.setLightboxVideo}
                                    setLightboxPicture={props.setLightboxPicture}
                                    selectedCheckBoxes={props.selectedCheckBoxes}
                                />
                                : null
                        ) : (
                            <div></div>
                        )
                }
                {
                    props.isPlaceHolder ?
                        <PlaceHolderImageView url={m.media_preview}/> :
                        <img
                            style={{width: "80%", height: 190, objectFit: "contain"}}
                            src={m.urls && m.urls.thumb}
                        ></img>
                }
            </Grid>
            <Grid
                onClick={
                    (e) => {
                        // console.log("This is the target", e.target)
                        if (props.isPlaceHolder) {
                            props.setShowMediaStats(false);
                        } else {
                            props.setShowMediaStats(true);
                        }
                        props.setSelectedPlaceHolder(m, props.isPlaceHolder);
                        props.setShowBackButton(true);
                    }
                }
                container
                direction="row"
                style={{height: 30, marginLeft: 12, marginTop: 2}}
                alignItems="center"
            >
                {
                    props.isPlaceHolder ?
                        (
                            m.media_preview ? isImage(m.media_preview) ? (
                                    <FaImage></FaImage>
                                ) : isVideo(m.media_preview) > -1 ? (
                                    <FaVideo style={{color: "#3871da", fontSize: 206, zIndex: 100}}></FaVideo>
                                ) : (
                                    <FaFilePdf style={{color: "#3871da", fontSize: 20}}></FaFilePdf>
                                ) :
                                <FaFilePdf style={{color: "#3871da", fontSize: 20}}></FaFilePdf>


                        )
                        :
                         (
                            m.file_type === "image/gif") ? (
                            <GifIcon></GifIcon>
                        ) : m.file_type.indexOf("video") > -1 ? (
                            <FaVideo style={{color: "#3871da", fontSize: 206, zIndex: 100}}></FaVideo>
                        ) : m.file_type.indexOf("image") > -1 ? (
                            <FaImage></FaImage>
                        ) : (
                            <FaFilePdf style={{color: "#3871da", fontSize: 20}}></FaFilePdf>
                        )
                }
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        margin: 0,
                        marginLeft: 10,
                        fontSize: 15,
                        cursor: 'pointer'
                    }}
                >
                    {props.isPlaceHolder ?
                        (
                            m.name.length > 17
                                ? m.name.substring(0, 17) + " ..."
                                : m.name
                        )
                        :
                        (
                            m.file_name.length > 17
                                ? m.file_name.substring(0, 17) + " ..."
                                : m.file_name
                        )
                    }
                </p>
                <div style={{width: "100%"}}></div>
            </Grid>
            <Grid container direction="row" style={{height: 30, marginLeft: 12}}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#5a5a5a",
                        cursor: 'default'
                    }}
                >
                    Uploaded at : {new moment(m.created_at).format("YYYY-MM-DD")} by
                    Coach Graves
                </p>
            </Grid>
        </div>
    );
};

export default MediaItem;