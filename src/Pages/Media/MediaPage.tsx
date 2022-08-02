import React, { useState, useEffect, useMemo, FC } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'

import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'

import { mediaRoutes } from 'Routes/Routes'
import { useTags, useMediaTypes, useContacts, useTeamMembers } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'
import useSearchParams, { filterObjectToQueryParams } from 'Hooks/SearchParamsHook';
import { getMediaQueryCriteriaObjFromFilters } from 'Api/Parser'
import lodash from 'lodash';
import { IPanelFilterOption, IPanelFilters, IPanelSelectedFilterOption } from 'Interfaces'

type MediaPageProps = {
    onFilterRedirect?: string;
    filter?: (filters: any) => void;
    title?: string;
    topActionName?: string;
    actions?: any;
    showPanelFilters?: boolean;
    setFilter?: { filterName: string, filter: any, option: IPanelFilterOption };
}

export const MediaPage: React.FC<MediaPageProps> = (props) => {
    const searchParams = useSearchParams()
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()
    const contacts = useContacts()

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(searchParams.filters)

    useEffect(() => {
        const criteria = getMediaQueryCriteriaObjFromFilters(selectedFilters)
        searchParams.setFilters(criteria, props.onFilterRedirect)
    }, [selectedFilters])

    useEffect(() => {
        const parsedSelectedFilters = getMediaQueryCriteriaObjFromFilters(selectedFilters)
        if (!lodash.isEqual(parsedSelectedFilters, searchParams.filters)) {
            setSelectedFilters(searchParams.filters)
        }
    }, [searchParams.filters])

    const filtersOptions = useMemo(() => {
        let index = 0
        return [
            {
                id: index,
                name: 'Quick Access',
                path: mediaRoutes.all,
            },
            {
                id: ++index,
                name: 'My Media',
                items: teamMembers.items.map(item => ({
                    id: item.id,
                    name: getFullName(item),
                    path: {
                        pathname: mediaRoutes.media,
                        search: new URLSearchParams({
                            page: '1',
                            filters: filterObjectToQueryParams({
                                owner_id: {
                                    itemLabel: getFullName(item), value: item.id
                                }
                            }),
                        }).toString(),
                    },
                })),
            },
            ...mediaTypes.items.map(item => ({
                id: ++index,
                name: item.name,
                path: {
                    pathname: mediaRoutes.media,
                    search: new URLSearchParams({
                        'page': '1',
                        'filters': filterObjectToQueryParams({
                            type: {
                                itemLabel: item.name, value: item.id
                            }
                        }),
                    }).toString()
                },
            })),
            {
                id: ++index,
                name: 'Placeholders',
                path: `${mediaRoutes.placeholders}?page=1`,
            }
        ]
    }, [mediaTypes.items, teamMembers.items])

    const panelFiltersData: IPanelFilters = useMemo(() =>
    ({
        "type": {
            label: 'File Type',
            options: mediaTypes.items,
            isUnique: true,
            optionsValue: (item) => item.id,
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
            optionsValue: (item) => item.id,
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
            optionsLabel: (dates) => dates.value.join(' - '),
            optionsValue: (dates) => dates,
            disableFuture: true,
            isUnique: true
        },
        "tag_id": {
            label: 'Tag',
            options: tags.items,
            optionsValue: (item) => item.id,
            onSearch: (search) => tags.search(search),
        },
    }), [tags.items, mediaTypes.items, teamMembers.items, contacts.items, contacts.loading])

    const onTopActionClick = () => {
        setUploadDialogOpen(true)
    }

    const onPanelFilterChange = (filter: Record<string, IPanelSelectedFilterOption[]>) => {
        setSelectedFilters(filter)
        if (props.filter)
            props.filter(filter)
    }

    return (
        <MainLayout
            title={props.title || 'Media'}
            topActionName={props.topActionName || '+ Add Media'}
            onTopActionClick={onTopActionClick}
            filters={filtersOptions}
            actions={props.actions}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                setFilter: props.setFilter,
                selectedFilters: selectedFilters
            }
            }
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