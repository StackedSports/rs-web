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
	// console.log(type + ' = ' + value)

	const filters = useMemo(() => {
		console.log('getting filters')

		let filters = {}

		if(type === 'type') {
			let id = 0

			switch(value) {
				case 'recent': id = 0; break;
				case 'image': id = 2; break;
				case 'video': id = 4; break;
				case 'gif': id = 3; break;
				case 'personalized': break;
			}

			filters['fileType'] = [{ id }]
		} else if(type === 'owner') {
			// TODO: add owner searching
		}

		/*  {
         "per_page": 25,
         "page": 1,
         //"name":,
         "type": 1 // 0: recent_uploads, 1: my_media, 
		 2: images, 3: gifs, 4: mp4s, 5: pdfs
         // "tag_id": [7693] // pass an array of tag ids to search
         // "placeholder_id": 1536
     }*/
	 	return filters
	}, [type, value])
	
	const [allMedias, setAllMedias] = useState([])
	const [viewGrid, setViewGrid] = useState(true)
	const [showPanelFilters, setShowPanelFilters] = useState(false)
	const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
	const [selectedMedias, setSelectedMedias] = useState([])
	const filterChanged = useRef(false)
	
	const medias = useMedias(1, 25, filters)
	const app = useContext(AppContext)
  

	useEffect(() => {
		if (medias.items) {
			if (filterChanged.current) {
				filterChanged.current = false
				setAllMedias(medias.items)
			}
			else {
				setAllMedias(oldMedias => [...oldMedias, ...medias.items])
			}
		}
	}, [medias.items])

	const onFilterChange = (filter) => {
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
		>

			{!medias.loading && (medias.items && medias.items.length > 0) && (
				<Typography fontWeight='bold' gutterBottom>
					Showing  {' '}
					<Typography component='span' color='primary' fontWeight='bold'>
						{allMedias?.length + " of " + medias.pagination.totalItems}
					</Typography>
					{' '} medias
				</Typography>
			)}

			<MediaTable
				items={allMedias}
				pagination={medias.pagination}
				loading={medias.loading}
				view={viewGrid ? 'grid' : 'list'}
				linkTo={mediaRoutes.mediaDetails}
				onSelectionChange={onSelectionChange}
				onSendClick={(media)=>app.sendMediaInMessage(media, 'media')}
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