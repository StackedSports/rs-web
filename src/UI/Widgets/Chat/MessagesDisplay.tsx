import React, { useState, useCallback } from 'react';
import {
    Stack,
    CircularProgress,
    Box,
    Button,
} from "@mui/material";

import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import InfiniteScroll from 'react-infinite-scroller';
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

            <Stack // messages list
                sx={{
                    flex: '1 0 0',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    overscrollBehaviorBlock: 'contain',
                    '::-webkit-scrollbar': {
                        width: '5px',
                    },
                }}
            >
                <InfiniteScroll
                    loadMore={() => props.onLoadMore && props.onLoadMore()}
                    hasMore={props.hasMore}
                    useWindow={false}
                    isReverse={true}
                    element='ul'
                    loader={<CircularProgress key={0} size={20} sx={{ mx: "auto" }} />}
                    style={{
                        margin: 0,
                        padding: 0,
                    }}
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
            </Stack>
        </>
    )
}
