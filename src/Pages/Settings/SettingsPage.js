import { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { settingsRoutes } from 'Routes/Routes'

const filters = [
    { // Category
        id: '0',
        name: 'General',
        items: [
            // Filters
            { id: '0', name: 'Organization', path: settingsRoutes.main },
            { id: 'team-members', name: 'Team Members', path: settingsRoutes.general.members },
        ]
    },
    { // Category
        id: '1',
        name: 'Configurations',
        items: [
            // Filters
            { id: 'positions', name: 'Positions', path: settingsRoutes.team.positions },
            { id: 'statuses', name: 'Statuses', path: settingsRoutes.team.statuses },
            { id: 'ranks', name: 'Ranks', path: settingsRoutes.team.ranks },
            { id: 'snippets', name: 'Snippets', path: settingsRoutes.team.snippets },
            // { id: 'tags', name: 'Tags', path: settingsRoutes.team.tags },
            // { id: 'grad-years', name: 'Grad Years', path: settingsRoutes.team.gradYears },
            // { id: 'platforms', name: 'Board', path: settingsRoutes.team.platforms },
            // { id: 'placeholders', name: 'Placeholders', path: settingsRoutes.team.placeholders },
            // { id: 'getSendCoachTypes', name: 'Get Send as Coach Types', path: settingsRoutes.team.getSendCoachTypes },
            // { id: 'peopleTypes', name: 'People Types', path: settingsRoutes.team.peopleTypes },
        ]
    },
    {// Category
        id: '2',
        name: 'Tags',
        items: [
            // Filters
            { id: 'media-tags', name: 'Media Tags', path: settingsRoutes.tags.mediaTags },
            { id: 'contacts-tags', name: 'Contacts Tags', path: settingsRoutes.tags.contactsTags },
            { id: 'message-tags', name: 'Message Tags', path: settingsRoutes.tags.messageTags },
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