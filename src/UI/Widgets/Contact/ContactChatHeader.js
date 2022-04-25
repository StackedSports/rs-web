import Stack from '@mui/material/Stack';
import ContactAvatarChip from './ContactAvatarChip';

const ContactChatHeader = (props) => {

  const fullName = props.contact ? props.contact.first_name + " " + props.contact.last_name : "Loading..."
  const profileImage = props.contact?.twitter_profile.profile_image
  const phone = props.contact ? props.contact.phone : "Loading..."

  return (
    <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
      <ContactAvatarChip
        fullName={fullName}
        profileImage={profileImage}
        phone={phone}
      />
    </Stack>
  )
}

export default ContactChatHeader;