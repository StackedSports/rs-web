import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material';

import Button from 'UI/Widgets/Buttons/Button'

const BaseDialog = (props) => {
  return (
    <Dialog
      keepMounted={props.keepMounted}
      maxWidth={props.maxWidth || "md"}
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
      {props.title && <DialogTitle sx={{ mr: '40px' }} >{props.title}</DialogTitle>}

      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>

        {props.children}

        {!props.hideActions && (
          <DialogActions sx={{ mt: 1 }}>

            <Button
              name={props.cancelLabel || 'Cancel'}
              onClick={props.secondaryAction || props.onClose}
            />

            {(props.onConfirm && props.onConfirm instanceof Function) && (
              <Button
                variant="contained"
                name={props.confirmLabel || "Confirm"}
                onClick={props.onConfirm}
              />
            )}

          </DialogActions>
        )}

      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog