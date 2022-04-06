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
            { id: '0', name: 'Members', path: settingsRoutes.team.members },
            { id: '1', name: 'Tags', path: settingsRoutes.team.tags },
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
            {/* <ContactsTable
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                onSelectionChange={(selected) => setSelectedContacts(selected)}
            />

            <CreateBoardDialog
                open={openCreateBoardDialog}
                onClose={() => setOpenCreateBoardDialog(false)}
                selectedFilters={selectedFilters}
            /> */}

            {props.children}

        </MainLayout>
    )
}