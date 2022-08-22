import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useContactAssociatedMedia, useContactSentMedia, useContactStats } from 'Api/ReactQuery';
import lodash from 'lodash';

import ContactMediaPreview from './ContactMediaPreview';
import ContactMessageStats from './ContactMessageStats';
import Stack from '@mui/material/Stack';
import { Box, Button, IconButton, Paper, Slide, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ContactMessageDetails = (props) => {
	const associatedMedias = useContactAssociatedMedia(props.contact?.id, 1, 30)
	const sentMedias = useContactSentMedia(props.contact?.id, 1, 30)
	const contactStats = useContactStats(props.contact?.id)
	const containerRef = useRef(null);
	const [open, setOpen] = useState(false);

	const [loadedSentMedias, setLoadedSentMedias] = useState([]);
	const [loadedAssociatedMedias, setLoadedAssociatedMedias] = useState([]);
	const [expandedMedia, setExpandedMedia] = useState(null);

	useEffect(() => {
		if (!sentMedias.loading) {
			setLoadedSentMedias(prev => {
				const page = sentMedias.pagination.currentPage;
				const data = sentMedias.items
				prev[page] = data;
				return prev;
			})
		}
	}), [sentMedias.loading, setLoadedSentMedias, sentMedias.items, sentMedias.pagination.currentPage];

	useEffect(() => {
		if (!associatedMedias.loading) {
			setLoadedAssociatedMedias(prev => {
				const page = associatedMedias.pagination.currentPage;
				const data = associatedMedias.items
				prev[page] = data;
				return prev;
			})
		}
	}), [associatedMedias.loading, setLoadedAssociatedMedias, associatedMedias.items, associatedMedias.pagination.currentPage];

	const sentMediasUrl = (() => {
		const medias = Object.values(loadedSentMedias).flat();
		const urls = medias.map(media => media.urls);
		return urls;
	})()

	const associatedMediasUrl = (() => {
		const medias = Object.values(loadedAssociatedMedias).flat();
		const urls = medias.map(media => media.urls);
		return urls;
	})();

	const onViewMore = (id, containerVisible) => {
		setExpandedMedia(id);
		setOpen(!open)
	}

	const handleOnScrollEnd = () => {
		console.log("scrolled to bottom")
		const pagination = expandedMedia === "associated" ? associatedMedias.pagination : sentMedias.pagination;
		const loading = expandedMedia === "associated" ? associatedMedias.loading : sentMedias.loading;

		const { currentPage, totalPages, getPage } = pagination;
		if (currentPage < totalPages && !loading) {
			console.log("fetching next page")
			getPage(currentPage + 1)
		}
	}

	return (
		<Stack
			sx={{ width: "300px", borderLeft: "#efefef  1px solid", position: "relative" }}
			alignItems="center"
			justifyContent="start"
			pl={1}
			ref={containerRef}
		>
			<Stack gap={2} flex={1} sx={{ height: '100%' }}>
				<ContactMessageStats stats={contactStats.item} loading={contactStats.loading} />
				<ContactMediaPreview
					id="sentMedia"
					title="Sent Media"
					onViewMore={onViewMore}
					media={sentMediasUrl}
					limit={2}
					total={sentMedias.pagination.totalItems}
				/>
				<ContactMediaPreview
					id="associated"
					title="Associated Media"
					onViewMore={onViewMore}
					media={associatedMediasUrl}
					limit={2}
					total={associatedMedias.pagination.totalItems}
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
						display: 'flex',
						flexDirection: 'column',
					}}
					elevation={0}
					component={Paper}
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center' px={2} mb={1} >
						<IconButton onClick={() => setOpen(false)}>
							<ArrowBackIcon />
						</IconButton>
						<Typography fontWeight='bold' >
							Associated Media
						</Typography>
					</Stack>
					<ContactMediaPreview
						id="all"
						title={expandedMedia === "associated" ? "Associated Media" : "Sent Media"}
						onViewMore={onViewMore}
						media={expandedMedia === "associated" ? associatedMediasUrl : sentMediasUrl}
						onScrollEnd={handleOnScrollEnd}
						hideHeader
					/>

				</Box>
			</Slide>
		</Stack>
	)
}

export default ContactMessageDetails;