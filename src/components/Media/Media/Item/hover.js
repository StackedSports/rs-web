import {Checkbox, Grid} from "@material-ui/core";
import {MoreHoriz} from "@material-ui/icons";
import React from "react";


const HoverItem = (props) => {
    const m = props.item;
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
                    props.selectedCheckBoxes.indexOf(m.media_preview) > -1
                        ? "3px solid #4d83e0"
                        : "1px solid #d2d2d2"
            }}
        >
            <Grid container direction="row">
                <Grid item md={2} xs={2}>
                    <Checkbox
                        color="primary"
                        checked={
                            props.selectedCheckBoxes.indexOf(m.hashid) > -1 ? true : false
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            if (props.makeMediaSelected) {
                                props.makeMediaSelected(m);
                            }
                            props.makeCheckBoxSelected(m.hashid);
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
                !props.isPlaceHolder &&
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
                    onClick={() => {
                        if (props.m.file_type.indexOf("video") > -1) {
                            if (m.urls) {
                                setLightboxVideo(m.urls.large);
                            }
                        } else if (props.m.urls) {
                            setLightboxPicture(m.urls.medium);
                        }
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