import { useState, useEffect, useRef } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'

import { useMedias } from 'Api/Hooks'
import { Typography, Button } from "@mui/material"

import { archiveMedias } from "Api/Endpoints"

export const AllMediaPage = () => {

  const [allMedias, setMedias] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const isFilterChanged = useRef(false)

  const [selectedMedias, setSelectedMedias] = useState([])
  const medias = useMedias(1, 25)

  useEffect(() => {
    if (medias.items) {
      if (isFilterChanged.current) {
        isFilterChanged.current = false
        setMedias(medias.items)
      }
      else {
        setMedias(oldMedias => [...oldMedias, ...medias.items])
      }
    }
  }, [medias.items])

  const onSwitchView = () => {
    console.log("onSwitchView")
    setViewGrid(oldViewGrid => !oldViewGrid)
  }

  const onFilterChange = (filter) => {
    isFilterChanged.current = true
    medias.filter(filter)
  }

  const onSelectionChange = (selection) => {
    setSelectedMedias(selection)
  }

  const archiveMedia = () => {
    console.log(archiveMedias(selectedMedias))
  }

  return (
    <MediaPage
      title="Media"
      onSwitchView={onSwitchView}
      viewGrid={viewGrid}
      filter={onFilterChange}
    >
      {/* Just to test Archive endpoint */}
      <Button variant='outlined' sx={{ my: 3 }} onClick={archiveMedia}>
        Test Archive
      </Button>

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

    </MediaPage>
  )
}


export default AllMediaPage