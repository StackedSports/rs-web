import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  Grid,
  Checkbox,
  TextField,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Avatar from "../../images/avatar.jpeg";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ComputerIcon from "@material-ui/icons/Computer";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArcheiveModal from "./components/archeiveModal";
import TabletAndroidIcon from "@material-ui/icons/TabletAndroid";
import { FilterIconBlue } from "../dashboard/homeElements";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import CachedIcon from "@material-ui/icons/Cached";

import AutoFixHighIcon from "@material-ui/icons/Audiotrack";
import AvatarImg from "../../images/avatar.png";
import ClearIcon from "@material-ui/icons/Clear";
import Media from "../../images/media.jpg";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./chat.css";
import PieChart from "./components/chatPieChart";
import {
  FaMagic,
  FaColumns,
  FaUserCircle,
  FaPhone,
  FaTwitter,
  FaMapMarker,
  FaLocationArrow,
} from "react-icons/fa";
import DialogBox from "../common/Dialogs";

import {
  DarkContainer,
  ChatContainer,
  MessageStat,
} from "../common/Elements/Elements";
import IconTextField from "../common/Fields/IconTextField";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import IconButton from "../common/Buttons/IconButton";
import {
  getAllContacts,
  getTags,
  getRanks,
  getStatuses,
  getGradeYears,
  getBoardFilters,
  getPositions,
  getAllColumns,
} from "../../ApiHelper";
import { SelectAll } from "@material-ui/icons";

const messages = [
  {
    message: "Hy there i am using Recruite Suite",
    left: true,
    underText: "6:25pm",
  },
  {
    message:
      "Hy there i am using Recruite Suite, there i am using Recruite Suite",
    left: false,
    underText: "Sent by Chris Highland at 8:25pm",
  },
  {
    message: "Hy there i am using Recruite Suite",
    left: true,
    underText: "6:25pm",
    date: "Wed Mar 17",
  },
  {
    message:
      "Hy there i am using Recruite Suite, there i am using Recruite Suite",
    left: true,
    underText: "6:25pm",
  },
  {
    message:
      "Hy there i am using RecruitHy there i am using RecruitHy there i am using Recruite Suite, there i am using Recruite Suite",
    left: false,
    underText: "Sent by Chris Highland at 8:25pm",
  },
  {
    message: "Hy there i am using Recruite Suite",
    left: true,
    underText: "6:25pm",
  },
  {
    message:
      "Hy there i am using Recruite Suite, there i am using Recruite Suite",
    left: true,
    underText: "6:25pm",
  },
];

const useStyles = makeStyles({
  dropdownHidden: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: 230,
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    border: "1px solid #d5d5d5",
    borderRadius: 4,
    // padding: 5,
    marginLeft: -140,
    zIndex: 1,
    maxHeight: "60vh",
    overflowY: "scroll",
    overflowX: "hidden",
    zIndex: 200000000,
  },
  tableHeading: {
    fontWeight: 700,
    fontSize: 15,
  },
  tableFields: {
    fontWeight: 500,
    fontSize: 15,
  },
  sideFilter: {
    padding: 5,
    fontWeight: 600,
    fontSize: 15,
    paddingBottom: 0,
    marginBottom: 5,
    cursor: "pointer",
  },
  sideSubFilter: {
    fontWeight: 700,
    color: "black",
    fontSize: 14,
    marginLeft: 10,
    cursor: "pointer",
    margin: 0,
    padding: 0,
  },
  sideSubFilterGrey: {
    marginTop: 0,
    color: "rgb(54,54,54)",
    fontSize: 14,
    margin: 0,
    padding: 0,
    marginLeft: 10,
    cursor: "pointer",
  },
  tags: {
    border: "1px solid #d8d8d8",
    height: 40,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    marginLeft: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  icons: {
    color: "#d8d8d8",
  },
  messagBox: {
    margin: 0,
    padding: 8,
    background: "#f1f0f0",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,

    fontWeight: 500,
    fontSize: 13,
    marginBottom: 5,
  },
  messagBoxBlue: {
    margin: 0,
    padding: 8,
    background: "#3871da",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,

    fontWeight: 500,
    fontSize: 13,
    color: "white",
    marginBottom: 5,
  },
});

const Home = () => {
  const classes = useStyles();

  const UserCard = (props) => {
    console.log("propsprops", props);
    return (
      <div
        style={{
          height: 85,
          borderBottom: "1.8px solid rgb(204, 204, 204)",
          display: "flex",
          padding: "0px 15px",
          background: props.index === 2 ? "rgb(56, 113, 218)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Avatar}
            style={{
              borderRadius: 30,
              width: 60,
              height: 60,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            marginLeft: 15,
          }}
        >
          <Grid direction="row" style={{ display: "flex" }}>
            <Grid md={8}>
              <div
                style={{
                  fontWeight: 500,
                  marginTop: 15,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color:
                    props.index === 2
                      ? "rgba(255,255,255,0.7)"
                      : "rgb(75, 75, 75)",
                }}
              >
                Luke Burkea
              </div>
            </Grid>

            <Grid md={4}>
              <div
                style={{
                  fontSize: 13,
                  marginTop: 15,
                  textAlign: "end",
                  fontWeight: 600,
                  color:
                    props.index === 2
                      ? "rgba(255,255,255,0.7)"
                      : "rgb(75, 75, 75)",
                }}
              >
                11:20 pm
              </div>
            </Grid>
          </Grid>

          <Grid direction="row" style={{ display: "flex", marginTop: -6 }}>
            <Grid md={8}>
              <div
                style={{
                  margin: 0,
                  fontSize: 14,
                  color:
                    props.index === 2
                      ? "rgba(255,255,255,0.9)"
                      : "rgb(121, 121, 121?)",
                }}
              >
                @charles
              </div>
            </Grid>

            {props.index == 1 && (
              <Grid md={4}>
                <div
                  style={{
                    margin: 0,

                    textAlign: "end",
                  }}
                >
                  <ClearIcon
                    style={{
                      margin: 0,
                      fontSize: 17,
                    }}
                  />
                </div>
              </Grid>
            )}
          </Grid>

          <div
            style={{
              margin: 0,
              marginTop: -5,
              fontSize: 13,
              color: props.index === 2 ? "white" : "rgb(121, 121, 121?)",
            }}
          >
            Three Ways To Get Travel Disco...
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ArcheiveModal />

      <div
        style={{
          background: "rgb(233, 234, 239)",
          marginLeft: 60,
        }}
      >
        <Grid style={{ display: "flex" }}>
          <Grid lg={2}>
            <div style={{ marginTop: 75, marginLeft: 20 }}>
              <p
                style={{
                  padding: 5,
                  fontWeight: 600,
                  fontSize: 20,
                  marginBottom: 20,
                  cursor: "pointer",
                }}
              >
                Inboxes
              </p>

              <p className={classes.sideFilter}>
                My Media{" "}
                <KeyboardArrowDownIcon
                  style={{ fontSize: 26, marginLeft: 20 }}
                ></KeyboardArrowDownIcon>
              </p>
              <p className={classes.sideSubFilter}>@bG121 </p>
              <p className={classes.sideSubFilterGrey}>6162.222.2 </p>

              <p className={classes.sideFilter}>
                Chris hiland{" "}
                <ArrowForwardIosIcon
                  style={{ fontSize: 15, marginLeft: 20 }}
                ></ArrowForwardIosIcon>
              </p>
            </div>
          </Grid>

          <Grid lg={3}>
            <ChatContainer>
              <div
                style={{
                  position: "sticky",
                }}
              >
                <div
                  style={{
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "3px solid rgb(233, 234, 239)",
                  }}
                >
                  <div style={{ paddingLeft: 30 }}>
                    <FormatAlignLeftIcon style={{}}></FormatAlignLeftIcon>

                    <span
                      style={{
                        fontSize: 20,
                        marginLeft: 23,
                        fontWeight: "bold",
                      }}
                    >
                      Ben Graves
                    </span>

                    <span
                      style={{
                        fontSize: 15,
                        marginLeft: 10,
                        color: "rgb(163, 163, 163)",
                        marginTop: 5,
                        fontWeight: "bold",
                      }}
                    >
                      @ BG615
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    height: 66,
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 15px",
                    width: "100%",
                    marginTop: 25,
                    borderBottom: "1.8px solid rgb(204, 204, 204)",
                  }}
                >
                  <div
                    style={{
                      height: 40,
                      width: "100%",

                      backgroundColor: "rgb(237, 238, 242)",
                      borderRadius: "35px",
                      display: "flex",
                    }}
                  >
                    <SearchIcon
                      style={{
                        marginTop: 7,
                        marginLeft: 15,
                        fontSize: 28,
                        color: "rgb(142, 142, 147)",
                      }}
                    />
                    <input
                      className="searchInput"
                      style={{
                        border: "none",
                        width: "100%",
                        background: "rgb(237, 238, 242)",
                      }}
                      placeholder="Search"
                    />
                    <FilterIconBlue
                      style={{
                        marginTop: 13,
                        marginRight: 20,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: 500,
                      float: "right",
                      marginRight: 5,
                      textAlign: "end",
                      fontSize: 14,
                      color: "rgb(91, 91, 91)",
                    }}
                  >
                    Show Unread
                  </div>
                </div>
              </div>

              <div
                style={{
                  overflow: "scroll",
                  minHeight: "100vh",

                  maxHeight: "calc(100vh - 16rem)",
                }}
              >
                {[1, 2, 4, 5].map((val, index) => {
                  return <UserCard val={val} index={index} />;
                })}
              </div>
            </ChatContainer>
          </Grid>

          <Grid lg={4}>
            <MessageStat>
              <div
                style={{
                  position: "sticky",
                }}
              >
                <Grid
                  style={{
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    background: "rgb(56, 113, 218)",
                    width: "100%",
                    padding: "0px 30px",
                  }}
                >
                  <Grid lg={8}>
                    <img
                      src={Avatar}
                      style={{
                        borderRadius: 30,
                        width: 45,
                        height: 45,
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 500,
                        marginLeft: 15,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        color: "rgba(255,255,255,0.9)",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Luke Burkea
                    </span>
                    <span
                      style={{
                        margin: 0,
                        marginLeft: 10,

                        fontSize: 14,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      @charles
                    </span>
                  </Grid>
                  <Grid lg={4}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ClearIcon
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "white",
                          fontSize: 25,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <div
                  style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20 }}
                >
                  <div class="dropdown" style={{ marginLeft: 20 }}>
                    <div
                      onClick={() => {
                        // setDisplayEmojiSelect(true);
                      }}
                      style={{
                        fontSize: 15,
                        marginLeft: 20,
                        marginTop: 16,
                        position: "absolute",
                        right: 20,
                        cursor: "pointer",
                      }}
                    >
                      😀
                    </div>{" "}
                    <div
                      // class="dropdown-content"
                      className={classes.dropdownHidden}
                      style={{
                        marginLeft: 50,
                        marginTop: -450,
                        // display: displayEmojiSelect ? "block" : "none",
                      }}
                      onMouseLeave={() => {
                        // setDisplayEmojiSelect(false);
                      }}
                    >
                      <Picker
                        set="apple"
                        // onSelect={(e) => {
                        //   console.log("This si ", e.native);
                        //   setMessageText(messageText + e.native);
                        // }}
                        // onSelect={(e) => {
                        //   var newVal = "";
                        //   if (
                        //     document.getElementById("textArea")
                        //       .selectionStart === messageText.length
                        //   ) {
                        //     setMessageText(messageText + e.native);
                        //   } else {
                        //     for (var i = 0; i < messageText.length; i++) {
                        //       newVal = newVal + messageText[i];
                        //       if (
                        //         i ===
                        //         document.getElementById("textArea")
                        //           .selectionStart
                        //       ) {
                        //         newVal = newVal + e.native;
                        //       }
                        //     }
                        //     setMessageText(newVal);
                        //   }
                        // }}
                      />
                    </div>
                  </div>

                  <textarea
                    type="text"
                    className="chatTextArea"
                    style={{
                      border: "1px solid rgb(202, 202, 202)",
                      height: 110,
                      // width: "fit-content",
                      width: "100%",
                      borderRadius: 6,
                      resize: "none",
                      outline: "none",
                    }}
                    value={""}
                    onChange={(e) => {}}
                    placeholder="Type message to send..."
                  ></textarea>
                </div>
                <div
                  style={{
                    color: "rgb(190, 190, 190)",
                    margin: 0,
                    fontSize: 12,
                    padding: 0,
                    paddingLeft: 30,
                  }}
                >
                  <i> Luke is typing...</i>
                </div>
                <Grid
                  style={{
                    display: "flex",
                    padding: "0px 30px",
                    paddingBottom: 20,
                    borderBottom: "1px solid rgb(204, 204, 204)",
                  }}
                >
                  <Grid lg={8}></Grid>

                  <Grid lg={8}>
                    <div
                      style={{
                        width: 100,
                        borderRadius: 5,
                        padding: "1px 0px",
                        textAlign: "center",
                        float: "right",
                        verticalAlign: "middle",
                        backgroundColor: "rgb(56, 113, 218)",
                        color: "white",
                      }}
                    >
                      Send
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div style={{ height: "89vh", padding: "0px 30px" }}>
                <div
                  style={{
                    float: "right",
                    color: "rgb(179, 179, 179)",
                    marginTop: 10,
                  }}
                >
                  Action
                </div>
                <div
                  style={{
                    width: "100%",
                    maxHeight: 380,
                    // background: "red",
                    paddingInline: 10,
                    marginTop: 8,
                    borderBottom: "2px solid #f8f8f8",
                  }}
                  className="fullHeightMessages hideScrollBar"
                  id="infinit"
                >
                  {messages.map((item) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        justify={item.left ? "flex-start" : "flex-end"}
                      >
                        <p
                          className={
                            item.left
                              ? classes.messagBox
                              : classes.messagBoxBlue
                          }
                        >
                          {item.message}
                        </p>
                        <p
                          style={{
                            width: "90%",
                            textAlign: item.left ? "left" : "right",
                            fontSize: 10,
                            color: "#9ca4ab",
                          }}
                        >
                          {item.underText}
                        </p>
                        {item.date && (
                          <p
                            style={{
                              width: "95%",
                              textAlign: "center",
                              fontSize: 13,
                              color: "#9ca4ab",
                            }}
                          >
                            {item.date}
                          </p>
                        )}
                      </Grid>
                    );
                  })}
                </div>
              </div>
            </MessageStat>
          </Grid>

          <Grid lg={3}>
            <MessageStat>
              <div
                style={{
                  position: "sticky",
                }}
              >
                <Grid
                  style={{
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "3px solid rgb(233, 234, 239)",
                    padding: "0px 30px",
                  }}
                >
                  <Grid lg={8}>
                    <div
                      style={{
                        fontSize: 18,
                        color: "rgb(66, 68, 72)",
                        fontWeight: "bold",
                      }}
                    >
                      Message Stats
                    </div>
                  </Grid>
                  <Grid lg={4}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ClearIcon
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "rgb(56, 113, 218)",
                          fontSize: 25,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

              <PieChart />

              <center style={{ marginBottom: 10 }}>
                <ArrowDropUpIcon style={{ color: "rgb(71, 184, 129)" }} />
                <span
                  style={{
                    color: "rgb(76, 186, 132)",
                    marginRight: 7,
                    fontWeight: "bold",
                  }}
                >
                  16%
                </span>
                <span style={{ color: "rgb(136, 150, 164)", fontSize: 14 }}>
                  Since last month
                </span>
              </center>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 15px",
                  width: "100%",
                  padding: "15px 30px",

                  borderBottom: "1.8px solid rgb(204, 204, 204)",
                }}
              >
                <Grid
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 40,
                    }}
                  >
                    <ComputerIcon
                      style={{
                        marginLeft: 23,
                        marginBottom: 5,
                        fontSize: 35,
                        color: "rgb(166, 177, 187)",
                      }}
                    />
                    <div style={{ color: "rgb(189, 191, 195)", fontSize: 14 }}>
                      Twitter DMs
                    </div>

                    <div
                      style={{
                        color: "rgb(52, 129, 210)",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 30,
                      }}
                    >
                      32
                    </div>
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 40,
                    }}
                  >
                    <TabletAndroidIcon
                      style={{
                        marginBottom: 5,
                        fontSize: 35,
                        color: "rgb(166, 177, 187)",
                      }}
                    />
                    <div
                      style={{
                        textAlign: "center",

                        color: "rgb(189, 191, 195)",
                        fontSize: 14,
                      }}
                    >
                      {" "}
                      RS
                    </div>

                    <div
                      style={{
                        color: "rgb(249, 232, 166)",
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      32
                    </div>
                  </Grid>
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 30,
                    }}
                  >
                    <PhoneAndroidIcon
                      style={{
                        marginLeft: 13,
                        marginBottom: 5,
                        fontSize: 35,
                        color: "rgb(166, 177, 187)",
                      }}
                    />
                    <div style={{ color: "rgb(189, 191, 195)", fontSize: 14 }}>
                      Personal
                    </div>

                    <div
                      style={{
                        color: "rgb(223, 84, 77)",
                        fontWeight: "bold",

                        textAlign: "center",
                        fontSize: 30,
                      }}
                    >
                      32
                    </div>
                  </Grid>
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <Grid lg={5}>
                    <div
                      style={{
                        color: "rgb(111, 112, 116)",
                        fontWeight: "bold",
                      }}
                    >
                      Last 30 days
                    </div>
                  </Grid>

                  <Grid lg={7}>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <span
                        style={{
                          color: "rgb(187, 187, 187)",
                          marginRight: 4,
                        }}
                      >
                        Last communication
                      </span>{" "}
                      <span style={{ color: "rgb(103, 103, 103)" }}>
                        3h ago
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <Grid
                style={{
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "3px solid rgb(233, 234, 239)",
                  padding: "0px 30px",
                }}
              >
                <Grid lg={8}>
                  <div
                    style={{
                      fontSize: 18,
                      color: "rgb(66, 68, 72)",
                      fontWeight: "bold",
                    }}
                  >
                    Send Media
                  </div>
                </Grid>
                <Grid lg={4}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <CachedIcon
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        color: "rgb(102, 120, 138)",
                        fontSize: 25,
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <div style={{ display: "flex", padding: "15px 30px" }}>
                <img
                  src={Media}
                  width={"150px"}
                  height={"150px"}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <img
                  src={Media}
                  width={"150px"}
                  height={"120px"}
                  style={{ marginLeft: 30, objectFit: "cover" }}
                />
              </div>
              <center>
                <div style={{ color: "rgb(56, 113, 218)", fontWeight: "bold" }}>
                  Load More
                </div>
              </center>

              <div
                style={{
                  marginLeft: "25px",
                  marginRight: "25px",
                  borderBottom: "3px solid rgb(233, 234, 239)",
                  paddingBottom: 20,
                }}
              ></div>
              <p style={{ color: "rgb(176, 176, 176)", padding: "10px 20px" }}>
                Assosciate Media
              </p>
            </MessageStat>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
