import { useState, useEffect, useContext } from 'react'

import { addDoc, setDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, query, where } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'

import { db, functions } from 'Api/Firebase'

import { useUser, useRanks, useContacts, useTags, useContact } from 'Api/Hooks'
import { getStats, getBoards, getBoard, filterContacts, archiveContact, getContact, getFilters } from 'Api/Endpoints'

import { AuthContext } from 'Context/Auth/AuthProvider'


import useArray from 'Hooks/ArrayHooks'

import MainLayout from 'UI/Layouts/MainLayout'
import MessageInput from 'UI/Forms/Inputs/MessageInput'
import { updateContact } from 'ApiHelper'

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

    useEffect(() => {
        // getContact('wPDWyTrRvApL')
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // const q = query(collection(db, 'orgs', 'YlGkWYFKzGxP', 'tweet-ranking', '1548323821777653763', 'tweet-likes'))
        // const unsub = onSnapshot(q, (snapshot) => {
        //     let likers = []

        //     snapshot.forEach(doc => {
        //         likers.push(doc.data())
        //     })

        //     console.log('likes = ', likers)
        // })

        // const q2 = query(collection(db, 'orgs', 'YlGkWYFKzGxP', 'tweet-ranking', '1548323821777653763', 'tweet-retweets'))
        // const unsub2 = onSnapshot(q2, (snapshot) => {
        //     let retweets = []

        //     snapshot.forEach(doc => {
        //         retweets.push(doc.data())
        //     })

        //     console.log('retweets = ', retweets)
        // })

        // return () => {
        //     unsub()
        //     unsub2()
        // }

        // /test-tweet-token-res/${tweetId}/tweet-${action}

        // const q = query(collection(db, 'test-tweet-token-res', testTweetId, 'tweet-likes'))
        // const unsub = onSnapshot(q, (snapshot) => {
        //     let likers = []
        //     let map = new Map()

        //     snapshot.forEach(doc => {
        //         const user = doc.data()
        //         map.set(user.username, map.get(user.username) + 1)
        //         likers.push(doc.data())
        //     })

        //     console.log('likes = ', likers)
        //     console.log('map size = ', map.size)
        // })

        // return () => unsub()

        // const unsub = onSnapshot(doc(db, 'test-task', 'test'), (snapshot) => {
        //     console.log('task test: ', snapshot.data())
        // })

        // return () => unsub()

        const q = query(collection(db, 'test-task'))
        const unsubq = onSnapshot(q, (snapshot) => {
            let tasks = []

            snapshot.forEach(doc => {
                tasks.push(doc.data())
            })

            console.log('tasks = ', tasks)
            setTasks(tasks)
        })

        return () => unsubq()
    }, [])

    // useEffect(() => {
    //     if(contact) {
    //         //console.log(contact)
    //     }
    // }, [contact])

    const onTopActionClick = (e) => {
        console.log('top action click')


        // const ref = doc(db, 'test-tweet-token', testTweetId)
        // setDoc(ref, { 
        //         tweetId: testTweetId,
        //         userRSToken: user.token,
        //         totalLikes: 662
        //     })
        //     .then(() => {
        //         console.log('request made')
        //     })
        //     .catch(err => console.log(err))

        const id = `test-${tasks.length}`

        setDoc(doc(db, 'test-task', id), {
            id,
            count: 0
        })

        // filterContacts(1, 10, { search: 'abxc__'})
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // if(contact) {
            // updateContact(contact.id, { graduation_year: 2010})
            //     .then(res => {
            //         console.log(res)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
        // }
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