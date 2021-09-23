import React, { useState, useRef, useEffect } from "react";
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
    cursor: "pointer",
  },
  button: {
    background: "white",
    border: "none",
    color: "#006edc",
    cursor: "pointer",

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
  const [hoursTime, setHoursTime] = useState("12");
  const [minutesTime, setMinutesTime] = useState("00");
  const [timeType, setTimeType] = useState("pm");

  const minuteTimeRef = useRef(null);
  const classes = useStyles();
  // console.log("New data", new Date().getHours());
  var currentTime = "";

  useEffect(() => {
    let getHour = new Date().getHours();
    if (getHour < 12) {
      var hours = getHour == 0 ? 12 : getHour;
      var minutes = new Date().getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      currentTime = hours + ":" + minutes;
      setHoursTime(hours);
      setMinutesTime(minutes);
      let index = timeSlots.indexOf(currentTime);

      setRangeValue(index);
      setTimeType("am");
    } else {
      var hours = getHour - 12;
      hours = hours == 0 ? 12 : hours;

      var minutes = new Date().getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      currentTime = hours + ":" + minutes;

      setHoursTime(hours);
      setTimeType("pm");
      console.log(currentTime, "maharaj");

      let index = timeSlots.indexOf(currentTime);

      setRangeValue(index);

      setMinutesTime(minutes);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    let split = timeSlots[newValue].split(":");
    setHoursTime(split[0]);
    setMinutesTime(split[1]);

    props.onTimeChange(timeSlots[newValue] + " " + timeType);
  };
  const usedTimeView = () => {
    return (
      <Grid item md={4}>
        <div
          onClick={() => {
            let index = timeSlots.indexOf("06:15");
            setRangeValue(index);
            setMinutesTime("15");
            setHoursTime("06");
            props.onTimeChange("6:15" + " " + "am");
          }}
          style={{
            border: "1px solid rgba(37, 110, 220)",
            padding: "7px 0px",
            borderRadius: 8,
            cursor: "pointer",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          6:15am
        </div>
      </Grid>
    );
  };

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
          background: "white",
        },
      }}
    >
      <Grid
        container
        style={{
          background: "rgba(37, 110, 220)",
        }}
      >
        <Grid item md={5} xs={5}>
          {" "}
          <p
            style={{
              color: "white",
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
              color: "white",
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
                color: "white",
                fontSize: 16,
                textAlign: "end",
                fontWeight: "bold",
              }}
            >
              {rangeValue != null ? timeSlots[rangeValue] : "00:00"}
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
            className={
              "calendarPm"
              // "calendar"
            }
            style={{ marginTop: 25 }}
          >
            <Calendar
              onChange={(e) => {
                onChange(e);
                props.onDateChange(e);
                // props.onTimeChange(currentTime);
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

                color: "rgba(37, 110, 220)",
              }}
              // defaultValue={29}
              // aria-labelledby="input-slider"
              // step={1}
              // value={rangeValue}
              // onChange={handleChange}
              value={typeof rangeValue === "number" ? rangeValue : 0}
              onChange={handleChange}
              min={0}
              max={719}
              // valueLabelDisplay="auto"
            />
          </Grid>
          <div style={{ marginTop: 40 }}></div>
          <Grid container direction="row">
            <IconButton
              onClick={() => {
                if (rangeValue > 0) {
                  let split = timeSlots[rangeValue - 1].split(":");
                  setHoursTime(split[0]);
                  setMinutesTime(split[1]);

                  setRangeValue(rangeValue - 1);
                  props.onTimeChange(
                    timeSlots[rangeValue - 1] + " " + timeType
                  );
                }
              }}
            >
              <RemoveIcon
                style={{
                  color: "rgba(37, 110, 220)",
                }}
              ></RemoveIcon>
            </IconButton>

            <div
              style={{
                borderBottom: "3px solid #006edc",
                fontSize: 24,
                marginLeft: 10,
                marginRight: 10,
                width: "80px",
                color: "rgba(37, 110, 220)",
                fontWeight: 500,
              }}
            >
              <input
                // maxLength={2}
                value={hoursTime}
                style={{
                  color: "rgba(37, 110, 220)",
                  outline: "none",
                  border: "none",
                  width: 35,
                }}
                onChange={(e) => {
                  let value = e.target.value === "00" ? "12" : e.target.value;
                  if (value && value >= 0 && value < 13 && value.length < 3) {
                    if (value.length === 2) {
                      let minutes =
                        minutesTime && minutesTime.length === 2
                          ? minutesTime
                          : "00";
                      let time = value + ":" + minutes;

                      let index = timeSlots.indexOf(time);

                      setRangeValue(index);
                      props.onTimeChange(time + " " + timeType);
                    }
                    setHoursTime(value);
                    if (value.length === 2) {
                      minuteTimeRef.current.focus();
                    }
                  } else {
                    if (hoursTime.length == 1) {
                      setHoursTime("");
                    }
                  }
                }}
              />
              :
              <input
                min={0}
                max={60}
                maxLength={2}
                ref={minuteTimeRef}
                onChange={(e) => {
                  if (
                    e.target.value &&
                    e.target.value >= 0 &&
                    e.target.value < 60 &&
                    e.target.value.length < 3
                  ) {
                    if (e.target.value.length === 2) {
                      let hours =
                        hoursTime && hoursTime.length === 2 ? hoursTime : "00";
                      let time = hours + ":" + e.target.value;

                      let index = timeSlots.indexOf(time);

                      setRangeValue(index);
                      props.onTimeChange(time + " " + timeType);
                    }
                    setMinutesTime(e.target.value);
                  } else {
                    if (minutesTime.length == 1) {
                      setMinutesTime("");
                    }
                  }
                }}
                value={minutesTime}
                style={{
                  color: "rgba(37, 110, 220)",
                  width: 35,

                  outline: "none",
                  border: "none",
                }}
              />
            </div>

            <IconButton
              onClick={() => {
                if (rangeValue < 719) {
                  console.log("This is value");
                  let split = timeSlots[rangeValue + 1].split(":");
                  setHoursTime(split[0]);
                  setMinutesTime(split[1]);

                  setRangeValue(rangeValue + 1);
                  props.onTimeChange(
                    timeSlots[rangeValue + 1] + " " + timeType
                  );
                } else {
                  // setRangeValue(0);
                  // props.onTimeChange(timeSlots[0]);
                }
              }}
            >
              <AddIcon
                style={{
                  color: "rgba(37, 110, 220)",
                }}
              ></AddIcon>
            </IconButton>

            <div
              style={{
                cursor: "pointer",
                marginLeft: 15,
                position: "relative",
                top: 7,
              }}
            >
              <button
                className={
                  timeType === "am" ? classes.buttonPm : classes.button
                }
                onClick={() => {
                  console.log("time change am");

                  setTimeType("am");
                  // props.onTimeChange(timeSlots[rangeValue] + "" + "am");
                }}
              >
                AM
              </button>
              <button
                className={
                  timeType === "pm" ? classes.buttonPm : classes.button
                }
                onClick={() => {
                  console.log("time change pm");
                  setTimeType("pm");
                  // props.onTimeChange(timeSlots[rangeValue] + "" + "pm");
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
                  onClick={() => {
                    props.onTimeChange(
                      hoursTime + ":" + minutesTime + " " + timeType
                    );
                  }}
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
