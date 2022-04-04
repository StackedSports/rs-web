import { useState, useEffect, useRef } from 'react'

import { useContacts } from 'Api/Hooks'

import MainLayout from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'

export default function ContactsPage(props) {
    const contacts = useContacts()

    useEffect(() => {
        
    }, [])

    // console.log(contacts)

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    let filters = [
        { // Category
            id: '0',
            name: 'Boards',
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
          title='Contacts'
          topActionName='+ New Contact'
          onTopActionClick={onTopActionClick}
          filters={filters}
          onFilterSelected={onFilterSelected}
        >
            <ContactsTable
              contacts={contacts.items}
              pagination={contacts.pagination}
              loading={contacts.loading}/>
        </MainLayout>
    )
}