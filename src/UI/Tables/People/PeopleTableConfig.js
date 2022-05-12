import { Tooltip, Typography } from '@mui/material';

import { formatDate, formatPhoneNumber } from 'utils/Parser'

// import AvatarImg from "images/avatar.png";

// const getImg = (profile_image) => {
//     return profile_image && !profile_image.includes('contact-missing-image') ?
//         profile_image : AvatarImg
// }

// const profileImg = {
//     field: 'profileImg',
//     headerName: '',
//     width: 50,
//     sortable: false,
//     valueGetter: (params) => params.row.twitter_profile?.profile_image,
//     renderCell: (params) => {
//         // console.log(params)
//         return (
//             <img
//                 src={getImg(params.value)}
//                 style={{ width: 30, height: 30, borderRadius: "50%" }}
//             />
//         )
//     }
// }

const fullName = {
    field: 'fullName',
    headerName: 'Full Name',
    // width: 180,
    flex: 2,
    minWidth: 180,
    resizable: true,
    valueGetter: (params) => `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap sx={{ cursor: 'pointer' }} >{params.value}</Typography>
        </Tooltip>
    ),
}

const firstName = {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    valueGetter: (params) => params.row.first_name ? params.row.first_name : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const lastName = {
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    valueGetter: (params) => params.row.last_name ? params.row.last_name : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const email = {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    valueGetter: (params) => params.row.email ? params.row.email : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

// const twitterName = {
//     field: 'twitterProfile',
//     headerName: 'Twitter',
//     // width: 130,
//     flex: 1,
//     minWidth: 120,
//     // resizable: true,
//     valueGetter: (params) => {
//         let contact = params.row

//         if (contact.twitter_profile && contact.twitter_profile.screen_name)
//             return `@${params.row.twitter_profile?.screen_name}`
//         else
//             return ''
//     },
//     renderCell: (params) => (
//         <Tooltip title={params.value} placement='right-start'>
//             <Typography fontSize={14} noWrap >{params.value}</Typography>
//         </Tooltip>
//     ),
// }

const phone = {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    minWidth: 150,
    // resizable: true,
    valueGetter: (params) => formatPhoneNumber(params.row.phone),
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}


const livesWith = {
    field: 'livesWith',
    headerName: 'Lives With',
    flex: 1,
    minWidth: 150,
    // resizable: true,
    valueGetter: (params) => params.row.lives_with ? params.row.lives_with : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value ? "Yes" : "No"}</Typography>
        </Tooltip>
    ),
}

const createdAt = {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.created_at ? params.row.created_at : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{formatDate(params.value, 'short')}</Typography>
        </Tooltip>
    ),
}

const relationshipType = {
    field: 'relationshipType',
    headerName: 'Relationship Type',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.relationship_type ? params.row.relationship_type.description : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const topInfluencer = {
    field: 'topInfluencer',
    headerName: 'Top Influencer',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.top_influencer ? params.row.top_influencer : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value ? "Yes" : "No"}</Typography>
        </Tooltip>
    ),
}

const updatedAt = {
    field: 'updatedAt',
    headerName: 'Updated At',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.updated_at ? params.row.updated_at : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{formatDate(params.value, 'short')}</Typography>
        </Tooltip>
    ),
}


export const columnsMini = [
    // profileImg,
    fullName,
    email,
    phone,
    relationshipType,
    livesWith,
    topInfluencer,
]

export const columnsFull = [
    // profileImg,
    fullName,
    firstName,
    lastName,
    email,
    phone,
    relationshipType,
    livesWith,
    topInfluencer,
    updatedAt,
    createdAt,
]