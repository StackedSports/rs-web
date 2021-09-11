import React, { useState } from "react";
import {
  Dialog,
  Grid,
  Slider,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Calendar from "react-calendar";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import moment from "moment";
import "./calendar.css";
import "./slider.css";

import { timeSlots } from "./Data";
const useStyles = makeStyles({
  buttonActive: {
    background: "#006edc",
    border: "none",
    color: "white",
    borderRadius: 4,
    width: 80,
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 16,
  },
  buttonActivePm: {
    background: "white",
    border: "none",
    color: "#006edc",
    borderRadius: 4,
    width: 50,
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 16,
  },
  buttonPm: {
    background: "#006edc",
    border: "none",
    color: "white",
    fontSize: 20,
    width: 60,
    height: 40,
    fontWeight: 600,
    marginLeft: 20,
    borderRadius: 4,
  },
  button: {
    background: "white",
    border: "none",
    color: "#006edc",
    fontSize: 20,
    width: 50,
    fontWeight: 600,
    marginLeft: 20,
    borderRadius: 4,
  },
});
export default function DateTimePicker(props) {
  const [value, onChange] = useState(new Date());
  const [rangeValue, setRangeValue] = useState(null);
  var [timeType, setTimeType] = useState("am");
  const [slots, setSlots] = useState([]);
  const classes = useStyles();
  // console.log("New data", new Date().getHours());
  var currentTime = "";
  if (new Date().getHours() < 12) {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    currentTime = hours + ":" + minutes;
    timeType = "am";
  } else {
    var hours = new Date().getHours() - 12;
    var minutes = new Date().getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    timeType = "pm";
    currentTime = hours + ":" + minutes;
  }

  // function valuetext(value) {
  //   console.log("THis is vlaue", value);
  //   console.log("slots", timeSlots[value]);
  //   // console.log("THis is vlaue title", time[value].title);
  //   // // return `${time[value].title}`;
  //   // setRangeValue(value);
  //   // return `${value}s`;
  // }

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    props.onTimeChange(timeSlots[newValue] + " " + timeType);
  };
  const usedTimeView = () => {
    return (
      <Grid item md={4}>
        <div
          style={{
            border: "1px solid rgba(37, 110, 220)",
            padding: "7px 0px",
            borderRadius: 8,
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          6:04am
        </div>
      </Grid>
    );
  };
  // function valuetext(value) {
  //   return `${value}°C`;
  // }

  // const printTimeslots = () => {
  //   var slots = [];
  //   for (var i = 1; i < 12; i++) {
  //     for (var j = 1; j < 12; j++) {
  //       console.log("THis is value", i + " : " + j * 5);
  //       slots.push(i + " : " + j * 5);
  //     }
  //   }
  //
  // };
  // printTimeslots();
  // console.log("THis is slots", timeSlots.length);
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
          borderRadius: 4,
          padding: 0,
          background: timeType === "pm" ? "white" : "white",
        },
      }}
    >
      <Grid
        container
        style={{
          background: timeType === "am" ? "black" : "rgba(37, 110, 220)",
        }}
      >
        <Grid item md={5} xs={5}>
          {" "}
          <p
            style={{
              color: timeType === "pm" ? "white" : "white",
              fontWeight: 700,
              fontSize: 16,
              padding: 28,
              paddingLeft: 32,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Select Date & Time
          </p>
        </Grid>
        <Grid item md={7} xs={7}>
          {" "}
          <p
            style={{
              color: timeType === "pm" ? "white" : "white",
              fontSize: 16,
              padding: 28,
              paddingLeft: 32,
              margin: 0,
              textAlign: "end",
            }}
          >
            You have selected{" "}
            <span
              style={{
                color: timeType === "pm" ? "white" : "white",
                fontSize: 16,
                textAlign: "end",
                fontWeight: "bold",
              }}
            >
              {rangeValue != null ? timeSlots[rangeValue] : currentTime}
              {rangeValue ? timeType : ""}{" "}
              {" on " + moment(value).format("dddd MMMM , DD gggg")}
            </span>
          </p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            className={timeType === "pm" ? "calendarPm" : "calendar"}
            style={{ marginTop: 25 }}
          >
            <Calendar
              onChange={(e) => {
                onChange(e);
                props.onDateChange(e);
                props.onTimeChange(currentTime);
              }}
              value={value}
            />
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            style={{
              marginTop: 60,
              fontWeight: 700,
            }}
          >
            <Slider
              style={{
                width: "90%",
                borderLeft: "4px solid rgba(37, 110, 220)",
                borderRight: "4px solid rgba(37, 110, 220)",

                color: timeType === "am" ? "#006edc" : "rgba(37, 110, 220)",
              }}
              // defaultValue={29}
              // aria-labelledby="input-slider"
              // step={1}
              // value={rangeValue}
              // onChange={handleChange}
              value={typeof rangeValue === "number" ? rangeValue : 0}
              onChange={handleChange}
              min={0}
              max={134}
              // valueLabelDisplay="auto"
            />
          </Grid>
          <div style={{ marginTop: 40 }}></div>
          <Grid container direction="row">
            <IconButton
              onClick={() => {
                if (rangeValue > 0) {
                  setRangeValue(rangeValue - 1);
                  props.onTimeChange(
                    timeSlots[rangeValue - 1] + " " + timeType
                  );
                }
              }}
            >
              <RemoveIcon
                style={{
                  color: timeType === "am" ? "#006edc" : "rgba(37, 110, 220)",
                }}
              ></RemoveIcon>
            </IconButton>

            <div
              style={{
                borderBottom: "3px solid #006edc",
                fontSize: 24,
                marginLeft: 10,
                marginRight: 10,
                width: "auto",
                color: timeType === "am" ? "black" : "rgba(37, 110, 220)",
                fontWeight: 500,
              }}
            >
              {rangeValue != null ? timeSlots[rangeValue] : currentTime}

              <span style={{ marginLeft: 1 }}>
                {" "}
                {rangeValue ? timeType : ""}{" "}
              </span>
            </div>

            <IconButton
              onClick={() => {
                if (rangeValue < 134) {
                  console.log("This is value");
                  setRangeValue(rangeValue + 1);
                  props.onTimeChange(timeSlots[rangeValue + 1] + "" + timeType);
                } else {
                  setRangeValue(0);
                  if (timeType === "am") {
                    setTimeType("pm");
                    props.onTimeChange(timeSlots[0] + "" + "pm");
                  } else {
                    setTimeType("am");
                    props.onTimeChange(timeSlots[0] + "" + "am");
                  }
                }
              }}
            >
              <AddIcon
                style={{
                  color: timeType === "am" ? "#006edc" : "rgba(37, 110, 220)",
                }}
              ></AddIcon>
            </IconButton>

            <div style={{ marginLeft: 15, position: "relative", top: 7 }}>
              <button
                className={
                  timeType === "am" ? classes.buttonActive : classes.buttonPm
                }
                onClick={() => {
                  setTimeType("am");
                  props.onTimeChange(timeSlots[rangeValue] + "" + "am");
                }}
              >
                AM
              </button>
              <button
                className={
                  timeType === "pm" ? classes.buttonActivePm : classes.button
                }
                onClick={() => {
                  setTimeType("pm");
                  props.onTimeChange(timeSlots[rangeValue] + "" + "pm");
                }}
              >
                PM
              </button>
            </div>
          </Grid>
          <div
            style={{
              borderTop: "1px solid rgb(223, 223, 223)",
              marginLeft: 18,
              marginRight: 18,
              fontSize: 18,
              marginTop: 50,
              paddingTop: 15,
              color: "rgb(37, 110, 220)",
              fontWeight: "bold",
            }}
          >
            Last used times:
            <Grid
              container
              direction="row"
              spacing={3}
              style={{ marginTop: 1 }}
            >
              {usedTimeView()}
              {usedTimeView()}
              {usedTimeView()}
              {usedTimeView()}
              {usedTimeView()}
              {usedTimeView()}
            </Grid>
          </div>
        </Grid>
        <div
          style={{
            margin: "20px 0",
            height: 2,
            backgroundColor: "rgb(223, 223, 223)",
            width: "100%",
          }}
        ></div>

        <Grid container direction="row" style={{ marginBottom: 20 }}>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Grid container direction="row" justify="flex-end">
              <button
                className={classes.button}
                style={{
                  width: 100,
                  height: 45,
                  border: "1px solid rgb(238, 238, 238)",
                }}
                onClick={() => {
                  props.onClose();
                }}
              >
                Cancel
              </button>
              <button
                className={classes.buttonActive}
                style={{
                  width: "max-content",
                  height: 45,
                  padding: 0,
                  marginRight: 12,
                  paddingLeft: 10,
                }}
                onClick={() => {
                  props.onClose();
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{ height: 45 }}
                  alignItems="center"
                  justify="space-between"
                >
                  <p style={{ margin: 0 }}>Save</p>

                  <CalendarTodayIcon
                    style={{ marginLeft: 28, fontSize: 18, marginRight: 9 }}
                  ></CalendarTodayIcon>
                </Grid>
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
