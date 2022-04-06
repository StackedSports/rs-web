import { useState, useMemo, useEffect } from 'react'
import { GridView, FormatAlignJustify, AutoFixHigh, Tune, LocalOfferOutlined, KeyboardArrowDown } from '@mui/icons-material'
import { Stack, Typography, Box } from '@mui/material'

import MainLayout from 'UI/Layouts/MainLayout'
import Button from 'UI/Widgets/Buttons/Button'
import { Divider } from 'UI'

import { usePlaceholders, useMedia, useTags } from 'Api/Hooks'
import { getMediaTypes } from 'Api/Endpoints'



export const MediaPage = () => {

    const placeholders = usePlaceholders(1, 4)

    const tags = useTags()
    const media = useMedia()

    console.log(media)

    const [mediaTypes, setMediaTypes] = useState([])


    useEffect(() => {
        getMediaTypes().then(res => {
            setMediaTypes(res[0].map(item => ({
                id: item.key,
                name: item.type
            })))
        })
    }, [])

    const [viewGrid, setViewGrid] = useState(true)
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({})

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
            icon: viewGrid ? GridView : FormatAlignJustify,
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
    }), [tags])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onPanelFilterChange = (filter) => {
        console.log('Filters selected', filter)
        setSelectedFilters(filter)
    }

    return (
        <MainLayout
            title='Media'
            topActionName='+ Add Media'
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

            <Box>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Quick Acess
                    </Typography>
                    <Box>
                        <Button
                            name='Last Modified'
                            variant='text'
                            endIcon={<KeyboardArrowDown />}
                            color='inherit'
                        />
                    </Box>
                </Stack>
                <Box textAlign='center'>
                    <Button
                        name='Load More'
                        variant='text'
                    />
                </Box>
            </Box>

            <Box my={2}>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                    <Typography variant='subtitle1' color='text.secondary' fontWeight={500} >
                        Placeholders
                    </Typography>
                    <Box>
                        <Button
                            name='Last Modified'
                            variant='text'
                            endIcon={<KeyboardArrowDown />}
                            color='inherit'
                        />
                    </Box>
                </Stack>
                <Box textAlign='center'>
                    <Button
                        name='Load More'
                        variant='text'
                    />
                </Box>
            </Box>

            <Box my={2}>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                    <Typography variant='subtitle1' color='text.secondary'>
                        Tagged Media
                    </Typography>
                    <Box>
                        <Button
                            name='Last Modified'
                            variant='text'
                            endIcon={<KeyboardArrowDown />}
                            color='inherit'
                        />
                    </Box>
                </Stack>
                <Stack direction='row' flexWrap='wrap' gap={3}>
                    {tags && tags.slice(0, 12).map(tag => (
                        <Stack
                            direction={'row'}
                            alignItems='center'
                            key={tag.id}
                            sx={{
                                height: '50px',
                                paddingInline: '20px',
                                maxWidth: '200px',
                                border: '1px solid #E0E0E0',
                            }}
                        >
                            <LocalOfferOutlined
                                style={{ color: '#3871DA' }}
                            />
                            <Typography
                                color='text.primary'
                                noWrap
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '10px',
                                }}
                            >
                                {tag.name}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>

        </MainLayout>
    )
}

export default MediaPage