import React from 'react'
import { IconButton, Stack, SvgIconTypeMap, Typography } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { labelValues } from 'Pages/Settings/ContactSettingsPage';
import { DraggableProvided } from 'react-beautiful-dnd';

interface ContactSettingsRowProps {
    onOpenModal: (index: number) => void,
    onToggleEnable: (index: number) => void,
    values: labelValues,
    dndProvide?: DraggableProvided
}

export const ContactSettingsRow: React.FC<ContactSettingsRowProps> = ({
    values,
    dndProvide,
    onOpenModal,
    onToggleEnable
}) => {
    const TypeIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; } = {
        'date-picker': CalendarMonthIcon,
        'multi-select': FormatListBulletedIcon,
        'select': CheckCircleOutlineIcon,
        'text': FormatAlignLeftIcon
    }[values.type]

    return (
        <Stack
            direction='row'
            alignItems={'center'}
            ref={dndProvide?.innerRef}
            {...dndProvide?.draggableProps}
        >
            <IconButton
                size='small'
                sx={{ borderRadius: 0, color: 'text.secondary' }}
                disabled={true}
                {...dndProvide?.dragHandleProps}
            >
                <DragIndicatorIcon />
            </IconButton>
            <TypeIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography textTransform={'capitalize'}>
                {values.label}
            </Typography>
            <Stack
                direction='row'
                alignItems={'center'}
                ml={'auto'}
            >
                <IconButton
                    sx={{ color: 'text.secondary' }}
                    onClick={() => onToggleEnable(values.index)}
                >
                    {values.enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                {values.enabled && (
                    <IconButton
                        sx={{ color: 'text.secondary' }}
                        onClick={() => onOpenModal(values.index)}
                        disabled={!values.customizable}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
            </Stack>
        </Stack>

    )
}
