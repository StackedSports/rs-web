import { useEffect, useContext } from 'react'

import SettingsPage from './SettingsPage'

import MessageTagsTable from 'UI/Tables/MessageTags/MessageTagsTable'

import { useTagsWithMessage } from 'Api/ReactQuery'
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'


const MessageTagsSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const tagsWithMessage = useTagsWithMessage()
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [tagToEdit, SetTagToEdit] = useState()

    /*     useEffect(() => {
            if (!tagsWithMessage.items)
                return
    
            console.log(tagsWithMessage.items)
        }, [tagsWithMessage.items]) */

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onRowClick = (tag) => {
        SetTagToEdit(tag)
        setOpenEditDialog(true)
    }

    const onSusccess = () => {
        tagsWithMessage.refetch()
    }

    return (
        <SettingsPage
            title='Message Tags'
            topActionName={false && '+ New Message Tag'}
            onTopActionClick={onTopActionClick}
        >
            <MessageTagsTable
                items={tagsWithMessage.items}
                loading={tagsWithMessage.loading}
                checkboxSelection={isAdmin}
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

export default MessageTagsSettingsPage