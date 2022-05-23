import { useState, useEffect, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'

import { mediaRoutes } from 'Routes/Routes'
import { useTags, useTeamMembers, useMediaTypes } from 'Api/Hooks'
import { getFullName } from 'utils/Parser'
import { Alert } from '@mui/material'

export const MediaPage = (props) => {
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()

    //Handle with setSelectedFilters from props
    useEffect(() => {
        if (props.replecaSelectPanelFilter) {
            const { type, value } = props.replecaSelectPanelFilter
            if (type === 'type') {
                if (!mediaTypes.loading)
                    setSelectedFilters({
                        "fileType": [{ ...mediaTypes.items.find(item => item.id == value) }],
                    })
            }
            if (type === 'owner') {
                if (!teamMembers.loading)
                    setSelectedFilters({
                        "owner": [{ ...teamMembers.items?.find(item => item.id == value) }],
                    })
            }
        }
    }, [props.replecaSelectPanelFilter, mediaTypes.loading, teamMembers.loading])

    const filtersOptions = useMemo(() => {
        let index = 0
        return [
            {
                id: index,
                name: 'My Media',
                items: teamMembers.items.map(item => ({ id: item.id, name: getFullName(item), path: `${mediaRoutes.filters.owner}/${item.id}` }))
            },
            ...mediaTypes.items.map(item => ({
                id: ++index,
                name: item.name,
                path: `${mediaRoutes.filters.type}/${item.id}`
            })),
            {
                id: ++index,
                name: 'Placeholders',
                path: mediaRoutes.placeholders,
            }
        ]
    }, [mediaTypes.items])


    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filter[categoryIndex].items[filterIndex].name + ' selected from ' + filter[categoryIndex].name)
    }

    const panelFiltersData = useMemo(() =>
    ({
        "fileType": {
            label: 'File Type',
            options: mediaTypes.items,
            isUnique: true,
        },
        "distributed": {
            label: 'Distributed',
            options: [],
        },
        "owner": {
            label: 'Owner',
            options: teamMembers.items || [],
            optionsLabel: (item) => getFullName(item),
        },
        "associatedTo": {
            label: 'Associated To',
            options: [],
        },
        "dateUploaded": {
            label: 'Date Uploaded',
            type: 'date',
            optionsLabel: (dates) => {
                return dates[0] + ' - ' + dates[1]
            },
            disableFuture: true,
            isUnique: true
        },
        "tag": {
            label: 'Tag',
            options: tags || [],
        },
    }), [tags, mediaTypes])

    const onTopActionClick = (e) => {
        console.log('top action click')
        setUploadDialogOpen(true)
    }

    const onPanelFilterChange = (filter) => {
        setSelectedFilters(filter)
        props.filter(filter)
    }


    return (
        <MainLayout
            title={props.title || 'Media'}
            topActionName={props.topActionName || '+ Add Media'}
            onTopActionClick={onTopActionClick}
            filters={filtersOptions}
            onFilterSelected={onFilterSelected}
            actions={props.actions}
            //loading={teamMembers.loading}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                setFilter: props.setFilter,
                selectedFilters: selectedFilters
            }}
        >
            <Divider />

            {props.children}

            <UploadMediaDialog
                open={uploadDialogOpen}
                onClose={() => setUploadDialogOpen(false)}
            />

        </MainLayout>
    )
}

export default MediaPage