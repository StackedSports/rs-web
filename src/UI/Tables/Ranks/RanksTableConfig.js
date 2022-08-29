
const rank = {
    field: 'rank',
    headerName: 'Rank',
    flex: 1,
    valueGetter: (params) => params.row.rank ? params.row.rank : '',
}

export const columns = [
    rank,
]
