import { useState } from 'react';
const { Stack } = require("@mui/material")
const { Avatar, Typography } = require("@material-ui/core")
import CloseIcon from '@mui/icons-material/Close';
import MessageInput from 'UI/Forms/Inputs/MessageInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCutIcon from '@mui/icons-material/ContentCut';

import { Divider } from 'UI';
import Button from 'UI/Widgets/Buttons/Button';


const ConversationChat = (props) => {

  const [textMessage, setTextMessage] = useState("")

  const onCloseConversation = (conversation) => {
    props.onCloseConversation(conversation)
  }

  const onTextAreaChange = (value) => {
    setTextMessage(value)
  }

  console.log(textMessage)

  return (
    <Stack sx={{//conversation chat
      minWidth: "350px",
      border: "#dadada solid 1px",
    }}
      key={props.conversation.id}
    >
      <Stack sx={{//header
        padding: "20px",
        backgroundColor: "#3871DA",
      }}
        direction="row"
        flexWrap="nowrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
        >
          <Avatar style={{
            width: "36px",
            height: "36px",
          }}
            aria-label="recipe"
            src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
          />
          <Typography style={{
            color: "#ffff",
            fontWeight: 500,
          }}
            variant="body1"
          >
            {props.conversation.name}
          </Typography>
          <Typography style={{
            color: "#dadada",
          }}
            variant="subtitle2"
          >
            @charles
          </Typography>
        </Stack>
        <CloseIcon sx={{
          color: "#ffff",
          cursor: "pointer",
        }}
          onClick={() => onCloseConversation(props.conversation)}
        />
      </Stack>

      {/* box textarea */}
      <Stack p="20px">
        <MessageInput
          style={{
            width: "100%",
            height: "110px",
          }}
          type='chat'
          hideLabel
          placeholder='Type your message here'
          value={textMessage}
          onChange={onTextAreaChange}
          footerText="Luke is typing..."
        />

        <Stack sx={{
          marginTop: "30px",
        }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <InsertPhotoIcon
              sx={{
                cursor: "pointer"
              }}
            // onClick={ }
            />
            {/* <Divider orientation="vertical" variant="middle" /> */}
            <AutoFixHighIcon
              sx={{
                cursor: "pointer"
              }}
            // onClick={ }
            />
            {/* <Divider orientation="vertical" variant="middle" /> */}
            <ContentCutIcon
              sx={{
                cursor: "pointer"
              }}
            // onClick={ }
            />
          </Stack>
          <Button name="Send" variant="contained" />
        </Stack>

      </Stack>

      <Divider />

      <Stack>

      </Stack>

    </Stack>
  )
}

export default ConversationChat;