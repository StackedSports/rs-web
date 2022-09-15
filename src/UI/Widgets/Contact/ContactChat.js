import { useState, useEffect } from "react";
import lodash from "lodash";

import { Stack } from "@mui/material";
import ContactChatHeader from "./ContactChatHeader";
import { useContactConversation } from 'Api/ReactQuery'
import { MessagesDisplay } from "UI/Widgets/Chat/MessagesDisplay";
import { ChatInput } from "UI/Widgets/Chat/ChatInput";


const ContactChat = (props) => {

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
      <ChatInput />
      <MessagesDisplay
        contact_profile_image={loadedMessages.contact_profile_image}
        coach_profile_image={loadedMessages.coach_profile_image}
        messages={loadedMessages.messages}
        onScrollEnd={handleOnScrollEnd}
        loading={contactConversation.isLoading}
      />
    </Stack>
  )
}

export default ContactChat;