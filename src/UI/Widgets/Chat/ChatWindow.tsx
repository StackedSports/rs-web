import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
	Stack,
	Paper,
	Avatar,
	Typography,
	IconButton,
} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';

import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


import { ChatInput } from './ChatInput';
import { MessagesDisplay } from './MessagesDisplay';
import { useInboxConversationInfinte } from 'Api/ReactQuery'
import { IConversationControl } from 'Pages/Chat/ChatPage';

import { formatPhoneNumber } from 'utils/Parser'

interface ChatWindowProps {
	index: number;
	conversationControl: IConversationControl;
	onCloseConversation: (conversationControl: IConversationControl) => void;
	isPinned?: boolean;
	onPin?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {

	const infinity = useInboxConversationInfinte({
		contact_id: props.conversationControl.contact_id,
		inbox_type: props.conversationControl.inbox_type,
		user_id: props.conversationControl.user_id
	})


	useEffect(() => {
		console.log("infinity items", infinity.items)
	}, [infinity.items])

	const loadNextPageMessages = () => {
		console.log("next page")
		if (infinity.isFetchingNextPage) return
		infinity.fetchNextPage()
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

	return (
		<>
			<Draggable
				draggableId={props.conversationControl.id}
				index={props.index}
				isDragDisabled={props.isPinned}
			>
				{(provided) => (
					<Paper
						{...provided.draggableProps}
						sx={{
							height: '100%',
							minHeight: 0,
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: '#fbfbfb'
						}}
						ref={provided.innerRef}
					>

						<Stack //header
							{...provided.dragHandleProps}
							p='20px'
							bgcolor={props.isPinned ? "#3871DAAA" : '#3871DAFF'}
							direction="row"
							flexWrap="nowrap"
							alignItems="center"
							gap={2}
							color="#fff"
							sx={{ userSelect: 'none' }}
						>
							<IconButton onClick={() => props.onPin && props.onPin()} color='inherit' size='small'>
								{props.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
							</IconButton>

							<Avatar style={{
								width: "38px",
								height: "38px",
							}}
								aria-label="avatar"
								src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
							/>
							<Stack>
								<Typography fontWeight={600}>
									{props.conversationControl.contact_name}
								</Typography>
								<Typography variant="subtitle2" >
									{from}
								</Typography>
							</Stack>

							<IconButton onClick={onCloseConversation} size='small' color='inherit' sx={{ ml: 'auto' }} >
								<CloseIcon />
							</IconButton>
						</Stack>

						<MessagesDisplay
							messages={infinity.items}
							actions={actionOptions}
							onScrollEnd={loadNextPageMessages}
							loading={infinity.isFetching}
						/>
						<ChatInput />
					</Paper>
				)}
			</Draggable>
		</>
	)
}

export default ChatWindow;