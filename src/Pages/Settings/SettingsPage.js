import { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

export default function SettingsPage(props) {
    
    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    let filters = [
        { // Category
            id: '0',
            name: 'General',
            items: [
                // Filters
                { id: '0', name: 'Organization' },
            ]
        },
        { // Category
            id: '1',
            name: 'Team',
            items: [
                // Filters
                { id: '0', name: 'Members' },
            ]
        }
    ]

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onPanelFilterChange = (filter) => {
        console.log('Filters selected', filter)
        setSelectedFilters(filter)

        contacts.filter(filter)
    }

    return (
        <MainLayout
            title='Settings'
            // topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            onFilterSelected={onFilterSelected}
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

        </MainLayout>
    )
}