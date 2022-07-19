import { Tooltip, Typography } from '@mui/material';

import { formatDate } from 'utils/Parser'

const fullName = {
    field: 'name',
    headerName: 'Name',
    // width: 180,
    flex: 1,
    minWidth: 180,
    resizable: true,
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap sx={{ cursor: 'pointer' }} >{params.value}</Typography>
        </Tooltip>
    ),
}

const score = {
    field: 'score',
    headerName: 'Score',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    renderCell: (params) => (
        <Typography fontSize={14} noWrap >{params.value}</Typography>
    ),
}

const week = {
    field: 'week',
    headerName: 'Week',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    renderCell: (params) => (
        <Typography fontSize={14} noWrap >{params.value}</Typography>
    ),
}

const notes = {
    field: 'notes',
    headerName: 'Notes',
    flex: 2,
    minWidth: 100,
    // resizable: true,
    renderCell: (params) => (
        <Typography fontSize={14} >{params.value}</Typography>
    ),
}

const win_loss = {
    field: 'win_loss',
    headerName: 'Win',
    flex: 1,
    minWidth: 150,
    // resizable: true,
    renderCell: (params) => (
        <Typography fontSize={14} noWrap >{params.value ? "Yes" : "No"}</Typography>
    ),
}

const createdAt = {
    field: 'created_at',
    headerName: 'Created At',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.created_at ? params.row.created_at : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{formatDate(params.value, 'short')}</Typography>
        </Tooltip>
    ),
}

export const columnsMini = [
    fullName,
    win_loss,
    score,
    week,
    notes,
]

export const columnsFull = [
    fullName,
    score,
    week,
    notes,
    win_loss,
    createdAt,
]