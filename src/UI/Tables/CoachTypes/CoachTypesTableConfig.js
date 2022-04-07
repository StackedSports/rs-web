
const type = {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    valueGetter: (params) => params.row.type ? params.row.type : '',
}

export const columns = [
    type,
]
