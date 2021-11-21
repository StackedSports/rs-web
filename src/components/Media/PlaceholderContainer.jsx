import React, { useState } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import GifIcon from "@material-ui/icons/Gif";
import { FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import moment from "moment";

// eslint-disable-next-line react/prop-types
export const PlaceholderContainer = ({
  selectedPlaceholder,
  selectedCheckBoxes,
  setShowlistView,
  setSelectedPlaceHolder,
  setDisplayAction,
  makeCheckBoxSelected,
  setLightboxPicture,
}) => {
  const [placeholderHover, setPlaceholderHover] = useState(null);
  return (
    <Grid item md={3} xs={3}>
      <div
        style={{
          width: 270,
          height: 250,
          marginLeft: 10,
          border:
            selectedCheckBoxes.indexOf(selectedPlaceholder.media_preview) > -1
              ? "3px solid #4d83e0"
              : "1px solid #d2d2d2",
          borderRadius: 4,
          marginBottom: 10,
        }}
        onClick={() => {
          setShowlistView(true);
          setSelectedPlaceHolder(selectedPlaceholder);
        }}
        onMouseEnter={() => {
          setPlaceholderHover(selectedPlaceholder.media_preview);
          setDisplayAction(false);
        }}
        onMouseLeave={() => {
          setPlaceholderHover(null);
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          style={{ background: "#f6f6f6", height: 180 }}
        >
          {placeholderHover === selectedPlaceholder.media_preview ||
          selectedCheckBoxes.indexOf(selectedPlaceholder.media_preview) > -1 ? (
            <div
              style={{
                height: 190,
                background: "rgba(0,0,0,0.6)",
                marginBottom: -190,
                width: 270,
                zIndex: 100,
              }}
            >
              <Grid container direction="row">
                <Grid item md={2} xs={2}>
                  <Checkbox
                    color="primary"
                    checked={
                      selectedCheckBoxes.indexOf(
                        selectedPlaceholder.media_preview
                      ) > -1
                        ? true
                        : false
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      makeCheckBoxSelected(selectedPlaceholder.media_preview);
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
                    setLightboxPicture(selectedPlaceholder.media_preview);
                  }}
                >
                  View Media
                </button>
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <div
              style={{
                display: "flex",
                width: 270,
                marginleft: 10,
                marginRight: 10,
              }}
            >
              <img
                style={{
                  marginTop: 25,
                  height: 145,
                  width: 75,
                  objectFit: "cover",
                  zIndex: 4,
                  opacity: 0.9,
                  marginLeft: 20,
                }}
                src={selectedPlaceholder.media_preview}
              ></img>
              <img
                style={{
                  height: 170,
                  width: 150,
                  boxShadow: "5px 5px 20px",
                  marginLeft: -20,
                  objectFit: "cover",
                  zIndex: 10,
                }}
                src={selectedPlaceholder.media_preview}
              ></img>
              <img
                style={{
                  marginTop: 25,
                  height: 145,
                  zIndex: 4,
                  opacity: 0.9,

                  marginLeft: -30,
                  width: 75,

                  objectFit: "cover",
                }}
                src={selectedPlaceholder.media_preview}
              ></img>
            </div>
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ height: 30, marginLeft: 12, marginTop: 10 }}
          alignItems="center"
        >
          {selectedPlaceholder.media_preview.indexOf(".gif") > -1 ? (
            <GifIcon></GifIcon>
          ) : selectedPlaceholder.media_preview.indexOf(".png") > -1 ||
            selectedPlaceholder.media_preview.indexOf(".jpg") > -1 ||
            selectedPlaceholder.media_preview.indexOf(".jpeg") > -1 ? (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FaImage
                  style={{
                    marginLeft: 4,

                    color: "#3871da",
                    fontSize: 15,
                    display: "block",
                  }}
                ></FaImage>

                <FaImage
                  style={{
                    zIndex: 100,
                    marginTop: -12,
                    color: "#3871da",
                    fontSize: 15,
                    display: "block",
                  }}
                ></FaImage>
              </div>
            </>
          ) : selectedPlaceholder.media_preview.indexOf(".mp4") > -1 ? (
            <FaVideo></FaVideo>
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
            {selectedPlaceholder.name}
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
            Uploaded at :{" "}
            {new moment(selectedPlaceholder.created_at).format("YYYY-MM-DD")} by
            Coach Graves
          </p>
        </Grid>
      </div>
    </Grid>
  );
};
