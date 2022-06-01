import { useState, useEffect } from "react"
import { Dialog, DialogContent, styled, Fab, Box } from "@mui/material"
import { Close, NavigateBefore, NavigateNext } from "@mui/icons-material"
import RenderIf from "UI/Widgets/RenderIf"

const getFileType = (file) => {
  switch (file?.file_type) {
    case 'image/png':
    case 'image/jpeg':
      return 'image'
    case 'image/gif':
      return 'gif'
    case 'application/pdf':
      return 'pdf'
    case 'video/mp4':
      return 'video'
    default:
      // props.item.name
      return 'unknown'
  }
}

/**
 * 
 * @param {string} props.items array of url strings
 * @param {number} props.index index of the current item (you can use this to open the carousel at a specific index or close it if
 * null) 
 * @param {string} props.fileType
 */
export const MediaCarousel = (props) => {

  const [url, setUrl] = useState(null)
  const [type, setType] = useState(null)
  const [index, setIndex] = useState(0)
  const [carouselOpen, setCarouselOpen] = useState(false)

  useEffect(() => {
    if (props.index !== null && props.index !== undefined) {
      setIndex(props.index)
      setCarouselOpen(true)
    }
  }, [props.index])

  useEffect(() => {
    if (props.items) {
      setUrl(props.items[index]?.urls?.original)
      setType(getFileType(props.items[index]))
    }
  }, [props.items, index])

  const onClickNext = () => {
    if (index < props.items.length - 1)
      setIndex(index + 1)
    else
      setIndex(0)
  }

  const onClickPrevious = () => {
    if (index > 0)
      setIndex(index - 1)
    else
      setIndex(props.items.length - 1)
  }

  const onClose = () => {
    setCarouselOpen(false)
    props.onClose()
  }

  return (
    <StyledDialog open={carouselOpen} onClose={onClose} maxWidth='xl' fullWidth PaperComponent={Box}>
      <DialogContent>
        <Fab className='closeFab' onClick={onClose}>
          <Close />
        </Fab>
        <RenderIf condition={props.items && props.items.length > 1}>
          <Fab className='next' onClick={onClickNext}>
            <NavigateNext />
          </Fab>
        </RenderIf>
        <RenderIf condition={props.items && props.items.length > 1}>
          <Fab className='previous' onClick={onClickPrevious}>
            <NavigateBefore />
          </Fab>
        </RenderIf>
        <RenderIf condition={url && type === 'video'}>
          <video controls src={url} />
        </RenderIf>
        <RenderIf condition={url && type === 'pdf'}>
          <embed src={url} />
        </RenderIf>
        <RenderIf condition={url && type !== 'video' && type !== 'pdf'}>
          <img
            src={url}
            loading='lazy'
          />
        </RenderIf>
      </DialogContent>
    </StyledDialog>
  )
}

export default MediaCarousel

const StyledDialog = styled(Dialog)({

  '.MuiDialog-paper': {
    height: '100%',
  },

  '.MuiDialogContent-root': {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  'img': {
    width: 'auto',
    height: 'auto',
    maxHeight: '80vh',
  },
  'video': {
    width: 'auto',
    height: 'auto',
    maxHeight: '80vh',
  },
  'embed': {
    width: '100%',
    height: '100%',
    maxHeight: '80vh',
  },

  '.MuiFab-root.closeFab': {
    position: 'fixed',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  '.MuiFab-root.next': {
    position: 'fixed',
    top: '50%',
    right: 20,
    // transform: 'translateY(-50%)',
    zIndex: 10,
  },
  '.MuiFab-root.previous': {
    position: 'fixed',
    top: '50%',
    left: 20,
    // transform: 'translateY(-50%)',
  },
})