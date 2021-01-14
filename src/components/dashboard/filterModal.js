import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Grid } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const useStyles = makeStyles((theme) => ({
  modal: {},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "fixed",
    top: 300,
    right: 550,

    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      top: 100,
      right: 50,
    },
  },
}));

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;

const ListCol = styled.div`
  margin-right: 2rem;
  @media screen and (max-width: 1000px) {
    margin-top: 1rem;
  }
`;

const ListTopContainer = styled.div``;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 17px;
`;

const Heading2 = styled.p`
  color: #222222;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 17px;
  margin: 0px;
  padding: 0;
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

export default function TransitionsModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setFilterOpen(false);
  };

  const messageType = ["All types", "Personal Text", "Twitter DM’s", "Tweets"];
  const messageSender = [
    "All Team Members",
    "Personal Text",
    "Twitter DM’s",
    "Tweets",
  ];
  const messageStatus = [
    "All status (Excluding Draft)",
    "Personal Text",
    "Twitter DM’s",
    "Tweets",
  ];

  return (
    <div>
      <Modal
        disableEnforceFocus
        disableAutoFocus
        open={props.filterOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.filterOpen}>
          <div className={classes.paper}>
            <Container>
              <ListCol>
                <Heading>Message Type</Heading>
                <HeadingContainer>
                  <ListCol>
                    {messageType.map((type) => {
                      if (props.messageType === type) {
                        return (
                          <Grid
                            container
                            direction="row"
                            style={{ width: 110 }}
                          >
                            {" "}
                            <CheckCircleIcon
                              fontSize="inherit"
                              style={{ color: "#006644", marginRight: 5 }}
                            />
                            <Heading2>{type}</Heading2>
                          </Grid>
                        );
                      } else {
                        return (
                          <Option
                            style={{ marginLeft: 20 }}
                            onClick={() => {
                              props.setMessageType(type);
                            }}
                          >
                            {type}
                          </Option>
                        );
                      }
                    })}
                  </ListCol>
                </HeadingContainer>
              </ListCol>

              <ListCol>
                <Heading>Sender</Heading>
                <HeadingContainer>
                  {/* <CheckCircleIcon
                    fontSize="inherit"
                    style={{ color: "#006644", marginRight: 5 }}
                  /> */}
                  <ListCol>
                    {messageSender.map((type) => {
                      if (props.messageSender === type) {
                        return (
                          <Grid
                            container
                            direction="row"
                            style={{ width: 150 }}
                          >
                            {" "}
                            <CheckCircleIcon
                              fontSize="inherit"
                              style={{ color: "#006644", marginRight: 5 }}
                            />
                            <Heading2>{type}</Heading2>
                          </Grid>
                        );
                      } else {
                        return (
                          <Option
                            style={{ marginLeft: 20 }}
                            onClick={() => {
                              props.setMessageSender(type);
                            }}
                          >
                            {type}
                          </Option>
                        );
                      }
                    })}
                    {/* <Heading2>All Team Members</Heading2>
                    <Option>Personal Text</Option>
                    <Option>Twitter DM’s</Option>
                    <Option>Tweets</Option> */}
                  </ListCol>
                </HeadingContainer>
              </ListCol>

              <ListCol>
                <Heading>Message Status</Heading>
                <HeadingContainer>
                  {/* <CheckCircleIcon
                    fontSize="inherit"
                    style={{ color: "#006644", marginRight: 5 }}
                  /> */}
                  <ListCol>
                    {messageStatus.map((type) => {
                      if (props.messageStatus === type) {
                        return (
                          <Grid
                            container
                            direction="row"
                            style={{ width: 200 }}
                          >
                            {" "}
                            <CheckCircleIcon
                              fontSize="inherit"
                              style={{ color: "#006644", marginRight: 5 }}
                            />
                            <Heading2>{type}</Heading2>
                          </Grid>
                        );
                      } else {
                        return (
                          <Option
                            style={{ marginLeft: 20 }}
                            onClick={() => {
                              props.setMessageStatus(type);
                            }}
                          >
                            {type}
                          </Option>
                        );
                      }
                    })}
                    {/* <Heading2>All status (Excluding Draft)</Heading2>
                    <Option>Personal Text</Option>
                    <Option>Twitter DM’s</Option>
                    <Option>Tweets</Option> */}
                  </ListCol>
                </HeadingContainer>
              </ListCol>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
