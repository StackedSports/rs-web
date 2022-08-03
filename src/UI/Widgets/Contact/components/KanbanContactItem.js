import { useState } from 'react'
import { Avatar, Box, Stack, styled, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText  } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
    } = props;

    const [isHovering, setIsHovering] = useState(false)

    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const isMoreOptionsOpen = Boolean(menuAnchorEl)
 
    const onMouseEnter = (e) => {
        console.log('enter')
        setIsHovering(true)
    }

    const onMouseLeave = (e) => {
        console.log('leave')
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
        if(props.onRemoveContact)
            props.onRemoveContact(contact)
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
                <Avatar src={contact.twitter_profile?.profile_image} alt={getFullName(contact)} />
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
            >
                <MenuItem onClick={onRemoveContactClick} 
                onMouseLeave={onMouseLeave}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove</ListItemText>
                </MenuItem>
            </Menu>
        </Container>
    );
}

const Container = styled(Box)((props) => `
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: ${props.isDragging ? '#dadada' : '#ffff'};
  border-color: ${props.isDragging ? '#afafaf' : '#dadada'};
  box-shadow: ${({ isDragging }) =>
        isDragging ? `2px 2px 1px #f0f` : 'none'};
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
