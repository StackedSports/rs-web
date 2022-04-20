import { useState, useEffect } from "react"
import { Dialog, DialogContent, styled, Fab } from "@mui/material"
import { Close, NavigateBefore, NavigateNext } from "@mui/icons-material"

/**
 * 
 * @param {string} props.items array of url strings
 */
export const MediaCarousel = (props) => {

  const [url, setUrl] = useState(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (props.index)
      setIndex(props.index)
  }, [props.index])

  useEffect(() => {
    if (props.items)
      setUrl(props.items[index])
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

  return (
    <StyledDialog open={props.open} onClose={props.onClose} maxWidth='xl'>
      <DialogContent>
        <Fab className='closeFab' onClick={props.onClose}>
          <Close />
        </Fab>
        <Fab className='next' onClick={onClickNext}>
          <NavigateNext />
        </Fab>
        <Fab className='previous' onClick={onClickPrevious}>
          <NavigateBefore />
        </Fab>
        <img src={url} />
      </DialogContent>
    </StyledDialog>
  )
}

export default MediaCarousel

const StyledDialog = styled(Dialog)({

  'img': {
    width: '100%',
    height: 'auto',
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