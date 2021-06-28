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
import { timeSlots } from "./Data";
const useStyles = makeStyles({
  buttonActive: {
    background: "#006edc",
    border: "none",
    color: "white",
    borderRadius: 4,
    width: 50,
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
    width: 50,
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
  const [timeType, setTimeType] = useState("am");
  const [slots, setSlots] = useState([]);
  const classes = useStyles();
  // console.log("New data", new Date().getHours());
  var currentTime = "";
  if (new Date().getHours() < 12) {
    currentTime = new Date().getHours() + new Date().getMinutes();
  } else {
    currentTime = new Date().getHours() + " : " + new Date().getMinutes();
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
          borderRadius: 10,
          padding: 0,
          background: timeType === "pm" ? "#006edc" : "white",
        },
      }}
    >
      <Grid
        container
        style={{ background: timeType === "am" ? "#006edc" : "white" }}
      >
        <Grid item md={6} xs={6}>
          {" "}
          <p
            style={{
              color: timeType === "pm" ? "#006edc" : "white",
              fontWeight: 600,
              fontSize: 16,
              padding: 28,
              paddingLeft: 32,
              textTransform: "capitalize",
              margin: 0,
            }}
          >
            Select Date and Time
          </p>
        </Grid>
        <Grid item md={6} xs={6}>
          {" "}
          <p
            style={{
              color: timeType === "pm" ? "#006edc" : "white",
              fontWeight: 600,
              fontSize: 16,
              padding: 28,
              paddingLeft: 32,
              textTransform: "capitalize",
              margin: 0,
            }}
          >
            You have selected {moment(value).format("dddd MMMM , DD gggg")}
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
            style={{ marginTop: 25, height: 150, fontWeight: 700 }}
          >
            <Slider
              style={{
                width: "90%",
                color: timeType === "am" ? "#006edc" : "white",
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
          <div style={{ width: "100%" }}></div>
          <Grid container direction="row" justify="center">
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
                style={{ color: timeType === "am" ? "#006edc" : "white" }}
              ></RemoveIcon>
            </IconButton>

            <div
              style={{
                borderBottom: "3px solid #006edc",
                fontSize: 26,
                width: 130,
                paddingLeft: 5,
                color: timeType === "am" ? "black" : "white",
              }}
            >
              {rangeValue != null ? timeSlots[rangeValue] : currentTime}
              {rangeValue ? timeType : ""}
            </div>
            <IconButton
              onClick={() => {
                if (rangeValue < 134) {
                  console.log("This is value");
                  setRangeValue(rangeValue + 1);
                  props.onTimeChange(
                    timeSlots[rangeValue + 1] + " " + timeType
                  );
                } else {
                  setRangeValue(0);
                  if (timeType === "am") {
                    setTimeType("pm");
                    props.onTimeChange(timeSlots[0] + " " + "pm");
                  } else {
                    setTimeType("am");
                    props.onTimeChange(timeSlots[0] + " " + "am");
                  }
                }
              }}
            >
              <AddIcon
                style={{ color: timeType === "am" ? "#006edc" : "white" }}
              ></AddIcon>
            </IconButton>

            <button
              className={
                timeType === "am" ? classes.buttonActive : classes.buttonPm
              }
              onClick={() => {
                setTimeType("am");
                props.onTimeChange(timeSlots[rangeValue] + " " + "am");
              }}
            >
              am
            </button>
            <button
              className={
                timeType === "pm" ? classes.buttonActivePm : classes.button
              }
              onClick={() => {
                setTimeType("pm");
                props.onTimeChange(timeSlots[rangeValue] + " " + "pm");
              }}
            >
              pm
            </button>
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginBottom: 20 }}>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Grid container direction="row" justify="flex-end">
              <button
                className={
                  timeType === "pm" ? classes.buttonActive : classes.button
                }
                style={{ width: 100, height: 45 }}
                onClick={() => {
                  props.onClose();
                }}
              >
                cancel
              </button>
              <button
                className={
                  timeType === "pm"
                    ? classes.buttonActivePm
                    : classes.buttonActive
                }
                style={{
                  width: "max-content",
                  height: 45,
                  padding: 0,
                  marginRight: 12,
                  paddingLeft: 16,
                }}
                onClick={() => {
                  props.onClose();
                }}
              >
                <Grid container style={{ height: 45 }} alignItems="center">
                  <p style={{ margin: 0, marginLeft: 16 }}>Save</p>

                  <CalendarTodayIcon
                    style={{ marginLeft: 16, fontSize: 18, marginRight: 16 }}
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
