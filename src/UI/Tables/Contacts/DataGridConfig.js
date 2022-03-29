import { formatPhoneNumber } from 'utils/Parser'

import AvatarImg from "images/avatar.png";

const getImg = (profile_image) => {
    return profile_image && !profile_image.includes('contact-missing-image') ?
        profile_image : AvatarImg
}

const profileImg = { 
    field: 'profile',
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
    width: 180,
    resizable: true,
    valueGetter: (params) => {
        let contact = params.row

        return contact.first_name + ' ' + contact.last_name
    }
}

const twitterName = { 
    field: 'twitter_profile',
    headerName: 'Twitter',
    width: 130,
    // resizable: true,
    valueGetter: (params) => {
        let contact = params.row

        if(contact.twitter_profile && contact.twitter_profile.screen_name)
            return `@${params.row.twitter_profile?.screen_name}`
        else
            return ''
    }
}

const phone = { 
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    // resizable: true,
    valueGetter: (params) => formatPhoneNumber(params.row.phone)
}

const state = {
    field: 'state',
    headerName: 'State',
    width: 60
}

const gradYear = {
    field: 'grad_year',
    headerName: 'Grad Year',
    width: 90
}

const school = {
    field: 'high_school',
    headerName: 'School',
    width: 120
}

const status = {
    field: 'status',
    headerName: 'Status',
    width: 120,
    valueGetter: (params) => params.row.status? params.row.status.status : ''
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
    twitterName,
    phone,
    state,
    gradYear,
    school,
    status
]