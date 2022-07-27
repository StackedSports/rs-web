import { useState } from 'react'
import { Box, Button, TextField, styled, IconButton, Stack } from '@mui/material'
import { Add, Close } from '@mui/icons-material'

export const KanbanAddListButton = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState('')

  const handleExpand = () => {
    setExpanded(!expanded)
    setName('')
  }

  const handleAddList = (e) => {
    if (!expanded) {
      e.preventDefault()
      handleExpand()
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (e.target.listName.value && e.target.listName.value !== '')
      props.onAddList(e.target.listName.value)
    handleExpand()
  }

  return (
    <Box>
      <Box sx={{ width: '310px', bgcolor: '#dadada', padding: .5, borderRadius: 1.2 }} component='form' onSubmit={onSubmit}>
        <TextField
          name='listName'
          label={null}
          fullWidth
          autoFocus={expanded}
          placeholder="enter board name"
          size='small'
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: .5,
            display: expanded ? 'inline-flex' : 'none',
            bgcolor: '#fff',
          }}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Button
            fullWidth={!expanded}
            disableRipple
            type='submit'
            size='small'
            onClick={handleAddList}
            sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
            startIcon={<Add />}
          >
            Add a Board
          </Button>
          <IconButton
            size='small'
            onClick={() => handleExpand()}
            sx={{ display: expanded ? 'inline-flex' : 'none' }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}
