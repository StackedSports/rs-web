import { useState, useEffect, useRef, useContext } from "react"
import { IconButton, Typography } from "@mui/material"
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined, Clear } from '@mui/icons-material'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from "Context/ConfirmDialogProvider"
import useSearchParams from 'Hooks/SearchParamsHook'
import useLocalStorage from "Hooks/useLocalStorage"
import { getMediaCriteriaFromQueryString } from "Api/Parser"

import BaseMediaPage from "./BaseMediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import RenderIf from "UI/Widgets/RenderIf"
import { AssignMediaToPlaceholderDialog } from "UI/Widgets/Media/AssignMediaToPlaceholderDialog"

import { useMedias } from "Api/ReactQuery"
import { addTagsToMedias, deleteTagsFromMedias, archiveMedias } from "Api/Endpoints"
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import { mediaRoutes } from "Routes/Routes"
import { useQueryClient } from "react-query"

export const AllMediaPage = () => {
	const queryClient = useQueryClient();
	const searchParams = useSearchParams()
	const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(`medias-table-perPage`, 24)

	const page = searchParams.page
	const mediaCriteriaFilters = getMediaCriteriaFromQueryString(searchParams.filters)

	const [viewGrid, setViewGrid] = useState(true)
	const [showPanelFilters, setShowPanelFilters] = useState(false)
	const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
	const [openAssignMediaToPlaceholderDialog, setOpenAssignMediaToPlaceholderDialog] = useState(false)
	const [loadingTags, setLoadingTags] = useState(false)
	const isTagDialogFunctionRemoveRef = useRef(false)
	const panelRef = useRef()
	const app = useContext(AppContext)
	const confirmDialog = useContext(ConfirmDialogContext)
	const medias = useMedias(page, perPageLocalStorage, mediaCriteriaFilters)
	const multiPageSelection = useMultiPageSelection_V2(medias.items)

	const {
		selectionModel: selectedMediasIds,
		selectedData: selectedMedias,
		count: selectedMediasCount,
		clear: clearSelection
	} = multiPageSelection

	useEffect(() => {
		searchParams.appendSearchParams('page', medias.pagination.currentPage)
	}, [medias.pagination.currentPage])

	useEffect(() => {
		setperPageLocalStorage(medias.pagination.itemsPerPage)
	}, [medias.pagination.itemsPerPage])

	const invalidateMediasCache = () => {
		queryClient.invalidateQueries(['medias'])
	}

	const onFilterChange = (filter) => {
		//return
		//medias.filter(filter)
	}

	const onArchiveMedia = () => {
		confirmDialog.show('Archive Media',
			`Are you sure you want to archive the selected media: ${selectedMedias.map(m => m.name || m.file_name).join(', ')} ?`,
			async () => {
				const mediasCount = selectedMediasCount
				const response = await archiveMedias(selectedMediasIds)
				if (response.error.count === 0)
					app.alert.setSuccess(`${mediasCount} media${mediasCount > 0 ? 's' : ''} archived`)
				else {
					app.alert.setError(`Something went wrong, ${response.error.count} media${response.error.count > 1 ? 's' : ''} not archived`)
					if (response.error.status.includes(422))
						app.alert.setWarning(`Unable to archive ${response.error.count} media${response.error.count > 1 ? 's' : ''} that has been previously used in a message. Please contact support to get media deleted`)
				}
				invalidateMediasCache()
			})
	}

	const onAddTagsToMedias = async (tagsIds) => {

		const { success, error } = await addTagsToMedias(tagsIds, selectedMediasIds)
		if (error.count === 0) {
			app.alert.setSuccess('Tags added successfully')
			setOpenSelectTagDialog(false)
		}
		else if (success.count === 0)
			app.alert.setError('An error occurred while adding tags')
		else
			app.alert.setWarning(`Some tags (${error.count}) could not be added`)

		invalidateMediasCache()
	}

	const onDeleteTagsFromMedias = async (tagsIds) => {
		confirmDialog.show('Remove Tags',
			`Are you sure you want to remove the selected tags (${tagsIds.length}) ?`,
			async () => {
				const { success, error } = await deleteTagsFromMedias(tagsIds, selectedMediasIds)
				if (error.count === 0) {
					app.alert.setSuccess('Tags removed successfully')
					setOpenSelectTagDialog(false)
				}
				else if (success.count === 0) {
					app.alert.setError('An error occurred while removing tags')
				}
				else
					app.alert.setWarning(`Some tags (${error.count}) could not be removed`)

				invalidateMediasCache()
			})
	}

	const handleTagsDialogConfirm = async (selectedTagsIds) => {
		setLoadingTags(true)
		if (isTagDialogFunctionRemoveRef.current) {
			onDeleteTagsFromMedias(selectedTagsIds)
		} else {
			await onAddTagsToMedias(selectedTagsIds)
		}
		setLoadingTags(false)
	}

	//TODO: find way to download all medias at once ( zip file? )
	const onDownloadAction = () => {
		if (selectedMediasCount > 0) {
			selectedMedias.forEach(mediaSelected => {
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

	const onTagAction = () => {
		if (selectedMediasCount > 0) {
			isTagDialogFunctionRemoveRef.current = false
			setOpenSelectTagDialog(true)
		}
	}

	const onUntagAction = () => {
		if (selectedMediasCount > 0) {
			isTagDialogFunctionRemoveRef.current = true
			setOpenSelectTagDialog(true)
		}
	}

	const onSendInMessageAction = () => {
		if (selectedMediasCount !== 1)
			app.alert.setWarning('Please select only one media to send in message')
		else {
			const media = selectedMedias[0]
			if (media)
				app.sendMediaInMessage(media, 'media')
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
			onClick: () => setViewGrid(oldViewGrid => !oldViewGrid)
		},
		{
			name: 'Action',
			icon: AutoFixHigh,
			variant: 'outlined',
			type: 'dropdown',
			disabled: selectedMediasCount === 0,
			options: [
				{ name: 'Send in Message', onClick: onSendInMessageAction },
				{ name: 'Add to Placeholder', onClick: onAddToPlaceholderAction },
				{ name: 'Download', onClick: onDownloadAction },
				{ name: 'Archive Media', onClick: onArchiveMedia },
				{ name: 'Untag', onClick: onUntagAction },
			]
		},
		{
			name: 'Tag',
			icon: LocalOfferOutlined,
			variant: 'outlined',
			onClick: onTagAction,
			disabled: selectedMediasCount === 0,
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
			title="Media"
			filter={onFilterChange}
			actions={mainActions}
			showPanelFilters={showPanelFilters}
			panelRef={panelRef}
		>
			<RenderIf condition={medias.items && medias.items.length > 0}>
				<Typography fontWeight='bold'>
					You have
					<Typography component='span' color='primary' fontWeight='bold'>
						{` ${medias.pagination.totalItems || 0} `}
					</Typography>
					medias
				</Typography>
				<Typography component='span' color='primary' fontWeight='bold' fontSize={'14px'} sx={{ minHeight: '28px' }}>
					<RenderIf condition={selectedMediasCount > 0}>
						{`${selectedMediasCount} media${selectedMediasCount > 1 ? "s" : ""} selected`}
						<IconButton size='small' color='primary' onClick={() => clearSelection()}>
							<Clear fontSize="inherit" />
						</IconButton>
					</RenderIf>
				</Typography>
			</RenderIf>

			<MediaTable
				items={medias.items}
				pagination={medias.pagination}
				loading={medias.loading}
				view={viewGrid ? 'grid' : 'list'}
				linkTo={mediaRoutes.mediaDetails}
				multiPageSelection={multiPageSelection}
				onSendClick={(media) => app.sendMediaInMessage(media, 'media')}
				scrollToTopRef={panelRef}
			/>

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
				medias={multiPageSelection.selectedData}
			/>

		</BaseMediaPage>
	)
}


export default AllMediaPage