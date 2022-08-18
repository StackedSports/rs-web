import { useState, useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';

import ContactMediaPreview from './ContactMediaPreview';
import ContactMessageStats from './ContactMessageStats';
import ContactMediaDetails from './ContactMediaDetails';
import { Box, Button, IconButton, Paper, Slide, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ContactMessageDetails = (props) => {
	const containerRef = useRef(null);
	const [open, setOpen] = useState(false);

	const onViewMore = (id, containerVisible) => {
		setOpen(!open)
	}

	const urlsSentMedia = props.sentMedias.map(media => media.urls?.original)

	const urlsAssociatedMedia = props.associatedMedias.map(media => media.url?.original)

	return (
		<Stack
			sx={{ width: "300px", borderLeft: "#efefef  1px solid", position: "relative" }}
			alignItems="center"
			justifyContent="start"
			pl={1}
			ref={containerRef}
		>
			<Stack gap={2} flex={1} sx={{ height: '100%' }}>
				<ContactMessageStats stats={props.stats.item} loading={props.stats.loading} />
				<ContactMediaPreview
					id="sentMedia"
					title="Sent Media"
					onViewMore={onViewMore}
					media={urlsSentMedia}
				/>
				<ContactMediaPreview
					id="associated"
					title="Associated Media"
					onViewMore={onViewMore}
					media={urlsAssociatedMedia}
				/>
			</Stack>

			<Slide in={open} container={containerRef.current} direction="left" mountOnEnter unmountOnExit>
				<Box
					sx={{
						position: 'absolute',
						width: '100%',
						top: 0,
						bottom: 0,
						minHeight: 0,
						overflowY: 'auto',
					}}
					elevation={0}
					component={Paper}
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center' px={2} >
						<IconButton onClick={() => setOpen(false)}>
							<ArrowBackIcon />
						</IconButton>
						<Typography fontWeight='bold' >
							Associated Media
						</Typography>
					</Stack>
					<Box sx={{ width: '100px', bgcolor: '#f0f', height: '200px', my: 2 }}>
						oi
					</Box>
					<Box sx={{ width: '100px', bgcolor: '#f00', height: '200px', my: 2 }}>
						oi
					</Box>
					<Box sx={{ width: '100px', bgcolor: '#f0f', height: '200px', my: 2 }}>
						oi
					</Box>
					<Box sx={{ width: '100px', bgcolor: '#f00', height: '200px', my: 2 }}>
						oi
					</Box>
					<Box sx={{ width: '100px', bgcolor: '#f00', height: '200px', my: 2 }}>
						oi
					</Box>
					<Box sx={{ width: '100px', bgcolor: '#f64', height: '200px', my: 2 }}>
						oi
					</Box>
				</Box>
			</Slide>
		</Stack>
	)
}

export default ContactMessageDetails;