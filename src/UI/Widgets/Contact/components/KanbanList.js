import React from 'react'
import { Box, Stack, styled, Typography, IconButton } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { KanbanListItems } from './KanbanListItems';

export const KanbanList = ({ list, index, onAddContact }) => {

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
                            <Stack direction='row' alignItems='center' sx={{ ml: 'auto' }}>
                                <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => onAddContact(title)} >
                                    <AddCircleOutlineRoundedIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton size='small' sx={{ color: 'text.secondary' }}>
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
                </Stack>
            )}
        </Draggable>
    )
}

export default KanbanList;
