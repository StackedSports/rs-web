import { useState, useEffect } from 'react'

import SettingsPage from './SettingsPage'
import TagsTable from 'UI/Tables/Tags/TagsTable'

import { useTags2, useTagsWithContacts, useTagsWithMedia } from 'Api/Hooks'

const TagSettingsPage = () => {
    const tags = useTags2()
    const tagsWithContacts = useTagsWithContacts()
    const tagsWithMedia = useTagsWithMedia()

    const [selectedTags, setSelectedTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])

    useEffect(() => {
        if(!tags.items)
            return

        console.log(tags.items)
    }, [tags.items])

    useEffect(() => {
        if(!tagsWithContacts.items)
            return

        console.log(tagsWithContacts.items)
    }, [tagsWithContacts.items])

    useEffect(() => {
        if(!tagsWithMedia.items)
            return

        console.log(tagsWithMedia.items)
    }, [tagsWithMedia.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
          title='Tags'
          topActionName='+ New Tag'
          onTopActionClick={onTopActionClick}
        >

            <TagsTable
              tags={tags.items}
            //   selection={selectedTags}
            //   onSelectionChange={onSelectedTagsChange}
              loading={tags.loading}
            />
        </SettingsPage>
    )
}

export default TagSettingsPage