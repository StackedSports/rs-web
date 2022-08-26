import { useState, useEffect, useContext } from 'react'


import SettingsPage from './SettingsPage'
import MediaTagsTable from 'UI/Tables/MediaTags/MediaTagsTable'

//import { useTagsWithMedia } from 'Api/Hooks'
import { useTagsWithMedia } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'

const MediaTagsSettingsPage = () => {
  const { isAdmin } = useContext(AuthContext)
  const tagsWithMedia = useTagsWithMedia()

  const onTopActionClick = (e) => {
    console.log('top action click')
  }

  return (
    <SettingsPage
      title='Media Tags'
      topActionName={false && '+ New Media Tag'}
      onTopActionClick={onTopActionClick}
    >
      <MediaTagsTable
        items={tagsWithMedia.items}
        loading={tagsWithMedia.loading}
        checkboxSelection={false}
      />
    </SettingsPage>
  )
}

export default MediaTagsSettingsPage