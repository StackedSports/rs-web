import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Grid } from "@mui/material";
import Fade from "@mui/material/Fade";
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
  const [search, setSearch] = useState("");
  var number = 0;
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
    "In Progress",
    "Pending",
  ];
  // console.log("These are monthly stats", props.monthlyStats);
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
                            style={{ width: 120 }}
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
                  <Grid container direction="column"></Grid>
                  <ListCol>
                    <Grid container direction="row" style={{ width: 150 }}>
                      {" "}
                      {props.messageSender === "All Team Members" && (
                        <CheckCircleIcon
                          fontSize="inherit"
                          style={{ color: "#006644", marginRight: 5 }}
                        />
                      )}
                      <Heading2
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          props.setMessageSender("All Team Members");
                        }}
                      >
                        {"All Team Members"}
                      </Heading2>
                      <input
                        type="text"
                        style={{
                          border: "1px solid #e6e7ec",
                          borderRadius: 4,
                        }}
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      ></input>
                    </Grid>
                    {props.monthlyStats &&
                      props.monthlyStats.users.map((user, index) => {
                        // console.log("This is the atbel", user.table);

                        if (number < 3) {
                          if (props.messageSender === user.table.name) {
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
                                <Heading2>{user.table.name}</Heading2>
                              </Grid>
                            );
                          } else {
                            if (search != "") {
                              if (
                                user.table.name.toLowerCase().search(search) !=
                                -1
                              ) {
                                number = number + 1;
                                return (
                                  <Grid container direction="column">
                                    <Option
                                      style={{ marginLeft: 20 }}
                                      onClick={() => {
                                        props.setMessageSender(user.table.name);
                                      }}
                                    >
                                      {user.table.name}
                                    </Option>
                                  </Grid>
                                );
                              }
                            } else {
                              number = number + 1;
                              return (
                                <Grid container direction="column">
                                  <Option
                                    style={{ marginLeft: 20 }}
                                    onClick={() => {
                                      props.setMessageSender(user.table.name);
                                    }}
                                  >
                                    {user.table.name}
                                  </Option>
                                </Grid>
                              );
                            }
                          }
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
                            style={{ width: 230 }}
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
