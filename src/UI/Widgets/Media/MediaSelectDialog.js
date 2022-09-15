import { useState, useEffect, useContext, useMemo } from 'react'

import TabPanel from '@mui/lab/TabPanel';

import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { useMedias, useMediaTypes, usePlaceholders, useTagsWithMedia, useTeamMembers } from "Api/ReactQuery"

import { AppContext } from 'Context/AppProvider';
import PanelFilters from '../PanelFilters';
import { getFullName } from 'utils/Parser';


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

    //filters
    const tags = useTagsWithMedia()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()

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
        if (tabIndex === '0')
            media.filter({ name: search })
        else
            placeholders.filter({ name: search })
    }

    const onClearSearch = (tabIndex) => {
        if (tabIndex === '0')
            media.clearFilter()
        else
            placeholders.clearFilter()
    }

    const panelFiltersData = useMemo(() =>
    ({
        "type": {
            label: 'File Type',
            options: mediaTypes.items,
            isUnique: true,
        },
        "owner_id": {
            label: 'Owner',
            options: teamMembers.items,
            optionsLabel: (item) => getFullName(item),
            onSearch: (search) => teamMembers.search(search),
        },
        "created_at": {
            label: 'Date Uploaded',
            type: 'date',
            optionsLabel: (dates) => dates.join(' - '),
            disableFuture: true,
            isUnique: true
        },
        "tag_id": {
            label: 'Tag',
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
    }), [tags.items, mediaTypes.items, teamMembers.items])

    const onPanelFiltersChange = (filters) => {
        console.log(filters)
        const parserFilters = {}
        if (filters.type)
            parserFilters.type = filters.type.map(item => item.id)[0]
        if (filters.owner_id)
            parserFilters.owner_id = filters.owner_id.map(item => item.id)
        if (filters.created_at)
            parserFilters.created_at = filters.created_at[0].value.map(date => new Date(date).toISOString())
        if (filters.tag_id)
            parserFilters.tag_id = filters.tag_id.map(item => item.id)
        console.log(parserFilters)
        media.filter(parserFilters)

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
            <TabPanel value={'0'} index={0} sx={{ pt: 0 }}>
                <PanelFilters open={true} filters={panelFiltersData} onFilterChange={onPanelFiltersChange} />
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