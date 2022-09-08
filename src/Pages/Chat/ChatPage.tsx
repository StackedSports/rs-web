import { useState, useContext, useCallback, useEffect, useMemo } from 'react';
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
import { ChatWindow, ChatListItem, ChatInbox } from 'UI/Widgets/Chat';

import { getInboxSMS, getInboxDM, getInbox, getInboxConversation } from 'Api/Endpoints'
import { useTeamInboxes, useInbox, useInboxSMS, useInboxDM } from 'Api/ReactQuery/Chat'
import { useTeamMembers } from 'Api/ReactQuery/TeamMembers'

import { usePagination } from "Api/Pagination"
import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI, InboxType } from "Interfaces"

// Data for test
const conversations = [
	{
	  id: '0',
	  name: 'Luke Burke 1',
	  isTyping: true,
	  messages: [
		{
		  id: "0",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
  
		},
		{
		  id: "1",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "2",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "3",
		  text: "lorem ipsum dolor sit amet",
		}
	  ]
	},
	{
	  id: '1',
	  name: 'Luke Burke 2',
	  messages: [
		{
		  id: "0",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "1",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "2",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "3",
		  text: "lorem ipsum dolor sit amet",
		}
	  ]
	},
	{
	  id: '2',
	  name: 'Luke Burke 3',
	  messages: [
		{
		  id: "0",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "1",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "2",
		  text: "lorem ipsumt",
		  direction: "out",
		},
		{
		  id: "3",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "4",
		  text: "lorem ipsum dolor sit amet lipsum dolor sit amet lamet lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "5",
		  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis ligula enim, vel vulputate magna hendrerit eget. Morbi diam ante, gravida in pretium gravida, dictum sit amet nunc. Sed felis magna, feugiat quis finibus eget, venenatis at ex. Suspendisse interdum sed augue a porta. Etiam commodo id turpis at lobortis. Suspendisse blandit erat est, quis malesuada ex euismod ac. Morbi ac ipsum ante. Integer vel neque vitae elit posuere euismod. Aliquam quis libero eu augue porta pellentesque. Vivamus cursus tellus vitae lectus varius malesuada.",
		  direction: "out",
		}
	  ]
	},
	{
	  id: '3',
	  name: 'Luke Burke 4',
	  messages: [
		{
		  id: "0",
		  text: "lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "1",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "2",
		  text: "lorem ipsumt",
		  direction: "out",
		},
		{
		  id: "3",
		  text: "lorem ipsum dolor sit amet",
		},
		{
		  id: "4",
		  text: "lorem ipsum dolor sit amet lipsum dolor sit amet lamet lorem ipsum dolor sit amet",
		  direction: "out",
		},
		{
		  id: "5",
		  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis ligula enim, vel vulputate magna hendrerit eget. Morbi diam ante, gravida in pretium gravida, dictum sit amet nunc. Sed felis magna, feugiat quis finibus eget, venenatis at ex. Suspendisse interdum sed augue a porta. Etiam commodo id turpis at lobortis. Suspendisse blandit erat est, quis malesuada ex euismod ac. Morbi ac ipsum ante. Integer vel neque vitae elit posuere euismod. Aliquam quis libero eu augue porta pellentesque. Vivamus cursus tellus vitae lectus varius malesuada.",
		  direction: "out",
		}
	  ]
	},
  
  ]

interface IInboxSelected {
	inboxId: number | string,
	userId: string,
	name: string,
	channel: number | string,
	type: InboxType
}

interface IInbox {
	items: IUserInboxItem[] | null,
	isLoading: boolean
}

export default function ChatPage(props) {
	const { user } = useContext(AuthContext)
	const confirmDialog = useContext(ConfirmDialogContext)

	const [inboxSelected, setInboxSelected] = useState<IInboxSelected | null>(null)

	const [inbox, setInbox] = useState<IInbox | null>(null)
	
	// const inboxSMS = useInboxSMS(inboxSelected && inboxSelected.type === 'sms' ? inboxSelected.inboxId : null)
	// console.log(inboxSMS)
	const teamInboxes = useTeamInboxes()
	// const userInbox = useInbox(inboxSelected?.inboxId, inboxSelected?.type)

	// console.log(userInbox)
	const teamMembers = useTeamMembers()

	

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

	useEffect(() => {
		if(!inboxSelected)
			return

		const getMethod = inboxSelected.type === 'dm' ? getInboxDM : getInboxSMS

		setInbox({ items: null, isLoading: true})

		getMethod(inboxSelected.inboxId)
			.then((data: [IUserInboxAPI[], IPaginationApi]) => {
				const inbox = data[0]
					.map((inbox: IUserInboxAPI) => ({
						id: inbox.team_contact.team_contact_id,
						name: inbox.team_contact.first_name + ' ' + inbox.team_contact.last_name,
						profile_img: inbox.team_contact.profile_image,
						type: inbox.last_message.message_type === 'sms' ? 'sms' : 'dm',
						from: inbox.last_message.from,
						preview: inbox.last_message.last_message_preview,
						time: inbox.last_message.last_received_time
					}))

				console.log(inbox)

				setInbox({ items: inbox, isLoading: false})
			})
	}, [inboxSelected])

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

	const onClickChatListItem = (id: string | number) => {
		console.log(id)
		// let index = 0
		// const conv = conversationViewer.filter(conv => conv?.id === conversation.id && conversation)
		// if (conv.length === 0) {

		// 	setConversationViewer([conversation, ...conversationViewer])
		// } else {
		// 	// index = conversationViewer.indexOf(conversation)
		// 	// console.log(conv)
		// }
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

	const onFilterSelected = (item, itemIndex, index) => {
		if(!teamInboxes.items || !teamMembers.items)
			return

		console.log(teamMembers.items)
		console.log(teamInboxes.items)
		// console.log(item, itemIndex, index)

		const inbox = teamInboxes.items?.find(inbox => inbox.id === item.id)
		console.log(inbox)

		if(!inbox)
			return

		const teamMember = teamMembers.items?.find(teamMember => {
		const fullName = `${teamMember.first_name} ${teamMember.last_name}`
		return inbox.name.includes(fullName)
		})

		console.log(teamMember)

		if(!teamMember)
			return


		// const get = inbox.type === 'dm' ? getInboxDM : getInboxSMS

		// get(inbox.id)
		//   .then(res => console.log(res))
		//   .catch(err => console.log(err))
		const selected: IInboxSelected = {
			inboxId: inbox.id,
			userId: teamMember.id,
			name: inbox.name,
			channel: inbox.channel,
			type: inbox.type
		}

		console.log(selected)

		setInboxSelected(selected)
	}
  

	const filters = useMemo(() => {
		return [
			{
				id: 'inboxes',
				name: 'Inboxes',
				items: teamInboxes?.items?.map(inbox => ({ 
					id: inbox.id,
					name: `${inbox.name} (${inbox.type})`,
					isSelected: inboxSelected?.inboxId === inbox.id
				}))
			}
		]
	}, [teamInboxes, inboxSelected])

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
          onFilterSelected={onFilterSelected}
        />
        <Panel hideHeader sx={{ minWidth: 0, overflow: 'hidden' }}>
          <Grid container flex={1} flexWrap='nowrap' >

            <ChatInbox
			  name={inboxSelected?.name}
			  channel={inboxSelected?.channel}
              filterOpen={displayFilters}
              items={inbox?.items}
			  isLoading={inbox?.isLoading}
              onChatSearch={onChatSearch}
              onChatSearchClear={onChatSearchClear}
              onChatClick={onClickChatListItem}
              onArchiveConversation={onArchiveConversation}
              onBackClick={onBackClick}
            />

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
                      '::-webkit-scrollbar': {
                        height: '8px',
                        background: 'transparent',
                      },
                      '::-webkit-scrollbar-thumb': {
                        background: (theme) => theme.palette.grey[400],
                        borderRadius: '4px',
                      }
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