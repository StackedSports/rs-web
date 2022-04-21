import { Link } from 'react-router-dom'
import { Tooltip, Typography } from '@mui/material';

import { formatPhoneNumber } from 'utils/Parser'
import { contactsRoutes } from 'Routes/Routes'

import AvatarImg from "images/avatar.png";

const getFullName = (params) => {
    if(params)
        return `${params.first_name || ''} ${params.last_name || ''}`
    else
        ''
}

const getImg = (profile_image) => {
    return profile_image && !profile_image.includes('contact-missing-image') ?
        profile_image : AvatarImg
}

const profileImg = {
    field: 'profileImg',
    headerName: '',
    width: 50,
    sortable: false,
    valueGetter: (params) => params.row.twitter_profile?.profile_image,
    renderCell: (params) => {
        // console.log(params)
        return (
            <img
                src={getImg(params.value)}
                style={{ width: 30, height: 30, borderRadius: "50%" }}
            />
        )
    }
}

const fullName = {
    field: 'fullName',
    headerName: 'Full Name',
    // width: 180,
    flex: 2,
    resizable: true,
    valueGetter: (params) => getFullName(params.row),
    renderCell: (params) => (
        <Tooltip title={getFullName(params.row)} placement='right-start'>
            <Link 
              style={{ color:'inherit' }} 
              to={`${contactsRoutes.profile}/${params.row.id}`}
            >
                {params.value}
            </Link>
        </Tooltip>
    ),
}

const firstName = {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1,
    // resizable: true,
    valueGetter: (params) => params.row.first_name ? params.row.first_name : ''
}

const lastName = {
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1,
    // resizable: true,
    valueGetter: (params) => params.row.last_name ? params.row.last_name : ''
}

const nickName = {
    field: 'nickName',
    headerName: 'Nick Name',
    flex: 1,
    // resizable: true,
    valueGetter: (params) => params.row.nick_name ? params.row.nick_name : ''
}

const twitterName = {
    field: 'twitterName',
    headerName: 'Twitter',
    // width: 130,
    flex: 1,
    // resizable: true,
    valueGetter: (params) => {
        let contact = params.row

        if (contact.twitter_profile && contact.twitter_profile.screen_name)
            return `@${params.row.twitter_profile?.screen_name}`
        else
            return ''
    }
}

const phone = {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    // flex: 1,
    // resizable: true,
    valueGetter: (params) => formatPhoneNumber(params.row.phone)
}

const state = {
    field: 'state',
    headerName: 'State',
    width: 80
    // flex: 1,
}

const school = {
    field: 'school',
    headerName: 'School',
    // width: 120
    flex: 1,
    valueGetter: (params) => params.row.high_school ? params.row.high_school : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
         <Typography noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const gradYear = {
    field: 'gradYear',
    headerName: 'Grad Year',
    flex: 1,
    valueGetter: (params) => params.row.grad_year ? params.row.grad_year : ''
}

const positions = {
    field: 'positions',
    headerName: 'Position',
    flex: 1,
    valueGetter: (params) => params.row.positions ? params.row.positions.join(", ").toUpperCase() : ''
}

const areaCoach = {//array
    field: 'areaCoach',
    headerName: 'Area Coach',
    flex: 1,
    valueGetter: (params) => params.row.area_coach?.full_name || ''
}

const positionCoach = {
    field: 'positionCoach',
    headerName: 'Position Coach',
    flex: 1,
    valueGetter: (params) => params.row.position_coach?.full_name || ''
}

const recruitingCoach = {
    field: 'recruitingCoach',
    headerName: 'Recruiting Coach',
    flex: 1,
    valueGetter: (params) => params.row.coordinator?.full_name || ''
}

const status = {
    field: 'status',
    headerName: 'Status',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.status ? params.row.status.status : ''
}

const status2 = {
    field: 'status2',
    headerName: 'Status 2',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.status_2 ? params.row.status_2 : ''
}

const rank = {
    field: 'rank',
    headerName: 'Rank',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.rank ? params.row.rank.rank : ''
}

const lastMessaged = {
    field: 'lastMessaged',
    headerName: 'Last Messaged',
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const mostActiveTime = {
    field: 'mostActiveTime',
    headerName: 'Most Active Time',
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const dateAdded = {
    field: 'dateAdded',
    headerName: 'Date Added',
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const timeZone = {
    field: 'timeZone',
    headerName: 'Time Zone',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.time_zone ? params.row.time_zone : ''
}

const birthday = {
    field: 'birthday',
    headerName: 'Birthday ',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.dob ? new Date(params.row.dob) : ''
}

export const columnsMini = [
    profileImg,
    fullName,
    twitterName,
    phone,
]

// export const columnsFull = [
//     profileImg,
//     fullName,
//     twitterName,
//     phone,
//     state,
//     gradYear,
//     school,
//     status
// ]

export const columnsFull = [
    profileImg,
    fullName,
    firstName,
    lastName,
    nickName,
    twitterName,
    phone,
    state,
    school,
    gradYear,
    positions,
    areaCoach,
    positionCoach,
    recruitingCoach,
    status,
    status2,
    rank,
    // lastMessaged,
    // mostActiveTime,
    // dateAdded,
    timeZone,
    birthday,
]
