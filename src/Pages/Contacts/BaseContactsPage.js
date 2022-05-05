import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune } from '@material-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';
import ContactsTable from 'UI/Tables/Contacts/ContactsTable';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';

import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useMultiPageSelection from 'Hooks/MultiPageSelectionHook'

import {
    useStatuses,
    useRanks,
    useGradYears,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
} from 'Api/Hooks'

import {
    addTagsToContacts,
    deleteBoard,
    deleteTagToContact,
    updateBoard,
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { timeZones, states } from 'utils/Data'

export default function BaseContactsPage(props) {
    const [redirect, setRedirect] = useState('')

    const contacts = useMemo(() => props.contacts, [props.contacts])

    const [loading, setLoading] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])

    const alert = useMainLayoutAlert()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [selectTagDialogTitle, setSelectTagDialogTitle] = useState("Select Tags")
    const [showPanelFilters, setShowPanelFilters] = useState(false)

    const selectedContacts = useMultiPageSelection(contacts.pagination.currentPage)
    const [selectedFilters, setSelectedFilters] = useState({})


    // handle filters options
    const status = useStatuses()
    const ranks = useRanks()
    const gradYears = useGradYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()
    const boards = useBoards()

    useEffect(() => {
        if (!contacts.items)
            return

        // console.log(contacts.items)
    }, [contacts.items])

    useEffect(() => {
        if (!contacts.pagination)
            return

        //console.log(contacts.pagination)
    }, [contacts.pagination])

    useEffect(() => {
        if (!boards.items)
            return

        // console.log(boards.items)
        const privateBoards = boards.items.filter(board => {
            if (!board.is_shared)
                return board
        })
        const teamBoards = boards.items.filter(board => {
            if (board.is_shared)
                return board
        })
        setPrivateBoards(privateBoards)
        setTeamBoards(teamBoards)
    }, [boards.items])


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
        gradYear: {
            label: 'Grad Year',
            options: gradYears.items?.map((item, index) => ({ id: index, name: item })) || [],
        },
        tags: {
            label: 'Tag',
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
            options: timeZones
        },
        birthday: {
            label: 'Birthday',
            options: []
        },
        state: {
            label: 'State',
            options: states
        },
        status2: {
            label: 'Status 2',
            options: []
        },
    }), [status, ranks, gradYears, tags, positions])

    let mainActions = [
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
            name: 'All Contacts',
            items: [
                // Filters
                // { id: '0', name: 'New (Last 30 days)' },
                { id: '0', name: 'Contacts', path: contactsRoutes.all }
            ]
        },
        { // Category
            id: '1',
            name: 'My Boards',
            // Filters
            items: privateBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))

        },
        { // Category
            id: '2',
            name: 'Team Boards',
            // Filters
            items: teamBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))
        },
        // { // Category
        //     id: '3',
        //     name: 'User Boards',
        //     items: [
        //         // Filters
        //         // { id: '0', name: 'Scheduled' },
        //         // { id: '1', name: 'In Progress' },
        //     ]
        // },
    ]

    // else if(action.type === 'criteria')
    //     return (
    //         <div>{action.name}</div>
    //     )

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onPanelFilterChange = (filter) => {
        console.log('Filters selected', filter)
        setSelectedFilters(filter)

        contacts.filter(filter)
    }

    const onContactsSelectionChange = (selection) => {
        // setSelectedContacts(selected)
        selectedContacts.onSelectionChange(selection)
    }

    const onSendMessageClick = (e) => {
        console.log(selectedContacts)

        selectedContacts.saveData(contacts.items)
        let selectedData = selectedContacts.getDataSelected()

        if (props.onSendMessage)
            props.onSendMessage(selectedData)
        // else
        //     app.sendMessageToContacts(selectedData)
    }

    const onExportAsCSVClick = (e) => {

    }

    const onRemoveTagClick = (e) => {
        console.log("onRemoveTagClick")
        setOpenSelectTagDialog(true)
        setSelectTagDialogTitle("Untag Contact")
        // deleteTagToContact()
    }

    const onFollowOnTwitterClick = (e) => {

    }

    const onArchiveContactClick = (e) => {

    }

    const onEditBoard = (e) => {
        console.log("onEditBoard")
        const data = {
            name: "Test Board",
            is_shared: false,
            criteria: {
                // tags: ["rs staff & test accounts"],
                // years: [2023, 2024],
                states: ["TN"]
            }
        }
        updateBoard(props.id, data)
            .then(res => {
                alert.setSuccess('Board edited  successfully!')
                boards.refreshData()
            })
            .catch(error => {
                console.log(error)
                alert.setError('Failed to edit board.')
            })
            .finally(() => setLoading(false))
    }

    const onDeleteBoard = (e) => {
        console.log("onDeleteBoard")
        setLoading(true)
        deleteBoard(props.id)
            .then(res => {
                alert.setSuccess('Board deleted successfully!')
                boards.refreshData()
            })
            .catch(error => {
                console.log(error)
                alert.setError('Failed to delete board.')
            })
            .finally(() => setLoading(false))
    }

    const onTagsSelected = (selectedTagsIds) => {
        // setLoading(true)
        selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id)
        console.log("onRemoveTagsSelected")
        console.log(selectedTagsIds, contactIds)
        addTagsToContacts(selectedTagsIds, contactIds)
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

    const onRemoveTagsSelected = (selectedTagsIds) => {
        // setLoading(true)
        selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id)
        console.log("onRemoveTagsSelected")
        console.log(selectedTagsIds, contactIds)
        untagContacts(selectedTagsIds, contactIds)
            .then(res => {
                if (res.error === 0) {
                    alert.setSuccess('Contacts untagged successfully!')
                    setOpenSelectTagDialog(false)
                }
                else
                    alert.setWarning(`${res.success} out of ${res.total} contacts were untagged successfully. ${res.error} contacts failed to be untagged.`)
            })
            .finally(() => setLoading(false))
    }

    const onPageChange = (page) => {
        contacts.pagination.getPage(page)
    }

    return (
        <MainLayout
            title={props.title || 'Contacts'}
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            alert={alert}
            actions={props.disabledMainActions ? [] : mainActions}
            onFilterSelected={onFilterSelected}
            loading={loading}
            redirect={redirect}
            propsPanelFilters={{
                open: props.showPanelFilters || showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                selectedFilters: props.selectedFilters
            }}
        >
            <Stack direction="row" alignItems="center" mb={2}>
                <Stack flex={1} direction="column" justifyContent="center" alignItems="start" spacing={0}>
                    <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <span style={{ fontWeight: 'bold' }}>
                            You have{' '}
                            <span style={{ color: '#3871DA' }}>
                                {contacts.pagination.totalItems || 0}
                            </span>
                            {' '}contacts
                        </span>
                    </Stack>
                    {selectedContacts.count > 0 &&
                        <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <span style={{ fontWeight: 'bold', fontSize: 14, color: '#3871DA' }}>
                                <span style={{ color: '#3871DA' }}>
                                    {selectedContacts.count}
                                </span>
                                {' '}contact{selectedContacts.count > 1 && "s"} selected
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
                        disabled={props.enableSendMessageWithoutSelection ?
                            false : selectedContacts.count == 0}
                    />
                </Stack>
                <Stack flex={1} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <PanelDropdown
                        action={{
                            name: 'Actions',
                            variant: 'outlined',
                            icon: AutoFixHighIcon,
                            options: props.title.includes("Board") ?
                                [
                                    { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                    { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    { name: 'Archive Contact', onClick: onArchiveContactClick },
                                    { name: 'Edit Board', onClick: onEditBoard },
                                    { name: 'Delete Board', onClick: onDeleteBoard },
                                ]
                                :
                                [
                                    { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                    { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    { name: 'Archive Contact', onClick: onArchiveContactClick },
                                ]
                        }}
                    />
                    <Button
                        name="Tag"
                        variant="outlined"
                        endIcon={<LocalOfferOutlinedIcon />}
                        onClick={() => { setOpenSelectTagDialog(true); setSelectTagDialogTitle("Select Tags") }}
                        disabled={selectedContacts.count == 0}
                    />
                    {/* <PanelDropdown
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
                                { name: 'Profile Image', onClick: onExportAsCSVClick },
                                { name: 'Full Name', onClick: onRemoveTagClick },
                                { name: 'First Name', onClick: onFollowOnTwitterClick },
                                { name: 'Last Name', onClick: onArchiveContactClick },
                                { name: 'Nick Name', onClick: onExportAsCSVClick },
                                { name: 'Twitter', onClick: onRemoveTagClick },
                                { name: 'Phone', onClick: onFollowOnTwitterClick },
                                { name: 'State', onClick: onArchiveContactClick },
                                { name: 'School', onClick: onExportAsCSVClick },
                                { name: 'Grad Year', onClick: onRemoveTagClick },
                                { name: 'Positions', onClick: onFollowOnTwitterClick },
                                { name: 'Area Coach', onClick: onArchiveContactClick },
                                { name: 'Recruiting Coach', onClick: onExportAsCSVClick },
                                { name: 'Status', onClick: onRemoveTagClick },
                                { name: 'Status 2', onClick: onFollowOnTwitterClick },
                                { name: 'Rank', onClick: onArchiveContactClick },
                                { name: 'Last Messaged', onClick: onArchiveContactClick },
                                { name: 'Most Active Time', onClick: onArchiveContactClick },
                                { name: 'Date Added', onClick: onArchiveContactClick },
                                { name: 'Time Zone', onClick: onArchiveContactClick },
                                { name: 'Birthday (dob)', onClick: onArchiveContactClick },
                            ]
                        }}
                    /> */}
                </Stack>
            </Stack>

            <ContactsTable
                id={props.id}
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                selection={selectedContacts.items}
                onSelectionChange={onContactsSelectionChange}
                onPageChange={onPageChange}
                columnsControl={props.columnsControl}
            />

            <CreateBoardDialog
                open={openCreateBoardDialog}
                onClose={() => setOpenCreateBoardDialog(false)}
                selectedFilters={selectedFilters}
            />

            <SelectTagDialog
                open={openSelectTagDialog}
                title={selectTagDialogTitle}
                confirmLabel={selectTagDialogTitle.includes("Untag") && "Untag"}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={selectTagDialogTitle.includes("Untag") ? onRemoveTagsSelected : onTagsSelected}
            />
        </MainLayout>
    )
}