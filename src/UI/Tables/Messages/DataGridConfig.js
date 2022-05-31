import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import { getFullName, formatPhoneNumber, formatDate, capitalize, getMessageRecipientResponseLabel } from 'utils/Parser'

const fullName = {
    field: 'fullName',
    headerName: 'Full Name',
    width: 180,
    resizable: true,
    valueGetter: (params) => getFullName(params.row)
}

const boardName = {
    field: 'filterName',
    headerName: 'Board Name',
    width: 180,
    resizable: true,
    valueGetter: (params) => params.row.filterName || ''
}

const sender = {
    field: 'sender',
    headerName: 'Sender',
    width: 180,
    valueGetter: (params) => getFullName(params.row.send_as)
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

const media = {
    field: 'media',
    headerName: 'Media',
    width: 80,
    valueGetter: (params) => params.row.media,
    renderCell: (params) => (
        <img
            className={`MessageDetailValue Media`}
            style={{
                objectFit: 'contain',
                height: 40,
                width: 40,
            }}
            src={params.value?.urls?.original}
        //src="https://stakdsocial.s3.us-east-2.amazonaws.com/mywu70w2pooma2ytfz9q2aez6ywg?response-content-disposition=inline%3B%20filename%3D%22chris_highland.png%22%3B%20filename%2A%3DUTF-8%27%27chris_highland.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220329%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220329T191936Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a5856bda4db5910d2a09cc928d1f5abb2da230b07127996e640f382e1125fad5"  
        />
    )
}

const deliveredAt = {
    field: 'deliveredAt',
    headerName: 'Delivered At',
    width: 130,
    valueGetter: (params) => params.row?.status === 'Sent' ? formatDate(params.row.last_sent_at) : ''
}

const status = {
    field: 'status',
    headerName: 'Status',
    width: 80,
    valueGetter: (params) => capitalize(params.row.status),
    renderCell: (params) => <span className={`MessageDetailValue ${params.value}`}>{params.value}</span>
}

const response = {
    field: 'response',
    headerName: 'Response',
    width: 400,
    // valueGetter: (params) => capitalize(params.row.response),
    renderCell: (params) => <span className={`MessageDetailValue Error`}>{getMessageRecipientResponseLabel(params.value)}</span>
}

const getPlaceholderColumn = (key) => ({
    field: key,
    headerName: `[${key}]`,
    width: 120,
    valueGetter: (params) => params.row.placeholders[key]
})

export const twitterColumns = [
    fullName,
    boardName,
    sender,
    twitterName,
    media,
    deliveredAt,
    status,
    response
]

export const phoneColumns = [
    fullName,
    boardName,
    sender,
    phone,
    media,
    deliveredAt,
    status,
    response
]

export const withPlaceholders = (placeholders) => {
    // placeholders = {
    //     coachs_name: 'value',
    //     first_name: 'value',
    //     last_name: 'value'
    // }
}

export const getColumns = (platform, placeholders, hasFilters, hasMedia, hasCoach) => {
    let columns = []

    columns.push(fullName)

    if (hasFilters)
        columns.push(boardName)

    if (hasCoach)
        columns.push(sender)

    if (platform === 'Twitter')
        columns.push(twitterName)
    else
        columns.push(phone)

    if (placeholders) {
        Object.keys(placeholders).map(key => {
            columns.push(getPlaceholderColumn(key))
        })
    }

    if (hasMedia)
        columns.push(media)

    columns.push(deliveredAt)
    columns.push(status)
    columns.push(response)

    return columns
}