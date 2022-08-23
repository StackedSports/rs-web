import { useEffect, useState } from 'react'

import SettingsPage from './SettingsPage'
import ContactsTagsTable from 'UI/Tables/ContactsTags/ContactsTagsTable'
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'

import { useTagsWithContacts } from 'Api/ReactQuery'

const ContactsTagsSettingsPage = (props) => {
    const tagsWithContacts = useTagsWithContacts()
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [tagToEdit, SetTagToEdit] = useState()

    /*     useEffect(() => {
            if (!tagsWithContacts.items)
                return
    
            console.log(tagsWithContacts.items)
        }, [tagsWithContacts.items]) */

    const onTopActionClick = (e) => {
        /* SetTagToEdit(null)
        setOpenEditDialog(true) */
    }

    const onRowClick = (tag) => {
        SetTagToEdit(tag)
        setOpenEditDialog(true)
    }

    const onSusccess = () => {
        tagsWithContacts.refetch()
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
                onRowClick={onRowClick}
            />
            <TagDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                tag={tagToEdit}
                onSusccess={onSusccess}
                title={tagToEdit ? "Edit Tag Name" : "Create new Tag"}
            />
        </SettingsPage>
    )
}
export default ContactsTagsSettingsPage