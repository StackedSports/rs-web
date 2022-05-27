import { useState, useEffect, useContext } from 'react'

import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import BoardsTable from 'UI/Tables/Boards/BoardsTable'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { usePlaceholders, useBoards, useMedias } from 'Api/Hooks'

import useArray from 'Hooks/ArrayHooks';
import { AppContext } from 'Context/AppProvider';


import { findById } from 'utils/Helper'
import { FaBullseye } from 'react-icons/fa';

const tabs = [
    { id: 0, label: 'Media' },
    { id: 1, label: 'Placeholders' }
]

export default function MediaSelectDialog(props) {
    const app = useContext(AppContext)
    const placeholders = usePlaceholders(1, 24)
    const [placeholderSelectedId, setPlaceholderSelectedId] = useState('')
    // console.log(paginationConfig(1, 25))
    const media = useMedias(1, 24)
    const [mediaSelectedId, setMediaSelectedId] = useState('')
    // console.log(media)
    // console.log(mediaPagination)
    // console.log(placeholders)
    const [selectionLabel, setSelectionLabel] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedType, setSelectedType] = useState('')
    const [disableOnConfirmSelection, setDisableOnConfirmSelection] = useState(false)

    useEffect(() => {
        if (mediaSelectedId === props.removedItem) {
            setMediaSelectedId('')
            setSelectionLabel('')
        } else if (placeholderSelectedId === props.removedItem) {
            setPlaceholderSelectedId('')
            setSelectionLabel('')
        }

    }, [props.removedItem])

    const onConfirmSelection = (e) => {
        console.log('on confirm selection')
        props.onSelected(Object.assign({}, selectedItem), selectedType)
    }

    const onMediaSelectionChange = (selection) => {
        let selectedId = selection[0]
        // console.log(selection)
        setPlaceholderSelectedId('')
        setMediaSelectedId(selectedId)
        setSelectedType('media')
        setSelectionLabel('Selected: Media')

        let selected = findById(selectedId, media.items)
        console.log(selected)
        if (props.uniqueSelection && selection.length > 1) {
            app.alert.setWarning("It is not possible to select more than one media.")
            setDisableOnConfirmSelection(true)
        } else {
            setDisableOnConfirmSelection(false)
            setSelectedItem(selected)
        }
    }

    const onPlaceholderSelectionChange = (selection) => {
        let selectedId = selection[0]

        setPlaceholderSelectedId(selectedId)
        setMediaSelectedId('')
        setSelectedType('placeholder')
        setSelectionLabel('Selected: Placeholder')

        let selected = findById(selectedId, placeholders.items)
        console.log(selected)
        setSelectedItem(selected)
    }

    const onSearch = (search, tabIndex) => {
        // console.log(`${search} ${tabIndex}`)
        if (tabIndex === 0)
            media.filter({ name: search })
        else
            placeholders.filter({ name: search })
    }

    const onClearSearch = (tabIndex) => {
        //console.log(tabIndex)

        if (tabIndex === 0)
            media.clearFilter()
        else
            placeholders.clearFilter()
    }

    return (
        <SelectDialogTab
            tabs={tabs}
            tabsMarginLeft={18}
            selectionLabel={selectionLabel}
            //   loading={media.loading}
            open={props.open}
            onConfirmSelection={onConfirmSelection}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            onClose={props.onClose}
            disableOnConfirmSelection={disableOnConfirmSelection}
        >
            <TabPanel value={0} index={0}>
                <MediaTable mini
                    items={media.items}
                    loading={media.loading}
                    pagination={media.pagination}
                    view={'grid'}
                    type="media"
                    onSelectionChange={onMediaSelectionChange}
                    lg={3}
                    xl={3}
                />
            </TabPanel>
            <TabPanel value={1} index={1}>
                <MediaTable mini
                    items={placeholders.items}
                    loading={placeholders.loading}
                    pagination={placeholders.pagination}
                    view={'grid'}
                    type="placeholder"
                    onSelectionChange={onPlaceholderSelectionChange}
                    lg={3}
                    xl={3}
                />
            </TabPanel>
        </SelectDialogTab>
    )
}