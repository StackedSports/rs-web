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
import Avatar from "../../images/avatar.jpeg";
import SearchIcon from "@material-ui/icons/Search";
import { FaMarker, FaSlidersH } from "react-icons/fa";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { FilterIconBlue } from "../dashboard/homeElements";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import SendIcon from "@material-ui/icons/Send";
import RowingIcon from "@material-ui/icons/Rowing";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import AvatarImg from "../../images/avatar.png";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./chat.css";
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

import { DarkContainer, ChatContainer } from "../common/Elements/Elements";
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

const Home = () => {
  const UserCard = () => {
    return (
      <div
        style={{
          height: 85,
          borderBottom: "1.8px solid rgb(204, 204, 204)",
          display: "flex",
          paddingLeft: 15,
          paddingRight: 5,
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
          style={{ display: "flex", flexDirection: "column", marginLeft: 15 }}
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
                  color: "rgb(75, 75, 75)",
                }}
              >
                11:20 pm
              </div>
            </Grid>
          </Grid>

          <div
            style={{
              margin: 0,
              marginTop: -5,
              fontSize: 14,
              color: "rgb(121, 121, 121)",
            }}
          >
            @charles
          </div>
          <div
            style={{
              margin: 0,
              marginTop: -5,
              fontSize: 13,
              color: "rgb(121, 121, 121)",
            }}
          >
            Three Ways To Get Travel Disco...
          </div>
        </div>
      </div>
    );
  };

  return (
    <ChatContainer>
      <div
        style={{
          width: 330,
          height: "100vh",
          borderRight: "3px solid rgb(233, 234, 239)",
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
            paddingLeft: 15,
            marginTop: 25,
            borderBottom: "1.8px solid rgb(204, 204, 204)",
          }}
        >
          <div>
            <div
              style={{
                height: 40,
                width: 290,
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
                  width: 220,
                  background: "rgb(237, 238, 242)",
                }}
                placeholder="Search"
              />
              <FilterIconBlue style={{ marginTop: 10 }} />
            </div>
            <div
              style={{
                fontWeight: 500,
                float: "right",
                marginRight: 5,
                fontSize: 14,
                color: "rgb(91, 91, 91)",
              }}
            >
              Show Unread
            </div>
          </div>
        </div>

        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </ChatContainer>
  );
};

export default Home;
