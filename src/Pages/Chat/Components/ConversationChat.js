import { useState, useRef, useContext } from 'react';
import {
  Grid,
  Divider,
  Stack,
  Paper,
  Checkbox,
  Avatar,
  Typography,
  Tooltip,
  Box,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';

import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import WrapTextIcon from '@mui/icons-material/WrapText';
import PushPinIcon from '@mui/icons-material/PushPin';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { EmojiPicker } from 'UI/Forms/Inputs/MessageInput';

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
        margin: props.owner ? "0 0 0 30px" : "0 30px 0 0",
        padding: '10px',
        color: props.owner ? "#fff" : "#000",
        backgroundColor: props.owner ? "#3871DA" : "#f1f0f0",
        borderRadius: props.owner ? "20px 20px 0 20px" : "20px 20px 20px 0",
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      {props.owner &&
        <Avatar sx={{
          margin: '5px 0 5px 10px',
          width: "26px",
          height: "26px",
          alignSelf: "flex-end",
        }}
          aria-label="recipe"
          src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
        />}
    </ListItem>
  )
}

const ConversationChat = (props) => {
  const [textMessage, setTextMessage] = useState("")
  const [checkedMessages, setCheckedMessages] = useState([])
  const [clickActionButton, setClickActionButton] = useState(false)
  const chatRef = useRef()

  const onCloseConversation = (conversation) => {
    props.onCloseConversation(conversation)
  }

  const onTextAreaChange = (value) => {
    setTextMessage(value)
  }

  const onAddImage = () => {

  }
  const onAddSnippet = () => {

  }
  const onAddTextPlaceholder = () => {

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

  return (
    <Draggable draggableId={props.conversation.id} index={props.index} isDragDisabled={props.isPinned}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}
          ref={provided.innerRef}
        >

          <Stack //header
            {...provided.dragHandleProps}
            p='20px'
            bgcolor={props.isPinned ? "#3871DA80" : '#3871DAFF'}
            direction="row"
            flexWrap="nowrap"
            alignItems="center"
            gap={2}
            color="#fff"
            sx={{ userSelect: 'none' }}
          >
            <IconButton onClick={()=>props.onPin()} color='inherit' size='small'>
              <PushPinIcon />
            </IconButton>

            <Avatar style={{
              width: "34px",
              height: "34px",
            }}
              aria-label="avatar"
              src='https://stakdsocial.s3.us-east-2.amazonaws.com/media/general/contact-missing-image.png'
            />
            <Typography fontWeight={600}>
              {props.conversation.name}
            </Typography>
            <Typography variant="subtitle2" >
              @charles
            </Typography>
            <IconButton onClick={() => onCloseConversation(props.conversation)} size='small' color='inherit' sx={{ ml: 'auto' }} >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* box textarea */}
          <Box p="20px">
            <TextField
              fullWidth
              multiline
              rows={4}
              inputRef={chatRef}
              variant="outlined"
              placeholder="Type your message here"
              value={textMessage}
              onChange={(e) => onTextAreaChange(e.target.value)}
            />

            <Stack
              mt={3}
              direction="row"
              alignItems="center"
              gap={1.5}
            >
              <EmojiPicker
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onEmojiSelected={(emoji) => {
                  setTextMessage(textMessage + emoji.native)
                  chatRef.current.focus()
                }}
              />

              <Divider flexItem orientation="vertical" />

              <IconButton onClick={onAddImage} >
                <InsertPhotoOutlinedIcon />
              </IconButton>

              <Divider flexItem orientation="vertical" />

              <IconButton onClick={onAddTextPlaceholder} >
                <WrapTextIcon />
              </IconButton>

              <Divider
                flexItem
                orientation="vertical"
              />

              <IconButton onClick={onAddSnippet} >
                <ShortTextIcon />
              </IconButton>

              <Button name="Send" variant="contained" sx={{ ml: 'auto' }} />
            </Stack>
          </Box>

          <Divider />

          <Stack /* actions */
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

          <List // messages list
            sx={{
              flex: '1 0 0',
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehaviorBlock: 'contain',
            }}
          >
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
            />          <TextMessage
              owner
              onCheck={onCheckMessages}
              // message={message}
              actionActive={clickActionButton}
            />
            <TextMessage
              // message={message}
              onCheck={onCheckMessages}
              actionActive={clickActionButton}
            />          <TextMessage
              owner
              onCheck={onCheckMessages}
              // message={message}
              actionActive={clickActionButton}
            />
            <TextMessage
              // message={message}
              onCheck={onCheckMessages}
              actionActive={clickActionButton}
            />          <TextMessage
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
          </List>
        </Paper>
      )}
    </Draggable>
  )
}

export default ConversationChat;