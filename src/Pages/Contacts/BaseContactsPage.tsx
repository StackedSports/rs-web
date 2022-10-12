 // @ts-nocheck
import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { useQueryClient } from 'react-query';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune, Clear } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import MainLayout from 'UI/Layouts/MainLayout';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';
import CreateContactDialog from 'UI/Widgets/Dialogs/CreateContactDialog'
import CreateKanbanDialog from 'UI/Widgets/Dialogs/CreateKanbanDialog'
import FollowOnTwitterDialog from 'UI/Widgets/Contact/FollowOnTwitterDialog';
import Button from 'UI/Widgets/Buttons/Button';
import { MiniSearchBar } from 'UI/Widgets/SearchBar'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'

import {
    useBoards,
    useBoardMutation,
    useStatus2,
    useGradYears,
    useStatuses,
    useRanks,
    useTeamMembers,
    usePositions,
    useTags,
    useTagsWithContacts
} from 'Api/ReactQuery';
import { useKanbans } from 'Api/Firebase/Kanban/Kanban'

import {
    addTagsToContactsWithNewTags,
    archiveContacts,
    untagContacts,
} from 'Api/Endpoints';

import { contactsRoutes } from 'Routes/Routes';
import { getFullName } from 'utils/Parser';
import { timeZones, states } from 'utils/Data';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AppContext } from 'Context/AppProvider';
import { IconButton } from '@mui/material';
import RenderIf from 'UI/Widgets/RenderIf';

import { IBoard, ISideFilter } from 'Interfaces'
import { IPanelFilters, ISelectedFilters } from 'UI/Widgets/PanelFilters/PanelFilters';

export default function BaseContactsPage(props) {
    const app = useContext(AppContext)
    const queryClient = useQueryClient();
    const confirmDialog = useContext(ConfirmDialogContext)
    const isTagDialogFunctionRemoveRef = useRef(false)
    const { remove: deleteBoard } = useBoardMutation()

    const [redirect, setRedirect] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingTags, setLoadingTags] = useState(false)
    const [privateBoards, setPrivateBoards] = useState<IBoard[]>([])
    const [teamBoards, setTeamBoards] = useState<IBoard[]>([])

    const [isCreateKanbanDialogOpen, setIsCreateKanbanDialogOpen] = useState(false)
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
    const tags = useTags() //useTagsWithContacts()
    const positions = usePositions()
    const teamMembers = useTeamMembers()
    const boards = useBoards()
    const kanbans = useKanbans()

    const gridApiRef = useGridApiRef()
    const contactsMultipageSelection = props.multiPageSelection || useMultiPageSelection_V2(contacts.items)

    useEffect(() => {
        if (props.selectedFilters)
            setSelectedFilters(props.selectedFilters)
    }, [props.selectedFilters])

    useEffect(() => {
        if (!contacts.pagination)
            return

        //console.log(contacts.pagination)
    }, [contacts.pagination])

    useEffect(() => {
        if (!boards.items)
            return

        const privateBoards = boards.items.filter(board => !board.is_shared)
        // privateBoards.sort((a, b) => a.name.localeCompare(b.name))
        const teamBoards = boards.items.filter(board => board.is_shared)
        // teamBoards.sort((a, b) => a.name.localeCompare(b.name))
        setPrivateBoards(privateBoards)
        setTeamBoards(teamBoards)
    }, [boards.items])

    const panelFiltersData: IPanelFilters = useMemo(() =>
    ({
        status: {
            label: 'Status',
            options: status.items,
        },
        ranks: {
            label: 'Rank',
            options: ranks.items,
        },
        years: {
            label: 'Grad Year',
            options: gradYears.items,
        },
        tags: {
            label: 'Tags',
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
        positions: {
            label: 'Position',
            options: positions.items,
        },
        area_coaches: {
            label: 'Area Coach',
            options: teamMembers.items,
            optionsLabel: (option) => getFullName(option),
        },
        position_coaches: {
            label: 'Position Coach',
            options: teamMembers.items,
        },
        timezones: {
            label: 'Time Zone',
            options: timeZones,
        },
        dob: {
            label: 'Birthday',
            type: 'date',
            format: 'MM/dd',
            optionsLabel: (dates) => dates.join(' - '),
            isUnique: true
        },
        states: {
            label: 'State',
            options: states,

        },
        status_2: {
            label: 'Status 2',
            options: status2.items,
        },
    }), [status.items, ranks.items, gradYears.items, tags.items, positions.items, teamMembers.items, status2.items])

    const mainActions = useMemo(() => {
        if (props.kanbanView)
            return props.mainActions

        return [
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
    }, [props.kanbanView, props.mainActions, selectedFilters])

    const onTopActionClick = () => {
        setOpenCreateContactDialog(true)
    }

    const filters: ISideFilter[] = useMemo(() => {
        return [
            { // Category
                id: '0',
                name: 'Contacts',
                items: [
                    { id: 'all-contacts', name: 'All Contacts', path: contactsRoutes.all },
                    { id: 'all-contacts-archived', name: 'Archived', path: contactsRoutes.archived },
                ],
            },
            {
                id: 'kanbans',
                name: 'Team Kanbans',
                items: kanbans.items?.map(kanban => ({ id: kanban.id, name: kanban.name, path: `${contactsRoutes.kanban}/${kanban.id}` })),
                button: { label: '+ New Kanban', onClick: () => setIsCreateKanbanDialogOpen(true) }
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
    }, [contactsRoutes, kanbans?.items, privateBoards, teamBoards])

    // let filters = [

    // ]

    const onPanelFilterChange = (filter: ISelectedFilters) => {
        // console.log('Filters selected', filter)
        setSelectedFilters(filter)
        if (props.onPanelFilterChange)
            props.onPanelFilterChange(filter)
    }

    const onSendMessageClick = () => {
        let selectedData = contactsMultipageSelection.selectedData
        if (props.onSendMessage)
            props.onSendMessage(selectedData)
    }

    const onExportAsCSVClick = () => {
        gridApiRef.current.exportDataAsCsv()
    }

    const onRemoveTagClick = () => {
        isTagDialogFunctionRemoveRef.current = true
        setOpenSelectTagDialog(true)
    }
    const onAddTagClick = () => {
        isTagDialogFunctionRemoveRef.current = false
        setOpenSelectTagDialog(true)
    }

    const onFollowOnTwitterClick = () => {
        setOpenFollowOnTwitterDialog(true)
    }

    const onArchiveContactClick = () => {
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

    const boardEditedSuccess = () => {
        setOpenCreateBoardDialog(false)
        app.alert.setSuccess('Board edited successfully!')
        boards.refetch()
        setShowPanelFilters(false)
        setEditBoard(false)
    }

    const boardEditedFailure = () => {
        app.alert.setError('Failed to edit board.')
    }

    const onDeleteBoard = () => {
        const title = "Delete Board"
        confirmDialog.show(title, "You cannot undo this action. Are you sure you want to continue? ", () => {

            setLoading(true)
            deleteBoard(props.boardInfo.id, {
                onSuccess: () => {
                    app.alert.setSuccess('Board deleted successfully!')
                    boards.refetch()
                    setRedirect(contactsRoutes.all)
                },
                onError: (error) => {
                    console.log(error)
                    app.alert.setError('Failed to delete board.')
                },
                onSettled: () => setLoading(false)
            })
        })
    }

    const onAddTagsToContacts = async (selectedTagsIds: string) => {

        let contactIds = contactsMultipageSelection.selectionModel

        const res = await addTagsToContactsWithNewTags(selectedTagsIds, contactIds)

        if (res.error.count === 0)
            app.alert.setSuccess('Contacts tagged successfully!')
        else
            app.alert.setWarning(`${res.success.count} out of ${contactsMultipageSelection.count} contacts were tagged successfully. ${res.error.count} contacts failed to be tagged.`)

        queryClient.invalidateQueries(['tags'])
        queryClient.invalidateQueries(['contacts'])
        queryClient.invalidateQueries(['contact'], { active: true })
    }

    const onRemoveTagsFromContacts = async (selectedTagsIds: string) => {

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

        queryClient.invalidateQueries(['tags'])
        queryClient.invalidateQueries(['contacts'])
        queryClient.invalidateQueries(['contact'], { active: true })
    }

    const handleTagsDialogConfirm = async (selectedTagsIds: string) => {
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
    }

    const onBackBoardToContacts = () => {
        setRedirect(contactsRoutes.all)
    }

    const onContactCreated = () => {
        app.alert.setSuccess('Contact created successfully!')
    }

    const selectedContatsActions = useMemo(() => {
        let options = []

        if (props.kanbanView)
            options = [
                { name: 'Remove Tag', onClick: onRemoveTagClick },
                { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                { name: 'Archive Contact', onClick: onArchiveContactClick }
            ]
        else if (props.onlyArchived)
            options = [
                { name: 'Export as CSV', onClick: onExportAsCSVClick },
                { name: 'Remove Tag', onClick: onRemoveTagClick },
                { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
            ]
        else
            options = [
                { name: 'Export as CSV', onClick: onExportAsCSVClick },
                { name: 'Remove Tag', onClick: onRemoveTagClick },
                { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                { name: 'Archive Contact', onClick: onArchiveContactClick }
            ]
        return options

    }, [props.kanbanView, props.onlyArchived])


    return (
        <MainLayout
            title={props.title || 'Contacts'}
            showBackBoardToContacts={props.showBackBoardToContacts}
            onBackBoardToContacts={onBackBoardToContacts}
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            actions={props.disabledMainActions ? [] : mainActions}
            loading={loading}
            redirect={redirect}
            propsPanelFilters={{
                open: props.showPanelFilters || showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                selectedFilters: selectedFilters
            }}
        >
            {/* <RenderIf condition={!props.kanbanView}> */}
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

                <Stack flex={1} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <RenderIf condition={props.onContactSearch}>
                        <MiniSearchBar
                            placeholder="Search Contacts"
                            onSearch={props.onContactSearch}
                            onClear={props.onContactSearchClear}
                        />
                    </RenderIf>
                    <RenderIf condition={contactsMultipageSelection.count > 0}>
                        <PanelDropdown
                            action={{
                                id: 'selected-contacts-actions',
                                name: `${contactsMultipageSelection.count} selected contact${contactsMultipageSelection.count > 1 ? "s" : ""}`,
                                variant: 'contained',
                                icon: ArrowDropDownIcon,
                                disabled: contactsMultipageSelection.count === 0,
                                style: { whiteSpace: "nowrap" },
                                options: selectedContatsActions
                            }}
                        />
                    </RenderIf>
                    <Button
                        name="Tag"
                        variant="outlined"
                        endIcon={<LocalOfferOutlinedIcon />}
                        onClick={onAddTagClick}
                        disabled={contactsMultipageSelection.count == 0}
                    />
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

                    <Button
                        name="Send Message"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={onSendMessageClick}
                        disabled={props.enableSendMessageWithoutSelection ?
                            false : contactsMultipageSelection.count == 0}
                    />
                </Stack>
            </Stack>
            {/*  </RenderIf> */}

            {
                props.kanbanView ? props.children
                    : (
                        <ContactsTableServerMode
                            id={props.tableId}
                            redirectToDetails
                            contacts={contacts.items}
                            pagination={contacts.pagination}
                            loading={contacts.isFetching}
                            apiRef={gridApiRef}
                            columnsControl={props.columnsControl}
                            onSortModelChange={props.onSortingChange}
                            sortingMode={props.sortingMode}
                            selectedFilters={selectedFilters}
                            {...contactsMultipageSelection}
                        />
                    )
            }

            <CreateKanbanDialog
                open={isCreateKanbanDialogOpen}
                onClose={() => setIsCreateKanbanDialogOpen(false)}
                onSuccess={() => setIsCreateKanbanDialogOpen(false)}
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