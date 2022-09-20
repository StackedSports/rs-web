import React, { useState, useMemo } from 'react'
import { Stack, List, Typography, Grid, Box } from "@mui/material";
import SearchBar from 'UI/Widgets/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextsmsIcon from '@mui/icons-material/Textsms';
import SmsIcon from '@mui/icons-material/Sms';

import { ChatListItem } from 'UI/Widgets/Chat'
import LoadingPanel from 'UI/Widgets/LoadingPanel'

import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI } from "Interfaces"
import { IConversationControl } from 'Pages/Chat/ChatPage';

import { formatPhoneNumber } from 'utils/Parser'
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
            setFilterItems(props.items.filter(inbox => inbox.name.toLowerCase().includes(searchTerm.toLowerCase().trim())))
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

        if(!conversationControl)
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
            border: "1px solid #dadada",
        }}
        >
            <Stack
                p="20px 20px 20px 20px"
                direction="row"
                flexWrap="nowrap"
                gap={1}
                alignItems="start"
                borderBottom="solid 1px #dadada"
            >
                <Icon sx={{ cursor: "pointer", marginTop: '2px' }} onClick={props.onBackClick} />
                <Stack ml={2} flex={1}>
                    <Typography component="h2" variant="h6">
                        <b>{props.name}</b>
                    </Typography>
                    
                    <Typography
                        // sx={{ fontSize: "12px", }}
                        component="span"
                        color="text.secondary"
                        variant="body1">
                        {from}
                    </Typography>	
                    
                    
                </Stack>
                <Stack direction='row' gap={1} alignItems='center' mt={"6px"}>
                    <PlatformIcon sx={{ color: "text.secondary", fontSize: '20px' }}/>		
                </Stack>
                
            </Stack>

            <Box sx={{ p: '20px' }}>
                <SearchBar
                    style={{ margin: 0 }}
                    searchOnChange
                    placeholder="Search"
                    onSearch={onSearch}
                    onClear={onSearchClear}
                />
            </Box>
            {props.isLoading && <LoadingPanel />}
            {props.items && Array.isArray(props.items) && (
                <List sx={{ overflowY: 'auto', flex: '1 0 0', '::-webkit-scrollbar': { width: '5px' } }}>
                    {activeOptions.map(item => (
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
