import { useState, useContext, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { ListItemButton, Stack, Avatar, List, ListItem, Typography, Grid, Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from '@mui/icons-material/Archive';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

import Page, { Content } from 'UI/Layouts/Page';
import Panel from 'UI/Layouts/Panel';
import TopBar from 'UI/Layouts/TopBar';
import SideBar from 'UI/Layouts/SideBar';

import SideFilter from 'UI/Widgets/SideFilter';
import SearchBar from 'UI/Widgets/SearchBar';
// import LoadingOverlay from 'UI/Widgets/LoadingOverlay'

import { useLocalStorage } from 'Hooks/useLocalStorage';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AuthContext } from 'Context/Auth/AuthProvider';
import ConversationChat from './Components/ConversationChat';

// Data to test
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
      onClick={() => props.onToggleChat(props.conversation)}
    >
      <Stack flex={1} direction="row" spacing={2} alignItems="center">
        <IconButton
          sx={{
            visibility: showIconClose ? "visible" : "hidden",
            position: "absolute",
            marginRight: "15px",
            right: 0,
            bottom: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={(e) => { e.stopPropagation(); onArchiveConversation(props.conversation) }}
        >
          <ArchiveIcon />
        </IconButton>
        <Avatar style={{
          width: "56px",
          height: "56px",
        }}
          aria-label="avatar"
          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
        />
        <Stack flex={1} sx={{ position: "relative" }}>
          <Typography style={{
            position: "absolute",
            right: 0,
          }}
            variant='body2'
            fontWeight={600}
            fontSize={12}
          >
            11:23 am
          </Typography>

          <Typography variant="body1" fontWeight='bold'>
            {props.conversation?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @charles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            There Ways To Get Travel Disco...
          </Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  )
}

export default function ChatPage(props) {
  const confirmDialog = useContext(ConfirmDialogContext)
  const { user } = useContext(AuthContext)
  const [pinnedChats, setPinnedChats] = useLocalStorage('pinnedChats', {})

  const [displayFilters, setDisplayFilters] = useState(true)
  const [conversationViewer, setConversationViewer] = useState([])

  useEffect(() => {
    const pinned = conversations.filter(conversation => pinnedChats[user.id].includes(conversation.id))
    setConversationViewer(pinned)
  }, [])

  const isPinned = useCallback((conversation) => {
    if (pinnedChats[user.id]) {
      return pinnedChats[user.id].includes(conversation.id)
    }
    return false
  }, [pinnedChats, user.id])

  const onTopActionClick = () => {
    console.log("onTopActionClick")
  }

  const onBackClick = () => {
    console.log("onBackClick")
    setDisplayFilters(!displayFilters)
  }

  const onToggleChat = (conversation) => {
    console.log("open conversation")
    let index = 0
    const conv = conversationViewer.filter(conv => conv?.id === conversation.id && conversation)
    if (conv.length === 0) {

      setConversationViewer([conversation, ...conversationViewer])
    } else {
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

  const onPin = (conversation) => {
    const newPinnedChats = { ...pinnedChats };
    const conversationId = conversation.id;

    newPinnedChats[user.id] = newPinnedChats[user.id] || [];
    if (newPinnedChats[user.id].includes(conversationId)) {
      newPinnedChats[user.id] = newPinnedChats[user.id].filter(id => id !== conversationId)
    }
    else {
      newPinnedChats[user.id].push(conversationId)
    }
    setPinnedChats(newPinnedChats)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // dropped outside the list
    if (!destination)
      return;

    if (destination.index === source.index)
      return;

    setConversationViewer(reorder(conversationViewer, source.index, destination.index))
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
        <Panel hideHeader sx={{ minWidth: 0 }}>
          <Grid container flex={1} flexWrap='nowrap' >

            <Grid item sx={{//conversation summary list
              width: "370px",
              overflowY: "auto",
              overscrollBehaviorBlock: 'contain',
              border: "red solid 1px",
              borderEndStartRadius: '5px',
              borderStartStartRadius: '5px',
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
                <Typography sx={{ color: "#dadada", fontSize: "12px", }} component="span" variant="subtitle1">@BD615</Typography>
              </Stack>

              <Box sx={{ p: '20px' }}>
                <SearchBar
                  style={{ margin: 0 }}
                  searchOnChange
                  placeholder="Search"
                  onSearch={onChatSearch}
                  onClear={onChatSearchClear}
                />
              </Box>
              <List >

                {conversations.map(conversation => (
                  <ChatListItem
                    key={conversation.id}
                    conversation={conversation}
                    onToggleChat={onToggleChat}
                    onArchiveConversation={onArchiveConversation}
                  />
                ))
                }
              </List>
            </Grid>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <Grid item xs  //conversation details container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      borderEndEndRadius: '5px',
                      borderStartEndRadius: '5px',
                      display: 'grid',
                      gridAutoFlow: 'column',
                      gridAutoColumns: '450px',
                      overflowX: 'auto',
                      overscrollBehaviorInline: 'contain',
                      gap: 1,
                      minHeight: 0,
                    }}
                  >
                    {conversationViewer.map((conversation, index) => (
                      <ConversationChat
                        isPinned={isPinned(conversation)}
                        index={index}
                        key={conversation.id}
                        conversation={conversation}
                        onCloseConversation={onCloseConversation}
                        onPin={() => onPin(conversation)}
                      />
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>

          </Grid>
        </Panel>
      </Content>
    </Page>
  )
}