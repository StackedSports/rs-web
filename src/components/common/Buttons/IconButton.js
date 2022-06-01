import React from "react";
import { Grid } from "@mui/material";

export default function IconButton(props) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      style={{
        background:props.background || "#3871DA",
        width: props.width || 130,
        height: 40,
        borderRadius: 4,
        marginLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: "pointer",
      }}
    >
      <Grid item md={9} sm={9}>
        <span
          style={{
            paddingLeft: 16,
            fontWeight: 600,
            color: props.textColor || "black",
          }}
        >
          {props.text}
        </span>{" "}
      </Grid>
      <Grid item md={3} sm={3}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          style={{ paddingRight: 16 }}
        >
          {" "}
          {props.icon}
        </Grid>
      </Grid>
    </Grid>
  );
}
