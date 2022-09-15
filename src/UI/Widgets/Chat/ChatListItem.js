import { useState, useMemo } from 'react';
import { Avatar, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import { formatDate, formatPhoneNumber } from 'utils/Parser';
import ArchiveIcon from '@mui/icons-material/Archive';

export const ChatListItem = (props) => {

	const [showIconClose, setShowIconClose] = useState(false)

	const onArchiveConversation = (id) => {
		props.onArchiveConversation(id)
	}

	const date = useMemo(() => {
		//console.log(new Date(props.item.time))

		return formatDate(new Date(props.item.time), 'short', 'short')
	}, [props.item])

	const from = useMemo(() => {
		//console.log(props.item)

		if (props.item.type === 'sms')
			return formatPhoneNumber(props.item.from)
		else
			return `@${props.item.from}`
	}, [props.item])

	return (
		<ListItemButton
			sx={{
				padding: "15px",
				position: "relative",
				borderTop: "solid 1px #efefef",
				// borderBottom: "solid 1px #efefef",
			}}
			key={props.item.id}
			onMouseEnter={() => setShowIconClose(true)}
			onMouseLeave={() => setShowIconClose(false)}
			onClick={() => props.onToggleChat(props.item)}
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
					onClick={(e) => { e.stopPropagation(); onArchiveConversation(props.item.id) }}
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
						{date}
					</Typography>

					<Typography variant="body1" fontWeight='bold'>
						{props.item.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{from}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{`${props.item.preview?.slice(0, 35) || ''}...`}
					</Typography>
				</Stack>
			</Stack>
		</ListItemButton>
	)
}

export default ChatListItem