import { Stack } from "@mui/material";
import ContactChatInput from "./ContactChatInput";
import ContactChatHeader from "./ContactChatHeader";
import ContactChatMessages from "./ContactChatMessages";

const ContactChat = (props) => {

  return (
    <Stack
      flex={1}
      // justifyContent="flex-start" 
      // alignItems="start" 
      spacing={1}

    // sx={{ wheight: '100%' }}
    >
      <ContactChatHeader contact={props.contact} />
      <ContactChatMessages messages={props.messages} />
      <ContactChatInput />
    </Stack>
  )
}

export default ContactChat;