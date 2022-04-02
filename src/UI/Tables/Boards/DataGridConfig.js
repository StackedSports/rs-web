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

const name = { 
    field: 'name',
    headerName: 'Name',
    width: 180,
    resizable: true
}

const contacts = {
    field: 'contacts',
    headerName: 'Contacts',
    valueGetter: (params) => params.row.contacts.count
}

export const columns = [
    // profileImg,
    name,
    contacts
]
