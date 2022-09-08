import { useMemo } from 'react'
import { Stack, List, Typography, Grid, Box } from "@mui/material";
import SearchBar from 'UI/Widgets/SearchBar';
import { useSnippets, useTextPlaceholders } from 'Api/ReactQuery'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useLocalStorage } from 'Hooks/useLocalStorage';
import { ChatWindow, ChatListItem } from 'UI/Widgets/Chat';

import { IPaginationApi, ITeamInboxItem, ITeamInboxAPI, IUserInboxItem, IUserInboxAPI } from "Interfaces"


interface IChatInboxProps {
    name: string | null,
    channel: string | null,
    items: IUserInboxItem[],
    conversations: any,
    onChatSearch: Function,
    onChatSearchClear: Function,
    onBackClick: Function,
    onArchiveConversation: Function,
    onChatClick: Function,
    filterOpen: boolean
}

export const ChatInbox = (props: IChatInboxProps) => {
    const Icon = props.filterOpen ? MenuOpenIcon : MenuIcon

    

    return (
        <Grid item sx={{
            width: "370px",
            overflowY: "auto",
            overscrollBehaviorBlock: 'contain',
            border: "red solid 1px",
            borderEndStartRadius: '5px',
            borderStartStartRadius: '5px',
            border: "solid 1px #dadada",
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
            <List >
                {props.items && props.items.map(item => (
                    <ChatListItem
                      key={item.id}
                      item={item}
                    //   conversation={conversation}
                      onToggleChat={props.onChatClick}
                      onArchiveConversation={props.onArchiveConversation}
                    />
                ))}
            </List>
        </Grid>
    )
}
