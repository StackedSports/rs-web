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
      <Box
        sx={{ width: '310px', bgcolor: 'background.default', padding: .5, borderRadius: 1.2 }}
        component='form'
        onSubmit={onSubmit}
      >
        <TextField
          name='listName'
          label={null}
          fullWidth
          autoFocus={expanded}
          placeholder="Column Name"
          size='small'
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: .5,
            display: expanded ? 'inline-flex' : 'none',
          }}
          InputProps={{
            sx: {
              bgcolor: 'background.paper',
            }
          }}
        />
        <Stack direction='row' justifyContent='space-between'>
          <Button
            fullWidth={!expanded}
            disableRipple
            type='submit'
            onClick={handleAddList}
            color='inherit'
            sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
            startIcon={<Add />}
          >
            Add Column
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