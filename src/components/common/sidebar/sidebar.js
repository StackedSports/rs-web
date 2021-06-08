import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebarData";
import SubMenu from "./subMenu";
import { IconContext } from "react-icons/lib";
import DashboardLogo from "../../../images/dashboardLogo.png";
import Upload from "../../../images/Upload.PNG";
import { FiSearch } from "react-icons/fi";
import Logo from "../../../images/logoRight.png";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { BiChat, BiBell } from "react-icons/bi";
import Modal from "../../dashboard/model";
import { GlobalStyle } from "./globalStyle";
import { IoIosMenu } from "react-icons/io";
import {
  Grid,
  Dialog,
  Snackbar,
  makeStyles,
  withStyles,
  Slider,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { InputGroup, FormControl } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import IconTextField from "../../common/Fields/IconTextField";
import { getTags, getTeamContacts } from "../../../ApiHelper";

const Nav = styled.div`
  height: 70px;
  display: flex;
  background: white;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavResponsive = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    height: 70px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  color: #060606;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 71px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;

  @media screen and (min-width: 1000px) {
    left: 0;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Logoimage = styled.img`
  margin: 44px;
  height: 38px;
  width: 176px;
`;

const Button = styled(Link)`
  border-radius: 5px;
  background: #3871da;
  white-space: nowrap;
  padding: 0.5rem;
  width: 219px;
  margin: 2rem;
  box-sizing: border-box;
  font-weight: bold;
  color: white;
  font-size: 14px;
  outtion: all 0.2s ease-in-out;
  @medialine: none;
  border: none;
  height: 40px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  transi screen and (max-width: 1000px) {
    width: 180px;
  }
`;

const LogoContainer = styled.div`
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right-width: 2px;
  border-right-color: #d8d8d8;
  border-right-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #d8d8d8;
  border-bottom-style: solid;
  height: 70px;
`;

const NavLogo = styled.img`
  height: 37px;
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  border: none;
  background: #f5f6f9;
  font-size: 14px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    letter-spacing: 0.43px;
    line-height: 17px;
  }
  width: 80%;
  :focus {
    outline: none;
  }
`;

const FormInputWrap = styled.div`
  padding: 5px;
  padding-right: 0px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  border-color: rgb(117, 117, 117);
  border-width: 1px;
  background: #f5f6f9;
  display: flex;
  width: 600px;
  margin: 2rem;
  height: 40px;
`;

const LeftSectionNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

const NotificationIcon = styled(NotificationsIcon)``;

const HeaderIcons = styled.div`
  display: flex;
`;

const PrettoSlider = withStyles({
  root: {
    // color: "#52af77",
    color: "#5dd44d",
    height: 8,
  },
  thumb: {
    height: 10,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    display: "none",
    marginTop: 2,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 8,
  },
  rail: {
    height: 8,
    borderRadius: 8,
    color: "#dadada",
  },
})(Slider);

const useStyles = makeStyles({
  tags: {
    border: "1px solid #d8d8d8",
    height: 50,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 8,
  },
  dropdownHidden: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: 230,
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    border: "1px solid #d5d5d5",
    borderRadius: 4,
    // padding: 5,
    zIndex: 1,
    maxHeight: 200,
    overflowY: "scroll",
    overflowX: "hidden",
    zIndex: 200000000,
  },
  hoverGrid: {
    height: 50,
    marginLeft: 0,
    // marginTop: -12,
    cursor: "pointer",
    color: "#3871da",
    "&>p": {
      color: "black",
    },
    "&:hover": {
      background: "#3871da",
      color: "white",
      "&>p": {
        color: "white",
      },
    },
  },
  tableP: { margin: 0, marginLeft: 12, fontSize: 16, fontWeight: 600 },
});

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [addMedia, setAddMedia] = useState(false);
  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  const [filter, setFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [placeholderFilter, setPlaceholderFilter] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [teamContacts, setTeamContacts] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [displayOwner, setDisplayOwner] = useState(null);
  const [displayTags, setDisplayTags] = useState(null);
  const [displayPlaceholder, setDisplayPlaceholder] = useState(null);
  const [associatedPeople, setAssociatedPeople] = useState([]);
  const [associatedPeopleIndex, setAssociatedPeopleIndex] = useState([]);
  var [displayAssociate, setDisplayAssociate] = useState(null);
  const [dropFiles, setDropFiles] = useState([]);

  const [searchTags, setSearchTags] = useState("");
  const classes = useStyles();

  const getMyTeamContacts = () => {
    getTeamContacts().then(
      (res) => {
        // console.log("THis is all contacts res", res);
        if (res.statusText === "OK") {
          setTeamContacts(res.data);
        }
      },
      (error) => {}
    );
  };

  const getAllTags = () => {
    getTags().then(
      (res) => {
        // console.log("THis is all tags", res);
        var TAGS = [];
        if (res.statusText === "OK") {
          console.log("These are all tags", res.data);
          setAllTags(res.data);
        }
      },
      (error) => {
        console.log("this is error all tags", error);
      }
    );
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getMyTeamContacts();
      getAllTags();
    } else {
      window.location.href = "/";
    }
  }, []);

  const addDataToFilter = (value, type) => {
    console.log("This is the value", index);
    if (filter.includes(value)) {
      var temp = [];
      filter.map((item) => {
        if (item != value) {
          temp.push(item);
        }
      });
      setFilter(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = filter;
      temp.push(value);
      setFilter(temp);
      setuseLessState(uselessState + 1);
    }
  };

  const addTagToFilter = (value, type) => {
    if (tagFilter.includes(value)) {
      var temp = [];
      tagFilter.map((item) => {
        if (item != value) {
          temp.push(item);
        }
      });
      setTagFilter(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = tagFilter;
      temp.push(value);
      setTagFilter(temp);
      setuseLessState(uselessState + 1);
    }
  };
  console.log("These are associated people", associatedPeople);
  console.log("These are associated people index", associatedPeopleIndex);
  const drop = (ev) => {
    ev.preventDefault();

    var tempFiles = [];
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      tempFiles.push(ev.dataTransfer.files[i]);
    }
    console.log("These aree files ", tempFiles);
    var temp = dropFiles;
    var temp2 = temp.concat(tempFiles);
    setDropFiles(temp2);
  };

  const addPlaceholderToFilter = (value, type) => {
    if (placeholderFilter.includes(value)) {
      var temp = [];
      placeholderFilter.map((item) => {
        if (item != value) {
          temp.push(item);
        }
      });
      setPlaceholderFilter(temp);
      setuseLessState(uselessState + 1);
    } else {
      var temp = placeholderFilter;
      temp.push(value);
      setPlaceholderFilter(temp);
      setuseLessState(uselessState + 1);
    }
  };

  const associateContactToMedia = (value, index) => {
    console.log("This is the contact", value, index);
    if (associatedPeople.includes(value)) {
      var temp = [];
      var tempIndex = [];
      associatedPeople.map((item) => {
        if (item != value) {
          temp.push(item);
        }
      });
      associatedPeopleIndex.map((item) => {
        if (item != index) {
          tempIndex.push(item);
        }
      });
      console.log("This is the contact temp", temp, tempIndex);
      setAssociatedPeople(temp);
      setAssociatedPeopleIndex(tempIndex);
      setuseLessState(uselessState + 1);
    } else {
      var temp = associatedPeople;
      var tempIndex = associatedPeopleIndex;
      temp.push(value);
      tempIndex.push(index);
      setAssociatedPeople(temp);
      setAssociatedPeopleIndex(tempIndex);
      setuseLessState(uselessState + 1);
    }
    setuseLessState(uselessState + 1);
    console.log("This is the contact", associatedPeople, associatedPeopleIndex);

    // console.log("thse are associated people", associatedPeople);
    // console.log("This is associated people index", associatedPeopleIndex);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const setOpen = (a) => {
    setShowModal(a);
  };

  const showSidebar = () => setSidebar(!sidebar);

  console.log("This is props contacts", props.contacts);
  return (
    <>
      <Modal open={showModal} setShowModal={setShowModal} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnakBar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Contact Profile Created{" "}
          <span style={{ textDecoration: "underline" }}>view profile</span>
        </Alert>
      </Snackbar>

      <Dialog
        maxWidth={"md"}
        width={"md"}
        open={addContact}
        onClose={() => {
          setAddContact(false);
        }}
      >
        <Grid container direction="row" style={{ width: 650, padding: 20 }}>
          <PermIdentityIcon style={{ color: "#3871da" }}></PermIdentityIcon>
          <p style={{ width: "90%", fontWeight: 700, marginLeft: 5 }}>
            New Contact Profile
          </p>
          <Grid item md={6} xs={6}>
            <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
              First Name
            </p>
            <InputGroup className="mb-3">
              {/* <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend> */}
              <FormControl
                placeholder="+ Add Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ height: 60, width: "99%", marginRight: "2%" }}
              />
            </InputGroup>
          </Grid>
          <Grid item md={6} xs={6}>
            <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
              First Name
            </p>
            <InputGroup className="mb-3">
              {/* <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend> */}
              <FormControl
                placeholder="+ Add Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ height: 60, width: "99%" }}
              />
            </InputGroup>
          </Grid>
          <Grid item md={12} xs={12}>
            <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
              Twitter
            </p>
            <InputGroup className="mb-3">
              <InputGroup.Prepend style={{ width: 50 }}>
                <InputGroup.Text id="basic-addon1" style={{ width: 50 }}>
                  {" "}
                  @
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="+ Add Twitter Handle"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ height: 60 }}
              />
            </InputGroup>
          </Grid>
          <Grid item md={12} xs={12}>
            <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
              Phone Number
            </p>
            <InputGroup className="mb-3">
              <InputGroup.Prepend style={{ width: 50 }}>
                <InputGroup.Text id="basic-addon1" style={{ width: 50 }}>
                  +1
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="+ Add Phone Number"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ height: 60 }}
              />
            </InputGroup>
          </Grid>
          <Grid item md={5} xs={5}></Grid>
          <Grid item md={7} xs={7}>
            <Grid container direction="row" justify="flex-end">
              <IconTextField
                width={150}
                onClick={() => {
                  setAddContact(false);
                }}
                text="Cancel"
                textColor={"#3871da"}
                // border
                // background={"#3871da"}
              ></IconTextField>
              <IconTextField
                width={160}
                onClick={() => {
                  setAddContact(false);
                  setOpenSnackBar(true);
                }}
                text="Create Profile"
                textColor={"white"}
                background={"#3871da"}
                icon={
                  <PermIdentityIcon
                    style={{ color: "white" }}
                  ></PermIdentityIcon>
                }
              ></IconTextField>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        maxWidth={"lg"}
        width={"lg"}
        scroll={"body"}
        open={addMedia}
        onClose={() => {
          setAddMedia(false);
          // setDisplayOwner(false);
        }}
        onClick={(e) => {
          if (e.target.id != "owner") {
            setDisplayOwner(false);
          }
          if (e.target.id != "tags") {
            setDisplayTags(false);
          }
          if (e.target.id != "placeholder") {
            setDisplayPlaceholder(false);
          }
          if (e.target.id != displayAssociate) {
            console.log("This is id", e.target.id, displayAssociate);
            // alert("This will be null");
            setDisplayAssociate(null);
          }
        }}
      >
        <Grid container direction="row" style={{ width: 800, padding: 20 }}>
          <InsertDriveFileIcon
            style={{ color: "#3871da" }}
          ></InsertDriveFileIcon>
          <p style={{ width: "90%", fontWeight: 700, marginLeft: 5 }}>
            Create Placeholder & upload media
          </p>
          <Grid item md={12} xs={12}>
            <p style={{ color: "#b5bccd", fontSize: 17, fontWeight: 500 }}>
              Owner
            </p>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
            >
              {filter.length != 0 &&
                filter.map((fil, index) => {
                  return (
                    <div
                      container
                      direction="row"
                      alignItems="center"
                      justify="center"
                      className={classes.tags}
                    >
                      <Grid
                        style={{ height: 50 }}
                        container
                        direction="row"
                        alignItems="center"
                      >
                        {fil}
                        <ClearIcon
                          onClick={() => {
                            addDataToFilter(fil);
                          }}
                          style={{
                            color: "red",
                            fontSize: 17,
                            cursor: "pointer",
                          }}
                        ></ClearIcon>{" "}
                      </Grid>
                    </div>
                  );
                })}
              <div class="dropdownMedia">
                <input
                  type="text"
                  style={{
                    height: 60,
                    flex: "auto",
                    border: "none",
                    padding: 16,
                  }}
                  id="owner"
                  onClick={(e) => {
                    console.log("This is ", e.target.id);
                    setDisplayOwner(true);
                  }}
                  placeholder="+ Add Owner"
                ></input>
                <div
                  className={classes.dropdownHidden}
                  style={{
                    display: displayOwner ? "block" : "none",
                  }}
                >
                  {teamContacts &&
                    teamContacts.map((type, index) => {
                      return (
                        <Grid
                          container
                          alignItems="center"
                          style={{
                            height: 60,
                            marginLeft: 0,
                            marginTop: -12,
                            cursor: "pointer",
                          }}
                          className={classes.hoverGrid}
                          onClick={() => {
                            if (type.twitter_profile) {
                              addDataToFilter(type.twitter_profile.screen_name);
                            }
                          }}
                          // className={classes.sendAsP}
                        >
                          <img
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 20,
                              marginLeft: 12,
                            }}
                            src={
                              type.twitter_profile &&
                              type.twitter_profile.profile_image
                            }
                          ></img>

                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              marginLeft: 12,
                            }}
                          >
                            {type.twitter_profile &&
                              type.twitter_profile.screen_name + " "}
                          </p>
                        </Grid>
                      );
                    })}
                </div>{" "}
              </div>
            </Grid>

            {/* <InputGroup className="mb-3">

              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                
              />
            </InputGroup> */}
          </Grid>
          <Grid item md={12} xs={12}>
            <p
              style={{
                color: "#b5bccd",
                fontSize: 17,
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              Tags
            </p>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
            >
              {tagFilter.length != 0 &&
                tagFilter.map((fil, index) => {
                  return (
                    <div
                      container
                      direction="row"
                      alignItems="center"
                      justify="center"
                      className={classes.tags}
                    >
                      <Grid
                        style={{ height: 50 }}
                        container
                        direction="row"
                        alignItems="center"
                      >
                        {fil}
                        <ClearIcon
                          onClick={() => {
                            addTagToFilter(fil);
                          }}
                          style={{
                            color: "red",
                            fontSize: 17,
                            cursor: "pointer",
                          }}
                        ></ClearIcon>{" "}
                      </Grid>
                    </div>
                  );
                })}
              <div class="dropdownMedia">
                <input
                  type="text"
                  style={{
                    height: 60,
                    flex: "auto",
                    border: "none",
                    padding: 16,
                  }}
                  id="tags"
                  onClick={(e) => {
                    console.log("This is ", e.target.id);
                    setDisplayTags(true);
                  }}
                  placeholder="+ Add Tag"
                ></input>
                <div
                  className={classes.dropdownHidden}
                  style={{
                    display: displayTags ? "block" : "none",
                  }}
                >
                  <Grid container direction="row" justify="center">
                    <input
                      type="text"
                      style={{
                        width: "90%",
                        border: "1px solid #ebebeb",
                        borderRadius: 4,
                      }}
                      placeholder="Search Tags"
                      value={searchTags}
                      onChange={(e) => {
                        setSearchTags(e.target.value);
                      }}
                    ></input>
                  </Grid>
                  {allTags &&
                    allTags.map((item, index) => {
                      // console.log("This is item", item);
                      if (searchTags != "") {
                        if (
                          item.name
                            .toLowerCase()
                            .indexOf(searchTags.toLowerCase()) > -1
                        ) {
                          return (
                            <Grid
                              container
                              alignItems="center"
                              style={{
                                height: 50,
                                marginLeft: 0,

                                cursor: "pointer",
                              }}
                              className={classes.hoverGrid}
                              onClick={() => {
                                addTagToFilter(item.name);
                              }}
                              // className={classes.sendAsP}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: 600,
                                  marginLeft: 12,
                                }}
                              >
                                {item.name}
                              </p>
                            </Grid>
                          );
                        }
                      } else {
                        return (
                          <Grid
                            container
                            alignItems="center"
                            style={{
                              height: 50,
                              marginLeft: 0,
                              marginTop: 0,
                              cursor: "pointer",
                            }}
                            className={classes.hoverGrid}
                            onClick={() => {
                              addTagToFilter(item.name);
                            }}
                            // className={classes.sendAsP}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 600,
                                marginLeft: 12,
                              }}
                            >
                              {item.name}
                            </p>
                          </Grid>
                        );
                      }
                    })}
                </div>{" "}
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <p
              style={{
                color: "#b5bccd",
                fontSize: 17,
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              Associate to placeholder or create new
            </p>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ border: "1px solid #b5bccd", borderRadius: 4 }}
            >
              {placeholderFilter.length != 0 &&
                placeholderFilter.map((fil, index) => {
                  return (
                    <div
                      container
                      direction="row"
                      alignItems="center"
                      justify="center"
                      className={classes.tags}
                    >
                      <Grid
                        style={{ height: 50 }}
                        container
                        direction="row"
                        alignItems="center"
                      >
                        {fil}
                        <ClearIcon
                          onClick={() => {
                            addPlaceholderToFilter(fil);
                          }}
                          style={{
                            color: "red",
                            fontSize: 17,
                            cursor: "pointer",
                          }}
                        ></ClearIcon>{" "}
                      </Grid>
                    </div>
                  );
                })}
              <div class="dropdownMedia">
                <input
                  type="text"
                  style={{
                    height: 60,
                    flex: "auto",
                    border: "none",
                    padding: 16,
                  }}
                  id="placeholder"
                  onClick={(e) => {
                    setDisplayPlaceholder(true);
                  }}
                  placeholder="+ Add Media placeholder or personalized graphics"
                ></input>
                <div
                  className={classes.dropdownHidden}
                  style={{
                    display: displayPlaceholder ? "block" : "none",
                  }}
                >
                  {allTags &&
                    allTags.map((type, index) => {
                      return (
                        <Grid
                          container
                          alignItems="center"
                          style={{
                            height: 50,
                            marginLeft: 0,
                            marginTop: -12,
                            cursor: "pointer",
                          }}
                          className={classes.hoverGrid}
                          onClick={() => {
                            addPlaceholderToFilter(type.name);
                          }}
                          // className={classes.sendAsP}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              marginLeft: 12,
                            }}
                          >
                            {type.name}
                          </p>
                        </Grid>
                      );
                    })}
                </div>{" "}
              </div>
            </Grid>
          </Grid>
          {dropFiles.length < 1 ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{
                height: "max-content",
                background: "#fafcfd",
                marginTop: 16,
                marginBottom: 16,
                borderRadius: 4,
                border: "1px dotted gray",
                padding: 16,
              }}
              onDragOver={(e) => {
                e.preventDefault();
                // alert("This is alert");
                console.log("This is great");
              }}
              onDrop={drop}
            >
              <img src={Upload}></img>
              <p
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#a2acc1",
                  margin: 0,
                }}
              >
                Upload Your Document
              </p>
              <p
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#a2acc1",
                  margin: 0,
                }}
              >
                Drag and Drop or{" "}
                <span style={{ color: "#6aa8f4" }}>Browse</span> your file here
              </p>
            </Grid>
          ) : (
            <div
              style={{
                marginTop: 16,
                marginBottom: 64,
                width: "100%",
                border: "1px solid #dbe2ed",
                borderRadius: 4,
              }}
            >
              <Grid
                container
                style={{
                  background: "#f6f8fa",
                  height: 50,
                }}
                alignItems="center"
              >
                <Grid item md={4}>
                  <Grid container direction="row">
                    <p className={classes.tableP}> File Name</p>
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <Grid container direction="row"></Grid>
                  <p className={classes.tableP}>Associated</p>
                </Grid>
                <Grid item md={4}>
                  <Grid container direction="row"></Grid>
                  <p className={classes.tableP}>Upload Progress</p>
                </Grid>
              </Grid>
              {dropFiles.map((item, index) => {
                return (
                  <Grid container style={{ height: 60 }} alignItems="center">
                    <Grid item md={4}>
                      <p className={classes.tableP}> {item.name}</p>
                    </Grid>
                    <Grid item md={4}>
                      {associatedPeopleIndex.includes(index) === false ? (
                        <div class="dropdownMedia">
                          <input
                            type="text"
                            style={{
                              height: 40,
                              flex: "auto",
                              border: "none",
                              padding: 16,
                            }}
                            id={"associate" + item.name}
                            onClick={(e) => {
                              e.preventDefault();
                              setDisplayAssociate(e.target.id);
                              displayAssociate = e.target.id;
                              console.log("This is id down", displayAssociate);
                            }}
                            placeholder="+ Associate Contact"
                          ></input>
                          <div
                            className={classes.dropdownHidden}
                            style={{
                              display:
                                displayAssociate === "associate" + item.name
                                  ? "block"
                                  : "none",
                              maxHeight: 120,
                            }}
                          >
                            {teamContacts &&
                              teamContacts.map((type) => {
                                return (
                                  <Grid
                                    container
                                    alignItems="center"
                                    style={{
                                      height: 50,
                                      marginLeft: 0,
                                      marginTop: -12,
                                      cursor: "pointer",
                                    }}
                                    className={classes.hoverGrid}
                                    onClick={() => {
                                      // addPlaceholderToFilter(type.name);
                                      console.log("This is great", type);
                                      if (associatedPeople.includes(type.id)) {
                                        alert(
                                          "This id is already associated to other user!"
                                        );
                                      } else {
                                        associateContactToMedia(type.id, index);
                                      }

                                      // if (type.twitter_profile) {
                                      //   // setAssociatedPeople(
                                      //   //   type.twitter_profile.screen_name
                                      //   // );
                                      //   // setAssociatedPeopleIndex(index);
                                      //
                                      // }
                                    }}
                                    // className={classes.sendAsP}
                                  >
                                    <img
                                      style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 20,
                                        marginLeft: 12,
                                      }}
                                      src={
                                        type.twitter_profile &&
                                        type.twitter_profile.profile_image
                                      }
                                    ></img>

                                    <p
                                      style={{
                                        margin: 0,
                                        fontWeight: 600,
                                        marginLeft: 12,
                                      }}
                                    >
                                      {type.twitter_profile &&
                                        type.twitter_profile.screen_name + " "}
                                    </p>
                                  </Grid>
                                );
                              })}
                          </div>{" "}
                        </div>
                      ) : (
                        <div
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.tags}
                        >
                          <Grid
                            style={{ height: 50 }}
                            container
                            direction="row"
                            alignItems="center"
                          >
                            {/* {fil} */}
                            {associatedPeople[index]}
                            <ClearIcon
                              onClick={() => {
                                associateContactToMedia(
                                  associatedPeople[index],
                                  index
                                );
                              }}
                              style={{
                                color: "red",
                                fontSize: 17,
                                cursor: "pointer",
                              }}
                            ></ClearIcon>{" "}
                          </Grid>
                        </div>
                      )}
                    </Grid>
                    <Grid item md={4}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{ height: 40 }}
                      >
                        <PrettoSlider
                          value={5}
                          max={10}
                          style={{ width: "60%" }}
                        ></PrettoSlider>
                        <p
                          style={{
                            margin: 0,
                            marginRight: 15,
                            marginLeft: 15,
                            color: "#b5bccd",
                          }}
                        >
                          100%
                        </p>
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          )}
          <Grid item md={5} xs={5}></Grid>
          <Grid item md={7} xs={7}>
            <Grid container direction="row" justify="flex-end">
              <IconTextField
                width={150}
                onClick={() => {
                  setAddContact(false);
                }}
                text="Create Profile"
                textColor={"#3871da"}
                // border
                // background={"#3871da"}
              ></IconTextField>
              <IconTextField
                width={120}
                onClick={() => {
                  setAddContact(false);
                  setOpenSnackBar(true);
                }}
                text="Upload"
                textColor={"white"}
                background={"#3871da"}
                icon={
                  <CloudUploadIcon style={{ color: "white" }}></CloudUploadIcon>
                }
              ></IconTextField>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <IconContext.Provider value={{ color: "#fff" }}>
        <NavResponsive>
          <IoIosMenu
            style={{ color: "#222222", margin: "2rem" }}
            size={30}
            onClick={showSidebar}
          />

          <LeftSectionNav>
            <BiBell
              style={{
                color: "#999898",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24.2px",
                width: "21.2px",
              }}
            />
            <BiChat
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24px",
                width: "25px",
              }}
            />
          </LeftSectionNav>
        </NavResponsive>
        <Nav>
          {props.contacts === true || props.media == true ? (
            <LogoContainer style={{ width: 60 }}>
              <NavLogo src={DashboardLogo} style={{ width: 50 }} />
            </LogoContainer>
          ) : (
            <LogoContainer>
              <NavLogo src={DashboardLogo} />
            </LogoContainer>
          )}
          {props.contacts === true ? (
            <Button onClick={setAddContact}>+ Add Contact</Button>
          ) : (
            <div></div>
          )}

          {props.media === true ? (
            <Button onClick={setAddMedia}>+ Add Media</Button>
          ) : (
            <div></div>
          )}

          <FormInputWrap>
            <FiSearch
              style={{
                color: "#999898",
                marginRight: "5px",
                marginLeft: "5px",
                height: "26px",
                width: "30px",
              }}
            />
            <FormInput
              type="email"
              placeholder="Search for contacts by name, phone number, Twitter Handle or School"
            ></FormInput>
          </FormInputWrap>
          <LeftSectionNav>
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <BiBell
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24.2px",
                width: "21.2px",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <BiChat
              style={{
                color: "#222222",
                marginRight: "15px",
                marginLeft: "15px",
                height: "24px",
                width: "25px",
              }}
            />
            <div
              style={{
                height: "70px",
                width: "2px",
                background: "#d8d8d8",
              }}
            ></div>
            <Logoimage src={Logo}></Logoimage>
          </LeftSectionNav>
        </Nav>
        <SidebarNav
          sidebar={sidebar}
          style={{ width: props.contacts || props.media ? 60 : 250 }}
        >
          <Grid container direction="column">
            <SidebarWrap style={{ position: "relative", zIndex: 12 }}>
              {props.contacts === true || props.media === true ? (
                <div></div>
              ) : (
                <Button onClick={openModal}>+ New</Button>
              )}

              {SidebarData.map((item, index) => {
                return (
                  <SubMenu
                    contacts={props.contacts || props.media}
                    item={item}
                    key={index}
                  />
                );
              })}
            </SidebarWrap>
            <div
              style={{
                height: "100%",
                position: "absolute",
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                style={{
                  padding: 20,
                  paddingTop: 0,

                  height: "90%",
                }}
              >
                <Grid item md={4} xs={4} lg={4}>
                  <Grid container direction="row" justify="center">
                    <img
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      src={
                        JSON.parse(localStorage.getItem("user")).twitter_profile
                          .profile_image
                      }
                    ></img>
                  </Grid>
                </Grid>
                <Grid item md={8} xs={8} lg={8}>
                  {props.contacts === true || props.media === true ? (
                    <div></div>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ height: "100%" }}
                    >
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {JSON.parse(localStorage.getItem("user")).first_name +
                          " " +
                          JSON.parse(localStorage.getItem("user")).last_name}
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
