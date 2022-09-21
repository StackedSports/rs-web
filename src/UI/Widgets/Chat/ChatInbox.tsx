import React, { useState, useMemo } from 'react'
import { Stack, List, Typography, Grid, Box } from "@mui/material";
import SearchBar from 'UI/Widgets/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { ChatListItem } from 'UI/Widgets/Chat'
import LoadingPanel from 'UI/Widgets/LoadingPanel'

import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI } from "Interfaces"
import { formatPhoneNumber } from 'utils/Parser';

interface IChatInboxProps {
    name?: string | null,
    channel?: string | number | null,
    items?: IUserInboxItem[] | null,
    isLoading: boolean,
    onBackClick: () => void,
    onArchiveConversation: Function,
    onChatClick: Function,
    filterOpen: boolean
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
                    onSearch={onSearch}
                    onClear={onSearchClear}
                    onChange={onSearch}
                />
            </Box>
            {props.isLoading && <LoadingPanel />}
            {props.items && Array.isArray(props.items) && (
                <List sx={{ overflowY: 'auto', flex: '1 0 0', '::-webkit-scrollbar': { width: '5px' } }}>
                    {activeOptions.map(item => (
                        <ChatListItem
                            key={item.contact_id}
                            item={item}
                            onToggleChat={props.onChatClick}
                            onArchiveConversation={props.onArchiveConversation}
                        />
                    ))}
                </List>
            )}

        </Grid>
    )
}
