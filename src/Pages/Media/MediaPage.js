import React, { useState, useEffect, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'

import { mediaRoutes } from 'Routes/Routes'
import { useTeamMembers } from 'Api/Hooks'
import { useTags, useMediaTypes, useContacts } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'

export const MediaPage = (props) => {
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()
    const contacts = useContacts()

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
                items: teamMembers.items.map(item => ({
                    id: item.id,
                    name: getFullName(item),
                    path: `${mediaRoutes.filters.owner}/${item.id}`
                }))
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
    }, [mediaTypes.items, teamMembers.items])

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
        "contact_id": {
            label: 'Associated To',
            options: contacts.items || [],
            optionsLabel: (item) => getFullName(item),
            onSearch: (value) => value === '' ? contacts.clearFilter() : contacts.filter({ search: value }),
            loading: contacts.loading,
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
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
    }), [tags.items, mediaTypes.items, teamMembers.items, contacts.items, contacts.loading])

    const onTopActionClick = (e) => {
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