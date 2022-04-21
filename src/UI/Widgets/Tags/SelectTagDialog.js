import { useEffect, useState } from 'react'

import { Stack, Typography } from '@mui/material'

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog'
import SearchBar from 'UI/Widgets/SearchBar'
import TagsTable from 'UI/Tables/Tags/TagsTable'
import TagsList from 'UI/Widgets/Tags/TagsList'

import { useTags2 } from 'Api/Hooks'

const SelectTagDialog = (props) => {
    const tags = useTags2()

    const [selectedTags, setSelectedTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])

    useEffect(() => {
        if (!tags.items)
            return

        // console.log(tags.items)
    }, [tags.items])

    // useEffect(() => {
    //     if(!contact)
    //         return

    //     console.log(contact) 
    // }, [contact])

    const onSelectedTagsChange = (selection) => {
        setSelectedTags(selection)

        let count = selection.length
        let tmp = []

        tags.items.every(tag => {
            selection.every(selectedId => {
                if (tag.id == selectedId) {
                    tmp.push(tag)
                    count--
                    return false
                }

                return true
            })

            if (count === 0)
                return false

            return true
        })

        setTagsSelected(tmp)
    }

    const onRemoveTag = (tag, index) => {
        setSelectedTags(oldSelectedTags => oldSelectedTags.filter(item => item != tag.id))
        setTagsSelected(oldTagsSelected => oldTagsSelected.filter(item => item.id != tag.id))
    }

    const onTagSearch = (input) => {
        console.log(input)

        tags.search(input)
    }

    const onClearSearch = () => {
        tags.clearSearch()
    }

    const onConfirm = () => {
        props.onConfirm(selectedTags)
    }

    return (
        <BaseDialog
            open={props.open}
            onConfirm={onConfirm}
            onClose={props.onClose}
            // title={props.title || 'Select Tag'}
        >
            <Stack 
              direction="row" 
              flex={1} 
              alignItems="center"
              sx={{ marginBottom: tagsSelected.length > 0 ? 1 : 2 }}
            >
                <Stack flex={1}>
                    <Typography variant="h1" component="h3">
                        {props.title || 'Select Tags'}
                    </Typography>
                </Stack>

                <SearchBar
                  style={{
                    border: '1px solid #ddd'
                  }}
                  placeholder="Search Tags"
                  onSearch={onTagSearch}
                  onClear={onClearSearch}
                  searchOnChange
                />
            </Stack>
            
            <TagsList
                // style={{ marginBottom: 5 }}
                tags={tagsSelected}
                onRemoveTag={onRemoveTag}
            />
            <TagsTable
                mini
                tags={tags.items}
                selection={selectedTags}
                onSelectionChange={onSelectedTagsChange}
                loading={tags.loading}
            />
        </BaseDialog>
    )
}

export default SelectTagDialog