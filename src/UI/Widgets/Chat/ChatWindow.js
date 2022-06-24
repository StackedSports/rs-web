import { useState, useRef, useMemo, useCallback } from 'react';
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
import { Dropdown } from 'UI/Widgets/DropdownMui';
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog';
import MediaPreview from '../Media/MediaPreview';


export const ChatWindow = (props) => {
  const [textMessage, setTextMessage] = useState("")
  const [checkedMessages, setCheckedMessages] = useState([])
  const [clickActionButton, setClickActionButton] = useState(false)
  const [showMediaDialog, setShowMediaDialog] = useState(false)
  const [mediaSelected, setMediaSelected] = useState(null)
  const [mediaRemoved, setMediaRemoved] = useState(null)
  const chatInputRef = useRef()

  const onCloseConversation = () => {
    props.onCloseConversation(props.conversation)
  }

  const onTextAreaChange = (value) => {
    setTextMessage(value)
  }

  const onAddImage = (item, type) => {
    setMediaSelected({
      item,
      type
    })
    setMediaRemoved('')
    setShowMediaDialog(false)
  }

  const onRemoveMedia = (e) => {
    e.stopPropagation()
    setMediaRemoved(mediaSelected.item.id)
    setMediaSelected(null)
  }

  const onAddSnippet = (snippet) => {
    setTextMessage(textMessage ? `${textMessage} ${snippet.content} ` : snippet.content)
    chatInputRef.current.focus();
  }

  const onAddTextPlaceholder = (placeholder) => {
    setTextMessage(textMessage ? `${textMessage} [${placeholder}] ` : `[${placeholder}]`)
    chatInputRef.current.focus();
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
    checkedMessages.includes(message) ?
      setCheckedMessages(checkedMessages.filter(m => m !== message)) :
      setCheckedMessages([...checkedMessages, message])
  }

  const isMessageChecked = useCallback((message) => {
    return checkedMessages.includes(message)
  }, [checkedMessages])

  return (
    <>
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
              {mediaSelected && (
                <Box sx={{ position: 'relative' }}>
                  <MediaPreview mini item={mediaSelected.item} type={mediaSelected.type} width={200} />
                  <IconButton
                    onClick={onRemoveMedia}
                    size='small'
                    color='inherit'
                    sx={{
                      color: 'error.light',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 'fitContent'
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

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

                <IconButton onClick={() => setShowMediaDialog(true)} >
                  <InsertPhotoOutlinedIcon />
                </IconButton>

                <Divider flexItem orientation="vertical" />

                <Dropdown
                  type='icon'
                  onClick={onAddTextPlaceholder}
                  icon={<WrapTextIcon />}
                  options={props.textPlaceholders.items}
                  loading={props.textPlaceholders.loading}
                />

                <Divider
                  flexItem
                  orientation="vertical"
                />

                <Dropdown
                  type='icon'
                  onClick={onAddSnippet}
                  icon={<ShortTextIcon />}
                  options={props.snippets.items}
                  getOptionLabel={(snippet) => snippet.content}
                  loading={props.snippets.loading}
                />

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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {props.conversation?.messages.map(message => (
                <TextMessage
                  owner={message.owner}
                  onCheck={onCheckMessages}
                  checked={isMessageChecked(message)}
                  message={message}
                  actionActive={clickActionButton}
                />
              ))}
            </List>
          </Paper>
        )
        }
      </Draggable>

      <MediaSelectDialog
        open={showMediaDialog}
        removedItem={mediaRemoved}
        uniqueSelection
        onSelected={onAddImage}
        onClose={() => setShowMediaDialog(false)}
      />
    </>
  )
}

export default ChatWindow;