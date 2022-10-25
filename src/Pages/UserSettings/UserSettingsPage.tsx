import React, { ReactNode } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { userRoutes } from 'Routes/Routes'


interface UserSettingsPageProps {
    alert?: any;
    loading?: boolean;
    title?: string;
    onTopActionClick?: () => void;
    topActionName?: string;
    actions?: Record<string, unknown>[];
    children?: ReactNode
}

export const UserSettingsPage: React.FC<UserSettingsPageProps> = (props) => {

    const sideFilters = [
        {
            id: '0',
            name: ' User Settings',
            items: [
                { id: '0', name: 'Profile', path: userRoutes.profile },
                { id: '1', name: 'Account', path: userRoutes.account },
                { id: '2', name: 'Preferences', path: userRoutes.preferences },
                // { id: '2', name: 'Notifications', path: userRoutes.notifications },
            ]
        },
    ]

    return (
        <MainLayout
            filters={sideFilters}
            alert={props.alert}
            loading={props.loading}
            title={props.title || 'User Settings'}
            onTopActionClick={props.onTopActionClick}
            topActionName={props.topActionName}
            actions={props.actions}
        >
            {props.children}
        </MainLayout>
    )
}