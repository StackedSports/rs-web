import React, { useState } from "react";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  tab: {
    margin: 0,
    height: 40,
    width: 130,
    textAlign: "center",
    fontSize: 20,
    fontWeigth: 500,
    marginRight: 20,
    cursor: "pointer",
  },
  grayText: {
    margin: 0,
    color: "#9ca4ab",
    width: "600%",
    marginLeft: 16,
    width: "90%",
  },
  notificationText: {
    margin: 0,
    fontSize: 20,
    fontWeight: 500,
    marginTop: 16,
  },
  buttonEnd: {
    width: 100,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    background: "#3871da",
    color: "white",
    height: 40,
    border: "2px solid #f5f5f5",
  },
  buttonStart: {
    width: 100,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    background: "transparent",
    height: 40,
    border: "2px solid #f5f5f5",
    color: "#b5b9c0",
  },
  notificationGrid: {
    borderBottom: "2px solid #f5f5f5",
    marginBottom: 16,
    paddingBottom: 16,
  },
}));
export default function UserAccountSettings(props) {
  const classes = useStyles();
  const [readytoSent, setReadytoSend] = useState("inapp");
  const [type2, setType2] = useState("inapp");
  const [type3, setType3] = useState("inapp");
  const [type4, setType4] = useState("inapp");
  const [type5, setType5] = useState("inapp");
  const [type6, setType6] = useState("inapp");
  const [type7, setType7] = useState("inapp");
  const [type8, setType8] = useState("inapp");
  const [type9, setType9] = useState("inapp");
  const [type10, setType10] = useState("inapp");
  const [type11, setType11] = useState("inapp");
  const [type12, setType12] = useState("inapp");
  const NotificationButton = (props) => {
    return (
      <Grid container direction="row">
        <button
          className={classes.buttonStart}
          style={{
            background: props.type === "InApp" ? "transparent" : "#3871da",
            color: props.type === "InApp" ? "#b5b9c0" : "white",
          }}
          onClick={() => {
            props.changeStatus("None");
          }}
        >
          None
        </button>
        <button
          className={classes.buttonEnd}
          style={{
            background: props.type === "InApp" ? "#3871da" : "transparent",
            color: props.type === "InApp" ? "white" : "#b5b9c0",
          }}
          onClick={() => {
            props.changeStatus("InApp");
          }}
        >
          InApp
        </button>
      </Grid>
    );
  };
  return (
    <Grid container direction="row">
      <Grid item md={4} xs={4} style={{ paddingRight: 16 }}>
        <Grid
          container
          direction="row"
          style={{
            marginTop: 16,
            borderRadius: 4,
            paddingTop: 16,
            marginRight: 16,
          }}
        >
          <Grid item md={9} xs={9}>
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 500,
                marginTop: 16,
                marginLeft: 16,
              }}
            >
              General Notifications
            </p>
            <p className={classes.grayText}>
              Select When you will be notified when the following occur
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={8} xs={8}>
        <Grid
          container
          direction="row"
          style={{
            marginTop: 16,
            borderRadius: 4,
            paddingTop: 16,
          }}
        >
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                A personal text is ready to be sent
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={readytoSent}
                changeStatus={(value) => {
                  setReadytoSend(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                A twitter Dm will be sent in{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={60}
                ></input>{" "}
                minutes
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type2}
                changeStatus={(value) => {
                  setType2(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                An SMS/MMS will be sent in{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={60}
                ></input>{" "}
                minutes
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type3}
                changeStatus={(value) => {
                  setType3(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                Someone Replies to you SMS/MMS Message
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type4}
                changeStatus={(value) => {
                  setType4(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                A personal text is ready to be sent
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type5}
                changeStatus={(value) => {
                  setType5(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                Someone replies to you Twitter Direct Message
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type6}
                changeStatus={(value) => {
                  setType6(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                I've had outstanding tasks for more than{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={1}
                ></input>{" "}
                hours
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type7}
                changeStatus={(value) => {
                  setType7(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                New Media File have been uploadd and assigned to me
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type8}
                changeStatus={(value) => {
                  setType8(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                An Admin has requested my approval on tweet or text
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type9}
                changeStatus={(value) => {
                  setType9(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        style={{
          marginTop: 16,
          borderBottom: "2px solid #f5f5f5",
        }}
      ></Grid>
      <Grid item md={4} xs={4} style={{ paddingRight: 16 }}>
        <Grid
          container
          direction="row"
          style={{
            marginTop: 16,
            borderRadius: 4,
            paddingTop: 16,
            marginRight: 16,
          }}
        >
          <Grid item md={9} xs={9}>
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 500,
                marginTop: 16,
                marginLeft: 16,
              }}
            >
              Cusotom Notifications
            </p>
            <p className={classes.grayText}>
              Add custom Notifications for you team when changes occur
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={8} xs={8}>
        <Grid
          container
          direction="row"
          style={{
            marginTop: 16,
            borderRadius: 4,
            paddingTop: 16,
          }}
        >
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                An SMS/MMS will be sent in{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={60}
                ></input>{" "}
                minutes
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type10}
                changeStatus={(value) => {
                  setType10(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                An SMS/MMS will be sent in{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={60}
                ></input>{" "}
                minutes
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type11}
                changeStatus={(value) => {
                  setType11(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.notificationGrid}>
            <Grid item md={8} xs={8}>
              {" "}
              <p className={classes.notificationText}>
                An SMS/MMS will be sent in{" "}
                <input
                  style={{ width: 40, border: "2px solid #f5f5f5" }}
                  maxLength={2}
                  value={60}
                ></input>{" "}
                minutes
              </p>
            </Grid>
            <Grid item md={4} xs={4}>
              <NotificationButton
                type={type12}
                changeStatus={(value) => {
                  setType12(value);
                }}
              ></NotificationButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
