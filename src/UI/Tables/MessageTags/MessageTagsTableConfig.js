
const name = {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

const taggings_count = {
    field: 'taggings_count',
    headerName: 'Taggings Count',
    flex: 1,
    valueGetter: (params) => params.row.taggings_count ? params.row.taggings_count : '',
}

export const columns = [
    name,
    taggings_count
]
