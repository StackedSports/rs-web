import {Checkbox, Grid} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import React from "react";


import {isImage, isVideo} from '../../../../utils/FileUtils';


const HoverItem = (props) => {
    const m = props.item;
    console.log('hover  = ', m);
    return (
        <div
            style={{
                width: "100%",
                height: 190,
                background: "rgba(0,0,0,0.6)",
                marginBottom: -190,
                position: "relative",
                zIndex: 100,
                border:
                    props.selectedCheckBoxes.indexOf(props.isPlaceHolder ? m.id : m.hashid) > -1
                        ? "3px solid #4d83e0"
                        : "1px solid #d2d2d2"
            }}
        >
            <Grid container direction="row">
                <Grid item md={2} xs={2}>
                    <Checkbox
                        color="primary"
                        checked={
                            props.selectedCheckBoxes.indexOf(props.isPlaceHolder ? m.id : m.hashid) > -1 ? true : false
                        }
                        onClick={(e) => {
                            console.log('make selected  = ', m)

                            if (props.isPlaceHolder) {
                                props.makeCheckBoxSelected(m.id);
                            } else {
                                props.makeCheckBoxSelected(m.hashid);
                            }
                            e.stopPropagation();

                        }}
                        style={{
                            color: "white",
                            cursor: "pointer",
                            zIndex: 500,
                            position: "relative",
                        }}
                    ></Checkbox>
                </Grid>
                <Grid item md={9} xs={9}></Grid>
                <Grid item md={1} xs={1}>
                    <MoreHoriz
                        style={{
                            marginTop: 12,
                            marginLeft: -12,
                            color: "#979797",
                            cursor: "pointer",
                            zIndex: 500,
                            position: "relative",
                        }}
                    ></MoreHoriz>
                </Grid>
            </Grid>
            {
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                    style={{height: 100}}
                >
                    <button
                        style={{
                            border: "1px solid white",
                            background: "transparent",
                            borderRadius: 4,
                            color: "white",
                            fontWeight: 600,
                            height: 35,
                        }}
                        onClick={(e) => {
                            console.log('hover click = ',props);
                            if (props.isPlaceHolder) {
                                if (isVideo(m.media_preview)) {
                                    props.setLightboxVideo(m.media_preview);
                                } else  {
                                    props.setLightboxPicture(m.media_preview);
                                }
                            } else {
                                if (m.file_type.indexOf("video") > -1) {
                                    props.setLightboxVideo(m.urls.original);
                                } else {
                                    props.setLightboxPicture(m.urls.original);
                                }
                            }
                            e.stopPropagation();
                        }}
                    >
                        View Media
                    </button>
                </Grid>
            }
        </div>
    )
};
export default HoverItem;