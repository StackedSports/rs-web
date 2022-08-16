import { Box, Stack } from "@mui/material";
import ContactChatInput from "./ContactChatInput";
import ContactChatHeader from "./ContactChatHeader";
import ContactChatMessages from "./ContactChatMessages";
import { ChatInput } from "UI/Widgets/Chat/ChatInput";
import { useSnippets, useTextPlaceholders } from 'Api/ReactQuery'
import { MessagesDisplay } from "../Chat/MessagesDisplay";

const ContactChat = (props) => {

  const snippets = useSnippets()
  const textPlaceholders = useTextPlaceholders()

  return (
    <Stack
      flex={1}
      spacing={1}
    >
      <ContactChatHeader contact={props.contact} />
      <Box
        maxWidth="1200px"
        width="100%"
        alignSelf='center'
      >
        <ChatInput snippets={snippets} textPlaceholders={textPlaceholders} />
        <MessagesDisplay messages={props.messages} />
      </Box>
    </Stack>
  )
}

export default ContactChat;