import { useState, useCallback } from 'react';
import {
    Stack,
    List,
} from "@mui/material";

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import { EmojiPicker } from 'UI/Forms/Inputs/MessageInput';
import { Dropdown } from 'UI/Widgets/DropdownMui';
import MediaSelectDialog from 'UI/Widgets/Media/MediaSelectDialog';
import MediaPreview from '../Media/MediaPreview';
import { stringSplice } from 'utils/Helper';

export const MessagesDisplay = (props) => {
    const { messages,
        contact_profile_image,
        coach_profile_image,
        actions,
    } = props.messages || {};

    const [checkedMessages, setCheckedMessages] = useState([])
    const [showActions, setShowActions] = useState(false)

    const onActionClick = () => {
        setShowActions(true)
    }

    const onCancelClick = () => {
        setCheckedMessages([])
        setShowActions(false)
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
            {actions && (
                <Stack /* actions */
                    direction="row"
                    justifyContent="space-between"
                >
                    <Button sx={{
                        visibility: showActions ? "visible" : "hidden",
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
            )}

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
        </>
    )
}
