import { useState } from 'react'
import { Box, Stack, styled, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { KanbanListItems } from './KanbanListItems';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const KanbanList = ({ list, index, onAddContact, onDeleteBoard }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMoreOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMoreOptions = () => {
        setAnchorEl(null);
    };

    const handleDeleteBoard = () => {
        handleCloseMoreOptions();
        onDeleteBoard(list.name)
    }

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        //padding: grid,
        width: 275,
    });

    const title = list.name;
    const contacts = list.contacts;

    return (
        <Draggable draggableId={title} index={index} direction="horizontal">
            {(provided, snapshot) => (
                <Stack ref={provided.innerRef} {...provided.draggableProps} sx={{ mx: .5 }} width='310px' flex={1}>
                    <Stack sx={{ minHeight: '100%' }} >
                        <Stack
                            direction='row'
                            alignItems='center'
                            sx={{ borderRadius: 1.2, padding: 1, width: '100%', height: '50px' }}
                            bgcolor={snapshot.isDragging ? '#afafaf' : '#f5f6fa'}
                            isDragging={snapshot.isDragging}
                            {...provided.dragHandleProps}
                            aria-label={`${title} list`}
                        >
                            <Typography variant='h6' fontWeight={600}>{title}</Typography>
                            <Typography variant='h6' color='primary' fontWeight={600} sx={{ ml: 2 }}>{contacts.length}</Typography>
                            <Stack direction='row' alignItems='center' sx={{ ml: 'auto' }}>
                                <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => onAddContact(title)} >
                                    <AddCircleOutlineRoundedIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={handleClickMoreOptions}>
                                    <MoreHorizIcon fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </Stack>

                        <KanbanListItems
                            listId={title}
                            listType="CONTACT"
                            contacts={contacts}
                        />
                    </Stack>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMoreOptions}
                    >
                        <MenuItem onClick={handleDeleteBoard}>
                            <ListItemIcon>
                                <DeleteForeverIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Delete Board</ListItemText>
                        </MenuItem>
                    </Menu>

                </Stack>
            )}
        </Draggable>
    )
}

export default KanbanList;
