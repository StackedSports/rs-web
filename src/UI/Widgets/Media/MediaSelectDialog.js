import { useState, useEffect } from 'react'

import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import BoardsTable from 'UI/Tables/Boards/BoardsTable'
import MediaGrid from 'UI/Tables/Media/MediaGrid'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { usePlaceholders, useBoards, useMedias } from 'Api/Hooks'

import useArray from 'Hooks/ArrayHooks';

import { findById } from 'utils/Helper'

const tabs = [
    { id: 0, label: 'Media' },
    { id: 1, label: 'Placeholders' }
]

export default function MediaSelectDialog(props) {
    const placeholders = usePlaceholders(1, 25)
    const [placeholderSelectedId, setPlaceholderSelectedId] = useState('')
    // console.log(paginationConfig(1, 25))
    const media = useMedias(1, 25)
    const [mediaSelectedId, setMediaSelectedId] = useState('')
    // console.log(media)
    // console.log(mediaPagination)
    // console.log(placeholders)
    const [selectionLabel, setSelectionLabel] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedType, setSelectedType] = useState('')

    useEffect(() => {
        if(mediaSelectedId === props.removedItem) {
            setMediaSelectedId('')
            setSelectionLabel('')
        } else if(placeholderSelectedId === props.removedItem) {
            setPlaceholderSelectedId('')
            setSelectionLabel('')
        }

    }, [props.removedItem])
    
    const onConfirmSelection = (e) => {
        console.log('on confirm selection')
        props.onSelected(Object.assign({}, selectedItem), selectedType)
    }

    const onMediaSelectionChange = (selectedId) => {
        // console.log(selection)
        setPlaceholderSelectedId('')
        setMediaSelectedId(selectedId)
        setSelectedType('media')
        setSelectionLabel('Selected: Media')

        let selected = findById(selectedId, media.items)
        console.log(selected)
        setSelectedItem(selected)
    }
    
    const onPlaceholderSelectionChange = (selectedId) => {
        setPlaceholderSelectedId(selectedId)
        setMediaSelectedId('')
        setSelectedType('placeholder')
        setSelectionLabel('Selected: Placeholder')

        let selected = findById(selectedId, placeholders.items)
        console.log(selected)
        setSelectedItem(selected)
    }

    return (
        <SelectDialogTab
          tabs={tabs}
          tabsMarginLeft={18}
          selectionLabel={selectionLabel}
          open={props.open}
          onConfirmSelection={onConfirmSelection}
          onClose={props.onClose}
        >
            <TabPanel value={0} index={0}>
                {/* <MediaGrid
                  media={media.items}
                  pagination={media.pagination}
                  loading={media.loading}
                  selected={mediaSelectedId}
                  onSelectionChange={onMediaSelectionChange}/> */}

                <MediaTable
                  items={media.items}
                  loading={media.loading}
                  view={'grid'}
                  type="media"
                  disablePagination
                />
            </TabPanel>
            <TabPanel value={1} index={1}>
                <MediaGrid
                  type="placeholder"
                  media={placeholders.items}
                  pagination={placeholders.pagination}
                  loading={placeholders.loading}
                  selected={placeholderSelectedId}
                  onSelectionChange={onPlaceholderSelectionChange}/>
            </TabPanel>
        </SelectDialogTab>
    )    
}