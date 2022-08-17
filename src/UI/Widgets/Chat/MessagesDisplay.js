import { useState, useCallback } from 'react';
import {
    Stack,
    List,
} from "@mui/material";

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';

export const MessagesDisplay = (props) => {
    const { messages,
        contact_profile_image,
        coach_profile_image,
    } = props.messages || {};

    const [checkedMessagesIds, setCheckedMessagesIds] = useState([])
    const [showActions, setShowActions] = useState(false)

    const onActionClick = () => {
        setShowActions(true)
    }

    const onCancelClick = () => {
        setCheckedMessagesIds([])
        setShowActions(false)
    }

    const onCheckMessages = (message) => {
        checkedMessagesIds.includes(message) ?
            setCheckedMessagesIds(checkedMessagesIds.filter(m => m !== message)) :
            setCheckedMessagesIds([...checkedMessagesIds, message])
    }

    const isMessageChecked = useCallback((message) => {
        return checkedMessagesIds.some(m => m.id === message.id)
    }, [checkedMessagesIds])

    return (
        <>
            {props.actions && (
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
                    {checkedMessagesIds.length === 0 ?
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
                                options: props.actions,
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
                        key={message.id}
                        owner={message.direction === 'out'}
                        onCheck={onCheckMessages}
                        checked={isMessageChecked(message)}
                        message={message}
                        actionActive={showActions}
                        owmnerAvatar={coach_profile_image}
                        contactAvatar={contact_profile_image}
                    />
                ))}
            </List>
        </>
    )
}
