import React from 'react'
import { Stack, List, Typography, Grid, Box } from "@mui/material";
import SearchBar from 'UI/Widgets/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { ChatListItem } from 'UI/Widgets/Chat'
import LoadingPanel from 'UI/Widgets/LoadingPanel'

import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI } from "Interfaces"
import { IConversationControl } from 'Pages/Chat/ChatPage';

interface IChatInboxProps {
    name?: string | null,
    channel?: string | number | null,
    items?: IUserInboxItem[] | null,
    isLoading: boolean,
    onChatSearch: Function,
    onChatSearchClear: Function,
    onBackClick: () => void,
    onArchiveConversation: Function,
    onChatClick: Function,
    filterOpen: boolean,
    conversationControl: IConversationControl[]
}

export const ChatInbox = (props: IChatInboxProps) => {
    const Icon = props.filterOpen ? MenuOpenIcon : MenuIcon

    const chatSelected = React.useRef<Map<string, boolean>>(new Map())

    React.useEffect(() => {
        const { conversationControl } = props

        if(!conversationControl)
            return

        const map: Map<string, boolean> = new Map()

        conversationControl.forEach(control => {
            map.set(control.contact_id, true)
        })

        chatSelected.current = map

    }, [props.conversationControl])

    return (
        <Grid item container direction='column' sx={{
            width: "370px",
            overscrollBehaviorBlock: 'contain',
            borderEndStartRadius: '5px',
            borderStartStartRadius: '5px',
            border: "1px solid #dadada",
        }}
        >
            <Stack
                p="20px 40px 20px 20px"
                direction="row"
                flexWrap="nowrap"
                gap={1}
                alignItems="center"
                borderBottom="solid 1px #dadada"
            >
                <Icon sx={{ cursor: "pointer" }} onClick={props.onBackClick} />
                <Typography component="h2" variant="h6" sx={{ ml: '20px' }}>
                    <b>{props.name}</b>
                </Typography>
                <Typography
                    sx={{ color: "#dadada", fontSize: "12px", }}
                    component="span"
                    variant="subtitle1">
                    {props.channel}
                </Typography>
            </Stack>

            <Box sx={{ p: '20px' }}>
                <SearchBar
                    style={{ margin: 0 }}
                    searchOnChange
                    placeholder="Search"
                    onSearch={props.onChatSearch}
                    onClear={props.onChatSearchClear}
                />
            </Box>
            {props.isLoading && <LoadingPanel />}
            {props.items && Array.isArray(props.items) && (
                <List sx={{ overflowY: 'auto', flex: '1 0 0', '::-webkit-scrollbar': { width: '5px' } }}>
                    {props.items && props.items.map(item => (
                        <ChatListItem
                            key={item.contact_id}
                            item={item}
                            active={chatSelected.current.get(item.contact_id)}
                            onToggleChat={props.onChatClick}
                            onArchiveConversation={props.onArchiveConversation}
                        />
                    ))}
                </List>
            )}

        </Grid>
    )
}
