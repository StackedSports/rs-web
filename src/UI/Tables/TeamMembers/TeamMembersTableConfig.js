import { Link } from 'react-router-dom';
import AvatarImg from "images/avatar.png";

import { formatPhoneNumber } from 'utils/Parser';
import { settingsRoutes } from 'Routes/Routes';
import { Avatar, Tooltip, Typography } from '@mui/material';


const getImg = (profile_image) => {
    return profile_image && !profile_image.includes('contact-missing-image') ?
        profile_image : AvatarImg
}

const profileImg = {
    field: 'profile',
    headerName: '',
    width: 50,
    sortable: false,
    valueGetter: (params) => params.row.twitter_profile,
    renderCell: (params) => {
        return (
            <Avatar
                alt={params.row.first_name}
                src={getImg(params.value?.profile_image)}
                sx={{ width: 40, height: 40, justifySelf: 'center' }}
            />
        )
    },
}

const fullName = {
    field: 'fullName',
    headerName: 'Full Name',
    // width: 250,
    flex: 2,
    resizable: true,
    valueGetter: (params) => {
        let contact = params.row

        return contact.first_name + ' ' + contact.last_name
    },
    renderCell: (params) => (
        <Link
            style={{ color: 'inherit', width:'100%' }}
            to={`${settingsRoutes.general.member}/${params.row.id}`}
        >
            {params.value}
        </Link>
    ),
}

const twitterName = {
    field: 'twitter_profile',
    headerName: 'Twitter',
    // width: 180,
    flex: 1,
    // resizable: true,
    valueGetter: (params) => {
        let contact = params.row

        if (contact.twitter_profile && contact.twitter_profile.screen_name)
            return `@${params.row.twitter_profile?.screen_name}`
        else
            return ''
    },
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography component='span' style={{ fontSize: 12 }} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const phone = {
    field: 'phone',
    headerName: 'Personal Phone',
    width: 180,
    flex: 1,
    // resizable: true,
    valueGetter: (params) => formatPhoneNumber(params.row.phone),
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography component='span' style={{ fontSize: 12 }} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}


const smsNumber = {
    field: 'smsNumber',
    headerName: 'Sms Number',
    width: 160,
    flex: 1,
    // resizable: true,
    valueGetter: (params) => params.row.sms_number ? formatPhoneNumber(params.row.sms_number) : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography component='span' style={{ fontSize: 12 }} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}


const status = {
    field: 'status',
    headerName: 'Status',
    width: 120,
    // flex: 1,
    valueGetter: (params) => params.row.status ? params.row.status : ''
}

const role = {
    field: 'role',
    headerName: 'Role',
    width: 120,
    // flex: 1,
    valueGetter: (params) => params.row.role ? params.row.role : ''
}

export const columns = [
    profileImg,
    fullName,
    twitterName,
    phone,
    smsNumber,
    role,
    status
]
