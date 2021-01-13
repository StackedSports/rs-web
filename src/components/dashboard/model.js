import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
const useStyles = makeStyles((theme) => ({
  modal: {},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "fixed",
    top: 170,
    left: 50,
    borderRadius: 5,
  },
}));

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

const ListCol = styled.div`
  margin-right: 3rem;
  @media screen and (max-width: 1000px) {
    margin-top: 1rem;
  }
`;

const Heading = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 17px;
  margin: 0px;
`;

const Option = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 17px;
  cursor: pointer;
  margin: 0px;
`;

export default function TransitionsModal({ open, setShowModal }) {
  const classes = useStyles();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <>
            <ArrowDropUpIcon
              fontSize="large"
              style={{ color: "white", position: "fixed", top: 149, left: 120 }}
            />
            <div className={classes.paper}>
              <Container>
                <ListCol>
                  <Heading>Message</Heading>
                  <Option>RS Text</Option>
                  <Option>Personal Text</Option>
                  <Option>Twitter DM’s</Option>
                </ListCol>

                <ListCol>
                  <Heading>Publishing</Heading>
                  <Option>New Tweet</Option>
                </ListCol>

                <ListCol>
                  <Heading>Media Library</Heading>
                  <Option>Media file</Option>
                  <Option>New placeholder</Option>
                </ListCol>

                <ListCol>
                  <Heading>Contact</Heading>
                  <Option>New contact</Option>
                </ListCol>

                <ListCol>
                  <Heading>Other</Heading>
                  <Option>Team Member</Option>
                  <Option>Snippet</Option>
                  <Option>Postion</Option>
                  <Option>Tag</Option>
                  <Option>Rating</Option>
                  <Option>Status</Option>
                </ListCol>
              </Container>
            </div>
          </>
        </Fade>
      </Modal>
    </div>
  );
}
