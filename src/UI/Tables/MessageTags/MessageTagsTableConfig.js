
const name = {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

export const columns = [
    name,
]
