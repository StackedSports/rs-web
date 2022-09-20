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

import CloseIcon from '@mui/icons-material/Close';
import ShortTextIcon from '@mui/icons-material/ShortText';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import WrapTextIcon from '@mui/icons-material/WrapText';

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import { EmojiPicker } from 'UI/Forms/Inputs/MessageInput';
import { Dropdown } from 'UI/Widgets/DropdownMui';
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog';
import MediaPreview from '../Media/MediaPreview';
import { stringSplice } from 'utils/Helper';
import { useSnippets, useTextPlaceholders } from 'Api/ReactQuery';

export const ChatInput = (props) => {

    // props
    const { isTyping } = props;
    const snippets = useSnippets()
    const textPlaceholders = useTextPlaceholders()

    const [textMessage, setTextMessage] = useState("")
    const [showMediaDialog, setShowMediaDialog] = useState(false)
    const [mediaSelected, setMediaSelected] = useState(null)
    const [mediaRemoved, setMediaRemoved] = useState(null)
    const chatInputRef = useRef()

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

    const replaceTextSelectionWith = (substring) => {
        let start = chatInputRef.current.selectionStart
        let end = chatInputRef.current.selectionEnd

        return stringSplice(textMessage, start, start - end, substring)
    }

    const onAddSnippet = (snippet) => {
        setTextMessage(replaceTextSelectionWith(snippet.content))
        chatInputRef.current.focus();
    }

    const onAddTextPlaceholder = (placeholder) => {
        setTextMessage(replaceTextSelectionWith(`[${placeholder}]`))
        chatInputRef.current.focus();
    }

    const onSendMessage = () => {
        if (textMessage.length > 0 || mediaSelected) {
            props.onSendMessage(textMessage, mediaSelected)
            setTextMessage('')
        }
    }

    return (
        <>
            <Box p={2} sx={{ backgroundColor: '#fff' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    inputRef={chatInputRef}
                    variant="outlined"
                    placeholder="Type your message here"
                    value={textMessage}
                    onChange={(e) => onTextAreaChange(e.target.value)}
                    helperText={props.isTyping && `${props.name} is typing...`}
                    FormHelperTextProps={{
                        sx: { marginInline: 0 }
                    }}
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
                            setTextMessage(replaceTextSelectionWith(emoji.native))
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
                        options={textPlaceholders.items}
                        loading={textPlaceholders.loading}
                    />

                    <Divider
                        flexItem
                        orientation="vertical"
                    />

                    <Dropdown
                        type='icon'
                        onClick={onAddSnippet}
                        icon={<ShortTextIcon />}
                        options={snippets.items}
                        getOptionLabel={(snippet) => snippet.content}
                        loading={snippets.loading}
                    />

                    <Button name="Send" variant="contained" sx={{ ml: 'auto' }} onClick={onSendMessage} />
                </Stack>
            </Box>

            <Divider />

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
