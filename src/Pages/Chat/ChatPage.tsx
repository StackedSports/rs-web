import React, { useState, useContext, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

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
import useSearchParams from 'Hooks/SearchParamsHook';

interface IInboxSelected {
	team_member_id: number,
	team_member_profile_image: string,
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
	isPinned: boolean,
	contact_profile_image: string,
	coach_profile_image: string,
}

const serializeInbox = (Inbox: IInboxSelected) => {
	return Object.values(Inbox).join(';')
}

const deserializeInbox = (urlParamsString: string | null) => {
	//it must be in this order
	if (!urlParamsString) return null

	const InboxKeys = ['team_member_id', 'team_member_profile_image', 'userId', 'name', 'channel', 'type']

	const values = urlParamsString.split(';')

	//@ts-ignore
	const newInbox: IInboxSelected = InboxKeys.reduce((prev, cur, index) => ({ ...prev, [cur]: values[index] }), {})
	return newInbox
}

export default function ChatPage() {
	const { user } = useContext(AuthContext)
	const confirmDialog = useContext(ConfirmDialogContext)
	const { searchParams, setSearchParams } = useSearchParams()
	const inboxSelected = useMemo(() => deserializeInbox(searchParams.get('inbox')), [searchParams])

	//const [inboxSelected, setInboxSelected] = useState<IInboxSelected | null>(null)
	const inbox = useInbox(inboxSelected?.team_member_id, inboxSelected?.type)

	const teamInboxes = useTeamInboxes()

	// console.log(userInbox)
	const teamMembers = useTeamMembers()

	const KEY_LOCAL_STORAGE_PIN = `${user?.id}${inboxSelected?.team_member_id}`
	const [pinnedChats, setPinnedChats] = useLocalStorage<[string, IConversationControl[]][]>('pinnedConversations', [])
	const [selectedConversationControl, setSelectedConversationControl] = useState<IConversationControl[]>([])

	const [displayFilters, setDisplayFilters] = useState(true)

	const pinnedChatsMap = useMemo(() => {
		return new Map(pinnedChats)
	}, [pinnedChats])

	// Load pinned conversations based on user and inbox selected
	useEffect(() => {
		if (user && inboxSelected)
			setSelectedConversationControl(pinnedChatsMap.get(KEY_LOCAL_STORAGE_PIN) || [])
	}, [user, inboxSelected])

	//SAVE PINNED CONVERSATIONS IN LOCAL STORAGE
	useEffect(() => {
		if (user && inboxSelected) {
			const pinned = selectedConversationControl.filter(conversations => conversations.isPinned)
			pinnedChatsMap.set(KEY_LOCAL_STORAGE_PIN, pinned)
			setPinnedChats([...pinnedChatsMap])
		}
	}, [user, inboxSelected, selectedConversationControl, setPinnedChats])

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
		const newConversationControl: IConversationControl = {
			id: conversationId,
			contact_id: chatListItem.contact_id,
			contact_name: chatListItem.name,
			from: chatListItem.from,
			inbox_type: chatListItem.type,
			user_id: inboxSelected.team_member_id,
			isPinned: false,
			coach_profile_image: inboxSelected.team_member_profile_image,
			contact_profile_image: chatListItem.profile_img,
		}
		const conv = selectedConversationControl.find(conv => conv.id === conversationId)
		if (conv) {
			setSelectedConversationControl(prev => prev.filter(conv => conv.id !== conversationId))
		} else {
			setSelectedConversationControl(prev => [newConversationControl, ...prev])
		}
	}

	const onCloseConversation = (conversation: IConversationControl) => {
		const index = selectedConversationControl.indexOf(conversation)
		selectedConversationControl.splice(index, 1)
		setSelectedConversationControl([...selectedConversationControl])
	}


	const onArchiveConversation = (conversation: IConversationControl) => {
		const title = "Archive Conversation"
		confirmDialog.show(title, "Are you sure you would like to archive this conversation? ", () => {
			console.log("archiveConversation", conversation)

		})
	}

	const onTogglePin = (conversation: IConversationControl) => {

		setSelectedConversationControl(prev => {
			const newControl = [...prev]
			const index = prev.indexOf(conversation)
			if (index == -1)
				return prev

			newControl[index] = { ...prev[index], isPinned: !prev[index].isPinned }
			return newControl
		})
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

	const onFilterSelected = (item: Pick<ISideFilter, 'id'>, itemIndex: number, filterIndex: number) => {

		const type = filterIndex === 0 ? 'dm' : 'sms'

		if (!teamInboxes.items || !teamMembers.items)
			return

		const inbox = teamInboxes.items?.find(inbox => inbox.team_member_id == item.id && inbox.type === type)

		if (!inbox)
			return

		const teamMember = teamMembers.items?.find(teamMember => {
			const fullName = `${teamMember.first_name} ${teamMember.last_name}`
			return inbox.name.includes(fullName)
		})

		if (!teamMember)
			return

		const selected: IInboxSelected = {
			team_member_id: inbox.team_member_id,
			team_member_profile_image: teamMember.twitter_profile.profile_image,
			userId: teamMember.id,
			name: inbox.name,
			channel: type === 'sms' ? inbox.channel : teamMember.twitter_profile.screen_name,
			type: inbox.type
		}

		setSearchParams({ inbox: serializeInbox(selected) }, inboxSelected === null)

		//console.log("Selected inbox", selected)

		//setInboxSelected(selected)
		setSelectedConversationControl([])
	}

	const filters = useMemo(() => {
		return [
			{
				id: 'inboxes-dm',
				name: 'Twitter DM',
				items: teamInboxes?.items?.filter(inbox => inbox.type === 'dm')
					.map(inbox => ({
						id: inbox.team_member_id,
						name: inbox.name,
						isSelected: inboxSelected?.team_member_id === inbox.team_member_id
							&& inboxSelected.type === inbox.type
					}))
			},
			{
				id: 'inboxes-sms',
				name: 'Stacked Text',
				items: teamInboxes?.items?.filter(inbox => inbox.type === 'sms')
					.map(inbox => ({
						id: inbox.team_member_id,
						name: inbox.name,
						isSelected: inboxSelected?.team_member_id === inbox.team_member_id
							&& inboxSelected.type === inbox.type
					}))
			}
		]
	}, [teamInboxes, inboxSelected])

	useEffect(() => {
		if (!inboxSelected && teamInboxes.items) {
			const item = teamInboxes.items.at(0)
			if (item) {
				const id = item.team_member_id
				const typeIndex = item.type === 'dm' ? 0 : 1
				onFilterSelected({ id: id }, 0, typeIndex)
			}
		}
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
							type={inboxSelected?.type}
							channel={inboxSelected?.channel}
							filterOpen={displayFilters}
							items={inbox?.items}
							isLoading={inbox?.isLoading}
							conversationControl={selectedConversationControl}
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
										{selectedConversationControl.sort((a, b) => Number(b.isPinned) - Number(a.isPinned)).map((conversation, index) => (
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