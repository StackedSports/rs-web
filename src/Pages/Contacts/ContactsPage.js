import { useState, useMemo, useEffect, useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid-pro';

import Stack from '@mui/material/Stack';
import { AccountBox, Tune } from '@material-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MainLayout from 'UI/Layouts/MainLayout';
import ContactsTable from 'UI/Tables/Contacts/ContactsTable';
import CreateBoardDialog from 'UI/Widgets/Dialogs/CreateBoardDialog';
import CreateContactDialog from 'UI/Widgets/Dialogs/CreateContactDialog';
import FollowOnTwitterDialog from 'UI/Widgets/Contact/FollowOnTwitterDialog';
import Button, { IconButton } from 'UI/Widgets/Buttons/Button';
import { MiniSearchBar } from 'UI/Widgets/SearchBar'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog';
import { PanelDropdown } from 'UI/Layouts/Panel';

import { AppContext } from 'Context/AppProvider'
import { mapSorting } from 'UI/Tables/Contacts/DataGridConfig'

import useMultiPageSelection from 'Hooks/MultiPageSelectionHook'

import {
    useContacts,
    useContactsInfinite,
    useStatuses,
    useRanks,
    useGradYears,
    useBoards,
    useTags,
    usePositions,
    useTeamMembers,
    useUser,
    useStatus2
} from 'Api/Hooks'

import {
    addTagsToContacts,
    addTagToContact,
    deleteTagToContact,
    untagContacts,
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { timeZones, states } from 'utils/Data'

export default function ContactsPage(props) {
    const app = useContext(AppContext)
    const gridApiRef = useGridApiRef();

    const [redirect, setRedirect] = useState('')

    const contacts = useContacts()
    const status2 = useStatus2()

    const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [selectTagDialogTitle, setSelectTagDialogTitle] = useState("Select Tags")
    const [openFollowOnTwitterDialog, setOpenFollowOnTwitterDialog] = useState(false)

    // const [selectedContacts, setSelectedContacts] = useState([])
    const selectedContacts = useMultiPageSelection(contacts.pagination.currentPage)

    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingTags, setLoadingTags] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])


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

        console.log(contacts.items)
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
            options: timeZones
        },
        birthday: {
            label: 'Birthday',
            type: 'date',
            format: 'MM/dd',
            optionsLabel: (dates) => {
                return dates[0] + ' - ' + dates[1]
            },
            isUnique: true
        },
        state: {
            label: 'State',
            options: states
        },
        status2: {
            label: 'Status 2',
            options: status2
        },
    }), [status, ranks, gradYears, tags, positions, status2])

    //console.log('status2 = ', status2)

    const visibleTableRows = {
        profileImg: false,//
        // fullname: true,(default)
        twitterName: true,
        phone: true,
        state: true,
        school: true,
        gradYear: true,
        rank: true,
        timeZone: true,
    }

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
        setOpenCreateContactDialog(true)
    }

    // useEffect(() => {
    //     app.setSideFilters(filters)
    // }, [filters])

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
        app.sendMessageToContacts(selectedContacts.getDataSelected())
    }

    const onExportAsCSVClick = (e) => {
        gridApiRef.current.exportDataAsCsv()
    }

    const onRemoveTagClick = (e) => {
        console.log("removeTag")
        setOpenSelectTagDialog(true)
        setSelectTagDialogTitle("Untag Contact")
        // deleteTagToContact()
    }

    const onFollowOnTwitterClick = (e) => {
        setOpenFollowOnTwitterDialog(true)
    }

    const onArchiveContactClick = (e) => {

    }

    const onTagsSelected = async (selectedTagsIds) => {
        setLoadingTags(true)

        let responseResult = { success: 0, error: 0 }

        selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id)

        // separate new Tags and already existing tags
        const [newTagsNames, alreadyExistingTags] = selectedTagsIds.reduce(([newTagsNames, alreadyExistingTags], selectedTagIds) => {
            return selectedTagIds.toString().startsWith('new') ?
                [newTagsNames.concat(selectedTagIds.replace('new-', '')), alreadyExistingTags] :
                [newTagsNames, alreadyExistingTags.concat(selectedTagIds)]
        }, [[], []])


        // we check if there are new tags to create and create and add them
        if (newTagsNames.length > 0) {
            // combine each contact with the new tags
            const newTagContacts = contactIds.map(contactId => newTagsNames.map(tagName => [tagName, contactId])).flat()
            console.log('newTagContacts = ', newTagContacts)
            // create and add new tags ( no problem if there are duplicates api will handle it )
            await Promise.allSettled(newTagContacts.map(([tagName, contactId]) => addTagToContact(tagName, contactId))).
                then(results => {
                    results.forEach((result, index) => {
                        if (result.status === 'fulfilled') {
                            responseResult.success++
                        }
                        else {
                            responseResult.error++
                        }
                    })
                })
        }
        // if there are already existing tags, we just add them to the contacts
        if (alreadyExistingTags.length > 0) {
            addTagsToContacts(alreadyExistingTags, contactIds)
                .then(res => {
                    responseResult.success += res.success
                    responseResult.error += res.error
                })
        }

        // now the responseResult contains the number of success and error
        if (responseResult.error === 0) {
            app.alert.setSuccess('Contacts tagged successfully!')
            setOpenSelectTagDialog(false)
        }
        else
            app.alert.setWarning(`${responseResult.success} tags were added . ${res.error} tags failed to be added.`)

        setLoadingTags(false)

        /*  addTagsToContacts(selectedTagsIds, contactIds)
             .then(res => {
                 if (res.error === 0) {
                     app.alert.setSuccess('Contacts tagged successfully!')
                     setOpenSelectTagDialog(false)
                 }
                 else
                     app.alert.setWarning(`${res.success} out of ${res.total} contacts were tagged successfully. ${res.error} contacts failed to be tagged.`)
             })
             .finally(() => setLoadingTags(false)) */
    }

    const onRemoveTagsSelected = (selectedTagsIds) => {
        // console.log("onRemoveTagsSelected")
        setLoadingTags(true)
        selectedContacts.saveData(contacts.items)
        let contactIds = selectedContacts.getDataSelected().map(contact => contact.id)

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

    const onBoardCreated = () => {
        setOpenCreateBoardDialog(false)
        boards.refreshData()
        app.alert.setSuccess('Board created successfully!')
    }

    const onContactCreated = () => {
        app.alert.setSuccess('Contact created successfully!')
    }

    const onPageChange = (page) => {
        selectedContacts.saveData(contacts.items)
        contacts.pagination.getPage(page)
    }

    const onContactSearch = (searchTerm) => {
        contacts.filter({ search: searchTerm })
    }

    const onContactSearchClear = () => {
        contacts.clearFilter()
    }

    const onSortingChange = (sorting, details) => {
        const filter = {}

        if (sorting.length === 0)
            return contacts.clearFilter()

        const field = sorting[0].field

        filter.sort_dir = sorting[0].sort
        filter.sort_column = field

        if (field === 'fullName')
            filter.sort_column = 'first_name'
        contacts.filter(filter)
    }


    return (
        <MainLayout
            title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
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
                        disabled={selectedContacts.count == 0}
                    />
                </Stack>
                <Stack flex={1} direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <MiniSearchBar
                        placeholder="Search Contacts"
                        onSearch={onContactSearch}
                        onClear={onContactSearchClear}
                    />
                    <PanelDropdown
                        action={{
                            name: 'Actions',
                            variant: 'outlined',
                            icon: AutoFixHighIcon,
                            options: [
                                // { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                // { name: 'Remove Tag', onClick: onRemoveTagClick, disabled: selectedContacts.count === 0 },
                                // { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                // { name: 'Archive Contact', onClick: onArchiveContactClick }
                            ]
                        }}
                    />
                    {selectedContacts.count > 0 &&
                        <PanelDropdown
                            action={{
                                id: 'selected-contacts-actions',
                                name: `${selectedContacts.count} selected contact${selectedContacts.count > 1 ? "s" : ""}`,
                                type: 'dropdown',
                                variant: 'contained',
                                icon: ArrowDropDownIcon,
                                style: {
                                    whiteSpace: "nowrap",
                                },
                                options: [
                                    { name: 'Export as CSV', onClick: onExportAsCSVClick },
                                    { name: 'Remove Tag', onClick: onRemoveTagClick },
                                    { name: 'Follow on Twitter', onClick: onFollowOnTwitterClick },
                                    { name: 'Archive Contact', onClick: onArchiveContactClick }
                                ]
                            }}
                        />}
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
                id="contacts-page"
                contacts={contacts.items}
                pagination={contacts.pagination}
                loading={contacts.loading}
                selection={selectedContacts.items}
                columnsControl={visibleTableRows}
                onSelectionChange={onContactsSelectionChange}
                onPageChange={onPageChange}
                onSortingChange={onSortingChange}
                apiRef={gridApiRef}
            />

            <CreateBoardDialog
                title="Create Board"
                confirmAction="Create Board"
                open={openCreateBoardDialog}
                onBoardCreated={onBoardCreated}
                selectedFilters={selectedFilters}
                onClose={() => setOpenCreateBoardDialog(false)}
            />

            <CreateContactDialog
                open={openCreateContactDialog}
                onClose={() => setOpenCreateContactDialog(false)}
                onContactCreated={onContactCreated}
            />

            <SelectTagDialog
                open={openSelectTagDialog}
                actionLoading={loadingTags}
                title={selectTagDialogTitle}
                onClose={() => setOpenSelectTagDialog(false)}
                confirmLabel={selectTagDialogTitle.includes("Untag") && "Untag"}
                onConfirm={selectTagDialogTitle.includes("Untag") ? onRemoveTagsSelected : onTagsSelected}
                isAddTag={!selectTagDialogTitle.includes("Untag")}
            />

            <FollowOnTwitterDialog
                open={openFollowOnTwitterDialog}
                contacts={contacts.items}
                onPageChange={onPageChange}
                teamMembers={teamMembers.items}
                pagination={contacts.pagination}
                onSortingChange={onSortingChange}
                selectedContacts={selectedContacts.items}
                onSelectionChange={onContactsSelectionChange}
                onClose={() => setOpenFollowOnTwitterDialog(false)}
            // onConfirm={}
            />
        </MainLayout>
    )
}