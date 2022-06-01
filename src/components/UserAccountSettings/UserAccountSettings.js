import React, { useState } from "react";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AvatarImg from "../../images/avatar.png";
import Avatar from "../../images/avatar.jpeg";
import { formatPhoneNumber } from "../Functions";
import IconTextField from "../common/Fields/IconTextField";
import { Twitter, Videocam } from "@material-ui/icons";
import Notifications from "./Notifications";
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
  grayText: { margin: 0, color: "#9ca4ab", width: "600%", marginLeft: 16 },
}));
export default function UserAccountSettings(props) {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [activeFocus, setActiveFocus] = useState(null);

  const [activeTab, setActiveTab] = useState("Profile");

  const SocialMediaCard = (props) => {
    return (
      <Grid
        container
        direction="row"
        style={{
          border: "1px solid #f5f5f5",
          marginTop: 16,
          borderRadius: 4,
          paddingTop: 16,
          marginRight: 16,
          marginLeft: props.marginLeft,
          height: 240,
        }}
      >
        <Grid item md={7} xs={7}>
          <p
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 500,
              marginLeft: 16,
              marginBottom: 32,
            }}
          >
            {props.heading}
          </p>
          {props.heading === "Twitter Account" ? (
            <IconTextField
              text="Link Twitter"
              textColor={"white"}
              background={"#3fa2f9"}
              width={150}
              iconStart={
                <Twitter
                  style={{
                    color: "white",
                  }}
                ></Twitter>
              }
            ></IconTextField>
          ) : (
            <IconTextField
              text="Link IG"
              textColor={"white"}
              background={"#cf2e79"}
              width={150}
              iconStart={
                <Videocam
                  style={{
                    color: "white",
                  }}
                ></Videocam>
              }
            ></IconTextField>
          )}
        </Grid>
        <Grid item md={5} xs={5}>
          <Grid container direction="row" justify="flex-end">
            <img
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                marginRight: 16,
              }}
              src={Avatar}
            ></img>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          style={{
            borderTop: "1px solid #f5f5f5",
            marginTop: 16,
            borderRadius: 4,
            paddingTop: 16,
          }}
        >
          <Grid item md={6} xs={6}>
            <p
              onClick={() => {}}
              style={{
                color: "#3871DA",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Unlink
            </p>
          </Grid>{" "}
          <Grid item md={6} xs={6}>
            <p
              onClick={() => {
                //   document.getElementById("editImage").click();
              }}
              style={{
                color: "#a4abb2",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Use This Photo
            </p>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div
      style={{
        padding: 16,
        paddingRight: 0,
      }}
    >
      <input
        type="file"
        name="image"
        id={"editImage"}
        className="form-control"
        multiple
        style={{ display: "none" }}
        // value={post.image.name}
        onChange={handleFileChange}
      />
      <div
        style={{
          background: "white",
          borderRadius: 4,
          padding: 16,
          height: "calc( 100vh - 110px )",
          overflowY: "scroll",
          width: "100%",
        }}
        className="hideScrollBar"
      >
        <Grid
          container
          direction="row"
          style={{ borderBottom: "2px solid #f8f8f8" }}
        >
          <Grid item md={6} sm={6}>
            <Grid container direction="row">
              <p
                style={{
                  borderBottom:
                    activeTab === "Profile" ? "3px solid #3871DA" : "none",
                }}
                className={classes.tab}
                onClick={() => {
                  setActiveTab("Profile");
                }}
              >
                Profile
              </p>
              <p
                style={{
                  borderBottom:
                    activeTab === "Account" ? "3px solid #3871DA" : "none",
                }}
                className={classes.tab}
                onClick={() => {
                  setActiveTab("Account");
                }}
              >
                Account
              </p>
              <p
                style={{
                  borderBottom:
                    activeTab === "Notifications"
                      ? "3px solid #3871DA"
                      : "none",
                }}
                className={classes.tab}
                onClick={() => {
                  setActiveTab("Notifications");
                }}
              >
                Notifications
              </p>
            </Grid>
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid container direction="row" justify="flex-end">
              <HollowWhiteButton
                onClick={() => {
                  props.setShowSetting(false);
                }}
                width={120}
                text="Save Settings"
                textColor="white"
                background="#3871DA"
              ></HollowWhiteButton>
            </Grid>
          </Grid>
        </Grid>
        {activeTab === "Profile" ? (
          <Grid container direction="row">
            <Grid item md={5} xs={5} style={{ paddingRight: 16 }}>
              <Grid
                container
                direction="row"
                style={{
                  border: "1px solid #f5f5f5",
                  marginTop: 16,
                  borderRadius: 4,
                  paddingTop: 16,
                  marginRight: 16,
                }}
              >
                <Grid item md={7} xs={7}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 500,
                      marginTop: 16,
                      marginLeft: 16,
                    }}
                  >
                    John Smith
                  </p>
                  <p className={classes.grayText}>Jhonsmith21@gmail.com</p>
                  <p className={classes.grayText}>616-555-5555</p>
                  <p className={classes.grayText}>Stacked Sports</p>
                </Grid>
                <Grid item md={5} xs={5}>
                  <Grid container direction="row" justify="flex-end">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 20,
                          marginRight: 16,
                        }}
                      ></img>
                    ) : (
                      <img
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 60,
                          marginRight: 16,
                        }}
                        src={AvatarImg}
                      ></img>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  style={{
                    borderTop: "1px solid #f5f5f5",
                    marginTop: 16,
                    borderRadius: 4,
                    paddingTop: 16,
                  }}
                >
                  <Grid item md={6} xs={6}>
                    <p
                      onClick={() => {
                        document.getElementById("editImage").click();
                      }}
                      style={{
                        color: "#3871DA",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Upload Picture
                    </p>
                  </Grid>{" "}
                  <Grid item md={6} xs={6}>
                    <p
                      onClick={() => {
                        //   document.getElementById("editImage").click();
                      }}
                      style={{
                        color: "#a4abb2",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Remove Picture
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={7} xs={7}>
              <Grid
                container
                direction="row"
                style={{
                  border: "1px solid #f5f5f5",
                  marginTop: 16,
                  borderRadius: 4,
                  paddingTop: 16,
                }}
              >
                <Grid
                  container
                  direction="row"
                  style={{
                    borderBottom: "1px solid #f5f5f5",
                    borderRadius: 4,
                  }}
                >
                  <p
                    style={{
                      cursor: "pointer",
                      marginLeft: 16,
                      width: "30%",
                      color: "#515256",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    User Info
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      marginLeft: 16,
                      width: "60%",
                      color: "#8795a3",
                    }}
                  >
                    Your profile information can be edited below
                  </p>
                </Grid>
                <Grid container direction="row" style={{ padding: 16 }}>
                  <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="center">
                      <TextField
                        variant="outlined"
                        label="First Name"
                        style={{ width: "95%" }}
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("First Name");
                        }}
                      ></TextField>
                      <p
                        style={{
                          color:
                            activeFocus === "First Name"
                              ? "#3871DA"
                              : "#9ca4ab",
                          width: "95%",
                        }}
                      >
                        First Name
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="center">
                      <TextField
                        variant="outlined"
                        label="Last Name"
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("Last Name");
                        }}
                        style={{ width: "95%" }}
                      ></TextField>
                      <p
                        style={{
                          color:
                            activeFocus === "Last Name" ? "#3871DA" : "#9ca4ab",
                          width: "95%",
                        }}
                      >
                        Last Name
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="center">
                      <TextField
                        variant="outlined"
                        label="Email"
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("Email");
                        }}
                        style={{ width: "95%" }}
                      ></TextField>
                      <p
                        style={{
                          color:
                            activeFocus === "Email" ? "#3871DA" : "#9ca4ab",
                          width: "95%",
                        }}
                      >
                        Email
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="center">
                      <TextField
                        variant="outlined"
                        label="Phone Number"
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("Phone Number");
                        }}
                        value={phone}
                        onChange={(e) =>
                          setPhone(formatPhoneNumber(e.target.value))
                        }
                        style={{ width: "95%" }}
                      ></TextField>
                      <p
                        style={{
                          color:
                            activeFocus === "Phone Number"
                              ? "#3871DA"
                              : "#9ca4ab",
                          width: "95%",
                        }}
                      >
                        Phone Number
                      </p>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="center">
                      <TextField
                        variant="outlined"
                        label="Organization"
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("Organization");
                        }}
                        style={{ width: "95%" }}
                      ></TextField>
                      <p
                        style={{
                          color:
                            activeFocus === "Organization"
                              ? "#3871DA"
                              : "#9ca4ab",
                          width: "95%",
                        }}
                      >
                        Organization
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : activeTab === "Account" ? (
          <Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                borderRadius: 4,
                marginTop: 16,
              }}
            >
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: 16,
                  width: "30%",
                  color: "#515256",
                  fontSize: 24,
                  fontWeight: 500,
                }}
              >
                Communication Channels
              </p>
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: 16,
                  width: "60%",
                  color: "#8795a3",
                }}
              >
                Your profile information can be edited below
              </p>
              <Grid item md={4} xs={4}>
                <SocialMediaCard heading="Twitter Account"></SocialMediaCard>
              </Grid>
              <Grid item md={4} xs={4}>
                <Grid
                  container
                  direction="row"
                  style={{
                    border: "1px solid #f5f5f5",
                    marginTop: 16,
                    borderRadius: 4,
                    paddingTop: 16,
                    marginRight: 16,
                    marginLeft: 16,
                    height: 240,
                  }}
                >
                  <Grid item md={11} xs={11}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 500,
                        marginLeft: 16,
                      }}
                    >
                      SMS/MMS
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: "#a4abb2",
                        cursor: "pointer",
                        marginLeft: 16,
                      }}
                    >
                      Your SMS/MMS number is
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 500,
                        marginLeft: 16,
                      }}
                    >
                      1 (615) - 555 - 5555
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: "#a4abb2",
                        cursor: "pointer",
                        marginLeft: 16,
                      }}
                    >
                      To Associate a difference number to you account contact
                      you account rep
                    </p>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    style={{
                      borderTop: "1px solid #f5f5f5",
                      marginTop: 16,
                      borderRadius: 4,
                      paddingTop: 16,
                    }}
                  >
                    {" "}
                    <Grid item md={6} xs={6}></Grid>{" "}
                    <Grid item md={6} xs={6}>
                      <p
                        onClick={() => {}}
                        style={{
                          color: "#3871DA",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Unlink
                      </p>
                    </Grid>{" "}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} xs={4}></Grid>
              <Grid item md={4} xs={4}>
                <SocialMediaCard
                  heading={"Instagram Account"}
                ></SocialMediaCard>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Notifications></Notifications>
        )}
      </div>
    </div>
  );
}
