import { useState, useEffect } from "react";
import lodash from "lodash";

import { Stack } from "@mui/material";
import ContactChatHeader from "./ContactChatHeader";
import { useSnippets, useTextPlaceholders, useContactConversation } from 'Api/ReactQuery'
import { MessagesDisplay } from "UI/Widgets/Chat/MessagesDisplay";
import { ChatInput } from "UI/Widgets/Chat/ChatInput";


const ContactChat = (props) => {

  const snippets = useSnippets()
  const textPlaceholders = useTextPlaceholders()
  const contactConversation = useContactConversation(props.contact?.id)
  const [loadedMessages, setLoadedMessages] = useState({})

  useEffect(() => {
    if (!contactConversation.loading) {
      setLoadedMessages(prev => {
        const prevMessages = prev?.messages || []
        const newMessages = contactConversation.items?.messages || []
        return {
          ...contactConversation.items,
          messages: lodash.uniqBy([...prevMessages, ...newMessages], "id")
        }
      })
    }
  }, [contactConversation.items])

  const handleOnScrollEnd = () => {
    const pagination = contactConversation.pagination
    const loading = contactConversation.loading
    const { currentPage, totalPages, getPage } = pagination;
    if (currentPage < totalPages && !loading) {
      getPage(currentPage + 1)
    }
  }

  return (
    <Stack
      flex={1}
      spacing={1}
    >
      <ContactChatHeader contact={props.contact} />
      <ChatInput snippets={snippets} textPlaceholders={textPlaceholders} />
      <MessagesDisplay
        messages={loadedMessages}
        onScrollEnd={handleOnScrollEnd}
        loading={contactConversation.isLoading}
      />
    </Stack>
  )
}

export default ContactChat;