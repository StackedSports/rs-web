import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import CachedIcon from '@mui/icons-material/Cached';
import ContactMessageStats from './ContactMessageStats';
import ContactSentMedia from './ContactSentMedia';
import ContactAssociatedMedia from './ContactAssociatedMedia';

const ContactMessageDetails = (prosp) => {

	const onRefresh = () => {
		console.log("onRefresh")
	}

	const onViewMore = (id) => {
		// setSelectedMedia(id)
	}

	return (
		<Stack sx={{ width: "300px" }} spacing={1} alignItems="center" justifyContent="center">
			<Stack >
				<ContactMessageStats />
				{/* <ContactMediaPreview
				  id="associated" 
				  media={contact.associated_media} 
				  onViewMore={onViewMore}
				/>
				<ContactMediaPreview media={contact.sent_media}/> */}
				<ContactSentMedia />
				<ContactAssociatedMedia />
			</Stack>
			<Stack >
				{/* {selected === 'associated' && <ContactMediaDetails media={contact.associated_media}/>}
				<ContactMediaDetails media={contact.sent_media}/> */}
			</Stack>
		</Stack>
	)
}

export default ContactMessageDetails;