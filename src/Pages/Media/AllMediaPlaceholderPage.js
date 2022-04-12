import { useState } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'
import { useHistory } from "react-router-dom"

import { usePlaceholders } from 'Api/Hooks'

export const AllMediaPlaceholderPage = (props) => {
  const [viewGrid, setViewGrid] = useState(true)
  const history = useHistory()

  const placeholders = usePlaceholders(1, 25)
  console.log(placeholders.items)

  const onSwitchView = () => {
    setViewGrid(oldViewGrid => !oldViewGrid)
  }

  const onClickItem = (item) => {
    history.push(`/media/placeholders/details/${item.id}`)
  }

  return (
    <MediaPage
      title="Placeholders"
      onSwitchView={onSwitchView}
      viewGrid={viewGrid}
    >
      <MediaTable
        items={placeholders.items}
        type='placeholder'
        loading={placeholders.loading}
        pagination={placeholders.pagination}
        view={viewGrid ? 'grid' : 'list'}
        onClickItem={onClickItem}
      />

    </MediaPage>
  )
}

export default AllMediaPlaceholderPage