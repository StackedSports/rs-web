import { Link } from 'react-router-dom'

import { formatDate } from 'utils/Parser'
import { mediaRoutes } from 'Routes/Routes'

const nameMedia = {
    field: 'name',
    headerName: 'Name',
    // width: 150,
    flex: 3,
    valueGetter: (params) => params.row.name || params.row.file_name,
    renderCell: (params) => (
        <Link
            style={{ color: 'inherit' }}
            to={`${mediaRoutes.mediaDetails}/${params.row.id}`}
        >
            {params.value}
        </Link>
    ),
}

const namePlaceholder = {
    field: 'name',
    headerName: 'Name',
    // width: 150,
    flex: 3,
    valueGetter: (params) => params.row.name || params.row.file_name,
    renderCell: (params) => <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`${mediaRoutes.placeholderDetails}/${params.row.id}`}>{params.value}</Link>,
}

const placeholderMediaCount = {
    field: 'media',
    headerName: 'File Count',
    flex: 1,
    valueGetter: (params) => params.row.media_count
}

const associatedTo = {
    field: 'associatedTo',
    headerName: 'Associated to',
    flex: 2,
    valueGetter: (params) => params.row.contact ? params.row.contact.first_name + ' ' + params.row.contact.last_name : ''
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
    type: 'date',
    headerName: 'Last Modified',
    valueGetter: (params) => formatDate(new Date(params.value), 'short', 'short'),
    flex: 1,
    // width: 200
}

// Reusing same properties
export const columnsMedias = [
    nameMedia,
    associatedTo,
    file,
    owner,
    updatedAt,
];

// Reusing same properties
export const columnsPlaceHolders = [
    namePlaceholder,
    placeholderMediaCount,
    updatedAt,
];