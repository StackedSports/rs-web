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
          messages: lodash.uniqBy([...prevMessages, ...newMessages], "id").reverse()
        }
      })
    }
  }, [contactConversation.items])

  const hasMorePages = contactConversation.pagination.currentPage < contactConversation.pagination.currentPage.totalPages

  const handleOnScrollEnd = () => {
    const pagination = contactConversation.pagination
    const loading = contactConversation.loading
    const { currentPage, totalPages, getPage } = pagination;
    if (hasMorePages && !loading) {
      getPage(currentPage + 1)
    }
  }

  return (
    <Stack
      flex={1}
      spacing={1}
    >
      <ContactChatHeader contact={props.contact} />
      <MessagesDisplay
        contact_profile_image={loadedMessages.contact_profile_image}
        coach_profile_image={loadedMessages.coach_profile_image}
        messages={loadedMessages.messages || []}
        onLoadMore={handleOnScrollEnd}
        hasMore={hasMorePages}
      />
      <ChatInput />
    </Stack>
  )
}

export default ContactChat;