import { useState, useMemo, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import { AccountBox, Tune } from '@material-ui/icons'
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import MainLayout from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog'

import Button, { IconButton } from 'UI/Widgets/Buttons/Button'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {
    useContacts,
    useStatus,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
    useUser,
} from 'Api/Hooks'

export default function ContactsPage(props) {
    const contacts = useContacts()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showPanelFilters, setShowPanelFilters] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState({})


    // handle filters options
    const status = useStatus()?.map(item => ({ id: item.id, name: item.status }))
    // const ranks = useRanks().items?.map(item => ({ id: item.id, name: item.rank }))
    // const gradeYears = useGradeYears().items?.map((item, index) => ({ id: index, name: item }))
    // const positions = usePositions().items
    // const teamMembers = useTeamMembers().items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` }))
    const ranks = useRanks()
    const gradeYears = useGradeYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()

    useEffect(() => {
        if (!contacts.items)
            return

        //console.log(contacts.items)
    }, [contacts.items])

    useEffect(() => {
        if (!contacts.pagination)
            return

        //console.log(contacts.pagination)
    }, [contacts.pagination])

    const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []

    const panelFiltersData = useMemo(() =>
    ({
        status: {
            label: 'Status',
            options: status || [],
            type: 'status'
        },
        rank: {
            label: 'Rank',
            // options: ranks || [],
            options: ranks.items?.map(item => ({ id: item.id, name: item.rank })) || [],
        },
        gradeYear: {
            label: 'Grad Year',
            // options: gradeYears || [],
            options: gradeYears.items?.map((item, index) => ({ id: index, name: item })) || [],
        },
        tags: {
            label: 'Tags',
            options: tags || [],
        },
        position: {
            label: 'Position',
            // options: positions || [],
            options: positions.items || [],
        },
        areaCoach: {
            label: 'Area Coach',
            // options: teamMembers || []
            options: teamMembersItems
        },
        positionCoach: {
            label: 'Position Coach',
            // options: teamMembers || []
            options: teamMembersItems
        }
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
            variant: 'contained',
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

    const onSendMessageClick = (e) => {

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
            <Stack direction="row" alignItems="center" mb={2}>
                <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <span style={{ fontWeight: 'bold' }}>
                        You have{' '}
                        <span style={{ color: '#3871DA' }}>
                            {contacts.pagination.totalItems || 0}
                        </span>
                        {' '}contacts
                    </span>
                </Stack>
                <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Button
                        name="Send Message"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={onSendMessageClick}
                        disabled={selectedContacts.length == 0}
                    />
                </Stack>
                <Stack flex={1} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <Button
                        name="Actions"
                        variant="outlined"
                        endIcon={<AutoFixHighIcon />}
                        onClick={onSendMessageClick}
                    />
                    <Button
                        name="Tag"
                        variant="outlined"
                        endIcon={<LocalOfferOutlinedIcon />}
                        onClick={onSendMessageClick}
                        disabled={selectedContacts.length == 0}
                    />
                    <Button
                        style={{ minWidth: 0 }}
                        variant="outlined"
                        name={<ViewColumnIcon />}
                        onClick={onSendMessageClick}
                        textColor="#3871DA"
                    />
                </Stack>
            </Stack>


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