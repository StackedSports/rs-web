import './SideBar.css'
import React, { useContext, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import Stack from '@mui/material/Stack'

import AccountMenu from 'UI/Widgets/AccountMenu'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { routes, messageRoutes } from 'Routes/Routes'
import { Box } from '@mui/material'

const regularItems = [
    routes.dashboard,
    routes.contacts,
    { ...routes.messages, path: messageRoutes.create },
    routes.media,
    routes.tweet,
    routes.tweetPost,
    // routes.twitterPosts,
    // routes.twitterStream,
    routes.settings,
]

export default function SideBar(props) {
    const { user } = useContext(AuthContext)

    // console.log(user)

    const privateItems = useMemo(() => {
        let items = Object.assign([], regularItems)
        // return items
        if (user && user.team.org.id === 'VwGMBbFkBRaW' && user.role === 'Admin') {
            // items.splice(4, 0, routes.twitterPosts, routes.twitterStream)
            items.push(routes.super)
        }

        return items
    }, [user])

    // console.log(privateItems)

    return (
        <Box
            className='SideBar'
            sx={{
                backgroundColor: 'background.default'
            }}
        >
            {privateItems.map(item => (
                <NavLink key={item.path} className='navLink' activeClassName='selected' to={item.path}>
                    <item.icon className='icon' />
                    {/* <p className='label'>Dashboard</p> */}
                </NavLink>
            ))}
            <Stack
                flex={1}
                alignItems="center"
                justifyContent="flex-end"
                mb={2}
            >
                <AccountMenu />
            </Stack>
        </Box>
    )
}