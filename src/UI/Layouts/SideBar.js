import './SideBar.css'
import { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

import AccountMenu from 'UI/Widgets/AccountMenu'

import { routes } from 'Routes/Routes'

import { getFullName } from 'utils/Parser'

const items = [
    routes.dashboard,
    routes.contacts,
    routes.messages,
    routes.media,
    routes.twitterPosts,
    routes.twitterStream,
    routes.settings
]

export default function SideBar(props) {
    
    return (
        <div className='SideBar'>
            {items.map(item => (
                <NavLink key={item.path} className='navLink' activeClassName='selected' to={item.path}>
                    <item.icon className='icon'/>
                    {/* <p className='label'>Dashboard</p> */}
                </NavLink>
            ))}
            <Stack
              flex={1} 
              alignItems="center" 
              justifyContent="flex-end"
              mb={2}
            >
                <AccountMenu/>
            </Stack>
        </div>
    )
}