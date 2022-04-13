import { useState, useEffect } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'

import { useMedias } from 'Api/Hooks'
import { Typography } from "@mui/material"

export const AllMediaPage = () => {

  const [allMedias, setMedias] = useState([])
  const [viewGrid, setViewGrid] = useState(true)

  const medias = useMedias(1, 25)
  const { items: media, loading, pagination } = useMedias(1, 25)

  useEffect(() => {
    if (!media)
      return
    setMedias(oldMedias => [...oldMedias, ...media])
  }, [media])

  const onSwitchView = () => {
    console.log("onSwitchView")
    setViewGrid(oldViewGrid => !oldViewGrid)
  }

  return (
    <MediaPage
      title="Media"
      onSwitchView={onSwitchView}
      viewGrid={viewGrid}
      filter={medias.filter}
    >
      <Typography fontWeight='bold' gutterBottom>
        Showing  {' '}
        <Typography component='span' color='primary' fontWeight='bold'>
          {allMedias.length + " of " + pagination.totalItems}
        </Typography>
        {' '} medias
      </Typography>
      <MediaTable
        items={allMedias}
        pagination={pagination}
        loading={loading}
        view={viewGrid ? 'grid' : 'list'}
        linkTo='/media/media/details/'
      />

    </MediaPage>
  )
}

export default AllMediaPage