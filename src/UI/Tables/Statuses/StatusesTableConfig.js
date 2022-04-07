
const status = {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    valueGetter: (params) => params.row.status ? params.row.status : '',
}

export const columns = [
    status,
]
