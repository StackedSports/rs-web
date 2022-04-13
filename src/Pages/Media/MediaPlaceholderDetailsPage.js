import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AutoFixHigh, LocalOfferOutlined, CheckBoxOutlineBlank, CheckBox, Clear } from "@mui/icons-material"
import { Grid, Stack, Box, Typography, Paper, styled, TextField, Autocomplete, Checkbox, Chip, debounce } from "@mui/material"

import MainLayout from 'UI/Layouts/MainLayout'
import MediaPreview from 'UI/Widgets/Media/MediaPreview'

import { usePlaceholder } from "Api/Hooks"
import { formatDate, getFullName } from "utils/Parser"

export const MediaPlaceholderDetailsPage = () => {
  const { id } = useParams()

  const { item: placeholder, loading } = usePlaceholder(id)
  console.log(placeholder)

  const mainActions = [
    {
      name: 'Action',
      icon: AutoFixHigh,
      variant: 'outlined',
    },
  ]

  return (
    <MainLayout
      title="Placeholder Details"
      actions={mainActions}
      loading={loading}
    >

      <Stack direction="row" flexWrap='wrap' spacing={2}>
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
          <Typography variant='subtitle1' color='text.primary' >
            {placeholder?.name || placeholder?.file_name}
          </Typography>
          <Typography variant="body1">
            File Type :
            <Typography component="span" fontWeight='bold' >
              {' ' + placeholder?.file_type}
            </Typography>
          </Typography>
          <Typography variant="body1">
            Uploaded on :
            <Typography component="span" fontWeight='bold' >
              {' ' + formatDate(placeholder?.created_at)}
            </Typography>
          </Typography>
          <Typography variant="body1">
            Uploaded by :
            <Typography component="span" fontWeight='bold' >
              {' ' + getFullName(placeholder?.owner)}
            </Typography>
          </Typography>
          <Typography variant="body1">
            File Size:
            <Typography component="span" fontWeight='bold' >
              {' ' + (placeholder?.size / 1000).toFixed(0) + ' kb'}
            </Typography>
          </Typography>

        </Box>

      </Stack>


    </MainLayout>
  )
}

export default MediaPlaceholderDetailsPage