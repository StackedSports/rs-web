import { formatPhoneNumber } from 'utils/Parser'

import AvatarImg from "images/avatar.png";

// const getImg = (profile_image) => {
//     return profile_image && !profile_image.includes('contact-missing-image') ?
//         profile_image : AvatarImg
// }

// const profileImg = { 
//     field: 'profile',
//     headerName: '',
//     width: 50,
//     sortable: false,
//     valueGetter: (params) => params.row.twitter_profile?.profile_image,
//     renderCell: (params) => {
//         // console.log(params)
//         return (
//             <img
//               src={getImg(params.value)}
//               style={{ width: 30, height: 30, borderRadius: "50%" }}
//             />
//         )
//     }
// }

// const fullName = { 
//     field: 'fullName',
//     headerName: 'Full Name',
//     width: 250,
//     resizable: true,
//     valueGetter: (params) => {
//         let contact = params.row

//         return contact.first_name + ' ' + contact.last_name
//     }
// }

// const twitterName = { 
//     field: 'twitter_profile',
//     headerName: 'Twitter',
//     width: 180,
//     // resizable: true,
//     valueGetter: (params) => {
//         let contact = params.row

//         if(contact.twitter_profile && contact.twitter_profile.screen_name)
//             return `@${params.row.twitter_profile?.screen_name}`
//         else
//             return ''
//     }
// }

// const phone = { 
//     field: 'phone',
//     headerName: 'Phone',
//     width: 180,
//     // resizable: true,
//     valueGetter: (params) => formatPhoneNumber(params.row.phone)
// }


// const status = {
//     field: 'status',
//     headerName: 'Status',
//     width: 120,
//     valueGetter: (params) => params.row.status? params.row.status : ''
// }

// const role = {
//     field: 'role',
//     headerName: 'Role',
//     width: 120,
//     valueGetter: (params) => params.row.role? params.row.role : ''
// }

const year = {
    field: 'year',
    headerName: 'Year',
    width: 120,
    valueGetter: (params) => params.row.year ? params.row.year : '',
}

export const columns = [
    year,
    // profileImg,
    // fullName,
    // twitterName,
    // phone,
    // role,
    // status
]
