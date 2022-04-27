import React, { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { userRoutes } from 'Routes/Routes'

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


    return (
        <MainLayout
            title={props.title || 'User Settings'}
            topActionName={props.topActionName || null}
            onTopActionClick={props.onTopActionClick}
            filters={filters}
        >
            {/* {React.cloneElement(props.children, { user: user })} */}
            {props.children}
        </MainLayout>
    )
}