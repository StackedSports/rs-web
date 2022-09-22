import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    Stack,
    CircularProgress,
    Box,
    Button,
    List,
} from "@mui/material";

import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IConversatition } from 'Interfaces';
import RenderIf from '../RenderIf';

interface IMessagesDisplay {
    messages?: IConversatition[];
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

    const scrollRef = useRef<HTMLUListElement | null>(null)

    /*     useEffect(() => {
            const gotToBottom = event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            }
            if (scrollRef.current) {
    
                scrollRef.current.addEventListener('DOMNodeInserted', gotToBottom);
    
                return () => scrollRef.current?.removeEventListener('DOMNodeInserted', gotToBottom);
            }
    
        }, [scrollRef.current]) */

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
                ref={scrollRef}
                sx={{
                    flex: '1 0 0',
                    minHeight: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    overscrollBehaviorBlock: 'contain',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'flex-start',
                    '::-webkit-scrollbar': {
                        width: '5px',
                    },
                }}
            >
                <InfiniteScroll
                    dataLength={messages?.length || 0}
                    next={() => props.onLoadMore && props.onLoadMore()}
                    hasMore={props.hasMore || false}
                    inverse={true}
                    loader={<div>Loading...</div>}
                    endMessage={<p>- You have seen it all -</p>}
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
