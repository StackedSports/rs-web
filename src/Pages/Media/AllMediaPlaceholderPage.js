import { useState, useContext, useRef, useEffect } from "react"
import lodash from "lodash"
import { useQueryClient } from "react-query"
import { AutoFixHigh, LocalOfferOutlined, GridView, FormatListBulleted, Clear } from '@mui/icons-material'
import { Typography, IconButton } from "@mui/material"

import MediaTable from 'UI/Tables/Media/MediaTable'
import BaseMediaPage from "./BaseMediaPage"
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { AppContext } from 'Context/AppProvider'
import useSearchParams from 'Hooks/SearchParamsHook';
import ConfirmDialogContext from "Context/ConfirmDialogProvider"
import { mediaRoutes } from "Routes/Routes"
import { usePlaceholders } from 'Api/ReactQuery'
import { addTagsToMedias, deleteTagsFromMedias } from "Api/Endpoints"
import useMultiPageSelection_V2 from 'Hooks/MultiPageSelectionHook_V2'
import RenderIf from "UI/Widgets/RenderIf"
import useLocalStorage from "Hooks/useLocalStorage"

export const AllMediaPlaceholderPage = (props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams()
  const confirmDialog = useContext(ConfirmDialogContext)
  const app = useContext(AppContext)
  const panelRef = useRef()
  const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(`placeholder-table-perPage`, 24)
  const page = searchParams.page
  const placeholders = usePlaceholders(page, perPageLocalStorage)

  const [viewGrid, setViewGrid] = useState(true)
  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const isTagDialogFunctionRemoveRef = useRef(false)
  const [loadingTags, setLoadingTags] = useState(false)

  const multiPageSelection = useMultiPageSelection_V2(placeholders.items)
  const { selectionModel: selectedPlaceholdersIds,
    selectedData: selectedPlaceholders,
    count: selectedPlaceholdersCount,
    clear: clearSelection
  } = multiPageSelection

  const invalidateMediasCache = () => {
    queryClient.invalidateQueries(['placeholders'])
    queryClient.invalidateQueries(['medias'])
  }

  useEffect(() => {
    searchParams.appendSearchParams('page', placeholders.pagination.currentPage)
  }, [placeholders.pagination.currentPage])

  useEffect(() => {
    setperPageLocalStorage(placeholders.pagination.itemsPerPage)
  }, [placeholders.pagination.itemsPerPage])

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

    invalidateMediasCache()
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

        invalidateMediasCache()
      })
  }

  const handleTagsDialogConfirm = async (selectedTagsIds) => {

    setLoadingTags(true)
    // getting all medias from selected placeholders
    const mediasFromSelectedPlaceholders = selectedPlaceholders.map(placeholder => placeholder.media).flat()

    const uniqueMediasIds = lodash.uniqBy(mediasFromSelectedPlaceholders, 'id').map(media => media.id)

    if (isTagDialogFunctionRemoveRef.current) {
      onDeleteTagsFromMedias(selectedTagsIds, uniqueMediasIds)
    } else {
      await onAddTagsToMedias(selectedTagsIds, uniqueMediasIds)
    }

    setLoadingTags(false)
  }

  const onTagAction = () => {
    if (selectedPlaceholdersCount > 0) {
      isTagDialogFunctionRemoveRef.current = false
      setOpenSelectTagDialog(true)
    }
  }

  const onUntagAction = () => {
    if (selectedPlaceholdersCount > 0) {
      isTagDialogFunctionRemoveRef.current = true
      setOpenSelectTagDialog(true)
    }
  }

  //TODO how to archive placeholder?
  const onArchivePlaceholder = () => {
    app.alert.setWarning('Archive Placeholder not implemented yet')
  }

  const onSendInMessageAction = () => {
    if (selectedPlaceholdersCount !== 1)
      app.alert.setWarning('Please select only one media placeholder to send in message')
    else {
      const placeholder = selectedPlaceholders[0]
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
      disabled: selectedPlaceholdersCount === 0,
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
      disabled: selectedPlaceholdersCount === 0,
    },
  ]

  return (
    <BaseMediaPage
      title="Placeholders"
      actions={mainActions}
      panelRef={panelRef}
    >

      <RenderIf condition={placeholders.items && placeholders.items.length > 0}>
        <Typography fontWeight='bold'>
          You have
          <Typography component='span' color='primary.light' fontWeight='bold'>
            {` ${placeholders.pagination.totalItems || 0} `}
          </Typography>
          placeholders
        </Typography>
        <Typography component='span'  color='primary.light' fontWeight='bold' fontSize={'14px'} sx={{ minHeight: '28px' }}>
          <RenderIf condition={selectedPlaceholdersCount > 0}>
            {`${selectedPlaceholdersCount} placeholder${selectedPlaceholdersCount > 1 ? "s" : ""} selected`}
            <IconButton size='small' color='inherit' onClick={() => clearSelection()}>
              <Clear fontSize="inherit" />
            </IconButton>
          </RenderIf>
        </Typography>
      </RenderIf>

      <MediaTable
        items={placeholders.items || []}
        type='placeholder'
        pagination={placeholders.pagination}
        loading={placeholders.loading}
        skeletonSize={perPageLocalStorage}
        view={viewGrid ? 'grid' : 'list'}
        linkTo={mediaRoutes.placeholderDetails}
        multiPageSelection={multiPageSelection}
        onSendClick={(placeholder) => app.sendMediaInMessage(placeholder, 'placeholder')}
        scrollToTopRef={panelRef}
      />

      <SelectTagDialog
        open={openSelectTagDialog}
        onClose={() => setOpenSelectTagDialog(false)}
        onConfirm={handleTagsDialogConfirm}
        actionLoading={loadingTags}
        title={isTagDialogFunctionRemoveRef.current ? 'Untag' : 'Add Tag'}
        isAddTag={isTagDialogFunctionRemoveRef.current ? false : true}
      />

    </BaseMediaPage>
  )
}

export default AllMediaPlaceholderPage