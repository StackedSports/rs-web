import React, { useState, useEffect, useMemo, useContext } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'
import { Divider } from 'UI'
import UploadMediaDialog from 'UI/Widgets/Media/UploadMediaDialog'
import { Box, Stack, styled, Typography } from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

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
                name: 'Medias',
                items: [
                    {
                        id: ++index,
                        name: 'Quick Access',
                        path: mediaRoutes.all
                    },
                    {
                        id: ++index,
                        name: 'Medias',
                        path: mediaRoutes.media
                    },
                    {
                        id: ++index,
                        name: 'Placeholders',
                        path: `${mediaRoutes.placeholders}?page=1`,
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
                                        label: item.name, value: item.id
                                    }
                                }),
                            }).toString()
                        },
                    })),
                ]
            },
            {
                id: ++index,
                name: 'Team Media',
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
                                        label: getFullName(item), value: item.id
                                    }
                                }),
                            }).toString(),
                        },
                    }
                    return isAdmin ? obj : item.id === user.id ? obj : null
                }).filter(item => !!item),
            },
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
            options: teamMembers.items,
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
                selectedFilters: selectedFilters
            }}
        >
            <Box
                sx={{ position: 'relative' }}
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
                    if (e.dataTransfer.files.length > 0) {
                        setDropFiles(e.dataTransfer.files)
                        setUploadDialogOpen(true)
                    }
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
                        sx={{
                            maxWidth: '300px',
                            position: 'sticky',
                            top: '85%',
                            left: '50%',
                            transform: `translateX(-50%)`,
                            pointerEvents: 'none',
                            color: 'common.white',
                            transition: 'all .1s'
                            // backgroundColor: 'white'
                        }}
                    >
                        <CloudIcon sx={{ fontSize: 70, color: 'primary.main', position: 'absolute', top: -75 }} />
                        <CloudUploadIcon sx={{ fontSize: 80, color: 'common.white', position: 'absolute', top: -80 }} />

                        <Typography
                            sx={{
                                backgroundColor: 'primary.main',
                                p: 2,
                                borderRadius: .5,
                                boxShadow: 6,
                                fontSize: '16px'
                            }}
                            variant="h6"
                            letterSpacing='1px'
                        >
                            Drop files to upload
                        </Typography>
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
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(56, 113, 218, 0.1)', //theme.palette.divider,
    border: isVisible ? `3px solid ${theme.palette.primary.main}` : 0,
}));

export default BaseMediaPage