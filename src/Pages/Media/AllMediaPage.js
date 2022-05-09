import { useState, useEffect, useRef, useMemo, useContext } from "react"
import { useParams } from "react-router-dom"
import { Typography } from "@mui/material"
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'

import { AppContext } from 'Context/AppProvider'

import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import { archiveMedias } from "Api/Endpoints"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMedias } from 'Api/Hooks'
import { addTagsToMedias, deleteTagsFromMedia } from "Api/Endpoints"
import { mediaRoutes } from "Routes/Routes"

export const AllMediaPage = () => {
 	const { type, value } = useParams()

	// const [allMedias, setAllMedias] = useState([])
	const [viewGrid, setViewGrid] = useState(true)
	const [showPanelFilters, setShowPanelFilters] = useState(false)
	const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
	const [selectedMedias, setSelectedMedias] = useState([])
	const filterChanged = useRef(false)
	const [replaceSelectedPanelFilter, setReplaceSelectedPanelFilter] = useState({})

	const medias = useMedias(1, 25)
	const app = useContext(AppContext)

	useEffect(() => {
		setReplaceSelectedPanelFilter(
			{
				type: type,
				value: value
			}
		)
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
		console.log("Filter Change",filter)
		filterChanged.current = true
		medias.filter(filter)
	}

	const onSelectionChange = (selection) => {
		setSelectedMedias(selection)
	}

	const archiveMedia = () => {
		console.log(archiveMedias(selectedMedias))
	}

	const handleTagsDialogConfirm = (selectedTagsIds) => {
		const result = addTagsToMedias(selectedTagsIds, selectedMedias)
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

	// does it remove all tags?
	const onUntagAction = () => {
		if (selectedMedias.length > 0) {
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
			options: [
				{ name: 'Send in Message', onClick: () => { console.log("clicked") } },
				{ name: 'Download', onClick: onDownloadAction },
				{ name: 'Archive Media', onClick: archiveMedia },
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
			/>

		</MediaPage>
	)
}


export default AllMediaPage