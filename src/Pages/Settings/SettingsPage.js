import { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { settingsRoutes } from 'Routes/Routes'

const filters = [
    { // Category
        id: '0',
        name: 'General',
        items: [
            // Filters
            { id: '0', name: 'Organization', path: settingsRoutes.general.organization },
        ]
    },
    { // Category
        id: '1',
        name: 'Team',
        items: [
            // Filters
            { id: 'team-members', name: 'Team Members', path: settingsRoutes.team.members },
            { id: 'tags', name: 'Tags', path: settingsRoutes.team.tags },
        ]
    }
]

export default function SettingsPage(props) {
    return (
        <MainLayout
            title={props.title || 'Settings'}
            topActionName={props.topActionName || null}
            onTopActionClick={props.onTopActionClick}
            filters={filters}
            // onFilterSelected={onFilterSelected}
        >
            {props.children}
        </MainLayout>
    )
}