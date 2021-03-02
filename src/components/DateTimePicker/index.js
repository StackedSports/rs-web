import React, { useState } from "react";
import { Dialog, Grid, Slider } from "@material-ui/core";
import Calendar from "react-calendar";
import moment from "moment";
import "./calendar.css";
import { time } from "./Data";

export default function DateTimePicker(props) {
  const [value, onChange] = useState(new Date());

  //   function valuetext(value) {
  //     console.log("THis is vlaue", value);
  //     console.log("THis is vlaue title", time[value].title);
  //     // return `${time[value].title}`;
  //     return `${value}s`;
  //   }

  function valuetext(value) {
    return `${value}°C`;
  }

  console.log("THis is value", value);
  return (
    <Dialog
      open={props.open}
      maxWidth="md"
      fullWidth={true}
      onClose={() => {
        props.onClose();
      }}
      scroll={"body"}
      PaperProps={{
        style: {
          borderRadius: 10,
          padding: 0,
        },
      }}
    >
      <Grid container style={{ background: "#3871da" }}>
        <Grid item md={6} xs={6}>
          {" "}
          <p
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 20,
              padding: 12,
            }}
          >
            Select Date and Time
          </p>
        </Grid>
        <Grid item md={6} xs={6}>
          {" "}
          <p
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 20,
              padding: 12,
            }}
          >
            You have selected {moment(value).format("dddd MMMM , DD gggg")}
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6} xs={6}>
          <Grid
            container
            direction="row"
            justify="center"
            className="calendar"
            style={{ marginTop: 25 }}
          >
            <Calendar onChange={onChange} value={value} />
          </Grid>
        </Grid>
        <Grid item md={6} xs={6}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 25, height: 150 }}
          >
            <Slider
              style={{ width: "90%" }}
              defaultValue={0}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              //   marks
              min={0}
              max={360}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* <div style={{ background: "#3871da", height: 100, width: "100%" }}></div> */}
    </Dialog>
  );
}
