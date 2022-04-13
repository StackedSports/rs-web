import { useState, useEffect } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import Button from 'UI/Widgets/Buttons/Button'

import { useMedias } from 'Api/Hooks'
import { Typography } from "@mui/material"
import { useHistory } from "react-router-dom"


export const AllMediaPage = () => {

  const [allMedias, setMedias] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const history = useHistory()

  const medias = useMedias(1, 25)
  const { items: media, loading, pagination } = useMedias(1, 25)

  useEffect(() => {
    if (!media)
      return
    setMedias(oldMedias => [...oldMedias, ...media])
  }, [media])

  const onClickItem = (item) => {
    history.push(`/media/media/details/${item.id}`)
  }

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
        onClickItem={onClickItem}
        linkTo='/media/media/details/'
      />

    </MediaPage>
  )
}

export default AllMediaPage