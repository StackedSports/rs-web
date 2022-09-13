import { Tooltip, Typography, Box } from '@mui/material';
import { GRID_TREE_DATA_GROUPING_FIELD } from '@mui/x-data-grid-pro';

import { formatDate, formatPhoneNumber, getFullName } from 'utils/Parser'

import AvatarImg from "images/avatar.png";


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
        if (params.rowNode.depth !== 0)
            return null
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
    minWidth: 180,
    resizable: true,
    valueGetter: (params) => params.row.fullName || getFullName(params.row),
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography component='span' fontSize={14} noWrap >{params.value}</Typography>
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

const nickName = {
    field: 'nickName',
    headerName: 'Nick Name',
    flex: 1,
    minWidth: 100,
    // resizable: true,
    valueGetter: (params) => params.row.nick_name ? params.row.nick_name : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const twitterName = {
    field: 'twitterProfile',
    headerName: 'Twitter',
    // width: 130,
    flex: 1,
    minWidth: 120,
    // resizable: true,
    valueGetter: (params) => {
        let contact = params.row
        if (contact.tweetUsername)
            return `@${contact.tweetUsername}`
        else if (contact.twitter_profile && contact.twitter_profile.screen_name)
            return `@${params.row.twitter_profile?.screen_name}`
        else
            return ''
    },
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

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

const state = {
    field: 'state',
    headerName: 'State',
    width: 70
    // flex: 1,
}

const school = {
    field: 'school',
    headerName: 'School',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.high_school ? params.row.high_school : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const gradYear = {
    field: 'gradYear',
    headerName: 'Grad Year',
    flex: 'fit-content',
    valueGetter: (params) => params.row.grad_year ? params.row.grad_year : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const positions = {
    field: 'position',
    headerName: 'Position',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.positions ? params.row.positions.join(", ").toUpperCase() : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const areaCoach = {//array
    field: 'areaCoach',
    headerName: 'Area Coach',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.area_coach?.full_name || '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const positionCoach = {
    field: 'positionCoach',
    headerName: 'Position Coach',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.position_coach?.full_name || '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const recruitingCoach = {
    field: 'recruitingCoach',
    headerName: 'Recruiting Coach',
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.coordinator?.full_name || '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const status = {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.status ? params.row.status.status : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const status2 = {
    field: 'status2',
    headerName: 'Status 2',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.status_2 ? params.row.status_2 : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const tags = {
    field: 'tags',
    headerName: 'Tags',
    // width: 120,
    flex: 1,
    valueGetter: (params) => params.row.tags ? params.row.tags.map(tag => tag.name).join(", ") : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const rank = {
    field: 'rank',
    headerName: 'Rank',
    flex: 1,
    minWidth: 70,
    valueGetter: (params) => params.row.rank ? params.row.rank.rank : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const lastMessaged = {
    field: 'lastMessaged',
    headerName: 'Last Messaged',
    sortable: false,
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const mostActiveTime = {
    field: 'mostActiveTime',
    sortable: false,
    headerName: 'Most Active Time',
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const dateAdded = {
    field: 'dateAdded',
    headerName: 'Date Added',
    sortable: false,
    // width: 120,
    flex: 1,
    // valueGetter: (params) => params.row. ? params.row. : ''
}

const timeZone = {
    field: 'timeZone',
    headerName: 'Time Zone',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.time_zone ? params.row.time_zone : '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const birthday = {
    field: 'birthday',
    headerName: 'Birthday ',
    flex: 1,
    minWidth: 100,
    valueGetter: (params) => params.row.dob ? new Date(params.row.dob.split('-')) : '',
    renderCell: (params) => (
        <Tooltip title={formatDate(params.value, 'short')} placement='right-start'>
            <Typography fontSize={14} noWrap >{formatDate(params.value, 'short')}</Typography>
        </Tooltip>
    ),
}

const relationships = {
    field: GRID_TREE_DATA_GROUPING_FIELD,
}

export const columnsMini = [
    profileImg,
    fullName,
    twitterName,
    phone,
]

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
    relationships,
    positions,
    areaCoach,
    positionCoach,
    recruitingCoach,
    status,
    status2,
    tags,
    rank,
    // lastMessaged,
    // mostActiveTime,
    // dateAdded,
    timeZone,
    birthday,
]

export const parseColumnsNames = (property) => {
    switch (property) {
        case 'created_at':
        case 'last_messaged_at':
            return null
        case 'profile_image':
            return 'profileImg'
        case 'first_name':
            return 'firstName'
        case 'last_name':
            return 'lastName'
        case 'nick_name':
            return 'nickName'
        case 'twitter_name':
        case 'twitter':
            return 'twitterName'
        case 'ranks':
            return 'rank'
        case 'grad_year':
            return 'gradYear'
        case 'positions':
        case 'team_positions':
            return 'position'
        case 'area_coaches':
            return 'areaCoach'
        case 'position_coaches':
            return 'positionCoach'
        case 'timezones':
            return 'timeZone'
        case 'states':
            return 'state'
        case 'dob':
            return 'birthday'
        default:
            return property
    }
}