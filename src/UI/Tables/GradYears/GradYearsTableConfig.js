
const year = {
    field: 'year',
    headerName: 'Year',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.year ? params.row.year : '',
}

export const columns = [
    year,
]
