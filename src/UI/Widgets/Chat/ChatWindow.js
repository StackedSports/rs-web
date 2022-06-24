import { useState, useRef } from 'react';
import {
  Divider,
  Stack,
  Paper,
  Avatar,
  Typography,
  Box,
  IconButton,
  List,
  TextField,
} from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';

import CloseIcon from '@mui/icons-material/Close';
import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import WrapTextIcon from '@mui/icons-material/WrapText';
import PushPinIcon from '@mui/icons-material/PushPin';

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import { EmojiPicker } from 'UI/Forms/Inputs/MessageInput';

export const ChatWindow = (props) => {
  const [textMessage, setTextMessage] = useState("")
  const [checkedMessages, setCheckedMessages] = useState([])
  const [clickActionButton, setClickActionButton] = useState(false)
  const chatInputRef = useRef()

  const onCloseConversation = () => {
    props.onCloseConversation(props.conversation)
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
    <Draggable
      draggableId={props.conversation.id}
      index={props.index} isDragDisabled={props.isPinned}
    >
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
            <IconButton onClick={() => props.onPin()} color='inherit' size='small'>
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
            <IconButton onClick={onCloseConversation} size='small' color='inherit' sx={{ ml: 'auto' }} >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* box textarea */}
          <Box p="20px">
            <TextField
              fullWidth
              multiline
              rows={4}
              inputRef={chatInputRef}
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
                  chatInputRef.current.focus()
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

export default ChatWindow;