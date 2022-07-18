import { useState, useEffect, useRef } from 'react'


import TabPanel from '@mui/lab/TabPanel';
import { Button, IconButton } from '@mui/material';


import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import SearchBar from 'UI/Widgets/SearchBar'
//import ContactsTable from 'UI/Tables/Contacts/ContactsTable'
import ContactsTableServerMode from 'UI/Tables/Contacts/ContactsTableServerMode';
import BoardsTable from 'UI/Tables/Boards/BoardsTable'

import useArray from 'Hooks/ArrayHooks';
import useMultiPageSelection from 'Hooks/MultiPageSelectionHook'
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'

import { useContacts, useBoards } from 'Api/ReactQuery';

import { findByIds } from 'utils/Helper'
import { Clear } from '@mui/icons-material';

export const tabs = {
    privateBoard: '0',
    teamBoard: '1',
    contact: '2'
}

const myTabs = [
    { id: '0', label: 'My Boards', hideSearch: true },
    { id: '1', label: 'Team Boards', hideSearch: true },
    { id: '2', label: 'Contacts' }
]

const getSelectionLabel = (privateCount, teamCount, contactCount, clearSelection) => {
    if (privateCount == 0 && teamCount == 0 && contactCount == 0)
        return ''

    let selectionLabel = privateCount > 0 ? `${privateCount} Private Boards` : ''

    if (teamCount > 0) {
        let prefix = selectionLabel == '' ? '' : ', '
        selectionLabel += prefix + `${teamCount} Team Boards`
    }

    if (contactCount > 0) {
        let prefix = selectionLabel == '' ? '' : ', '
        selectionLabel += prefix + `${contactCount} Contacts`
    }

    return (
        <>
            Selected: {selectionLabel}
            <IconButton size='small' color='inherit' onClick={clearSelection}>
                <Clear fontSize="inherit" />
            </IconButton>
        </>
    )
}




export default function ReceiverSelectDialog(props) {
    // Contacts
    const contacts = useContacts()

    const [selectedContacts, setSelectedContacts] = useState([])
    // When Contacts page change, we need to store the selected contacts data
    // and the current selection somehow. We also need to keep track of each
    // page's selection, otherwise we could run into duplication issues, or
    // having to iterate over selected ids for contacts we already retrieved
    // the data from. So here's a hook for that!
    // 
    //const mpSelection = useMultiPageSelection(contacts.pagination.currentPage)
    const multipageSelection = useMultiPageSelection_V2(contacts.items)
    // 

    // Boards
    const boards = useBoards()

    // Private Boards
    const [privateBoards, setPrivateBoards] = useArray()
    const [selectedPrivateBoards, setSelectedPrivateBoards] = useState([])

    // Team Boards
    const [teamBoards, setTeamBoards] = useArray()
    const [selectedTeamBoards, setSelectedTeamBoards] = useState([])

    // console.log(boards)

    useEffect(() => {
        if (!boards.items)
            return

        console.log(boards.items)

        let tempTeam = []
        let tempPrivate = []

        boards.items.forEach(board => {
            let array = board.is_shared ? tempTeam : tempPrivate
            array.push(board)
        })

        setPrivateBoards.all(tempPrivate)
        setTeamBoards.all(tempTeam)

    }, [boards.items])

    useEffect(() => {
        if (!props.removedItem)
            return


        let { index, type, id } = props.removedItem

        let tmp = null, set = null

        let control = {
            privateBoards: { items: Object.assign([], selectedPrivateBoards), set: setSelectedPrivateBoards },
            teamBoards: { items: Object.assign([], selectedTeamBoards), set: setSelectedTeamBoards },
            contacts: { items: Object.assign([], selectedContacts), set: setSelectedContacts },
        }

        // type = privateBoards | teamBoards | contacts
        switch (type) {
            case 'privateBoards':
                tmp = Object.assign([], selectedPrivateBoards)
                set = setSelectedPrivateBoards
                break
            case 'teamBoards':
                tmp = Object.assign([], selectedTeamBoards)
                set = setSelectedTeamBoards
                break
            case 'contacts':
                tmp = Object.assign([], selectedContacts)
                set = setSelectedContacts
                break
            default: return
        }

        if (index === 'all')
            tmp = []
        else
            tmp.splice(index, 1)

        console.log(tmp)

        if (type === 'contacts') {
            if (index === 'all') {
                // paginatedContactsSelection.current = {}
                // setContactsSelectionCount(0)
                //mpSelection.clear()
                multipageSelection.clear()
            } else {
                // removeContactFromPaginatedSelection(id)
                // setContactsSelectionCount(contactsSelectionCount - 1)
                //mpSelection.remove(id)
                multipageSelection.remove(id)
            }
        }

        set(tmp)

    }, [props.removedItem])

    const onSearch = (searchTerm, tabIndex) => {
        contacts.filter({ search: searchTerm })
    }

    const onClearSearch = (tabIndex) => {
        contacts.clearFilter()
    }

    const onSelectionConfirm = (e) => {
        const selectionPrivate = findByIds(selectedPrivateBoards, privateBoards)
        const selectionTeam = findByIds(selectedTeamBoards, teamBoards)

        // For the contacts, we need to add the selected contacts from previous pages  
        //mpSelection.saveData(contacts.items)
        //let selectionContact = mpSelection.getDataSelected()
        let selectionContact = multipageSelection.selectedData

        // console.log(selectionPrivate)
        // console.log(selectionTeam)
        // console.log(selectionContact)

        props.onSelected(selectionPrivate, selectionTeam, selectionContact)
    }

    const clearAllSelections = () => {
        multipageSelection.clear()
        setSelectedContacts([])
        setSelectedPrivateBoards([])
        setSelectedTeamBoards([])
    }

    const onClose = () => {
        props.onClose()
        clearAllSelections()
    }

    const selectionLabel = getSelectionLabel(
        selectedPrivateBoards.length,
        selectedTeamBoards.length,
        multipageSelection.count,
        clearAllSelections)

    return (
        <SelectDialogTab
            tabs={myTabs}
            selectionLabel={selectionLabel}
            open={props.open}
            onConfirmSelection={onSelectionConfirm}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            onClose={onClose}
        >
            <TabPanel value={'0'} index={0}>
                <BoardsTable mini
                    contacts={privateBoards}
                    pagination={{ currentPage: 1, totalPages: 1, itemsPerPage: 50 }}
                    loading={false}
                    selection={selectedPrivateBoards}
                    onSelectionChange={(newSelection) => setSelectedPrivateBoards(newSelection)}
                />
            </TabPanel>
            <TabPanel value={'1'} index={1}>
                <BoardsTable mini
                    contacts={teamBoards}
                    pagination={{ currentPage: 1, totalPages: 1, itemsPerPage: 50 }}
                    loading={false}
                    selection={selectedTeamBoards}
                    onSelectionChange={(newSelection) => setSelectedTeamBoards(newSelection)}
                />
            </TabPanel>
            <TabPanel value={'2'} index={2}>
                <ContactsTableServerMode
                    mini
                    contacts={contacts.items}
                    pagination={contacts.pagination}
                    loading={contacts.loading}
                    {...multipageSelection}
                />
            </TabPanel>
        </SelectDialogTab>
    )

}