import React, { useEffect } from "react";
import {
  PersonContainer,
  RightSectionContainer,
  Num,
  AvatartInfo,
  Avatar,
  AvatarName,
  AvatarButton,
  InfoSection,
  InfoSubBox,
  InfoP,
  InfoBox,
  InfoH,
  StackSecion,
  MonthField,
  MM,
  MMH,
  ListSec,
  ListItem,
  ListNum,
  ListAvatartSec,
  ListAvatart,
  ListStart,
  ListName,
  ListNumber,
  ListBottom,
  ListBottomText,
} from "./homeElementsRight";
import { Grid } from "@material-ui/core";
import Ex1 from "../../images/p1.jpg";
import Start from "../../images/star.svg";
import AvatarImg from "../../images/avatar.png";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
const currencies = [
  {
    value: "1",
    label: "Last 30 Days",
  },
  {
    value: "2",
    label: "This Month",
  },
  {
    value: "3",
    label: "This Quarter",
  },
  {
    value: "4",
    label: "This Year",
  },
  {
    value: "5",
    label: "Last Month",
  },
  {
    value: "6",
    label: "Last Quarter",
  },
  {
    value: "7",
    label: "Last Year",
  },
];

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  icon: {
    color: "red",
    margin: 0,
    padding: 0,
  },
  input: {
    color: "#222222",
    fontSize: 14,
    background: "transparent",
    fontFamily: "ProximaNovaSemibold",
  },
});

function HomeRight(props) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("This Month");
  const [rank, setRank] = React.useState(1);
  // console.log("These are stats in homeright", props.monthlyStats);
  var stats = props.monthlyStats && props.monthlyStats;
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  console.log("THis should be image", props.loggedInUserStats);
  return (
    <RightSectionContainer>
      <PersonContainer>
        <Num>{props.loggedInUserStats ? props.loggedInUserStats.rank : 1}.</Num>
        <AvatartInfo>
          <Avatar
            onClick={() => {
              props.setShowSetting(!props.showSetting);
            }}
            src={
              JSON.parse(localStorage.getItem("user")).twitter_profile
                .profile_image || AvatarImg
            }
          />
          <AvatarName>
            {props.user.first_name + " " + props.user.last_name}
          </AvatarName>
          <AvatarButton>Score Details</AvatarButton>
        </AvatartInfo>
      </PersonContainer>

      <InfoSection>
        <Grid container direction="row">
          <Grid item xs={12} lg={3}>
            <div>
              <InfoP>DM’s</InfoP>
            </div>
            <div style={{ marginTop: -10 }}>
              <InfoH>
                {props.loggedInUserStats ? props.loggedInUserStats.dms : 0}
              </InfoH>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: "1px solid rgb(237, 238, 242)",
              borderRight: "1px solid rgb(237, 238, 242)",
            }}
          >
            <InfoP>Personal Text</InfoP>
            <div style={{ marginTop: -10 }}>
              <InfoH>
                {props.loggedInUserStats ? props.loggedInUserStats.pts : 0}
              </InfoH>
            </div>
          </Grid>

          <Grid item xs={12} lg={4}>
            <InfoSubBox style={{}}>
              <InfoP>RS Text</InfoP>
              <div style={{ marginTop: -10 }}>
                <InfoH>
                  {props.loggedInUserStats ? props.loggedInUserStats.rst : 0}
                </InfoH>
              </div>
            </InfoSubBox>
          </Grid>
        </Grid>
      </InfoSection>

      <StackSecion>
        <MM>
          <MMH>The StackUp</MMH>
          <MonthField>
            <DropdownButton
              drop={"right"}
              id="dropdown-basic-button"
              title={currency}
            >
              {currencies.map((option) => (
                <Dropdown.Item
                  style={{
                    background: currency === option.label ? "#348ef7" : "white",
                    color: currency === option.label ? "white" : "black",
                  }}
                  onClick={(e) => {
                    props.onFilterChange(option.label);
                    setCurrency(option.label);
                  }}
                >
                  {" "}
                  {option.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {/* <TextField
              select
              value={currency}
              style={{
                background: "transparent",
              }}
              SelectProps={{
                classes: { icon: classes.icon },
                IconComponent: () => (
                  <KeyboardArrowDownIcon
                    style={{
                      margin: 0,
                      padding: 0,
                      width: "15px",
                    }}
                  />
                ),
              }}
              onChange={handleChange}
              fullWidth={true}
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          
           */}
          </MonthField>
        </MM>

        <ListSec>
          {stats &&
            stats.users.map((user, index) => {
              // console.log("THis is user", user);
              // var name = props.user.first_name + " " + props.user.last_name;
              // if (name === user.table.name) {
              //   setRank(user.rank);
              // }
              if (index < 4) {
                return (
                  <ListItem>
                    <ListNum>{index + 1}.</ListNum>
                    <ListAvatartSec>
                      <ListAvatart src={user.table.image} />
                      {index === 0 && <ListStart src={Start} />}
                    </ListAvatartSec>
                    <ListName>{user.table.name}</ListName>
                    <ListNumber>{user.table.total}</ListNumber>
                  </ListItem>
                );
              }
            })}

          {/* <ListItem>
            <ListNum>2.</ListNum>
            <ListAvatartSec>
              <ListAvatart src={Ex1} />
              <ListStart src={Start} />
            </ListAvatartSec>
            <ListName>Coach Smith</ListName>
            <ListNumber>611</ListNumber>
          </ListItem>

          <ListItem>
            <ListNum>3.</ListNum>
            <ListAvatartSec>
              <ListAvatart src={Ex1} />
              <ListStart src={Start} />
            </ListAvatartSec>
            <ListName>Coach Smith</ListName>
            <ListNumber>611</ListNumber>
          </ListItem> */}
        </ListSec>
      </StackSecion>
      <ListBottom>
        <ListBottomText>View Details</ListBottomText>
      </ListBottom>
    </RightSectionContainer>
  );
}

export default HomeRight;
