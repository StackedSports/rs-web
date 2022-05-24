import { useState, useMemo, useContext } from 'react'
import { LocalOfferOutlined, KeyboardArrowDown, AutoFixHigh, GridView, FormatListBulleted, Tune } from '@mui/icons-material'
import { Stack, Typography, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

import Button from 'UI/Widgets/Buttons/Button'
import { Divider } from 'UI'
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import MediaPage from './MediaPage'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider'

import { usePlaceholders, useMedias, useTags } from 'Api/Hooks'
import { archiveMedias, addTagsToMedias } from "Api/Endpoints"
import { mediaRoutes } from 'Routes/Routes';

export const MainMediaPage = (props) => {
    const app = useContext(AppContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const media = useMedias(1, 6)
    const placeholders = usePlaceholders(1, 6)
    const tags = useTags()

    const [viewGrid, setViewGrid] = useState(true)
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedMedias, setSelectedMedias] = useState([])
    const [selectedPlaceholders, setSelectedPlaceholders] = useState([])
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [addFilter, setAddFilter] = useState()

    // console.log("placeholders", placeholders)

    const onSwitchView = () => {
        setViewGrid(oldViewGrid => !oldViewGrid)
    }

    const onMediaSelectionChange = (selection) => {
        setSelectedMedias(selection)
    }

    const onPlaceholderSelectionChange = (selection) => {
        setSelectedPlaceholders(selection)
    }

    // TODO Archive Placeholders, API blocked
    const onArchiveAction = async () => {
        const mediasCount = selectedMedias.length
        confirmDialog.show("Archive",
            `Are you sure you want to archive ${mediasCount} media${mediasCount > 0 ? 's' : ''}?`,
            async () => {
                const response = await archiveMedias(selectedMedias)
                if (response.error.count === 0)
                    app.alert.setSuccess(`${mediasCount} media${mediasCount > 0 ? 's' : ''} archived`)
                else {
                    app.alert.setError(`Something went wrong, ${response.error.count} media${response.error.count > 1 ? 's' : ''} not archived`)
                    if (response.error.status.includes(422))
                        app.alert.setError(`Unable to archive ${response.error.count} media${response.error.count > 1 ? 's' : ''} that has been previously used in a message. Please contact support to get media deleted`)
                }
            }
        )
    }

    const onDownloadAction = () => {
        if (selectedMedias.length > 0) {
            media.items.filter(media => selectedMedias.includes(media.id)).forEach(mediaSelected => {
                if (mediaSelected?.urls?.original) {
                    let url = mediaSelected.urls.original;
                    const a = document.createElement('a');
                    a.href = url;
                    a.target = '_blank';
                    a.download = mediaSelected.name;
                    a.click();
                }
            })
        }
    }

    //TODO
    const handleTagsDialogConfirm = (selectedTagsIds) => {
        const result = addTagsToMedias(selectedTagsIds, selectedMedias)
    }

    const handleTagsClick = (tag) => {
        const filter = {
            filterName: 'tag',
            filter: {},
            option: tag
        }

        setAddFilter(filter)
    }

    const mainActions = [
        {
            name: 'Change view',
            type: 'icon',
            icon: !viewGrid ? GridView : FormatListBulleted,
            onClick: onSwitchView
        },
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
            type: 'dropdown',
            options: [
                { name: 'Send in Message', onClick: () => { console.log("clicked") } },
                { name: 'Download', onClick: onDownloadAction },
                { name: 'Archive Media', onClick: onArchiveAction, disabled: selectedMedias.length === 0 },
                { name: 'Untag', onClick: () => { console.log("clicked") } },
            ]
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
            onClick: () => setOpenSelectTagDialog(true),
            disabled: selectedMedias.length === 0,
        },
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        },
    ]

    return (
        <MediaPage
            //   viewGrid={viewGrid}
            //   onSwitchView={onSwitchView}
            //   filter = {media.filter}
            filter={media.filter}
            actions={mainActions}
            showPanelFilters={showPanelFilters}
            setFilter={addFilter}
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

            {media.loading && (
                <Box
                    height='300px'
                    sx={{ display: 'grid', placeItems: 'center' }}
                >
                    <CircularProgress />
                </Box>
            )}

            <MediaTable
                items={media.items || []}
                loading={media.loading}
                view={viewGrid ? 'grid' : 'list'}
                type="media"
                linkTo={mediaRoutes.mediaDetails}
                onSelectionChange={onMediaSelectionChange}
                onSendClick={(media) => app.sendMediaInMessage(media, 'media')}
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

            {placeholders.loading && (
                <Box
                    height='300px'
                    sx={{ display: 'grid', placeItems: 'center' }}
                >
                    <CircularProgress />
                </Box>
            )}

            <MediaTable
                items={placeholders.items}
                view={viewGrid ? 'grid' : 'list'}
                type="placeholder"
                linkTo={mediaRoutes.placeholderDetails}
                onSelectionChange={onPlaceholderSelectionChange}
                onSendClick={(placeholder) => app.sendMediaInMessage(placeholder, 'placeholder')}
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
                            onClick={() => handleTagsClick(tag)}
                            direction={'row'}
                            alignItems='center'
                            key={tag.id}
                            sx={{
                                height: '50px',
                                paddingInline: '20px',
                                maxWidth: '200px',
                                border: '1px solid #E0E0E0',
                                cursor: 'pointer',
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
            <SelectTagDialog
                open={openSelectTagDialog}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={handleTagsDialogConfirm}
            />
        </MediaPage>
    )
}

export default MainMediaPage