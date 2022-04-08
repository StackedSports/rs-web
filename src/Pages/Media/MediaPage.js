import { useState, useMemo, useEffect, useRef } from 'react'
import { GridView, AutoFixHigh, Tune, LocalOfferOutlined, KeyboardArrowDown } from '@mui/icons-material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'


import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

/**
 * TODO: delete this
 * 
 * Mudanças: MediaTable, MediaTableConfig, Decoupling of MediaView,
 * set paginated media to 5 items per page 
 * 
 */

export const MediaPage = () => {
    // const media = useMedia(1, 5)
    // const placeholders = usePlaceholders(1, 5)
    // const tags = useTags()

    // // console.log("placeholders", placeholders)

    // const [mediaTypes, setMediaTypes] = useState([])


    // useEffect(() => {
    //     getMediaTypes().then(res => {
    //         setMediaTypes(res[0].map(item => ({
    //             id: item.key,
    //             name: item.type
    //         })))
    //     })
    // }, [])

    const [viewGrid, setViewGrid] = useState(true)
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
            icon: viewGrid ? GridView : FormatListBulletedIcon,
            onClick: () => setViewGrid(!viewGrid)
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

            {props.children}

        </MainLayout>
    )
}

export default MediaPage