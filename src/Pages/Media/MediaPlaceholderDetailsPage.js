import { useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AutoFixHigh, GridView, FormatListBulleted, ArrowDropDown } from "@mui/icons-material"
import { Stack, Box, IconButton, Typography, Tooltip } from "@mui/material"

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DetailsPreview from "UI/DataDisplay/DetailsPreview"
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'
import EditableLabel from 'UI/Forms/Inputs/EditableLabel'

import { AppContext } from 'Context/AppProvider'

import { mediaRoutes } from "Routes/Routes"
import { usePlaceholder } from "Api/Hooks"
import { formatDate } from "utils/Parser"
import {
  archiveMedias,
  deleteMedia,
  addTagsToMedias,
  deleteTagsFromMedia,
  updatePlaceholder,
  deletePlaceholder,
} from "Api/Endpoints"

export const MediaPlaceholderDetailsPage = () => {
  const app = useContext(AppContext)
  const { id } = useParams()
  const alert = useMainLayoutAlert()
  const { item: placeholder, loading } = usePlaceholder(id)

  const history = useHistory()
  //console.log(placeholder)

  const [openSelectAddTagDialog, setOpenSelectAddTagDialog] = useState(false)
  const [openSelectRemoveTagDialog, setOpenSelectRemoveTagDialog] = useState(false)
  const [viewGrid, setViewGrid] = useState(true)
  const [itemName, setItemName] = useState('')
  const [selectedMedias, setSelectedMedias] = useState([])

  useEffect(() => {
    if (placeholder) {
      setItemName(placeholder.name)
    }
  }, [placeholder])

  const onSendInMessageAction = () => {
    if (!placeholder)
      return

    app.sendMediaInMessage(placeholder, 'placeholder')
  }

  // i didn't test this function
  const onDeletePlaceholder = () => {
    if (!placeholder)
      return

    deletePlaceholder(placeholder.id)
      .then(() => {
        alert.success('Placeholder deleted')
        app.redirect(mediaRoutes.placeholders)
      }).catch(err => {
        alert.error(err.message)
      })
  }

  const onArchiveAction = async () => {
    const { success, error } = await archiveMedias(selectedMedias)
    console.log(error)
    console.log(success)
    if (error.count > 0) {
      alert.setWarning(`${error.count} medias could not be archived`)
    } else {
      alert.setSuccess(`All ${success.count} medias archived`)
    }
  }

  const onDeleteMediaAction = () => {
    Promise.allSettled(selectedMedias.map(media => deleteMedia(media))).then(results => {
      const errors = results.filter(result => result.status === 'rejected')
      if (errors.length > 0) {
        alert.setWarning(`${errors.length} medias could not untagged`)
      } else {
        alert.setSuccess(`All ${results.length} medias untagged`)
      }
    })
  }

  const onAddTagsAction = async (tags) => {
    const { success, error } = await addTagsToMedias(tags, selectedMedias)
    console.log(error)
    console.log(success)
    if (error.count > 0) {
      alert.setWarning(`${error.count} medias could not be tagged`)
    } else {
      alert.setSuccess(`All ${success.count} medias tagged`)
    }
  }

  const onRemoveTagsAction = (tags) => {
    Promise.allSettled(selectedMedias.map(media => deleteTagsFromMedia(tags, media))).then(results => {
      const errors = results.filter(result => result.status === 'rejected')
      if (errors.length > 0) {
        alert.setWarning(`${errors.length} medias could not be deleted`)
      } else {
        alert.setSuccess(`All ${results.length} medias deleted`)
      }
    })
  }

  const mainActions = [
    {
      name: 'Action',
      icon: AutoFixHigh,
      variant: 'outlined',
      type: 'dropdown',
      options: [
        { name: 'Send in Message', onClick: onSendInMessageAction },
        { name: 'Delete', onClick: onDeletePlaceholder },
      ]
    },
  ]

  if (selectedMedias.length > 0) {
    mainActions.push({
      id: 'Recipients Action',
      name: `${selectedMedias.length} Media Selected`,
      type: 'dropdown',
      variant: 'contained',
      icon: ArrowDropDown,
      options: [
        { name: 'Tag', onClick: () => setOpenSelectAddTagDialog(true) },
        { name: 'Untag', onClick: () => setOpenSelectRemoveTagDialog(true) },
        { name: 'Archive', onClick: onArchiveAction },
        { name: 'Delete', onClick: onDeleteMediaAction },
      ]
    })
  }

  const onSelectionChange = (selection) => {
    setSelectedMedias(selection)
  }

  const onEditName = (newName) => {
    updatePlaceholder(placeholder.id, newName).then(() => {
      alert.setSuccess("Media name updated")
      setItemName(newName)
    }).catch(err => {
      setItemName(placeholder.name)
      alert.setWarning(err.message)
    })
  }

  const handleTagsDialogConfirm = (selectedTagsIds, type) => {
    if (type === 'add') {
      onAddTagsAction(selectedTagsIds)
      setOpenSelectAddTagDialog(false)
    }
    if (type === 'remove') {
      onRemoveTagsAction(selectedTagsIds)
      setOpenSelectRemoveTagDialog(false)
    }
  }

  return (
    <MainLayout
      title="Placeholder Details"
      actions={mainActions}
      alert={alert}
      onBackClick={() => history.goBack()}
      filtersDisabled
    >

      <Stack direction="row" flexWrap='wrap' gap={2} my={3}>
        <MediaPreview
          type="placeholder"
          item={placeholder || {}}
        />

        <Box
          flex='1 1 auto'
          sx={{
            color: 'text.secondary',
          }}
        >

          <EditableLabel
            placeholder='Placeholder Name'
            value={itemName}
            onEdit={onEditName}
          />

          <DetailsPreview label="Media Count" value={placeholder?.media_count} />
          <DetailsPreview label="Uploaded on :" value={formatDate(placeholder?.created_at)} />
          <DetailsPreview label="Updated on :" value={formatDate(placeholder?.updated_at)} />
        </Box>

      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center' my={1}>
        <Typography variant='h6' fontWeight='bold' color='textPrimary'>
          Medias:
        </Typography>
        <Tooltip title={`Change to ${viewGrid ? 'list' : 'grid'} view`}>
          <IconButton
            color='primary'
            onClick={() => setViewGrid(oldViewGrid => !oldViewGrid)}
          >
            {viewGrid ? <FormatListBulleted /> : <GridView />}
          </IconButton>
        </Tooltip>
      </Stack>
      <MediaTable
        items={placeholder?.media || []}
        loading={loading}
        view={viewGrid ? 'grid' : 'list'}
        type="media"
        linkTo={mediaRoutes.mediaDetails}
        onSelectionChange={onSelectionChange}
      />

      <SelectTagDialog
        title="Select Tags to add"
        open={openSelectAddTagDialog}
        onClose={() => setOpenSelectAddTagDialog(false)}
        onConfirm={(tags) => handleTagsDialogConfirm(tags, 'add')}
        confirmLabel="Add"
      />
      <SelectTagDialog
        title="Select Tags to remove"
        open={openSelectRemoveTagDialog}
        onClose={() => setOpenSelectRemoveTagDialog(false)}
        confirmLabel="Remove"
        onConfirm={(tags) => handleTagsDialogConfirm(tags, 'remove')}
      />

    </MainLayout>
  )
}

export default MediaPlaceholderDetailsPage