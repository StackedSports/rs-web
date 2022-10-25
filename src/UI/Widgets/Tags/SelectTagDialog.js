import { useEffect, useState, useContext } from 'react'

import { Stack, Typography, Box } from '@mui/material'

import BaseDialog from 'UI/Widgets/Dialogs/BaseDialog'
import SearchBar from 'UI/Widgets/SearchBar'
import TagsTable from 'UI/Tables/Tags/TagsTable'
import TagsList from 'UI/Widgets/Tags/TagsList'
import RenderIf from '../RenderIf'

import { AppContext } from 'Context/AppProvider'
import { useTags } from 'Api/ReactQuery';
import Button from '../Buttons/Button'

/**
 * 
 * @param {Function} onConfirm  - Callback to be called when the user confirms the selection, parameter selection ids 
 * @param {Function} onClose   - Callback to be called when the user cancels the selection
 * @param {boolean} isAddTag - can add new tags if not present in the list, new selected tags will be added with id = new-{name}
 * @returns 
 */
const SelectTagDialog = (props) => {
    const app = useContext(AppContext)
    const tags = useTags()

    const [tagsTable, setTagsTable] = useState(tags.items || [])
    const [selectedTags, setSelectedTags] = useState([])
    const [search, setSearch] = useState('')
    const [filterModel, setFilterModel] = useState();
    useEffect(() => {
        if (!tags.items)
            return
        setTagsTable(tags.items)
    }, [tags.items])

    useEffect(() => {
        if (!filterModel) {
            setSearch('')
            return
        }
        setSearch(filterModel?.items[0]?.value)
    }, [filterModel])

    useEffect(() => {
        if (props.open)
            setSelectedTags([])
    }, [props.open])


    const onSelectedTagsChange = (selection) => {
        setSelectedTags(selection)
    }

    const onRemoveTag = (tag, index) => {
        setSelectedTags(oldSelectedTags => oldSelectedTags.filter(item => item != tag.id))
    }

    const onTagSearch = (input) => {
        setSearch(input)
        setFilterModel({
            items: [
                {
                    "columnField": "name",
                    "operatorValue": "contains",
                    "value": input,
                },
            ],
        })
    }

    const onConfirm = () => {
        if (selectedTags.length === 0) {
            app.alert.setWarning('No tags selected')
            return
        }
        props.onConfirm(selectedTags)
    }

    const onClose = () => {
        setSelectedTags([])
        setSearch('')
        setFilterModel({ items: [] })
        props.onClose()
    }

    const onCreateTag = () => {
        const newTag = { id: `new-${search}`, name: search }
        setTagsTable(currentTags => [...currentTags, newTag])
        setSelectedTags(currentTags => [...currentTags, newTag.id])
    }

    const NoRowsOverlay = () => {
        return (
            <Stack alignItems='center' justifyContent='center' height='100%'>
                <Typography variant="h6" component="h3" gutterBottom>
                    No tags found. {props.isAddTag && 'Would you like to create a new one?'}
                </Typography>
                <RenderIf condition={props.isAddTag}>
                    <Typography variant="h6" textAlign='left' component="h3" fontWeight='bold' gutterBottom>
                        {search}
                    </Typography>
                    <Button onClick={onCreateTag} name='Create Tag' variant='contained' sx={{ zIndex: 10 }} />
                </RenderIf>
            </Stack>
        )
    }

    const NoResultsOverlay = () => {
        return (
            <Stack alignItems='center' justifyContent='center' height='100%' spacing={2}>
                <Typography variant="h6" component="h3" gutterBottom>
                    No tags found. {props.isAddTag && 'Would you like to create a new one?'}
                </Typography>
                <RenderIf condition={props.isAddTag}>
                    <Button
                        onClick={onCreateTag}
                        name={`Create Tag "${search}"`}
                        variant='contained'
                        sx={{ zIndex: 10 }}
                    />
                </RenderIf>
            </Stack>
        )
    }

    return (
        <BaseDialog
            open={props.open}
            onConfirm={onConfirm}
            onClose={onClose}
            confirmLabel={props.confirmLabel}
            cancelLabel={props.cancelLabel}
            actionLoading={props.actionLoading}
        >
            <Stack
                direction="row"
                flex={1}
                alignItems="center"
                sx={{ marginBottom: selectedTags.length > 0 ? 1 : 2 }}
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
                    value={search}
                    onChange={onTagSearch}
                />
            </Stack>

            <TagsList
                // style={{ marginBottom: 5 }}
                tags={tagsTable?.filter(tag => selectedTags.some(selectedId => selectedId == tag.id))}
                onRemoveTag={onRemoveTag}
            />
            <TagsTable
                mini
                tags={tagsTable}
                selection={selectedTags}
                onSelectionChange={onSelectedTagsChange}
                loading={tags.loading}
                onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                filterModel={filterModel}
                checkboxSelection
                components={{
                    NoResultsOverlay: NoResultsOverlay,
                    NoRowsOverlay: NoRowsOverlay,
                }}
            />
        </BaseDialog>
    )
}

export default SelectTagDialog