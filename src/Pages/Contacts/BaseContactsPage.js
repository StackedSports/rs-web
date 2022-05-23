import { useState, useMemo, useEffect, useContext } from 'react';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune } from '@material-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MainLayout from 'UI/Layouts/MainLayout';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';

import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';
import ContactsTable from 'UI/Tables/Contacts/ContactsTable';

import useMultiPageSelection from 'Hooks/MultiPageSelectionHook'
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'

import {
    useStatuses,
    useRanks,
    useGradYears,
    useBoard,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
} from 'Api/Hooks';

import {
    addTagsToContacts,
    deleteBoard,
    deleteTagToContact,
    untagContacts,
    updateBoard,
} from 'Api/Endpoints';

import { contactsRoutes, messageRoutes } from 'Routes/Routes';

import { timeZones, states } from 'utils/Data';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AppContext } from 'Context/AppProvider';


export default function BaseContactsPage(props) {
    const [redirect, setRedirect] = useState('')
    const app = useContext(AppContext)

    const contacts = useMemo(() => props.contacts, [props.contacts])
    const confirmDialog = useContext(ConfirmDialogContext)

    const [loading, setLoading] = useState(false)
    const [loadingTags, setLoadingTags] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [editBoard, setEditBoard] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [selectTagDialogTitle, setSelectTagDialogTitle] = useState("Select Tags")
    const [showPanelFilters, setShowPanelFilters] = useState(false)

    const selectedContacts = useMultiPageSelection(contacts.pagination.currentPage)
    const contactsMultipageSelection = useMultiPageSelection_V2(contacts.items)
    const [selectedFilters, setSelectedFilters] = useState({})


    // handle filters options
    const status = useStatuses()
    const ranks = useRanks()
    const gradYears = useGradYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()
    const boards = useBoards()
    const board = useBoard(props.boardInfo?.id)

    useEffect(() => {
        if (props.selectedFilters)
            setSelectedFilters(props.selectedFilters)
    }, [props.selectedFilters])

    // useEffect(() => {//enable remove filter button when editing board
    //     let filters = {}
    //     Object.keys(selectedFilters).forEach(key => {
    //         // console.log(key)
    //         // console.log(selectedFilters[key])
    //         if (!filters[key])
    //             filters[key] = []

    //         selectedFilters[key].forEach(item => {
    //             const criteria = { ...item, disabled: !editBoard }
    //             filters[key].push(criteria)
    //         })
    //     })
    //     setSelectedFilters(filters)

    // }, [editBoard])

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
        //          Filters
        //          { id: '0', name: 'Scheduled' },
        //          { id: '1', name: 'In Progress' },
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

/*     const onContactsSelectionChange = (selection) => {
        // setSelectedContacts(selected)
        selectedContacts.onSelectionChange(selection)
    } */

    const onSendMessageClick = (e) => {
        /* console.log(selectedContacts)

        selectedContacts.saveData(contacts.items)
        let selectedData = selectedContacts.getDataSelected() */
        let selectedData = contactsMultipageSelection.selectedData 


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

    const onEditBoard = () => {
        console.log("onEditBoard")
        setEditBoard(true)
        setOpenCreateBoardDialog(true)
    }

    const boardEditedSuccess = (res) => {
        setOpenCreateBoardDialog(false)
        app.alert.setSuccess('Board edited successfully!')
        // board.refreshData()
        boards.refreshData()
        setShowPanelFilters(false)
        setEditBoard(false)
    }

    const boardEditedFailure = (error) => {
        app.alert.setError('Failed to edit board.')
        // setEditBoard(false)
    }

    const onDeleteBoard = (e) => {
        const title = "Delete Board"
        confirmDialog.show(title, "You cannot undo this action. Are you sure you want to continue? ", () => {
            // console.log("onDeleteBoard")
            setLoading(true)
            deleteBoard(props.id)
                .then(res => {
                    app.alert.setSuccess('Board deleted successfully!')
                    boards.refreshData()
                    setRedirect(contactsRoutes.all)
                })
                .catch(error => {
                    console.log(error)
                    app.alert.setError('Failed to delete board.')
                })
                .finally(() => setLoading(false))
        })
    }

    const onTagsSelected = (selectedTagsIds) => {
        setLoadingTags(true)
/*         selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id) */
        let contactIds = contactsMultipageSelection.selectedData.map(contact => contact.id)

        // console.log(selectedTagsIds, contactIds)

        addTagsToContacts(selectedTagsIds, contactIds)
            .then(res => {
                if (res.error === 0) {
                    app.alert.setSuccess('Contacts tagged successfully!')
                    setOpenSelectTagDialog(false)
                }
                else
                    app.alert.setWarning(`${res.success} out of ${res.total} contacts were tagged successfully. ${res.error} contacts failed to be tagged.`)
            })
            .finally(() => setLoadingTags(false))
    }

    const onRemoveTagsSelected = (selectedTagsIds) => {
        setLoadingTags(true)
        /* selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id) */
        let contactIds = contactsMultipageSelection.selectedData.map(contact => contact.id)

        // console.log(selectedTagsIds, contactIds)

        untagContacts(selectedTagsIds, contactIds)
            .then(res => {
                if (res.error === 0) {
                    app.alert.setSuccess('Contacts untagged successfully!')
                    setOpenSelectTagDialog(false)
                }
                else
                    app.alert.setWarning(`${res.success} out of ${res.total} contacts were untagged successfully. ${res.error} contacts failed to be untagged.`)
            })
            .finally(() => setLoadingTags(false))
    }

    const onPageChange = (page) => {
        contacts.pagination.getPage(page)
    }

    const onCloseBoardDialog = () => {
        if (editBoard)
            setShowPanelFilters(false)

        setEditBoard(false)
        setOpenCreateBoardDialog(false)
        setSelectedFilters(props.selectedFilters)
    }

    console.log("selectedFilters", selectedFilters)
    console.log("props.selectedFilters", props.selectedFilters)

    return (
        <MainLayout
            title={props.title || 'Contacts'}
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            actions={props.disabledMainActions ? [] : mainActions}
            // actions={props.disabledMainActions && !editBoard ? [] : mainActions} //enable actions to edit board
            onFilterSelected={onFilterSelected}
            loading={loading}
            redirect={redirect}
            propsPanelFilters={{
                open: props.showPanelFilters || showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                selectedFilters: selectedFilters
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
                    {contactsMultipageSelection.count > 0 &&
                        <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <span style={{ fontWeight: 'bold', fontSize: 14, color: '#3871DA' }}>
                                <span style={{ color: '#3871DA' }}>
                                    {contactsMultipageSelection.count}
                                </span>
                                {' '}contact{contactsMultipageSelection.count > 1 && "s"} selected
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
                                    //     { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    //     { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                    //     { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    //     { name: 'Archive Contact', onClick: onArchiveContactClick },
                                    { name: 'Edit Board', onClick: onEditBoard },
                                    { name: 'Delete Board', onClick: onDeleteBoard },
                                ]
                                :
                                [
                                    //     { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    //     { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                    //     { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    //     { name: 'Archive Contact', onClick: onArchiveContactClick },
                                ]
                        }}
                    />
                    <PanelDropdown
                        action={{
                            id: 'selected-contacts-actions',
                            name: `${selectedContacts.count} selected contact${selectedContacts.count > 1 ? "s" : ""}`,
                            type: 'dropdown',
                            variant: 'contained',
                            icon: ArrowDropDownIcon,
                            disabled: selectedContacts.count === 0,
                            options: props.title.includes("Board") ?
                                [
                                    { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                    { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    { name: 'Archive Contact', onClick: onArchiveContactClick },
                                    // { name: 'Edit Board', onClick: onEditBoard },
                                    // { name: 'Delete Board', onClick: onDeleteBoard },
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
                id={props.tableId}
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                selection={selectedContacts.items}
                onSelectionChange={onContactsSelectionChange}
                onPageChange={onPageChange}
                columnsControl={props.columnsControl}
            />
            <ContactsTableServerMode
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                columnsControl={props.columnsControl}
            />

            <CreateBoardDialog
                onEditBoard={onEditBoard}
                boardInfo={props.boardInfo}
                open={openCreateBoardDialog}
                onClose={onCloseBoardDialog}
                selectedFilters={selectedFilters}
                boardEditedSuccess={boardEditedSuccess}
                boardEditedFailure={boardEditedFailure}
                confirmAction={editBoard ? "Edit Board" : "Create Board"}
                title={editBoard ? `Edit Board: ${props.boardInfo?.name}` : "Create Board"}
            />

            <SelectTagDialog
                open={openSelectTagDialog}
                actionLoading={loadingTags}
                title={selectTagDialogTitle}
                onClose={() => setOpenSelectTagDialog(false)}
                confirmLabel={selectTagDialogTitle.includes("Untag") && "Untag"}
                onConfirm={selectTagDialogTitle.includes("Untag") ? onRemoveTagsSelected : onTagsSelected}
            />
        </MainLayout>
    )
}