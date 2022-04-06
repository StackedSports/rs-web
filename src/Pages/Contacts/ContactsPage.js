import { useState, useMemo, useEffect } from 'react'
import { AccountBox, Tune } from '@material-ui/icons'

import {
    useContacts,
    useStatus,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    usePositions,

} from 'Api/Hooks'

import MainLayout from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog'

export default function ContactsPage(props) {
    const contacts = useContacts()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showPanelFilters, setShowPanelFilters] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState({})

    // handle filters options
    const status = useStatus()?.map(item => ({ id: item.id, name: item.status })) || []
    const ranks = useRanks()?.map(item => ({ id: item.id, name: item.rank })) || []
    const gradeYears = useGradeYears()?.map((item, index) => ({ id: index, name: item })) || []
    const tags = useTags() || []
    const positions = usePositions() || []
    
    useEffect(() => {
        if(!contacts.items)
            return
        
        console.log(contacts.items)
    }, [contacts.items])


    const panelFiltersData = useMemo(() =>
    ({
        "status": {
            label: 'Status',
            options: status,
            type: 'status'
        },
        "rank": {
            label: 'Rank',
            options: ranks,
        },
        "gradeYear": {
            label: 'Grad Year',
            options: gradeYears,
        },
        "tags": {
            label: 'Tags',
            options: tags,
        },
        "position": {
            label: 'Position',
            options: positions,
        },
    }), [status, ranks, gradeYears, tags, positions])

    const mainActions = [
        {
            name: 'Save as Board',
            icon: AccountBox,
            onClick: () => setOpenCreateBoardDialog(true),
            variant: 'outlined',
            disabled: Object.keys(selectedFilters).length === 0,
        },
        {
            name: 'Filter',
            icon: Tune,
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
            variant: 'outlined',
        }
    ]

    // console.log(Object.keys(selectedFilters).length === 0)


    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    let filters = [
        { // Category
            id: '0',
            name: 'My Boards',
            items: [
                // Filters
                { id: '0', name: 'Scheduled' },
                { id: '1', name: 'In Progress' },
                { id: '2', name: 'Finished' },
                { id: '3', name: 'Archived' },
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
            title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            onFilterSelected={onFilterSelected}
            actions={mainActions}
            propsPanelFilters={{
                open: showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange
            }}
        >
            <p>You have {contacts.pagination.totalItems} contacts</p>

            <ContactsTable
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                onSelectionChange={(selected) => setSelectedContacts(selected)}
            />

            <CreateBoardDialog
                open={openCreateBoardDialog}
                onClose={() => setOpenCreateBoardDialog(false)}
                selectedFilters={selectedFilters}
            />

        </MainLayout>
    )
}