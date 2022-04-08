import { formatDate } from 'utils/Parser'

const name = {
    field: 'name',
    headerName: 'Name',
    // width: 150,
    flex: 3,
    valueGetter: (params) => params.row.name || params.row.file_name
}

const file = {
    field: 'urls',
    headerName: 'File',
    // width: 100,
    flex: 1,
    renderCell: (params) => (
        <img 
          height="50px" 
          width="50px" 
          style={{ objectFit: 'contain' }} 
          src={params.value?.original} 
        />
    ),
}

const owner = {
    field: 'owner',
    headerName: 'Owner',
    // width: 160,
    flex: 2,
    valueGetter: (params) =>
        `${params.value.first_name || ''} ${params.value?.last_name || ''}`,
}

const updatedAt = {
    field: 'updated_at',
    headerName: 'Last Modified',
    valueGetter: (params) => formatDate(new Date(params.value), 'short', 'short'),
    flex: 1,
    // width: 200
}

// Reusing same properties
export const columnsMedias = [
    name,
    file,
    owner,
    updatedAt,
];

// Reusing same properties
export const columnsPlaceHolders = [
    name,
    updatedAt,
];