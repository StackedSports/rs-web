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
            { id: 'grad-years', name: 'Grad Years', path: settingsRoutes.team.gradYears },
            { id: 'positions', name: 'Positions', path: settingsRoutes.team.positions },
            { id: 'statuses', name: 'Statuses', path: settingsRoutes.team.statuses },
            { id: 'ranks', name: 'Ranks', path: settingsRoutes.team.ranks },
            { id: 'snippets', name: 'Snippets', path: settingsRoutes.team.snippets },
            { id: 'platforms', name: 'Platforms', path: settingsRoutes.team.platforms },
            { id: 'placeholders', name: 'Placeholders', path: settingsRoutes.team.placeholders },
            { id: 'getSendCoachTypes', name: 'Get Send as Coach Types', path: settingsRoutes.team.getSendCoachTypes },
            { id: 'peopleTypes', name: 'People Types', path: settingsRoutes.team.peopleTypes },
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