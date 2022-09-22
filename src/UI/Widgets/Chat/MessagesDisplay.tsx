import React, { useState, useCallback } from 'react';
import {
    Stack,
    CircularProgress,
    Button,
    List,
} from "@mui/material";

import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IConversatition } from 'Interfaces';

interface IMessagesDisplay {
    messages: IConversatition[];
    contact_profile_image: string;
    coach_profile_image: string;
    actions?: any[];
    onLoadMore?: () => void;
    loading?: boolean;
    hasMore?: boolean;
}

export const MessagesDisplay: React.FC<IMessagesDisplay> = (props) => {
    const { messages,
        contact_profile_image,
        coach_profile_image,
    } = props;

    const [checkedMessagesIds, setCheckedMessagesIds] = useState<string[]>([])
    const [showActions, setShowActions] = useState(false)

    const onActionClick = () => {
        setShowActions(prev => !prev)
    }

    const onCancelClick = () => {
        setCheckedMessagesIds([])
        setShowActions(false)
    }

    const onCheckMessages = (message: IConversatition) => {
        checkedMessagesIds.includes(message.id) ?
            setCheckedMessagesIds(checkedMessagesIds.filter(m => m !== message.id)) :
            setCheckedMessagesIds([...checkedMessagesIds, message.id])
    }

    const isMessageChecked = useCallback((message) => {
        return checkedMessagesIds.some(id => id === message.id)
    }, [checkedMessagesIds])

    return (
        <>
            {props.actions && (
                <Stack /* actions */
                    direction="row"
                    justifyContent="space-between"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Button
                        sx={{
                            visibility: showActions ? "visible" : "hidden",
                        }}
                        variant="text"
                        onClick={onCancelClick}
                    >
                        Cancel
                    </Button>
                    {checkedMessagesIds.length === 0 ?
                        <Button
                            variant="text"
                            onClick={onActionClick}
                        >
                            Action
                        </Button>
                        :
                        // @ts-ignore: TODO pass to ts
                        <PanelDropdown
                            action={{
                                name: 'Action',
                                variant: 'text',
                                options: props.actions || [],
                            }}
                        />
                    }
                </Stack>
            )}
            <List // messages list
                id='list-chat'
                sx={{
                    flex: '1 0 0',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    overscrollBehaviorBlock: 'contain',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    '::-webkit-scrollbar': {
                        width: '5px',
                    },
                }}
            >
                <InfiniteScroll
                    dataLength={messages.length}
                    next={() => props.onLoadMore && props.onLoadMore()}
                    hasMore={props.hasMore || false}
                    inverse={true}
                    loader={<CircularProgress size={25} sx={{ mx: "auto", my: 1 }} />}
                    scrollableTarget='list-chat'
                    style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                    {messages && messages.map((message) => (
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
                </InfiniteScroll>
            </List>
        </>
    )
}
