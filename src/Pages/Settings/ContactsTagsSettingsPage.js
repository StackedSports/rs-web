import { useEffect, useContext } from 'react'

import SettingsPage from './SettingsPage'

import ContactsTagsTable from 'UI/Tables/ContactsTags/ContactsTagsTable'

import { useTagsWithContacts } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'

const ContactsTagsSettingsPage = (props) => {
    const { isAdmin } = useContext(AuthContext)
    const tagsWithContacts = useTagsWithContacts()
    // row position selected to edit

    /*     useEffect(() => {
            if (!tagsWithContacts.items)
                return
    
            console.log(tagsWithContacts.items)
        }, [tagsWithContacts.items]) */

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Contacts Tags'
            topActionName={false && '+ New Contact Tag'}
            onTopActionClick={onTopActionClick}
        >
            <ContactsTagsTable
                items={tagsWithContacts.items}
                loading={tagsWithContacts.loading}
                checkboxSelection={isAdmin}
            />
        </SettingsPage>
    )
}
export default ContactsTagsSettingsPage