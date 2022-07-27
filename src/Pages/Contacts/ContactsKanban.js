import { useState, useRef, useContext } from 'react'
import { useContacts } from 'Api/ReactQuery';
import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { KanbanAddListButton } from 'UI/Widgets/Contact/components/KanbanAddListButton';
import KanbanWorkspace from 'UI/Widgets/Contact/components/KanbanWorkspace';
import KanbanList from 'UI/Widgets/Contact/components/KanbanList';
import { Stack } from '@mui/material';


export const ContactsKanban = () => {
    const app = useContext(AppContext);
    const contacts = useContacts();
    const [lists, setLists] = useState([]);
    const tempContactIndex = useRef(0);

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

    const onAddList = (listName) => {
        if (lists.find(list => list.name === listName) === undefined) {
            setLists(lists => [...lists, { name: listName, contacts: [] }])
        } else {
            app.alert.setWarning(`Board ${listName} already exists, please choose a different name`)
        }
    }

    const onAddContact = (listName) => {
        const contact = contacts.items[tempContactIndex.current]
        setLists(lists => {
            const newLists = [...lists]
            const list = newLists.find(l => l.name === listName)
            list.contacts.push(contact)
            return newLists
        })
        tempContactIndex.current++
    }

    const onDeleteBoard = (listName) => {
        setLists(lists => lists.filter(list => list.name !== listName))
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
                lists,
                source.index,
                destination.index,
            );

            setLists(ordered);
            return;
        }

        // reordering contact
        if (result.type === 'CONTACT') {
            const result = reorderContactsMap([...lists], source, destination);
            setLists(result);
            return;
        }

    }


    return (
        <BaseContactsPage
            title="Contacts"
            contacts={contacts}
            onSendMessage={onSendMessageClick}
            tableId="kanban-table"
            onContactSearch={onContactSearch}
            onContactSearchClear={onContactSearchClear}
            kanbanView={true}
        >
            <Stack direction={'row'} flex={1} spacing={.5} sx={{ overflow: 'auto', overflowX: 'auto', minWidth: 0 }}>
                <KanbanWorkspace onDragEnd={onDragEnd}>
                    {lists.map((list, index) => (
                        <KanbanList key={list.name} list={list} index={index} onAddContact={onAddContact} onDeleteBoard={onDeleteBoard} />
                    ))}
                </KanbanWorkspace>
                <KanbanAddListButton onAddList={onAddList} />
            </Stack>
        </BaseContactsPage>
    )
}

export default ContactsKanban