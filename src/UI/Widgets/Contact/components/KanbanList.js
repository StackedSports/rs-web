import { useState } from 'react'
import { Box, Stack, styled, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { KanbanListItems } from './KanbanListItems';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from 'UI/Widgets/Buttons/Button'

export const KanbanList = ({ list, index, onAddContact, onDeleteBoard, onRemoveContact, onNameChange }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [nameInputAnchorEl, setNameInputAnchorEl] = useState(null)
    const isNameInputMenuOpen = Boolean(nameInputAnchorEl)

    const [nameInput, setNameInput] = useState(list.name)

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

    const onNameClick = (e) => {
        setNameInputAnchorEl(e.currentTarget)
    }

    const onCloseNameEdit = (e) => {
        setNameInputAnchorEl(null)
    }

    const onNameInputChange = (e) => {
        setNameInput(e.target.value)
    }

    const onNameInputKeyPress = (e) => {
        console.log(e.key)

        if(e.key === 'Enter' && onNameChange)
            onNameChange(nameInput)
    }

    const onSaveNameClick = (e) => {
        if(onNameChange)
            onNameChange(nameInput)
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
                            <Typography variant='h6' fontWeight={600} onClick={onNameClick}>{title}</Typography>
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
                            onRemoveContact={onRemoveContact}
                        />
                    </Stack>

                    <Menu
                        id="name-edit-menu"
                        anchorEl={nameInputAnchorEl}
                        open={isNameInputMenuOpen}
                        onClose={onCloseNameEdit}
                    >
                        <Stack direction="row" pr={1} pl={1}>
                            <TextField
                                value={nameInput}
                                placeholder="Name"
                                onChange={onNameInputChange}
                                onKeyPress={onNameInputKeyPress}
                            />
                            <Button
                                name="Done"
                                variant="contained"
                                onClick={onSaveNameClick}
                            />
                        </Stack>
                    </Menu>

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
                            <ListItemText>Delete Column</ListItemText>
                        </MenuItem>
                    </Menu>

                </Stack>
            )}
        </Draggable>
    )
}

export default KanbanList;
