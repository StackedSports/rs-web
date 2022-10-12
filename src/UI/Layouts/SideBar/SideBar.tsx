import React, { useContext, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import Stack from '@mui/material/Stack'

import AccountMenu from 'UI/Widgets/AccountMenu'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { routes, messageRoutes } from 'Routes/Routes'
import { SiderBarWrapper } from './SideBar.styled'
import { Button, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const REGULAR_ITEMS = [
    routes.dashboard,
    routes.contacts,
    { ...routes.messages, path: messageRoutes.create },
    routes.media,
    routes.tweet,
    routes.tweetPost,
    routes.settings,
]

interface ISideBarItems {
    title: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

export const SideBar: React.FC = () => {
    const { user } = useContext(AuthContext)

    // console.log(user)

    const privateItems: ISideBarItems[] = useMemo(() => {
        let items = Object.assign([], REGULAR_ITEMS)
        if (user && user.team.org.id === 'VwGMBbFkBRaW' && user.role === 'Admin') {
            items.push(routes.super)
        }
        return items
    }, [user])

    return (
        <SiderBarWrapper >
            {privateItems.map(item => (
                <Button
                    color='inherit'
                    component={NavLink}
                    key={item.path}
                    className='navLink'
                    activeClassName='selected'
                    to={item.path}
                    disableRipple
                >
                    <item.icon />
                </Button>
            ))}
            <Stack
                flex={1}
                alignItems="center"
                justifyContent="flex-end"
                mb={2}
            >
                <AccountMenu />
            </Stack>
        </SiderBarWrapper>
    )
}