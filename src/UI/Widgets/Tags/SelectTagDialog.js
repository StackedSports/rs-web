import { useEffect, useState, useContext } from 'react'

import { Stack, Typography, Box } from '@mui/material'

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog'
import SearchBar from 'UI/Widgets/SearchBar'
import TagsTable from 'UI/Tables/Tags/TagsTable'
import TagsList from 'UI/Widgets/Tags/TagsList'
import RenderIf from '../RenderIf'

import { AppContext } from 'Context/AppProvider'
import { useTags2 } from 'Api/Hooks'
import Button from '../Buttons/Button'

const SelectTagDialog = (props) => {
    const app = useContext(AppContext)
    const tags = useTags2()

    const [selectedTags, setSelectedTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [search, setSearch] = useState('')
    console.log(tagsSelected)

    useEffect(() => {
        if (!tags.items)
            return

        console.log(tags.items)
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
        setSearch(input)
        tags.search(input)
    }


    const onConfirm = () => {
        if (selectedTags.length === 0) {
            app.alert.setWarning('No tags selected')
            return
        }
        props.onConfirm(selectedTags)
        setSelectedTags([])
        setTagsSelected([])
    }

    const onCreateTag = () =>{
        const newTag = { id: `new-${search}`, name: search }
        setSelectedTags(currentTags => [...currentTags, newTag.id])
        setTagsSelected(currentTags => [...currentTags, newTag])
        setSearch('')
        tags.search('')
    }

    return (
        <BaseDialog
            open={props.open}
            onConfirm={onConfirm}
            onClose={props.onClose}
            // title={props.title || 'Select Tag'}
            confirmLabel={props.confirmLabel}
            cancelLabel={props.cancelLabel}
            actionLoading={props.actionLoading}
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
                  placeholder="Search or Create New"
                  //onSearch={onTagSearch}
                  //onClear={onClearSearch}
                  onChange = {onTagSearch}
                />
            </Stack>

            <TagsList
                // style={{ marginBottom: 5 }}
                tags={tagsSelected}
                onRemoveTag={onRemoveTag}
            />
            <RenderIf condition={tags.items?.length === 0}>
                <Box textAlign='center'>
                    <Typography variant="h6" component="h3" gutterBottom>
                        No tags found. Would you like to create a new one?
                    </Typography>
                    <Typography variant="h6" textAlign='left' component="h3" fontWeight='bold' gutterBottom>
                        {search}
                    </Typography>
                    <Button onClick={onCreateTag} name='Create Tag' variant='contained'/>
                </Box>
            </RenderIf>
            <RenderIf condition={tags.items?.length > 0}>
                <TagsTable
                  mini
                  tags={tags.items}
                  selection={selectedTags}
                  onSelectionChange={onSelectedTagsChange}
                  loading={tags.loading}
                />
            </RenderIf>
        </BaseDialog>
    )
}

export default SelectTagDialog