
const name = {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

const media = {
    field: 'media',
    headerName: 'Media',
    flex: 1,
    valueGetter: (params) => params.row.media ? params.row.media.length : '',
}

const updatedAt = {
    field: 'updatedAt',
    headerName: 'Updated At',
    flex: 1,
    valueGetter: (params) => params.row.created_at ? new Date( params.row.created_at).toLocaleDateString(navigator.language) : '',
}

export const columns = [
    name,
    media,
    updatedAt,
]
