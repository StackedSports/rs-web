import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import ContactsTagsTable from 'UI/Tables/ContactsTags/ContactsTagsTable'

import { useTagsWithContacts } from 'Api/Hooks'

const ContactsTagsSettingsPage = (props) => {
    const tagsWithContacts = useTagsWithContacts()

    useEffect(() => {
        if (!tagsWithContacts.items)
            return

        console.log(tagsWithContacts.items)
    }, [tagsWithContacts.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Contacts Tags'
            topActionName='+ New Contact Tag'
            onTopActionClick={onTopActionClick}
        >
            <ContactsTagsTable
                items={tagsWithContacts.items}
                loading={tagsWithContacts.loading}
            />
        </SettingsPage>
    )
}
export default ContactsTagsSettingsPage