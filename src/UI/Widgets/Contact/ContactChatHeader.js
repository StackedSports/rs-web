import Stack from '@mui/material/Stack';
import ContactAvatarChip from './ContactAvatarChip';

const ContactChatHeader = (props) => {

  return (
    <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
      <ContactAvatarChip
        fullName={props.fullName || ""}
        profileImage={props.profileImage || ""}
        phone={props.phone || ""}
      />
    </Stack>
  )
}

export default ContactChatHeader;