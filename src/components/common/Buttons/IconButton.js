import React from "react";
import { Grid } from "@material-ui/core";

export default function IconButton(props) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{
        background: "#3871DA",
        width: props.width || 130,
        height: 40,
        borderRadius: 4,
        marginLeft: 10,
        cursor: "pointer",
      }}
    >
      <Grid item md={9} sm={9}>
        <span
          style={{
            padding: 5,
            fontWeight: 600,
            color: props.textColor || "black",
          }}
        >
          {props.text}
        </span>{" "}
      </Grid>
      <Grid item md={3} sm={3}>
        {" "}
        {props.icon}
      </Grid>
    </Grid>
  );
}
