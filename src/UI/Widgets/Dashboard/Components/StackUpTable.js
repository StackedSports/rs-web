import React from 'react'
import { Avatar } from '@mui/material'

import { DataGridPro } from '@mui/x-data-grid-pro';

const columns = [
    {
        field: 'rank',
        headerName: 'Rank ',
        width: 70,
    },
    {
        field: 'image',
        headerName: 'Image',
        renderCell: (params) =>
            <Avatar
                alt={params.row.name}
                src={params.row.image}
                sx={{ width: 40, height: 40, justifySelf: 'center' }}
            />
        ,
        width: 70,
        sortable: false,
    },
    {
        field: 'name',
        headerName: 'Name ',
        flex: 2
    },
    {
        field: 'dms',
        headerName: 'DM’s',
        flex: 1
    },
    {
        field: 'pts',
        headerName: 'Personal Text',
        flex: 1
    },
    {
        field: 'rst',
        headerName: 'RS Text',
        flex: 1
    },
    {
        field: 'total',
        headerName: 'Total',
        flex: 1
    },
]


export const StackUpTable = (props) => {

    return (
        <DataGridPro
            {...props}
            columns={columns}
            autoPageSize
            hideFooter
        />
    )
}

export default StackUpTable
