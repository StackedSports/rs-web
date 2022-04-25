import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

import Button from 'UI/Widgets/Buttons/Button'

const BaseDialog = (props) => {
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
      {props.title && <DialogTitle >{props.title}</DialogTitle>}

      <DialogContent>

        {props.children}

        <DialogActions>

          <Button
            name= {props.cancelLabel || 'Cancel'}
            onClick={props.onClose}
          />

          <Button
            variant="contained"
            name= {props.confirmLabel || "Confirm"}
            onClick={props.onConfirm}
          />

        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog