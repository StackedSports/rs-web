
const name = {
    field: 'name',
    headerName: 'Name',
    width: 250,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

const role = {
    field: 'role',
    headerName: 'Role',
    width: 100,
    valueGetter: (params) => params.row.role ? params.row.role : '',
}

const alternateName = {
    field: 'alternateName',
    headerName: 'Alternate Name',
    width: 150,
    valueGetter: (params) => params.row.alternate_names ? params.row.alternate_names : '',
}

const abbreviation = {
    field: 'abbreviation',
    headerName: 'Abbreviation',
    width: 100,
    valueGetter: (params) => params.row.abbreviation ? params.row.abbreviation : '',
}

const standardizedName = {
    field: 'standardizedName',
    headerName: 'Standardized Name',
    width: 150,
    valueGetter: (params) => params.row.standardized_name ? params.row.standardized_name : '',
}

export const columns = [
    name,
    abbreviation,
    standardizedName,
    role,
    alternateName,
]
