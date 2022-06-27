import { useState, useContext, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Stack, List, Typography, Grid, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import Page, { Content } from 'UI/Layouts/Page';
import Panel from 'UI/Layouts/Panel';
import TopBar from 'UI/Layouts/TopBar';
import SideBar from 'UI/Layouts/SideBar';
import SideFilter from 'UI/Widgets/SideFilter';
import SearchBar from 'UI/Widgets/SearchBar';
import { useSnippets, useTextPlaceholders } from 'Api/ReactQuery'
import { useLocalStorage } from 'Hooks/useLocalStorage';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AuthContext } from 'Context/Auth/AuthProvider';
import { ChatWindow, ChatListItem } from '../../UI/Widgets/Chat';

// Data for test
const conversations = [
  {
    id: '0',
    name: 'Luke Burke 1',
    messages: [
      {
        id: "0",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "1",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "2",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "3",
        message: "lorem ipsum dolor sit amet",
      }
    ]
  },
  {
    id: '1',
    name: 'Luke Burke 2',
    messages: [
      {
        id: "0",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "1",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "2",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "3",
        message: "lorem ipsum dolor sit amet",
      }
    ]
  },
  {
    id: '2',
    name: 'Luke Burke 3',
    messages: [
      {
        id: "0",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "1",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "2",
        message: "lorem ipsumt",
        owner: true,
      },
      {
        id: "3",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "4",
        message: "lorem ipsum dolor sit amet lipsum dolor sit amet lamet lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "5",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis ligula enim, vel vulputate magna hendrerit eget. Morbi diam ante, gravida in pretium gravida, dictum sit amet nunc. Sed felis magna, feugiat quis finibus eget, venenatis at ex. Suspendisse interdum sed augue a porta. Etiam commodo id turpis at lobortis. Suspendisse blandit erat est, quis malesuada ex euismod ac. Morbi ac ipsum ante. Integer vel neque vitae elit posuere euismod. Aliquam quis libero eu augue porta pellentesque. Vivamus cursus tellus vitae lectus varius malesuada.",
        owner: true,
      }
    ]
  },
  {
    id: '3',
    name: 'Luke Burke 4',
    messages: [
      {
        id: "0",
        message: "lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "1",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "2",
        message: "lorem ipsumt",
        owner: true,
      },
      {
        id: "3",
        message: "lorem ipsum dolor sit amet",
      },
      {
        id: "4",
        message: "lorem ipsum dolor sit amet lipsum dolor sit amet lamet lorem ipsum dolor sit amet",
        owner: true,
      },
      {
        id: "5",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis ligula enim, vel vulputate magna hendrerit eget. Morbi diam ante, gravida in pretium gravida, dictum sit amet nunc. Sed felis magna, feugiat quis finibus eget, venenatis at ex. Suspendisse interdum sed augue a porta. Etiam commodo id turpis at lobortis. Suspendisse blandit erat est, quis malesuada ex euismod ac. Morbi ac ipsum ante. Integer vel neque vitae elit posuere euismod. Aliquam quis libero eu augue porta pellentesque. Vivamus cursus tellus vitae lectus varius malesuada.",
        owner: true,
      }
    ]
  },

]

export default function ChatPage(props) {
  const confirmDialog = useContext(ConfirmDialogContext)
  const { user } = useContext(AuthContext)
  const snippets = useSnippets()
  const textPlaceholders = useTextPlaceholders()

  const [pinnedChats, setPinnedChats] = useLocalStorage('pinnedChats', {})

  const [displayFilters, setDisplayFilters] = useState(true)
  const [conversationViewer, setConversationViewer] = useState([])

  useEffect(() => {
    if (user) {
      const pinned = conversations.filter(conversation => pinnedChats[user.id]?.includes(conversation.id))
      setConversationViewer(pinned)
    }
  }, [])

  const isPinned = useCallback((conversation) => {
    if (user && pinnedChats[user.id]) {
      return pinnedChats[user.id]?.includes(conversation.id)
    }
    return false
  }, [pinnedChats, user])

  const onTopActionClick = () => {
    console.log("onTopActionClick")
  }

  const onBackClick = () => {
    console.log("onBackClick")
    setDisplayFilters(!displayFilters)
  }

  const onClickChatListItem = (conversation) => {
    let index = 0
    const conv = conversationViewer.filter(conv => conv?.id === conversation.id && conversation)
    if (conv.length === 0) {

      setConversationViewer([conversation, ...conversationViewer])
    } else {
      // index = conversationViewer.indexOf(conversation)
      // console.log(conv)
    }
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
                    onToggleChat={onClickChatListItem}
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
                      <ChatWindow
                        isPinned={isPinned(conversation)}
                        index={index}
                        key={conversation.id}
                        conversation={conversation}
                        onCloseConversation={onCloseConversation}
                        onPin={() => onPin(conversation)}
                        snippets={snippets}
                        textPlaceholders={textPlaceholders}
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