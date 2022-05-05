import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';


import ContactMediaPreview from './ContactMediaPreview';
import ContactMessageStats from './ContactMessageStats';
import ContactMediaDetails from './ContactMediaDetails';

const ContactMessageDetails = (props) => {

	const [selectedMedia, setSelectedMedia] = useState("");
	const [visibleContainer, setVisibleContainer] = useState("preview");

	const itemData = [
		'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=890&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		'https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80',
		'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1617646339087-654bc92e57c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
	]

	const onViewMore = (id, containerVisible) => {
		setSelectedMedia(id)
		setVisibleContainer(containerVisible)
	}

	return (
		<Stack sx={{ width: "300px" }} alignItems="center" justifyContent="start">
			<Collapse in={visibleContainer === "preview"}>
				<Stack spacing={2}>
					<ContactMessageStats />
					<ContactMediaPreview
						id="sentMedia"
						media={itemData}
						title="Sent Media"
						onViewMore={onViewMore}
					// media={contact.sent_media} 
					/>
					<ContactMediaPreview
						id="associated"
						media={itemData}
						title="Associated Media"
						onViewMore={onViewMore}
					// media={contact.associated_media} 
					/>
				</Stack>
			</Collapse>
			<Collapse in={visibleContainer === "containerMedia"}>
				{selectedMedia === 'sentMedia' &&
					<ContactMediaDetails
						media={itemData}
						title="Sent Media"
						/*  media={contact.sent_media} */
						setVisibleContainer={setVisibleContainer}
					/>
				}
				{selectedMedia === 'associated' &&
					<ContactMediaDetails
						media={itemData}
						title="Associated Media"
						/* media={contact.associated_media}  */
						setVisibleContainer={setVisibleContainer}
					/>
				}
			</Collapse>
		</Stack>
	)
}

export default ContactMessageDetails;