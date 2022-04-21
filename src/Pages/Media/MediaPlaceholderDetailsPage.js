import { useEffect, useState, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { AutoFixHigh, Clear, Edit, GridView, FormatListBulleted, Check, ArrowDropDown } from "@mui/icons-material"
import { Stack, Box, Input, IconButton, InputAdornment, Typography, Tooltip } from "@mui/material"

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'
import DetailsPreview from "UI/DataDisplay/DetailsPreview"
import MediaTable from 'UI/Tables/Media/MediaTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { AppContext } from 'Context/AppProvider'

import { mediaRoutes } from "Routes/Routes"
import { usePlaceholder } from "Api/Hooks"
import { formatDate } from "utils/Parser"
import { archiveMedias, deleteMedia, addTagsToMedias, updatePlaceholder } from "Api/Endpoints"

export const MediaPlaceholderDetailsPage = () => {
  const app = useContext(AppContext)
  const { id } = useParams()
  const alert = useMainLayoutAlert()
  const { item: placeholder, loading } = usePlaceholder(id)

  console.log(placeholder)

  const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
  const [viewGrid, setViewGrid] = useState(true)
  const [itemName, setItemName] = useState('')
  const [editName, setEditName] = useState(false)
  const inputMediaNameRef = useRef(null)
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

  const onDeleteAction = () => {
    Promise.allSettled(selectedMedias.map(media => deleteMedia(media))).then(results => {
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
        { name: 'Delete', onClick: () => { console.log("clicked") } },
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
        { name: 'Tag', onClick: () => setOpenSelectTagDialog(true) },
        { name: 'Untag', onClick: () => setOpenSelectTagDialog(true) },
        { name: 'Archive', onClick: onArchiveAction },
        { name: 'Delete', onClick: onDeleteAction },
      ]
    })
  }

  const onSelectionChange = (selection) => {
    setSelectedMedias(selection)
  }

  const handleMediaNameChange = (type) => {
    if (type === 'cancel')
      inputMediaNameRef.current.value = placeholder.name
    else {
      const newName = inputMediaNameRef.current.value
      updatePlaceholder(placeholder.id, newName).then(() => {
        alert.setSuccess("Media name updated")
        setItemName(inputMediaNameRef.current.value)
      }).catch(err => {
        alert.setWarning(err.message)
      })
    }
    setEditName(false)
  }

  const handleTagsDialogConfirm = (selectedTagsIds) => {
    console.log(selectedTagsIds)
  }

  return (
    <MainLayout
      title="Placeholder Details"
      actions={mainActions}
      loading={loading}
      alert={alert}
    >

      <Stack direction="row" flexWrap='wrap' spacing={2} my={3}>
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

          <Input
            inputRef={inputMediaNameRef}
            disableUnderline={!editName}
            value={itemName}
            disabled={!editName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ my: 2 }}
            placeholder='Placeholder Name'
            endAdornment={
              <InputAdornment position="end">
                {!editName ?
                  <IconButton onClick={() => setEditName(true)} >
                    <Edit />
                  </IconButton>
                  : (
                    <>
                      <IconButton color='error' onClick={() => handleMediaNameChange('cancel')} >
                        <Clear />
                      </IconButton>
                      <IconButton color='success' onClick={handleMediaNameChange} >
                        <Check />
                      </IconButton>
                    </>
                  )}

              </InputAdornment>
            }
          />

          <DetailsPreview label="Media Count" value={placeholder?.media.length} />
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
        open={openSelectTagDialog}
        onClose={() => setOpenSelectTagDialog(false)}
        onConfirm={handleTagsDialogConfirm}
      />

    </MainLayout>
  )
}

export default MediaPlaceholderDetailsPage