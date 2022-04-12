import { useState, useMemo, useEffect } from 'react'
import { LocalOfferOutlined, KeyboardArrowDown } from '@mui/icons-material'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'

import { Link } from 'react-router-dom'


import Button from 'UI/Widgets/Buttons/Button'
import { Divider } from 'UI'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { usePlaceholders, useMedias, useTags } from 'Api/Hooks'

import { mediaRoutes } from 'Routes/Routes';
import MediaPage from './MediaPage'

export const MainMediaPage = (props) => {
    const media = useMedias(1, 5)
    const placeholders = usePlaceholders(1, 5)
    const tags = useTags()

    const [viewGrid, setViewGrid] = useState(true)

    // console.log("placeholders", placeholders)

    const onSwitchView = () => {
        setViewGrid(oldViewGrid => !oldViewGrid)
    }



    return (
        <MediaPage
            viewGrid={viewGrid}
            onSwitchView={onSwitchView}
        >

            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    Quick Access
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to={mediaRoutes.media}
                        name='View More'
                        variant='text'
                    />
                </Box>
            </Stack>

            {media.loading &&
                (<Box
                    height='300px'
                    sx={{ display: 'grid', placeItems: 'center' }}
                >
                    <CircularProgress />
                </Box>)}

            <MediaTable
                items={media.items || []}
                loading={media.loading}
                view={viewGrid ? 'grid' : 'list'}
                type="media"
                linkTo='/media/media/details/'
                disablePagination
            />

            <Divider />

            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    Placeholders
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to={mediaRoutes.placeholders}
                        name='View More'
                        variant='text'
                    />
                </Box>
            </Stack>

            {placeholders.loading &&
                (<Box
                    height='300px'
                    sx={{ display: 'grid', placeItems: 'center' }}
                >
                    <CircularProgress />
                </Box>)}

            <MediaTable
                items={placeholders.items}
                view={viewGrid ? 'grid' : 'list'}
                type="placeholder"
                linkTo='/media/placeholders/details/'
                disablePagination
            />

            <Box my={2} >
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                    <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
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

        </MediaPage>
    )
}

export default MainMediaPage