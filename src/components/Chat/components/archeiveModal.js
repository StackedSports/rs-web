import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  modal: {},
  paper: {
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    top: "40vh",
    border: "none",
    left: "40%",
    borderRadius: 3,
    width: 430,
    [theme.breakpoints.down("sm")]: {
      top: 100,
      right: 50,
    },
  },
}));

export default function ModalArcheive(props) {
  const classes = useStyles();

  return (
    <Modal
      open={false}
      // onClose={handleClose}
      // BackdropComponent={Backdrop}
      //   BackdropProps={{
      //     timeout: 500,
      //   }}
    >
      <div className={classes.paper}>
        <div
          style={{
            padding: "0px 17px",

            fontWeight: 500,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 30,
          }}
        >
          Are you sure you would like to archive this conversations?
        </div>

        <div style={{ border: "1px solid rgb(219, 219, 219)" }}></div>

        <div
          style={{
            display: "flex",
            margin: "20px 0px",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 100,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid rgb(219, 219, 219)",
              padding: "8px 0px",
              color: "rgb(121, 159, 230)",
              fontWeight: 500,
            }}
          >
            Cancel
          </div>

          <div
            style={{
              width: 120,
              textAlign: "center",
              borderRadius: 5,
              border: "1px solid rgb(219, 219, 219)",
              padding: "8px 0px",
              background: "rgb(194, 1, 1)",
              marginLeft: 14,

              color: "white",

              fontWeight: 500,
            }}
          >
            Archive
            <DeleteForeverOutlinedIcon
              style={{ color: "white", marginLeft: 15 }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
