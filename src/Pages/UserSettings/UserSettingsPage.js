import React, { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { userRoutes } from 'Routes/Routes'
import { useUser } from 'Api/Hooks'

const filters = [
    { // Category
        id: '0',
        name: ' User Settings',
        items: [
            // Filters
            { id: '0', name: 'Profile', path: userRoutes.profile },
            { id: '1', name: 'Account', path: userRoutes.account },
            { id: '2', name: 'Notifications', path: userRoutes.notifications },
        ]
    },
]

export default function UserSettingsPage(props) {

    // const user = useUser();
    // console.log(user)

    // const childrenWithProps = React.Children.map(props.children, child => {
    //     if (React.isValidElement(child)) {
    //         React.cloneElement(child, { user: user })
    //     }
    //     return child
    // });

    return (
        <MainLayout
            filters={filters}
            alert={props.alert}
            loading={props.loading}
            title={props.title || 'User Settings'}
            onTopActionClick={props.onTopActionClick}
            topActionName={props.topActionName || null}
        >
            {props.children}
            {/* <>{childrenWithProps}</> */}
            {/* {React.cloneElement(props.children, { user: user.item })} */}
        </MainLayout>
    )
}