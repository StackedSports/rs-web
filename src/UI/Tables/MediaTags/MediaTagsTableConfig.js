
const name = {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

const totalMediaCount = {
    field: 'total_media_count',
    headerName: 'Total Count',
    flex: 1,
    valueGetter: (params) => params.row.total_media_count ? params.row.total_media_count : '',
}

const additionMediaCount = {
    field: 'addition_media_count',
    headerName: 'Additional Count',
    flex: 1,
    valueGetter: (params) => params.row.additional_media_count ? params.row.additional_media_count : '',
}

export const columns = [
    name,
    totalMediaCount,
    additionMediaCount
]
