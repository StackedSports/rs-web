
const description = {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (params) => params.row.description ? params.row.description : '',
}

// const createdAt = {
//     field: 'createdAt',
//     headerName: 'Created At',
//     flex: 1,
//     valueGetter: (params) => params.row.created_at ? new Date(params.row.created_at).toLocaleDateString(navigator.language)  : '',
// }

// const updatedAt = {
//     field: 'updatedAt',
//     headerName: 'Updated At',
//     flex: 1,
//     valueGetter: (params) => params.row.updated_at ? new Date(params.row.updated_at).toLocaleDateString(navigator.language) : '',
// }


export const columns = [
    description,
    // createdAt,
    // updatedAt,
]
