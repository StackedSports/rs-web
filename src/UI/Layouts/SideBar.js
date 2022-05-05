import './SideBar.css'
import { useContext, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import Stack from '@mui/material/Stack'

import AccountMenu from 'UI/Widgets/AccountMenu'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { routes } from 'Routes/Routes'


const regularItems = [
    routes.dashboard,
    routes.contacts,
    routes.messages,
    routes.media,
    // routes.twitterPosts,
    // routes.twitterStream,
    routes.settings
]

export default function SideBar(props) {
    const { user } = useContext(AuthContext)

    // console.log(user)

    const privateItems = useMemo(() => {
        let items = Object.assign([], regularItems)
        // return items
        if(user && user.email === 'ben@stackedsports.com') {
            items.splice(4, 0, routes.twitterPosts, routes.twitterStream)
        }

        return items
    }, [user])

    // console.log(privateItems)

    return (
        <div className='SideBar'>
            {privateItems.map(item => (
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