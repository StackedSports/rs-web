import { useState, useRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';

import ContactMediaPreview from './ContactMediaPreview';
import ContactMessageStats from './ContactMessageStats';
import ContactMediaDetails from './ContactMediaDetails';

const ContactMessageDetails = (props) => {
	const self = useRef(null)
	const [contentHeight, setContentHeight] = useState(null)
	const [selectedMedia, setSelectedMedia] = useState("");
	const [visibleContainer, setVisibleContainer] = useState("preview");

	useEffect(() => {
		if (!self.current)
			return

		setContentHeight(self.current.clientHeight)
	}, [self.current])

	const onViewMore = (id, containerVisible) => {
		setSelectedMedia(id)
		setVisibleContainer(containerVisible)
	}

	const urlsSentMedia = props.contact?.sent_media?.map(media => media.urls?.original)

	const urlsAssociatedMedia = props.contact?.associated_media?.map(media => media.urls?.original)

	return (
		<Stack ref={self} 
		  sx={{ width: "300px", borderLeft: "#efefef  1px solid" }} 
		  alignItems="center" 
		  justifyContent="start"
		  pl={1}
		>
			<Collapse flex={1} in={visibleContainer === "preview"} sx={{ height: '100%', display: 'flex' }}>
				<Stack spacing={2} flex={1} sx={{ height: '100%' }}>
					<ContactMessageStats />
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
			</Collapse>
			<Collapse in={visibleContainer === "containerMedia"}>
				{selectedMedia === 'sentMedia' &&
					<ContactMediaDetails
						title="Sent Media"
						height={contentHeight}
						media={urlsSentMedia}
						setVisibleContainer={setVisibleContainer}
					/>
				}
				{selectedMedia === 'associated' &&
					<ContactMediaDetails
						title="Associated Media"
						height={contentHeight}
						media={urlsAssociatedMedia}
						setVisibleContainer={setVisibleContainer}
					/>
				}
			</Collapse>
		</Stack>
	)
}

export default ContactMessageDetails;