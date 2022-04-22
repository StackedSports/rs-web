import { Stack } from "@mui/material";
import ContactChatInput from "./ContactChatInput";
import ContactChatHeader from "./ContactChatHeader";
import ContactChatMessages from "./ContactChatMessages";

const ContactChat = (props) => {

  const fullName = props.contact?.first_name + " " + props.contact?.last_name
  const profileImage = props.contact?.twitter_profile.profile_image
  const phone = props.contact?.phone

  return (
    <Stack flex={1} sx={{ height: "650px" }} justifyContent="flex-start" alignItems="start" spacing={1}>
      <ContactChatHeader fullName={fullName} profileImage={profileImage} phone={phone} />
      <ContactChatMessages />
      <ContactChatInput />
    </Stack>
  )
}

export default ContactChat;