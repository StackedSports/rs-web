import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import lodash from 'lodash'

import { Grid } from "@mui/material";

import Page, { Content } from 'UI/Layouts/Page';
import Panel from 'UI/Layouts/Panel';
import TopBar from 'UI/Layouts/TopBar';
import SideBar from 'UI/Layouts/SideBar';
import SideFilter from 'UI/Widgets/SideFilter';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AuthContext } from 'Context/Auth/AuthProvider';
import { ChatWindow, ChatInbox } from 'UI/Widgets/Chat';

import { useTeamInboxes, useInbox, useTeamMembers } from 'Api/ReactQuery'

import { InboxType, ISideFilter, IUserInboxItem } from "Interfaces"

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
	team_member_id: number,
	userId: string,
	name: string,
	channel: number | string,
	type: InboxType
}

export interface IConversationControl {
	id: string,
	contact_id: string,
	contact_name: string,
	from: string,
	inbox_type: InboxType,
	user_id: number,
	isPinned?: boolean
}

export default function ChatPage() {
	const { user } = useContext(AuthContext)
	const confirmDialog = useContext(ConfirmDialogContext)

	const [inboxSelected, setInboxSelected] = useState<IInboxSelected | null>(null)
	const inbox = useInbox(inboxSelected?.team_member_id, inboxSelected?.type)

	// console.log(inboxSMS)
	const teamInboxes = useTeamInboxes()

	// console.log(userInbox)
	const teamMembers = useTeamMembers()

	const [pinnedChats, setPinnedChats] = useLocalStorage<[string, IConversationControl[]][]>('pinnedConversations', [])

	const [displayFilters, setDisplayFilters] = useState(true)
	const [selectedConversationControl, setSelectedConversationControl] = useState<IConversationControl[]>([])

	const pinnedChatsMap = useMemo(() => {
		console.log("pinnedChats", pinnedChats)
		return new Map(pinnedChats)
	}, [pinnedChats])

	useEffect(() => {
		if (user && inboxSelected) {
			const pinned = pinnedChatsMap.get(`${user.id}${inboxSelected.team_member_id}`)
			console.log("mudou os pinados", pinned)
			if (pinned) {
				setSelectedConversationControl(prev => {
					const newControl = lodash.differenceBy(prev, pinned, 'id')
					console.log("dife", newControl)
					return [...pinned, ...newControl]
				})
			}
		}
	}, [user, inboxSelected, pinnedChatsMap, setSelectedConversationControl])

	useEffect(() => {
		console.log("selectec control", selectedConversationControl)
	}, [selectedConversationControl])

	/* 	const isPinned = useCallback((conversation) => {
			if (user && inboxSelected) {
				const pinnedConversations = pinnedChatsMap.get(`${user.id}${inboxSelected.team_member_id}`)
				return pinnedConversations?.includes(conversation)
			} else
				return false
		}, [pinnedChatsMap, user]) */

	const onTopActionClick = () => {
		console.log("onTopActionClick")
	}

	const onBackClick = () => {
		console.log("onBackClick")
		setDisplayFilters(!displayFilters)
	}

	const onClickChatListItem = (chatListItem: IUserInboxItem) => {
		if (!inboxSelected)
			return

		// user_id -> inbox_id
		// contact_id -> team_contact_id
		// inbox_type -> sms | dm 

		//console.log("chat list item", chatListItem)
		//console.log("inbox", inboxSelected)

		const conversationId = chatListItem.contact_id + chatListItem.from + inboxSelected.userId
		const newConversationControl = {
			id: conversationId,
			contact_id: chatListItem.contact_id,
			contact_name: chatListItem.name,
			from: chatListItem.from,
			inbox_type: chatListItem.type,
			user_id: inboxSelected.team_member_id,
			isPinned: false
		}
		const conv = selectedConversationControl.find(conv => conv.id === conversationId)
		if (conv) {
			setSelectedConversationControl(prev => prev.filter(conv => conv.id !== conversationId))
		} else {
			setSelectedConversationControl(prev => ([newConversationControl, ...prev]))
		}
	}

	const onCloseConversation = (conversation: IConversationControl) => {
		const index = selectedConversationControl.indexOf(conversation)
		selectedConversationControl.splice(index, 1)
		setSelectedConversationControl([...selectedConversationControl])
	}

	const onChatSearch = (searchTerm: string) => {
		console.log("onChatSearch", searchTerm)
	}

	const onChatSearchClear = () => {
		console.log("onChatSearchClear")
	}

	const onArchiveConversation = (conversation: IConversationControl) => {
		const title = "Archive Conversation"
		confirmDialog.show(title, "Are you sure you would like to archive this conversation? ", () => {
			console.log("archiveConversation", conversation)

		})
	}

	const onTogglePin = (conversationControl: IConversationControl) => {

		if (!user || !inboxSelected) return
		const KEY = `${user.id}${inboxSelected.team_member_id}`
		//console.log("conversation toggle", conversationControl)
		const newConversationControl = { ...conversationControl, isPinned: !conversationControl.isPinned }
		//console.log("new conversation toggle", newConversationControl)
		
		//atualizar quando despina 
		let pinnedConversations = pinnedChatsMap.get(KEY) || []

		if (conversationControl.isPinned) {
			pinnedConversations = pinnedConversations.filter(pinned => pinned.id !== conversationControl.id)
		} else {
			pinnedConversations.push(newConversationControl)
		}
		pinnedChatsMap.set(KEY, pinnedConversations)
		setPinnedChats([...pinnedChatsMap])

	}

	const reorder = (list: IConversationControl[], startIndex: number, endIndex: number) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		// dropped outside the list
		if (!destination)
			return;

		if (destination.index === source.index)
			return;

		setSelectedConversationControl(reorder(selectedConversationControl, source.index, destination.index))
	}

	const onFilterSelected = (item: ISideFilter) => {

		if (!teamInboxes.items || !teamMembers.items)
			return

		const inbox = teamInboxes.items?.find(inbox => inbox.team_member_id == item.id)
		//console.log("inbox", inbox)

		if (!inbox)
			return

		const teamMember = teamMembers.items?.find(teamMember => {
			const fullName = `${teamMember.first_name} ${teamMember.last_name}`
			return inbox.name.includes(fullName)
		})
		//console.log("team member", teamMember)


		if (!teamMember)
			return

		const selected: IInboxSelected = {
			team_member_id: inbox.team_member_id,
			userId: teamMember.id,
			name: inbox.name,
			channel: inbox.channel,
			type: inbox.type
		}

		//console.log("Selected inbox", selected)
		setInboxSelected(selected)
		setSelectedConversationControl([])
	}


	const filters = useMemo(() => {
		return [
			{
				id: 'inboxes-sms',
				name: 'Twitter DM',
				items: teamInboxes?.items?.filter(inbox => inbox.type === 'dm')
					.map(inbox => ({
						id: inbox.team_member_id,
						name: inbox.name,
						isSelected: inboxSelected?.team_member_id === inbox.team_member_id
					}))
			},
			{
				id: 'inboxes-dm',
				name: 'Stacked Text',
				items: teamInboxes?.items?.filter(inbox => inbox.type === 'sms')
					.map(inbox => ({
						id: inbox.team_member_id,
						name: inbox.name,
						isSelected: inboxSelected?.team_member_id === inbox.team_member_id
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
								{(provided) => (
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
										{selectedConversationControl.map((conversation, index) => (
											<ChatWindow
												isPinned={conversation.isPinned}
												index={index}
												key={conversation.id}
												conversationControl={conversation}
												onCloseConversation={onCloseConversation}
												onPin={() => onTogglePin(conversation)}
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