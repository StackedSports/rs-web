import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';

export const SettingsBaseDialog = (props) => {
    return (
        <Dialog
            component="form"
            maxWidth="md"
            fullWidth
            open={props.open}
            onClose={props.onClose}
            onSubmit={props.onSubmit}
        >
            <DialogTitle
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                }}
            >
                {props.title}

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
            </DialogTitle>

            <DialogContent
                sx={{
                    ' >*:not(:last-child) ': {
                        marginBottom: '1rem'
                    },
                }}
            >
                {props.children}
            </DialogContent>
            <DialogActions sx={{ padding: '0 20px 24px' }}>
                <LoadingButton
                    type="submit"
                    size='large'
                    variant="contained"
                    color="primary"
                    loading={props.loading}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
