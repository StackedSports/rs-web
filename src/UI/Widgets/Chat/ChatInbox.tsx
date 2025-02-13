import React, { useState, useMemo } from 'react'
import { Stack, List, Typography, Grid, Box, Skeleton } from "@mui/material";
import SearchBar from 'UI/Widgets/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TwitterIcon from '@mui/icons-material/Twitter';
import SmsIcon from '@mui/icons-material/Sms';

import { ChatListItem } from 'UI/Widgets/Chat'

import { IConversationControl } from 'Pages/Chat/ChatPage';
import { IUserInboxItem } from "Interfaces"
import { formatPhoneNumber } from 'utils/Parser'
import ChatInboxItemSkeleton from './ChatInboxItemSkeleton';
interface IChatInboxProps {
    name?: string | null,
    type?: string,
    channel?: string | number | null,
    items?: IUserInboxItem[] | null,
    isLoading: boolean,
    onBackClick: () => void,
    onArchiveConversation: Function,
    onChatClick: Function,
    filterOpen: boolean,
    conversationControl: IConversationControl[]
}

export const ChatInbox = (props: IChatInboxProps) => {
    const Icon = props.filterOpen ? MenuOpenIcon : MenuIcon
    const [filterItems, setFilterItems] = useState<IUserInboxItem[] | null>(null)

    const onSearch = (searchTerm: string) => {
        if (searchTerm === "")
            onSearchClear()
        else if (props.items) {
            setFilterItems(props.items.filter(inbox =>
                inbox.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                formatPhoneNumber(inbox.from).includes(searchTerm) ||
                `@${inbox.from}`.toLowerCase().includes(searchTerm)
            ))
        }
    }

    const onSearchClear = () => {
        setFilterItems(null)
    }

    const activeOptions = useMemo(() => {
        if (!props.items) return []
        return filterItems || props.items
    }, [filterItems, props.items])

    const chatSelected = React.useRef<Map<string, boolean>>(new Map())

    React.useEffect(() => {
        const { conversationControl } = props

        if (!conversationControl)
            return

        const map: Map<string, boolean> = new Map()

        conversationControl.forEach(control => {
            map.set(control.contact_id, true)
        })

        chatSelected.current = map

    }, [props.conversationControl])

    const from = React.useMemo(() => {
        const { type, channel } = props

        if (type === 'sms')
            return formatPhoneNumber(channel)
        else
            return `@${channel}`
    }, [props.type, props.channel])

    const PlatformIcon = props.type === 'sms' ? SmsIcon : TwitterIcon

    return (
        <Grid item container direction='column' sx={{
            width: "370px",
            overscrollBehaviorBlock: 'contain',
            borderEndStartRadius: '5px',
            borderStartStartRadius: '5px',
            border: 1,
            borderColor: 'divider',
        }}
        >
            {!props.name ? (
                <></>
            ) : (
                <>
                    <Stack
                        p={2}
                        direction="row"
                        flexWrap="nowrap"
                        gap={1}
                        alignItems="start"
                        borderBottom="solid 1px"
                        borderColor='divider'
                    >

                        <Icon sx={{ cursor: "pointer", marginTop: '2px' }} onClick={props.onBackClick} />

                        <Stack ml={2} flex={1}>
                            <Typography component="h2" variant="h6">
                                {props.isLoading ? <Skeleton /> : <b>{props.name}</b>}
                            </Typography>

                            <Typography
                                component="span"
                                color="text.secondary"
                                variant="body1">
                                {props.isLoading ? <Skeleton width={'50%'} /> : from}
                            </Typography>
                        </Stack>

                        {!props.isLoading &&
                            <Stack direction='row' gap={1} alignItems='center' mt={"6px"}>
                                <PlatformIcon sx={{ color: "text.secondary", fontSize: '20px' }} />
                            </Stack>
                        }

                    </Stack>

                    <Box sx={{ p: '20px', borderBottom: 1, borderColor: 'divider' }}>
                        {props.isLoading ? (
                            <Skeleton variant='rounded' height={'36px'} />
                        ) : (
                            <SearchBar
                                style={{ margin: 0 }}
                                searchOnChange
                                placeholder="Search"
                                onSearch={onSearch}
                                onClear={onSearchClear}
                                onChange={onSearch}
                            />
                        )}
                    </Box>

                    <List
                        sx={{
                            overflowY: 'auto',
                            flex: '1 0 0',
                            '::-webkit-scrollbar': { width: '5px' },
                            '.MuiListItemButton-root': {
                                padding: "15px",
                                position: "relative",
                                borderBottom: "solid 1px",
                                borderColor: 'divider'
                            }
                        }}
                    >
                        {props.isLoading ? (
                            Array.from(new Array(3)).map((_, index) =>
                                <ChatInboxItemSkeleton key={index} />
                            )
                        ) : (
                            props.items && Array.isArray(props.items) && (
                                activeOptions.map(item => (
                                    <ChatListItem
                                        key={item.contact_id}
                                        item={item}
                                        active={chatSelected.current.get(item.contact_id)}
                                        onToggleChat={props.onChatClick}
                                        onArchiveConversation={props.onArchiveConversation}
                                    />
                                ))
                            )
                        )}
                    </List>
                </>
            )}

        </Grid>
    )
}
