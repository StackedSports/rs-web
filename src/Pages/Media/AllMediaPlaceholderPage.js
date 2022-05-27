import { useState, useEffect, useContext, useRef } from "react"
import { AutoFixHigh, LocalOfferOutlined, GridView, FormatListBulleted, Clear } from '@mui/icons-material'
import { Typography, Box, IconButton } from "@mui/material"
import lodash from "lodash"

import MediaTable from 'UI/Tables/Media/MediaTable'
import MediaPage from "./MediaPage"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { AppContext } from 'Context/AppProvider'
import ConfirmDialogContext from "Context/ConfirmDialogProvider"
import { mediaRoutes } from "Routes/Routes"
import { usePlaceholders } from 'Api/Hooks'
import { addTagsToMedias, deleteTagsFromMedias } from "Api/Endpoints"
import RenderIf from "UI/Widgets/RenderIf"

export const AllMediaPlaceholderPage = (props) => {

  const [viewGrid, setViewGrid] = useState(true)
  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const [selectedPlaceholdersIds, setSelectedPlaceholdersIds] = useState([])
  const isTagDialogFunctionRemoveRef = useRef(false)
  const [loadingTags, setLoadingTags] = useState(false)

  const app = useContext(AppContext)
  const confirmDialog = useContext(ConfirmDialogContext)
  const placeholders = usePlaceholders(1, 24)
  console.log(placeholders.items)

  /*   useEffect(() => {
      if (placeholders.items) {
        setAllPlaceholders(oldMedias => [...oldMedias, ...placeholders.items])
      }
    }, [placeholders.items]) */

  const onSelectionChange = (selection) => {
    setSelectedPlaceholdersIds(selection)
  }

  const onAddTagsToMedias = async (tagsIds, mediasIds) => {

    const { success, error } = await addTagsToMedias(tagsIds, mediasIds)
    if (error.count === 0) {
      app.alert.setSuccess('Tags added successfully')
      setOpenSelectTagDialog(false)
    }
    else if (success.count === 0)
      app.alert.setError('An error occurred while adding tags')
    else
      app.alert.setWarning(`Some tags (${error.count}) could not be added`)
  }

  const onDeleteTagsFromMedias = async (tagsIds, mediasIds) => {
    confirmDialog.show('Remove Tags',
      `Are you sure you want to remove the selected tags (${tagsIds.length}) ?`,
      async () => {
        const { success, error } = await deleteTagsFromMedias(tagsIds, mediasIds)
        if (error.count === 0) {
          app.alert.setSuccess('Tags removed successfully')
          setOpenSelectTagDialog(false)
        }
        else if (success.count === 0)
          app.alert.setError('An error occurred while removing tags')
        else
          app.alert.setWarning(`Some tags (${error.count}) could not be removed`)
      })
  }

  const handleTagsDialogConfirm = async (selectedTagsIds) => {

    setLoadingTags(true)
    // getting all medias from selected placeholders
    const mediasFromSelectedPlaceholders = placeholders.items.
      filter(placeholders => selectedPlaceholdersIds.includes(placeholders.id)).
      map(placeholder => placeholder.media).
      flat()

    const uniqueMediasIds = lodash.uniqBy(mediasFromSelectedPlaceholders, 'id').map(media => media.id)

    if (isTagDialogFunctionRemoveRef.current) {
      await onDeleteTagsFromMedias(selectedTagsIds, uniqueMediasIds)
    } else {
      await onAddTagsToMedias(selectedTagsIds, uniqueMediasIds)
    }
    setLoadingTags(false)
  }

  const onTagAction = () => {
    if (selectedPlaceholdersIds.length > 0) {
      isTagDialogFunctionRemoveRef.current = false
      setOpenSelectTagDialog(true)
    }
  }

  const onUntagAction = () => {
    if (selectedPlaceholdersIds.length > 0) {
      isTagDialogFunctionRemoveRef.current = true
      setOpenSelectTagDialog(true)
    }
  }

  //TODO how to archive placeholder?
  const onArchivePlaceholder = () => {
    app.alert.setWarning('Archive Placeholder not implemented yet')
  }

  const onSendInMessageAction = () => {
    if (selectedPlaceholdersIds.length !== 1)
      app.alert.setWarning('Please select only one media placeholder to send in message')
    else {
      const placeholder = placeholders.items.find(p => selectedPlaceholdersIds[0] === p.id)
      if (placeholder)
        app.sendMediaInMessage(placeholder, 'placeholder')
    }
  }

  //TODO: find way to download all medias at once ( zip file? )
  const onDownloadAction = () => {
    console.log("Download action")
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
        { name: 'Send in Message', onClick: onSendInMessageAction },
        { name: 'Download', onClick: onDownloadAction },
        { name: 'Archive Media', onClick: onArchivePlaceholder },
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

      <RenderIf condition={placeholders.items && placeholders.items.length > 0}>
        <Typography fontWeight='bold'>
          You have
          <Typography component='span' color='primary' fontWeight='bold'>
            {` ${placeholders.pagination.totalItems || 0} `}
          </Typography>
          placeholders
        </Typography>
        <RenderIf condition={selectedPlaceholdersIds.length > 0}>
          <Typography component='span' color='primary' fontWeight='bold' fontSize={'14px'}>
            {`${selectedPlaceholdersIds.length} placeholder${selectedPlaceholdersIds.length > 1 ? "s" : ""} selected`}
            <IconButton size='small' color='primary' onClick={() => setSelectedPlaceholdersIds([])}>
              <Clear fontSize="inherit" />
            </IconButton>
          </Typography>
        </RenderIf>
      </RenderIf>

      <MediaTable
        items={placeholders.items || []}
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
        actionLoading={loadingTags}
        title={isTagDialogFunctionRemoveRef.current ? 'Untag' : 'Add Tag'}
        isAddTag={isTagDialogFunctionRemoveRef.current ? false : true}
      />

    </MediaPage>
  )
}

export default AllMediaPlaceholderPage