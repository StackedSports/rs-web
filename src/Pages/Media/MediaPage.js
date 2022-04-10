import { useState, useMemo } from 'react'
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'



import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import { useTags } from 'Api/Hooks'

export const MediaPage = (props) => {

    const tags = useTags()

    const [mediaTypes, setMediaTypes] = useState([])

    const [showPanelFilters, setShowPanelFilters] = useState(false)

    // const [selectedFilters, setSelectedFilters] = useState({})

    const filters = [
        { // Category
            id: '0',
            name: 'My Media',
            items: [
                // Filters
            ]
        },
    ]

    const mainActions = [
        {
            name: 'Change view',
            type: 'icon',
            icon: props.viewGrid ? GridView : FormatListBulleted,
            onClick: props.onSwitchView
        },
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
        },
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        },
    ]

    const panelFiltersData = useMemo(() =>
    ({
        "fileType": {
            label: 'File Type',
            options: mediaTypes,
        },
        "distributed": {
            label: 'Distributed',
            options: [],
        },
        "owner": {
            label: 'Owner',
            options: [],
        },
        "associatedTo": {
            label: 'Associated To',
            options: [],
        },
        "dateUploaded": {
            label: 'Date Uploaded',
            options: [],
        },
        "tag": {
            label: 'Tag',
            options: tags || [],
        },
    }), [tags, mediaTypes])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onPanelFilterChange = (filter) => {
        console.log('Filters selected', filter)
        setSelectedFilters(filter)
    }



    return (
        <MainLayout
            title={props.title || 'Media'}
            topActionName={props.topActionName || '+ Add Media'}
            onTopActionClick={onTopActionClick}
            filters={filters}
            actions={mainActions}
            propsPanelFilters={{
                open: showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange
            }}
        >
            <Divider />

            {/* {() => cloneElement(props.children, { viewGrid })} */}
            {props.children}

        </MainLayout>
    )
}

export default MediaPage