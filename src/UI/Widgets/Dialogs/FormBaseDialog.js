import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions, Alert, AlertTitle } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';

export const FormBaseDialog = (props) => {
    const [error, setError] = useState(null);
    useEffect(() => {
        if (props.error) {
            setError(props.error)
        }
    }, [props.error])

    const handleClose = (e, reason) => {
        setError(null)
        if (props.onClose)
            props.onClose(e, reason)
    }

    return (
        <Dialog
            maxWidth="md"
            fullWidth
            open={props.open}
            onClose={handleClose}
            PaperProps={{
                onSubmit: props.onSubmit,
                component: "form",
            }}
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
                    onClick={handleClose}
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

                {(error !== null) &&
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(null);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle >Error</AlertTitle>
                        {error.message}
                    </Alert>
                }
            </DialogContent>
            <DialogActions sx={{ padding: '0 20px 24px' }}>
                {props.secondaryAction}
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
