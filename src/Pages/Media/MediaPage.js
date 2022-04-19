import { useState, useEffect, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import { mediaRoutes } from 'Routes/Routes'
import { useTags, useTeamMembers } from 'Api/Hooks'
import { getMediaTypes } from 'Api/Endpoints'
import { getFullName } from 'utils/Parser'

export const MediaPage = (props) => {

    const tags = useTags()
    const teamMembers = useTeamMembers()

    const [mediaTypes, setMediaTypes] = useState([])
    const [owners, setOwners] = useState([])
    
    useEffect(() => {
        getMediaTypes().then(res => {
            console.log(res)
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
        {
            id: 0,
            name: 'My Media',
            items: [ ...owners],   
        },
        {
            id: 1,
            name: 'Recent',
            path: mediaRoutes.media + '?fileType=recent',
        },
        {
            id: 2,
            name: 'Images',
            path: mediaRoutes.media + '?fileType=image',
        },
        {
            id: 3,
            name: 'Videos',
            path: mediaRoutes.media + '?fileType=video',
        },
        {
            id: 4,
            name: 'Gifs',
            path: mediaRoutes.media + '?fileType=gif',
        },
        {
            id: 5,
            name: 'Personalized Media',
            path: mediaRoutes.media + '?personalized',
        },
        {
            id: 6,
            name: 'Placeholders',
            path: mediaRoutes.placeholders,
        }
    ]

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

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
        props.filter(filter)
    }


    return (
        <MainLayout
            title={props.title || 'Media'}
            topActionName={props.topActionName || '+ Add Media'}
            onTopActionClick={onTopActionClick}
            filters={filters}
            onFilterSelected={onFilterSelected}
            actions={props.actions}
            loading={teamMembers.loading}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                setFilter: props.setFilter
            }}
        >
            <Divider />

            {/* {() => cloneElement(props.children, { viewGrid })} */}
            {props.children}

        </MainLayout>
    )
}

export default MediaPage