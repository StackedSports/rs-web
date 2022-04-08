import { useState, useMemo, useEffect, useRef } from 'react'
import { GridView, AutoFixHigh, Tune, LocalOfferOutlined, KeyboardArrowDown } from '@mui/icons-material'
import { Stack, Typography, Box } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

import { Link } from 'react-router-dom'

import MainLayout from 'UI/Layouts/MainLayout'
import Button from 'UI/Widgets/Buttons/Button'
import { Divider } from 'UI'
import MediaTable from 'UI/Tables/Media/MediaTable'

import { usePlaceholders, useMedia, useTags } from 'Api/Hooks'
import { getMediaTypes } from 'Api/Endpoints'

// import { MediaView } from './MediaView'

import { mediaRoutes } from 'Routes/Routes';
import MediaPage from './MediaPage'

/**
 * TODO: delete this
 * 
 * Mudanças: MediaTable, MediaTableConfig, Decoupling of MediaView,
 * set paginated media to 5 items per page 
 * 
 */

export const MainMediaPage = (props) => {
    const media = useMedia(1, 5)
    const placeholders = usePlaceholders(1, 5)
    const tags = useTags()

    const [viewGrid, setViewGrid] = useState(true)

    // console.log("placeholders", placeholders)

    const [mediaTypes, setMediaTypes] = useState([])


    useEffect(() => {
        getMediaTypes().then(res => {
            setMediaTypes(res[0].map(item => ({
                id: item.key,
                name: item.type
            })))
        })
    }, [])

    const onSwitchView = () => {
        setViewGrid(oldViewGrid => !oldViewGrid)
    }

    return (
        <MediaPage
          viewGrid={viewGrid}
          onSwitchView={onSwitchView}
            // title='Media'
            // topActionName='+ Add Media'
            // onTopActionClick={onTopActionClick}
            // filters={filters}
            // actions={mainActions}
            // propsPanelFilters={{
            //     open: showPanelFilters,
            //     filters: panelFiltersData,
            //     onFilterChange: onPanelFilterChange
            // }}
        >

            {/* <MediaView
              isGrid={viewGrid}
              isLoading={media.loading}
              items={media.items}
              title='Quick Access'
              disablePagination
            /> */}

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

            <MediaTable
              items={media.items}
              loading={media.loading}
              view={viewGrid ? 'grid' : 'list'}
              type="media"
              disablePagination
            />

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

            <MediaTable
              items={placeholders.items}
              loading={placeholders.loading}
              view={viewGrid ? 'grid' : 'list'}
              type="placeholder"
              disablePagination
            />

            {/* <MediaView
              isGrid={viewGrid}
              isLoading={placeholders.loading}
              items={placeholders.items}
              title='Placeholders'
              type='placeholder'
              disablePagination
            /> */}

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