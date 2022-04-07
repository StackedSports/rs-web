
const name = {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params) => params.row.name ? params.row.name : '',
}

const contacts = {
    field: 'contacts',
    headerName: 'Contacts',
    flex: 1,
    valueGetter: (params) => params.row.contacts ? params.row.contacts.count : 0,
}

const privacy = {
    field: 'privacy',
    headerName: 'Privacy',
    flex: 1,
    valueGetter: (params) => params.row.is_shared ? 'Public' : 'Private',
}

export const columns = [
    name,
    contacts,
    privacy,
]
