import { useState, useEffect, useRef } from "react"

import { Typography, Button } from "@mui/material"
import { GridView, FormatListBulleted, AutoFixHigh, Tune, LocalOfferOutlined } from '@mui/icons-material'

import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import { archiveMedias } from "Api/Endpoints"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMedias } from 'Api/Hooks'
import { addTagsToMedias } from "Api/Endpoints"

export const AllMediaPage = () => {

  const [allMedias, setAllMedias] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const [showPanelFilters, setShowPanelFilters] = useState(false)
  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const filterChanged = useRef(false)

  const [selectedMedias, setSelectedMedias] = useState([])
  const medias = useMedias(1, 25)

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
    const result =  addTagsToMedias(selectedTagsIds, selectedMedias)
  }

  const mainActions = [
    {
      name: 'Change view',
      type: 'icon',
      icon: viewGrid ? GridView : FormatListBulleted,
      onClick: () => setViewGrid(oldViewGrid => !oldViewGrid)
    },
    {
      name: 'Action',
      icon: AutoFixHigh,
      variant: 'outlined',
      type: 'dropdown',
      options: [
        { name: 'Send in Message', onClick: () => { console.log("clicked") } },
        { name: 'Download', onClick: () => { console.log("clicked") } },
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

      <Typography fontWeight='bold' gutterBottom>
        Showing  {' '}
        <Typography component='span' color='primary' fontWeight='bold'>
          {allMedias?.length + " of " + medias.pagination.totalItems}
        </Typography>
        {' '} medias
      </Typography>
      <MediaTable
        items={allMedias}
        pagination={medias.pagination}
        loading={medias.loading}
        view={viewGrid ? 'grid' : 'list'}
        linkTo='/media/media/details/'
        onSelectionChange={onSelectionChange}
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