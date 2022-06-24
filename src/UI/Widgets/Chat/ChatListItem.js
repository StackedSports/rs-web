import { useState } from 'react';
import { Avatar, IconButton, ListItemButton, Stack, Typography } from '@mui/material';

import ArchiveIcon from '@mui/icons-material/Archive';

export const ChatListItem = (props) => {

  const [showIconClose, setShowIconClose] = useState(false)

  const onArchiveConversation = (conversation) => {
    props.onArchiveConversation(conversation)
  }

  return (
    <ListItemButton
      sx={{
        padding: "15px",
        position: "relative",
        borderTop: "solid 1px #dadada",
        borderBottom: "solid 1px #dadada",
      }}
      key={props.conversation?.id}
      onMouseEnter={() => setShowIconClose(true)}
      onMouseLeave={() => setShowIconClose(false)}
      onClick={() => props.onToggleChat(props.conversation)}
    >
      <Stack flex={1} direction="row" spacing={2} alignItems="center">
        <IconButton
          sx={{
            visibility: showIconClose ? "visible" : "hidden",
            position: "absolute",
            marginRight: "15px",
            right: 0,
            bottom: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={(e) => { e.stopPropagation(); onArchiveConversation(props.conversation) }}
        >
          <ArchiveIcon />
        </IconButton>
        <Avatar style={{
          width: "56px",
          height: "56px",
        }}
          aria-label="avatar"
          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
        />
        <Stack flex={1} sx={{ position: "relative" }}>
          <Typography style={{
            position: "absolute",
            right: 0,
          }}
            variant='body2'
            fontWeight={600}
            fontSize={12}
          >
            11:23 am
          </Typography>

          <Typography variant="body1" fontWeight='bold'>
            {props.conversation?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @charles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            There Ways To Get Travel Disco...
          </Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  )
}

export default ChatListItem