import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MessageInput from 'UI/Forms/Inputs/MessageInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';


const TextMessage = (props) => {

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.onCheck(event.target.checked)
  };

  return (
    <ListItem>
      {props.actionActive &&
        <Checkbox
          sx={{
            "& .MuiSvgIcon-root": {
              borderRadius: "50%"
            }
          }}
          checked={checked}
          onChange={handleChange}
          icon={<CircleUnchecked />}
          checkedIcon={<CheckCircleIcon sx={{ color: "#006644" }} />}
        />
      }
      <Typography style={{
        padding: "10px",
        color: props.owner ? "#fff" : "#000",
        backgroundColor: props.owner ? "#3871DA" : "#f1f0f0",
        borderRadius: props.owner ? "20px 20px 0 20px" : "20px 20px 20px 0",
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      {props.owner &&
        <Avatar style={{
          margin: 10,
          width: "26px",
          height: "26px",
          alignSelf: "flex-end",
        }}
          aria-label="recipe"
          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
        />}
    </ListItem >
  )
}

const ConversationChat = (props) => {

  const [textMessage, setTextMessage] = useState("")
  const [checkedMessages, setCheckedMessages] = useState([])
  const [clickActionButton, setClickActionButton] = useState(false)

  const onCloseConversation = (conversation) => {
    props.onCloseConversation(conversation)
  }

  const onTextAreaChange = (value) => {
    setTextMessage(value)
  }

  const onAddImage = () => {

  }

  const onActionClick = () => {
    setClickActionButton(true)

  }

  const onCancelClick = () => {
    setCheckedMessages([])
    setClickActionButton(false)
  }

  const onSyncMessageClick = () => {

  }

  const onExportCSV = () => {

  }

  const onArchiveMessage = () => {

  }

  const onCheckMessages = (message) => {
    setCheckedMessages([...checkedMessages, message])
  }

  console.log(checkedMessages)

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
            position: "relative",
            width: "100%",
            height: "110px",
          }}
          type='chat'
          hideLabel
          placeholder='Type your message here'
          value={textMessage}
          onChange={onTextAreaChange}
          footerText={`${props.conversation.name} is typing...`}
        />

        <Stack sx={{
          marginTop: "30px",
        }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flex={1}>
            <InsertPhotoIcon
              sx={{
                cursor: "pointer"
              }}
              onClick={onAddImage}
            />
            <Divider
              flexItem
              orientation="vertical"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />

            <AutoFixHighIcon
              sx={{
                cursor: "pointer"
              }}
            // onClick={ }
            />
            <Divider
              flexItem
              orientation="vertical"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />
            <ContentCutIcon
              sx={{
                cursor: "pointer"
              }}
            // onClick={ }
            />
          </Box>
          <Button name="Send" variant="contained" />
        </Stack>

      </Stack>

      <Divider />

      <Stack flex={2}>

        <Stack /* actions */
          sx={{
            width: "100%",
          }}
          direction="row"
          justifyContent="space-between"
        >
          <Button sx={{
            visibility: clickActionButton ? "visible" : "hidden",
          }}
            name="Cancel"
            variant="text"
            onClick={onCancelClick}
          />
          {checkedMessages.length === 0 ?
            <Button
              name="Action"
              variant="text"
              onClick={onActionClick}
            />
            :
            <PanelDropdown
              action={{
                name: 'Action',
                variant: 'text',
                options: [
                  { name: 'Sync with CRM', onClick: onSyncMessageClick },
                  { name: 'Export as CSV', onClick: onExportCSV },
                  { name: 'Archive', onClick: onArchiveMessage, color: "red" },
                ]
              }}
            />
          }
        </Stack>

        <List style={{}}>
          {/* {props.conversation?.messages.map(message => ( */}
          <TextMessage
            owner
            onCheck={onCheckMessages}
            // message={message}
            actionActive={clickActionButton}
          />
          <TextMessage
            // message={message}
            onCheck={onCheckMessages}
            actionActive={clickActionButton}
          />
          {/* ))
          } */}
        </List>
      </Stack>

    </Stack>
  )
}

export default ConversationChat;