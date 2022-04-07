
const content = {
    field: 'content',
    headerName: 'Content',
    // width: 500,
    flex: 1,
    valueGetter: (params) => params.row.content ? params.row.content : '',
}

export const columns = [
    content,
]
