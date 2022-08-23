import { useState, useEffect } from 'react'
import { useTagsWithMedia } from 'Api/ReactQuery'

import SettingsPage from './SettingsPage'
import MediaTagsTable from 'UI/Tables/MediaTags/MediaTagsTable'
import { TagDialog } from 'UI/Widgets/Settings/TagDialog'

const MediaTagsSettingsPage = () => {
  const tagsWithMedia = useTagsWithMedia()

  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [tagToEdit, SetTagToEdit] = useState()

  const onTopActionClick = (e) => {
    console.log('top action click')
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
      title='Media Tags'
      topActionName='+ New Media Tag'
      onTopActionClick={onTopActionClick}
    >
      <MediaTagsTable
        items={tagsWithMedia.items}
        loading={tagsWithMedia.loading}
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

export default MediaTagsSettingsPage