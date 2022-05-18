import { useState, useEffect, useRef, useMemo, useContext } from "react"
import { useParams } from "react-router-dom"
import { Typography } from "@mui/material"
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from "Context/ConfirmDialogProvider"

import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import { addNewTagsToMedia, archiveMedias } from "Api/Endpoints"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMedias } from 'Api/Hooks'
import { addTagsToMedias, deleteTagsFromMedias } from "Api/Endpoints"
import { mediaRoutes } from "Routes/Routes"
import { separeteNewTagsNameFromExistingTagsIds } from "utils/Helper"

export const AllMediaPage = () => {
	const { type, value } = useParams()

	// const [allMedias, setAllMedias] = useState([])
	const [viewGrid, setViewGrid] = useState(true)
	const [showPanelFilters, setShowPanelFilters] = useState(false)
	const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
	const [loadingTags, setLoadingTags] = useState(false)
	const [selectedMedias, setSelectedMedias] = useState([])
	const filterChanged = useRef(false)
	const isTagDialogFunctionRemoveRef = useRef(false)
	const [replaceSelectedPanelFilter, setReplaceSelectedPanelFilter] = useState({})

	const medias = useMedias(1, 25)
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

	// useEffect(() => {
	// 	if (!medias.loading && medias.items) {
	// 		if (filterChanged.current) {
	// 			filterChanged.current = false
	// 			setAllMedias(medias.items)
	// 		}
	// 		else {
	// 			setAllMedias(oldMedias => [...oldMedias, ...medias.items])
	// 		}
	// 	}
	// }, [medias.items, medias.loading])

	const onFilterChange = (filter) => {
		console.log("Filter Change", filter)
		filterChanged.current = true
		medias.filter(filter)
	}

	const onSelectionChange = (selection) => {
		setSelectedMedias(selection)
	}

	const archiveMedia = () => {
		confirmDialog.show('Archive Media',
			`Are you sure you want to archive the selected media: ${medias.items.filter(m => selectedMedias.some(id => id === m.id)).map(m => m.name || m.file_name).join(', ')} ?`,
			async () => {
				const { success, error } = await archiveMedias(selectedMedias)
				if (error.count === 0)
					app.alert.setSuccess('Media archived successfully')
				else if (success.count === 0)
					app.alert.setError('An error occurred while archiving medias')
				else
					app.alert.setWarning(`Some medias (${error.count}) could not be archived`)
			})
	}

	//How to display erros
	const onAddTagsToMedias = async (tagsIds) => {
		setLoadingTags(true)

		// separate new Tags and already existing tags
		const [newTagsNames, alreadyExistingTags] = separeteNewTagsNameFromExistingTagsIds(tagsIds)

		const res = await Promise.all(selectedMedias.map(mediaId => addNewTagsToMedia(newTagsNames, mediaId)))
		console.log("res", res)

		const { success, error } = await addTagsToMedias(alreadyExistingTags, selectedMedias)
		if (error.count === 0)
			app.alert.setSuccess('Tags added successfully')
		else if (success.count === 0)
			app.alert.setError('An error occurred while adding tags')
		else
			app.alert.setWarning(`Some tags (${error.count}) could not be added`)

		setLoadingTags(false)
	}

	const onDeleteTagsFromMedias = async (tagsIds) => {
		confirmDialog.show('Remove Tags',
			`Are you sure you want to remove the selected tags (${tagsIds.length}) ?`,
			async () => {
				const { success, error } = await deleteTagsFromMedias(tagsIds, selectedMedias)
				if (error.count === 0)
					app.alert.setSuccess('Tags removed successfully')
				else if (success.count === 0)
					app.alert.setError('An error occurred while removing tags')
				else
					app.alert.setWarning(`Some tags (${error.count}) could not be removed`)
			})
	}

	const handleTagsDialogConfirm = (selectedTagsIds) => {
		setOpenSelectTagDialog(false)
		if (isTagDialogFunctionRemoveRef.current) {
			onDeleteTagsFromMedias(selectedTagsIds)
		} else {
			onAddTagsToMedias(selectedTagsIds)
		}
	}

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
		// how to send in message? only one media?
		//app.sendMediaInMessage(media, 'media')
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
				{ name: 'Archive Media', onClick: archiveMedia },
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

			{!medias.loading && (medias.items && medias.items.length > 0) && (
				<Typography fontWeight='bold' gutterBottom>
					Showing  {' '}
					<Typography component='span' color='primary' fontWeight='bold'>
						{medias.items?.length + " of " + medias.pagination.totalItems}
					</Typography>
					{' '} medias
				</Typography>
			)}

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