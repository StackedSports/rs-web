import React, { useState, useContext } from 'react'
import BaseDialog from '../Dialogs/BaseDialog'
import { useMediaMutation, usePlaceholders } from 'Api/ReactQuery'
import { createPlaceholder } from 'Api/Endpoints'
import { debounce, Typography } from '@mui/material'
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'
import { AppContext } from 'Context/AppProvider'

export const AssignMediaToPlaceholderDialog = (props) => {
  const app = useContext(AppContext)
  const { updateAsync: mediaUpdate } = useMediaMutation()
  const placeholders = usePlaceholders()
  const [selectedPlaceholder, setSelectedPlaceholder] = useState([])
  const [loading, setLoading] = useState(false)

  const onPlaceholdersInputChange = debounce((value) => {
    if (value) {
      placeholders.filter({
        name: value,
      })
    } else {
      placeholders.clearFilter()
    }
  }, 500)

  const onPlaceholdersChange = (placeholder) => {
    const newPlaceholder = placeholder.at(-1)
    if (!newPlaceholder)
      setSelectedPlaceholder([])
    else if (typeof newPlaceholder === 'string') {
      setSelectedPlaceholder([
        {
          id: "new-" + Date.now(),
          name: newPlaceholder
        }
      ])
    }
    else
      setSelectedPlaceholder([newPlaceholder])
  }

  const updateMediasPlaceholder = async (placeholderId) => {
    return Promise.all(props.medias.map((media) => {
      mediaUpdate({
        id: media.id,
        data: {
          media_placeholder_id: placeholderId
        }
      })
    }))
  }

  const onConfirm = async () => {
    if (selectedPlaceholder.length === 0)
      return

    setLoading(true)
    const placeholder = selectedPlaceholder[0]
    let placeholderId = placeholder.id

    // If the placeholder is new, create it
    if (placeholderId.startsWith('new-')) {
      try {
        const res = await createPlaceholder(placeholder.name)
        placeholderId = res.data.id
      }
      catch (e) {
        console.log("Error on create new placeholder", e)
        app.alert.setWarning(`Error on create new placeholder: ${e.message}`)
        setLoading(false)
        return
      }
    }

    try {
      await updateMediasPlaceholder(placeholderId)
      app.alert.setSuccess(`${props.medias.length} medias  associate to placeholder ${placeholder.name}`)
      setSelectedPlaceholder([])
    } catch (e) {
      console.log("Error on update medias placeholder", e)
      app.alert.setWarning(`Error on update medias placeholder: ${e.message}`)
      setLoading(false)
      return
    }
    setLoading(false)
    props.onClose()
  }

  return (
    <BaseDialog
      title="Assign Media to Placeholder"
      open={props.open}
      onClose={props.onClose}
      onConfirm={onConfirm}
      actionLoading={loading}
    >
      <Typography sx={{ mb: 2 }}>
        {`${props.medias.length || 0} Selected Medias will be assigned to this placeholder.`}
      </Typography>

      <SearchableSelector
        multiple
        options={placeholders.items}
        loading={placeholders.loading}
        value={selectedPlaceholder}
        label={null}
        placeholder="Search a Placeholder or Type to Create New"
        onChange={onPlaceholdersChange}
        getOptionLabel={(option) => option?.name || ''}
        getChipLabel={(option) => option.name}
        onInputChange={(event, newInputValue) => onPlaceholdersInputChange(newInputValue)}
        freeSolo
        clearOnBlur
      />
    </BaseDialog>

  )
}
