import React, { useState, useEffect, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'

import { mediaRoutes } from 'Routes/Routes'
import { useTags, useMediaTypes, useContacts, useTeamMembers } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'
import useSearchParams, { filterObjectToSearchParams } from 'Hooks/SearchParamsHook';
import { getFilterMediasCriteria } from 'Api/Parser'

export const MediaPage = (props) => {
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()
    const contacts = useContacts()

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()

    const searchParams = useSearchParams()

    //Handle with setSelectedFilters from props
    useEffect(() => {
        if (props.replecaSelectPanelFilter) {
            const { type, value } = props.replecaSelectPanelFilter
            if (type === 'type') {
                if (!mediaTypes.loading)
                    setSelectedFilters({
                        "type": [{ ...mediaTypes.items.find(item => item.id == value) }],
                    })
            }
            if (type === 'owner') {
                if (!teamMembers.loading)
                    setSelectedFilters({
                        "owner_id": [{ ...teamMembers.items?.find(item => item.id == value) }],
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
        "type": {
            label: 'File Type',
            options: mediaTypes.items,
            isUnique: true,
        },
        /* hidden for now
        "distributed": {
            label: 'Distributed',
            options: [],
        }, */
        "owner_id": {
            label: 'Owner',
            options: teamMembers.items || [],
            optionsLabel: (item) => getFullName(item),
            onSearch: (search) => teamMembers.search(search),
        },
        /* hidden for now api doesn't support it
        "contact_id": {
            label: 'Associated To',
            options: contacts.items || [],
            optionsLabel: (item) => getFullName(item),
            onSearch: (value) => value === '' ? contacts.clearFilter() : contacts.filter({ search: value }),
            loading: contacts.loading,
        }, */
        "created_at": {
            label: 'Date Uploaded',
            type: 'date',
            optionsLabel: (dates) => {
                return dates[0] + ' - ' + dates[1]
            },
            disableFuture: true,
            isUnique: true
        },
        "tag_id": {
            label: 'Tag',
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
    }), [tags.items, mediaTypes.items, teamMembers.items, contacts.items, contacts.loading])

    useEffect(() => {
        searchParams.appenSearchParams('filters', filterObjectToSearchParams( getFilterMediasCriteria(selectedFilters)))
    }, [selectedFilters])

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