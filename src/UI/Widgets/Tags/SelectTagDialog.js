import { useEffect, useState } from 'react'

import {
    Grid,
    Dialog,
} from "@material-ui/core"


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
            title={props.title || 'Select Tag'}

        >
            {/* <img 
            //   src={user.team.org.logo.original}
              src="https://stakdsocial.s3.us-east-2.amazonaws.com/5wibzn5fjffdka74d6frm2o53gus?response-content-disposition=inline%3B%20filename%3D%22test_account.png%22%3B%20filename%2A%3DUTF-8%27%27test_account.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220331%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220331T181333Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c3b504cbe0fa79df9f9dad60bd44f3ebb8877202a6c3fa24907d0b145de33935"
            /> */}
            <SearchBar
                style={{
                    marginBottom: tagsSelected.length > 0 ? 5 : 15,
                    border: '1px solid #ddd'
                }}
                placeholder="Search Tags"
                onSearch={onTagSearch}
                onClear={onClearSearch}
                searchOnChange
            />
            <TagsList
                style={{ marginBottom: 5 }}
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