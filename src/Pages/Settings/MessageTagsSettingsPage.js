import { useEffect, useContext, useState, useMemo } from 'react'

import SettingsPage from './SettingsPage'
import MessageTagsTable from 'UI/Tables/MessageTags/MessageTagsTable'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'

import { useTagMutation, useTagsWithMessage } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const MessageTagsSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const tagsWithMessage = useTagsWithMessage()
    const { removeAsync: deleteTag } = useTagMutation()

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [tagToEdit, setTagToEdit] = useState(null)
    // selection from checkbox
    const [selectedTagsIds, setSelectedTagsIds] = useState([])

    /*     useEffect(() => {
            if (!tagsWithMessage.items)
                return
    
            console.log(tagsWithMessage.items)
        }, [tagsWithMessage.items]) */

    const onTopActionClick = (e) => {
        setTagToEdit(null)
        setOpenEditDialog(true)
    }

    const onSusccess = () => {
        setTagToEdit(null)
        tagsWithMessage.refetch()
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
                    tagsWithMessage.refetch()
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
            title='Message Tags'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <MessageTagsTable
                tags={tagsWithMessage.items}
                loading={tagsWithMessage.loading}
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

export default MessageTagsSettingsPage