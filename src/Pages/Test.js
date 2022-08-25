import { useState, useEffect, useContext } from 'react'

import { addDoc, setDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, query, where, writeBatch} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'

import { db, functions } from 'Api/Firebase'

import { useUser, useRanks, useContacts, useTags, useContact } from 'Api/Hooks'
import { getContactAssociatedMedia, updateContact, getStats, getBoards, getBoard, filterContacts, archiveContact, getContact, getFilters, getMessageInbox, getMessageRecipientsX } from 'Api/Endpoints'

import { AuthContext } from 'Context/Auth/AuthProvider'


import useArray from 'Hooks/ArrayHooks'

import MainLayout from 'UI/Layouts/MainLayout'
import MessageInput from 'UI/Forms/Inputs/MessageInput'
// import { updateContact } from 'ApiHelper'

const testTweetId = '1548323821777653763'

const Test = () => {
    const { user } = useContext(AuthContext)

    const [tasks, setTasks] = useState([])

    // const contacts = useContacts(1, 20)
    // console.log(contacts.items)


    useEffect(() => { //        
        

        

    }, [])

    const onTopActionClick = (e) => {
        console.log('top action click')

        
    }

    let filters = [
        { // Category
            id: '0',
            name: 'Drafts',
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

    return (
        <MainLayout
          title='Test'
          topActionName='+ Add Test'
          onTopActionClick={onTopActionClick}
          filters={filters}
          onFilterSelected={onFilterSelected}
        >
            {tasks.map(task => (
                <h3>{task.id} count: {task.count}</h3>
            ))}
        </MainLayout>
    )
}

export default Test