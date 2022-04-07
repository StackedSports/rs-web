
const rank = {
    field: 'rank',
    headerName: 'Rank',
    width: 120,
    valueGetter: (params) => params.row.rank ? params.row.rank : '',
}

export const columns = [
    rank,
]
