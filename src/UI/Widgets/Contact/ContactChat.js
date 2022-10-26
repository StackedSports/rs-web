import { useState, useEffect, useContext } from "react";
import lodash from "lodash";

import { Stack } from "@mui/material";
import ContactChatHeader from "./ContactChatHeader";
import { useContactConversation, useInboxConversationInfinty } from 'Api/ReactQuery'
import { MessagesDisplay } from "UI/Widgets/Chat/MessagesDisplay";
import { ChatInput } from "UI/Widgets/Chat/ChatInput";
import { AuthContext } from "Context/Auth/AuthProvider";


const ContactChat = (props) => {
  const { user } = useContext(AuthContext)
  const [conversationType, setConversationType] = useState('dm') //"dm" | "sms"
  const messages = useInboxConversationInfinty({
    contact_id: props.contact?.id,
    inbox_type: conversationType,
  })

  const loadNextPageMessages = () => {
    if (messages.hasNextPage && !messages.isFetching) {
      messages.fetchNextPage()
    }
  }

  const handlePlatformChange = (type) => {
    switch (type) {
      case 'twitter-dm':
        setConversationType('dm')
        break;
      case 'rs-text':
        setConversationType('sms')
        break;
      default:
        setConversationType(null)
        break;
    }
  }

  return (
    <Stack
      flex={1}
      spacing={1}
    >
      <ContactChatHeader contact={props.contact} onPlatformChange={handlePlatformChange} />
      <MessagesDisplay
        contact_profile_image={props.contact?.twitter_profile?.profile_image}
        coach_profile_image={user?.twitter_profile?.profile_image}
        messages={messages.items}
        onLoadMore={loadNextPageMessages}
        loading={messages.isLoading}
        hasMore={messages.hasNextPage || messages.isLoading}
      />
      <ChatInput />
    </Stack>
  )
}

export default ContactChat;