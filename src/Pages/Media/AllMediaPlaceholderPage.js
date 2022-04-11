import { useState } from "react"
import MediaPage from "./MediaPage"
import MediaTable from 'UI/Tables/Media/MediaTable'

import { usePlaceholders } from 'Api/Hooks'

export const AllMediaPlaceholderPage = (props) => {
  const [viewGrid, setViewGrid] = useState(true)
  
  const { items: placeholders, loading, pagination } = usePlaceholders(1, 25)

  const onSwitchView = () => {
    setViewGrid(oldViewGrid => !oldViewGrid)
}

  return (
    <MediaPage
      title="Placeholders"
      onSwitchView={onSwitchView}
      viewGrid={viewGrid}
    >
      <MediaTable
        items={placeholders}
        type='placeholder'
        loading={loading}
        pagination={pagination}
        view={viewGrid ?'grid':'list'}

      />

    </MediaPage>
  )
}

export default AllMediaPlaceholderPage