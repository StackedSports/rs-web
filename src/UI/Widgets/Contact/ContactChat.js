import { Stack } from "@mui/material";
import ContactChatInput from "./ContactChatInput";
import ContactChatHeader from "./ContactChatHeader";
import ContactChatMessages from "./ContactChatMessages";

const ContactChat = (props) => {

  return (
    <Stack flex={1} sx={{ height: "650px" }} justifyContent="flex-start" alignItems="start" spacing={1}>
      <ContactChatHeader contact={props.contact} />
      <ContactChatMessages />
      <ContactChatInput />
    </Stack>
  )
}

export default ContactChat;