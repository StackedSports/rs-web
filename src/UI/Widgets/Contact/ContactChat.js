import { Box, Stack } from "@mui/material";
import ContactChatHeader from "./ContactChatHeader";
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
      <ChatInput snippets={snippets} textPlaceholders={textPlaceholders} />
      <MessagesDisplay messages={props.messages} onScrollEnd={()=>{console.log("cheguei no fim")}} />
    </Stack>
  )
}

export default ContactChat;