import { useState, useMemo, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalOfferOutlined, KeyboardArrowDown, AutoFixHigh, GridView, FormatListBulleted, Tune, Clear } from '@mui/icons-material'
import { Stack, Typography, Box, CircularProgress, IconButton, Skeleton, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import lodash from "lodash"

import Button from 'UI/Widgets/Buttons/Button'
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import BaseMediaPage from './BaseMediaPage'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider'

import { useTagsWithMedia, useMedias, usePlaceholders } from 'Api/ReactQuery';
import { archiveMedias, addTagsToMedias, deleteTagsFromMedias } from "Api/Endpoints"
import { mediaRoutes } from 'Routes/Routes';
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import RenderIf from 'UI/Widgets/RenderIf'
import { filterObjectToQueryParams } from 'Hooks/SearchParamsHook'
import { AssignMediaToPlaceholderDialog } from 'UI/Widgets/Media/AssignMediaToPlaceholderDialog'

export const MainMediaPage = (props) => {
    const queryClient = useQueryClient();
    const app = useContext(AppContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const media = useMedias(1, 6)
    const placeholders = usePlaceholders(1, 6)
    const tags = useTagsWithMedia()

    const [viewGrid, setViewGrid] = useState(true)
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [openAssignMediaToPlaceholderDialog, setOpenAssignMediaToPlaceholderDialog] = useState(false)
    const [loadingTags, setLoadingTags] = useState(false)
    const isTagDialogFunctionRemoveRef = useRef(false)

    const mediaMultiPageSelection = useMultiPageSelection_V2(media.items)
    const placeholdersMultiPageSelection = useMultiPageSelection_V2(placeholders.items)

    const invalidateMediasCache = () => {
        queryClient.invalidateQueries(['medias'])
        queryClient.invalidateQueries(['placeholders'])
    }

    const onSwitchView = () => {
        setViewGrid(oldViewGrid => !oldViewGrid)
    }

    // TODO Archive Placeholders, API blocked refresh data
    const onArchiveAction = async () => {
        const mediasCount = mediaMultiPageSelection.count
        confirmDialog.show("Archive",
            `Are you sure you want to archive ${mediasCount} media${mediasCount > 0 ? 's' : ''}?`,
            async () => {
                const response = await archiveMedias(mediaMultiPageSelection.selectionModel)
                if (response.error.count === 0)
                    app.alert.setSuccess(`${mediasCount} media${mediasCount > 0 ? 's' : ''} archived`)
                else {
                    app.alert.setError(`Something went wrong, ${response.error.count} media${response.error.count > 1 ? 's' : ''} not archived`)
                    if (response.error.status.includes(422))
                        app.alert.setError(`Unable to archive ${response.error.count} media${response.error.count > 1 ? 's' : ''} that has been previously used in a message. Please contact support to get media deleted`)
                }
            }
        )
        invalidateMediasCache()
    }

    // Find way to download all selected medias
    const onDownloadAction = () => {
        if (mediaMultiPageSelection.count > 0) {
            mediaMultiPageSelection.selectedData.forEach(mediaSelected => {
                if (mediaSelected?.urls?.original) {
                    let url = mediaSelected.urls.original;
                    const a = document.createElement('a');
                    a.href = url;
                    a.target = '_blank';
                    a.download = mediaSelected.name;
                    a.click();
                }
            })
        } else
            app.alert.setWarning("No media selected")
    }

    const getAllMediaIdsFromPlaceholder = (placeholder) => {
        return placeholder.media.map(media => media.id)
    }

    const onAddTags = async (tagsIds, mediasIds) => {

        const { success, error } = await addTagsToMedias(tagsIds, mediasIds)
        if (error.count === 0) {
            app.alert.setSuccess('Tags added successfully')
            setOpenSelectTagDialog(false)
            mediaMultiPageSelection.clear()
            placeholdersMultiPageSelection.clear()
        }
        else if (success.count === 0)
            app.alert.setError('An error occurred while adding tags')
        else
            app.alert.setWarning(`Some tags (${error.count}) could not be added`)
    }

    const onDeleteTags = async (tagsIds, mediasIds) => {
        confirmDialog.show('Remove Tags',
            `Are you sure you want to remove the selected tags (${tagsIds.length}) from ${mediaMultiPageSelection.count} medias and ${placeholdersMultiPageSelection.count} placeholders ?`,
            async () => {
                const { success, error } = await deleteTagsFromMedias(tagsIds, mediasIds)
                if (error.count === 0) {
                    app.alert.setSuccess('Tags removed successfully')
                    setOpenSelectTagDialog(false)
                    mediaMultiPageSelection.clear()
                    placeholdersMultiPageSelection.clear()
                }
                else if (success.count === 0)
                    app.alert.setError('An error occurred while removing tags')
                else
                    app.alert.setWarning(`Some tags (${error.count}) could not be removed`)
            })
    }

    const handleTagsDialogConfirm = async (selectedTagsIds) => {
        setLoadingTags(true)

        // getting all medias from selected placeholders
        const mediasFromSelectedPlaceholders = placeholdersMultiPageSelection.selectedData.
            map(placeholder => getAllMediaIdsFromPlaceholder(placeholder)).
            flat()

        const uniqueMediaIds = lodash.uniq([...mediasFromSelectedPlaceholders, ...mediaMultiPageSelection.selectionModel])

        if (isTagDialogFunctionRemoveRef.current) {
            await onDeleteTags(selectedTagsIds, uniqueMediaIds)
        } else {
            await onAddTags(selectedTagsIds, uniqueMediaIds)
        }
        invalidateMediasCache()
        setLoadingTags(false)
    }

    const onTagAction = () => {
        if (placeholdersMultiPageSelection.count > 0 || mediaMultiPageSelection.count > 0) {
            isTagDialogFunctionRemoveRef.current = false
            setOpenSelectTagDialog(true)
        } else {
            app.alert.setWarning('Please select at least one media or placeholder')
        }
    }

    const onUntagAction = () => {
        if (placeholdersMultiPageSelection.count > 0 || mediaMultiPageSelection.count > 0) {
            isTagDialogFunctionRemoveRef.current = true
            setOpenSelectTagDialog(true)
        } else {
            app.alert.setWarning('Please select at least one media or placeholder')
        }
    }

    const onSendInMessageAction = () => {
        if (placeholdersMultiPageSelection.count > 0 || mediaMultiPageSelection.count > 0) {
            const media = mediaMultiPageSelection.selectedData[0]
            const placeholder = placeholdersMultiPageSelection.selectedData[0]
            if (media)
                app.sendMediaInMessage(media, 'media')
            else if (placeholder)
                app.sendMediaInMessage(placeholder, 'placeholder')
        } else {
            app.alert.setWarning('Please select one media or placeholder')
        }
    }

    const onAddToPlaceholderAction = () => {
        setOpenAssignMediaToPlaceholderDialog(true)
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
                { name: 'Send in Message', onClick: onSendInMessageAction },
                { name: 'Add to Placeholder', onClick: onAddToPlaceholderAction, disabled: mediaMultiPageSelection.count === 0 },
                { name: 'Download', onClick: onDownloadAction },
                { name: 'Archive Media', onClick: onArchiveAction, disabled: mediaMultiPageSelection.count === 0 },
                { name: 'Untag', onClick: onUntagAction },
            ]
        },
        {
            name: 'Tag',
            icon: LocalOfferOutlined,
            variant: 'outlined',
            onClick: onTagAction,
        },
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        },
    ]

    return (
        <BaseMediaPage
            //filter={media.filter}
            actions={mainActions}
            showPanelFilters={showPanelFilters}
            onFilterRedirect={mediaRoutes.media}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    Quick Access
                    <Typography component='p' color='primary.light' fontWeight='bold' fontSize={'14px'} sx={{ minHeight: '28px' }}>
                        <RenderIf condition={mediaMultiPageSelection.count > 0}>
                            {`${mediaMultiPageSelection.count} media${mediaMultiPageSelection.count > 1 ? "s" : ""} selected`}
                            <IconButton size='small' color='inherit' onClick={() => mediaMultiPageSelection.clear()}>
                                <Clear fontSize="inherit" />
                            </IconButton>
                        </RenderIf>
                    </Typography>
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
                skeletonSize={6}
                view={viewGrid ? 'grid' : 'list'}
                type="media"
                linkTo={mediaRoutes.mediaDetails}
                multiPageSelection={mediaMultiPageSelection}
                onSendClick={(media) => app.sendMediaInMessage(media, 'media')}
                disablePagination
            />

            <Divider sx={{ my: 2, borderBottomWidth: '2px' }} />
            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    Placeholders
                    <Typography component='p' color='primary.light' fontWeight='bold' fontSize={'14px'} sx={{ minHeight: '28px' }}>
                        <RenderIf condition={placeholdersMultiPageSelection.count > 0}>
                            {`${placeholdersMultiPageSelection.count} placeholder${placeholdersMultiPageSelection.count > 1 ? "s" : ""} selected`}
                            <IconButton size='small' color='inherit' onClick={() => placeholdersMultiPageSelection.clear()}>
                                <Clear fontSize="inherit" />
                            </IconButton>
                        </RenderIf>
                    </Typography>
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
                skeletonSize={6}
                view={viewGrid ? 'grid' : 'list'}
                type="placeholder"
                linkTo={mediaRoutes.placeholderDetails}
                multiPageSelection={placeholdersMultiPageSelection}
                onSendClick={(placeholder) => app.sendMediaInMessage(placeholder, 'placeholder')}
                disablePagination
            />
            <Divider sx={{ mt: 2, borderBottomWidth: '2px' }} />
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
                    {tags.isLoading ? (
                        Array.from(new Array(12)).map((item, index) =>
                            <Stack
                                direction={'row'}
                                alignItems='center'
                                key={index}
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
                                <Typography>
                                    <Skeleton width={'65px'} />
                                </Typography>
                            </Stack>
                        )) : (
                        tags.items.slice(0, 12).map(tag => (
                            <Stack
                                component={Link}
                                to={{
                                    pathname: mediaRoutes.media,
                                    search: new URLSearchParams({
                                        page: 1,
                                        filters: filterObjectToQueryParams({
                                            tag_id: {
                                                label: tag.name, value: tag.id
                                            }
                                        }),
                                    }).toString(),
                                }}
                                direction={'row'}
                                alignItems='center'
                                key={tag.id}
                                sx={{
                                    height: '50px',
                                    paddingInline: '20px',
                                    maxWidth: '200px',
                                    border: 1,
                                    borderColor: 'divider',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    bgcolor: 'background.secondary',
                                    borderRadius: '5px'
                                }}
                            >
                                <LocalOfferOutlined
                                    color='primary'
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
                        ))
                    )}
                </Stack>
            </Box>
            <SelectTagDialog
                open={openSelectTagDialog}
                onClose={() => setOpenSelectTagDialog(false)}
                onConfirm={handleTagsDialogConfirm}
                actionLoading={loadingTags}
                title={isTagDialogFunctionRemoveRef.current ? 'Untag' : 'Add Tag'}
                isAddTag={isTagDialogFunctionRemoveRef.current ? false : true}
            />
            <AssignMediaToPlaceholderDialog
                open={openAssignMediaToPlaceholderDialog}
                onClose={() => setOpenAssignMediaToPlaceholderDialog(false)}
                medias={mediaMultiPageSelection.selectedData}
            />
        </BaseMediaPage>
    )
}

export default MainMediaPage