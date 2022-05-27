import { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { IconButton, Typography } from "@mui/material"
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined, Clear } from '@mui/icons-material'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from "Context/ConfirmDialogProvider"

import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMedias } from 'Api/Hooks'
import { addTagsToMedias, deleteTagsFromMedias, archiveMedias } from "Api/Endpoints"
import { mediaRoutes } from "Routes/Routes"
import RenderIf from "UI/Widgets/RenderIf"

export const AllMediaPage = () => {
	const { type, value } = useParams()

	const [viewGrid, setViewGrid] = useState(true)
	const [showPanelFilters, setShowPanelFilters] = useState(false)
	const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
	const [loadingTags, setLoadingTags] = useState(false)
	const [selectedMedias, setSelectedMedias] = useState([])
	const isTagDialogFunctionRemoveRef = useRef(false)
	const [replaceSelectedPanelFilter, setReplaceSelectedPanelFilter] = useState({})

	const medias = useMedias(1, 24)
	const app = useContext(AppContext)
	const confirmDialog = useContext(ConfirmDialogContext)

	useEffect(() => {
		if (type && value) {
			setReplaceSelectedPanelFilter(
				{
					type: type,
					value: value
				}
			)
		}
	}, [type, value])

	const onFilterChange = (filter) => {
		console.log("Filter Change", filter)
		medias.filter(filter)
	}

	const onSelectionChange = (selection) => {
		setSelectedMedias(selection)
	}

	const onArchiveMedia = () => {
		confirmDialog.show('Archive Media',
			`Are you sure you want to archive the selected media: ${medias.items.filter(m => selectedMedias.some(id => id === m.id)).map(m => m.name || m.file_name).join(', ')} ?`,
			async () => {
				const mediasCount = selectedMedias.length
				const response = await archiveMedias(selectedMedias)
				if (response.error.count === 0)
					app.alert.setSuccess(`${mediasCount} media${mediasCount > 0 ? 's' : ''} archived`)
				else {
					app.alert.setError(`Something went wrong, ${response.error.count} media${response.error.count > 1 ? 's' : ''} not archived`)
					if (response.error.status.includes(422))
						app.alert.setWarning(`Unable to archive ${response.error.count} media${response.error.count > 1 ? 's' : ''} that has been previously used in a message. Please contact support to get media deleted`)
				}
			})
	}

	const onAddTagsToMedias = async (tagsIds) => {

		const { success, error } = await addTagsToMedias(tagsIds, selectedMedias)
		if (error.count === 0) {
			app.alert.setSuccess('Tags added successfully')
			setOpenSelectTagDialog(false)
		}
		else if (success.count === 0)
			app.alert.setError('An error occurred while adding tags')
		else
			app.alert.setWarning(`Some tags (${error.count}) could not be added`)
	}

	const onDeleteTagsFromMedias = async (tagsIds) => {
		confirmDialog.show('Remove Tags',
			`Are you sure you want to remove the selected tags (${tagsIds.length}) ?`,
			async () => {
				const { success, error } = await deleteTagsFromMedias(tagsIds, selectedMedias)
				if (error.count === 0) {
					app.alert.setSuccess('Tags removed successfully')
					setOpenSelectTagDialog(false)
				}
				else if (success.count === 0) {
					app.alert.setError('An error occurred while removing tags')
				}
				else
					app.alert.setWarning(`Some tags (${error.count}) could not be removed`)
			})
	}

	const handleTagsDialogConfirm = async (selectedTagsIds) => {
		setLoadingTags(true)
		if (isTagDialogFunctionRemoveRef.current) {
			await onDeleteTagsFromMedias(selectedTagsIds)
		} else {
			await onAddTagsToMedias(selectedTagsIds)
		}
		setLoadingTags(false)
	}

	//TODO: find way to download all medias at once ( zip file? )
	const onDownloadAction = () => {
		if (selectedMedias.length > 0) {
			medias.items.filter(media => selectedMedias.includes(media.id)).forEach(mediaSelected => {
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
		if (selectedMedias.length > 0) {
			isTagDialogFunctionRemoveRef.current = false
			setOpenSelectTagDialog(true)
		}
	}

	const onUntagAction = () => {
		if (selectedMedias.length > 0) {
			isTagDialogFunctionRemoveRef.current = true
			setOpenSelectTagDialog(true)
		}
	}

	const onSendInMessageAction = () => {
		if (selectedMedias.length !== 1)
			app.alert.setWarning('Please select only one media to send in message')
		else {
			const media = medias.items.find(m => selectedMedias[0] === m.id)
			if (media)
				app.sendMediaInMessage(media, 'media')
		}
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
			disabled: selectedMedias.length === 0,
			options: [
				{ name: 'Send in Message', onClick: onSendInMessageAction },
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
			title="Media"
			filter={onFilterChange}
			actions={mainActions}
			showPanelFilters={showPanelFilters}
			replecaSelectPanelFilter={replaceSelectedPanelFilter}
		>
			<RenderIf condition={medias.items && medias.items.length > 0}>
				<Typography fontWeight='bold'>
					You have
					<Typography component='span' color='primary' fontWeight='bold'>
						{` ${medias.pagination.totalItems || 0} `}
					</Typography>
					medias
				</Typography>
				<RenderIf condition={selectedMedias.length > 0}>
					<Typography component='span' color='primary' fontWeight='bold' fontSize={'14px'}>
						{`${selectedMedias.length} media${selectedMedias.length > 1 ? "s" : ""} selected`}
						<IconButton size='small' color='primary' onClick={() => setSelectedMedias([])}>
							<Clear fontSize="inherit" />
						</IconButton>
					</Typography>
				</RenderIf>
			</RenderIf>

			<MediaTable
				items={medias.items}
				pagination={medias.pagination}
				loading={medias.loading}
				view={viewGrid ? 'grid' : 'list'}
				linkTo={mediaRoutes.mediaDetails}
				onSelectionChange={onSelectionChange}
				onSendClick={(media) => app.sendMediaInMessage(media, 'media')}
			/>

			<SelectTagDialog
				open={openSelectTagDialog}
				onClose={() => setOpenSelectTagDialog(false)}
				onConfirm={handleTagsDialogConfirm}
				actionLoading={loadingTags}
				title={isTagDialogFunctionRemoveRef.current ? 'Untag' : 'Add Tag'}
				isAddTag={isTagDialogFunctionRemoveRef.current ? false : true}
			/>

		</MediaPage>
	)
}


export default AllMediaPage