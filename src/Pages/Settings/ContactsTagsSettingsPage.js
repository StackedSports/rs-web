import { useEffect, useContext, useState, useMemo } from 'react'

import SettingsPage from './SettingsPage'
import ContactsTagsTable from 'UI/Tables/ContactsTags/ContactsTagsTable'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'

import { useTagMutation, useTagsWithContacts } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const ContactsTagsSettingsPage = (props) => {
    const { isAdmin } = useContext(AuthContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const tagsWithContacts = useTagsWithContacts()
    const { removeAsync: deleteTag } = useTagMutation()

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [tagToEdit, setTagToEdit] = useState(null)
    // selection from checkbox
    const [selectedTagsIds, setSelectedTagsIds] = useState([])

    /*     useEffect(() => {
            if (!tags.items)
                return
    
            console.log(tags.items)
        }, [tags.items]) */

    const onTopActionClick = (e) => {
        setTagToEdit(null)
        setOpenEditDialog(true)
    }

    const onSusccess = () => {
        setTagToEdit(null)
        tagsWithContacts.refetch()
    }

    const onRowClick = (e) => {
        if (!isAdmin) return
        setTagToEdit(e)
        setOpenEditDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedTagsIds(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedTagsIds.length > 1 ? 'Tags' : 'Tag'}?`
        confirmDialog.show(title, "This action can not be undone. Do you wish to continue? ", () => {
            Promise.all(selectedTagsIds.map(id => deleteTag(id)))
                .then(() => {
                    tagsWithContacts.refetch()
                    setSelectedTagsIds([])
                }
                ).catch(err => {
                    console.log(err)
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedTagsIds.length > 0)
            return [
                {
                    name: 'Delete (' + selectedTagsIds.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedTagsIds])

    return (
        <SettingsPage
            title='Contacts Tags'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <ContactsTagsTable
                tags={tagsWithContacts.items}
                loading={tagsWithContacts.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
                selection={selectedTagsIds}
                checkboxSelection={isAdmin}
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