import { useState } from 'react';
import { Dialog, DialogTitle, Stack, DialogContent, DialogContentText, Checkbox, FormControlLabel, TextField, Divider, Typography } from '@mui/material';
import { People } from '@mui/icons-material';

import Button from '../Buttons/Button';
import { Box } from '@material-ui/core';


export const CreateBoardDialog = ({ open, onClose }) => {
    const [submitting, setSubmitting] = useState(false)

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='form-dialog-save-board'
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                }}
                fontWeight='700'
            >
                Create Board
            </DialogTitle>

            <DialogContent>
                <Divider
                    sx={{
                        mb: 3,
                    }}
                />

                <TextField
                    margin='dense'
                    id='name'
                    label='Create Board Name'
                    type='text'
                    fullWidth
                    InputProps={{
                        sx: {
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                        }
                    }}
                    InputLabelProps={{
                        sx: {
                            fontWeight: 'bold',
                            color: 'text.disabled',
                        }
                    }}
                />

                <Typography py={2} fontWeight='bold' fontSize='12px' color='text.secondary' >
                    Filter Criteria:
                </Typography>
                <Divider
                    sx={{
                        my: 2,
                    }}
                />

                <Stack direction='row' gap={2}>
                    <FormControlLabel
                        sx={{
                            mr: 'auto',
                            alignSelf: 'center',
                        }}
                        control={
                            <Checkbox
                                defaultChecked
                                name='share'
                                color='primary'
                            />
                        }
                        label='Share with team'
                    />

                    <Button
                        variant='outlined'
                        onClick={onClose}
                        name='Cancel'
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        endIcon={<People />}
                        name='Create Board'
                    />
                </Stack>
            </DialogContent>
        </Dialog>

    )
}

export default CreateBoardDialog
