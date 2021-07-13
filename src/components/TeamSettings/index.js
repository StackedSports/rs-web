import React, { useState, useEffect } from "react";
import HollowWhiteButton from "../common/Buttons/HollowWhiteButton";
import {
  Grid,
  makeStyles,
  TextField,
  Checkbox,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AvatarImg from "../../images/avatar.png";
import Avatar from "../../images/avatar.jpeg";
import { formatPhoneNumber } from "../Functions";
import IconTextField from "../common/Fields/IconTextField";
import { Twitter, Videocam } from "@material-ui/icons";
import { DarkContainer } from "../common/Elements/Elements";
import { getTeamContacts } from "../../ApiHelper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LockIcon from "@material-ui/icons/Lock";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { FaMagic } from "react-icons/fa";
import moment from "moment";

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
  const [contacts, setContacts] = useState(null);
  const [copyContacts, setCopyContacts] = useState(null);
  const [uselessState, setuseLessState] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState([]);

  const [activeTab, setActiveTab] = useState("General");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getMyContacts();
    } else {
      window.location.href = "/";
    }
  }, []);

  const makeCheckBoxSelected = (index) => {
    if (selectedCheckBoxes.indexOf(index) > -1) {
      var temp = [];
      selectedCheckBoxes.map((item) => {
        if (index != item) {
          temp.push(item);
        }
      });
      console.log("This is temp", temp);
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = selectedCheckBoxes;
      temp.push(index);
      setSelectedCheckboxes(temp);
      setuseLessState(uselessState + 1);
    }
    // console.log("THis is selected Checkbox", selectedCheckBoxes);
  };

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

  const Profile = () => {
    return (
      <Grid container direction="row">
        <Grid
          container
          alignItems="center"
          style={{
            cursor: "pointer",
            fontSize: 22,
            fontWeight: 600,
            marginTop: 16,
          }}
          onClick={() => {
            setActiveTab("Team");
          }}
        >
          <ArrowBackIcon></ArrowBackIcon> Back to team
        </Grid>
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
                  Replace Picture
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
          <Grid
            container
            direction="row"
            style={{
              border: "1px solid #f5f5f5",
              marginTop: 16,
              borderRadius: 4,
              paddingTop: 16,
              marginRight: 16,
              // marginLeft: 16,
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
                To Associate a difference number to you account contact you
                account rep
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
                  fontWeight: 600,
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
                        activeFocus === "First Name" ? "#3871DA" : "#9ca4ab",
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
                      color: activeFocus === "Email" ? "#3871DA" : "#9ca4ab",
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
                        activeFocus === "Phone Number" ? "#3871DA" : "#9ca4ab",
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
                        activeFocus === "Organization" ? "#3871DA" : "#9ca4ab",
                      width: "95%",
                    }}
                  >
                    Organization
                  </p>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="center">
                  <Autocomplete
                    options={[{ title: "Admin" }, { title: "Member" }]}
                    // style={{ width: "95%" }}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, values) => {}}
                    style={{
                      // width: 300,
                      // marginLeft: 20,
                      // marginTop: 20,
                      // marginBottom: 20
                      border: "none",
                      width: "95%",
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        onMouseLeave={() => {
                          setActiveFocus("");
                        }}
                        onMouseEnter={() => {
                          setActiveFocus("User Type");
                        }}
                        label={"User Type"}
                        {...params}
                      />
                    )}
                  />
                  <p
                    style={{
                      color:
                        activeFocus === "User Type" ? "#3871DA" : "#9ca4ab",
                      width: "95%",
                    }}
                  >
                    User Type
                  </p>
                </Grid>
              </Grid>
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: 16,
                  width: "100%",
                  color: "#515256",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                User Info
              </p>
              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="center">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    }
                    value={"@jhonsmith12"}
                    labelWidth={"95%"}
                    style={{
                      width: "95%",
                    }}
                  />{" "}
                  <p
                    style={{
                      color:
                        activeFocus === "Organization" ? "#3871DA" : "#9ca4ab",
                      width: "95%",
                    }}
                  >
                    Twitter Account
                  </p>
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="center">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    }
                    labelWidth={"95%"}
                    value={"@jhonsmith12"}
                    style={{
                      width: "95%",
                    }}
                  />{" "}
                  <p
                    style={{
                      color:
                        activeFocus === "Organization" ? "#3871DA" : "#9ca4ab",
                      width: "95%",
                    }}
                  >
                    Instagram Account
                  </p>
                </Grid>
              </Grid>

              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="center"></Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <Grid container direction="row" justify="flex-end">
                  <IconTextField
                    text="Remove User"
                    textColor={"white"}
                    background={"#c3230f"}
                    width={160}
                    iconStart={
                      <DeleteIcon
                        style={{
                          color: "white",
                        }}
                      ></DeleteIcon>
                    }
                  ></IconTextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getMyContacts = (page) => {
    console.log("This is the date", page);
    // || "2020-12-13"
    getTeamContacts(page).then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          if (page > 1) {
            var temp = contacts;
            temp = temp.concat(res.data);
            // temp.push(res.data);
            setContacts(temp);
            setCopyContacts(temp);
            setuseLessState(uselessState + 1);
            console.log("These are all new contacts", temp);
            // document.getElementById("infinit").scrollTop = 0;
            setFetching(false);
          } else {
            console.log("These are all contacts", res.data);
            setContacts(res.data);
            setCopyContacts(res.data);
            // document.getElementById("infinit").scrollTop = 0;
            // setFetching(false);
          }
        }
      },
      (error) => {
        // getMyContacts(1);
        document.getElementById("infinit").scrollTop = 0;
        setPage(1);
        console.log("this is error all contacts", error);
      }
    );
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <DarkContainer contacts style={{ padding: 16, marginLeft: 270 }}>
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
            paddingTop: 32,
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
                      activeTab === "General" ? "3px solid #3871DA" : "none",
                  }}
                  className={classes.tab}
                  onClick={() => {
                    setActiveTab("General");
                  }}
                >
                  General
                </p>
                <p
                  style={{
                    borderBottom:
                      activeTab === "Team" ? "3px solid #3871DA" : "none",
                  }}
                  className={classes.tab}
                  onClick={() => {
                    setActiveTab("Team");
                  }}
                >
                  Team
                </p>
                <p
                  style={{
                    borderBottom:
                      activeTab === "Settings" ? "3px solid #3871DA" : "none",
                  }}
                  className={classes.tab}
                  onClick={() => {
                    setActiveTab("Settings");
                  }}
                >
                  Settings
                </p>
              </Grid>
            </Grid>
            <Grid item md={6} sm={6}>
              {activeTab === "General" ? (
                <Grid container direction="row" justify="flex-end">
                  <HollowWhiteButton
                    onClick={() => {
                      if (props.setShowSetting) {
                        props.setShowSetting(false);
                      }
                    }}
                    width={120}
                    marginTop={-16}
                    text="Save Settings"
                    textColor="white"
                    background="#3871DA"
                  ></HollowWhiteButton>
                </Grid>
              ) : (
                <Grid container direction="row" justify="flex-end">
                  <IconTextField
                    // width={180}
                    width={100}
                    text="Action"
                    marginTop={-16}
                    textColor="gray"
                    icon={<FaMagic style={{ color: "#3871DA" }}></FaMagic>}
                  ></IconTextField>
                  <HollowWhiteButton
                    onClick={() => {
                      if (props.setShowSetting) {
                        props.setShowSetting(false);
                      }
                    }}
                    width={140}
                    marginTop={-16}
                    text="+ Add Member"
                    textColor="white"
                    background="#3871DA"
                  ></HollowWhiteButton>
                </Grid>
              )}
            </Grid>
          </Grid>
          {activeTab === "Profile" ? (
            <Profile></Profile>
          ) : activeTab === "General" ? (
            <Grid container direction="row">
              <Grid item md={7} xs={7} style={{ paddingRight: 16 }}>
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

                        width: "30%",
                        color: "#515256",
                        fontSize: 18,
                        fontWeight: 600,
                        marginLeft: 16,
                      }}
                    >
                      Organization Info
                    </p>
                    <p
                      style={{
                        cursor: "pointer",
                        marginLeft: 16,
                        fontWeight: 500,
                        width: "60%",
                        color: "#8795a3",
                      }}
                    >
                      Your oganization information can be edited below
                    </p>
                  </Grid>
                  <Grid container direction="row" style={{ padding: 16 }}>
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="Organization"
                          style={{ width: "95%" }}
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("Organization");
                          }}
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
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="Team Name"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("Team Name");
                          }}
                          style={{ width: "95%" }}
                        ></TextField>
                        <p
                          style={{
                            color:
                              activeFocus === "Team Name"
                                ? "#3871DA"
                                : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          Team Name
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="Address"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("Address");
                          }}
                          style={{ width: "95%" }}
                        ></TextField>
                        <p
                          style={{
                            color:
                              activeFocus === "Address" ? "#3871DA" : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          Address
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="City"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("City");
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
                              activeFocus === "City" ? "#3871DA" : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          City
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="State"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("State");
                          }}
                          style={{ width: "95%" }}
                        ></TextField>
                        <p
                          style={{
                            color:
                              activeFocus === "State" ? "#3871DA" : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          State
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Grid container direction="row" justify="center">
                        <TextField
                          variant="outlined"
                          label="Zip Code"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("Zip Code");
                          }}
                          style={{ width: "95%" }}
                        ></TextField>
                        <p
                          style={{
                            color:
                              activeFocus === "Zip Code"
                                ? "#3871DA"
                                : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          Zip Code
                        </p>
                      </Grid>
                    </Grid>

                    <p
                      style={{
                        cursor: "pointer",
                        marginLeft: 16,
                        width: "100%",
                        color: "#515256",
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Primary Contact Info
                    </p>
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
                          label="Phone"
                          onMouseLeave={() => {
                            setActiveFocus("");
                          }}
                          onMouseEnter={() => {
                            setActiveFocus("Phone");
                          }}
                          style={{ width: "95%" }}
                        ></TextField>
                        <p
                          style={{
                            color:
                              activeFocus === "Phone" ? "#3871DA" : "#9ca4ab",
                            width: "95%",
                          }}
                        >
                          Phone
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={5} xs={5}>
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
            </Grid>
          ) : (
            <div style={{ width: "100%", overflowX: "scroll", marginTop: 10 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                style={{
                  background: "#f5f6f9",
                  width: "100%",
                  minWidth: 1410,
                }}
              >
                <Grid item md={1} xs={1}>
                  <Checkbox
                    checked={selectAll}
                    onChange={() => {
                      if (selectAll === false) {
                        setSelectAll(true);
                        contacts &&
                          contacts.map((item) => {
                            makeCheckBoxSelected(item.id);
                          });
                      } else {
                        setSelectAll(false);
                        setSelectedCheckboxes([]);
                      }
                    }}
                    color="primary"
                  ></Checkbox>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>First Name</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>Last Name</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>Role</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>Status</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>Linked Twitter</span>
                </Grid>
                <Grid item md={1} xs={1}>
                  <span className={classes.tableHeading}>Twitter Inbox</span>
                </Grid>
                <Grid item md={2} xs={2}>
                  <span
                    className={classes.tableHeading}
                    // style={{ marginLeft: 40 }}
                  >
                    Phone Number
                  </span>
                </Grid>
                <Grid item md={2} xs={2}>
                  <span
                    className={classes.tableHeading}
                    // style={{ marginLeft: 40 }}
                  >
                    Sms Phone
                  </span>
                </Grid>
              </Grid>

              <div
                style={{ width: "100%", maxHeight: 330, minWidth: 1410 }}
                className="fullHeightContacts"
                id="infinit"
                // onScroll={() => {
                //   handleScroll();
                // }}
              >
                {contacts ? (
                  contacts.map((item, index) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{
                          border: "1px solid #d8d8d8",
                          borderBottom: "none",
                          borderRadius: 4,
                          paddingTop: 4,
                          paddingBottom: 4,
                          minWidth: 1410,
                        }}
                      >
                        <Grid item md={1} xs={1}>
                          {hoveredIndex === index ? (
                            <Checkbox
                              color="primary"
                              onChange={() => {
                                makeCheckBoxSelected(item.id);
                              }}
                              style={{ marginTop: 1, marginBottom: 1 }}
                              onMouseLeave={() => {
                                setHoveredIndex(null);
                              }}
                            ></Checkbox>
                          ) : selectedCheckBoxes.indexOf(item.id) > -1 ? (
                            <Checkbox
                              color="primary"
                              checked={true}
                              onChange={() => {
                                makeCheckBoxSelected(item.id);
                              }}
                              style={{ marginTop: 1, marginBottom: 1 }}
                              onMouseLeave={() => {
                                setHoveredIndex(null);
                              }}
                            ></Checkbox>
                          ) : (
                            <img
                              onMouseEnter={() => {
                                setHoveredIndex(index);
                              }}
                              src={
                                item.twitter_profile &&
                                item.twitter_profile.profile_image
                                  ? item.twitter_profile.profile_image
                                  : AvatarImg
                              }
                              style={{
                                width: 35,
                                height: 35,
                                borderRadius: "50%",
                                marginLeft: 5,
                                marginTop: 5,
                                marginBottom: 5,
                              }}
                            ></img>
                          )}
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.first_name}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.last_name}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.role}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.status}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          <span className={classes.tableFields}>
                            {item.twitter_profile &&
                            item.twitter_profile.screen_name
                              ? "@" + item.twitter_profile.screen_name
                              : ""}
                          </span>
                        </Grid>
                        <Grid item md={1} xs={1}>
                          {/* <span className={classes.tableFields}>
                            {item.twitter_profile &&
                            item.twitter_profile.screen_name
                              ? "@" + item.twitter_profile.screen_name
                              : ""}
                          </span> */}
                          <Grid container direction="row" justify="center">
                            <CheckCircleIcon
                              style={{ color: "#006644", fontSize: 16 }}
                            ></CheckCircleIcon>
                          </Grid>
                        </Grid>
                        <Grid item md={2} xs={2}>
                          <span className={classes.tableFields}>
                            {item.phone}
                          </span>
                        </Grid>
                        <Grid item md={2} xs={2}>
                          <span className={classes.tableFields}>
                            {formatPhoneNumber(item.sms_number)}
                          </span>
                        </Grid>
                        <span
                          style={{
                            color: "#3871da",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setActiveTab("Profile");
                          }}
                        >
                          Edit
                        </span>
                      </Grid>
                    );
                  })
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ marginTop: 50 }}
                  >
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </Grid>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DarkContainer>
  );
}
