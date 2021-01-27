import React from "react";
import { Grid } from "@material-ui/core";

export default function FilterField(props) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{
        border: "1px solid #d8d8d8",
        width: props.width || 130,
        height: 40,
        borderRadius: 4,
        marginLeft: 10,
      }}
    >
      <Grid item md={8} sm={8}>
        <span
          style={{
            padding: 5,
            fontWeight: "bold",
            color: props.textColor || "black",
          }}
        >
          {props.text}
        </span>{" "}
      </Grid>
      <Grid item md={4} sm={4}>
        {" "}
        {props.icon}
      </Grid>
    </Grid>
  );
}
