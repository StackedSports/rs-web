import { useEffect, useState, useContext } from 'react'

import { Stack, Typography, Box } from '@mui/material'
import {
    DataGridPro,
    useGridApiRef,
    gridVisibleRowCountSelector
} from "@mui/x-data-grid-pro";

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
    const gridApiRef = useGridApiRef();

    const [selectedTags, setSelectedTags] = useState([])
    const [cacheSelectedTags, setCacheSelectedTags] = useState([])
    const [search, setSearch] = useState('')
    const [visibleRows, setVisibleRows] = useState()
    const [filterModel, setFilterModel] = useState();

console.log(visibleRows)
    useEffect(() => {
        if (!tags.items)
            return

        //console.log(tags.items)
    }, [tags.items])

    // useEffect(() => {
    //     if(!contact)
    //         return

    //     console.log(contact) 
    // }, [contact])

    const onSelectedTagsChange = (selection) => {
        setSelectedTags(selection)
    }

    const onRemoveTag = (tag, index) => {
        setSelectedTags(oldSelectedTags => oldSelectedTags.filter(item => item != tag.id))
        setCacheSelectedTags(oldTagsSelected => oldTagsSelected.filter(item => item.id != tag.id))
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
        setSelectedTags([])
        setCacheSelectedTags([])
    }

    const onClose = () => {
        setSelectedTags([])
        setCacheSelectedTags([])
        props.onClose()
    }

    const onCreateTag = () => {
        const newTag = { id: `new-${search}`, name: search }
        setSelectedTags(currentTags => [...currentTags, newTag.id])
        setCacheSelectedTags(currentTags => [...currentTags, newTag])
        setSearch('')
        tags.search('')
    }

    const CustomNoRowsOverlay = () => {
        return (
            <Box textAlign='center'>
                <Typography variant="h6" component="h3" gutterBottom>
                    No tags found. Would you like to create a new one?
                </Typography>
                <Typography variant="h6" textAlign='left' component="h3" fontWeight='bold' gutterBottom>
                    {search}
                </Typography>
                <Button onClick={onCreateTag} name='Create Tag' variant='contained' />
            </Box>
        )
    }


    return (
        <BaseDialog
            keepMounted
            open={props.open}
            onConfirm={onConfirm}
            onClose={onClose}
            // title={props.title || 'Select Tag'}
            confirmLabel={props.confirmLabel}
            cancelLabel={props.cancelLabel}
            actionLoading={props.actionLoading}
        >
            <Stack
                direction="row"
                flex={1}
                alignItems="center"
                sx={{ marginBottom: cacheSelectedTags.length > 0 ? 1 : 2 }}
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
                    onChange={onTagSearch}
                />
            </Stack>

            <TagsList
                // style={{ marginBottom: 5 }}
                tags={tags.items?.filter(tag => selectedTags.some(selectedId => selectedId == tag.id))}
                onRemoveTag={onRemoveTag}
            />
            <RenderIf condition={tags.items?.length === 0 || visibleRows === 0}>
                <Box textAlign='center'>
                    <Typography variant="h6" component="h3" gutterBottom>
                        No tags found. Would you like to create a new one?
                    </Typography>
                    <Typography variant="h6" textAlign='left' component="h3" fontWeight='bold' gutterBottom>
                        {search}
                    </Typography>
                    <Button onClick={onCreateTag} name='Create Tag' variant='contained' />
                </Box>
            </RenderIf>
            <RenderIf condition={tags.items?.length > 0 && (visibleRows > 0 || visibleRows === undefined)}>
                <TagsTable
                    apiRef={gridApiRef}
                    onStateChange={(state) => setVisibleRows(gridVisibleRowCountSelector(state))}
                    mini
                    tags={tags.items}
                    selection={selectedTags}
                    onSelectionChange={onSelectedTagsChange}
                    loading={tags.loading}
                    onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                    filterModel={filterModel}
                />
            </RenderIf>
        </BaseDialog>
    )
}

export default SelectTagDialog