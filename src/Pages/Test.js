import { useEffect} from 'react'

import { useUser, useRanks, useContacts, useTags, useContact } from 'Api/Hooks'
import { getStats, getBoards, getBoard, filterContacts, archiveContact, getContact, getFilters } from 'Api/Endpoints'

import useArray from 'Hooks/ArrayHooks'

import MainLayout from 'UI/Layouts/MainLayout'
import MessageInput from 'UI/Forms/Inputs/MessageInput'
import { updateContact } from 'ApiHelper'

const Test = () => {
    // const user = useUser()

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

    }, [])

    // useEffect(() => {
    //     if(contact) {
    //         //console.log(contact)
    //     }
    // }, [contact])

    const onTopActionClick = (e) => {
        console.log('top action click')

        filterContacts(1, 10, { search: 'abxc__'})
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })

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
        </MainLayout>
    )
}

export default Test