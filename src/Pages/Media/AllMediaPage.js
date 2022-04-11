import { useState, useEffect } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import Button from 'UI/Widgets/Buttons/Button'

import { useMedias } from 'Api/Hooks'
import { Typography } from "@mui/material"
import { useHistory } from "react-router-dom"


export const AllMediaPage = () => {

  const [medias, setMedias] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const history = useHistory()

  const { items: media, loading, pagination } = useMedias(1, 25)

  useEffect(() => {
    if (!media)
      return
    setMedias(oldMedias => [...oldMedias, ...media])
  }, [media])

  const onClickItem = (item) => {
    history.push(`/media/media/details/${item.id}`)
  }


  const onLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages) {
      pagination.getPage(pagination.currentPage + 1)
    }
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
    >
      <Typography>
        {pagination.totalItems}
      </Typography>
      <MediaTable
        items={medias}
        loading={loading}
        pagination={pagination}
        view={viewGrid ? 'grid' : 'list'}
        onClickItem={onClickItem}
      />

      <Button name='Load More' onClick={onLoadMore} />
    </MediaPage>
  )
}

export default AllMediaPage