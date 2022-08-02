import { useState, useRef, useContext, useEffect } from 'react'
import { useContacts } from 'Api/ReactQuery';
import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { KanbanAddListButton } from 'UI/Widgets/Contact/components/KanbanAddListButton';
import KanbanWorkspace from 'UI/Widgets/Contact/components/KanbanWorkspace';
import KanbanList from 'UI/Widgets/Contact/components/KanbanList';
import { Stack } from '@mui/material';

import LoadingPanel from 'UI/Widgets/LoadingPanel'
import RenderIf from 'UI/Widgets/RenderIf'
import { getKanban, updateColumns } from 'Api/Firebase/Kanban/Kanban'  


export const ContactsKanban = () => {
    const app = useContext(AppContext);

    const kanbanId = useRef('test')
    const contacts = useContacts();

    const [loading, setLoading] = useState(true)
    const [kanban, setKanban] = useState(null)
    const [lists, setLists] = useState([]);
    const tempContactIndex = useRef(0);

    useEffect(() => {
        const unsub = getKanban('test', (kanban) => {
            console.log(kanban)
            setKanban(kanban)
            setLoading(false)
        })

        return () => unsub()
    }, [])

    const onSendMessageClick = (selectedData) => {
        app.sendMessageToContacts(selectedData)
    }

    const onContactSearch = (searchTerm) => {
        contacts.filter({ search: searchTerm })
        contacts.refetch()
    }

    const onContactSearchClear = () => {
        contacts.clearFilter()
    }

    const onAddColumn = (columnName) => {
        console.log('on Add Column')

        if (!kanban.columns || kanban.columns.find(column => column.name === columnName) === undefined) {
            console.log('column does not exist yet')
            // setLists(lists => [...lists, { name: columnName, contacts: [] }])
            
            // Create new columns array
            const newColumns = [...kanban.columns, { name: columnName, contacts: [] }]

            // Update state
            setKanban(kanban => ({
                ...kanban,
                columns: newColumns
            }))

            // Save to firebase
            updateColumns(kanbanId.current, newColumns)
        } else {
            app.alert.setWarning(`Column ${columnName} already exists, please choose a different name`)
        }
    }

    const onAddContact = (columnName) => {
        const contact = contacts.items[tempContactIndex.current]

        setKanban(kanban => {
            const newColumns = [...kanban.columns]
            const column = newColumns.find(c => c.name === columnName)
            column.contacts.push(contact)

            // Save to firebase
            updateColumns(kanbanId.current, newColumns)

            return {
                ...kanban,
                columns: newColumns
            }
        })

        // setLists(lists => {
        //     const newLists = [...lists]
        //     const list = newLists.find(l => l.name === listName)
        //     list.contacts.push(contact)
        //     return newLists
        // })

        tempContactIndex.current++
    }

    const onDeleteColumn = (columnName) => {
        // setLists(lists => lists.filter(list => list.name !== listName))
        setKanban(kanban => {
            const newColumns = kanban.columns.filter(column => column.name !== columnName)

            // Save to firebase
            updateColumns(kanbanId.current, newColumns)

            return {
                ...kanban,
                columns: newColumns
            }
        })
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

    function onDragEnd(result) {
        const { source, destination } = result;

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

            updateColumns(kanbanId.current, ordered)

            return;
        }

        // reordering contact
        if (result.type === 'CONTACT') {
            const result = reorderContactsMap([...kanban.columns], source, destination)

            setKanban(kanban => ({
                ...kanban,
                columns: result
            }))

            updateColumns(kanbanId.current, result)

            return
        }

    }


    return (
        <BaseContactsPage
            title={loading ? `Kanban` : `Kanban "${kanban.name}"`}
            contacts={contacts}
            onSendMessage={onSendMessageClick}
            tableId="kanban-table"
            onContactSearch={onContactSearch}
            onContactSearchClear={onContactSearchClear}
            kanbanView={true}
        >
            <RenderIf condition={loading}>
                <LoadingPanel/>
            </RenderIf>
            <Stack direction={'row'} flex={1} spacing={.5} sx={{ overflow: 'auto', overflowX: 'auto', minWidth: 0 }}>
                <RenderIf condition={!loading && kanban && kanban.columns && Array.isArray(kanban.columns)}>
                    <KanbanWorkspace onDragEnd={onDragEnd}>
                        {kanban?.columns?.map((list, index) => (
                            <KanbanList
                            key={list.name}
                            list={list}
                            index={index}
                            onAddContact={onAddContact}
                            onDeleteBoard={onDeleteColumn}
                            />
                        ))}
                    </KanbanWorkspace>
                </RenderIf>
                <RenderIf condition={!loading}>
                    <KanbanAddListButton onAddList={onAddColumn} />
                </RenderIf>
            </Stack>
        </BaseContactsPage>
    )
}

export default ContactsKanban