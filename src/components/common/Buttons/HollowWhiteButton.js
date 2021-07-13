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
        background: props.background || "white",
        marginBottom: props.marginBottom || 0,
        marginTop: props.marginTop || 0,
        height: 40,
        borderRadius: 4,
        marginLeft: 10,
        cursor: "pointer",
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {" "}
      <Grid item md={12} sm={12}>
        <Grid container direction="row" justify="center">
          <span
            style={{
              fontWeight: "bold",
              color: props.textColor || "black",
            }}
          >
            {props.text}
          </span>{" "}
        </Grid>
      </Grid>
    </Grid>
  );
}
