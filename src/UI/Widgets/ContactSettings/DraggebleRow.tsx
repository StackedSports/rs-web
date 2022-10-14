import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { IconButton, Paper, Stack, TextField } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DraggebleRowProps {
    id: string,
    index: number,
}

export const DraggebleRow: React.FC<DraggebleRowProps> = ({ id, index }) => {
    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot,
            ) => (
                <Stack
                    direction='row'
                    alignItems={'center'}
                    gap={1}
                    sx={{ p: 1 }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <IconButton>
                        <DragIndicatorIcon />
                    </IconButton>
                    <FormatAlignLeftIcon />
                    <TextField
                        fullWidth
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        value={"Text"}
                    />
                    <IconButton>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            )}
        </Draggable>
    )
}
