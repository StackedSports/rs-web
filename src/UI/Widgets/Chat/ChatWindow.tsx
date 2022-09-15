import React, { useState, useRef, useMemo, useCallback } from 'react';
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
import { useInboxConversation } from 'Api/ReactQuery/Chat'
import { IConversationControl } from 'Pages/Chat/ChatPage';

import { formatDate, formatPhoneNumber } from 'utils/Parser'

interface ChatWindowProps {
    index: number;
    conversationControl: IConversationControl;
    onCloseConversation: (conversationControl: IConversationControl) => void;
    isPinned?: boolean;
    onPin?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {

	const conversations = useInboxConversation(props.conversationControl.contact_id,
		props.conversationControl.inbox_type,
		props.conversationControl.user_id
	)

	console.log("open conversation", props.conversationControl)


	const onCloseConversation = () => {
		props.onCloseConversation(props.conversationControl)
	}

	/* 
		const onTextAreaChange = (value) => {
		setTextMessage(value)
		}
	
		const onAddImage = (item, type) => {
		setMediaSelected({
			item,
			type
		})
		setMediaRemoved('')
		setShowMediaDialog(false)
		}
	
		const onRemoveMedia = (e) => {
		e.stopPropagation()
		setMediaRemoved(mediaSelected.item.id)
		setMediaSelected(null)
		}
	
		const replaceTextSelectionWith = (substring) => {
		let start = chatInputRef.current.selectionStart
		let end = chatInputRef.current.selectionEnd
	
		return stringSplice(textMessage, start, start - end, substring)
		} */

	/*  const onAddSnippet = (snippet) => {
		setTextMessage(replaceTextSelectionWith(snippet.content))
		chatInputRef.current.focus();
	}
	
	const onAddTextPlaceholder = (placeholder) => {
		setTextMessage(replaceTextSelectionWith(`[${placeholder}]`))
		chatInputRef.current.focus();
	}
	
	const onActionClick = () => {
		setClickActionButton(true)
	}
	
	const onCancelClick = () => {
		setCheckedMessages([])
		setClickActionButton(false)
	} */

	const onSyncMessageClick = () => {

	}

	const onExportCSV = () => {

	}

	const onArchiveMessage = () => {

	}

	/*   const onCheckMessages = (message) => {
		checkedMessages.includes(message) ?
			setCheckedMessages(checkedMessages.filter(m => m !== message)) :
			setCheckedMessages([...checkedMessages, message])
		}
	
		const isMessageChecked = useCallback((message) => {
		return checkedMessages.includes(message)
		}, [checkedMessages]) */

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
								width: "34px",
								height: "34px",
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

						<ChatInput />
						<MessagesDisplay messages={conversations.items} actions={actionOptions} />
					</Paper>
				)}
			</Draggable>
		</>
	)
}

export default ChatWindow;