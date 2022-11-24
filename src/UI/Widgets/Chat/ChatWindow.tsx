import React, { useMemo } from 'react';
import {
	Stack,
	Paper,
	Avatar,
	Typography,
	IconButton,
	Link
} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';

import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import SmsIcon from '@mui/icons-material/Sms';


import { ChatInput } from './ChatInput';
import { MessagesDisplay } from './MessagesDisplay';
import { useConversationMutation, useInboxConversationInfinty } from 'Api/ReactQuery'
import { IConversationControl } from 'Pages/Chat/ChatPage';

import { formatPhoneNumber } from 'utils/Parser'
import { Link as RouterLink } from 'react-router-dom';
import { contactsRoutes } from 'Routes/Routes';

interface ChatWindowProps {
	index: number;
	conversationControl: IConversationControl;
	onCloseConversation: (conversationControl: IConversationControl) => void;
	isPinned?: boolean;
	onPin?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {

	const messages = useInboxConversationInfinty({
		contact_id: props.conversationControl.contact_id,
		inbox_type: props.conversationControl.inbox_type,
		user_id: props.conversationControl.user_id
	})

	const sendMessage = useConversationMutation()

	const loadNextPageMessages = () => {
		if (messages.hasNextPage && !messages.isFetching) {
			messages.fetchNextPage()
		}
	}

	const onCloseConversation = () => {
		props.onCloseConversation(props.conversationControl)
	}

	const onSyncMessageClick = () => {

	}

	const onExportCSV = () => {

	}

	const onArchiveMessage = () => {

	}

	const actionOptions = [
		{ name: 'Sync with CRM', onClick: onSyncMessageClick },
		{ name: 'Export as CSV', onClick: onExportCSV },
		{ name: 'Archive', onClick: onArchiveMessage, color: "red" },
	]

	const from = useMemo(() => {
		const { from, inbox_type } = props.conversationControl

		if (inbox_type === 'sms')
			return formatPhoneNumber(from)
		else
			return `@${from}`
	}, [props.conversationControl])

	const PlatformIcon = props.conversationControl.inbox_type === 'sms' ? SmsIcon : TwitterIcon

	const handleSendMessage = (message: string, media: { type: 'media' | 'placeholder', item: any }) => {
		if (props.conversationControl.inbox_type !== 'sms') return
		sendMessage.mutate({
			team_contact_id: props.conversationControl.contact_id,
			message: message,
			media: media?.item?.id,
			type: props.conversationControl.inbox_type,
			user_id: props.conversationControl.user_id
		})
	}

	return (
		<>
			<Draggable
				draggableId={props.conversationControl.id}
				index={props.index}
				isDragDisabled={props.conversationControl.isPinned}
			>
				{(provided) => (
					<Paper
						{...provided.draggableProps}
						sx={{
							height: '100%',
							minHeight: 0,
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: 'background.secondary'
						}}
						ref={provided.innerRef}
					>

						<Stack //header
							{...provided.dragHandleProps}
							p='20px'
							bgcolor={props.conversationControl.isPinned ? "#3871DAAA" : '#3871DAFF'}
							direction="row"
							flexWrap="nowrap"
							alignItems="center"
							gap={2}
							color="#fff"
							sx={{ userSelect: 'none' }}
						>
							<IconButton onClick={() => props.onPin && props.onPin()} color='inherit' size='small'>
								{props.conversationControl.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon sx={{ transform: 'rotate(30deg)' }} />}
							</IconButton>

							<Avatar style={{
								width: "38px",
								height: "38px",
							}}
								aria-label="avatar"
								src={props.conversationControl.contact_profile_image}
							/>
							<Stack flex={1}>

								<Stack direction='row' gap={1} alignItems='center'>
									<Link
										color={'common.white'}
										underline="hover"
										component={RouterLink}
										to={`${contactsRoutes.profile}/${props.conversationControl.contact_id}`}
									>
										<Typography fontWeight={600}>
											{props.conversationControl.contact_name}
										</Typography>
									</Link>
									<PlatformIcon sx={{ fontSize: '1em' }} />
								</Stack>

								<Typography variant="subtitle2" >
									{from}
								</Typography>
							</Stack>

							{/* <PlatformIcon sx={{fontSize:'1em', marginRight: '8px'}}/> */}

							<IconButton onClick={onCloseConversation} size='small' color='inherit' sx={{ ml: 'auto' }} >
								<CloseIcon />
							</IconButton>
						</Stack>

						<MessagesDisplay
							messages={messages.items}
							contact_profile_image={props.conversationControl.contact_profile_image}
							coach_profile_image={props.conversationControl.coach_profile_image}
							actions={actionOptions}
							onLoadMore={loadNextPageMessages}
							loading={messages.isLoading}
							hasMore={messages.hasNextPage || messages.isLoading}
						/>

						<ChatInput onSendMessage={handleSendMessage} />
					</Paper>
				)}
			</Draggable>
		</>
	)
}

export default ChatWindow;