import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./sidebarData";
import SubMenu from "./subMenu";
import { IconContext } from "react-icons/lib";
import DashboardLogo from "../../../images/dashboardLogo.png";
import StarLogo from "../../../images/star.PNG";
import Upload from "../../../images/Upload.PNG";
import { FiSearch } from "react-icons/fi";
import Logo from "../../../images/logoRight.png";
import SelectSearch from "react-select-search";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"; // ----
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
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
  Backdrop,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import {
  NoteAdd,
  Description,
  Backup,
  LocalOfferOutlined,
} from "@material-ui/icons";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Alert from '@mui/material/Alert';
import { InputGroup, FormControl } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear"; // ----
import IconTextField from "../../common/Fields/IconTextField";
import {Button as MuiButton } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { 
  getTags,
  getTeamContacts, 
  getPlaceholder, 
  getAllContacts2,
  getSearchedContacts,
  addTag,
  getAssociatedContactByFileName,
  uploadMedia,
  addTagToMedia
} from "../../../ApiHelper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  MediaUploadHeader,
  MediaUploadItem,
  MediaTableItemLoading,
  MediaUploadStatus
} from 'UI/Tables/MediaUpload/MediaUploadTable'

import SearchableOptions, {
  // SearchableOptions,
  SearchableOptionDropdown,
  SearchableOptionListItem
} from 'UI/Forms/Inputs/SearchableOptions'

import MediaInputTitle from 'UI/Forms/Inputs/MediaInputTitle'

import useAlerts from 'Hooks/AlertHooks'

import { useUser } from 'Api/Hooks'

const options = [
  {
    type: "group",
    name: "Contact",
    items: [{ name: "03053888102", value: "03053888102" }],
  },
  {
    type: "group",
    name: "Media Team",
    items: [{ name: "Ben Team", value: "Ben Team" }],
  },
  {
    type: "group",
    name: "Users",
    items: [{ name: "John", value: "John" }],
  },
  {
    type: "group",
    name: "Settings",
    items: [{ name: "User Name", value: "user" }],
  },
  {
    type: "group",
    name: "Chats",
    items: [{ name: "This is", value: "This is" }],
  },
  {
    type: "group",
    name: "Clear Search",
    items: [{ name: "", value: "" }],
  },
];
const Nav = styled.div`
  height: 70px;
  display: flex;
  background: white;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 11;
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
  sTags: {
    border: "1px solid #d8d8d8",
    height: 50,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
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
  uploadCSVSpan: { color: "#989482", marginLeft: 8, marginRight: 16 },
  uploadCSVGrid: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #989482",
    color: "#989482",
  },
  CSVDetails: {
    color: "#62614e",
    width: "70%",
    textAlign: "justify",
    fontWeight: 600,
    fontSize: 13,
    marginTop: 10,
  },
  uploadCSVGridActive: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #3871da",
    background: "#3871da",
    color: "white",
  },

  uploadCSVGridDone: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #3871da",
    background: "#006644",
    color: "white",
  },

  deleteForverIcon: {
    "&:hover": {
      cursor: "pointer"
    },
  }
});

const dummyFiles = [
  // {
  //   name: "file1.png"
  // },
  // {
  //   name: "test.png"
  // },
  // {
  //   name: "test2.png"
  // },
  // {
  //   name: "test3.png"
  // },
  // {
  //   name: "test4.png"
  // }
]

const dummyAssociatedPeople = [
  // { first_name: "Ben", last_name: "Graves"},
  // null,
  // null,
  // null,
  // null
]

const dummyUploadProgress = [
  // "none",
  // "ready",
  // "uploading",
  // "success",
  // "failed",
  // "failed",
  // "failed",
  // "failed",
  // "failed"   
]

// email: "non.admin@stackedsports.com"
// first_name: "John"
// id: "kXzLvByimLQK"
// last_name: "Henderson"
// phone: "16154825646"
// role: "Admin"
// sms_number: 16152058201
// status: "Active"
// token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwiZW1haWwiOiJub24uYWRtaW5Ac3RhY2tlZHNwb3J0cy5jb20iLCJleHAiOjE2NDgwNDQ0NjV9.94huIU1kn5s2QBsm2PblLH3lab44LOc-_cDzsEUv5BE"
// twitter_profile: {screen_name: 'adamstewps', profile_image: 'https://pbs.twimg.com/profile_images/1090332239542607872/CIunXcpv_normal.jpg'}
// url: "https://api.recruitsuite.co/api/team/members/kXzLvByimLQK.json"

const Sidebar = (props) => {
  let history = useHistory();

  // User
  const user = useUser()

  let teamLogo = DashboardLogo

  if(user && user.team) {
    teamLogo = user.team.org.logo.thumb
    // teamLogo = user.team.org.logo.original
    // teamLogo = user.team.org.logo.medium
    // teamLogo = user.team.org.logo.large
    // console.log("AAAAAAAAAAAAAAAAA")
    // console.log(teamLogo)
  }
  //console.log(user.team.org.logo)

  

  const [sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [addCsv, setAddCsv] = useState(false);
  const [addMedia, setAddMedia] = useState(false);
  const [openSnakBar, setOpenSnackBar] = React.useState(false);
  const [filter, setFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [placeholderFilter, setPlaceholderFilter] = useState([]);
  const [uselessState, setuseLessState] = useState(0);
  const [teamMembers, setTeamMembers] = useState(null);
  const [allTags, setAllTags] = useState(null);
  const [displayOwner, setDisplayOwner] = useState(null);
  const [displayTags, setDisplayTags] = useState(null);
  const [displayPlaceholder, setDisplayPlaceholder] = useState(null);
  const [associatedPeople, setAssociatedPeople] = useState(dummyAssociatedPeople);
  const [associatedPeopleIndex, setAssociatedPeopleIndex] = useState([]);
  const [displayAssociate, setDisplayAssociate] = useState(null);
  const [activeTabCSV, setActiveTabCSV] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTags, setSearchTags] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const classes = useStyles();

	// new media upload
  const [teamContacts, setTeamContacts] = useState([])
	const [allPlaceholders, setAllPlaceholders] = useState([])
	const [owners, setOwners] = useState([])
	const [tagInput, setTagInput] = useState("")
	const [tags, setTags] = useState([])
	const [placeholders, setPlaceholders] = useState([])
	const [placeholderInput, setPlaceholderInput] = useState("")
	const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [searchTeamContact, setSearchTeamContact] = useState("")
  const [uploadStatus, setUploadStatus] = useState(dummyUploadProgress)
  const [uploadingMedia, setUploadingMedia] = useState(false)
  //const [mediaAlert, setMediaAlert] = useState({ message: "", visible: false })

  // Owners
  const [searchedTeamMembers, setSearchedTeamMembers] = useState([])

  // Tags
  const [searchedTags, setSearchedTags] = useState([])

  // Placeholders
  const [searchedPlaceholders, setSearchedPlaceholders] = useState([])

  // Media
  const [dropFiles, setDropFiles] = useState(dummyFiles);
  const contactSearchLast = useRef(0)
  const contactSearchTimeout = useRef(null)

  // Upload Process
  const [uploadStatusCount, setUploadStatusCount] = useState({ success: 13, failed: 5, total: 18 })
  const [uploadFinished, setUploadFinished] = useState(false)
  const [failedUploads, setFailedUploads] = useState([])

  // Alerts
  const [alerts, setAlerts] = useAlerts()

  //console.log("alerts ")
  //console.log(alerts)
	const getTeamMembers = () => {
		getTeamContacts().then(
			(res) => {
				// console.log("THis is all contacts res", res);
				if (res.statusText === "OK") {
					setTeamMembers(res.data);
					console.log("******************") 
					console.log(res)
					console.log("******************") 
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
				console.log("get all tags error: ", error);
			}
		);
	};

  {/*****************************************************************/}
                      {/********************* SIDE PANEL START **************************/}
                      {/*****************************************************************/}

	const getAllPlaceholders = () => {
		getPlaceholder().then(
			(res) => {
				if (res.statusText === "OK") {
					console.log("These are all placeholders", res.data);
					setAllPlaceholders(res.data);
				}
			},
			(error) => {
				console.log("get all placeholders error: ", error)
			}
		)
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			getTeamMembers();
			getAllTags();
			getAllPlaceholders();
		} else {
			window.location.href = "/";
		}
	}, []);

  const addMemberToOwners = member => {
		// add member to owners if it member
		// is not an owner yet

		let duplicate = false

		for(let i in owners) {
			//console.log(owner)
			if(owners[i].id == member.id) {
				duplicate = true
				break
			}
		}

		if(!duplicate) {
			let newOwners = Object.assign([], owners)
			newOwners.push(member)
			// console.log("****************************")
			// console.log(newOwners)
			// console.log("****************************")
			setOwners(newOwners)
		}
  	};

  	const removeMemberFromOwners = member => {
      let newOwners = owners.filter(owner => owner.id !== member.id)
      setOwners(newOwners)
  	}

    const onOwnerInputChange = ownerInput => {
      let searched = []

      teamMembers.forEach(owner => {
        let name = owner.first_name + ' ' + owner.last_name
        if(name.toLowerCase().includes(ownerInput.toLowerCase()))
          searched.push(owner)
      })
  
      setSearchedTeamMembers(searched)
    }



	// Add Tag to Tags list
	const addTagToTags = tag => {
		let duplicate = false

		for(let i in tags) {
			//console.log(owner)
			if(tags[i].id == tag.id) {
				duplicate = true
				break
			}
		}

		if(!duplicate) {
			let newTags = Object.assign([], tags)
			newTags.push(tag)
			// console.log("****************************")
			// console.log(newOwners)
			// console.log("****************************")
			setTags(newTags)
		}
	}

	const removeTagFromTags = tag => {
		let newTags = tags.filter(tg => tg.id !== tag.id)
		setTags(newTags)
  	}

	const onTagInputChange = (tagInput) => {
		// setTagInput(e.target.value)

    let searched = []

    allTags.forEach(tag => {
      if(tag.name.toLowerCase().includes(tagInput.toLowerCase()))
        searched.push(tag)
    })

    setSearchedTags(searched)
	}

	const onTagInputPressEnter = (tagInput) => {
		let newTag = {
      id: "new-" + Date.now(),
      name: tagInput
    }
    addTagToTags(newTag)
    setTagInput("")
	}

	const addPlaceholderToPlaceholders = (placeholder) => {
		let duplicate = false

		for(let i in placeholders) {
			//console.log(owner)
			if(placeholders[i].id == placeholder.id) {
				duplicate = true
				break
			}
		}

		if(!duplicate) {
			let newPlaceholders = Object.assign([], placeholders)
			newPlaceholders.push(placeholder)
			// console.log("****************************")
			// console.log(newOwners)
			// console.log("****************************")
			setPlaceholders(newPlaceholders)
		}
	}

	const removePlaceholderFromPlaceholders = (placeholder) => {
		let newPlaceholders = placeholders.filter(ph => ph.id !== placeholder.id)
		setPlaceholders(newPlaceholders)
	}

	const onPlaceholderInputChange = placeholderInput => {
		// setPlaceholderInput(e.target.value)

    let searched = []

    allPlaceholders.forEach(placeholder => {
      if(placeholder.name.toLowerCase().includes(placeholderInput.toLowerCase()))
        searched.push(placeholder)
    })

    setSearchedPlaceholders(searched)
	}

	const onPlaceholderInputKeyPress = placeholderInput => {
		let newPlaceholder = {
      id: "new-" + Date.now(),
      name: placeholderInput
    }

    addPlaceholderToPlaceholders(newPlaceholder)
	}

  const onContactSearchTermChange = (contactSearchInput) => {
    // const now = Date.now()

    // Clear last timeout
    clearTimeout(contactSearchTimeout.current)

    // Start new timeout
    contactSearchTimeout.current = setTimeout(() => {
      //console.log("this should be seem once")
      getSearchedContacts(contactSearchInput)
        .then((res) => {
          if (res.statusText === "OK") {
            //console.log("These are all team contacts from search ", res.data);
            setTeamContacts(res.data);
          }
        })
        .catch((error) => {
          //console.log("search contacts error " + error)
        })
    }, 200)

    // contactSearchLast.current
    
    
    
  }

  const onSearchTeamContactKeyPress = (e) => {
    // search input change

    // let searched = []

    // allPlaceholders.forEach(placeholder => {
    //   if(placeholder.name.toLowerCase().includes(placeholderInput.toLowerCase()))
    //     searched.push(placeholder)
    // })

    // setSearchedPlaceholders(searched)
    

    // search key enter

    if(e.key === "Enter") {
      
    }
  }

  

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

	
	// console.log("These are associated people", associatedPeople);
	// console.log("These are associated people index", associatedPeopleIndex);

  // let file = {
  //   lastModified: 1640966381181
  //   lastModifiedDate: Fri Dec 31 2021 12:59:41 GMT-0300 (Horário Padrão de Brasília) {}
  //   name: "Beautifying.pptx"
  //   size: 4438537
  //   type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  //   webkitRelativePath: ""
  // }

  const onMediaAlertClose = (index) => {
    setAlerts.remove(index)
  }

  const handleAssociateContactToFile = (files, associated, uploadStatus) => {
    return new Promise((resolve, reject) => {

      let count = files.length

      //console.log("start count " + count)

      files.forEach((file, index) => {
        getAssociatedContactByFileName(file.name)
            .then(contact => {
              associated[index] = contact

              //console.log("return " + index)
              //console.log(associated)
            })
            .catch(error => {
              //console.log("error " + error)
              associated[index] = null

              //console.log(associated)

              if(error === "found multiple contacts") {
                // TODO: alert user that could not auto associate
                // due to search returning multiple contacts
                //console.log("contact " + index + "error 1")

                // using timeout so state can be updated before next setAlerts call
                setTimeout(() => {
                  setAlerts.push("One or more files were not associated to a contact based on their file name because the search for contact returned with multiple contacts")

                }, 200 * index)

                // setMediaAlert({
                //   message: ,
                //   visible: true
                // })
              } else if (error === "could not find contacts") {
                // TODO: alert user that could not auto associate
                // due to search not finding any contacts

                // using timeout so state can be updated before next setAlerts call
                //setTimeout(() => {
                //  setAlerts.push("One or more files were not associated to a contact based on their file name because no contacts were found")

                //}, 50 * index)

                // setMediaAlert({
                //   message: ,
                //   visible: true
                // })
              } else {
                // TODO: handle axios/server error
              }
            })
            .finally(() => {
              uploadStatus[index] = "ready"

              count--

              //console.log("finally " + count)
              //console.log(associated)

              if(count == 0) {
                resolve([files, associated])
              }
            })
      })
    })
  }

  const handleImportFiles = (files) => {
    let tempFiles = []
    let tempAssociated = []
    let tempUploadStatus = []

    let pushedCount = 0

    for (let i = 0; i < files.length; i++) {
      let file = files[i]

      //console.log(file)

      if(((file.type.includes("/jpg") || file.type.includes("/jpeg") || file.type.includes("/png")) && file.size < 5000000)
        || ((file.type.includes("/pdf") || file.type.includes("/mp4")) && file.size < 15000000)) { 
        // 5MB for images and 15MB for videos

        //console.log(file.name + "*")

        tempFiles.push(file)
        tempAssociated.push("loading")
        tempUploadStatus.push("none")
      }
    }

    if(files.length != tempFiles.length) {
      setAlerts.push("One or more files were not added since they do not match the file upload criteria")
      
      // setMediaAlert({
      //   message: ,
      //   visible: true
      // })
    }

    const initialAssociated = Object.assign([], associatedPeople)
    const initialUploadStatus = Object.assign([], uploadStatus)

    handleAssociateContactToFile(tempFiles, tempAssociated, tempUploadStatus)
      .then(() => {
        //console.log("**************************")
        //console.log("result")
        //console.log("**************************")

        //console.log(tempFiles)
        //console.log(tempAssociated)

        setAssociatedPeople(initialAssociated.concat(tempAssociated))
        setUploadStatus(initialUploadStatus.concat(tempUploadStatus))
        // setDropFiles(dropFiles.concat(tempFiles));
      })

    //console.log("Droped files ", tempFiles);
    setAssociatedPeople(associatedPeople.concat(tempAssociated))
    setDropFiles(dropFiles.concat(tempFiles));
    setUploadStatus(uploadStatus.concat(tempUploadStatus))
    // setAssociatedPeople(associated)
    // setDropFiles(tempFiles);
  }

  const handleFileChange = (e) => {
    //console.log(e)
    handleImportFiles(e.target.files)
    return
    // var tempFiles = [];
    // for (var i = 0; i < e.target.files.length; i++) {
    //   tempFiles.push(e.target.files[i]);
    // }
    // console.log("These aree files ", tempFiles);
    // var temp = dropFiles;
    // var temp2 = temp.concat(tempFiles);
    // setDropFiles(temp2);
  }

  const drop = (ev) => {
    ev.preventDefault();
    handleImportFiles(ev.dataTransfer.files)
    // let tempFiles = Object.assign([], dropFiles)
    // let associated = Object.assign([], associatedPeople)
  
  };

  const deleteMedia = (index) => {
    let tempFiles = Object.assign([], dropFiles)
    let tempAssociated = Object.assign([], associatedPeople)
    let tempUploadStatus = Object.assign([], uploadStatus)

    tempFiles.splice(index, 1)
    tempAssociated.splice(index, 1)
    tempUploadStatus.splice(index, 1)

    setDropFiles(tempFiles)
    setAssociatedPeople(tempAssociated)
    setUploadStatus(tempUploadStatus)
  }

  const onUploadMedia = () => {

    if(uploadFinished) {
      // do something else
      close()
      return
    }

    if(dropFiles.length == 0) {
      setAlerts.push("You forgot to import media files to upload")

      // setMediaAlert({
      //   message: "You forgot to import media files to upload",
      //   visible: true
      // })

      return
    }

    // uploadingMedia
    // associatedPeople
    // uploadProgress
    // dropFiles

    // placeholders[0]
    // tags
    // owners[0]

    setUploadingMedia(true)

    let tempUploadStatus = Object.assign([], uploadStatus)

    let count = dropFiles.length

    let failedCount = 0
    let successCount = 0

    dropFiles.forEach((file, index) => {
      let media = {
        file,
        owner: owners[0]?.id.toString(),
        placeholder: placeholders[0]?.id.toString(),
        contact: associatedPeople[index]?.id.toString(),
        tags: tags
      }

      //console.log("upload " + index)
      //console.log(media)     

      //return

      tempUploadStatus[index] = "uploading"
      setUploadStatus(tempUploadStatus)

      // TODO: create new placeholder if placeholders id contains 'new-'

      uploadMedia(media)
        .then(res => {
          //console.log(res)

          let mediaRes = res

          let temp2 = Object.assign([], tempUploadStatus)
          tempUploadStatus[index] = "success"
          temp2[index] = "success"
          setUploadStatus(temp2)
          //console.log(temp2)

          successCount++

          tags.forEach(tag => {
            //if(typeof tag.id == "string" && tag.id.includes("new-")) {
              addTagToMedia(mediaRes.id, tag.name)
                .then(res => {
                  //console.log(res)
                })
                .catch(error => {
                  //console.log(error)
                })
            //}
          })

          // last id 314852
        })
        .catch(error => {
          //console.log(error)

          let temp2 = Object.assign([], tempUploadStatus)
          temp2[index] = "failed"
          tempUploadStatus[index] = "failed"
          setUploadStatus(temp2)
          //console.log(temp2)

          failedCount++

          //tempUploadStatus[index] = "failed"
          //setUploadStatus(tempUploadStatus)
        })
        .finally(() => {
          //setUploadStatus(tempUploadStatus)
          count--

          if(count == 0){
            setUploadingMedia(false)
            onUploadFinished(tempUploadStatus, successCount, failedCount, dropFiles.length)
          }
        })
    })
  }

  const onUploadFinished = (tempUploadStatus, successCount, failedCount, totalCount) => {
    let tmp = []

    tempUploadStatus.forEach((status, index) => {
      if(status === 'failed')
        tmp.push(dropFiles[index])
    })

    setFailedUploads(tmp)
    setUploadStatusCount({ success: successCount, failed: failedCount, total: totalCount })
    setUploadFinished(true)
  }
  

  const onCloseMedia = () => {
    if(!uploadFinished)
      setAddMedia(false)
    
    clearAllFields()
  }

  const close = () => {
    setAddMedia(false)
    clearAllFields()
  }

  const clearAllFields = () => {
    setDropFiles([])
    setAssociatedPeople([])
    setUploadStatus([])
    setOwners([])
    setPlaceholders([])
    setTags([])
    setUploadFinished(false)
  }

  const associateContactToMedia = (teamContact, index) => {
    // console.log("This is the contact ", teamContact, index);

    let temp = Object.assign([], associatedPeople)
    temp[index] = teamContact
    setAssociatedPeople(temp)
    
  }

  const removeContactFromMedia = (index) => {
    //console.log("on remove contact from media")
    let temp = Object.assign([], associatedPeople)
    temp[index] = null
    //console.log(temp)
    setAssociatedPeople(temp)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  // console.log("THis is display tags", displayTags);
  const openModal = () => {
    setShowModal(true);
  };

  const setOpen = (a) => {
    setShowModal(a);
  };

  const showSidebar = () => setSidebar(!sidebar);

  // console.log("This is props contacts", props.contacts);

  // console.log("displayAssociate = " + displayAssociate)

  // console.log("**************************")
  // console.log("tags")
  // console.log(tags)

  const files = uploadFinished ? failedUploads : dropFiles

  const TagsDropDown = () => {
    return (
      <div class="dropdownMedia">
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
                marginTop: 8,
              }}
              id="searchtags"
              placeholder="Search Tags"
              value={searchTags}
              onChange={(e) => {
                setSearchTags(e.target.value);
                setDisplayTags(true);
              }}
              onClick={(e) => {
                setDisplayTags(true);
              }}
            ></input>
          </Grid>
          {allTags &&
            allTags.map((item, index) => {
              // console.log("This is item", item);
              if (searchTags != "") {
                if (item.name.toLowerCase().indexOf(searchTags.toLowerCase()) > -1) {
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
                    id="searchtags"
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
    );
  };

  const FileDropZone = (props) => {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{
          height: "max-content",
          background: "#fafcfd",
          // marginTop: 16,
          marginBottom: 16,
          borderRadius: 4,
          border: "1px dotted gray",
          padding: 16,
          ...props.style
        }}
        onDragOver={(e) => {
          e.preventDefault();
          // alert("This is alert");
          //console.log("This is great");
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
          Upload Media
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
          <span
            style={{ color: "#6aa8f4", cursor: "pointer" }}
            onClick={() => {
              document.getElementById("browse").click();
            }}
          >
            Browse
          </span>{" "}
          your files here
        </p>
      </Grid>
    );
  };

  return (
    <>
      <Link id="userSettings" to="/dashboard/user-settings"></Link>
      <input
        type="file"
        name="image"
        id={"browse"}
        className="form-control"
        multiple
        style={{ display: "none" }}
        // value={post.image.name}
        onChange={handleFileChange}
      />

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
        maxWidth={"lg"}
        width={"lg"}
        open={addCsv}
        onClose={() => {
          setAddCsv(false);
        }}
        onClick={(e) => {
          //console.log("THis is id", e.target.id);
          if (e.target.id != "tagButton" && e.target.id != "searchtags") {
            setDisplayTags(false);
          }
        }}
        PaperProps={{
          style: {
            borderRadius: 10,
          },
        }}
      >
        <Grid container style={{ padding: 16 }}>
          <Grid container direction="row" style={{ width: 850 }}>
            <NoteAdd style={{ color: "#3871da" }}></NoteAdd>
            <p style={{ width: "90%", fontWeight: 700, marginLeft: 8 }}>
              Import Contacts
            </p>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={
                activeTabCSV === 1
                  ? classes.uploadCSVGridActive
                  : activeTabCSV > 1
                  ? classes.uploadCSVGridDone
                  : classes.uploadCSVGrid
              }
            >
              1
            </Grid>{" "}
            <span className={classes.uploadCSVSpan}>Upload Csv</span>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={
                activeTabCSV === 2
                  ? classes.uploadCSVGridActive
                  : activeTabCSV > 2
                  ? classes.uploadCSVGridDone
                  : classes.uploadCSVGrid
              }
            >
              2
            </Grid>{" "}
            <span className={classes.uploadCSVSpan}>Tag</span>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={
                activeTabCSV === 3
                  ? classes.uploadCSVGridDone
                  : classes.uploadCSVGrid
              }
            >
              3
            </Grid>{" "}
            <span className={classes.uploadCSVSpan}>Imports</span>
          </Grid>
          <Grid container style={{ minHeight: 400 }}>
            {activeTabCSV === 1 && (
              <Grid container>
                <Grid container direction="row" justify="center">
                  <p className={classes.CSVDetails}>
                    Importing a csv allows you to add and update people stored
                    in Stacked Messenger. If a users phone number or Twitter
                    handle in CSV matches an existing contact in Stacked
                    Messenger , they will be updated with the mapped values.
                    Otherwise new a contact will be created. A contact must have
                    either Phone Number or Twitter handle in order to be created
                  </p>
                  <div style={{ width: "100%" }}></div>
                  <IconTextField
                    width={270}
                    onClick={() => {}}
                    border="none"
                    text="Download Import Template"
                    textColor={"white"}
                    background={"#3871da"}
                    icon={
                      <Description style={{ color: "white" }}></Description>
                    }
                  ></IconTextField>
                </Grid>

                {dropFiles.length > 0 ? (
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="center"
                      style={{
                        height: "200px",
                        width: "70%",
                        background: "#fafcfd",
                        marginTop: 16,
                        marginBottom: 16,
                        borderRadius: 4,
                        border: "1px dotted gray",
                        padding: 16,
                      }}
                    >
                      <p
                        style={{
                          color: "black",
                          fontWeight: 600,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {dropFiles[0].name}
                      </p>
                      <p
                        style={{
                          color: "gray",
                          textDecoration: "underline",
                          fontWeight: 600,
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Remove
                      </p>
                      <div style={{ width: "100%" }}></div>
                      <IconTextField
                        width={120}
                        onClick={() => {
                          setActiveTabCSV(2);
                        }}
                        border="none"
                        text="Upload"
                        textColor={"white"}
                        background={"#3871da"}
                        icon={<Backup style={{ color: "white" }}></Backup>}
                      ></IconTextField>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container direction="row" justify="center">
                    <div style={{ width: "70%" }}>
                      <FileDropZone></FileDropZone>
                    </div>
                  </Grid>
                )}
              </Grid>
            )}
            {activeTabCSV == 2 && (
              <Grid container>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  style={{ height: "max-content" }}
                >
                  {" "}
                  <p className={classes.CSVDetails}>
                    Tags let you set a group of people together. For example
                    they are great for highlighting vip contacts or potential
                    propspects or customers. For more information about tags{" "}
                    <span style={{ textDecoration: "underline" }}>
                      Visit our docs about tags
                    </span>{" "}
                  </p>
                  <p className={classes.CSVDetails}>
                    Each import gets a unique tag to help you find the users you
                    have created and updated. You can also add more tags to
                  </p>
                  <Grid container direction="row" style={{ width: "70%" }}>
                    {tagFilter.length != 0 &&
                      tagFilter.map((fil, index) => {
                        return (
                          <div
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            className={classes.sTags}
                            style={{ marginLeft: 0, marginRight: 16 }}
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
                                  marginLeft: 8,
                                }}
                              ></ClearIcon>{" "}
                            </Grid>
                          </div>
                        );
                      })}
                    <div style={{ width: "100%", marginTop: 16 }}></div>
                    <IconTextField
                      width={130}
                      onClick={() => {
                        setDisplayTags(true);
                      }}
                      id="tagButton"
                      text="Add Tag"
                      textColor="white"
                      background="#3871DA"
                      marginLeft={"0px"}
                      icon={
                        <LocalOfferOutlined
                          id="tagButton"
                          style={{ color: "white" }}
                        ></LocalOfferOutlined>
                      }
                    ></IconTextField>
                    <TagsDropDown></TagsDropDown>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {activeTabCSV === 3 && (
              <Grid container>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  style={{ height: "max-content" }}
                >
                  <Grid container direction="row" style={{ width: "70%" }}>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#10244c",
                        width: "100%",
                      }}
                    >
                      Import Complete
                    </p>
                    <Grid item md={2}>
                      <p
                        style={{
                          fontWeight: 600,
                          color: "#10244c",
                          width: "100%",
                        }}
                      >
                        250
                      </p>
                      <p
                        className={classes.CSVDetails}
                        style={{ width: "100%" }}
                      >
                        Contacts Created
                      </p>
                    </Grid>
                    <Grid item md={2}>
                      <p
                        style={{
                          fontWeight: 600,
                          color: "#10244c",
                          width: "100%",
                        }}
                      >
                        250
                      </p>
                      <p
                        className={classes.CSVDetails}
                        style={{ width: "100%" }}
                      >
                        Contacts Updated
                      </p>
                    </Grid>
                    <Grid item md={2}>
                      <p
                        style={{
                          fontWeight: 600,
                          color: "#10244c",
                          width: "100%",
                        }}
                      >
                        250
                      </p>
                      <p
                        className={classes.CSVDetails}
                        style={{ width: "100%" }}
                      >
                        Errors
                      </p>
                      <p
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        View Errors
                      </p>
                    </Grid>
                    <p className={classes.CSVDetails} style={{ width: "100%" }}>
                      Each import gets a unique tag to help you find the users
                      you have created and updated. You can also add more tags
                      to
                    </p>
                    {tagFilter.length != 0 &&
                      tagFilter.map((fil, index) => {
                        return (
                          <div
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            className={classes.sTags}
                            style={{ marginLeft: 0, marginRight: 16 }}
                          >
                            <Grid
                              style={{ height: 50 }}
                              container
                              direction="row"
                              alignItems="center"
                            >
                              {fil}
                              <LocalOfferOutlined
                                style={{
                                  color: "blue",
                                  fontSize: 25,
                                  cursor: "pointer",
                                  marginLeft: 8,
                                }}
                              ></LocalOfferOutlined>{" "}
                            </Grid>
                          </div>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify={activeTabCSV === 3 ? "flex-end" : "space-between"}
          style={{ marginBottom: 16, paddingRight: 16 }}
        >
          {activeTabCSV !== 3 && (
            <IconTextField
              width={150}
              onClick={() => {
                setAddCsv(false);
              }}
              text="Cancel"
              textColor={"#3871da"}
              textAlign="center"
              textWidth="100%"
              textPadding="0px"
              // border
              // background={"#3871da"}
            ></IconTextField>
          )}

          {activeTabCSV === 2 && (
            <IconTextField
              width={180}
              onClick={() => {
                setActiveTabCSV(3);
              }}
              border="none"
              text="Import Contacts"
              textColor={"white"}
              background={"#3871da"}
              icon={
                <PermIdentityIcon style={{ color: "white" }}></PermIdentityIcon>
              }
            ></IconTextField>
          )}
          {activeTabCSV === 3 && (
            <IconTextField
              width={150}
              onClick={() => {
                setAddCsv(false);
              }}
              text="Close"
              textColor={"#3871da"}
              textAlign="center"
              textWidth="100%"
              textPadding="0px"
            ></IconTextField>
          )}
        </Grid>
      </Dialog>

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
          <Grid item md={5} xs={5}>
            <IconTextField
              width={150}
              onClick={() => {
                setAddContact(false);
                setAddCsv(true);
              }}
              text="Import CSV"
              marginLeft="0px"
              textColor={"white"}
              textAlign="center"
              textWidth="100%"
              textPadding="0px"
              // border
              background={"#3871da"}
            ></IconTextField>
          </Grid>
          <Grid item md={7} xs={7}>
            <Grid container direction="row" justify="flex-end">
              <IconTextField
                width={150}
                onClick={() => {
                  setAddContact(false);
                }}
                text="Cancel"
                textColor={"#3871da"}
                textAlign="center"
                textWidth="100%"
                textPadding="0px"
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

      {/*********************************************************************************/}
      {/***************************** Add Media Dialog **********************************/}
      {/*********************************************************************************/}

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
			  //console.log("my on click " + e.target.id)
        //console.log("my on click " + displayAssociate)
          if (e.target.id != "owner") {
            setDisplayOwner(false);
          }
          if (e.target.id != "tags" && e.target.id != "searchtags") {
            setDisplayTags(false);
          }
          if (e.target.id != "placeholder" && e.target.id != "searchplaceholder") {
            setDisplayPlaceholder(false);
          }
          if (e.target.id != displayAssociate) {
            //console.log("This is id", e.target.id, displayAssociate);
            // alert("This will be null");
            
          }

          setDisplayAssociate(null);
        }}
      >
        <Grid container direction="row" style={{ maxWidth: 1300, padding: 20 }}>
          <InsertDriveFileIcon
            style={{ color: "#3871da" }}
          />

          <p style={{ width: "90%", fontWeight: 700, marginLeft: 5 }}>
            Create Placeholder & Upload Media
          </p>

          {uploadFinished &&
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
              style={{ padding: 50 }}
            >
              <MediaInputTitle title="Upload Complete" style={{ fontWeight: 700, fontSize: 30 }}/>
              <MediaInputTitle title={`${uploadStatusCount.success} of ${uploadStatusCount.total} files uploaded successfully`} style={{ marginTop: 0, fontSize: 20 }}/>
              <MediaInputTitle title={`${uploadStatusCount.failed} files failed to upload`} style={{ marginTop: 0, fontSize: 20 }}/>
            </Grid>
          }

          {!uploadFinished &&
            <>
              <Grid item md={12} xs={12}>
                <MediaInputTitle title="Owner"/>

                <SearchableOptions
                  canSelectMoreOptions={owners.length < 1}
                  selection={owners}
                  selectedNameDef={['first_name', 'last_name']}
                  selectedImgDef={'twitter_profile.profile_image'}
                  optionNameDef={['first_name', 'last_name']}
                  optionImgDef={'twitter_profile.profile_image'}
                  placeholder='+ Add Owner'
                  showDropDown={displayOwner}
                  options={teamMembers}
                  search={searchedTeamMembers}
                  onInputChange={onOwnerInputChange}
                  onInputPressEnter={() => {}}
                  onOptionSelected={(owner, index) => addMemberToOwners(owner)}
                  onRemoveSelected={(owner, index) =>  removeMemberFromOwners(owner)}
                  onShowDropDown={() => setDisplayOwner(true)}
                />

              </Grid>
              <Grid item md={12} xs={12}>
                <MediaInputTitle title="Tags"/>

                <SearchableOptions
                  canSelectMoreOptions={true}
                  selection={tags}
                  selectedNameDef={'name'}
                  optionNameDef={'name'}
                  placeholder='+ Add Tag'
                  showDropDown={displayTags}
                  options={allTags}
                  search={searchedTags}
                  onInputChange={onTagInputChange}
                  onInputPressEnter={onTagInputPressEnter}
                  onOptionSelected={(tag, index) => addTagToTags(tag)}
                  onRemoveSelected={(tag, index) =>  removeTagFromTags(tag)}
                  onShowDropDown={() => setDisplayTags(true)}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <MediaInputTitle title="Associate to placeholder or create new"/>

                <SearchableOptions
                  canSelectMoreOptions={placeholders.length < 1}
                  selection={placeholders}
                  selectedNameDef={'name'}
                  optionNameDef={'name'}
                  placeholder='+ Add Media Placeholder'
                  showDropDown={displayPlaceholder}
                  options={allPlaceholders}
                  search={searchedPlaceholders}
                  onInputChange={onPlaceholderInputChange}
                  onInputPressEnter={onPlaceholderInputKeyPress}
                  onOptionSelected={(placeholder, index) => addPlaceholderToPlaceholders(placeholder)}
                  onRemoveSelected={(placeholder, index) =>  removePlaceholderFromPlaceholders(placeholder)}
                  onShowDropDown={() => setDisplayPlaceholder(true)}
                />

              </Grid>
            </>
          }

          {/* {dropFiles.length < 1 && <FileDropZone/>} */}

          {alerts.length > 0 &&
            <div
              style={{
                // marginTop: 16,
                transform: "translateY(15px)",
                marginBottom: 0,
                width: "100%",
                border: "1px solid #dbe2ed",
                borderRadius: 4,
              }}
            >
                {alerts.map((alert, index) => (
                  <Alert key={alert.id}
                    style={{ boxShadow: "0 0 transparent"}}
                    variant="standard"
                    severity="warning"
                    onClose={() => onMediaAlertClose(index)}
                  >
                    {alert.message}
                  </Alert>
                ))}
            </div>
                
              }
          
          {files.length > 0 &&
            <div
              style={{
                marginTop: 32,
                marginBottom: 0,
                width: "100%",
                border: "1px solid #dbe2ed",
                borderRadius: 4,
              }}
            >
              <MediaUploadHeader/>

              {/* {mediaAlert.visible &&
                <Alert 
                  style={{ boxShadow: "0 0 transparent"}}
                  variant="standard"
                  severity="warning"
                  onClose={onMediaAlertClose}
                >
                  {mediaAlert.message}
                </Alert>
              } */}

              {files.map((item, index) => {
                return (
                  <MediaUploadItem
                    id={index}
                    disableAssociateInput={uploadFinished}
                    item={item}
                    showContactDropDown={displayAssociate === index}
                    onShowContactDropDown={(id) => setDisplayAssociate(index)}
                    searchTerm={searchTeamContact}
                    onSearchTermChange={onContactSearchTermChange}
                    onSearchTermKeyPress={onSearchTeamContactKeyPress}
                    searchOptions={teamContacts}
                    optionImgDef={'twitter_profile.profile_image'}
                    optionNameDef={['first_name', 'last_name']}
                    onOptionSelected={(option) => associateContactToMedia(option, index)}
                    optionSelected={associatedPeople[index]}
                    optionSelectedNameDef={['first_name', 'last_name']}
                    onRemoveOptionSelected={() => removeContactFromMedia(index)}
                    itemUploadStatus={uploadStatus[index]}
                    onDeleteMedia={() => deleteMedia(index)}
                  />
                )
              })}
            </div>
          }

          {!uploadFinished &&
            <FileDropZone
              style={{ marginTop: dropFiles.length == 0 ? 30 : 0}}  
            />
          }

          <Grid item md={5} xs={5}></Grid>
          <Grid item md={7} xs={7} style={{ marginTop: 30 }}>
            <Grid container direction="row" justify="flex-end">
              <MuiButton
                onClick={() => {
                  onCloseMedia();
                }}
                style={{
                  minWidth: 120,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginRight: 10
                }}
                disableElevation
                variant="outlined"
                // border
                // background={"#3871da"}
              >
                {uploadFinished ? "Upload More" : "Cancel"}
              </MuiButton>

              <LoadingButton
                style={{
                  minWidth: 120,
                  backgroundColor: "#3871da",
                  fontWeight: "bold",
                  textTransform: "capitalize"
                }}
                onClick={onUploadMedia}
                loading={uploadingMedia}
                endIcon={uploadingMedia || uploadFinished ? <span></span> : <CloudUploadIcon style={{ color: "white" }}/> }
                disableElevation
                // color="#3871da"
                variant="contained">
                {uploadFinished ? "OK" : "Upload"}
              </LoadingButton>
              
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      {/*********************************************************************************/}
      {/*********************************************************************************/}

        <IconContext.Provider value={{ color: "#fff" }}>
            <NavResponsive>
                <IoIosMenu
                    style={{ color: "rgb(113, 115, 118)", margin: "2rem" }}
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
                            color: "rgb(113, 115, 118)",
                            marginRight: "15px",
                            marginLeft: "15px",
                            height: "24px",
                            width: "25px",
                        }}
                    />
                </LeftSectionNav>
            </NavResponsive>
            <Nav>
                {props.contacts === true ||
                props.media == true ||
                props.chat == true ||
                props.messageCreate === true ||
                props.TweetCreate === true ? (
                    <LogoContainer style={{ width: 60 }}>
                        <NavLogo src={teamLogo}  />
                    </LogoContainer>
                ) : (
                    <LogoContainer>
                        <NavLogo src={teamLogo}/>
                    </LogoContainer>
                )}
                {props.contacts === true ? (
                    <Button onClick={setAddContact}>+ Add Contact</Button>
                ) : (
                    <div></div>
                )}

                {props.messageCreate === true ? (

                    <Button
                        onClick={() => {
                            window.location.reload();
                            localStorage.removeItem("selectedMedia");
                        }}
                    >
                        + New Message
                    </Button>
                ) : (
                    <div></div>
                )}

                {props.chat === true ? (
                    <Button
                        style={{ width: 160, textAlign: "center", height: 50 }}
                        onClick={() => {}}
                    >
                        <span style={{ fontSize: 30 }}>+</span>
                        <span style={{ marginLeft: 16 }}>New Message</span>
                    </Button>
                ) : (
                    <div></div>
                )}
                {props.TweetCreate === true ? (
                    <Button
                        onClick={() => {
                            window.location.reload();
                            localStorage.removeItem("selectedMedia");
                        }}
                    >
                        + New Post
                    </Button>
                ) : (
                    <div></div>
                )}

                {props.media === true ? (
                    <Button onClick={setAddMedia}>+ Add Media</Button>
                ) : (
                    <div></div>
                )}

                <div style={{ marginLeft: 25, display: "flex" }}>
                    <div
                        style={{
                            height: 36,
                            backgroundColor: "rgb(243, 244, 248)",
                        }}
                    >
                        <SearchIcon
                            style={{
                                marginLeft: 10,
                                marginTop: 8,
                                color: "rgb(136, 136, 141)",
                            }}
                        />
                    </div>
                    <SelectSearch
                        search
                        style={{ backgroundColor: "red", color: "rgb(136, 136, 141)" }}
                        // closeOnSelect={false}
                        value={searchValue}
                        autoComplete
                        onChange={
                            (e)=>{
                                //console.log("This is the great",e)
                                setSearchValue(e)
                            }
                        }
                        options={options}
                        placeholder="Search for contact,media,team users,setting and chats"
                    />
                </div>

                {/*
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
          </FormInputWrap> */}
                <LeftSectionNav>
                    <div
                        style={{
                            height: "70px",
                            width: "1.5px",
                            background: "rgb(113, 115, 118,0.1)",
                        }}
                    ></div>
                    <BiBell
                        style={{
                            color: "rgb(113, 115, 118)",
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
                            width: "1.5px",
                            background: "rgb(113, 115, 118,0.1)",
                        }}
                    ></div>
                    <BiChat
                        onClick={() => {
                            history.push(`/chat`);
                        }}
                        style={{
                            cursor: "pointer",
                            color: "rgb(113, 115, 118)",
                            marginRight: "15px",
                            marginLeft: "15px",
                            height: "24px",
                            width: "25px",
                        }}
                    />
                    <div
                        style={{
                            height: "70px",
                            width: "1.5px",
                            background: "rgb(113, 115, 118,0.1)",
                        }}
                    ></div>
                    {props.TwitterStream?  <Logoimage src={Logo }style={{visibility:'hidden'}}/>
                        :      <Logoimage src={Logo}></Logoimage>
                    }   </LeftSectionNav>
            </Nav>
            <SidebarNav
                sidebar={sidebar}
                style={{
                    width:
                        props.contacts ||
                        props.chat ||
                        props.media ||
                        props.messageCreate ||
                        props.TweetCreate
                            ? 60
                            : 250,
                }}
            >
                <Grid container direction="column">
                    <SidebarWrap style={{ position: "relative", zIndex: 12 }}>
                        {props.contacts === true ||
                        props.chat === true ||
                        props.media === true ||
                        props.messageCreate === true ||
                        props.TweetCreate === true ? (
                            <div></div>
                        ) : (
                            <Button onClick={openModal}>+ New</Button>
                        )}

                        {SidebarData.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedTab(() => index);
                                    }}
                                >
                                    <SubMenu
                                        contacts={
                                            props.contacts ||
                                            props.chat === true ||
                                            props.media ||
                                            props.messageCreate ||
                                            props.TweetCreate
                                        }
                                        selectedTab={selectedTab}
                                        item={item}
                                        key={index}
                                        index={index}
                                    />
                                </div>
                            );
                        })}
                    </SidebarWrap>

                    {props.chat === false && (
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                alignItems="flex-end"
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 20,

                                    height: "90%",
                                }}
                                onClick={() => {
                                    // window.location.href="/dashboard/user-settings"
                                    document.getElementById("userSettings").click();
                                }}
                            >
                                <Grid item md={4} xs={4} lg={4}>
                                    <Grid container direction="row" justify="center">
                                        <img
                                            style={{ width: 35, height: 35, borderRadius: 17 }}
                                            src={
                                                JSON.parse(localStorage.getItem("user"))
                                                    .twitter_profile.profile_image
                                            }
                                        ></img>
                                    </Grid>
                                </Grid>
                                <Grid item md={8} xs={8} lg={8}>
                                    {props.contacts === true ||
                                    props.media === true ||
                                    props.chat === true ||
                                    props.messageCreate === true ||
                                    props.TweetCreate === true ? (
                                        <div></div>
                                    ) : (
                                        <Grid container direction="row">
                        <span style={{ marginTop: -30, fontWeight: "bold" }}>
                          {JSON.parse(localStorage.getItem("user")).first_name +
                          " " +
                          JSON.parse(localStorage.getItem("user")).last_name}
                        </span>
                                            <span style={{ marginTop: -30 }}>
                          <ExpandMoreIcon
                              style={{
                                  color: "black",
                                  marginLeft: 5,
                                  fontSize: 30,
                              }}
                          ></ExpandMoreIcon>
                        </span>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Grid>
            </SidebarNav>
        </IconContext.Provider>
    </>
  );
};
export {LogoContainer}
export default Sidebar;
