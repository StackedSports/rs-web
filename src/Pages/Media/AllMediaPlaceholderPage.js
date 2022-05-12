import { useState, useEffect, useContext, useRef } from "react"
import { AutoFixHigh, LocalOfferOutlined, GridView, FormatListBulleted } from '@mui/icons-material'
import { Typography } from "@mui/material"
import lodash from "lodash"

import MediaTable from 'UI/Tables/Media/MediaTable'
import MediaPage from "./MediaPage"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from "Context/ConfirmDialogProvider"
import { mediaRoutes } from "Routes/Routes"
import { usePlaceholders } from 'Api/Hooks'
import { addTagsToMedias,deleteTagsFromMedias } from "Api/Endpoints"

export const AllMediaPlaceholderPage = (props) => {

  const [allPlaceholders, setAllPlaceholders] = useState([])
  const [viewGrid, setViewGrid] = useState(true)
  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const [selectedPlaceholdersIds, setSelectedPlaceholdersIds] = useState([])
  const isTagDialogFunctionRemove = useRef(false)

  const app = useContext(AppContext)
  const confirmDialog = useContext(ConfirmDialogContext)
  const placeholders = usePlaceholders(1, 25)
  console.log(placeholders.items)

  useEffect(() => {
    if (placeholders.items) {
      setAllPlaceholders(oldMedias => [...oldMedias, ...placeholders.items])
    }
  }, [placeholders.items])

  const onSelectionChange = (selection) => {
    setSelectedPlaceholdersIds(selection)
  }

  const handleTagsDialogConfirm = async (selectedTagsIds) => {

    const mediasFromSelectedPlaceholders = allPlaceholders.
      filter(placeholders => selectedPlaceholdersIds.includes(placeholders.id)).
      map(placeholder => placeholder.media).
      flat()

    const uniqueMediasIds = lodash.uniqBy(mediasFromSelectedPlaceholders, 'id').map(media => media.id)

    setOpenSelectTagDialog(false)
    if (isTagDialogFunctionRemove.current) {
      confirmDialog.show('Remove Tags',
        `Are you sure you want to remove the selected tags (${selectedTagsIds.length}) ?`,
        async () => {
          const { success, error } = await deleteTagsFromMedias(selectedTagsIds, uniqueMediasIds)
          if (error.count === 0)
            app.alert.setSuccess('Tags removed successfully')
          else if (success.count === 0)
            app.alert.setError('An error occurred while removing tags')
          else
            app.alert.setWarning(`Some tags (${error.count}) could not be removed`)
        })
    } else {
      const { success, error } = await addTagsToMedias(selectedTagsIds, uniqueMediasIds)
      if (error.count === 0)
        app.alert.setSuccess('Tags added successfully')
      else if (success.count === 0)
        app.alert.setError('An error occurred while adding tags')
      else
        app.alert.setWarning(`Some tags (${error.count}) could not be added`)
    }
  }

  const onTagAction = () => {
    if (selectedPlaceholdersIds.length > 0) {
      isTagDialogFunctionRemove.current = false
      setOpenSelectTagDialog(true)
    }
  }

  const onUntagAction = () => {
    if (selectedPlaceholdersIds.length > 0) {
      isTagDialogFunctionRemove.current = true
      setOpenSelectTagDialog(true)
    }
  }

  const onSendInMessageAction = () => {
    // should send all selected medias in a message?
    /*  app.sendMediaInMessage(placeholder, 'placeholder') */
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
      disabled: selectedPlaceholdersIds.length === 0,
      options: [
        { name: 'Send in Message', onClick: () => { console.log("clicked") } },
        { name: 'Download', onClick: () => { console.log("clicked") } },
        { name: 'Archive Media', onClick: () => { console.log("clicked") } },
        { name: 'Untag', onClick: onUntagAction },
      ]
    },
    {
      name: 'Tag',
      icon: LocalOfferOutlined,
      variant: 'outlined',
      onClick: onTagAction,
      disabled: selectedPlaceholdersIds.length === 0,
    },
  ]

  return (
    <MediaPage
      title="Placeholders"
      actions={mainActions}
    >
      {!placeholders.loading && (placeholders.items && placeholders.items.length > 0) && (
        <Typography fontWeight='bold' gutterBottom>
          Showing  {' '}
          <Typography component='span' color='primary' fontWeight='bold'>
            {allPlaceholders?.length + " of " + placeholders.pagination.totalItems}
          </Typography>
          {' '} placeholders
        </Typography>
      )}

      <MediaTable
        items={allPlaceholders}
        type='placeholder'
        pagination={placeholders.pagination}
        loading={placeholders.loading}
        view={viewGrid ? 'grid' : 'list'}
        linkTo={mediaRoutes.placeholderDetails}
        onSelectionChange={onSelectionChange}
        onSendClick={(placeholder) => app.sendMediaInMessage(placeholder, 'placeholder')}
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