import { useState } from 'react';
import { Dialog, DialogTitle, Stack, DialogContent, DialogContentText, Checkbox, FormControlLabel, TextField, Divider, Typography } from '@mui/material';
import { People } from '@mui/icons-material';

import Button from '../Buttons/Button';

/**
 * 
 * @param {boolean} open controls the state of the dialog open/close
 * @param {function} onClose callback function to be called when the dialog is closed
 * @param {object} selectedFilters Object with the selected filters Object.Keys are the filter names and the values[] are the array with selected filters name
 * @returns 
 */

export const CreateBoardDialog = ({ open, onClose, selectedFilters, onSubmit }) => {
    const [submitting, setSubmitting] = useState(false)
    
    const handleSubmit = (e) => {

    }    

    return (
        <Dialog
            component="form"
            open={open}
            onClose={onClose}
            aria-labelledby='form-dialog-save-board'
            fullWidth
            maxWidth='sm'
            onSubmit={handleSubmit}
        >
            <DialogTitle
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold !important',
                }}
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
                    {selectedFilters && Object.keys(selectedFilters).map(key => {
                        const filter = selectedFilters[key];
                        return (
                            <Typography
                                component='span'
                                color='text.primary'
                                fontWeight='500 !important'
                                textTransform='capitalize'
                            >
                                {`${key}: ${filter?.map(f => f.name).join(', ')}; `}
                            </Typography>
                        )
                    })
                    }
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
