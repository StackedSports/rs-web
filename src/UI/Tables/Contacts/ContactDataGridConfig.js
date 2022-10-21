import { Tooltip, Typography, Box } from '@mui/material';
import { GRID_TREE_DATA_GROUPING_FIELD } from '@mui/x-data-grid-pro';

import { formatDate, formatPhoneNumber, getFullName } from 'utils/Parser'

import AvatarImg from "images/avatar.png";
import { getColumns } from '../Messages/DataGridConfig';
import { PreferencesContext } from 'Context/PreferencesProvider';
import { useContext, useEffect, useMemo, useState } from 'react';


const getImg = (profile_image) => {
    return profile_image && !profile_image.includes('contact-missing-image') ?
        profile_image : AvatarImg
}

const profileImg = {
    field: 'profile_image',
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
    field: 'full_name',
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
    field: 'first_name',
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
    field: 'last_name',
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
    field: 'nick_name',
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
    field: 'twitter_profile',
    headerName: 'Twitter',
    // width: 130,
    flex: 1,
    minWidth: 120,
    sortable: false,
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
    field: 'high_school',
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
    field: 'grad_year',
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
    field: 'positions',
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
    field: 'area_coach',
    headerName: 'Area Coach',
    flex: 1,
    sortable: false,
    minWidth: 150,
    valueGetter: (params) => params.row.area_coach?.full_name || '',
    renderCell: (params) => (
        <Tooltip title={params.value} placement='right-start'>
            <Typography fontSize={14} noWrap >{params.value}</Typography>
        </Tooltip>
    ),
}

const positionCoach = {
    field: 'position_coach',
    headerName: 'Position Coach',
    sortable: false,
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
    field: 'coordinator',
    headerName: 'Recruiting Coach',
    sortable: false,
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
    sortable: false,
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
    field: 'status_2',
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
    sortable: false,
    minWidth: 100,
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
    sortable: false,
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
    field: 'time_zone',
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
    field: 'dob',
    headerName: 'Birthday',
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

export const getColumnsByPreferences = (isMini, showDisabledColumns = false) => {
    const preferences = useContext(PreferencesContext)
    const tempColumns = useMemo(() => isMini ? columnsMini : columnsFull, [isMini])
    const [columns, setColumns] = useState(tempColumns)

    useEffect(() => {
        if (!preferences)
            return
        const { labels } = preferences
        const labelsMap = new Map(labels)

        const filteredColumns = tempColumns.filter(colum => !labelsMap.get(colum.field) || showDisabledColumns || labelsMap.get(colum.field).enabled)
        const parsedColumns = filteredColumns.map(colum => {
            const temp = labelsMap.get(colum.field)
            if (temp) {
                return {
                    ...colum,
                    headerName: temp.label
                }
            }
            else
                return colum
        })
        setColumns(parsedColumns)
    }, [preferences, tempColumns])
    return columns
}

export const parseColumnsNames = (property) => {
    switch (property) {
        case 'created_at':
        case 'last_messaged_at':
            return null
        case 'twitter_name':
        case 'twitter':
            return 'twitter_profile'
        case 'ranks':
            return 'rank'
        case 'years':
            return 'grad_year'
        case 'positions':
        case 'team_positions':
            return 'positions'
        case 'area_coaches':
            return 'area_coach'
        case 'position_coaches':
            return 'position_coach'
        case 'timezones':
            return 'time_zone'
        case 'states':
            return 'state'
        default:
            return property
    }
}

export const getApiModel = (sortModel) => {
    if (sortModel.length === 0) return {}
    const result = {
        sort_column: sortModel[0].field,
        sort_dir: sortModel[0].sort
    }
    console.log(result)
    return result
}