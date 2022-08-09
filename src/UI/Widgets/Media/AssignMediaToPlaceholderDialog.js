import React, { useState, useContext, useMemo } from 'react'
import BaseDialog from '../Dialogs/BaseDialog'
import { useMediaMutation, usePlaceholders, usePlaceholderMutation } from 'Api/ReactQuery'
import { debounce, Typography } from '@mui/material'
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'
import { AppContext } from 'Context/AppProvider'
import { useLocalStorage } from 'Hooks/useLocalStorage'
import lodash from 'lodash'

export const AssignMediaToPlaceholderDialog = (props) => {
  const app = useContext(AppContext)
  const [storagePlaceholders, setStoragePlaceholders] = useLocalStorage('placeholders', []) // this is the list of placeholders that are stored in localStorage because api doens't show new placeholders until they are saved with medias
  const { updateAsync: mediaUpdate } = useMediaMutation()
  const { create: createPlaceholder } = usePlaceholderMutation()
  const placeholders = usePlaceholders()
  const [selectedPlaceholder, setSelectedPlaceholder] = useState([])
  const [loading, setLoading] = useState(false)

  const placeholderWithStorage = useMemo(() => {
    return lodash.uniqBy([...placeholders.items, ...storagePlaceholders], 'id')
  }, [placeholders.items, storagePlaceholders])

  const onClose = () => {
    setSelectedPlaceholder([])
    setLoading(false)
    props.onClose()
  }

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

  const updateMediasPlaceholder = (placeholder) => {
    Promise.all(props.medias.map((media) => {
      mediaUpdate({
        id: media.id,
        data: {
          media_placeholder_id: placeholder.id
        }
      })
    })).then(() => {
      app.alert.setSuccess(`${props.medias.length} medias  associate to placeholder: ${placeholder.name}`)
      setSelectedPlaceholder([])
      onClose()
    }).catch((e) => {
      console.log("Error on update medias placeholder", e)
      app.alert.setWarning(`Error on update medias placeholder: ${e.message}`)
    }).finally(() => {
      setLoading(false)
    })
  }

  const onConfirm = async () => {
    if (selectedPlaceholder.length === 0)
      return

    setLoading(true)
    const placeholder = selectedPlaceholder[0]
    let placeholderId = placeholder.id

    // If the placeholder is new, create it
    if (placeholderId.startsWith('new-')) {
      createPlaceholder(placeholder.name, {
        onSuccess: (data) => {
          console.log(data.data)
          placeholder.id = data.data.id
          updateMediasPlaceholder(placeholder)
          setStoragePlaceholders([...storagePlaceholders, placeholder])
        },
        onError: (error) => {
          console.log("Error on create new placeholder", error.response)
          app.alert.setWarning(`Error on create new placeholder: ${error.response?.data?.errors[0]?.message}`)
          setLoading(false)
        },
      })
    } else {
      updateMediasPlaceholder(placeholder)
    }
  }

  return (
    <BaseDialog
      title="Assign Media to Placeholder"
      open={props.open}
      onClose={onClose}
      onConfirm={onConfirm}
      actionLoading={loading}
    >
      <Typography sx={{ mb: 2 }}>
        {`${props.medias.length || 0} Selected medias will be assigned to this placeholder.`}
      </Typography>

      <SearchableSelector
        multiple
        options={placeholderWithStorage}
        loading={placeholders.loading}
        value={selectedPlaceholder}
        label={null}
        placeholder="Search a placeholder and select or press enter to create a new one"
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
