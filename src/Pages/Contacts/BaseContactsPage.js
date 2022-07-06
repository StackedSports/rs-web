import { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { useGridApiRef } from '@mui/x-data-grid-pro';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune, Clear } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import MainLayout from 'UI/Layouts/MainLayout';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';
import CreateContactDialog from 'UI/Widgets/Dialogs/CreateContactDialog';
import FollowOnTwitterDialog from 'UI/Widgets/Contact/FollowOnTwitterDialog';
import Button from 'UI/Widgets/Buttons/Button';
import { MiniSearchBar } from 'UI/Widgets/SearchBar'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';

import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';

import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'


import { useBoards, useStatus2, useGradYears, useStatuses, useRanks, useTeamMembers, useTags, usePositions } from 'Api/ReactQuery';

import {
    addTagsToContactsWithNewTags,
    archiveContacts,
    deleteBoard,
    untagContacts,
} from 'Api/Endpoints';

import { contactsRoutes, messageRoutes } from 'Routes/Routes';
import { getFullName } from 'utils/Parser';
import { timeZones, states } from 'utils/Data';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AppContext } from 'Context/AppProvider';
import { Box, IconButton } from '@mui/material';
import RenderIf from 'UI/Widgets/RenderIf';


export default function BaseContactsPage(props) {
    const app = useContext(AppContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const isTagDialogFunctionRemoveRef = useRef(false)

    const [redirect, setRedirect] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingTags, setLoadingTags] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [openFollowOnTwitterDialog, setOpenFollowOnTwitterDialog] = useState(false)
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [editBoard, setEditBoard] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})

    // handle filters options
    const contacts = useMemo(() => props.contacts, [props.contacts])
    const status = useStatuses()
    const status2 = useStatus2()
    const ranks = useRanks()
    const gradYears = useGradYears()
    const tags = useTags()
    const positions = usePositions()
    const teamMembers = useTeamMembers()
    const boards = useBoards()
    //const board = useBoard(props.boardInfo?.id)
    const gridApiRef = useGridApiRef()

    const contactsMultipageSelection = useMultiPageSelection_V2(contacts.items)

    useEffect(() => {
        if (props.selectedFilters)
            setSelectedFilters(props.selectedFilters)
    }, [props.selectedFilters])

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

        const privateBoards = boards.items.filter(board => !board.is_shared)
        const teamBoards = boards.items.filter(board => board.is_shared)
        setPrivateBoards(privateBoards)
        setTeamBoards(teamBoards)
    }, [boards.items])


    const panelFiltersData = useMemo(() =>
    ({
        status: {
            label: 'Status',
            options: status.items || [],
            optionsLabel: 'status'
        },
        rank: {
            label: 'Rank',
            options: ranks.items || [],
            optionsLabel: 'rank'
        },
        gradYear: {
            label: 'Grad Year',
            options: gradYears.items?.map((item, index) => ({ id: index, name: item })) || [],
        },
        tags: {
            label: 'Tags',
            options: tags.items || [],
            onSearch: (search) => tags.search(search),
        },
        position: {
            label: 'Position',
            options: positions.items || [],
        },
        areaCoach: {
            label: 'Area Coach',
            options: teamMembers.items || [],
            optionsLabel: (option) => getFullName(option)
        },
        positionCoach: {
            label: 'Position Coach',
            options: teamMembers.items || [],
            optionsLabel: (option) => getFullName(option)
        },
        timeZone: {
            label: 'Time Zone',
            options: timeZones
        },
        birthday: {
            label: 'Birthday',
            type: 'date',
            format: 'MM/dd',
            optionsLabel: (dates) => dates.value.join(' - '),
            isUnique: true
        },
        state: {
            label: 'State',
            options: states
        },
        status_2: {
            label: 'Status 2',
            options: status2.items.map((status2, index) => ({ name: status2 })) || []
        },
    }), [status.items, ranks.items, gradYears.items, tags.items, positions.items, teamMembers.items, status2.items])


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

    const onTopActionClick = (e) => {
        console.log("Cliquei")
        setOpenCreateContactDialog(true)
    }

    let filters = [
        { // Category
            id: '0',
            name: 'All Contacts',
            path: contactsRoutes.all,
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
    ]

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onPanelFilterChange = (filter) => {
        console.log('Filters selected', filter)
        setSelectedFilters(filter)
        if (props.onPanelFilterChange)
            props.onPanelFilterChange(filter)
    }

    const onSendMessageClick = (e) => {
        let selectedData = contactsMultipageSelection.selectedData
        if (props.onSendMessage)
            props.onSendMessage(selectedData)
    }

    const onExportAsCSVClick = (e) => {
        gridApiRef.current.exportDataAsCsv()
    }

    const onRemoveTagClick = (e) => {
        isTagDialogFunctionRemoveRef.current = true
        setOpenSelectTagDialog(true)
    }
    const onAddTagClick = (e) => {
        isTagDialogFunctionRemoveRef.current = false
        setOpenSelectTagDialog(true)
    }

    const onFollowOnTwitterClick = (e) => {
        setOpenFollowOnTwitterDialog(true)
    }

    const onArchiveContactClick = (e) => {
        console.log("onArchiveContactClick")
        let contactIds = contactsMultipageSelection.selectedData.map(contact => contact.id)
        setLoading(true)
        archiveContacts(contactIds)
            .then(resp => {
                console.log(resp)
                app.alert.setSuccess(`Contact${contactIds.length > 1 && 's'} successfully archived!`)
                contactIds.forEach(contactId => contactsMultipageSelection.remove(contactId))
                contacts.refetch()
            })
            .catch(error => {
                console.log(error)
                app.alert.setError(`Failed to archive contact${contactIds.length > 1 && 's'}.`)
            })
            .finally(() => setLoading(false))
    }

    const onBoardCreated = () => {
        setOpenCreateBoardDialog(false)
        app.alert.setSuccess('Board created successfully!')
    }

    const onEditBoard = () => {
        console.log("onEditBoard")
        setEditBoard(true)
        setOpenCreateBoardDialog(true)
    }

    const boardEditedSuccess = (res) => {
        setOpenCreateBoardDialog(false)
        app.alert.setSuccess('Board edited successfully!')
        boards.refetch()
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
            deleteBoard(props.boardInfo.id)
                .then(res => {
                    app.alert.setSuccess('Board deleted successfully!')
                    boards.refetch()
                    setRedirect(contactsRoutes.all)
                })
                .catch(error => {
                    console.log(error)
                    app.alert.setError('Failed to delete board.')
                })
                .finally(() => setLoading(false))
        })
    }

    const onAddTagsToContacts = async (selectedTagsIds) => {

        let contactIds = contactsMultipageSelection.selectionModel

        const res = await addTagsToContactsWithNewTags(selectedTagsIds, contactIds)

        if (res.error.count === 0)
            app.alert.setSuccess('Contacts tagged successfully!')
        else
            app.alert.setWarning(`${res.success.count} out of ${contactsMultipageSelection.count} contacts were tagged successfully. ${res.error.count} contacts failed to be tagged.`)

    }

    const onRemoveTagsFromContacts = async (selectedTagsIds) => {

        const contactIds = contactsMultipageSelection.selectionModel

        untagContacts(selectedTagsIds, contactIds)
            .then(res => {
                if (res.error === 0) {
                    app.alert.setSuccess('Contacts untagged successfully!')
                    setOpenSelectTagDialog(false)
                }
                else
                    app.alert.setWarning(`${res.success} out of ${res.total} contacts were untagged successfully. ${res.error} contacts failed to be untagged.`)
            })
    }

    const handleTagsDialogConfirm = async (selectedTagsIds) => {
        setLoadingTags(true)
        if (isTagDialogFunctionRemoveRef.current) {
            await onRemoveTagsFromContacts(selectedTagsIds)
        } else {
            await onAddTagsToContacts(selectedTagsIds)
        }
        setLoadingTags(false)
    }

    const onCloseBoardDialog = () => {
        if (editBoard)
            setShowPanelFilters(false)

        setEditBoard(false)
        setOpenCreateBoardDialog(false)
        setSelectedFilters(props.selectedFilters)
    }

    const onBackBoardToContacts = (redirect) => {
        setRedirect(contactsRoutes.all)
    }

    const onContactCreated = () => {
        app.alert.setSuccess('Contact created successfully!')
    }

    return (
        <MainLayout
            title={props.title || 'Contacts'}
            showBackBoardToContacts={props.showBackBoardToContacts}
            onBackBoardToContacts={onBackBoardToContacts}
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            actions={props.disabledMainActions ? [] : mainActions}
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
                <Stack minHeight='53px' flex={1} direction="column" justifyContent="center" alignItems="start" spacing={0}>
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
                        <Stack flex={1} minHeight='28px' direction="row" justifyContent="flex-start" alignItems="center">
                            <span style={{ fontWeight: 'bold', fontSize: 14, color: '#3871DA' }}>
                                <span >
                                    {contactsMultipageSelection.count}
                                </span>
                                {' '}contact{contactsMultipageSelection.count > 1 && "s"} selected
                            </span>
                            <IconButton size='small' sx={{ color: '#3871DA' }} onClick={() => contactsMultipageSelection.clear()}>
                                <Clear fontSize="inherit" />
                            </IconButton>
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
                            false : contactsMultipageSelection.count == 0}
                    />
                </Stack>
                <Stack flex={1} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <RenderIf condition={props.boardInfo}>
                        <PanelDropdown
                            action={{
                                name: 'Actions',
                                variant: 'outlined',
                                icon: AutoFixHighIcon,
                                options: props.title.includes("Board") ?
                                    [
                                        { name: 'Export Board as CSV', onClick: onExportAsCSVClick },
                                        { name: 'Edit Board', onClick: onEditBoard },
                                        { name: 'Delete Board', onClick: onDeleteBoard },
                                    ]
                                    :
                                    []
                            }}
                        />
                    </RenderIf>
                    <RenderIf condition={props.onContactSearch}>
                        <MiniSearchBar
                            placeholder="Search Contacts"
                            onSearch={props.onContactSearch}
                            onClear={props.onContactSearchClear}
                        />
                    </RenderIf>
                    <PanelDropdown
                        action={{
                            id: 'selected-contacts-actions',
                            name: `${contactsMultipageSelection.count} selected contact${contactsMultipageSelection.count > 1 ? "s" : ""}`,
                            type: 'dropdown',
                            variant: 'contained',
                            icon: ArrowDropDownIcon,
                            disabled: contactsMultipageSelection.count === 0,
                            style: { whiteSpace: "nowrap" },
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
                        onClick={onAddTagClick}
                        disabled={contactsMultipageSelection.count == 0}
                    />

                </Stack>
            </Stack>

            <ContactsTableServerMode
                id={props.tableId}
                redirectToDetails
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                apiRef={gridApiRef}
                columnsControl={props.columnsControl}
                onSortModelChange={props.onSortingChange}
                sortingMode={props.sortingMode}
                {...contactsMultipageSelection}
            />

            <CreateBoardDialog
                onEditBoard={onEditBoard}
                boardInfo={props.boardInfo}
                open={openCreateBoardDialog}
                onClose={onCloseBoardDialog}
                selectedFilters={selectedFilters}
                onBoardCreated={onBoardCreated}
                boardEditedSuccess={boardEditedSuccess}
                boardEditedFailure={boardEditedFailure}
                confirmAction={editBoard ? "Edit Board" : "Create Board"}
                title={editBoard ? `Edit Board: ${props.boardInfo?.name}` : "Create Board"}
            />

            <CreateContactDialog
                open={openCreateContactDialog}
                onClose={() => setOpenCreateContactDialog(false)}
                onContactCreated={onContactCreated}
            />

            <SelectTagDialog
                open={openSelectTagDialog}
                actionLoading={loadingTags}
                title={isTagDialogFunctionRemoveRef.current ? 'Untag' : 'Add Tag'}
                onClose={() => setOpenSelectTagDialog(false)}
                confirmLabel={isTagDialogFunctionRemoveRef.current && "Untag"}
                onConfirm={handleTagsDialogConfirm}
                isAddTag={isTagDialogFunctionRemoveRef.current ? false : true}
            />

            <FollowOnTwitterDialog
                open={openFollowOnTwitterDialog}
                contacts={contactsMultipageSelection.selectedData}
                teamMembers={teamMembers.items}
                selectedContacts={contactsMultipageSelection.selectionModel}
                onSelectionChange={contactsMultipageSelection.onSelectionModelChange}
                onClose={() => setOpenFollowOnTwitterDialog(false)}
            />
        </MainLayout>
    )
}