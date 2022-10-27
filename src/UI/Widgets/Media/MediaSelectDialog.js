import { useState, useEffect, useContext, useMemo } from 'react'

import TabPanel from '@mui/lab/TabPanel';

import SelectDialogTab from 'UI/Widgets/Dialogs/SelectDialogTab'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { useMedias, useMediaTypes, usePlaceholders, useTagsWithMedia, useTeamMembers } from "Api/ReactQuery"

import { AppContext } from 'Context/AppProvider';
import PanelFilters from '../PanelFilters';
import { getFullName } from 'utils/Parser';

export default function MediaSelectDialog(props) {
    const app = useContext(AppContext)
    const placeholders = usePlaceholders(1, 24)
    const [placeholderSelectedId, setPlaceholderSelectedId] = useState('')
    const media = useMedias(1, 24)
    const [mediaSelectedId, setMediaSelectedId] = useState('')
    const [selectionLabel, setSelectionLabel] = useState('')
    const [disableOnConfirmSelection, setDisableOnConfirmSelection] = useState(false)
    const [selectedType, setSelectedType] = useState('')
    const [selectedItem, setSelectedItem] = useState()

    //filters
    const tags = useTagsWithMedia()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()

    const tabs = useMemo(() => {
        const tabs = [{ id: '0', label: 'Media' }, { id: '1', label: 'Placeholders' }]
        if (props.onlyMedias)
            tabs.splice(1)
        return tabs
    }, [props.onlyMedias])

    useEffect(() => {
        if (mediaSelectedId === props.removedItem) {
            setMediaSelectedId('')
            setSelectionLabel('')
        } else if (placeholderSelectedId === props.removedItem) {
            setPlaceholderSelectedId('')
            setSelectionLabel('')
        }

    }, [props.removedItem])

    const onConfirmSelection = () => {
        const selection = props.uniqueSelection ? Object.assign({}, selectedItem) : [...selectedItem]
        props.onSelected(selection, selectedType)
        setDisableOnConfirmSelection(false)
    }

    const onMediaSelectionChange = (selectionIds, selectionItems) => {
        setDisableOnConfirmSelection(false)
        setSelectedType('media')
        setSelectionLabel('Selected: Media')

        if (props.uniqueSelection && selectionIds.length > 0) {
            setSelectedItem(selectionItems[0])
        }
        else if (!props.uniqueSelection && selectionIds.length > 0) {
            if (props.limit && selectionIds.length > props.limit) {
                setSelectedItem(selectionItems.slice(0, 4))
                setDisableOnConfirmSelection(true)
                app.alert.setWarning(`It's limited to ${props.limit} media`)
            }
            else
                setSelectedItem(selectionItems)
        }
    }

    const onPlaceholderSelectionChange = (selectionIds, selectionItems) => {
        setDisableOnConfirmSelection(false)
        setSelectedType('placeholder')
        setSelectionLabel('Selected: Placeholder')

        if (props.uniqueSelection && selectionIds.length > 0) {
            setSelectedItem(selectionItems[0])
        } else if (!props.uniqueSelection && selectionIds.length > 0) {
            setDisableOnConfirmSelection(selectionItems)
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
        media.filter(parserFilters)
    }

    return (
        <SelectDialogTab
            tabs={tabs}
            tabsMarginLeft={18}
            selectionLabel={selectionLabel}
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
            {!props.onlyMedias && (
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
            )}
        </SelectDialogTab>
    )
}