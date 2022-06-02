import { useState, useEffect } from 'react'

import SettingsPage from './SettingsPage'

import MediaTagsTable from 'UI/Tables/MediaTags/MediaTagsTable'

//import { useTagsWithMedia } from 'Api/Hooks'
import { useTagsWithMedia } from 'Api/ReactQuery'

const MediaTagsSettingsPage = () => {
  const tagsWithMedia = useTagsWithMedia()

  const onTopActionClick = (e) => {
    console.log('top action click')
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
      />
    </SettingsPage>
  )
}

export default MediaTagsSettingsPage