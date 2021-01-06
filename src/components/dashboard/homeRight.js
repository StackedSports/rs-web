import React from "react";
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
import Ex1 from "../../images/p1.jpg";
import Start from "../../images/star.svg";
import AvatarImg from "../../images/avatar.jpeg";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "This Month",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
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

function HomeRight() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <RightSectionContainer>
      <PersonContainer>
        <Num>1.</Num>
        <AvatartInfo>
          <Avatar src={AvatarImg} />
          <AvatarName>Coach Smith</AvatarName>
          <AvatarButton>Score Details</AvatarButton>
        </AvatartInfo>
      </PersonContainer>

      <InfoSection>
        <InfoBox>
          <InfoSubBox style={{ paddingLeft: "21px" }}>
            <InfoP>DM’s</InfoP>
            <InfoH>359</InfoH>
          </InfoSubBox>
          <InfoSubBox>
            <InfoP>Personal Text</InfoP>
            <InfoH>234</InfoH>
          </InfoSubBox>
          <InfoSubBox style={{ paddingRight: "21px" }}>
            <InfoP>RS Text</InfoP>
            <InfoH>18</InfoH>
          </InfoSubBox>
        </InfoBox>
      </InfoSection>

      <StackSecion>
        <MM>
          <MMH>The StackUp</MMH>
          <MonthField>
            <TextField
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
              }}>
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </MonthField>
        </MM>

        <ListSec>
          <ListItem>
            <ListNum>1.</ListNum>
            <ListAvatartSec>
              <ListAvatart src={Ex1} />
              <ListStart src={Start} />
            </ListAvatartSec>
            <ListName>Coach Smith</ListName>
            <ListNumber>611</ListNumber>
          </ListItem>

          <ListItem>
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
          </ListItem>
        </ListSec>
      </StackSecion>
      <ListBottom>
        <ListBottomText>View Details</ListBottomText>
      </ListBottom>
    </RightSectionContainer>
  );
}

export default HomeRight;
