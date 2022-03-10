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


    if(props.isPlaceHolder)
    console.log('media contains = ', m)

    let assetUrl={
        medium:null,
        orignal:null
    };

    if(props.isPlaceHolder){
       assetUrl.medium=m.media && m.media.length>0 && m.media[0].urls && m.media[0].urls.medium;
       assetUrl.original=m.media && m.media.length>0 && m.media[0].urls && m.media[0].urls.original;
    }else {
        assetUrl.medium=m.urls.medium;
        assetUrl.original=m.urls.original;

    }
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
                    if(assetUrl){
                        props.setPlacehoderHover(assetUrl.medium);
                        props.setDisplayAction(false);
                    }
                }}
                onMouseLeave={() => {
                    props.setMediaHover(null);
                    props.setPlacehoderHover(null);
                }}
            >
                {
<<<<<<< HEAD
                    (m.urls && props.placeholderHover === m.media) ||
                    props.selectedCheckBoxes.indexOf(m.media) > -1 ? (
=======
                    (props.placeholderHover === (assetUrl.medium)) ||
                    props.selectedCheckBoxes.indexOf(assetUrl.medium) > -1 ? (
>>>>>>> 1b33e0be800f99aea81326ac9660f89f8c4b5dc8
                            props.showHover ?
                                <HoverItem
                                    isPlaceHolder={props.isPlaceHolder}
                                    makeMediaSelected={props.makeMediaSelected}
                                    item={m}
                                    assetUrl={assetUrl}
                                    makeCheckBoxSelected={props.makeCheckBoxSelected}
                                    setLightboxVideo={props.setLightboxVideo}
                                    setLightboxPicture={props.setLightboxPicture}
                                    selectedCheckBoxes={props.selectedCheckBoxes}
                                />
                                : <div></div>
                        )

                        :
                        (m.urls && props.mediaHover === assetUrl.medium) ||
                        (props.selectedCheckBoxes).indexOf(props.isPlaceHolder ? m.id : m.hashid) > -1 ? (
                            props.showHover ?
                                <HoverItem
                                    isPlaceHolder={props.isPlaceHolder}
                                    makeMediaSelected={props.makeMediaSelected}
                                    item={m}
                                    assetUrl={assetUrl}
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
                        <PlaceHolderImageView url={m.media && m.media.length>0 && m.media[0].urls.original}/> :
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
                            m.media_preview ? isImage(assetUrl.medium) ? (
                                    <FaImage></FaImage>
                                ) : isVideo(assetUrl.medium) > -1 ? (
                                    <FaVideo style={{color: "black", fontSize: 20, zIndex: 100}}></FaVideo>
                                ) : (
                                    <FaFilePdf style={{color: "black", fontSize: 20}}></FaFilePdf>
                                ) :
                                <FaFilePdf style={{color: "black", fontSize: 20}}></FaFilePdf>


                        )
                        :
                        m.file_type?
                         (
                             m.file_type === "image/gif") ? (
                            <GifIcon></GifIcon>
                        ) : m.file_type.indexOf("video") > -1 ? (
                            <FaVideo style={{color: "#141414", fontSize: 20, zIndex: 100}}></FaVideo>
                        ) : m.file_type.indexOf("image") > -1 ? (
                            <FaImage></FaImage>
                        ) : (
                            <FaFilePdf style={{color: "#3871da", fontSize: 20}}></FaFilePdf>
                        ):
                            <FaFilePdf style={{color: "#3871da", fontSize: 20}}></FaFilePdf>

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
                    Uploaded at : {new moment(m.created_at).format("YYYY-MM-DD")} by {"  "}
                  { m.owner!=null?
                  
                  m.owner.first_name +  m.owner.last_name :
                 m.media[0].owner.first_name + m.media[0].owner.last_name

}</p>
            </Grid>
        </div>
    );
};

export default MediaItem;