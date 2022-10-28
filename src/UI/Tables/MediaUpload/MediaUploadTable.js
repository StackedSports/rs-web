import { useState } from 'react'

import LinearProgress from '@mui/material/LinearProgress';

import { Grid, Stack, Box, Typography, styled, Checkbox, Chip, debounce, IconButton } from "@mui/material"


import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; // ----
import ClearIcon from "@mui/icons-material/Clear"; // ----


import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'

import { getFullName } from "utils/Parser"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tags: {
    border: "1px solid #d8d8d8",
    height: 50,
    width: "max-content",
    fontWeight: 600,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    //   margin: 8,
  },
  dropdownHidden: {
    display: "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: 230,
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    border: "1px solid #d5d5d5",
    borderRadius: 4,
    // padding: 5,
    zIndex: 1,
    maxHeight: 200,
    overflowY: "scroll",
    overflowX: "hidden",
    zIndex: 200000000,
  },
  hoverGrid: {
    height: 50,
    marginLeft: 0,
    // marginTop: -12,
    cursor: "pointer",
    color: "#3871da",
    "&>p": {
      color: "black",
    },
    "&:hover": {
      background: "#3871da",
      color: "white",
      "&>p": {
        color: "white",
      },
    },
  },
  tableP: { margin: 0, marginLeft: 12, fontSize: 16, fontWeight: 600 },
  uploadCSVSpan: { color: "#989482", marginLeft: 8, marginRight: 16 },
  uploadCSVGrid: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #989482",
    color: "#989482",
  },
  CSVDetails: {
    color: "#62614e",
    width: "70%",
    textAlign: "justify",
    fontWeight: 600,
    fontSize: 13,
    marginTop: 10,
  },
  uploadCSVGridActive: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #3871da",
    background: "#3871da",
    color: "white",
  },

  uploadCSVGridDone: {
    height: 30,
    width: 30,
    borderRadius: 50,
    border: "1px solid #3871da",
    background: "#006644",
    color: "white",
  },
});

export const MediaTableItemLoading = (props) => {
  return (
    <Grid
      style={{
        height: 40,
        flex: "auto",
        border: "none",
        padding: 16,
        ...props.style
      }}
    >
      <LinearProgress />
    </Grid>
  )
}

export const MediaUploadStatus = (props) => {
  switch (props.status) {
    case "none": return <Typography color='text.secondary' fontWeight='bold'></Typography>
    case "ready": return <Typography color='text.secondary' fontWeight='bold' >Ready To Upload</Typography>
    case "failed": return <Typography color={'error.main'} fontWeight='bold'>Failed To Upload</Typography>
    case "success": return <Typography color={'success.light'} fontWeight='bold' >Upload Successfull!</Typography>

    case "uploading":
      return (
        <MediaTableItemLoading
          style={{
            paddingTop: 10,
            paddingLeft: 0,
            paddingRight: 0
          }}
        />
      )
  }

  return (
    <div></div>
  )
}

export const MediaUploadHeader = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      sx={{
        background: (theme) => theme.palette.mode === 'light' ? '#fafcfd' : theme.palette.grey[600],
        height: 50,
      }}
      alignItems="center"
    >
      <Grid item xs={5}>
        <p className={classes.tableP}> File Name</p>
      </Grid>
      <Grid item xs={4}>
        <p className={classes.tableP}>Associated</p>
      </Grid>
      <Grid item xs={3}>
        <p className={classes.tableP}>Upload Status</p>
      </Grid>
    </Grid>
  )
}

export const MediaUploadItem = (props) => {
  const classes = useStyles();

  const onInputChange = debounce(input => {

    // setInputValue(input)

    if (input && input !== '')
      props.onSearch(input)
    else
      props.onClearSearch()
  }, 500)

  return (
    <Grid container padding={1.5} spacing={1} alignItems="center" >
      <Grid item xs={5} >
        <Typography sx={{ wordWrap: 'break-word' }} className={classes.tableP}> {props.item.name}</Typography>
      </Grid>
      <Grid item xs={4}>
        {props.optionSelected === "loading" &&
          <MediaTableItemLoading />
        }

        {props.optionSelected === null && !props.disableAssociateInput && (
          <SearchableSelector
            multiple
            options={props.options}
            loading={props.optionsLoading}
            value={props.optionSelected || []}
            // inputValue={inputValue}
            label={null}
            placeholder="Search Contact"
            getOptionLabel={(option) => getFullName(option)}
            getChipLabel={(option) => getFullName(option)}
            getChipAvatar={(option) => option.twitter_profile?.profile_image}
            onInputChange={(event, input) => onInputChange(input)}
            onChange={props.onOptionSelected}
            clearOnBlur={false}
            style={{
              maxWidth: 200
            }}
          />
        )}
        {props.optionSelected && props.optionSelected !== "loading" &&
          (
            <div
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.tags}
            >
              <Grid
                style={{ height: 50 }}
                container
                direction="row"
                alignItems="center"
              >
                {props.optionSelected.twitter_profile &&
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                      // marginLeft: 12,
                      marginRight: 12
                    }}
                    src={props.optionSelected.twitter_profile.profile_image}
                  />
                }
                {props.optionSelected.first_name + ' ' + props.optionSelected.last_name}
                {!props.disableAssociateInput &&
                  <ClearIcon
                    onClick={() => {
                      if (!props.disableAssociateInput) props.onRemoveOptionSelected()
                    }}
                    style={{
                      color: "red",
                      fontSize: 17,
                      cursor: "pointer",
                      marginLeft: 8,
                    }}
                  />
                }

              </Grid>
            </div>
          )
        }

        {props.disableAssociateInput && !props.optionSelected &&
          <p style={{ color: "#aaa", width: 240, marginLeft: 16 }}>None</p>
        }
      </Grid>
      <Grid item xs={3}>
        <Stack direction='row' alignItems='center' >
          <Box flex={1}>
            <MediaUploadStatus status={props.itemUploadStatus} />
          </Box>

          {!props.disableAssociateInput &&
            <IconButton
              onClick={() => {
                props.onDeleteMedia()
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          }

        </Stack>
      </Grid>
    </Grid>
  )
}

