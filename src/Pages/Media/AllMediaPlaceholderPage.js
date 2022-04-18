import { useState, useRef, useEffect } from "react"
import { AutoFixHigh, LocalOfferOutlined, GridView, FormatListBulleted } from '@mui/icons-material'

import MediaTable from 'UI/Tables/Media/MediaTable'
import MediaPage from "./MediaPage"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { mediaRoutes } from "Routes/Routes"

import { usePlaceholders } from 'Api/Hooks'

export const AllMediaPlaceholderPage = (props) => {

  const [allPlaceholders, setAllPlaceholders] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const [selectedPlaceholders, setSelectedPlaceholders] = useState([])

  const placeholders = usePlaceholders(1, 25)
  console.log(placeholders.items)

  useEffect(() => {
    if (placeholders.items) {
      setAllPlaceholders(oldMedias => [...oldMedias, ...placeholders.items])
    }
  }, [placeholders.items])

  const onSelectionChange = (selection) => {
    setSelectedPlaceholders(selection)
  }

  const handleTagsDialogConfirm = (selectedTagsIds) => {
    console.log(selectedTagsIds)
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
        { name: 'Archive Media', onClick: () => { console.log("clicked") } },
        { name: 'Untag', onClick: () => { console.log("clicked") } },
      ]
    },
    {
      name: 'Tag',
      icon: LocalOfferOutlined,
      variant: 'outlined',
      onClick: () => setOpenSelectTagDialog(true),
      disabled: selectedPlaceholders.length === 0,
    },
  ]

  return (
    <MediaPage
      title="Placeholders"
      actions={mainActions}
    >
      <MediaTable
        items={allPlaceholders}
        type='placeholder'
        loading={placeholders.loading}
        pagination={placeholders.pagination}
        view={viewGrid ? 'grid' : 'list'}
        linkTo={mediaRoutes.placeholderDetails}
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

export default AllMediaPlaceholderPage