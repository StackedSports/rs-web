import { useState, useRef, useMemo, useCallback } from 'react';

import { Divider, IconButton, List, Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { EmojiPicker } from 'UI/Forms/Inputs/MessageInput';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import Button from '../Buttons/Button';
import MediaPreview from '../Media/MediaPreview';

import CloseIcon from '@mui/icons-material/Close';
import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import WrapTextIcon from '@mui/icons-material/WrapText';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


const ContactChatMessages = (props) => {
  const { messages, contact_profile_image, coach_profile_image } = props.messages || {};

  const [textMessage, setTextMessage] = useState("")
  const chatInputRef = useRef()

  const onCheckMessages = (message) => {
    console.log("check message", message);
  }

  console.log(messages)

  return (
    <Box >
      <List // messages list
        sx={{
          flex: '1 0 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehaviorBlock: 'contain',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          '::-webkit-scrollbar': {
            width: '5px',
            background: 'transparent',
          },

          '::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.grey[400],
          }
        }}
      >
        {messages && messages.map(message => (
          <TextMessage
            owner={message.direction === 'out'}
            onCheck={onCheckMessages}
            //checked={isMessageChecked(message)}
            message={message}
            actionActive={false}
            owmnerAvatar={coach_profile_image}
            contactAvatar={contact_profile_image}
          />
        ))}
      </List>
    </Box>
  )
}

export default ContactChatMessages;