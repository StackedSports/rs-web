import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { default as ArrowBack } from '@mui/icons-material/ArrowBackIos';
import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TuneIcon from '@mui/icons-material/Tune';
import { ListItemButton, Stack } from "@mui/material";
import { Avatar, List, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

import Page, { Content } from 'UI/Layouts/Page';
import Panel from 'UI/Layouts/Panel';
import TopBar from 'UI/Layouts/TopBar';
import SideBar from 'UI/Layouts/SideBar';

import SideFilter from 'UI/Widgets/SideFilter';
import SearchBar from 'UI/Widgets/SearchBar';
// import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import ConversationChat from './Components/ConversationChat';


const changeItemPosition = (arr, from, to) => {
  let el = arr[from]
  arr.splice(from, 1)
  return arr.splice(to, 0, el);
};

const ChatListItem = (props) => {

  const [showIconClose, setShowIconClose] = useState(false)

  const onArchiveConversation = (conversation) => {
    props.onArchiveConversation(conversation)
  }

  return (
    <ListItemButton
      sx={{
        padding: "15px",
        position: "relative",
        borderTop: "solid 1px #dadada",
        borderBottom: "solid 1px #dadada",
      }}
      key={props.conversation?.id}
      onMouseEnter={() => setShowIconClose(true)}
      onMouseLeave={() => setShowIconClose(false)}
      onClick={() => props.onViewConversation(props.conversation)}
    >
      <Stack flex={1} direction="row" spacing={2} alignItems="center">
        <CloseIcon sx={{
          visibility: showIconClose ? "visible" : "hidden",
          transition: "visibility .2s ease",
          position: "absolute",
          marginRight: "15px",
          right: 0,
          zIndex: 1,
        }}
          onClick={() => onArchiveConversation(props.conversation)}
        />
        <Avatar style={{
          width: "56px",
          height: "56px",
        }}
          aria-label="recipe"
          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
        />
        <Stack flex={1} sx={{ position: "relative" }}>
          <Typography style={{
            position: "absolute",
            right: 0,
          }}
            variant="body2"
          >
            <b>11:23 am</b>
          </Typography>

          <Typography variant="body1">
            <b>{props.conversation?.name}</b>
          </Typography>
          <Typography variant="body2" color="#dadada">
            @charles
          </Typography>
          <Typography variant="body2" color="#dadada">
            There Ways To Get Travel Disco...
          </Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  )
}

export default function ChatPage(props) {
  const confirmDialog = useContext(ConfirmDialogContext)

  const [displayFilters, setDisplayFilters] = useState(true)
  const [conversationViewer, setConversationViewer] = useState([])

  const onTopActionClick = () => {
    console.log("onTopActionClick")
  }

  const onBackClick = () => {
    console.log("onBackClick")
    setDisplayFilters(!displayFilters)
  }

  const onViewConversation = (conversation) => {
    let index = 0
    const conv = conversationViewer.filter(conv => conv?.id === conversation.id && conversation)
    if (conv.length === 0) {

      setConversationViewer([conversation, ...conversationViewer])
    } else {
      console.log("contains")
      // index = conversationViewer.indexOf(conversation)
      // console.log(conv)
    }
    // console.log(conversation, index)
    // changeItemPosition(conversationViewer, index, 0)
  }

  const onCloseConversation = (conversation) => {
    const index = conversationViewer.indexOf(conversation)
    conversationViewer.splice(index, 1)
    setConversationViewer([...conversationViewer])
  }

  console.log(conversationViewer)

  const onChatSearch = (searchTerm) => {
    console.log("onChatSearch", searchTerm)
  }

  const onChatSearchClear = () => {
    console.log("onChatSearchClear")
  }

  const onArchiveConversation = (conversation) => {
    const title = "Archive Conversation"
    confirmDialog.show(title, "Are you sure you would like to archive this conversation? ", () => {
      console.log("archiveConversation", conversation)

    })
  }

  const Icon = displayFilters ? MenuOpenIcon : MenuIcon

  const filters = [
    {
      id: 'Ben Graves',
      name: 'Ben Graves',
      items: [
        { id: '0', name: '@BG615', /* path: contactsRoutes.all */ },
        { id: '1', name: '615.999.9999', /* path: contactsRoutes.all */ }
      ]
    },
  ]

  const conversations = [
    {
      id: '0',
      name: 'Luke Burke 1',
      messages: [
        {
          id: "0",
        }
      ]
    },
    {
      id: '1',
      name: 'Luke Burke 2',
    },
    {
      id: '2',
      name: 'Luke Burke 3',
    },
    {
      id: '3',
      name: 'Luke Burke 4',
    },
    {
      id: '4',
      name: 'Luke Burke 5',
    },
    {
      id: '5',
      name: 'Luke Burke 6',
    },
    {
      id: '6',
      name: 'Luke Burke 7',
    },
  ]

  return (
    <Page>
      <TopBar
        actionTitle="+ New Message"
        onActionClick={onTopActionClick}
      />
      <SideBar />
      <Content>
        <SideFilter
          visible={displayFilters}
          filters={filters}
          collapsed={true}
          // onFilterSelected={onFilterSelected}
        />
        <Panel hideHeader>
          <Stack flex={1} direction="row">

            <Stack sx={{//conversation summary list
              width: "370px",
              height: "100vh",
              overflowY: "scroll",
              border: "red solid 1px",
              borderRadius: "5px",
              border: "solid 1px #dadada",
            }} >
              <Stack
                p="20px 40px 20px 20px"
                direction="row"
                flexWrap="nowrap"
                alignItems="center"
                justifyContent="space-around"
                borderBottom="solid 1px #dadada"
              >
                <Icon sx={{ cursor: "pointer" }} onClick={onBackClick} />
                <Typography component="h2" variant="h6"><b>Ben Garves</b></Typography>
                <Typography style={{ color: "#dadada", fontSize: "12px", }} component="span" variant="subtitle1">@BD615</Typography>
              </Stack>

              <List style={{ padding: 0 }}>

                <ListItem style={{ padding: "30px", }} >
                  <SearchBar
                    style={{ margin: 0 }}
                    searchOnChange
                    icon={TuneIcon}
                    placeholder="Search"
                    onSearch={onChatSearch}
                    onClear={onChatSearchClear}
                  />
                </ListItem>

                {conversations.map(conversation => (
                  <ChatListItem
                    conversation={conversation}
                    onViewConversation={onViewConversation}
                    onArchiveConversation={onArchiveConversation}
                  />
                ))
                }
              </List>
            </Stack>

            <Stack sx={{//conversation details container
              maxWidth: displayFilters ? "700px" : "900px",
              overflowX: "scroll",
            }}
              flex={1}
              spacing={2}
              direction="row"
              flexWrap="nowrap"
            >
              {conversationViewer.map(conversation => (
                <ConversationChat
                  conversation={conversation}
                  onCloseConversation={onCloseConversation}
                />
              ))
              }

            </Stack>

            {/* {alert && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={props.alert.visible}
              autoHideDuration={6000}
              onClose={props.alert.dismiss}>
              <MuiAlert
                variant="filled"
                onClose={props.alert.dismiss}
                severity={props.alert.severity}
                sx={{ width: '100%' }}
              >
                {props.alert.message}
              </MuiAlert>
            </Snackbar>
            )} */}

            {/* {props.redirect && props.redirect !== '' && <Redirect push to={props.redirect} />} */}

            {/* {loading && <LoadingOverlay />} */}

          </Stack>
        </Panel>
      </Content>
    </Page >
  )
}