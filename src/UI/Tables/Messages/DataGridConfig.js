import { getFullName, formatPhoneNumber, formatDate, capitalize } from 'utils/Parser'

const fullName = { 
    field: 'fullName',
    headerName: 'Full Name',
    width: 180,
    resizable: true,
    valueGetter: (params) => getFullName(params.row)
}

const twitterName = { 
    field: 'twitter_profile',
    headerName: 'Twitter',
    width: 130,
    // resizable: true,
    valueGetter: (params) => `@${params.row.twitter_handle}`
}

const phone = { 
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    // resizable: true,
    valueGetter: (params) => formatPhoneNumber(params.row.phone)
}

const deliveredAt = {
    field: 'deliveredAt',
    headerName: 'Delivered At',
    width: 130,
    valueGetter: (params) => formatDate(params.row.last_sent_at || params.row.send_at)
}

const status = {
    field: 'status',
    headerName: 'Status',
    width: 80,
    valueGetter: (params) => capitalize(params.row.status),
    renderCell: (params) => <span className={`MessageDetailValue ${params.value}`}>{params.value}</span>
}

const getPlaceholderColumn = (key) => ({
    field: key,
    headerName: `[${key}]`,
    width: 120,
    valueGetter: (params) => params.row.placeholders[key]
})

export const twitterColumns = [
    fullName,
    twitterName,
    deliveredAt,
    status
]

export const phoneColumns = [
    fullName,
    phone,
    deliveredAt,
    status
]

export const withPlaceholders = (placeholders) => {
    // placeholders = {
    //     coachs_name: 'value',
    //     first_name: 'value',
    //     last_name: 'value'
    // }
}

export const getColumns = (platform, placeholders) => {
    let columns = []

    columns.push(fullName)

    if(platform === 'Twitter')
        columns.push(twitterName)
    else
        columns.push(phone)

    if(placeholders) {
        Object.keys(placeholders).map(key => {
            columns.push(getPlaceholderColumn(key))
        })  
    }

    columns.push(deliveredAt)
    columns.push(status)

    return columns
}