import { useState, useEffect, useContext, useMemo } from 'react'
import { useTagMutation, useTagsWithMedia } from 'Api/ReactQuery'

import SettingsPage from './SettingsPage'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import MediaTagsTable from 'UI/Tables/MediaTags/MediaTagsTable'
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'
import { AuthContext } from 'Context/Auth/AuthProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const MediaTagsSettingsPage = () => {
  const { isAdmin } = useContext(AuthContext)
  const confirmDialog = useContext(ConfirmDialogContext)
  const tagsWithMedia = useTagsWithMedia()
  const { removeAsync: deleteTag } = useTagMutation()

  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [tagToEdit, setTagToEdit] = useState(null)
  // selection from checkbox
  const [selectedTagsIds, setSelectedTagsIds] = useState([])

  const onTopActionClick = (e) => {
    setTagToEdit(null)
    setOpenEditDialog(true)
  }

  const onSelectionChange = (e) => {
    setSelectedTagsIds(e)
  }

  const onRowClick = (e) => {
    if (!isAdmin || true) return
    setTagToEdit(e)
    setOpenEditDialog(true)
  }

  const onSusccess = () => {
    setTagToEdit(null)
    tagsWithMedia.refetch()
  }

  const onDeleteAction = () => {
    const title = `Delete ${selectedTagsIds.length > 1 ? 'Tags' : 'Tag'}?`
    confirmDialog.show(title, "This action can not be undone. Do you wish to continue? ", () => {
      Promise.all(selectedTagsIds.map(id => deleteTag(id)))
        .then(() => {
          tags.refetch()
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
      title='Media Tags'
      topActionName={false && '+ New Media Tag'}
      onTopActionClick={onTopActionClick}
      actions={actions}
    >
      <MediaTagsTable
        tags={tagsWithMedia.items}
        loading={tagsWithMedia.loading}
        onRowClick={onRowClick}
        onSelectionChange={onSelectionChange}
        selection={selectedTagsIds}
        checkboxSelection={false} // should be isAdmin
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

export default MediaTagsSettingsPage