import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Checkbox, FormControlLabel, TextField, Divider, Typography } from '@mui/material';
import { People } from '@mui/icons-material';

import Button from '../Buttons/Button';


export const CreateBoardDialog = ({ open, onClose }) => {
    const [submitting, setSubmitting] = useState(false)
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-save-board"
            fullWidth
            maxWidth="md"

        >
            <DialogTitle
                sx={{ textAlign: 'center' }}
                fontWeight='bold'
            >
                Create Board
            </DialogTitle>
            <Divider />

            <DialogContent>

                <TextField
                    margin="dense"
                    id="name"
                    label="Board Name"
                    type="text"
                    fullWidth
                />

            </DialogContent>
            <DialogActions>

                <FormControlLabel
                    sx={{ mr: 'auto' }}
                    control={
                        <Checkbox
                            checked={false}
                            onChange={() => { }}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Shere with team"
                />


                <Button
                    variant="outlined"
                    onClick={() => setOpenSaveBoardDialog(false)}
                    name='Cancel'
                />
                <Button
                    variant="contained"
                    type='submit'
                    endIcon={<People />}
                    name='Create Board'
                />

            </DialogActions>
        </Dialog>

    )
}

export default CreateBoardDialog
