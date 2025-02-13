import { useState, useContext, useMemo } from 'react'
import { AppContext } from 'Context/AppProvider'
import { Avatar, Box, Stack, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Checkbox, styled } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SendIcon from '@mui/icons-material/Send'

import RenderIf from 'UI/Widgets/RenderIf'
import { getFullName } from 'utils/Parser';

const getPositionsString = (positions) => {
    if (positions.length == 0)
        return '-'
    else
        return positions.join(' - ')
}

export const KanbanContactItem = (props) => {
    const {
        contact,
        isDragging,
        provided,
        selectedContacts,
    } = props;

    const isSelected = useMemo(() => selectedContacts.some(c => c.id === contact.id), [selectedContacts, contact.id])

    const [isHovering, setIsHovering] = useState(false)
    const app = useContext(AppContext)

    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const isMoreOptionsOpen = Boolean(menuAnchorEl)

    const onMouseEnter = (e) => {
        setIsHovering(true)
    }

    const onMouseLeave = (e) => {
        setIsHovering(false)
        setMenuAnchorEl(null)
    }

    const onClickMoreOptions = (e) => {
        setMenuAnchorEl(e.currentTarget)
    }

    const onCloseMoreOptions = (e) => {
        setMenuAnchorEl(null)
    }

    const onRemoveContactClick = (e) => {
        if (props.onRemoveContact) {
            props.onRemoveContact(contact)
        }
    }
    const onSelectContactClick = (e) => {
        if (props.onSelectContact)
            props.onSelectContact(contact)
    }

    return (
        <Container
            isDragging={isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Stack direction='row' alignItems='center' gap={2} >
                {
                    (isHovering || isSelected) ?
                        <Checkbox checked={isSelected} onChange={(e) => onSelectContactClick(e)} /> :
                        <Avatar
                            src={contact.twitter_profile?.profile_image}
                            alt={getFullName(contact)}
                            sx={{ width: 42, height: 42 }}
                        />
                }
                <Typography fontSize={18}>{getFullName(contact)}</Typography>
                <RenderIf condition={isHovering}>
                    <Stack flex={1} alignItems="flex-end">
                        <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={onClickMoreOptions}>
                            <MoreHorizIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </RenderIf>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1} >
                <Typography fontWeight={600}>{getPositionsString(contact.positions).toUpperCase()}</Typography>
                {'|'}
                <Typography fontWeight={600}>{contact.grad_year ? contact.grad_year : '-'}</Typography>
            </Stack>
            <Typography fontSize={14} fontWeight={600}>{contact.high_school ? `${contact.high_school} HS` : ''}</Typography>
            <Typography fontSize={14} fontWeight={600}> {contact.state ? contact.state : ''}</Typography>


            <Menu
                id="kanban-item-menu"
                anchorEl={menuAnchorEl}
                open={isMoreOptionsOpen}
                onClose={onCloseMoreOptions}
                MenuListProps={{
                    onMouseLeave: onCloseMoreOptions
                }}
            >
                <MenuItem onClick={() => app.sendMessageToContacts([contact])}>
                    <ListItemIcon>
                        <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Send Message</ListItemText>
                </MenuItem>
                <MenuItem onClick={onRemoveContactClick}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove</ListItemText>
                </MenuItem>

            </Menu>
        </Container>
    );
}

const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isDragging'
})((props) => `
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: ${props.isDragging ? props.theme.palette.background.paper : props.theme.palette.background.default};
  border-color: ${props.isDragging ? '#afafaf' : '#dadada'};
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 4px;
  user-select: none;

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
  flex-direction: column;
  gap:8px;
`);
