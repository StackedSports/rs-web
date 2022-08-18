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

    // const contacts = useContacts()
    // const ranks = useRanks()

    // const tags = useTags()
    // const contact = useContact('mkjXBTMWnmPX')

    // const [users, setUsers] = useArray()

    // setUsers.push()
    // setUsers.clear()

    useEffect(() => { //        
        

        // NOVAvSkeYwGE

        // getMessageRecipientsX('NOVAvSkeYwGE')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))

        // const q = query(collection(db, 'orgs'))
        // getDocs(q, snapshot => {
        //     console.log(snapshot)
        //     snapshot.forEach(doc => console.log(doc.id))
        // })

        // return () => unsub()

    }, [])

    // useEffect(() => {
    //     if(contact) {
    //         //console.log(contact)
    //     }
    // }, [contact])

    const onTopActionClick = (e) => {
        console.log('top action click')

        // const contactId = 'JkyvnTvBympO'

        // updateContact(contactId, { time_zone: 'America/Chicago' })
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))

        // return

        // 

        const link1 = 'https://stakdsocial.s3.us-east-2.amazonaws.com/variants/fgo1j36y7j59aujgbjz9epw69wgx/09c3e62196e5f328397b403abb19ca073c463ca8fd2b58b152c9182b6ff5e764?response-content-disposition=inline%3B%20filename%3D%22Good_Luck_This_Season.jpg%22%3B%20filename%2A%3DUTF-8%27%27Good_Luck_This_Season.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T203623Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=697b08f7513a2daa743128868b17b5f50197b3f1d2a43146beff9f801745a0f4'
        const link2 = 'https://stakdsocial.s3.us-east-2.amazonaws.com/variants/fgo1j36y7j59aujgbjz9epw69wgx/21aa2287386a1fbe8432a2a06480f0eca50d25b324505ba43b43d9e1e4bd8dcf?response-content-disposition=inline%3B%20filename%3D%22Good_Luck_This_Season.jpg%22%3B%20filename%2A%3DUTF-8%27%27Good_Luck_This_Season.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T205009Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c046efa35a363aee7d12940e63b296644790dee7e2cd35a68f865560e1185d9e'


        const orgIds = ['KeDeBZFpKGEn', 'MZdXLvFrrdXe', 'QJdYlqFNmRPk', 'VwGMBbFkBRaW',
            'YlGkWYFKzGxP', 'ayGOrMFjvDJb', 'beWDpYKFeGmQ', 'pZdgkvFANdBy', 'rkPDZxBFJRJW',
            'yQAGjkNFKRre', 'zqdAQOFPNdwP', 'zqdAQOFrxdwP']

        const now = Date.now()
        console.log(now)

        return
        const batch = writeBatch(db)

        orgIds.forEach(orgId => {
            const q = query(collection(db, 'orgs', orgId, 'tweet-ranking'))
            getDocs(q, snapshot => {
                console.log(snapshot)
                snapshot.forEach((doc, index) => {
                    const docRef = doc(db, 'orgs', orgId, 'tweet-ranking', doc.id)

                    if(doc.timestamp) return

                    batch.update(docRef, { timestamp: now - 1000 * 60 * 60 * 24 * 60 + index})
                })
            })
        })

        batch.commit()
            .then(res => console.log(res))
            .catch(err => console.log(err))

        // getContactAssociatedMedia('ZApLaeTxLzPO')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
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