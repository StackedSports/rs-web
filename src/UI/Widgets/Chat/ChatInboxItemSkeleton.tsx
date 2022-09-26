import React from 'react';
import { Avatar, ListItem, Skeleton, Stack, Typography } from '@mui/material';

export const ChatInboxItemSkeleton = () => {

	return (
		<ListItem
			sx={{
				padding: "15px",
				position: "relative",
				borderTop: "solid 1px #efefef",
			}}
		>
			<Stack flex={1} direction="row" spacing={2} alignItems="center">
				<Skeleton variant='circular'>
					<Avatar style={{
						width: "56px",
						height: "56px",
					}}
					/>
				</Skeleton>
				<Stack flex={1}>
					<Typography variant="body1" fontWeight='bold'>
						<Skeleton />
					</Typography>
					<Typography variant="body2" color="text.secondary">
						<Skeleton width={'60%'} />
					</Typography>
					<Typography variant="body2" color="text.secondary">
						<Skeleton width={'30%'} />
					</Typography>
				</Stack>
			</Stack>
		</ListItem>
	)
}

export default ChatInboxItemSkeleton