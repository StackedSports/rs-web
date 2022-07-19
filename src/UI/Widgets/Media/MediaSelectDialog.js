import { useState, useEffect, useContext } from 'react'

import TabPanel from '@mui/lab/TabPanel';

import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { useMedias, usePlaceholders } from "Api/ReactQuery"

import { AppContext } from 'Context/AppProvider';


const tabs = [
    { id: '0', label: 'Media' },
    { id: '1', label: 'Placeholders' }
]

// _s is not a function

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
        //console.log('on confirm selection')
        props.onSelected(Object.assign({}, selectedItem), selectedType)
    }

    const onMediaSelectionChange = (selectionIds, selectionItems) => {
        let selectedId = selectionIds[0]
        // console.log(selection)
        setPlaceholderSelectedId('')
        setMediaSelectedId(selectedId)
        setSelectedType('media')
        setSelectionLabel('Selected: Media')

        if (props.uniqueSelection && selectionIds.length > 1) {
            app.alert.setWarning("It is not possible to select more than one media.")
            setDisableOnConfirmSelection(true)
        } else {
            setDisableOnConfirmSelection(false)
            setSelectedItem(selectionItems[0])
        }
    }

    const onPlaceholderSelectionChange = (selectionIds, selectionItems) => {
        let selectedId = selectionIds[0]

        setPlaceholderSelectedId(selectedId)
        setMediaSelectedId('')
        setSelectedType('placeholder')
        setSelectionLabel('Selected: Placeholder')

        if (props.uniqueSelection && selectionIds.length > 1) {
            app.alert.setWarning("It is not possible to select more than one media.")
            setDisableOnConfirmSelection(true)
        } else {
            setDisableOnConfirmSelection(false)
            setSelectedItem(selectionItems[0])
        }
    }

    const onSearch = (search, tabIndex) => {
        if (tabIndex === 0)
            media.filter({ name: search })
        else
            placeholders.filter({ name: search })
    }

    const onClearSearch = (tabIndex) => {
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
            <TabPanel value={'0'} index={0}>
                <MediaTable
                    mini
                    disableMultipleSelection={props.uniqueSelection}
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
            <TabPanel value={'1'} index={1}>
                <MediaTable
                    mini
                    disableMultipleSelection={props.uniqueSelection}
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