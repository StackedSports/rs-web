import { useState, useEffect, useMemo } from 'react'
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'



import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import { useTags, useTeamMembers } from 'Api/Hooks'
import { getMediaTypes } from 'Api/Endpoints'
import { getFullName } from 'utils/Parser'

export const MediaPage = (props) => {

    const tags = useTags()
    const teamMembers = useTeamMembers()

    // console.log(teamMembers.items)

    const [mediaTypes, setMediaTypes] = useState([])
    const [owners, setOwners] = useState([])

    const [showPanelFilters, setShowPanelFilters] = useState(false)

    const [selectedFilters, setSelectedFilters] = useState({})

    useEffect(() => {
        getMediaTypes().then(res => {
            setMediaTypes(res[0].map(item => ({
                id: item.key,
                name: item.type
            })))
        })
    }, [])

    useEffect(() => {
        if (teamMembers.items?.length > 0)
            setOwners(teamMembers.items.map(item => ({
                id: item.id,
                name: getFullName(item)
            })))
    }, [teamMembers.items])

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
            type: 'dropdown',
            options: [
                { name: 'Send in Message', onClick: () => { console.log("clicked") } },
                { name: 'Download', onClick: () => { console.log("clicked") } },
                { name: 'Archive Media', onClick: () => { console.log("clicked") } },
                { name: 'Untag', onClick: () => { console.log("clicked") } },
            ]
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
            isUnique: true,
        },
        "distributed": {
            label: 'Distributed',
            options: [],
        },
        "owner": {
            label: 'Owner',
            options: owners,
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
        props.filter(filter)
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