import { useState, useMemo, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import { AccountBox, Tune } from '@material-ui/icons'
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog'

import Button, { IconButton } from 'UI/Widgets/Buttons/Button'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import { PanelDropdown } from 'UI/Layouts/Panel'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {
    useContacts,
    useStatuses,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
    useUser,
} from 'Api/Hooks'

import {
    addTagsToContacts,
    deleteTagToContact,
} from 'Api/Endpoints'

import { messageRoutes } from 'Routes/Routes'

export default function ContactsPage(props) {
    const [redirect, setRedirect] = useState('')

    const contacts = useContacts()
    const alert = useMainLayoutAlert()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [loading, setLoading] = useState(false)


    // handle filters options
    const status = useStatuses()
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
            options: status.items?.map(item => ({ id: item.id, name: item.status })) || [],
            type: 'status'
        },
        rank: {
            label: 'Rank',
            options: ranks.items?.map(item => ({ id: item.id, name: item.rank })) || [],
        },
        gradeYear: {
            label: 'Grad Year',
            options: gradeYears.items?.map((item, index) => ({ id: index, name: item })) || [],
        },
        tags: {
            label: 'Tags',
            options: tags || [],
        },
        position: {
            label: 'Position',
            options: positions.items || [],
        },
        areaCoach: {
            label: 'Area Coach',
            options: teamMembersItems
        },
        positionCoach: {
            label: 'Position Coach',
            options: teamMembersItems
        },
        timeZone: {
            label: 'Time Zone',
            options: []
        },
        birthday: {
            label: 'Birthday',
            options: []
        },
        state: {
            label: 'State',
            options: []
        },
        status2: {
            label: 'Status 2',
            options: []
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
        console.log(selectedContacts)

        //return 
        // message.item.recipients

        // localStorage.setItem('')
        let now = Date.now()

        console.log(now)

        localStorage.setItem(`new-message-contact-${now}`, JSON.stringify(selectedContacts))
        setRedirect(`${messageRoutes.create}/contacts-${now}`)
    }

    const onExportAsCSVClick = (e) => {

    }

    const onRemoveTagClick = (e) => {
        console.log("removeTag")
        // deleteTagToContact()
    }

    const onFollowOnTwitterClick = (e) => {

    }

    const onArchiveContactClick = (e) => {

    }

    const onTagsSelected = (selectedTagsIds) => {
        setLoading(true)

        addTagsToContacts(selectedTagsIds, selectedContacts)
            .then(res => {
                if (res.error === 0) {
                    alert.setSuccess('Contacts tagged successfully!')
                    setOpenSelectTagDialog(false)
                }
                else
                    alert.setWarning(`${res.success} out of ${res.total} contacts were tagged successfully. ${res.error} contacts failed to be tagged.`)
            })
            .finally(() => setLoading(false))
    }

    return (
        <MainLayout
            title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            alert={alert}
            actions={mainActions}
            onFilterSelected={onFilterSelected}
            loading={loading}
            redirect={redirect}
            propsPanelFilters={{
                open: showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange
            }}
        >
            <Stack direction="row" alignItems="center" mb={2}>
                <Stack flex={1} direction="column" justifyContent="center" alignItems="start" spacing={1}>
                    <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <span style={{ fontWeight: 'bold' }}>
                            You have{' '}
                            <span style={{ color: '#3871DA' }}>
                                {contacts.pagination.totalItems || 0}
                            </span>
                            {' '}contacts
                        </span>
                    </Stack>
                    {selectedContacts.length > 0 &&
                        <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <span style={{ fontWeight: 'bold' }}>
                                <span style={{ color: '#3871DA' }}>
                                    {selectedContacts.length}
                                </span>
                                {' '}selected contact{selectedContacts.length > 1 && "s"}
                            </span>
                        </Stack>
                    }
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
                    <PanelDropdown
                        action={{
                            name: 'Actions',
                            variant: 'outlined',
                            icon: AutoFixHighIcon,
                            options: [
                                { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                { name: 'Remove Tag', onClick: onRemoveTagClick },
                                { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                { name: 'Archive Contact', onClick: onArchiveContactClick }
                            ]
                        }}
                    />
                    <Button
                        name="Tag"
                        variant="outlined"
                        endIcon={<LocalOfferOutlinedIcon />}
                        onClick={() => setOpenSelectTagDialog(true)}
                        disabled={selectedContacts.length == 0}
                    />
                    <PanelDropdown
                        header={() => (
                            <Button
                                style={{ minWidth: 0 }}
                                variant="outlined"
                                name={<ViewColumnIcon />}
                                textColor="#3871DA"
                            />
                        )}
                        action={{
                            options: [
                                { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                { name: 'Remove Tag', onClick: onRemoveTagClick },
                                { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                { name: 'Archive Contact', onClick: onArchiveContactClick }
                            ]
                        }}
                    />
                </Stack>
            </Stack>


            <ContactsTable
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                onSelectionChange={(selected) => { setSelectedContacts(selected) }}
            />

            <CreateBoardDialog
                open={openCreateBoardDialog}
                onClose={() => setOpenCreateBoardDialog(false)}
                selectedFilters={selectedFilters}
            />

            <SelectTagDialog
                open={openSelectTagDialog}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={onTagsSelected}
            />
        </MainLayout>
    )
}