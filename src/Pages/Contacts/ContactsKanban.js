import { useState, useRef, useContext, useEffect, useMemo } from 'react'
import { Stack } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'

import { useParams } from 'react-router-dom'
import lodash from 'lodash';

import BaseContactsPage from './BaseContactsPage';
import { AppContext } from 'Context/AppProvider';
import { KanbanAddListButton } from 'UI/Widgets/Contact/components/KanbanAddListButton';
import KanbanWorkspace from 'UI/Widgets/Contact/components/KanbanWorkspace';
import KanbanColumn from 'UI/Widgets/Contact/components/KanbanColumn';

import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import LoadingPanel from 'UI/Widgets/LoadingPanel'
import ErrorPanel from 'UI/Layouts/ErrorPanel'
import RenderIf from 'UI/Widgets/RenderIf'

import { getKanban, updateColumns, deleteKanban } from 'Api/Firebase/Kanban/Kanban'
import { useContacts } from 'Api/ReactQuery';

import { ContactsSelectDialog } from 'UI/Widgets/Contact/components/ContactsSelectDialog';


export const ContactsKanban = () => {
    const { id: kanbanId } = useParams()
    const app = useContext(AppContext);
    const multipageSelection = useMultiPageSelection_V2([]) // only use set
    const { set: setSelectedContacts, selectedData: selectedContacts } = multipageSelection

    const contacts = useContacts();

    const [loading, setLoading] = useState(true)
    const [kanban, setKanban] = useState(null)
    const [showContactSelectDialog, setShowContactSelectDialog] = useState(false);

    const tempColumnName = useRef();

    useEffect(() => {
        if (!kanbanId)
            return

        const unsub = getKanban(kanbanId, (kanban) => {
            console.log(kanban)

            setKanban(kanban)
            setLoading(false)
        })

        return () => unsub()
    }, [kanbanId])

    const haveContactInMultipleColumns = (contact) => {
        let count = 0
        kanban.columns.forEach(column => {
            if (column.contacts.some(c => c.id === contact.id))
                count++
        })
        return count > 1
    }

    const isContactSelected = (contact) => selectedContacts.some(c => c.id === contact.id)

    const onSendMessageClick = (selectedData) => {
        app.sendMessageToContacts(selectedData)
    }

    const onAddColumn = (columnName) => {
        console.log('on Add Column')

        if (!kanban.columns || !kanban.columns.some(column => column.name === columnName)) {
            console.log('column does not exist yet')
            // setLists(lists => [...lists, { name: columnName, contacts: [] }])

            // Create new columns array
            const newColumns = [...kanban.columns, { id: Date.now(), name: columnName, contacts: [] }]

            // Update state
            setKanban(kanban => ({
                ...kanban,
                columns: newColumns
            }))

            // Save to firebase
            updateColumns(kanbanId, newColumns)
        } else {
            app.alert.setWarning(`Column ${columnName} already exists, please choose a different name`)
        }
    }

    const onAddContact = (columnName) => {
        setShowContactSelectDialog(true)
        tempColumnName.current = columnName
    }

    const onRemoveContact = (contact, listId) => {
        const newColumns = Object.assign([], kanban.columns)
        const column = newColumns.find(list => list.id === listId)

        if (column === undefined)
            return

        // before removing, check if the contact is checked and if is not in other columns whe deselect it
        if (isContactSelected(contact) && !haveContactInMultipleColumns(contact)) {
            onSelectContact(contact)
        }

        column.contacts = column.contacts.filter(c => c.id != contact.id)

        setKanban(kanban => ({
            ...kanban,
            columns: newColumns
        }))

        // Save to firebase
        updateColumns(kanbanId, newColumns)
    }

    const onColumnNameChange = (newColumnName, listId) => {
        const newColumns = Object.assign([], kanban.columns)
        const column = newColumns.find(list => list.id === listId)

        if (column === undefined)
            return

        // column.contacts = lodash.uniqBy([...column.contacts, ...selectedData], 'id')
        column.name = newColumnName

        setKanban(kanban => ({
            ...kanban,
            columns: newColumns
        }))

        // Save to firebase
        updateColumns(kanbanId, newColumns)
    }

    const onSelectionConfirm = (selectedData) => {
        setShowContactSelectDialog(false)

        const listName = tempColumnName.current

        if (!listName)
            return

        const newColumns = Object.assign([], kanban.columns)
        const column = newColumns.find(list => list.name === listName)

        if (column === undefined)
            return

        column.contacts = lodash.uniqBy([...column.contacts, ...selectedData], 'id')

        setKanban(kanban => ({
            ...kanban,
            columns: newColumns
        }))

        // Save to firebase
        updateColumns(kanbanId, newColumns)
    }

    const onCloseSelectionDialog = () => {
        setShowContactSelectDialog(false)
        onContactSearchClear()
        tempColumnName.current = null
    }

    const onDeleteColumn = (columnName) => {
        // setLists(lists => lists.filter(list => list.name !== listName))
        setKanban(kanban => {
            const newColumns = kanban.columns.filter(column => column.name !== columnName)

            // Save to firebase
            updateColumns(kanbanId, newColumns)

            return {
                ...kanban,
                columns: newColumns
            }
        })
    }

    const onSelectContact = (contact) => {
        if (selectedContacts.some(c => c.id === contact.id))
            setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id))
        else
            setSelectedContacts([...selectedContacts, contact])
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const reorderContactsMap = (_lists, source, destination) => {
        const currentIndex = _lists.findIndex(item => item.name == source.droppableId);
        const nextIndex = _lists.findIndex(item => item.name == destination.droppableId);
        const target = _lists[currentIndex].contacts[source.index];

        // moving to same list
        if (source.droppableId === destination.droppableId) {
            const reordered = reorder(
                _lists[currentIndex].contacts,
                source.index,
                destination.index,
            );
            const result = _lists.map((item, index) => { return index === currentIndex ? { ...item, contacts: reordered } : item });
            return result
        }

        // moving to different list

        // remove from original
        _lists[currentIndex].contacts.splice(source.index, 1);
        // insert into next
        _lists[nextIndex].contacts.splice(destination.index, 0, target);

        return _lists
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(result)

        // dropped outside the list
        if (!destination) {
            return;
        }

        // did not move anywhere
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                kanban.columns,
                source.index,
                destination.index,
            );

            setKanban(kanban => ({
                ...kanban,
                columns: ordered
            }))

            updateColumns(kanbanId, ordered)

            return;
        }

        // reordering contact
        if (result.type === 'CONTACT') {
            const result = reorderContactsMap([...kanban.columns], source, destination)

            setKanban(kanban => ({
                ...kanban,
                columns: result
            }))

            updateColumns(kanbanId, result)

            return
        }

    }

    const onDeleteKanban = () => {
        deleteKanban(kanbanId)
            .then(() => {
                app.redirect('/contacts')
            })
    }

    const mainActions = useMemo(() => {
        let action = {
            name: 'Action',
            type: 'dropdown',
            variant: 'outlined',
            icon: AutoFixHighIcon,
            options: [
                { name: 'Delete', onClick: onDeleteKanban },
                // { name: 'Save As Draft & Exit', onClick: onSaveMessageAndExitClick },
                // { name: 'Delete Message', color: 'red', onClick: onDeleteMessageClick }
            ]
        }

        return [action]
    }, [])

    return (
        <BaseContactsPage
            title={loading ? `Kanban` : `Kanban: ${kanban?.name || 'undefined'}`}
            contacts={contacts}
            tableId="kanban-table"
            kanbanView={true}
            mainActions={mainActions}
            multiPageSelection={multipageSelection}
            onSendMessage={onSendMessageClick}
        >
            <RenderIf condition={loading}>
                <LoadingPanel />
            </RenderIf>
            <RenderIf condition={!loading && !kanban}>
                <ErrorPanel
                    title="Kanban Not Found"
                    body="The Kanban with the specified id does not exist"
                />
            </RenderIf>
            <Stack direction={'row'} flex={1} spacing={.5} sx={{ overflow: 'auto', overflowX: 'auto', minWidth: 0 }}>
                <RenderIf condition={!loading && kanban && kanban.columns && Array.isArray(kanban.columns)}>
                    <KanbanWorkspace onDragEnd={onDragEnd}>
                        {kanban?.columns?.map((list, index) => (
                            <KanbanColumn
                                key={list.name}
                                list={list}
                                index={index}
                                onAddContact={onAddContact}
                                onDeleteColumn={onDeleteColumn}
                                onRemoveContact={(contact) => onRemoveContact(contact, list.id)}
                                onNameChange={(name) => onColumnNameChange(name, list.id)}
                                onSendMessage={onSendMessageClick}
                                onSelectContact={onSelectContact}
                                selectedContacts={selectedContacts}
                            />
                        ))}
                    </KanbanWorkspace>
                </RenderIf>
                <RenderIf condition={!loading && kanban}>
                    <KanbanAddListButton onAddList={onAddColumn} />
                </RenderIf>
            </Stack>

            <ContactsSelectDialog
                open={showContactSelectDialog}
                onClose={onCloseSelectionDialog}
                onSelectionConfirm={onSelectionConfirm}
            />
        </BaseContactsPage>
    )
}

export default ContactsKanban