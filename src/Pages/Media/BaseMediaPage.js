import React, { useState, useEffect, useMemo, useContext } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'
import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'
import { Box, Stack, styled, Typography } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { mediaRoutes } from 'Routes/Routes'
import { useMediaTypes, useContacts, useTeamMembers, useTagsWithMedia } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'
import useSearchParams, { filterObjectToQueryParams } from 'Hooks/SearchParamsHook';
import { getMediaQueryCriteriaObjFromFilters } from 'Api/Parser'
import lodash from 'lodash';
import { AuthContext } from 'Context/Auth/AuthProvider'

export const BaseMediaPage = (props) => {
    const { isAdmin, user } = useContext(AuthContext)
    const searchParams = useSearchParams()
    const tags = useTagsWithMedia()
    const teamMembers = useTeamMembers()
    const mediaTypes = useMediaTypes()
    const contacts = useContacts()

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(searchParams.filters)
    const [dropFiles, setDropFiles] = useState([]);
    const [isDropingOver, setIsDropingOver] = useState(false)

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
                items: teamMembers.items.map(item => {
                    const obj = {
                        id: item.id,
                        name: getFullName(item),
                        path: {
                            pathname: mediaRoutes.media,
                            search: new URLSearchParams({
                                page: 1,
                                filters: filterObjectToQueryParams({
                                    owner_id: {
                                        itemLabel: getFullName(item), value: item.id
                                    }
                                }),
                            }).toString(),
                        },
                    }
                    return isAdmin ? obj : item.id === user.id ? obj : null
                }).filter(item => !!item),
            },
            ...mediaTypes.items.map(item => ({
                id: ++index,
                name: item.name,
                path: {
                    pathname: mediaRoutes.media,
                    search: new URLSearchParams({
                        page: 1,
                        filters: filterObjectToQueryParams({
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
    }, [mediaTypes.items, teamMembers.items, user, isAdmin])

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
            optionsLabel: (dates) => dates.value.join(' - '),
            disableFuture: true,
            isUnique: true
        },
        "tag_id": {
            label: 'Tag',
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
    }), [tags.items, mediaTypes.items, teamMembers.items])

    const onTopActionClick = (e) => {
        setUploadDialogOpen(true)
    }

    const onPanelFilterChange = (filter) => {
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
            panelRef={props.panelRef}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: panelFiltersData,
                onFilterChange: onPanelFilterChange,
                setFilter: props.setFilter,
                selectedFilters: selectedFilters
            }}
        >
            <Divider />
            <Box
                flex={1}
                sx={{
                    position: 'relative',
                }}
                onDragEnter={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsDropingOver(true)
                }}
                onDragOver={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    e.stopPropagation();
                    e.preventDefault()
                    setIsDropingOver(false)
                    setDropFiles(e.dataTransfer.files)
                    setUploadDialogOpen(true)
                }}
            >
                {props.children}
                <DropZoneOverlay
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDropingOver(false)
                    }}
                    isVisible={isDropingOver}
                >
                    <Stack
                        alignItems='center'
                        sx={{ position: 'sticky', top: '50%', left: '50%', pointerEvents: 'none' }}
                    >
                        <UploadFileIcon sx={{ fontSize: 80 }} />
                        <Typography variant="h4" fontWeight='bold'>Drop files here to upload</Typography>
                    </Stack>
                </DropZoneOverlay>
            </Box>

            <UploadMediaDialog
                open={uploadDialogOpen}
                onClose={() => setUploadDialogOpen(false)}
                files={dropFiles}
            />

        </MainLayout>
    )
}

const DropZoneOverlay = styled(Box)(({ theme, isVisible }) => ({
    display: isVisible ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.divider,
    backdropFilter: "blur(2px)",
}));

export default BaseMediaPage