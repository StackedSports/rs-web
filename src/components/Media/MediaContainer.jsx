import React, { useState } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import GifIcon from "@material-ui/icons/Gif";
import { FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import moment from "moment";

export const MediaContainer = ({
  media,
  selectedCheckBoxes,
  makeMediaSelected,
  setDisplayAction,
  makeCheckBoxSelected,
  setLightboxPicture,
  setLightboxVideo,
  setSelectedMedia,
}) => {
  const [mediaHover, setMediaHover] = useState(null);

  return (
    <div
      style={{
        width: 270,
        height: 250,
        marginLeft: 10,
        // border: "1px solid #d2d2d2",
        border:
          selectedCheckBoxes.indexOf(media.hashid) > -1
            ? "3px solid #4d83e0"
            : "1px solid #d2d2d2",
        borderRadius: 4,
        marginBottom: 10,
      }}
    >
      <Grid
        className="grid-class"
        container
        direction="row"
        justify="center"
        style={{ background: "#f6f6f6" }}
        onMouseEnter={() => {
          if (media.urls) {
            setMediaHover(media.urls.medium);
            setDisplayAction(false);
          }
        }}
        onMouseLeave={() => {
          setMediaHover(null);
        }}
      >
        {(media.urls && mediaHover === media.urls.medium) ||
        selectedCheckBoxes.indexOf(media.hashid) > -1 ? (
          <div
            style={{
              width: "100%",
              height: 190,
              background: "rgba(0,0,0,0.6)",
              marginBottom: -190,
              position: "relative",
              zIndex: 100,
            }}
          >
            <Grid container direction="row">
              <Grid item md={2} xs={2}>
                <Checkbox
                  color="primary"
                  checked={
                    selectedCheckBoxes.indexOf(media.hashid) > -1 ? true : false
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (makeMediaSelected) {
                      makeMediaSelected(media);
                    }
                    makeCheckBoxSelected(media.hashid);
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
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{ height: 100 }}
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
                  if (media.file_type.indexOf("video") > -1) {
                    if (media.urls) {
                      setLightboxVideo(media.urls.large);
                    }
                  } else if (media.urls) {
                    setLightboxPicture(media.urls.medium);
                  }
                }}
              >
                View Media
              </button>
            </Grid>
          </div>
        ) : (
          <div></div>
        )}
        <img
          style={{ width: "80%", height: 190, objectFit: "contain" }}
          src={media.urls && media.urls.thumb}
        ></img>
      </Grid>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedMedia(media);
        }}
      >
        <Grid
          container
          direction="row"
          style={{
            height: 30,
            marginLeft: 12,
            marginTop: 2,
            cursor: "pointer",
          }}
          alignItems="center"
        >
          {media.file_type === "image/gif" ? (
            <GifIcon></GifIcon>
          ) : media.file_type.indexOf("video") > -1 ? (
            <FaVideo style={{ color: "#3871da", fontSize: 20 }}></FaVideo>
          ) : media.file_type.indexOf("image") > -1 ? (
            <FaImage></FaImage>
          ) : (
            <FaFilePdf style={{ color: "#3871da", fontSize: 20 }}></FaFilePdf>
          )}
          <p
            style={{
              fontWeight: "bold",
              margin: 0,
              marginLeft: 10,
              fontSize: 15,
            }}
          >
            {media.file_name.length > 17
              ? media.file_name.substring(0, 17) + " ..."
              : media.file_name}
          </p>
          <div style={{ width: "100%" }}></div>
        </Grid>
        <Grid container direction="row" style={{ height: 30, marginLeft: 12 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#5a5a5a",
            }}
          >
            Uploaded at : {new moment(media.created_at).format("YYYY-MM-DD")} by
            Coach Graves
          </p>
        </Grid>
      </div>
    </div>
  );
};
