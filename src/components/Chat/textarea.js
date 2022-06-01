import React, { Component, useState } from "react";
import {
  DarkContainer,
  ChatContainer,
  MessageStat,
} from "../common/Elements/Elements";
import Avatar from "../../images/avatar.jpeg";
import PhotoIcon from "@material-ui/icons/Photo";
import CheckIcon from "@material-ui/icons/Done";

import ClearIcon from "@material-ui/icons/Clear";
import { Picker } from "emoji-mart";
import {
  Grid,
  Checkbox,
  TextField,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "emoji-mart/css/emoji-mart.css";
import { FiScissors } from "react-icons/fi";
import { FaMagic } from "react-icons/fa";
import "./chat.css";

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
    image: true,
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

const Chat = ({ data, setOpenChats, openChats }) => {
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
  const [displayEmojiSelect, setDisplayEmojiSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [isAction, setIsAction] = useState(false);
  const [isActionMenu, setIsActionMenu] = useState(false);

  const classes = useStyles();
  return (
    <MessageStat>
      <div
        style={{
          position: "sticky",
          width: 400,
        }}
      >
        <div
          style={{
            height: 70,
            display: "flex",
            borderRight: "1.8px solid rgb(204, 204, 204)",

            alignItems: "center",
            background: "rgb(56, 113, 218)",
            padding: "0px 30px",
          }}
        >
          <div
            onClick={() => {
              let tempOpenChats = openChats;
              console.log(tempOpenChats);
              var getIndex = tempOpenChats.findIndex(
                (p) => p.selectedIndex == data.selectedIndex
              );
              console.log(getIndex);

              tempOpenChats[getIndex].mediaVisibile = true;
              setOpenChats(tempOpenChats);
              console.log(data);
            }}
            style={{ cursor: "pointer" }}
          >
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
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
              onClick={() => {
                let tempOpenChats = openChats;
                let temp = tempOpenChats.filter(
                  (val) => val.selectedIndex !== data.selectedIndex
                );

                setOpenChats(temp);
              }}
            >
              <ClearIcon
                style={{
                  position: "absolute",
                  right: 10,
                  top: 20,
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 25,
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20 }}>
          <div class="dropdown" style={{ marginLeft: 20 }}>
            <div
              onClick={() => {
                setDisplayEmojiSelect(true);
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
              className={classes.dropdownHidden}
              style={{
                marginLeft: 0,
                display: displayEmojiSelect ? "block" : "none",
              }}
              onMouseLeave={() => {
                setDisplayEmojiSelect(false);
              }}
            >
              <Picker
                set="apple"
                onSelect={(e) => {
                  var newVal = "";
                  let messageText = data?.message ?? "";
                  if (
                    document.getElementById("textArea" + data.arrayIndex)
                      .selectionStart === messageText.length
                  ) {
                    let temp = openChats;
                    console.log("Sd", temp);

                    temp[data.arrayIndex].message = messageText + e.native;
                    setOpenChats(temp);
                  } else {
                    for (var i = 0; i < messageText.length; i++) {
                      newVal = newVal + messageText[i];
                      if (
                        i ===
                        document.getElementById("textArea" + data.arrayIndex)
                          .selectionStart
                      ) {
                        newVal = newVal + e.native;
                      }
                    }
                    let temp = openChats;
                    console.log("Sd", temp);

                    temp[data.arrayIndex].message = newVal;
                    setOpenChats(temp);
                  }
                }}
              />
            </div>
          </div>

          <textarea
            type="text"
            className="chatTextArea"
            style={{
              height: 110,
              // width: "fit-content",
              width: "100%",
              marginTop: 4,
              marginLeft: 4,
              borderRadius: 6,
              resize: "none",
              outline: "none",
            }}
            key={data.arrayIndex}
            id={"textArea" + data.arrayIndex}
            value={data.message}
            onChange={(e) => {
              let temp = openChats;
              console.log("Sd", temp);

              temp[data.arrayIndex].message = e.target.value;
              setOpenChats(temp);
            }}
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
        <div
          style={{
            padding: "0px 30px",
            paddingBottom: 20,
            display: "flex",
            borderBottom: "1.8px solid rgb(204, 204, 204)",
          }}
        >
          <PhotoIcon
            style={{
              color: "rgb(118, 118, 118)",
            }}
          />
          <div
            style={{
              height: 18,
              width: 1,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              backgroundColor: "rgb(233, 233, 233)",
            }}
          ></div>
          <FaMagic
            style={{
              color: "rgb(118, 118, 118)",
              marginTop: 2,
              fontSize: 17,
            }}
          />
          <div
            style={{
              height: 18,
              width: 1,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              backgroundColor: "rgb(233, 233, 233)",
            }}
          ></div>
          <FiScissors
            style={{
              marginTop: 2,

              color: "rgb(118, 118, 118)",
              fontWeight: "bold",
              fontSize: 19,
            }}
          />

          {/* <div
                style={{
                  height: 17,
                  marginTop: 4,
                  backgroundColor: "rgb(235, 235, 235)",
                  width: 1,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              ></div> */}

          <div
            style={{
              width: 100,
              borderRadius: 5,
              padding: "1px 0px",
              textAlign: "center",
              cursor: "pointer",
              position: "absolute",
              right: 30,
              backgroundColor: "rgb(56, 113, 218)",
              color: "white",
            }}
          >
            Send
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            color: "rgb(118, 118, 118)",
            marginTop: 10,
            fontWeigth: "bold",
            fontSize: 13,
            paddingBottom: 5,
            paddingLeft: "10px",
            width: "50%",
          }}
        >
          {isAction && (
            <div
              onClick={() => {
                setIsAction(false);
                setSelectedIndex([]);
                setIsActionMenu(false);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Cancel
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (isAction === false) {
              setIsAction(true);
            } else {
              setIsActionMenu(true);
              console.log("Darshan");
            }
          }}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
            paddingBottom: 5,

            color: "rgb(118, 118, 118)",
            marginTop: 10,
            position: "relative",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Action
          {isActionMenu && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                // display: "none",
                backgroundColor: "white",
                minWidth: 150,
                position: "absolute",

                boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                border: "1px solid #d5d5d5",
                borderRadius: 4,
                zIndex: 200000000,
                padding: "10px 15px",
              }}
            >
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Sync with CRM
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{ marginTop: 5, color: "black", fontWeight: "bold" }}
              >
                Export as CSV
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: "red",
                  fontWeight: "bold",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Archive
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={"scrollbar-hidden"}
        style={{
          overflowY: "scroll",
          height: "calc(100vh - 354px)",

          padding: "0px 0px",
        }}
      >
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
          {messages.map((item, index) => {
            let filter = selectedIndex.filter((val) => val === index);
            return (
              <div style={{ display: "flex" }}>
                {isAction && (
                  <div>
                    {filter.length ? (
                      <div
                        style={{
                          height: 20,
                          display: "inline-block",
                          width: 20,

                          cursor: "pointer",

                          borderRadius: 10,
                          marginTop: 6,
                          marginRight: 10,
                          background: "rgb(0, 102, 68)",
                        }}
                        onClick={() => {
                          let temp = selectedIndex;
                          console.log(temp);
                          console.log(index);
                          let b = temp.filter((val) => val !== index);
                          console.log(b);

                          setSelectedIndex(() => [...b]);
                        }}
                      >
                        <CheckIcon
                          style={{
                            color: "white",
                            fontSize: 18,
                            marginTop: -8,
                            marginLeft: 1,
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          let temp = selectedIndex;
                          temp.push(index);
                          setSelectedIndex(() => [...temp]);
                        }}
                        style={{
                          height: 20,
                          width: 20,
                          display: "flex",

                          cursor: "pointer",
                          borderRadius: 10,
                          marginTop: 6,
                          marginRight: 10,
                          border: "1px solid grey",
                        }}
                      ></div>
                    )}
                  </div>
                )}
                <Grid
                  style={{
                    padding: "0px 5px",
                  }}
                  justify={item.left ? "flex-start" : "flex-end"}
                >
                  <p
                    className={
                      item.left ? classes.messagBox : classes.messagBoxBlue
                    }
                  >
                    {item.message}
                  </p>
                  {item.image && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: item.left ? "flex-start" : "flex-end",
                      }}
                    >
                      <img
                        style={{
                          width: 150,
                          height: 150,
                        }}
                        src={Avatar}
                      ></img>
                    </div>
                  )}
                  {/* {item.left === false && <span>darsha</span>} */}
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
              </div>
            );
          })}
        </div>
      </div>
    </MessageStat>
  );
};
export default Chat;
