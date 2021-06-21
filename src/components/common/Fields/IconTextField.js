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
        width: props.width || "max-content",
        background: props.background || "white",
        height: 40,
        borderRadius: 4,
        marginLeft: props.marginLeft != null ? props.marginLeft : 16,
        marginTop: props.marginTop || 0,
        cursor: "pointer",
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      onMouseEnter={() => {
        if (props.onMouseEnter) {
          props.onMouseEnter();
        }
      }}
      onMouseLeave={() => {
        if (props.onMouseLeave) {
          props.onMouseLeave();
        }
      }}
    >
      {" "}
      {props.iconStart && (
        <Grid item md={4} sm={4}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            style={{ paddingLeft: 12 }}
          >
            {props.iconStart}
          </Grid>
        </Grid>
      )}
      <Grid
        item
        md={props.icon || props.iconStart ? 8 : 12}
        sm={props.icon || props.iconStart ? 8 : 12}
      >
        <p
          style={{
            paddingLeft: props.iconStart ? 0 : 12,
            fontWeight: "bold",
            color: props.textColor || "black",
            width: "max-content",
            margin: 0,
            marginRight: 10,
          }}
        >
          {props.text}
        </p>{" "}
      </Grid>
      {props.icon && (
        <Grid item md={4} sm={4}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            style={{ paddingRight: 12 }}
          >
            {props.icon}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
