import { useCallback } from "react";
import { Box, Stack } from "@mui/material";
import ContactChatHeader from "./ContactChatHeader";
import { ChatInput } from "UI/Widgets/Chat/ChatInput";
import { useSnippets, useTextPlaceholders, useContactConversation } from 'Api/ReactQuery'
import { MessagesDisplay } from "../Chat/MessagesDisplay";

const ContactChat = (props) => {

  const snippets = useSnippets()
  const textPlaceholders = useTextPlaceholders()
  const contactConversation = useContactConversation(props.contact?.id)

  return (
    <Stack
      flex={1}
      spacing={1}
    >
      <ContactChatHeader contact={props.contact} />
      <ChatInput snippets={snippets} textPlaceholders={textPlaceholders} />
      <MessagesDisplay messages={contactConversation.item} onScrollEnd={() => console.log("end")} />
    </Stack>
  )
}

export default ContactChat;