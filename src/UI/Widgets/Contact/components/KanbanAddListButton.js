import { useState } from 'react'
import { Box, Button, TextField, styled, IconButton, Stack } from '@mui/material'
import { Add, Close } from '@mui/icons-material'

export const KanbanAddListButton = (props) => {
  const [expanded, setExpanded] = useState(false)

  const handleAddList = (e) => {
    if (!expanded) {
      e.preventDefault()
      setExpanded(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.onAddList(e.target.listName.value)
    setExpanded(false)
  }

  return (
    <Box>
      <Box sx={{ minHeight: '40px', width: '270px', bgcolor: '#dadada', padding: .5 }} component='form' onSubmit={onSubmit}>
        <TextField
          name='listName'
          label={null}
          fullWidth
          autoFocus={expanded}
          placeholder="enter list name"
          size='small'
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
            Add a List
          </Button>
          <IconButton
            size='small'
            onClick={() => setExpanded(old => !old)}
            sx={{ display: expanded ? 'inline-flex' : 'none' }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}
