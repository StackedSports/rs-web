import React, { useState } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import GifIcon from "@material-ui/icons/Gif";
import { FaFilePdf, FaVideo, FaImage } from "react-icons/fa";
import moment from "moment";
import { MediaContainer } from "./MediaContainer";

export const MediaDetails = ({
  media,
  selectedCheckBoxes,
  makeMediaSelected,
  setDisplayAction,
  makeCheckBoxSelected,
  setLightboxPicture,
  setLightboxVideo,
}) => {
  return (
    <Grid container direction="row">
      <MediaContainer
        media={media}
        selectedCheckBoxes={selectedCheckBoxes}
        makeMediaSelected={makeMediaSelected}
        setDisplayAction={setDisplayAction}
        makeCheckBoxSelected={makeCheckBoxSelected}
        setLightboxPicture={setLightboxPicture}
        setLightboxVideo={setLightboxVideo}
      />
      <Grid item md={4} xs={4} style={{ marginLeft: "20px" }}>
        <p style={{ fontWeight: "bold", fontSize: 20 }}>{media.name}</p>
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          FileType: image/jpeg
        </p>
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          Uploaded On: {new moment(media.created_at).format("YYYY-MM-DD")}
        </p>{" "}
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          Uploaded By: Tim Glover
        </p>
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          File Size : 40.5 kb
        </p>
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          Dimensions : 160 x 200
        </p>
        <p style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>
          Last Sent : {new moment(media.created_at).format("YYYY-MM-DD")}
        </p>
      </Grid>
    </Grid>
  );
};
